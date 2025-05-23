
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface UserData {
  id: string;
  email: string;
  role: 'admin' | 'student' | 'company';
  name: string;
  approved?: boolean;
}

interface AuthContextType {
  user: UserData | null;
  session: Session | null;
  isGuest: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  guestLogin: (role: string) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        
        if (currentSession?.user) {
          if (!isGuest) {
            // Fetch user data from our custom users table
            setTimeout(async () => {
              try {
                const { data, error } = await supabase
                  .from('users')
                  .select('*')
                  .eq('id', currentSession.user.id)
                  .single();
                
                if (error) {
                  console.error('Error fetching user data:', error);
                  return;
                }
                
                if (data) {
                  setUser({
                    id: data.id,
                    email: data.email,
                    role: data.role as 'admin' | 'student' | 'company',
                    name: data.name,
                    approved: data.approved
                  });
                }
              } catch (error) {
                console.error('Error in auth state change:', error);
              }
            }, 0);
          }
        } else {
          setUser(null);
          setIsGuest(false);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      
      // Check if we're in guest mode
      const guestMode = localStorage.getItem('isGuest');
      const guestUser = localStorage.getItem('guestUser');
      
      if (guestMode === 'true' && guestUser) {
        setUser(JSON.parse(guestUser));
        setIsGuest(true);
      } else if (currentSession?.user) {
        // Fetch user data from our custom users table
        supabase
          .from('users')
          .select('*')
          .eq('id', currentSession.user.id)
          .single()
          .then(({ data, error }) => {
            if (error) {
              console.error('Error fetching user data:', error);
              setIsLoading(false);
              return;
            }
            
            if (data) {
              setUser({
                id: data.id,
                email: data.email,
                role: data.role as 'admin' | 'student' | 'company',
                name: data.name,
                approved: data.approved
              });
            }
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      if (error) {
        throw error;
      }

      // User data will be set by the auth state change listener
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Failed to login');
    }
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    try {
      // First, sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role
          }
        }
      });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error('No user returned from sign up');
      }

      // Then, insert into our custom users table
      const { error: insertError } = await supabase.from('users').insert({
        id: authData.user.id,
        email,
        name,
        role,
        // Companies need approval
        approved: role !== 'company'
      });

      if (insertError) {
        // If insert fails, try to clean up the auth user
        console.error('Error creating user profile:', insertError);
        throw insertError;
      }

      // Create the appropriate profile record based on role
      if (role === 'student') {
        await supabase.from('student_profiles').insert({
          id: authData.user.id
        });
      } else if (role === 'company') {
        await supabase.from('company_profiles').insert({
          id: authData.user.id
        });
      }

      toast({
        title: "Account created successfully",
        description: role === 'company' 
          ? "Your account is pending approval from an administrator."
          : "Your account has been created successfully.",
      });

      return authData;
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: error.message || "Could not create your account",
        variant: "destructive",
      });
      throw error;
    }
  };

  const guestLogin = (role: string) => {
    const guestUser: UserData = {
      id: 'guest',
      email: 'guest@demo.com',
      role: role as 'admin' | 'student' | 'company',
      name: `Guest ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      approved: true
    };
    
    localStorage.setItem('guestUser', JSON.stringify(guestUser));
    localStorage.setItem('isGuest', 'true');
    setUser(guestUser);
    setIsGuest(true);
  };

  const logout = async () => {
    if (isGuest) {
      localStorage.removeItem('guestUser');
      localStorage.removeItem('isGuest');
      setUser(null);
      setIsGuest(false);
    } else {
      await supabase.auth.signOut();
      // The rest will be handled by the auth state change listener
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isGuest,
      login,
      register,
      guestLogin,
      logout,
      isAuthenticated,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

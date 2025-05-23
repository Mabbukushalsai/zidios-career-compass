
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'student' | 'company';
  name: string;
  approved?: boolean;
}

interface AuthContextType {
  user: User | null;
  isGuest: boolean;
  login: (email: string, password: string) => Promise<void>;
  guestLogin: (role: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    // Check for existing auth token on app load
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const guestMode = localStorage.getItem('isGuest');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      setIsGuest(guestMode === 'true');
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    console.log('Logging in with:', email, password);
    
    // Demo users for testing
    const demoUsers: Record<string, User> = {
      'admin@zidio.com': { id: '1', email: 'admin@zidio.com', role: 'admin', name: 'Admin User' },
      'student@zidio.com': { id: '2', email: 'student@zidio.com', role: 'student', name: 'John Student' },
      'company@zidio.com': { id: '3', email: 'company@zidio.com', role: 'company', name: 'Tech Corp', approved: true },
    };

    const foundUser = demoUsers[email];
    if (foundUser && password === 'password') {
      const token = 'demo-jwt-token-' + foundUser.id;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(foundUser));
      localStorage.setItem('isGuest', 'false');
      setUser(foundUser);
      setIsGuest(false);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const guestLogin = (role: string) => {
    const guestUser: User = {
      id: 'guest',
      email: 'guest@demo.com',
      role: role as 'admin' | 'student' | 'company',
      name: `Guest ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      approved: true
    };
    
    localStorage.setItem('user', JSON.stringify(guestUser));
    localStorage.setItem('isGuest', 'true');
    setUser(guestUser);
    setIsGuest(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isGuest');
    setUser(null);
    setIsGuest(false);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      isGuest,
      login,
      guestLogin,
      logout,
      isAuthenticated
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

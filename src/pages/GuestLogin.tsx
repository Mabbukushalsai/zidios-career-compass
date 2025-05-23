
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { GraduationCap, Building2, Shield } from 'lucide-react';

const GuestLogin = () => {
  const [loading, setLoading] = useState(false);
  const { guestLogin } = useAuth();
  const navigate = useNavigate();

  const handleGuestLogin = async (role: string) => {
    setLoading(true);
    
    try {
      guestLogin(role);
      
      // Navigate based on role
      if (role === 'student') {
        navigate('/student');
      } else if (role === 'company') {
        navigate('/company');
      } else if (role === 'admin') {
        navigate('/admin');
      }

      toast({
        title: "Guest Login",
        description: `You are now browsing as a guest ${role}`,
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Could not login as guest. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">ZIDIO</h1>
          <p className="text-lg text-gray-600">Continue as a guest</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Guest Access</CardTitle>
            <CardDescription>
              Explore the platform without creating an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-500">Select your role to continue</p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-3 py-6"
                  onClick={() => handleGuestLogin('student')}
                  disabled={loading}
                >
                  <GraduationCap className="h-5 w-5" />
                  <span>Continue as Student</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-3 py-6"
                  onClick={() => handleGuestLogin('company')}
                  disabled={loading}
                >
                  <Building2 className="h-5 w-5" />
                  <span>Continue as Company</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-3 py-6"
                  onClick={() => handleGuestLogin('admin')}
                  disabled={loading}
                >
                  <Shield className="h-5 w-5" />
                  <span>Continue as Admin</span>
                </Button>
              </div>

              <div className="text-center pt-4 border-t text-sm">
                <p>
                  Want to create an account?{' '}
                  <Link to="/register" className="text-blue-600 hover:underline">
                    Register
                  </Link>
                </p>
                <p className="mt-2">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-600 hover:underline">
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuestLogin;

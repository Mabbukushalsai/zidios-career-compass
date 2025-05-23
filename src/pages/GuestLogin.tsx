
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap, Building2, Shield } from 'lucide-react';

const GuestLogin = () => {
  const { guestLogin } = useAuth();
  const navigate = useNavigate();

  const handleGuestLogin = (role: string) => {
    guestLogin(role);
    navigate(`/${role}`);
  };

  const roles = [
    {
      id: 'student',
      title: 'Student Portal',
      description: 'Browse jobs, courses, hackathons, and take mock tests',
      icon: GraduationCap,
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      id: 'company',
      title: 'Company Portal',
      description: 'Post jobs and manage applications',
      icon: Building2,
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      id: 'admin',
      title: 'Admin Portal',
      description: 'Manage users, companies, and job postings',
      icon: Shield,
      color: 'bg-purple-500 hover:bg-purple-600',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">ZIDIO Guest Access</h1>
          <p className="text-lg text-gray-600">Choose your role to explore the portal</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map(({ id, title, description, icon: Icon, color }) => (
            <Card key={id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 rounded-full ${color} flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => handleGuestLogin(id)}
                  className="w-full"
                  variant="outline"
                >
                  Continue as Guest {title.split(' ')[0]}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 mb-4">
            Note: Guest access provides limited functionality for demonstration purposes.
          </p>
          <Button variant="link" onClick={() => navigate('/login')}>
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GuestLogin;

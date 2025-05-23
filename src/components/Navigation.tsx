
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { 
  LogOut, 
  Home, 
  Briefcase, 
  BookOpen, 
  FileText, 
  Calendar,
  MapPin,
  Code,
  Users,
  Building2,
  Shield
} from 'lucide-react';

const Navigation = () => {
  const { user, logout, isGuest } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavItems = () => {
    const commonItems = [
      { path: '/jobs', label: 'Jobs', icon: Briefcase },
      { path: '/courses', label: 'Courses', icon: BookOpen },
      { path: '/mock-tests', label: 'Mock Tests', icon: FileText },
    ];

    if (user?.role === 'student') {
      return [
        { path: '/student', label: 'Dashboard', icon: Home },
        ...commonItems,
        { path: '/hackathons', label: 'Hackathons', icon: Code },
        { path: '/symposiums', label: 'Symposiums', icon: Calendar },
        { path: '/walkin-drives', label: 'Walk-in Drives', icon: MapPin },
        { path: '/study-materials', label: 'Study Materials', icon: BookOpen },
      ];
    }

    if (user?.role === 'company') {
      return [
        { path: '/company', label: 'Dashboard', icon: Building2 },
        ...commonItems,
      ];
    }

    if (user?.role === 'admin') {
      return [
        { path: '/admin', label: 'Dashboard', icon: Shield },
        ...commonItems,
        { path: '/hackathons', label: 'Hackathons', icon: Code },
        { path: '/symposiums', label: 'Symposiums', icon: Calendar },
        { path: '/walkin-drives', label: 'Walk-in Drives', icon: MapPin },
      ];
    }

    return commonItems;
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              ZIDIO
            </Link>
            {isGuest && (
              <span className="ml-3 px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded">
                Guest Mode
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {getNavItems().map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              >
                <Icon className="w-4 h-4 mr-1" />
                {label}
              </Link>
            ))}

            <div className="flex items-center space-x-2 ml-4 pl-4 border-l">
              <span className="text-sm text-gray-600">
                {user?.name} ({user?.role})
              </span>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

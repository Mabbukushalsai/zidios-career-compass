
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
  allowGuest?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles, 
  allowGuest = false 
}) => {
  const { user, isGuest, isLoading } = useAuth();

  // Show loading state while auth is being determined
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowGuest && isGuest) {
    return <Navigate to="/login" replace />;
  }

  // Check if user's company account is approved
  if (user.role === 'company' && user.approved === false) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-amber-50 border border-amber-300 text-amber-800 p-6 rounded-lg max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Account Pending Approval</h2>
          <p className="mb-4">
            Your company account is pending approval from an administrator. You'll be able to access the platform once your account is approved.
          </p>
          <button 
            onClick={() => window.location.href = '/login'} 
            className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect based on role if they're trying to access a page they shouldn't
    if (user.role === 'student') {
      return <Navigate to="/student" replace />;
    } else if (user.role === 'company') {
      return <Navigate to="/company" replace />;
    } else if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;

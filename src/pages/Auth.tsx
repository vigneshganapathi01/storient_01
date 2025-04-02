
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import AuthForms from '@/components/auth/AuthForms';
import { useAuth } from '@/context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

interface AuthProps {
  tab?: 'signin' | 'signup';
}

const Auth: React.FC<AuthProps> = ({ tab = 'signin' }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to home page if already logged in
  if (!isLoading && user) {
    return <Navigate to="/" replace />;
  }

  // Improve the smooth transition to home page
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="w-full max-w-md px-4">
          <AuthForms defaultTab={tab} />
        </div>
      </main>
    </div>
  );
};

export default Auth;

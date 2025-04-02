
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import AuthForms from '@/components/auth/AuthForms';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

interface AuthProps {
  tab?: 'signin' | 'signup';
}

const Auth: React.FC<AuthProps> = ({ tab = 'signin' }) => {
  const { user } = useAuth();

  // Redirect to dashboard if already logged in
  if (user) {
    return <Navigate to="/dashboard/profile" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AuthForms defaultTab={tab} />
      </main>
    </div>
  );
};

export default Auth;

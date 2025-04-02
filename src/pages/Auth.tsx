
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import AuthForms from '@/components/auth/AuthForms';

interface AuthProps {
  tab?: 'signin' | 'signup';
}

const Auth: React.FC<AuthProps> = ({ tab = 'signin' }) => {
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

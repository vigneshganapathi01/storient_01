
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginRequired: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
      <LogIn className="h-12 w-12 mx-auto text-brand-blue mb-4" />
      <h2 className="text-2xl font-bold mb-4">Login Required</h2>
      <p className="text-muted-foreground mb-6">
        Please log in to view your cart and make purchases
      </p>
      <Button 
        className="bg-brand-blue hover:bg-brand-blue/90"
        onClick={() => navigate('/signin')}
      >
        Login Now
      </Button>
    </div>
  );
};

export default LoginRequired;

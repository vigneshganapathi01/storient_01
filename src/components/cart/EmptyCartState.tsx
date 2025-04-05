
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, LogIn } from 'lucide-react';

type EmptyCartStateProps = {
  isAuthenticated: boolean;
};

const EmptyCartState: React.FC<EmptyCartStateProps> = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  
  const handleContinueShopping = () => {
    navigate('/templates');
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-16">
        <h1 className="text-3xl font-bold mb-8 text-[#002060]">Shopping Cart</h1>
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <LogIn className="h-12 w-12 mx-auto text-brand-blue mb-4" />
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="text-muted-foreground mb-6">Please log in to view your cart and make purchases</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              className="bg-brand-blue hover:bg-brand-blue/90" 
              onClick={() => navigate('/signin')}
            >
              Login Now
            </Button>
            <Button 
              variant="outline"
              onClick={handleContinueShopping}
            >
              Browse Templates
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 pt-8 pb-16">
      <h1 className="text-3xl font-bold mb-8 text-[#002060]">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <ShoppingCart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-6">Browse our templates and add some to your cart!</p>
        <Button 
          className="bg-brand-blue hover:bg-brand-blue/90" 
          onClick={handleContinueShopping}
        >
          Explore Templates
        </Button>
      </div>
    </div>
  );
};

export default EmptyCartState;

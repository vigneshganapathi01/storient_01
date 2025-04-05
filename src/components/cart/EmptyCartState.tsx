
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

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
      <div className="text-center py-10 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-4">Please Login to View Your Cart</h2>
        <p className="text-muted-foreground mb-6">You need to be logged in to add items to your cart and make purchases.</p>
        <Button 
          className="bg-brand-blue hover:bg-brand-blue/90 mr-2" 
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
    );
  }
  
  return (
    <div className="text-center py-10 bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
      <p className="text-muted-foreground mb-6">Browse our templates and add some to your cart!</p>
      <Button 
        className="bg-brand-blue hover:bg-brand-blue/90" 
        onClick={handleContinueShopping}
      >
        Explore Templates
      </Button>
    </div>
  );
};

export default EmptyCartState;

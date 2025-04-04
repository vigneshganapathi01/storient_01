
import React from 'react';
import { Button } from '@/components/ui/button';

interface EmptyCartProps {
  onContinueShopping: () => void;
}

const EmptyCart: React.FC<EmptyCartProps> = ({ onContinueShopping }) => {
  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
      <p className="text-muted-foreground mb-6">Browse our templates and add some to your cart!</p>
      <Button 
        className="bg-brand-blue hover:bg-brand-blue/90" 
        onClick={onContinueShopping}
      >
        Explore Templates
      </Button>
    </div>
  );
};

export default EmptyCart;

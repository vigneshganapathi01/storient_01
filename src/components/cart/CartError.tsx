
import React from 'react';
import { Button } from '@/components/ui/button';

interface CartErrorProps {
  retry: () => void;
}

const CartError: React.FC<CartErrorProps> = ({ retry }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
      <div className="text-red-500 mb-4 text-2xl">⚠️</div>
      <h2 className="text-2xl font-bold mb-4">Error Loading Cart</h2>
      <p className="text-muted-foreground mb-6">
        We're having trouble connecting to our servers. Please try again later.
      </p>
      <Button onClick={retry}>
        Try Again
      </Button>
    </div>
  );
};

export default CartError;

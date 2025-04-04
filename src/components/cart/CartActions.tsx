
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface CartActionsProps {
  onCheckout: () => void;
  onContinueShopping: () => void;
  onClearCart: () => void;
  isEmpty: boolean;
}

const CartActions: React.FC<CartActionsProps> = ({ 
  onCheckout, 
  onContinueShopping, 
  onClearCart, 
  isEmpty 
}) => {
  return (
    <div className="flex flex-col gap-3 mt-8">
      <Button 
        className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white py-6 text-lg"
        onClick={onCheckout}
        disabled={isEmpty}
      >
        Secure Checkout
      </Button>
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          className="flex-1 text-muted-foreground"
          onClick={onContinueShopping}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Continue Shopping
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 text-muted-foreground"
          onClick={onClearCart}
          disabled={isEmpty}
        >
          Clear Cart
        </Button>
      </div>
    </div>
  );
};

export default CartActions;

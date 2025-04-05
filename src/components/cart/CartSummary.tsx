
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CartSummaryProps {
  totalItems: number;
  subtotal: number;
  total: number;
  handleCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  totalItems,
  subtotal,
  total,
  handleCheckout
}) => {
  return (
    <Card className="shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Items ({totalItems}):</span>
            <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="border-t border-gray-100 pt-4 mt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Order Total:</span>
              <span className="text-[#002060]">${total.toFixed(2)}</span>
            </div>
          </div>
          
          <Button 
            className="w-full mt-4 py-6 bg-[#002060] hover:bg-[#002060]/90 text-white font-medium"
            onClick={handleCheckout}
          >
            Buy now ${total.toFixed(2)}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CartSummary;

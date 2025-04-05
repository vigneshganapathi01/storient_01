
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface OrderSummaryProps {
  isLoading: boolean;
  totalItems: number;
  subtotal: number;
  total: number;
  handleCheckout: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  isLoading,
  totalItems,
  subtotal,
  total,
  handleCheckout
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-brand-blue" />
          </div>
        ) : (
          <>
            <div className="flex justify-between">
              <span className="text-gray-600">Items ({totalItems}):</span>
              <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
            </div>
            
            <Separator className="my-2" />
            
            <div className="flex justify-between text-lg font-semibold">
              <span>Order Total:</span>
              <span className="text-[#002060]">${total.toFixed(2)}</span>
            </div>
            
            {totalItems > 0 && (
              <Button 
                className="w-full mt-4 py-6 bg-[#002060] hover:bg-[#002060]/90 text-white font-medium"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    Buy now ${total.toFixed(2)}
                  </>
                )}
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderSummary;

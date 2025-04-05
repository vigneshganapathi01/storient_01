
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Cart from '@/components/cart/Cart';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const CartPage: React.FC = () => {
  const { totalItems, total, isLoading, fetchCartItems } = useCart();
  const navigate = useNavigate();
  
  // Fetch cart items when page loads
  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);
  
  const handleCheckout = () => {
    if (totalItems === 0) {
      toast.error("Your cart is empty. Please add items before checkout.");
      return;
    }
    
    navigate('/payment', { state: { price: total, packageName: `Cart (${totalItems} items)` } });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="max-container pt-24 pb-20">
          {/* Page heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-brand-blue">Shopping Cart</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Cart />
            </div>
            <div className="lg:col-span-1 space-y-6">
              {/* Order summary */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                {isLoading ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-brand-blue" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Items ({totalItems}):</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg pt-3 border-t mt-2">
                      <span>Order Total:</span>
                      <span className="text-brand-blue">${total.toFixed(2)}</span>
                    </div>
                    {totalItems > 0 && (
                      <Button 
                        className="w-full mt-4 py-6 text-white font-semibold"
                        onClick={handleCheckout}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          <>Buy now ${total.toFixed(2)}</>
                        )}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;

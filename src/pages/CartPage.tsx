
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Cart from '@/components/cart/Cart';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { totalItems, total } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
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
                    >
                      Buy now ${total.toFixed(2)}
                    </Button>
                  )}
                </div>
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

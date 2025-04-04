
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Cart from '@/components/cart/Cart';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { CreditCard, ShieldCheck, Lock } from 'lucide-react';

const CartPage: React.FC = () => {
  const { totalItems, total } = useCart();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-white">
        <div className="max-container pt-16 pb-20">
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
              <div className="bg-white rounded-lg border border-gray-200 p-6">
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
                </div>
              </div>
              
              {/* Secure checkout info */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-5">Secure Checkout</h3>
                <div className="space-y-5">
                  <div className="flex items-start">
                    <Lock className="h-5 w-5 mt-0.5 text-brand-blue mr-3" />
                    <div>
                      <p className="font-medium">Secure Transaction</p>
                      <p className="text-sm text-muted-foreground">Your payment information is protected</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ShieldCheck className="h-5 w-5 mt-0.5 text-brand-blue mr-3" />
                    <div>
                      <p className="font-medium">Money-Back Guarantee</p>
                      <p className="text-sm text-muted-foreground">30-day satisfaction guarantee</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CreditCard className="h-5 w-5 mt-0.5 text-brand-blue mr-3" />
                    <div>
                      <p className="font-medium">Accepted Payment Methods</p>
                      <div className="flex gap-3 mt-2">
                        <Badge variant="outline" className="bg-slate-100 px-3">Visa</Badge>
                        <Badge variant="outline" className="bg-slate-100 px-3">Mastercard</Badge>
                        <Badge variant="outline" className="bg-slate-100 px-3">PayPal</Badge>
                      </div>
                    </div>
                  </div>
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

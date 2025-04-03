
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Cart from '@/components/cart/Cart';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { Lock, ShieldCheck, CreditCard } from 'lucide-react';

const CartPage: React.FC = () => {
  const { totalItems, total } = useCart();
  
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
                </div>
              </div>
              
              {/* Secure checkout info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-3">Secure Checkout</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Lock className="h-5 w-5 mt-0.5 text-brand-blue mr-2" />
                    <div>
                      <p className="font-medium">Secure Transaction</p>
                      <p className="text-sm text-muted-foreground">Your payment information is protected</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ShieldCheck className="h-5 w-5 mt-0.5 text-brand-blue mr-2" />
                    <div>
                      <p className="font-medium">Money-Back Guarantee</p>
                      <p className="text-sm text-muted-foreground">30-day satisfaction guarantee</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CreditCard className="h-5 w-5 mt-0.5 text-brand-blue mr-2" />
                    <div>
                      <p className="font-medium">Accepted Payment Methods</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="bg-slate-100">Visa</Badge>
                        <Badge variant="outline" className="bg-slate-100">Mastercard</Badge>
                        <Badge variant="outline" className="bg-slate-100">PayPal</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Need help section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about your purchase or our templates, please don't hesitate to contact our support team.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-brand-blue font-medium mr-2">Email:</span>
                    <span>support@templatepro.com</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-brand-blue font-medium mr-2">Phone:</span>
                    <span>+1 (800) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-brand-blue font-medium mr-2">Hours:</span>
                    <span>Mon-Fri 9am-5pm EST</span>
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

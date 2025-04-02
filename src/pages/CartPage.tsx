
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Cart from '@/components/cart/Cart';

const CartPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="max-container pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Cart />
            </div>
            <div className="lg:col-span-1">
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

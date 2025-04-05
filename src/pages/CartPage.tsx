
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Cart from '@/components/cart/Cart';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Loader2, LogIn, ShoppingCart, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const CartPage: React.FC = () => {
  const { totalItems, total, subtotal, isLoading, fetchCartItems, isAuthenticated } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Fetch cart items when page loads
  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error("Please login to checkout");
      navigate('/signin');
      return;
    }
    
    if (totalItems === 0) {
      toast.error("Your cart is empty. Please add items before checkout.");
      return;
    }
    
    navigate('/payment', { state: { price: total, packageName: `Cart (${totalItems} items)` } });
  };

  const handleContinueShopping = () => {
    navigate('/templates');
  };

  const handleLogin = () => {
    navigate('/signin');
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-24">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
          
          {!isAuthenticated ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <LogIn className="h-12 w-12 mx-auto text-brand-blue mb-4" />
              <h2 className="text-2xl font-bold mb-4">Login Required</h2>
              <p className="text-muted-foreground mb-6">
                Please log in to view your cart and make purchases
              </p>
              <Button 
                className="bg-brand-blue hover:bg-brand-blue/90"
                onClick={handleLogin}
              >
                Login Now
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Cart />
              </div>
              <div className="lg:col-span-1">
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
                          <span className="text-gray-600">Subtotal</span>
                          <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax</span>
                          <span className="text-gray-900 font-medium">$0.00</span>
                        </div>
                        
                        <Separator className="my-2" />
                        
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Total</span>
                          <span className="text-brand-blue">${total.toFixed(2)}</span>
                        </div>
                        
                        {totalItems > 0 && (
                          <Button 
                            className="w-full mt-4 py-6 bg-blue-600 hover:bg-blue-700 text-white font-medium"
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
                                Buy Now <ArrowRight className="ml-2 h-5 w-5" />
                              </>
                            )}
                          </Button>
                        )}
                        
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2"
                          onClick={handleContinueShopping}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Continue Shopping
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;

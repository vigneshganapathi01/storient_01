
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Cart from '@/components/cart/Cart';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Loader2, LogIn, ShoppingCart, ArrowRight, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

const CartPage: React.FC = () => {
  const { totalItems, total, subtotal, isLoading, fetchCartItems, isAuthenticated, applyPromoCode, items } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  
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

  const handleApplyPromoCode = () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }
    applyPromoCode(promoCode);
    setPromoCode('');
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-24">
          <h1 className="text-3xl font-bold text-[#002060] mb-8">Shopping Cart</h1>
          
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
              <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Items ({totalItems})</h2>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => items.length > 0 && navigate('/cart/clear')}
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear Cart
                  </Button>
                </div>
                
                {items.map((item) => (
                  <div key={item.id} className="flex border-b border-gray-100 py-6">
                    <div className="w-[120px] h-[120px] bg-gray-50 rounded overflow-hidden">
                      <img 
                        src={item.image || '/placeholder.svg'} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 ml-6">
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      
                      <div className="flex justify-between items-end mt-4">
                        <div className="flex items-center">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 rounded-full"
                            onClick={() => item.quantity > 1 && navigate(`/cart/update/${item.id}?qty=${item.quantity - 1}`)}
                            disabled={item.quantity <= 1}
                          >
                            <span className="text-lg font-bold">-</span>
                          </Button>
                          
                          <span className="mx-4 w-6 text-center font-medium">{item.quantity}</span>
                          
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 rounded-full"
                            onClick={() => navigate(`/cart/update/${item.id}?qty=${item.quantity + 1}`)}
                          >
                            <span className="text-lg font-bold">+</span>
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <span className="font-bold text-xl">${(item.discountPrice || item.price).toFixed(2)}</span>
                          <Button 
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/cart/remove/${item.id}`)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <span className="text-sm">Remove</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {items.length === 0 && !isLoading && (
                  <div className="py-12 text-center">
                    <ShoppingCart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                    <p className="text-muted-foreground mb-6">
                      Looks like you haven't added any templates to your cart yet.
                    </p>
                  </div>
                )}
                
                {isLoading && (
                  <div className="py-12 flex justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
                  </div>
                )}
                
                <div className="mt-6">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={handleContinueShopping}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Continue Shopping
                  </Button>
                </div>
                
                <div className="mt-8 flex gap-4">
                  <Input 
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="max-w-[240px]"
                  />
                  <Button onClick={handleApplyPromoCode} className="bg-blue-500">Apply</Button>
                </div>
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

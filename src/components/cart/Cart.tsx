
import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Loader2, ShoppingCart, MinusCircle, PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';

const Cart: React.FC = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    totalItems, 
    isLoading,
    fetchCartItems,
    isAuthenticated 
  } = useCart();
  
  const [promoInput, setPromoInput] = useState('');
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Ensure cart items are loaded
  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const handleRemoveItem = async (id: string) => {
    if (!isAuthenticated) {
      toast.error("Please log in to modify your cart");
      navigate('/signin');
      return;
    }
    await removeFromCart(id);
  };

  const handleUpdateQuantity = async (id: string, currentQuantity: number, amount: number) => {
    if (!isAuthenticated) {
      toast.error("Please log in to modify your cart");
      navigate('/signin');
      return;
    }
    const newQuantity = Math.max(1, currentQuantity + amount);
    await updateQuantity(id, newQuantity);
  };

  const handleContinueShopping = () => {
    navigate('/templates');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40 bg-white rounded-lg shadow-sm p-6 animate-pulse">
        <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
        <span className="ml-2 text-lg">Loading your cart...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow-sm p-6 animate-fade-in">
        <h2 className="text-2xl font-bold mb-4">Please Login to View Your Cart</h2>
        <p className="text-muted-foreground mb-6">You need to be logged in to add items to your cart and make purchases.</p>
        <Button 
          className="bg-brand-blue hover:bg-brand-blue/90 mr-2" 
          onClick={() => navigate('/signin')}
        >
          Login Now
        </Button>
        <Button 
          variant="outline"
          onClick={handleContinueShopping}
        >
          Browse Templates
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow-sm p-6 animate-fade-in">
        <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-6">Browse our templates and add some to your cart!</p>
        <Button 
          className="bg-brand-blue hover:bg-brand-blue/90 transition-all" 
          onClick={handleContinueShopping}
        >
          Explore Templates
        </Button>
      </div>
    );
  }

  return (
    <Card className="animate-fade-in">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
          <h2 className="text-xl font-semibold">Cart Items ({totalItems})</h2>
          <Button 
            variant="outline" 
            size={isMobile ? "sm" : "default"}
            className="flex items-center gap-1 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200 transition-colors"
            onClick={() => clearCart()}
          >
            <Trash2 className="h-4 w-4" />
            {!isMobile && "Clear Cart"}
          </Button>
        </div>
        
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="pb-6 animate-fade-in transition-all hover:bg-gray-50 rounded-md p-2">
              <div className="flex flex-col sm:flex-row gap-4">
                {item.image && (
                  <div className="w-full sm:w-24 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0 transition-transform hover:scale-105">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    {item.type && (
                      <span className="text-sm text-muted-foreground">Template ID: {item.id}</span>
                    )}
                  </div>
                  
                  <div className="mt-2 flex flex-wrap justify-between items-end gap-2">
                    <div className="flex items-center space-x-3 mt-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-full transition-colors hover:bg-gray-100"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                        disabled={item.quantity <= 1 || !isAuthenticated}
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      
                      <span className="font-medium w-8 text-center">{item.quantity}</span>
                      
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-full transition-colors hover:bg-gray-100"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                        disabled={!isAuthenticated}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        {item.discountPrice ? (
                          <div className="flex items-center">
                            <span className="font-semibold text-lg">${item.discountPrice.toFixed(2)}</span>
                            <span className="text-muted-foreground line-through text-sm ml-2">${item.price.toFixed(2)}</span>
                          </div>
                        ) : (
                          <span className="font-semibold text-lg">${item.price.toFixed(2)}</span>
                        )}
                      </div>
                      
                      <Button 
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 p-0 h-8 transition-colors"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <Separator className="mt-6" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Cart;

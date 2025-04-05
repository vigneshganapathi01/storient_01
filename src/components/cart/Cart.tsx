
import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import CartLoading from './CartLoading';
import EmptyCartState from './EmptyCartState';
import CartItemList from './CartItemList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Cart: React.FC = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    totalItems, 
    subtotal,
    total,
    applyPromoCode,
    isLoading,
    fetchCartItems,
    isAuthenticated 
  } = useCart();
  
  const [promoCode, setPromoCode] = useState('');
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  // Ensure cart items are loaded
  useEffect(() => {
    try {
      fetchCartItems();
      setIsError(false);
    } catch (error) {
      setIsError(true);
    }
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

  const handleApplyPromoCode = () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }
    applyPromoCode(promoCode);
    setPromoCode('');
  };

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

  // Error state
  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-24">
        <h1 className="text-3xl font-bold mb-8 text-[#002060]">Shopping Cart</h1>
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-red-500 mb-4 text-2xl">⚠️</div>
          <h2 className="text-2xl font-bold mb-4">Error Loading Cart</h2>
          <p className="text-muted-foreground mb-6">
            We're having trouble connecting to our servers. Please try again later.
          </p>
          <Button onClick={() => {
            fetchCartItems();
            setIsError(false);
          }}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <CartLoading />;
  }

  if (!isAuthenticated || items.length === 0) {
    return <EmptyCartState isAuthenticated={isAuthenticated} />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-8 pb-16">
      <h1 className="text-3xl font-bold mb-8 text-[#002060]">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <CartItemList 
            items={items}
            totalItems={totalItems}
            handleUpdateQuantity={handleUpdateQuantity}
            handleRemoveItem={handleRemoveItem}
            clearCart={clearCart}
          />
          
          <div className="mt-8">
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
        </div>
      </div>
    </div>
  );
};

export default Cart;

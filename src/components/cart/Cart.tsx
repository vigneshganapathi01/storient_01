
import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { XCircle, Loader2, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    totalItems, 
    subtotal, 
    discount, 
    total, 
    applyPromoCode, 
    promoCode, 
    promoDiscount, 
    isLoading,
    fetchCartItems 
  } = useCart();
  
  const [promoInput, setPromoInput] = useState('');
  const navigate = useNavigate();

  // Ensure cart items are loaded
  useEffect(() => {
    // Force a refresh of cart items when component mounts
    fetchCartItems();
  }, []);

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleApplyPromo = () => {
    if (promoInput.trim()) {
      applyPromoCode(promoInput.trim());
      setPromoInput('');
    }
  };

  const handleContinueShopping = () => {
    navigate('/templates');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
        <span className="ml-2 text-lg">Loading your cart...</span>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-6">Browse our templates and add some to your cart!</p>
        <Button 
          className="bg-brand-blue hover:bg-brand-blue/90" 
          onClick={handleContinueShopping}
        >
          Explore Templates
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">Items ({totalItems})</h2>
      
      <div className="space-y-6 mb-8">
        {items.map((item) => (
          <div key={item.id} className="border rounded-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {item.image && (
                <div className="w-full md:w-1/2 h-48 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  {item.type && (
                    <span className="text-sm text-muted-foreground">{item.type}</span>
                  )}
                </div>
                
                <div className="mt-4 flex justify-between items-center">
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
                  
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Remove item"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="text-muted-foreground"
            onClick={handleContinueShopping}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
          
          <Button 
            variant="outline" 
            className="text-muted-foreground"
            onClick={() => clearCart()}
            disabled={items.length === 0}
          >
            Clear Cart
          </Button>
        </div>
        
        <div className="flex items-center">
          <Input
            placeholder="Enter promo code"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            className="rounded-r-none"
          />
          <Button 
            className="rounded-l-none bg-brand-lightBlue hover:bg-brand-lightBlue/90"
            onClick={handleApplyPromo}
          >
            Apply
          </Button>
        </div>
      </div>
      
      {promoCode && (
        <div className="mt-4 text-sm text-brand-purple">
          Promo code {promoCode} applied!
        </div>
      )}
    </div>
  );
};

export default Cart;

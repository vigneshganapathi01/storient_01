
import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { XCircle, Loader2, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
} from "@/components/ui/card";

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

  const handleCheckout = () => {
    navigate('/payment', { state: { price: total, packageName: `Cart (${totalItems} items)` } });
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
      <div className="text-center py-10">
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
    <Card className="border border-gray-200 bg-white">
      <CardContent className="p-0">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="bg-[#0a0e17] text-white p-6 rounded-md mb-6"
          >
            <div className="grid grid-cols-12 gap-4">
              {/* Left content with image */}
              <div className="col-span-7">
                <div className="bg-[#0a0e17] h-48 rounded-md relative overflow-hidden flex flex-col justify-between">
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="absolute top-0 left-0 w-full h-full object-cover" 
                    />
                  )}
                  <div className="mt-2 ml-2 z-10 flex flex-col space-y-1">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div key={star} className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      ))}
                      <span className="text-xs ml-1">No reviews yet</span>
                    </div>
                  </div>
                  <div className="bg-blue-600 text-white px-4 py-2 rounded z-10 w-fit mx-auto mb-2">
                    Buy now ${item.price.toFixed(2)}
                  </div>
                </div>
              </div>
              
              {/* Right content with details */}
              <div className="col-span-5">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <ul className="text-sm space-y-1 list-disc pl-5">
                  <li>Created by expert consultants</li>
                  <li>24+ PowerPoint slides & 1 Excel model</li>
                  <li>3.5-6 words, real finance/CEO case example</li>
                </ul>
                
                <div className="flex justify-end mt-4">
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <XCircle size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="p-6">
          <div className="flex flex-col gap-3 mt-8">
            <Button 
              className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white py-6 text-lg"
              onClick={handleCheckout}
              disabled={items.length === 0}
            >
              Secure Checkout
            </Button>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 text-muted-foreground"
                onClick={handleContinueShopping}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 text-muted-foreground"
                onClick={() => clearCart()}
                disabled={items.length === 0}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Cart;

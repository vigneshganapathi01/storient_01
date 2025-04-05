
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, ShoppingCart, Trash2 } from 'lucide-react';
import { CartItem } from '@/types/cart';
import { Input } from '@/components/ui/input';

interface CartItemDisplayProps {
  items: CartItem[];
  isLoading: boolean;
  handleContinueShopping: () => void;
  handleRemoveItem: (id: string) => void;
  handleUpdateItemQuantity: (id: string, newQuantity: number) => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  handleApplyPromoCode: () => void;
  clearCart: () => Promise<void>;
}

const CartItemDisplay: React.FC<CartItemDisplayProps> = ({
  items,
  isLoading,
  handleContinueShopping,
  handleRemoveItem,
  handleUpdateItemQuantity,
  promoCode,
  setPromoCode,
  handleApplyPromoCode,
  clearCart
}) => {
  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Items ({items.length})</h2>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
          onClick={() => items.length > 0 && clearCart()}
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
                  onClick={() => item.quantity > 1 && handleUpdateItemQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <span className="text-lg font-bold">-</span>
                </Button>
                
                <span className="mx-4 w-6 text-center font-medium">{item.quantity}</span>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleUpdateItemQuantity(item.id, item.quantity + 1)}
                >
                  <span className="text-lg font-bold">+</span>
                </Button>
              </div>
              
              <div className="flex items-center gap-6">
                <span className="font-bold text-xl">${(item.discountPrice || item.price).toFixed(2)}</span>
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveItem(item.id)}
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
  );
};

export default CartItemDisplay;

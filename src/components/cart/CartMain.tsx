
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { CartItem } from '@/types/cart';
import CartItemList from './CartItemList';
import PromoCodeInput from './PromoCodeInput';

interface CartMainProps {
  items: CartItem[];
  totalItems: number;
  handleUpdateQuantity: (id: string, currentQuantity: number, amount: number) => Promise<void>;
  handleRemoveItem: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  handleContinueShopping: () => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  handleApplyPromoCode: () => void;
}

const CartMain: React.FC<CartMainProps> = ({
  items,
  totalItems,
  handleUpdateQuantity,
  handleRemoveItem,
  clearCart,
  handleContinueShopping,
  promoCode,
  setPromoCode,
  handleApplyPromoCode
}) => {
  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Items ({totalItems})</h2>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1 border-gray-300"
          onClick={() => clearCart()}
          disabled={items.length === 0}
        >
          <ShoppingCart className="h-4 w-4" />
          Clear Cart
        </Button>
      </div>
      
      {items.length > 0 ? (
        <CartItemList
          items={items}
          totalItems={totalItems}
          handleUpdateQuantity={handleUpdateQuantity}
          handleRemoveItem={handleRemoveItem}
          clearCart={clearCart}
        />
      ) : (
        <div className="py-12 text-center">
          <ShoppingCart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any templates to your cart yet.
          </p>
        </div>
      )}
      
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
      
      <PromoCodeInput 
        promoCode={promoCode}
        setPromoCode={setPromoCode}
        handleApplyPromoCode={handleApplyPromoCode}
      />
    </div>
  );
};

export default CartMain;

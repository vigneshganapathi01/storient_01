
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import CartItem from './CartItem';
import { CartItem as CartItemType } from '@/types/cart';

interface CartItemListProps {
  items: CartItemType[];
  totalItems: number;
  handleUpdateQuantity: (id: string, currentQuantity: number, amount: number) => Promise<void>;
  handleRemoveItem: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartItemList: React.FC<CartItemListProps> = ({
  items,
  totalItems,
  handleUpdateQuantity,
  handleRemoveItem,
  clearCart
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Cart Items ({totalItems})</h2>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
          onClick={() => clearCart()}
        >
          <Trash2 className="h-4 w-4" />
          Clear Cart
        </Button>
      </div>
      
      <div className="space-y-6">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            handleUpdateQuantity={handleUpdateQuantity}
            handleRemoveItem={handleRemoveItem}
          />
        ))}
      </div>
    </div>
  );
};

export default CartItemList;

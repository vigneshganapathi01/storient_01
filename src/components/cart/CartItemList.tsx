
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus } from 'lucide-react';

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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Items ({totalItems})</h2>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1 border-gray-300"
          onClick={() => clearCart()}
        >
          <Trash2 className="h-4 w-4" />
          Clear Cart
        </Button>
      </div>
      
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex border-b border-gray-100 pb-6">
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
                    onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  
                  <span className="mx-4 w-6 text-center font-medium">{item.quantity}</span>
                  
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                  >
                    <Plus className="h-4 w-4" />
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
      </div>
    </div>
  );
};

export default CartItemList;

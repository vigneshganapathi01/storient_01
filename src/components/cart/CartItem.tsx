
import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { CartItem as CartItemType } from '@/types/cart';

interface CartItemProps {
  item: CartItemType;
  handleUpdateQuantity: (id: string, currentQuantity: number, amount: number) => Promise<void>;
  handleRemoveItem: (id: string) => Promise<void>;
}

const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  handleUpdateQuantity,
  handleRemoveItem 
}) => {
  return (
    <div className="py-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {item.image && (
          <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex flex-col justify-between flex-grow">
          <div>
            <h3 className="font-semibold text-lg">{item.title}</h3>
            {item.type && (
              <span className="text-sm text-muted-foreground">{item.type}</span>
            )}
          </div>
          
          <div className="mt-2 flex flex-wrap justify-between items-end">
            <div className="flex items-center space-x-3 mt-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              
              <span className="font-medium w-8 text-center">{item.quantity}</span>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
              >
                <Plus className="h-4 w-4" />
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
                className="text-red-500 hover:text-red-600 hover:bg-red-50 p-0 h-8"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

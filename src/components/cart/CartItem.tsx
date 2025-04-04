
import React from 'react';
import { XCircle } from 'lucide-react';
import { CartItem as CartItemType } from '@/types/cart';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div className="bg-[#0a0e17] text-white p-6 rounded-md mb-6">
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
              onClick={() => onRemove(item.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Remove item"
            >
              <XCircle size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

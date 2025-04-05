
import React from 'react';
import { Loader2 } from 'lucide-react';

const CartLoading: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-8 pb-16">
      <h1 className="text-3xl font-bold mb-8 text-[#002060]">Shopping Cart</h1>
      <div className="flex justify-center items-center h-40 bg-white rounded-lg shadow-sm p-6">
        <Loader2 className="h-8 w-8 animate-spin text-brand-blue mr-2" />
        <span className="text-lg">Loading your cart...</span>
      </div>
    </div>
  );
};

export default CartLoading;


import React from 'react';
import { Loader2 } from 'lucide-react';

const CartLoading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-40 bg-white rounded-lg shadow-sm p-6">
      <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
      <span className="ml-2 text-lg">Loading your cart...</span>
    </div>
  );
};

export default CartLoading;

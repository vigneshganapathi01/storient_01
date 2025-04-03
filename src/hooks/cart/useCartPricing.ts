
import { useMemo } from 'react';
import { CartItem } from '@/types/cart';
import { calculateCartTotals } from '@/utils/cartUtils';

export const useCartPricing = (items: CartItem[]) => {
  // Calculate totals from cart items
  const { totalItems, subtotal, discount } = useMemo(() => 
    calculateCartTotals(items), 
    [items]
  );

  return {
    totalItems,
    subtotal,
    discount
  };
};

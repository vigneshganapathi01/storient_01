
import { useState } from 'react';
import { handlePromoCode } from '@/utils/cartUtils';
import { toast } from 'sonner';

export const usePromoCode = (subtotal: number) => {
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);

  // Apply promo code
  const applyPromoCode = (code: string) => {
    const result = handlePromoCode(code, subtotal);
    
    if (result.isValid) {
      setPromoCode(code);
      setPromoDiscount(result.discount);
      toast.success(`Promo code applied! You saved $${result.discount.toFixed(2)}`);
    } else {
      toast.error('Invalid promo code');
    }
  };

  return {
    promoCode,
    promoDiscount,
    applyPromoCode
  };
};

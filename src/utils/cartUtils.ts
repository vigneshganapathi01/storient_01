
import { CartItem } from '@/types/cart';

// Calculate totals from cart items
export const calculateCartTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.discountPrice || item.price;
    return sum + (itemPrice * item.quantity);
  }, 0);
  
  const discount = items.reduce((sum, item) => {
    if (item.discountPrice && item.price > item.discountPrice) {
      return sum + ((item.price - item.discountPrice) * item.quantity);
    }
    return sum;
  }, 0);

  return { totalItems, subtotal, discount };
};

// Handle promo code application
export const handlePromoCode = (code: string, subtotal: number): { isValid: boolean; discount: number } => {
  // Simple promo code implementation - in a real app you'd validate against a database
  const validPromos: Record<string, number> = {
    'WELCOME10': 10,
    'SAVE20': 20,
    'TEMPLATE50': 50
  };
  
  if (code in validPromos) {
    const discountAmount = (subtotal * validPromos[code]) / 100;
    return { 
      isValid: true, 
      discount: Number(discountAmount.toFixed(2)) 
    };
  }
  
  return { isValid: false, discount: 0 };
};

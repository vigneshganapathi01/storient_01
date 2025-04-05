
import { useState } from 'react';
import { CartItem } from '@/types/cart';
import { useCartItems } from './useCartItems';
import { useCartPricing } from './useCartPricing';
import { usePromoCode } from './usePromoCode';

export const useCart = (user: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Get cart items functionality
  const { 
    items, 
    setItems, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    fetchCartItems 
  } = useCartItems(user, setIsLoading);
  
  // Get cart pricing functionality
  const { totalItems, subtotal, discount } = useCartPricing(items);
  
  // Get promo code functionality
  const {
    promoCode,
    promoDiscount,
    applyPromoCode
  } = usePromoCode(subtotal);
  
  // Calculate final total with promo discount
  const total = subtotal - promoDiscount;

  return {
    // Cart items
    items,
    setItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    fetchCartItems,
    
    // Cart pricing
    totalItems,
    subtotal,
    discount,
    total,
    
    // Promo code
    promoCode,
    promoDiscount,
    applyPromoCode,
    
    // Loading state
    isLoading,
    
    // Authentication state
    isAuthenticated: !!user
  };
};


import React, { createContext, useContext } from 'react';
import { CartContextProps } from '@/types/cart';

// Create an empty cart context with stub functions
const CartContext = createContext<CartContextProps>({
  items: [],
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateQuantity: async () => {},
  clearCart: async () => {},
  totalItems: 0,
  subtotal: 0,
  discount: 0,
  total: 0,
  applyPromoCode: () => {},
  promoCode: null,
  promoDiscount: 0,
  isLoading: false,
  fetchCartItems: async () => {},
  isAuthenticated: false
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Create a minimal context value with no actual functionality
  const emptyCartValue: CartContextProps = {
    items: [],
    addToCart: async () => {},
    removeFromCart: async () => {},
    updateQuantity: async () => {},
    clearCart: async () => {},
    totalItems: 0,
    subtotal: 0,
    discount: 0,
    total: 0,
    applyPromoCode: () => {},
    promoCode: null,
    promoDiscount: 0,
    isLoading: false,
    fetchCartItems: async () => {},
    isAuthenticated: false
  };

  return (
    <CartContext.Provider value={emptyCartValue}>
      {children}
    </CartContext.Provider>
  );
};

// Maintain the hook for backward compatibility with existing code
export const useCart = (): CartContextProps => {
  return useContext(CartContext);
};

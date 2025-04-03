import React, { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { CartContextProps } from '@/types/cart';
import { useCartOperations } from '@/hooks/useCartOperations';

// Create context with undefined default value
const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const {
    items,
    setItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    discount,
    total,
    applyPromoCode,
    promoCode,
    promoDiscount,
    isLoading,
    fetchCartItems
  } = useCartOperations(user);

  // Check for pending cart item after login
  useEffect(() => {
    const handlePendingCartItem = async () => {
      const pendingItem = sessionStorage.getItem('pendingCartItem');
      
      if (user && pendingItem) {
        try {
          const item = JSON.parse(pendingItem);
          await addToCart(item);
          sessionStorage.removeItem('pendingCartItem');
        } catch (error) {
          console.error('Error adding pending item to cart:', error);
        }
      }
    };
    
    handlePendingCartItem();
  }, [user]);

  // Load cart from Supabase when user logs in
  useEffect(() => {
    if (!authLoading) {
      if (user) {
        fetchCartItems();
      } else {
        // If no user but we had previous items, keep them in local state
        // They'll be synced when user logs in
        setItems([]);
      }
    }
  }, [user, authLoading]);

  // Create a value object with all the required context properties
  const contextValue: CartContextProps = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    discount,
    total,
    applyPromoCode,
    promoCode,
    promoDiscount,
    isLoading,
    fetchCartItems
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context with proper error checking
export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

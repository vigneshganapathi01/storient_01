
import React, { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { CartContextProps } from '@/types/cart';
import { useCartHook } from '@/hooks/cart';

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
  } = useCartHook(user);

  // Check for pending cart items after login
  useEffect(() => {
    const handlePendingCartItems = async () => {
      const pendingItems = sessionStorage.getItem('pendingCartItems');
      
      if (user && pendingItems) {
        try {
          const items = JSON.parse(pendingItems);
          
          // Clear existing cart first
          await clearCart();
          
          // Add each pending item to the cart
          for (const item of items) {
            await addToCart(item);
          }
          
          // Clear pending items
          sessionStorage.removeItem('pendingCartItems');
        } catch (error) {
          console.error('Error adding pending items to cart:', error);
        }
      }
    };
    
    handlePendingCartItems();
  }, [user]);

  // Load cart when user logs in or out
  useEffect(() => {
    if (!authLoading) {
      fetchCartItems();
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

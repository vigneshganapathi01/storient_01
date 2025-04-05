
import { useState, useCallback } from 'react';
import { CartItem } from '@/types/cart';
import {
  fetchCartItems as fetchCartItemsAction,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  clearAllCartItems
} from './cartActions';

export const useCartItems = (user: any, setIsLoading: (loading: boolean) => void) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Fetch cart items from Supabase
  const fetchCartItems = useCallback(async () => {
    await fetchCartItemsAction(user, setItems, setIsLoading);
  }, [user, setIsLoading]);

  // Add item to cart
  const addToCart = async (item: Omit<CartItem, 'quantity'>) => {
    await addItemToCart(
      user, 
      item, 
      items, 
      setItems, 
      setIsLoading, 
      updateQuantity
    );
  };

  // Remove item from cart
  const removeFromCart = async (itemId: string) => {
    await removeItemFromCart(
      user, 
      itemId, 
      items, 
      setItems, 
      setIsLoading, 
      fetchCartItems
    );
  };

  // Update item quantity
  const updateQuantity = async (itemId: string, quantity: number) => {
    await updateItemQuantity(
      user, 
      itemId, 
      quantity, 
      items, 
      setItems, 
      setIsLoading, 
      fetchCartItems,
      removeFromCart
    );
  };

  // Clear the entire cart
  const clearCart = async () => {
    await clearAllCartItems(
      user,
      setItems,
      setIsLoading,
      fetchCartItems
    );
  };

  return {
    items,
    setItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    fetchCartItems
  };
};

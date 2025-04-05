import { useState } from 'react';
import { CartItem } from '@/types/cart';
import { toast } from 'sonner';
import { useCartDatabase } from './useCartDatabase';

/**
 * Hook for cart item operations
 */
export const useCartOperations = (user: any, setIsLoading: (loading: boolean) => void) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { 
    addItemToDatabase,
    removeItemFromDatabase,
    updateItemQuantityInDatabase,
    clearCartInDatabase,
    fetchCartItemsFromDatabase
  } = useCartDatabase();

  // Fetch cart items
  const fetchCartItems = async () => {
    setIsLoading(true);
    try {
      if (user) {
        const cartItems = await fetchCartItemsFromDatabase(user.id);
        setItems(cartItems);
      } else {
        // If user is not logged in, don't show any cart items
        setItems([]);
        console.log("User not logged in, cart is empty");
      }
    } catch (error: any) {
      console.error('Error in fetchCartItems:', error);
      toast.error(`Failed to load cart: ${error.message}`);
      // Reset items to prevent displaying stale data
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (item: Omit<CartItem, 'quantity'>) => {
    try {
      setIsLoading(true);
      
      if (!user) {
        toast.error("Please log in to add items to your cart");
        return;
      }
      
      // Check if item already exists in cart
      const existingItemIndex = items.findIndex(i => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const newQuantity = items[existingItemIndex].quantity + 1;
        await updateQuantity(item.id, newQuantity);
        
        toast.success(`${item.title} quantity updated in cart!`);
      } else {
        // Otherwise add new item
        const newItem: CartItem = { ...item, quantity: 1, addedAt: new Date().toISOString() };
        
        // Add item to database since user is logged in
        await addItemToDatabase(user.id, item.id, item.price);
        
        // Update local state
        setItems(prev => [...prev, newItem]);
        
        toast.success(`${item.title} added to cart!`);
      }
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      toast.error(`Failed to add item to cart: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId: string) => {
    try {
      setIsLoading(true);
      
      if (!user) {
        toast.error("Please log in to remove items from your cart");
        return;
      }
      
      // Remove from local state
      const updatedItems = items.filter(item => item.id !== itemId);
      setItems(updatedItems);
      
      // Remove from database since user is logged in
      await removeItemFromDatabase(user.id, itemId);
      
      toast.success('Item removed from cart');
    } catch (error: any) {
      console.error('Error removing from cart:', error);
      toast.error(`Failed to remove item: ${error.message}`);
      // Refresh cart items if there was an error
      fetchCartItems();
    } finally {
      setIsLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      await removeFromCart(itemId);
      return;
    }
    
    try {
      setIsLoading(true);
      
      if (!user) {
        toast.error("Please log in to update item quantities");
        return;
      }
      
      // Find the item to get its price
      const item = items.find(item => item.id === itemId);
      if (!item) {
        toast.error("Item not found");
        return;
      }
      
      // Update local state
      const updatedItems = items.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      );
      setItems(updatedItems);
      
      // Calculate the total price for this item
      const itemPrice = item.discountPrice || item.price;
      
      // Update in database since user is logged in
      await updateItemQuantityInDatabase(user.id, itemId, quantity, itemPrice);
    } catch (error: any) {
      console.error('Error updating quantity:', error);
      toast.error(`Failed to update quantity: ${error.message}`);
      // Refresh cart items if there was an error
      fetchCartItems();
    } finally {
      setIsLoading(false);
    }
  };

  // Clear the entire cart
  const clearCart = async () => {
    try {
      setIsLoading(true);
      
      if (!user) {
        toast.error("Please log in to clear your cart");
        return;
      }
      
      // Clear local state
      setItems([]);
      
      // Clear from database since user is logged in
      await clearCartInDatabase(user.id);
      
      toast.success('Cart cleared');
    } catch (error: any) {
      console.error('Error clearing cart:', error);
      toast.error(`Failed to clear cart: ${error.message}`);
      // Refresh cart items if there was an error
      fetchCartItems();
    } finally {
      setIsLoading(false);
    }
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

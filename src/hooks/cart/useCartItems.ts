import { useState } from 'react';
import { CartItem } from '@/types/cart';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { addToCartDB } from '@/services/templateService';
import { fetchCartItemsFromDB } from '@/utils/cartUtils';

export const useCartItems = (user: any, setIsLoading: (loading: boolean) => void) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Fetch cart items from Supabase
  const fetchCartItems = async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      
      const cartItemsWithTemplates = await fetchCartItemsFromDB(user.id);
      setItems(cartItemsWithTemplates);
    } catch (error: any) {
      console.error('Error in fetchCartItems:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (item: Omit<CartItem, 'quantity'>) => {
    if (!user) {
      // Store the item in session storage to add after sign in
      sessionStorage.setItem('pendingCartItem', JSON.stringify(item));
      toast.info("Please sign in to add items to your cart");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Check if item already exists in cart
      const existingItemIndex = items.findIndex(i => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const newQuantity = items[existingItemIndex].quantity + 1;
        await updateQuantity(item.id, newQuantity);
        
        toast.success(`${item.title} quantity updated in cart!`);
      } else {
        // Otherwise add new item
        const newItem = { ...item, quantity: 1 };
        
        // Add item to database
        await addToCartDB(user.id, item.id);
        
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
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Remove from local state
      setItems(prev => prev.filter(item => item.id !== itemId));
      
      // Remove from database
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('template_id', itemId);
      
      if (error) throw error;
      
      toast.success('Item removed from cart');
    } catch (error: any) {
      console.error('Error removing from cart:', error);
      toast.error(`Failed to remove item: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!user) return;
    
    if (quantity < 1) {
      await removeFromCart(itemId);
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Update local state
      setItems(prev => 
        prev.map(item => 
          item.id === itemId ? { ...item, quantity } : item
        )
      );
      
      // Update in database
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('user_id', user.id)
        .eq('template_id', itemId);
      
      if (error) throw error;
    } catch (error: any) {
      console.error('Error updating quantity:', error);
      toast.error(`Failed to update quantity: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear the entire cart
  const clearCart = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Clear local state
      setItems([]);
      
      // Clear from database
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      toast.success('Cart cleared');
    } catch (error: any) {
      console.error('Error clearing cart:', error);
      toast.error(`Failed to clear cart: ${error.message}`);
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

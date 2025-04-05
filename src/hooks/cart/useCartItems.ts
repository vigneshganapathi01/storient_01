
import { useState } from 'react';
import { CartItem } from '@/types/cart';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { fetchTemplateById } from '@/services/templateService';

export const useCartItems = (user: any, setIsLoading: (loading: boolean) => void) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Fetch cart items from Supabase
  const fetchCartItems = async () => {
    setIsLoading(true);
    try {
      if (user) {
        console.log("Fetching cart items for user:", user.id);
        
        // First get the cart items
        const { data: cartItems, error: cartError } = await supabase
          .from('cart_items')
          .select('*')
          .eq('user_id', user.id);
        
        if (cartError) {
          console.error('Error fetching cart items:', cartError);
          throw cartError;
        }
        
        console.log("Cart items fetched:", cartItems);
        
        // If we got cart items, fetch the related template details for each
        if (cartItems && cartItems.length > 0) {
          const cartItemsWithTemplates: CartItem[] = [];
          
          // For each cart item, get the template details
          for (const item of cartItems) {
            try {
              const template = await fetchTemplateById(item.template_id);
              
              if (template) {
                // Transform data to match CartItem interface
                cartItemsWithTemplates.push({
                  id: item.template_id,
                  title: template.title,
                  price: template.price,
                  discountPrice: template.discount_percentage 
                    ? Number((template.price * (1 - template.discount_percentage / 100)).toFixed(2))
                    : null,
                  image: template.image_url,
                  quantity: item.quantity || 1,
                  type: template.category,
                  isPack: template.is_pack,
                  addedAt: item.created_at,
                  templateId: template.id
                });
              }
            } catch (err) {
              console.error(`Error fetching template ${item.template_id}:`, err);
            }
          }
          
          console.log("Final cart items with details:", cartItemsWithTemplates);
          setItems(cartItemsWithTemplates);
        } else {
          setItems([]);
        }
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
        await addToCartDB(user.id, item.id, item.price);
        
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
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('template_id', itemId);
      
      if (error) {
        console.error('Error removing from cart:', error);
        throw error;
      }
      
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
      const totalPrice = itemPrice * quantity;
      
      // Update in database since user is logged in
      const { error } = await supabase
        .from('cart_items')
        .update({ 
          quantity,
          total_price: totalPrice,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('template_id', itemId);
      
      if (error) {
        console.error('Error updating quantity:', error);
        throw error;
      }
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
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);
      
      if (error) {
        console.error('Error clearing cart:', error);
        throw error;
      }
      
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

  // Add to cart database helper
  const addToCartDB = async (userId: string, templateId: string, price: number): Promise<void> => {
    try {
      // First check if the item already exists in the cart
      const { data, error: fetchError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId)
        .eq('template_id', templateId)
        .maybeSingle();
      
      if (fetchError) {
        console.error('Error checking if item exists in cart:', fetchError);
        throw fetchError;
      }
      
      // If the item already exists, update the quantity, otherwise insert a new item
      if (data) {
        // Item exists, update the quantity
        const newQuantity = data.quantity + 1;
        const totalPrice = price * newQuantity;
        
        const { error: updateError } = await supabase
          .from('cart_items')
          .update({ 
            quantity: newQuantity,
            total_price: totalPrice,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId)
          .eq('template_id', templateId);
          
        if (updateError) {
          console.error('Error updating cart item quantity:', updateError);
          throw updateError;
        }
      } else {
        // Item doesn't exist, insert a new one
        const { error: insertError } = await supabase
          .from('cart_items')
          .insert({
            user_id: userId,
            template_id: templateId,
            quantity: 1,
            price_per_item: price,
            total_price: price,
            created_at: new Date().toISOString()
          });
          
        if (insertError) {
          console.error('Error adding item to cart:', insertError);
          throw insertError;
        }
      }
    } catch (error) {
      console.error('Error in addToCartDB:', error);
      throw error;
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

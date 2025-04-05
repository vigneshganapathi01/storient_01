
import { supabase } from '@/integrations/supabase/client';
import { CartItem } from '@/types/cart';
import { toast } from 'sonner';
import { fetchTemplateById } from '@/services/templateService';

/**
 * Hook for handling cart database operations
 */
export const useCartDatabase = () => {
  // Add item to cart in database
  const addItemToDatabase = async (userId: string, templateId: string, price: number): Promise<void> => {
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
  
  // Remove item from cart in database
  const removeItemFromDatabase = async (userId: string, templateId: string): Promise<void> => {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
      .eq('template_id', templateId);
    
    if (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };
  
  // Update item quantity in database
  const updateItemQuantityInDatabase = async (userId: string, templateId: string, quantity: number, itemPrice: number): Promise<void> => {
    const totalPrice = itemPrice * quantity;
    
    const { error } = await supabase
      .from('cart_items')
      .update({ 
        quantity,
        total_price: totalPrice,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('template_id', templateId);
    
    if (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  };
  
  // Clear all cart items from database
  const clearCartInDatabase = async (userId: string): Promise<void> => {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };
  
  // Fetch cart items from database and transform them
  const fetchCartItemsFromDatabase = async (userId: string): Promise<CartItem[]> => {
    try {
      if (!userId) {
        console.log("No user ID provided, returning empty cart");
        return [];
      }
      
      console.log("Fetching cart items for user:", userId);
      
      // First get the cart items
      const { data: cartItems, error: cartError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId);
      
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
        return cartItemsWithTemplates;
      }
      
      return [];
    } catch (error: any) {
      console.error('Error in fetchCartItemsFromDatabase:', error);
      throw error;
    }
  };

  return {
    addItemToDatabase,
    removeItemFromDatabase,
    updateItemQuantityInDatabase,
    clearCartInDatabase,
    fetchCartItemsFromDatabase
  };
};

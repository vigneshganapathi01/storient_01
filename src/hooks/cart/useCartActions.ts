
import { supabase } from '@/integrations/supabase/client';
import { CartItem } from '@/types/cart';
import { toast } from 'sonner';

// Helper function to add an item to the cart database
export const addToCartDB = async (userId: string, templateId: string, price: number): Promise<void> => {
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

// Helper function to remove an item from the cart
export const removeFromCartDB = async (userId: string, itemId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
      .eq('template_id', itemId);
    
    if (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in removeFromCartDB:', error);
    throw error;
  }
};

// Helper function to update item quantity in the cart
export const updateQuantityDB = async (
  userId: string, 
  itemId: string, 
  quantity: number, 
  itemPrice: number
): Promise<void> => {
  try {
    const totalPrice = itemPrice * quantity;
    
    const { error } = await supabase
      .from('cart_items')
      .update({ 
        quantity,
        total_price: totalPrice,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('template_id', itemId);
    
    if (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in updateQuantityDB:', error);
    throw error;
  }
};

// Helper function to clear the entire cart
export const clearCartDB = async (userId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in clearCartDB:', error);
    throw error;
  }
};

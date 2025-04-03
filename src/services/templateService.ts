
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type Template = Tables<'templates'>;

export const fetchTemplates = async (): Promise<Template[]> => {
  const { data, error } = await supabase
    .from('templates')
    .select('*');

  if (error) {
    console.error('Error fetching templates:', error);
    throw error;
  }

  return data || [];
};

export const fetchTemplateById = async (id: string): Promise<Template | null> => {
  console.log("Fetching template details for:", id);
  
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching template by id:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in fetchTemplateById:', error);
    return null;
  }
};

// Function to add or update cart item in the database
export const addToCartDB = async (userId: string, templateId: string, quantity: number = 1) => {
  // First check if the item already exists in the cart
  const { data: existingItem, error: checkError } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', userId)
    .eq('template_id', templateId)
    .maybeSingle();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking cart item:', checkError);
    throw checkError;
  }

  // If item exists, update quantity
  if (existingItem) {
    const { error: updateError } = await supabase
      .from('cart_items')
      .update({ quantity: existingItem.quantity + quantity })
      .eq('user_id', userId)
      .eq('template_id', templateId);

    if (updateError) {
      console.error('Error updating cart item:', updateError);
      throw updateError;
    }
  } else {
    // If item doesn't exist, insert new item
    const { error: insertError } = await supabase
      .from('cart_items')
      .insert({
        user_id: userId,
        template_id: templateId,
        quantity
      });

    if (insertError) {
      console.error('Error adding item to cart:', insertError);
      throw insertError;
    }
  }

  return true;
};

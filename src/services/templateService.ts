
import { supabase } from '@/integrations/supabase/client';

// Add an item to a user's cart
export const addToCartDB = async (userId: string, templateId: string): Promise<void> => {
  const { error } = await supabase
    .from('cart_items')
    .upsert({
      user_id: userId,
      template_id: templateId,
      quantity: 1
    }, {
      onConflict: 'user_id,template_id',
      ignoreDuplicates: false
    });

  if (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// Fetch a template by ID
export const fetchTemplateById = async (templateId: string) => {
  console.log('Fetching template details for:', templateId);
  
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', templateId)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching template:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching template:', error);
    throw error;
  }
};

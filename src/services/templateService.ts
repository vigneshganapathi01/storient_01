
import { supabase } from '@/integrations/supabase/client';

// Define Template type
export interface Template {
  id: string;
  title: string;
  price: number;
  image_url?: string;
  category?: string;
  discount_percentage?: number;
  is_pack?: boolean;
  created_at?: string;
  updated_at?: string;
  description?: string;
}

// Fetch templates from the database
export const fetchTemplates = async (): Promise<Template[]> => {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*');
    
    if (error) {
      console.error('Error fetching templates:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching templates:', error);
    throw error;
  }
};

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

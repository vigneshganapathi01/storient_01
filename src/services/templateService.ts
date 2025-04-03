
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
  review_count?: number;
  slug?: string;
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
    const { error: updateError } = await supabase
      .from('cart_items')
      .update({ 
        quantity: data.quantity + 1,
        updated_at: new Date().toISOString() // Convert Date to ISO string
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
        quantity: 1
      });
      
    if (insertError) {
      console.error('Error adding item to cart:', insertError);
      throw insertError;
    }
  }
};

// Fetch a template by ID
export const fetchTemplateById = async (templateId: string): Promise<Template | null> => {
  console.log('Fetching template details for:', templateId);
  
  try {
    // First check if the template exists in the database
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', templateId)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching template:', error);
      throw error;
    }
    
    // If the template exists, also fetch the review count
    if (data) {
      // Count reviews for this template
      const { count, error: countError } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .eq('template_id', data.id);
      
      if (countError) {
        console.error('Error counting reviews:', countError);
      } else if (count !== null) {
        // Add the review count to the template data
        data.review_count = count;
      }
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching template:', error);
    throw error;
  }
};

// Fetch a template by slug (new function)
export const fetchTemplateBySlug = async (slug: string): Promise<Template | null> => {
  console.log('Fetching template details for slug:', slug);
  
  try {
    // First check if the template exists in the database
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching template by slug:', error);
      throw error;
    }
    
    // If the template exists, also fetch the review count
    if (data) {
      // Count reviews for this template
      const { count, error: countError } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .eq('template_id', data.id);
      
      if (countError) {
        console.error('Error counting reviews:', countError);
      } else if (count !== null) {
        // Add the review count to the template data
        data.review_count = count;
      }
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching template by slug:', error);
    throw error;
  }
};

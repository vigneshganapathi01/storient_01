
import { supabase } from '@/integrations/supabase/client';
import { CartItem } from '@/types/cart';

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
      console.error('Error fetching template by ID:', error);
      throw error;
    }
    
    // If the template exists, also fetch the review count
    if (data) {
      const templateWithCount = data as Template;
      
      // Count reviews for this template
      const { count, error: countError } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .eq('template_id', templateWithCount.id);
      
      if (countError) {
        console.error('Error counting reviews:', countError);
      } else if (count !== null) {
        // Add the review count to the template data
        templateWithCount.review_count = count;
      }
      
      return templateWithCount;
    }
    
    // If not found by ID, try by slug as fallback
    const { data: slugData, error: slugError } = await supabase
      .from('templates')
      .select('*')
      .eq('slug', templateId)
      .maybeSingle();
      
    if (slugError) {
      console.error('Error fetching template by slug fallback:', slugError);
    } else if (slugData) {
      return slugData as Template;
    }
    
    console.log('Template not found in database, returning null');
    return null;
  } catch (error) {
    console.error('Error fetching template:', error);
    throw error;
  }
};

// Fetch a template by slug
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
      const templateWithCount = data as Template;
      
      // Count reviews for this template
      const { count, error: countError } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .eq('template_id', templateWithCount.id);
      
      if (countError) {
        console.error('Error counting reviews:', countError);
      } else if (count !== null) {
        // Add the review count to the template data
        templateWithCount.review_count = count;
      }
      
      return templateWithCount;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching template by slug:', error);
    throw error;
  }
};

// Create a purchase history record with proper type handling
export const createPurchaseHistory = async (userId: string, items: CartItem[], totalAmount: number): Promise<void> => {
  try {
    // Only proceed if user is logged in
    if (!userId) {
      console.log('User not logged in, skipping purchase history creation');
      return;
    }
    
    console.log('Creating purchase history for user:', userId);
    
    // Fix: Use type assertion to properly match expected RPC parameter types
    const { error } = await supabase.rpc('create_purchase_history', {
      p_user_id: userId as any,
      p_items: items as any,
      p_total_amount: totalAmount,
      p_purchase_date: new Date().toISOString(),
      p_payment_status: 'completed'
    });
    
    if (error) {
      console.error('Error creating purchase history:', error);
      throw error;
    }
    
    console.log('Purchase history created successfully');
  } catch (error) {
    console.error('Error creating purchase history:', error);
    throw error;
  }
};

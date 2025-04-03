
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
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      console.warn(`No template found with id: ${id}`);
      return null;
    }
    console.error('Error fetching template by id:', error);
    throw error;
  }

  return data;
};


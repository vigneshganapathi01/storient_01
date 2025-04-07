
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { FormValues } from './FormSchema';

interface UseTemplateSubmitProps {
  id?: string;
  imageFile: File | null;
  imagePreview: string;
  templateFile: File | null;
  tags: string[];
  onSuccess: () => void;
  setLoading: (loading: boolean) => void;
}

export const useTemplateSubmit = ({
  id,
  imageFile,
  imagePreview,
  templateFile,
  tags,
  onSuccess,
  setLoading
}: UseTemplateSubmitProps) => {
  const navigate = useNavigate();
  const isEditMode = !!id;

  const handleSubmit = async (data: FormValues) => {
    setLoading(true);
    
    try {
      let imageUrl = imagePreview;
      let fileUrl = null;
      
      // Upload image if a new one is selected
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `template_images/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('public')
          .upload(filePath, imageFile);
          
        if (uploadError) throw uploadError;
        
        // Get the public URL of the uploaded image
        const { data: publicUrlData } = supabase.storage
          .from('public')
          .getPublicUrl(filePath);
          
        imageUrl = publicUrlData.publicUrl;
      }
      
      // Upload template file if selected
      if (templateFile) {
        const fileExt = templateFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `template_files/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('public')
          .upload(filePath, templateFile);
          
        if (uploadError) throw uploadError;
        
        // Get the public URL of the uploaded file
        const { data: publicUrlData } = supabase.storage
          .from('public')
          .getPublicUrl(filePath);
          
        fileUrl = publicUrlData.publicUrl;
      }
      
      // Prepare the template data with required fields
      const templateData = {
        title: data.title,
        description: data.description,
        price: data.price,
        category: data.category || null,
        is_visible: data.is_visible,
        tags: tags.length > 0 ? tags : null,
        updated_at: new Date().toISOString()
      } as const;
      
      // Add optional fields if available
      const finalTemplateData = {
        ...templateData,
        ...(imageUrl ? { image_url: imageUrl } : {}),
        ...(fileUrl ? { file_url: fileUrl } : {})
      };
      
      let result;
      
      if (isEditMode) {
        // Update existing template
        result = await supabase
          .from('templates')
          .update(finalTemplateData)
          .eq('id', id);
      } else {
        // Create new template
        result = await supabase
          .from('templates')
          .insert(finalTemplateData);
      }
      
      if (result.error) throw result.error;
      
      toast.success(`Template ${isEditMode ? 'updated' : 'created'} successfully!`);
      onSuccess();
      navigate('/admin/templates');
    } catch (error: any) {
      toast.error(`Error ${isEditMode ? 'updating' : 'creating'} template: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit };
};

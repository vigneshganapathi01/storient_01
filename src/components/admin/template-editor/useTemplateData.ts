
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { FormValues, formSchema } from './FormSchema';

export const useTemplateData = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [templateFileName, setTemplateFileName] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      category: '',
      is_visible: true,
    },
  });

  useEffect(() => {
    if (isEditMode) {
      fetchTemplate();
    }
  }, [id]);

  const fetchTemplate = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      if (data) {
        reset({
          title: data.title,
          description: data.description || '',
          price: data.price,
          category: data.category || '',
          is_visible: data.is_visible !== undefined ? data.is_visible : true,
        });
        
        setTags(data.tags || []);
        
        if (data.image_url) {
          setImagePreview(data.image_url);
        }
        
        if (data.file_url) {
          const fileName = data.file_url.split('/').pop() || 'template-file';
          setTemplateFileName(fileName);
        }
      }
    } catch (error: any) {
      toast.error(`Error fetching template: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    isEditMode,
    loading,
    setLoading,
    imageFile,
    setImageFile,
    imagePreview,
    setImagePreview,
    templateFile,
    setTemplateFile,
    templateFileName,
    setTemplateFileName,
    tags,
    setTags,
    formMethods: {
      register,
      handleSubmit,
      reset,
      setValue,
      watch,
      errors
    }
  };
};


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Save, X, Upload, Tag, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Template } from './ManageTemplates';

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  category: z.string().optional(),
  is_visible: z.boolean().default(true),
});

const CATEGORIES = [
  "Strategy", "Pitch", "Marketing", "Business", "Proposal", "Case Study", "Workshop"
];

interface TemplateEditorProps {
  onSuccess: () => void;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({ onSuccess }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [templateFileName, setTemplateFileName] = useState<string>('');
  const [currentTag, setCurrentTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      category: '',
      is_visible: true,
    },
  });
  
  const isVisible = watch('is_visible');
  
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
        const templateData = data as unknown as Template;
        reset({
          title: templateData.title,
          description: templateData.description || '',
          price: templateData.price,
          category: templateData.category || '',
          is_visible: templateData.is_visible !== undefined ? templateData.is_visible : true,
        });
        
        setTags(templateData.tags || []);
        
        if (templateData.image_url) {
          setImagePreview(templateData.image_url);
        }
        
        if (templateData.file_url) {
          const fileName = templateData.file_url.split('/').pop() || 'template-file';
          setTemplateFileName(fileName);
        }
      }
    } catch (error: any) {
      toast.error(`Error fetching template: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleTemplateFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTemplateFile(file);
      setTemplateFileName(file.name);
    }
  };

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
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
      
      // Prepare the template data
      const templateData: Partial<Template> = {
        title: data.title,
        description: data.description,
        price: data.price,
        category: data.category || null,
        is_visible: data.is_visible,
        tags: tags.length > 0 ? tags : null,
        updated_at: new Date().toISOString()
      };
      
      if (imageUrl) {
        templateData.image_url = imageUrl;
      }
      
      if (fileUrl) {
        templateData.file_url = fileUrl;
      }
      
      let result;
      
      if (isEditMode) {
        // Update existing template
        result = await supabase
          .from('templates')
          .update(templateData)
          .eq('id', id);
      } else {
        // Create new template
        result = await supabase
          .from('templates')
          .insert(templateData);
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditMode ? 'Edit Template' : 'Create New Template'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                {...register('title')} 
                placeholder="Enter template title" 
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  className="pl-8"
                  {...register('price')}
                />
              </div>
              {errors.price && (
                <p className="text-sm text-destructive">{errors.price.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={watch('category')} 
                onValueChange={(value) => setValue('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Status</Label>
              <div className="flex items-center space-x-2 h-10 px-3">
                <Switch 
                  id="is_visible" 
                  checked={isVisible}
                  onCheckedChange={(checked) => setValue('is_visible', checked)}
                />
                <Label htmlFor="is_visible">
                  {isVisible ? 'Visible' : 'Hidden'}
                </Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              {...register('description')} 
              placeholder="Write your template description here" 
              className="min-h-[100px]" 
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Cover Image</Label>
              <div className="flex items-center space-x-4">
                {imagePreview && (
                  <div className="relative w-32 h-32 overflow-hidden rounded-md">
                    <img 
                      src={imagePreview} 
                      alt="Cover preview" 
                      className="object-cover w-full h-full" 
                    />
                    <Button 
                      type="button"
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => {
                        setImagePreview('');
                        setImageFile(null);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                <div>
                  <Label 
                    htmlFor="image" 
                    className="cursor-pointer flex items-center gap-2 p-2 border rounded-md bg-muted hover:bg-muted/80"
                  >
                    <Upload className="h-4 w-4" />
                    <span>{imagePreview ? 'Change Image' : 'Upload Image'}</span>
                  </Label>
                  <Input 
                    id="image"
                    type="file" 
                    onChange={handleImageChange} 
                    accept="image/*"
                    className="hidden" 
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Template File</Label>
              <div className="flex items-center space-x-4">
                {templateFileName && (
                  <div className="flex-1 p-2 border rounded-md bg-muted">
                    <div className="flex items-center justify-between">
                      <span className="truncate text-sm">{templateFileName}</span>
                      <Button 
                        type="button"
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => {
                          setTemplateFileName('');
                          setTemplateFile(null);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
                <div>
                  <Label 
                    htmlFor="templateFile" 
                    className="cursor-pointer flex items-center gap-2 p-2 border rounded-md bg-muted hover:bg-muted/80"
                  >
                    <Upload className="h-4 w-4" />
                    <span>{templateFileName ? 'Change File' : 'Upload File'}</span>
                  </Label>
                  <Input 
                    id="templateFile"
                    type="file" 
                    onChange={handleTemplateFileChange} 
                    accept=".pdf,.pptx,.doc,.docx,.xls,.xlsx"
                    className="hidden" 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 rounded-full"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <X className="h-2 w-2" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input 
                  placeholder="Add a tag" 
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
              </div>
              <Button 
                type="button" 
                size="icon" 
                onClick={handleAddTag}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/templates')}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin mr-2"></span>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TemplateEditor;

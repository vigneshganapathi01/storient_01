
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CATEGORIES } from './FormSchema';
import { useTemplateData } from './useTemplateData';
import { useTemplateSubmit } from './useTemplateSubmit';
import ImageUpload from './ImageUpload';
import FileUpload from './FileUpload';
import TagInput from './TagInput';

interface TemplateFormProps {
  onSuccess: () => void;
}

const TemplateForm: React.FC<TemplateFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const {
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
      setValue,
      watch,
      errors
    }
  } = useTemplateData();

  const { id } = isEditMode ? { id: window.location.pathname.split('/').pop() } : { id: undefined };

  const templateSubmitHook = useTemplateSubmit({
    id,
    imageFile,
    imagePreview,
    templateFile,
    tags,
    onSuccess,
    setLoading
  });
  
  const isVisible = watch('is_visible');
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditMode ? 'Edit Template' : 'Create New Template'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(templateSubmitHook.handleSubmit)} className="space-y-6">
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
            <ImageUpload 
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
              setImageFile={setImageFile}
            />
            
            <FileUpload 
              templateFileName={templateFileName}
              setTemplateFileName={setTemplateFileName}
              setTemplateFile={setTemplateFile}
            />
          </div>

          <TagInput 
            tags={tags}
            setTags={setTags}
          />

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

export default TemplateForm;

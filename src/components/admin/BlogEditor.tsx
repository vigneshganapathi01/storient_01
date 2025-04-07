
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
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { BlogPost } from './ManageBlogs';

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  published: z.boolean().default(false),
});

interface BlogEditorProps {
  onSuccess: () => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ onSuccess }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditMode = !!id;
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [currentTag, setCurrentTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      published: false,
    },
  });
  
  const published = watch('published');

  useEffect(() => {
    if (isEditMode) {
      fetchBlogPost();
    }
  }, [id]);

  const fetchBlogPost = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      if (data) {
        reset({
          title: data.title,
          content: data.content,
          published: data.published || false,
        });
        
        setTags(data.tags || []);
        if (data.image_url) {
          setImagePreview(data.image_url);
        }
      }
    } catch (error: any) {
      toast.error(`Error fetching blog post: ${error.message}`);
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
      
      // Upload image if a new one is selected
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `blog_images/${fileName}`;
        
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
      
      // Prepare the blog post data with required fields
      const blogData: {
        title: string;
        content: string;
        published: boolean;
        tags: string[] | null;
        image_url: string | null;
        updated_at: string;
        author_id?: string;
      } = {
        title: data.title,
        content: data.content,
        published: data.published,
        tags: tags.length > 0 ? tags : null,
        image_url: imageUrl || null,
        updated_at: new Date().toISOString()
      };

      // Only set author_id for new posts
      if (!isEditMode && user) {
        blogData.author_id = user.id;
      }
      
      let result;
      
      if (isEditMode) {
        // Update existing blog post
        result = await supabase
          .from('blog_posts')
          .update(blogData)
          .eq('id', id);
      } else {
        // Create new blog post
        if (!user) {
          throw new Error("User must be logged in to create a blog post");
        }
        
        // For new posts, author_id is required
        if (!blogData.author_id) {
          blogData.author_id = user.id;
        }
        
        result = await supabase
          .from('blog_posts')
          .insert(blogData);
      }
      
      if (result.error) throw result.error;
      
      toast.success(`Blog post ${isEditMode ? 'updated' : 'created'} successfully!`);
      onSuccess();
      navigate('/admin/blogs');
    } catch (error: any) {
      toast.error(`Error ${isEditMode ? 'updating' : 'creating'} blog post: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              {...register('title')} 
              placeholder="Enter blog title" 
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

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
            <Label htmlFor="content">Content</Label>
            <Textarea 
              id="content" 
              {...register('content')} 
              placeholder="Write your blog content here" 
              className="min-h-[200px]" 
            />
            {errors.content && (
              <p className="text-sm text-destructive">{errors.content.message}</p>
            )}
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

          <div className="flex items-center space-x-2">
            <Switch 
              id="published" 
              checked={published}
              onCheckedChange={(checked) => setValue('published', checked)}
            />
            <Label htmlFor="published">
              {published ? 'Published' : 'Draft'}
            </Label>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/blogs')}
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

export default BlogEditor;

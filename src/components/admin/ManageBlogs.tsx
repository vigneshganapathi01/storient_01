
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import BlogList from '@/components/admin/BlogList';
import BlogEditor from '@/components/admin/BlogEditor';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  published: boolean;
  created_at: string | null;
  updated_at: string | null;
  tags: string[] | null;
}

const ManageBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error: any) {
      toast.error(`Error fetching blogs: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Blog post deleted successfully');
      fetchBlogs();
    } catch (error: any) {
      toast.error(`Error deleting blog post: ${error.message}`);
    }
  };

  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ published: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Blog post ${!currentStatus ? 'published' : 'unpublished'}`);
      fetchBlogs();
    } catch (error: any) {
      toast.error(`Error updating blog post: ${error.message}`);
    }
  };

  const handleCreateBlog = () => {
    navigate('/admin/blogs/new');
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={
          <>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Manage Blogs</h1>
              <Button onClick={handleCreateBlog}>
                <Plus className="mr-2 h-4 w-4" />
                New Blog
              </Button>
            </div>
            <BlogList 
              blogs={blogs} 
              loading={loading} 
              onDelete={handleDelete} 
              onTogglePublished={handleTogglePublished} 
            />
          </>
        } />
        <Route path="/new" element={<BlogEditor onSuccess={fetchBlogs} />} />
        <Route path="/edit/:id" element={<BlogEditor onSuccess={fetchBlogs} />} />
      </Routes>
    </div>
  );
};

export default ManageBlogs;

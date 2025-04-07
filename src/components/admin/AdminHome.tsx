
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, PackageOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const AdminHome: React.FC = () => {
  const [stats, setStats] = useState({
    blogCount: 0,
    templateCount: 0,
    publishedBlogs: 0,
    activeTemplates: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get blog counts
        const { count: totalBlogs } = await supabase
          .from('blog_posts')
          .select('*', { count: 'exact', head: true });
          
        const { count: publishedBlogs } = await supabase
          .from('blog_posts')
          .select('*', { count: 'exact', head: true })
          .eq('published', true);
        
        // Get template counts
        const { count: totalTemplates } = await supabase
          .from('templates')
          .select('*', { count: 'exact', head: true });
          
        const { count: visibleTemplates } = await supabase
          .from('templates')
          .select('*', { count: 'exact', head: true })
          .eq('is_visible', true);
        
        setStats({
          blogCount: totalBlogs || 0,
          templateCount: totalTemplates || 0,
          publishedBlogs: publishedBlogs || 0,
          activeTemplates: visibleTemplates || 0
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{stats.blogCount}</CardTitle>
            <CardDescription>Total Blogs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{stats.publishedBlogs} published</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{stats.templateCount}</CardTitle>
            <CardDescription>Total Templates</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{stats.activeTemplates} visible</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Blog Management
            </CardTitle>
            <CardDescription>Create and manage your blog content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Add new blog posts, edit existing ones, and control publication status.</p>
            <div className="pt-4">
              <Button asChild>
                <Link to="/admin/blogs">Manage Blogs</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PackageOpen className="mr-2 h-5 w-5" />
              Template Management
            </CardTitle>
            <CardDescription>Create and manage your templates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Add new templates, edit existing ones, and control visibility.</p>
            <div className="pt-4">
              <Button asChild>
                <Link to="/admin/templates">Manage Templates</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminHome;

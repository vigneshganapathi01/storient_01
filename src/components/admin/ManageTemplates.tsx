
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import TemplateList from '@/components/admin/TemplateList';
import TemplateEditor from '@/components/admin/TemplateEditor';

export interface Template {
  id: string;
  title: string;
  description: string | null;
  price: number;
  category: string | null;
  image_url: string | null;
  file_url: string | null;
  is_visible: boolean;
  created_at: string | null;
  updated_at: string | null;
  tags: string[] | null;
  is_pack?: boolean;
  discount_percentage?: number;
  slug?: string;
}

const ManageTemplates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (error: any) {
      toast.error(`Error fetching templates: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Template deleted successfully');
      fetchTemplates();
    } catch (error: any) {
      toast.error(`Error deleting template: ${error.message}`);
    }
  };

  const handleToggleVisibility = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('templates')
        .update({ is_visible: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Template ${!currentStatus ? 'visible' : 'hidden'}`);
      fetchTemplates();
    } catch (error: any) {
      toast.error(`Error updating template: ${error.message}`);
    }
  };

  const handleCreateTemplate = () => {
    navigate('/admin/templates/new');
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={
          <>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Manage Templates</h1>
              <Button onClick={handleCreateTemplate}>
                <Plus className="mr-2 h-4 w-4" />
                New Template
              </Button>
            </div>
            <TemplateList 
              templates={templates} 
              loading={loading} 
              onDelete={handleDelete} 
              onToggleVisibility={handleToggleVisibility} 
            />
          </>
        } />
        <Route path="/new" element={<TemplateEditor onSuccess={fetchTemplates} />} />
        <Route path="/edit/:id" element={<TemplateEditor onSuccess={fetchTemplates} />} />
      </Routes>
    </div>
  );
};

export default ManageTemplates;


import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';
import { useAdmin } from '@/hooks/useAdmin';
import AdminLayout from '@/components/admin/AdminLayout';
import ManageBlogs from '@/components/admin/ManageBlogs';
import ManageTemplates from '@/components/admin/ManageTemplates';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminHome from '@/components/admin/AdminHome';
import { toast } from 'sonner';

const AdminDashboard: React.FC = () => {
  const { isAdmin, loading } = useAdmin();

  useEffect(() => {
    if (!loading && !isAdmin) {
      toast.error("Unauthorized: You do not have admin privileges");
    }
  }, [isAdmin, loading]);

  // If still loading, show loading state
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">Verifying admin access...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // If not admin, redirect to home
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-8 bg-muted">
        <AdminLayout>
          <Routes>
            <Route index element={<AdminHome />} />
            <Route path="blogs/*" element={<ManageBlogs />} />
            <Route path="templates/*" element={<ManageTemplates />} />
            <Route path="settings" element={<AdminSettings />} />
          </Routes>
        </AdminLayout>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;

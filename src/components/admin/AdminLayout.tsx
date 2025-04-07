
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FileText, PackageOpen, Settings, Home, PanelLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isActive = (path: string) => {
    return currentPath.includes(path);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full max-container">
        <Sidebar variant="inset" collapsible="offcanvas">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <Settings className="h-6 w-6" />
              <h1 className="text-xl font-bold">Admin Panel</h1>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={currentPath === '/admin'}>
                  <Link to="/admin">
                    <Home />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/admin/blogs')}>
                  <Link to="/admin/blogs">
                    <FileText />
                    <span>Manage Blogs</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/admin/templates')}>
                  <Link to="/admin/templates">
                    <PackageOpen />
                    <span>Manage Templates</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/admin/settings')}>
                  <Link to="/admin/settings">
                    <Settings />
                    <span>Admin Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter>
            <div className="p-4">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/">
                  <span>Back to Site</span>
                </Link>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 p-6">
          <SidebarTrigger className="mb-4"/>
          <div className="space-y-6">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;

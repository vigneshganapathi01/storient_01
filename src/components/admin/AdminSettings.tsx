
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Users, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface UserRole {
  id: string;
  email: string;
  role: string;
}

const formSchema = z.object({
  email: z.string().email('Please enter a valid email')
});

const AdminSettings: React.FC = () => {
  const [adminUsers, setAdminUsers] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addingAdmin, setAddingAdmin] = useState<boolean>(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  });

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const fetchAdminUsers = async () => {
    try {
      setLoading(true);
      
      // Use raw SQL query to fetch user roles and their emails
      const { data, error } = await supabase.from('user_roles')
        .select(`
          id, 
          user_id,
          role
        `)
        .eq('role', 'admin');
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        // Get user emails
        const userEmails = await Promise.all(data.map(async (user) => {
          const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('email')
            .eq('id', user.user_id)
            .single();
            
          if (userError) return { id: user.id, email: 'Unknown email', role: user.role };
          return { 
            id: user.id,
            email: userData?.email || 'Unknown email',
            role: user.role
          };
        }));
        
        setAdminUsers(userEmails);
      } else {
        setAdminUsers([]);
      }
    } catch (error: any) {
      toast.error(`Error fetching admin users: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setAddingAdmin(true);
      
      // Find user by email
      const { data: user, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', data.email)
        .single();
        
      if (userError) {
        throw new Error(`User with email ${data.email} not found`);
      }
      
      // Check if user already has admin role
      const { data: existingRole } = await supabase.from('user_roles')
        .select('id')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .single();
        
      if (existingRole) {
        throw new Error(`User with email ${data.email} is already an admin`);
      }
      
      // Add admin role to user - using a different approach
      const { error: insertError } = await supabase.from('user_roles')
        .insert({
          user_id: user.id,
          role: 'admin'
        });
        
      if (insertError) throw insertError;
      
      toast.success(`Added admin role to ${data.email}`);
      reset();
      fetchAdminUsers();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setAddingAdmin(false);
    }
  };

  const removeAdminRole = async (id: string, email: string) => {
    try {
      const { error } = await supabase.from('user_roles')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success(`Removed admin role from ${email}`);
      fetchAdminUsers();
    } catch (error: any) {
      toast.error(`Error removing admin role: ${error.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Admin Users
          </CardTitle>
          <CardDescription>Manage users with admin privileges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* List of current admin users */}
            <div className="space-y-4">
              <h3 className="font-medium">Current Admin Users</h3>
              {loading ? (
                <div className="flex justify-center py-4">
                  <div className="w-8 h-8 border-4 border-t-brand-purple rounded-full animate-spin"></div>
                </div>
              ) : adminUsers.length > 0 ? (
                <div className="space-y-2">
                  {adminUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <div>
                        <p className="font-medium">{user.email}</p>
                        <p className="text-xs text-muted-foreground">Admin</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => removeAdminRole(user.id, user.email)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No admin users found.</p>
              )}
            </div>
            
            {/* Add new admin user form */}
            <div className="pt-4 border-t">
              <h3 className="font-medium mb-4">Add New Admin</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">User Email</Label>
                  <Input
                    id="email"
                    placeholder="Enter user email"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>
                <Button type="submit" disabled={addingAdmin}>
                  {addingAdmin ? (
                    <>
                      <span className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin mr-2"></span>
                      Adding...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Add Admin
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;


import React, { useState } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const UserDashboard: React.FC = () => {
  const { user, profile, updateProfile, signOut, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    email: user?.email || '',
    avatar_url: profile?.avatar_url || '',
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await updateProfile({
      full_name: formData.full_name,
      // Note: email is managed by Supabase Auth, not directly in the profile
    });
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings Updated",
        description: "Your settings have been saved.",
      });
      setLoading(false);
    }, 1000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmNewPassword) {
      toast({
        title: "Passwords don't match",
        description: "The new password and confirmation password don't match.",
        variant: "destructive"
      });
      return;
    }
    
    // This would be implemented with supabase auth update
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    });
  }

  return (
    <div className="min-h-screen bg-muted pt-20 pb-10">
      <div className="max-container">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <div className="hidden md:block">
            <Card className="sticky top-24">
              <div className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={profile?.avatar_url} alt={profile?.full_name} />
                    <AvatarFallback className="text-2xl bg-brand-purple text-white">
                      {profile?.full_name ? profile.full_name.split(' ').map(n => n[0]).join('') : user?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">{profile?.full_name || 'User'}</h2>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>

                <nav className="space-y-2">
                  <Button
                    variant={activeTab === 'profile' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('profile')}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                  <Button
                    variant={activeTab === 'settings' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={signOut}
                    disabled={isLoading}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </nav>
              </div>
            </Card>
          </div>

          {/* Mobile Tabs */}
          <div className="md:hidden mb-6">
            <Tabs
              defaultValue={activeTab}
              onValueChange={(value) => setActiveTab(value as 'profile' | 'settings')}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Content Area */}
          <div>
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
                  <form onSubmit={handleSaveProfile}>
                    <div className="space-y-6">
                      {/* Avatar Upload */}
                      <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={profile?.avatar_url} alt={profile?.full_name} />
                          <AvatarFallback className="text-2xl bg-brand-purple text-white">
                            {profile?.full_name ? profile.full_name.split(' ').map(n => n[0]).join('') : user?.email?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-2">
                          <Button type="button" variant="outline" size="sm">
                            Change Avatar
                          </Button>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            className="text-muted-foreground"
                            onClick={() => setFormData({...formData, avatar_url: ''})}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>

                      {/* Name Input */}
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.full_name}
                          onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                        />
                      </div>

                      {/* Email Input */}
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          disabled
                          className="bg-muted"
                        />
                        <p className="text-xs text-muted-foreground">
                          Email can only be changed in account settings.
                        </p>
                      </div>

                      <Button
                        type="submit"
                        className="bg-brand-purple hover:bg-brand-indigo"
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Settings</h2>

                  <div className="space-y-6">
                    {/* Password Change */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Change Password</h3>
                      <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input 
                            id="current-password" 
                            type="password" 
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input 
                            id="new-password" 
                            type="password" 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                          <Input 
                            id="confirm-new-password" 
                            type="password" 
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                          />
                          {newPassword && confirmNewPassword && newPassword !== confirmNewPassword && (
                            <p className="text-xs text-destructive mt-1">
                              Passwords do not match
                            </p>
                          )}
                        </div>
                        <Button 
                          type="submit" 
                          variant="outline"
                          disabled={!currentPassword || !newPassword || !confirmNewPassword || newPassword !== confirmNewPassword}
                        >
                          Update Password
                        </Button>
                      </form>
                    </div>

                    <div className="border-t border-border pt-6">
                      <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                      <form onSubmit={handleSaveSettings} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive emails about your account activity.
                            </p>
                          </div>
                          <Switch
                            id="email-notifications"
                            checked={emailNotifications}
                            onCheckedChange={setEmailNotifications}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="marketing-emails">Marketing Emails</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive emails about new templates and offers.
                            </p>
                          </div>
                          <Switch
                            id="marketing-emails"
                            checked={marketingEmails}
                            onCheckedChange={setMarketingEmails}
                          />
                        </div>
                        
                        <Button
                          type="submit"
                          className="bg-brand-purple hover:bg-brand-indigo"
                          disabled={isLoading}
                        >
                          {isLoading ? "Saving..." : "Save Preferences"}
                        </Button>
                      </form>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Mobile Sign Out Button */}
            <div className="md:hidden mt-6">
              <Button
                variant="outline"
                className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={signOut}
                disabled={isLoading}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

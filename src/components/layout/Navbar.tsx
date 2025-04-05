
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Download, Package, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    user,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const {
    totalItems
  } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    toast.success('You have been successfully signed out!');
  };

  return <nav className="">
      <div className="max-container flex-between">
      <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/uploads/logo.jpg" 
            alt="Storient Logo" 
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="font-bold text-2xl bg-gradient-to-r from-violet-DEFAULT to-darkblue-DEFAULT bg-clip-text">
            Storient
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">  
          <Link to="/templates" className="text-foreground hover:text-primary transition-colors">
            Templates
          </Link>
          <Link to="/how-it-works" className="text-foreground hover:text-primary transition-colors">
            How It Works
          </Link>
          <Link to="/blog" className="text-foreground hover:text-primary transition-colors">
            Blog
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">
            About Us
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-foreground hover:text-primary transition-colors">
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-foreground hover:text-primary transition-colors relative" onClick={() => navigate('/cart')}>
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-brand-purple text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>}
          </Button>

          {user ? <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full border border-border">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/profile" className="w-full flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/purchased" className="w-full flex items-center">
                    <Package className="mr-2 h-4 w-4" />
                    <span>Purchased Packs</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/downloads" className="w-full flex items-center">
                    <FileDown className="mr-2 h-4 w-4" />
                    <span>My Downloads</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="flex items-center">
                  <Download className="mr-2 h-4 w-4 rotate-90" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> : <div className="flex space-x-2">
              <Button onClick={() => navigate('/signin')} variant="outline" className="text-foreground">
                Sign In
              </Button>
            </div>}
        </div>

        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-foreground">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <div className="max-container py-4 space-y-4">
            <Link to="/" className="block text-foreground hover:text-primary py-2" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/templates" className="block text-foreground hover:text-primary py-2" onClick={() => setMobileMenuOpen(false)}>
              Templates
            </Link>
            <Link to="/how-it-works" className="block text-foreground hover:text-primary py-2" onClick={() => setMobileMenuOpen(false)}>
              How It Works
            </Link>
            <Link to="/blog" className="block text-foreground hover:text-primary py-2" onClick={() => setMobileMenuOpen(false)}>
              Blog
            </Link>
            <Link to="/about" className="block text-foreground hover:text-primary py-2" onClick={() => setMobileMenuOpen(false)}>
              About Us
            </Link>
            
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-foreground relative" onClick={() => {
              navigate('/cart');
              setMobileMenuOpen(false);
            }}>
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-brand-purple text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>}
                </Button>
              </div>
              
              {user ? <Link to="/dashboard/profile" className="flex items-center space-x-2 text-foreground" onClick={() => setMobileMenuOpen(false)}>
                  <User className="h-5 w-5" />
                  <span>My Dashboard</span>
                </Link> : <div className="flex space-x-2">
                  <Button onClick={() => {
              navigate('/signin');
              setMobileMenuOpen(false);
            }} variant="outline" className="text-foreground">
                    Sign In
                  </Button>
                </div>}
            </div>
          </div>
        </div>}
    </nav>;
};

export default Navbar;

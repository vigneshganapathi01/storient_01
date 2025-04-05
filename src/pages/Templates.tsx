
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';
import TemplateHeader from '@/components/templates/TemplateHeader';
import FilterBar from '@/components/templates/FilterBar';
import TemplatePackages from '@/components/templates/TemplatePackages';
import LoginDialog from '@/components/templates/LoginDialog';

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('featured');
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [pendingPackage, setPendingPackage] = useState<{ id: string, name: string, price: number } | null>(null);
  const navigate = useNavigate();
  const {
    addToCart,
    isAuthenticated
  } = useCart();

  const handleAddToCart = async (packageId: string, packageName: string, price: number) => {
    if (!isAuthenticated) {
      setPendingPackage({ id: packageId, name: packageName, price });
      setLoginDialogOpen(true);
      return;
    }

    try {
      await addToCart({
        id: packageId,
        title: packageName,
        price: price,
        image: '/lovable-uploads/9903a68a-a5af-40c5-97ab-14d9e8d8d83a.png'
      });
      toast.success(`${packageName} added to cart!`);
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart. Please try again.');
    }
  };

  const handleLogin = () => {
    setLoginDialogOpen(false);
    navigate('/signin');
  };

  return <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="max-container pt-32 pb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <TemplateHeader />
            <div className="mt-6 md:mt-0">
              <FilterBar 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </div>
          </div>

          {/* Template Pricing Table */}
          <TemplatePackages onAddToCart={handleAddToCart} />
        </div>
      </main>
      <Footer />
      
      {/* Login Dialog */}
      <LoginDialog 
        open={loginDialogOpen} 
        onOpenChange={setLoginDialogOpen} 
        onLogin={handleLogin} 
      />
    </div>;
};

export default Templates;

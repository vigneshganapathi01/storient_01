
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';
import TemplateHeader from '@/components/templates/TemplateHeader';
import TemplateFilters from '@/components/templates/TemplateFilters';
import TemplateGrid from '@/components/templates/TemplateGrid';

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('featured');
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = async (packageName: string, price: number) => {
    try {
      await addToCart({
        id: packageName.toLowerCase().replace(/\s+/g, '-'),
        title: packageName,
        price: price,
        image: '/placeholder.svg'
      });
      toast.success(`${packageName} added to cart!`);
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart. Please try again.');
    }
  };

  const navigateToPackageDetails = (packageName: string) => {
    navigate(`/package-details/${packageName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="max-container pt-32 pb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <TemplateHeader />
            <TemplateFilters
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>

          <TemplateGrid 
            handleAddToCart={handleAddToCart}
            navigateToPackageDetails={navigateToPackageDetails}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Templates;

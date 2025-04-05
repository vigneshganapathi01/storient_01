
import React from 'react';
import PackageDetailsHeader from './PackageDetailsHeader';
import PackageImageCarousel from './PackageImageCarousel';
import PriceSection, { PriceTier } from './PriceSection';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface PackageHeaderProps {
  packageName: string;
  reviewCount: number;
  averageRating: number;
  price: number;
  isLoading: boolean;
  slides: Array<{
    title: string;
    subtitle: string;
    description: string;
    image: string;
  }>;
}

const PackageHeader = ({ 
  packageName, 
  reviewCount, 
  averageRating, 
  price, 
  isLoading,
  slides 
}: PackageHeaderProps) => {
  const { addToCart, items } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    try {
      const templateId = packageName.toLowerCase().replace(/\s+/g, '-');
      
      // Check if this item is already in cart
      const existingItem = items.find(item => item.id === templateId);
      
      await addToCart({
        id: templateId,
        title: packageName,
        price: price,
        image: slides[0]?.image || '/placeholder.svg'
      });
      
      if (existingItem) {
        toast.success(`${packageName} quantity updated in cart!`);
      } else {
        toast.success(`${packageName} added to cart!`);
      }
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart. Please try again.');
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div>
        <PackageDetailsHeader 
          packageName={packageName}
          reviewCount={reviewCount}
          averageRating={averageRating}
          isLoading={isLoading}
        />
        
        <div className="mt-8">
          <PriceSection 
            packageName={packageName}
            price={price}
            buttonVariant="default"
            buttonText="Add to cart"
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
      
      <PackageImageCarousel slides={slides} />
    </div>
  );
};

export default PackageHeader;

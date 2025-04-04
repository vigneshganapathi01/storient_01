
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';

interface TemplateActionsHook {
  handleAddToCart: (packageName: string, price: number) => Promise<void>;
  navigateToPackageDetails: (packageName: string) => void;
}

const TemplateActions = (): TemplateActionsHook => {
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

  return {
    handleAddToCart,
    navigateToPackageDetails
  };
};

export default TemplateActions;

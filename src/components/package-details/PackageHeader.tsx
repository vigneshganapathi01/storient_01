import React, { useState } from 'react';
import PackageDetailsHeader from './PackageDetailsHeader';
import PackageImageCarousel from './PackageImageCarousel';
import PriceSection from './PriceSection';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
interface PackageHeaderProps {
  packageName: string;
  packageId: string;
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
  packageId,
  reviewCount,
  averageRating,
  price,
  isLoading,
  slides
}: PackageHeaderProps) => {
  const {
    addToCart,
    items,
    isAuthenticated
  } = useCart();
  const navigate = useNavigate();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  // Handle direct "Buy Now" click - Navigate to payment page
  const handleBuyNow = () => {
    if (!isAuthenticated) {
      setLoginDialogOpen(true);
      return;
    }
    navigate('/payment', {
      state: {
        packageName: packageName,
        price: price
      }
    });
  };

  // Handle "Add to Cart" click
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      setLoginDialogOpen(true);
      return;
    }
    try {
      const templateId = packageId || packageName.toLowerCase().replace(/\s+/g, '-');

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
  const handleLogin = () => {
    setLoginDialogOpen(false);
    navigate('/signin');
  };
  return <>
      <div className="grid md:grid-cols-2 gap-10 bg-[s#002060] bg-brand-blue">
        <div>
          <PackageDetailsHeader packageName={packageName} reviewCount={reviewCount} averageRating={averageRating} isLoading={isLoading} />
          
          <div className="mt-8">
            <PriceSection packageName={packageName} price={price} buttonVariant="default" buttonText="Buy Now" onBuyNow={handleBuyNow} onAddToCart={handleAddToCart} />
          </div>
        </div>
        
        <PackageImageCarousel slides={slides} />
      </div>
      
      {/* Login Dialog */}
      <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              You need to be logged in to make a purchase
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-4">
            <LogIn className="h-16 w-16 text-brand-blue" />
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
            <Button variant="outline" onClick={() => setLoginDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="mt-2 sm:mt-0 bg-brand-blue" onClick={handleLogin}>
              Login Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>;
};
export default PackageHeader;
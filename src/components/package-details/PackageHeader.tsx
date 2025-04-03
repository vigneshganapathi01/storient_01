
import React from 'react';
import PackageDetailsHeader from './PackageDetailsHeader';
import PackageImageCarousel from './PackageImageCarousel';
import PriceSection, { PriceTier } from './PriceSection';

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
            buttonText="Buy now"
          />
        </div>
      </div>
      
      <PackageImageCarousel slides={slides} />
    </div>
  );
};

export default PackageHeader;

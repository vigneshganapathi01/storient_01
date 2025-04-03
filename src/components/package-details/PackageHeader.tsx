
import React from 'react';
import PackageDetailsHeader from './PackageDetailsHeader';
import PackageImageCarousel from './PackageImageCarousel';

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
      <PackageDetailsHeader 
        packageName={packageName}
        reviewCount={reviewCount}
        averageRating={averageRating}
        price={price}
        isLoading={isLoading}
      />
      
      <PackageImageCarousel slides={slides} />
    </div>
  );
};

export default PackageHeader;

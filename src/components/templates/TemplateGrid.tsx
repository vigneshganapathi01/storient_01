
import React from 'react';
import PackageCard from './PackageCard';
import PremiumPackageCard from './PremiumPackageCard';
import EmptyTemplateState from './EmptyTemplateState';
import { useTemplateFiltering } from '@/hooks/useTemplateFiltering';

interface TemplateGridProps {
  handleAddToCart: (packageName: string, price: number) => void;
  navigateToPackageDetails: (packageName: string) => void;
  selectedCategory?: string;
  sortBy?: string;
}

const TemplateGrid = ({ 
  handleAddToCart, 
  navigateToPackageDetails,
  selectedCategory = 'All Categories',
  sortBy = 'featured'
}: TemplateGridProps) => {
  const { sortedPackages, filteredPremiumPackages } = useTemplateFiltering({
    selectedCategory,
    sortBy
  });

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 mt-8 border-t pt-6">
      {sortedPackages.map((pkg, idx) => (
        <PackageCard 
          key={idx}
          price={pkg.price}
          priceText={pkg.priceText}
          backgroundColor={pkg.backgroundColor}
          headerBackground={pkg.headerBackground}
          textColor={pkg.textColor}
          packageItems={pkg.items}
          onAddToCart={handleAddToCart}
          onPackageClick={navigateToPackageDetails}
        />
      ))}
      
      {/* Premium Package Cards */}
      {filteredPremiumPackages.map((pkg, idx) => (
        <PremiumPackageCard
          key={`premium-${idx}`}
          price={pkg.price}
          title={pkg.title}
          description={pkg.description}
          templateCount={pkg.templateCount}
          backgroundColor={pkg.backgroundColor}
          onAddToCart={handleAddToCart}
          onPackageClick={navigateToPackageDetails}
          consultText={pkg.consultText}
          lifetimeUpdates={pkg.lifetimeUpdates}
        />
      ))}
      
      {sortedPackages.length === 0 && filteredPremiumPackages.length === 0 && <EmptyTemplateState />}
    </div>
  );
};

export default TemplateGrid;

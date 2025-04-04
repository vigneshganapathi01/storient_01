
import React from 'react';
import EmptyTemplateState from './EmptyTemplateState';
import { useTemplateFiltering } from '@/hooks/useTemplateFiltering';
import StandardPackageGrid from './StandardPackageGrid';
import PremiumPackageGrid from './PremiumPackageGrid';

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

  const hasNoTemplates = sortedPackages.length === 0 && filteredPremiumPackages.length === 0;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 mt-8 border-t pt-6">
      <StandardPackageGrid 
        packages={sortedPackages}
        onAddToCart={handleAddToCart}
        onPackageClick={navigateToPackageDetails}
      />
      
      <PremiumPackageGrid 
        packages={filteredPremiumPackages}
        onAddToCart={handleAddToCart}
        onPackageClick={navigateToPackageDetails}
      />
      
      {hasNoTemplates && <EmptyTemplateState />}
    </div>
  );
};

export default TemplateGrid;

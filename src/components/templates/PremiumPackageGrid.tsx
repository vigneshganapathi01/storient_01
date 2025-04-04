
import React from 'react';
import PremiumPackageCard from './PremiumPackageCard';
import { PremiumTemplatePackage } from '@/data/templatePackageData';

interface PremiumPackageGridProps {
  packages: PremiumTemplatePackage[];
  onAddToCart: (packageName: string, price: number) => void;
  onPackageClick: (packageName: string) => void;
}

const PremiumPackageGrid = ({ 
  packages,
  onAddToCart,
  onPackageClick
}: PremiumPackageGridProps) => {
  if (packages.length === 0) return null;
  
  return (
    <>
      {packages.map((pkg, idx) => (
        <PremiumPackageCard
          key={`premium-${idx}`}
          price={pkg.price}
          title={pkg.title}
          description={pkg.description}
          templateCount={pkg.templateCount}
          backgroundColor={pkg.backgroundColor}
          onAddToCart={onAddToCart}
          onPackageClick={onPackageClick}
          consultText={pkg.consultText}
          lifetimeUpdates={pkg.lifetimeUpdates}
        />
      ))}
    </>
  );
};

export default PremiumPackageGrid;

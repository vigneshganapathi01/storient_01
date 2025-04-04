
import React from 'react';
import PackageCard from './PackageCard';
import { TemplatePackage } from '@/data/templatePackageData';

interface StandardPackageGridProps {
  packages: TemplatePackage[];
  onAddToCart: (packageName: string, price: number) => void;
  onPackageClick: (packageName: string) => void;
}

const StandardPackageGrid = ({ 
  packages,
  onAddToCart,
  onPackageClick
}: StandardPackageGridProps) => {
  if (packages.length === 0) return null;
  
  return (
    <>
      {packages.map((pkg, idx) => (
        <PackageCard 
          key={idx}
          price={pkg.price}
          priceText={pkg.priceText}
          backgroundColor={pkg.backgroundColor}
          headerBackground={pkg.headerBackground}
          textColor={pkg.textColor}
          packageItems={pkg.items}
          onAddToCart={onAddToCart}
          onPackageClick={onPackageClick}
        />
      ))}
    </>
  );
};

export default StandardPackageGrid;

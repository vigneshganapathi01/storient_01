
import React from 'react';
import CardHeader from './CardHeader';
import PackageItemsList from './PackageItemsList';
import CardFooter from './CardFooter';

interface PackageCardProps {
  price: number;
  priceText: string;
  backgroundColor: string;
  headerBackground: string;
  textColor: string;
  packageItems: {
    title: string;
    description: string;
    templateCount: number;
    slug: string;
  }[];
  onAddToCart: (packageName: string, price: number) => void;
  onPackageClick: (packageName: string) => void;
  premiumButton?: boolean;
  fullAccessButton?: boolean;
}

const PackageCard = ({
  price,
  priceText,
  backgroundColor,
  headerBackground,
  textColor,
  packageItems,
  onAddToCart,
  onPackageClick,
  premiumButton = false,
  fullAccessButton = false
}: PackageCardProps) => {
  const packageName = `$${price} Package`;
  
  return (
    <div className="border rounded-md flex flex-col">
      <CardHeader 
        price={price}
        priceText={priceText}
        headerBackground={headerBackground}
        textColor={textColor}
      />
      
      <PackageItemsList 
        packageItems={packageItems}
        backgroundColor={backgroundColor}
        textColor={textColor}
        onPackageClick={onPackageClick}
      />
      
      <CardFooter 
        backgroundColor={backgroundColor}
        textColor={textColor}
        packageName={packageName}
        price={price}
        onAddToCart={onAddToCart}
        premiumButton={premiumButton}
        fullAccessButton={fullAccessButton}
      />
    </div>
  );
};

export default PackageCard;

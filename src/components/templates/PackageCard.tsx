
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import PackageContent from './PackageContent';

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
  
  const buttonClassName = premiumButton || fullAccessButton
    ? `w-full bg-white hover:bg-white/90 text-${textColor} flex items-center justify-center`
    : "w-full bg-brand-blue hover:bg-brand-blue/90 flex items-center justify-center";

  return (
    <div className="border rounded-md flex flex-col">
      <div className={`p-4 text-center border-b ${headerBackground} ${textColor === "white" ? "text-white" : "text-black"}`}>
        <h2 className={`text-3xl font-bold ${textColor === "white" ? "text-white" : "text-[#0074bf]"}`}>${price}</h2>
        <p className={`text-sm ${textColor === "white" ? "text-white/90" : "text-muted-foreground"}`}>{priceText}</p>
        {(price === 499 || price === 999) && (
          <p className={`text-xs ${textColor === "white" ? "text-white/90" : "text-muted-foreground"}`}>
            {price === 499 ? "consult with our team" : "Lifetime Updates"}
          </p>
        )}
      </div>
      
      <div className={`flex-1 p-4 flex flex-col space-y-4 ${backgroundColor} ${textColor === "white" ? "text-white" : ""}`}>
        {packageItems.map((item, idx) => (
          <PackageContent 
            key={idx}
            title={item.title} 
            description={item.description} 
            color="" 
            templateCount={item.templateCount}
            onClick={() => onPackageClick(item.slug)}
          />
        ))}
      </div>
      
      <div className={`p-4 mt-auto ${backgroundColor}`}>
        <Button 
          className={buttonClassName} 
          onClick={() => onAddToCart(packageName, price)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default PackageCard;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';

interface PackageContentProps {
  title: string;
  description: string;
  color: string;
  templateCount?: number;
  onClick?: () => void;
  imageUrl?: string;
}

export const PackageContent = ({
  title,
  description,
  color,
  templateCount,
  onClick,
  imageUrl
}: PackageContentProps) => (
  <div className={`p-4 h-full ${color} rounded-md cursor-pointer hover:shadow-md transition-all`} onClick={onClick}>
    {imageUrl && (
      <div className="flex justify-center mb-3">
        <div className="bg-white/30 rounded-full w-16 h-16 flex items-center justify-center">
          <img src={imageUrl} alt={title} className="w-10 h-10 object-contain" />
        </div>
      </div>
    )}
    <h3 className="font-bold text-lg mb-1">{title}</h3>
    <p className="text-sm">{description}</p>
  </div>
);

interface PackageCardProps {
  price: string | number;
  priceColor: string;
  subtitle?: string;
  subtitle2?: string;
  items?: PackageContentProps[];
  onAddToCart: () => void;
  buttonClass?: string;
  buttonTextColor?: string;
  singlePackage?: {
    title: string;
    description: string;
    templateCount?: number;
    imageUrl?: string;
    onClick?: () => void;
  };
}

export const PackageCard = ({ 
  price, 
  priceColor, 
  subtitle, 
  subtitle2, 
  items, 
  onAddToCart, 
  buttonClass = "bg-brand-blue hover:bg-brand-blue/90",
  buttonTextColor = "",
  singlePackage
}: PackageCardProps) => {
  return (
    <div className="border rounded-md flex flex-col">
      <div className={`p-4 text-center border-b ${priceColor}`}>
        <h2 className={`text-3xl font-bold ${priceColor === 'bg-[#0074bf]' || priceColor === 'bg-[#002060]' ? 'text-white' : 'text-brand-blue'}`}>
          ${typeof price === 'number' ? price : price}
        </h2>
        {subtitle && (
          <p className={`text-sm ${priceColor === 'bg-[#0074bf]' || priceColor === 'bg-[#002060]' ? 'text-white/90' : 'text-muted-foreground'}`}>
            {subtitle}
          </p>
        )}
        {subtitle2 && (
          <p className={`text-xs ${priceColor === 'bg-[#0074bf]' || priceColor === 'bg-[#002060]' ? 'text-white/90' : 'text-muted-foreground'}`}>
            {subtitle2}
          </p>
        )}
      </div>
      
      <div className="flex-1 p-4 flex flex-col space-y-4">
        {singlePackage ? (
          <div className={`${priceColor} rounded-md p-6 flex-1 flex flex-col justify-center items-center text-center cursor-pointer hover:shadow-md transition-all ${priceColor === 'bg-[#0074bf]' || priceColor === 'bg-[#002060]' ? 'text-white' : ''}`} 
               onClick={singlePackage.onClick}>
            <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mb-3">
              <img src={singlePackage.imageUrl} alt={singlePackage.title} className="w-10 h-10 object-contain" />
            </div>
            <h3 className="font-bold text-xl mb-3">{singlePackage.title}</h3>
            <p className="text-sm mb-4">{singlePackage.description}</p>
          
          </div>
        ) : (
          items?.map((item, index) => (
            <PackageContent 
              key={index}
              title={item.title} 
              description={item.description} 
              color={item.color || priceColor} 
              templateCount={item.templateCount} 
              imageUrl={item.imageUrl}
              onClick={item.onClick}
            />
          ))
        )}
      </div>
      
      <div className="p-4 mt-auto">
        <Button 
          className={`w-full flex items-center justify-center ${buttonClass}`} 
          onClick={onAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

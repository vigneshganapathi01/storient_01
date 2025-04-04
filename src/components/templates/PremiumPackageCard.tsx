
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface PremiumPackageCardProps {
  price: number;
  title: string;
  description: string;
  templateCount: number;
  backgroundColor: string;
  onAddToCart: (packageName: string, price: number) => void;
  onPackageClick: (packageName: string) => void;
  consultText?: string;
  lifetimeUpdates?: boolean;
}

const PremiumPackageCard = ({
  price,
  title,
  description,
  templateCount,
  backgroundColor,
  onAddToCart,
  onPackageClick,
  consultText,
  lifetimeUpdates
}: PremiumPackageCardProps) => {
  const slug = title.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="border rounded-md flex flex-col">
      <div className={`p-4 text-center border-b ${backgroundColor}`}>
        <h2 className="text-3xl font-bold text-white">${price}</h2>
        {consultText && <p className="text-xs text-white/90">Includes an exclusive 1:1</p>}
        {consultText && <p className="text-xs text-white/90">{consultText}</p>}
        {lifetimeUpdates && <p className="text-xs text-white/90">All 10 packs with</p>}
        {lifetimeUpdates && <p className="text-xs text-white/90">Lifetime Updates</p>}
      </div>
      
      <div className={`flex-1 p-4 flex flex-col space-y-4 ${backgroundColor} text-white`}>
        <div 
          onClick={() => onPackageClick(slug)}
          className="rounded-md p-6 flex-1 flex flex-col justify-center items-center text-center cursor-pointer hover:shadow-md transition-all"
        >
          <h3 className="font-bold text-xl mb-3">{title}</h3>
          <p className="text-sm mb-4">{description}</p>
          <Badge variant="outline" className="bg-white/20 text-white">
            {templateCount} Templates
          </Badge>
        </div>
      </div>
      
      <div className={`p-4 mt-auto ${backgroundColor}`}>
        <Button 
          className="w-full bg-white hover:bg-white/90 text-[#002060] flex items-center justify-center" 
          onClick={() => onAddToCart(title, price)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default PremiumPackageCard;


import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface CardFooterProps {
  backgroundColor: string;
  textColor: string;
  packageName: string;
  price: number;
  onAddToCart: (packageName: string, price: number) => void;
  premiumButton?: boolean;
  fullAccessButton?: boolean;
}

const CardFooter = ({
  backgroundColor,
  textColor,
  packageName,
  price,
  onAddToCart,
  premiumButton = false,
  fullAccessButton = false
}: CardFooterProps) => {
  const buttonClassName = premiumButton || fullAccessButton
    ? `w-full bg-white hover:bg-white/90 text-${textColor} flex items-center justify-center`
    : "w-full bg-brand-blue hover:bg-brand-blue/90 flex items-center justify-center";

  return (
    <div className={`p-4 mt-auto ${backgroundColor}`}>
      <Button 
        className={buttonClassName} 
        onClick={() => onAddToCart(packageName, price)}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
    </div>
  );
};

export default CardFooter;

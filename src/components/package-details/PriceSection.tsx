
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface PriceSectionProps {
  price: number | string;
  packageName: string;
}

const PriceSection = ({ price, packageName }: PriceSectionProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleBuyNow = () => {
    toast({
      title: "Added to cart",
      description: `${packageName} has been added to your cart`,
    });
    navigate('/cart');
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-6 flex justify-between items-center">
        <div className="text-2xl font-bold">${price}</div>
        <Button 
          className="bg-brand-blue hover:bg-brand-blue/90 flex items-center gap-2"
          onClick={handleBuyNow}
        >
          <ShoppingCart className="h-5 w-5" />
          Buy Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default PriceSection;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
      title: "Proceeding to payment",
      description: `You're purchasing ${packageName}`,
    });
    navigate('/payment', { state: { price, packageName } });
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-xl py-6 rounded-md"
          onClick={handleBuyNow}
        >
          Buy now ${price}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PriceSection;

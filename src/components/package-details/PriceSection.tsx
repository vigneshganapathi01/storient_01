
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Check, ShoppingCart } from 'lucide-react';

export type PriceTier = {
  name: string;
  price: number;
  features?: string[];
  isPopular?: boolean;
}

interface PriceSectionProps {
  price?: number | string;
  packageName?: string;
  tiers?: PriceTier[];
  selectedTier?: string;
  onTierSelect?: (tierName: string) => void;
  buttonVariant?: 'default' | 'outline' | 'secondary' | 'destructive';
  buttonText?: string;
  onBuyNow?: () => void;
  onAddToCart?: () => void;
}

const PriceSection = ({ 
  price, 
  packageName,
  tiers = [],
  selectedTier,
  onTierSelect,
  buttonVariant = 'default',
  buttonText = 'Buy now',
  onBuyNow,
  onAddToCart
}: PriceSectionProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // If no tiers are provided, create a default one from price and packageName
  const displayTiers = tiers.length > 0 
    ? tiers 
    : (price ? [{ name: packageName || 'Standard', price: Number(price) }] : []);

  const handleBuyNow = (tier: PriceTier) => {
    if (onBuyNow) {
      onBuyNow();
    } else {
      toast({
        title: "Proceeding to payment",
        description: `You're purchasing ${tier.name}`,
      });
      navigate('/payment', { state: { packageName: tier.name, price: tier.price } });
    }
  };

  // Find selected tier or default to first tier
  const getSelectedTier = () => {
    if (!selectedTier && displayTiers.length === 1) return displayTiers[0];
    return displayTiers.find(tier => tier.name === selectedTier) || displayTiers[0];
  };

  // If only one tier, show simplified version
  if (displayTiers.length === 1) {
    const tier = displayTiers[0];
    return (
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col gap-3">
            <Button 
              className="w-full text-xl py-6 rounded-md bg-blue-600 hover:bg-blue-700"
              onClick={() => handleBuyNow(tier)}
            >
              {buttonText} ${tier.price}
            </Button>
            
            {onAddToCart && (
              <Button 
                variant="outline" 
                className="w-full py-4"
                onClick={onAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show multiple tiers
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="grid gap-4 md:grid-cols-3">
          {displayTiers.map((tier) => (
            <div 
              key={tier.name}
              className={`border p-4 rounded-lg ${
                tier.isPopular ? 'border-blue-500 relative' : 'border-gray-200'
              } ${selectedTier === tier.name ? 'ring-2 ring-blue-500' : ''}`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-2 py-0.5 text-xs rounded-full">
                  Popular
                </div>
              )}
              
              <h3 className="font-bold text-lg">{tier.name}</h3>
              <p className="text-2xl font-bold my-2">${tier.price}</p>
              
              {tier.features && tier.features.length > 0 && (
                <ul className="my-4 space-y-2">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="text-green-500 h-4 w-4 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
              
              <Button 
                className="w-full mt-4"
                variant={selectedTier === tier.name ? buttonVariant : 'outline'}
                onClick={() => {
                  if (onTierSelect) {
                    onTierSelect(tier.name);
                  } else {
                    handleBuyNow(tier);
                  }
                }}
              >
                {selectedTier === tier.name ? buttonText : 'Select'}
              </Button>
            </div>
          ))}
        </div>
        
        {selectedTier && (
          <div className="mt-6 flex flex-col gap-3">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-xl py-6 rounded-md"
              onClick={() => handleBuyNow(getSelectedTier())}
            >
              {buttonText} ${getSelectedTier().price}
            </Button>
            
            {onAddToCart && (
              <Button 
                variant="outline" 
                className="w-full py-4"
                onClick={onAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PriceSection;

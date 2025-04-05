
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PromoCodeInputProps {
  promoCode: string;
  setPromoCode: (code: string) => void;
  handleApplyPromoCode: () => void;
}

const PromoCodeInput: React.FC<PromoCodeInputProps> = ({
  promoCode,
  setPromoCode,
  handleApplyPromoCode
}) => {
  return (
    <div className="mt-8 flex gap-4">
      <Input 
        placeholder="Enter promo code"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
        className="max-w-[240px]"
      />
      <Button onClick={handleApplyPromoCode} className="bg-blue-500">Apply</Button>
    </div>
  );
};

export default PromoCodeInput;

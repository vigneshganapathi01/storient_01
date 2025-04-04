
import React from 'react';

interface CardHeaderProps {
  price: number;
  priceText: string;
  headerBackground: string;
  textColor: string;
}

const CardHeader = ({
  price,
  priceText,
  headerBackground,
  textColor
}: CardHeaderProps) => {
  return (
    <div className={`p-4 text-center border-b ${headerBackground} ${textColor === "white" ? "text-white" : "text-black"}`}>
      <h2 className={`text-3xl font-bold ${textColor === "white" ? "text-white" : "text-[#0074bf]"}`}>
        ${price}
      </h2>
      <p className={`text-sm ${textColor === "white" ? "text-white/90" : "text-muted-foreground"}`}>
        {priceText}
      </p>
      {(price === 499 || price === 999) && (
        <p className={`text-xs ${textColor === "white" ? "text-white/90" : "text-muted-foreground"}`}>
          {price === 499 ? "consult with our team" : "Lifetime Updates"}
        </p>
      )}
    </div>
  );
};

export default CardHeader;

import React from 'react';

interface PriceDisplayProps {
  nightlyPrice: number;
  totalPrice: number;
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const PriceDisplay: React.FC<PriceDisplayProps> = ({ nightlyPrice, totalPrice }) => {
  return (
    <div className="sp-pricing">
      <p className="sp-nightly-price">
        {formatCurrency(nightlyPrice)}/night
      </p>
      <p className="sp-total-price">
        {formatCurrency(totalPrice)} Total
      </p>
    </div>
  );
};

export default PriceDisplay;

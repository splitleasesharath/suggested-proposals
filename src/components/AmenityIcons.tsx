import React from 'react';
import { Listing } from '../types';

interface AmenityIconsProps {
  listing: Listing;
}

interface AmenityDisplayItem {
  icon: string;
  label: string;
  value: string | number;
}

export const AmenityIcons: React.FC<AmenityIconsProps> = ({ listing }) => {
  const amenities: AmenityDisplayItem[] = [
    {
      icon: 'bed',
      label: 'Bedrooms',
      value: listing.featuresQtyBedrooms
    },
    {
      icon: 'bath',
      label: 'Bathrooms',
      value: listing.featuresQtyBathrooms
    },
    {
      icon: 'users',
      label: 'Guests',
      value: listing.featuresQtyGuests
    },
    {
      icon: 'home',
      label: 'Type',
      value: listing.featuresTypeOfSpace
    }
  ];

  const getIconEmoji = (iconType: string): string => {
    switch (iconType) {
      case 'bed':
        return '\uD83D\uDECF\uFE0F';
      case 'bath':
        return '\uD83D\uDEC1';
      case 'users':
        return '\uD83D\uDC65';
      case 'home':
        return '\uD83C\uDFE0';
      default:
        return '\u2728';
    }
  };

  return (
    <div className="sp-amenity-icons">
      {amenities.map((amenity, index) => (
        <div key={index} className="sp-amenity-box">
          <span className="sp-amenity-icon-placeholder">
            {getIconEmoji(amenity.icon)}
          </span>
          <span className="sp-amenity-label">
            {typeof amenity.value === 'number'
              ? `${amenity.value} ${amenity.label}`
              : amenity.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AmenityIcons;

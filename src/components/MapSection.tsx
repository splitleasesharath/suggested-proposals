import React from 'react';
import { GeographicAddress } from '../types';

interface MapSectionProps {
  location: GeographicAddress;
  googleMapsApiKey?: string;
}

export const MapSection: React.FC<MapSectionProps> = ({ location, googleMapsApiKey }) => {
  const { coordinates, address, city, state } = location;

  // If Google Maps API key is provided, render an actual map
  if (googleMapsApiKey && coordinates) {
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${coordinates.lat},${coordinates.lng}&zoom=14&size=400x200&markers=color:red%7C${coordinates.lat},${coordinates.lng}&key=${googleMapsApiKey}`;

    return (
      <div>
        <div className="sp-map-container">
          <img
            src={mapUrl}
            alt={`Map of ${address}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <p className="sp-location-text">
          {[address, city, state].filter(Boolean).join(', ')}
        </p>
      </div>
    );
  }

  // Fallback: render a placeholder with location info
  return (
    <div>
      <div className="sp-map-container">
        <div className="sp-map-placeholder">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{'\uD83D\uDCCD'}</div>
            <div style={{ fontSize: '14px' }}>Map Preview</div>
            <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '4px' }}>
              {city || address}
            </div>
          </div>
        </div>
      </div>
      <p className="sp-location-text">
        {[address, city, state].filter(Boolean).join(', ')}
      </p>
    </div>
  );
};

export default MapSection;

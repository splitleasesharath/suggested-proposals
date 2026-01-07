import React, { useState } from 'react';
import { ListingPhoto } from '../types';

interface ImageGalleryProps {
  photos: ListingPhoto[];
  listingName: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ photos, listingName }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!photos || photos.length === 0) {
    return (
      <div className="sp-image-gallery">
        <div className="sp-main-image" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}>
          No photos available
        </div>
      </div>
    );
  }

  return (
    <div className="sp-image-gallery">
      <img
        className="sp-main-image"
        src={photos[activeIndex]?.photo}
        alt={`${listingName} - Photo ${activeIndex + 1}`}
      />
      {photos.length > 1 && (
        <div className="sp-thumbnail-strip">
          {photos.slice(0, 5).map((photo, index) => (
            <img
              key={photo.id}
              className={`sp-thumbnail ${index === activeIndex ? 'active' : ''}`}
              src={photo.photo}
              alt={`${listingName} - Thumbnail ${index + 1}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;

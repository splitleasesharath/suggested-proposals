import React, { useState, useCallback, useEffect } from 'react';
import { Proposal, SuggestedProposalPopupProps } from '../types';
import { ImageGallery } from './ImageGallery';
import { AmenityIcons } from './AmenityIcons';
import { PriceDisplay } from './PriceDisplay';
import { ActionButtons } from './ActionButtons';
import { MapSection } from './MapSection';
import { WhyThisProposal } from './WhyThisProposal';
import './SuggestedProposalPopup.css';

export interface SuggestedProposalPopupConfig {
  googleMapsApiKey?: string;
  onOwnProposal?: (proposal: Proposal) => void;
}

interface Props extends SuggestedProposalPopupProps {
  config?: SuggestedProposalPopupConfig;
}

export const SuggestedProposalPopup: React.FC<Props> = ({
  proposals,
  currentIndex,
  onInterested,
  onRemove,
  onNavigate,
  onClose,
  isVisible,
  config
}) => {
  const [showInterestPopup, setShowInterestPopup] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  const currentProposal = proposals[currentIndex - 1]; // 1-indexed
  const totalProposals = proposals.length;

  const canGoNext = currentIndex < totalProposals;
  const canGoPrev = currentIndex > 1;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible) return;

      switch (e.key) {
        case 'Escape':
          if (showInterestPopup) {
            setShowInterestPopup(false);
          } else {
            onClose();
          }
          break;
        case 'ArrowLeft':
          if (canGoPrev) onNavigate('prev');
          break;
        case 'ArrowRight':
          if (canGoNext) onNavigate('next');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, showInterestPopup, canGoNext, canGoPrev, onNavigate, onClose]);

  const handleInterestedClick = useCallback(() => {
    if (!currentProposal) return;
    setSelectedProposal(currentProposal);
    setShowInterestPopup(true);
  }, [currentProposal]);

  const handleRemoveClick = useCallback(() => {
    if (!currentProposal) return;
    setIsProcessing(true);
    onRemove(currentProposal.id);
    setIsProcessing(false);
  }, [currentProposal, onRemove]);

  const handleConfirmInterest = useCallback(() => {
    if (!selectedProposal) return;
    setIsProcessing(true);

    // Call onInterested callback
    onInterested(selectedProposal.id);

    // If onOwnProposal is provided, call it
    if (config?.onOwnProposal) {
      config.onOwnProposal(selectedProposal);
    }

    setShowInterestPopup(false);
    setIsProcessing(false);
  }, [selectedProposal, onInterested, config]);

  const handleCancelInterest = useCallback(() => {
    setShowInterestPopup(false);
    setSelectedProposal(null);
  }, []);

  if (!isVisible || !currentProposal) {
    return null;
  }

  return (
    <>
      {/* Backdrop - clicking here closes the popup (Group Focus behavior) */}
      <div
        className="sp-popup-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="sp-popup-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Suggested Proposal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sp-card">
          {/* Header */}
          <header className="sp-header">
            <h2 className="sp-header-title">Suggested Proposal for You</h2>
            <button
              className="sp-close-btn"
              onClick={onClose}
              aria-label="Close suggested proposal popup"
            >
              {'\u00D7'}
            </button>
          </header>

          {/* Content */}
          <div className="sp-content">
            {/* Left Column - 55% */}
            <div className="sp-left-column">
              <ImageGallery
                photos={currentProposal.listing.featuresPhotos}
                listingName={currentProposal.listing.name}
              />

              <h3 className="sp-listing-name">{currentProposal.listing.name}</h3>

              <AmenityIcons listing={currentProposal.listing} />

              <PriceDisplay
                nightlyPrice={currentProposal.proposalNightlyPrice}
                totalPrice={currentProposal.totalPriceForReservation}
              />

              <ActionButtons
                onInterested={handleInterestedClick}
                onRemove={handleRemoveClick}
                isProcessing={isProcessing}
              />
            </div>

            {/* Right Column - 45% */}
            <div className="sp-right-column">
              <MapSection
                location={currentProposal.listing.location}
                googleMapsApiKey={config?.googleMapsApiKey}
              />

              <WhyThisProposal
                negotiationSummary={currentProposal.negotiationSummary}
              />
            </div>
          </div>

          {/* Navigation Footer */}
          <footer className="sp-nav-footer">
            <button
              className="sp-nav-arrow"
              onClick={() => onNavigate('prev')}
              disabled={!canGoPrev}
              aria-label="Previous proposal"
            >
              {'\u2190'}
            </button>
            <span className="sp-nav-indicator">
              Proposal {currentIndex} of {totalProposals}
            </span>
            <button
              className="sp-nav-arrow"
              onClick={() => onNavigate('next')}
              disabled={!canGoNext}
              aria-label="Next proposal"
            >
              {'\u2192'}
            </button>
          </footer>
        </div>
      </div>

      {/* Interest Confirmation Popup */}
      {showInterestPopup && selectedProposal && (
        <div className="sp-interest-overlay" onClick={handleCancelInterest}>
          <div className="sp-interest-popup" onClick={(e) => e.stopPropagation()}>
            <h3 className="sp-interest-title">Confirm Your Interest</h3>
            <div className="sp-interest-content">
              <p>
                You're expressing interest in <strong>{selectedProposal.listing.name}</strong>.
              </p>
              <p>
                A Split Lease agent will be notified and will help coordinate the next steps
                with the host on your behalf.
              </p>
            </div>
            <div className="sp-interest-buttons">
              <button
                className="sp-btn sp-btn-remove"
                onClick={handleCancelInterest}
              >
                Cancel
              </button>
              <button
                className="sp-btn sp-btn-interested"
                onClick={handleConfirmInterest}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Confirm Interest'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuggestedProposalPopup;

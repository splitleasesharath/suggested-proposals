import React, { useEffect, useState } from 'react';
import './SuggestedProposalTrigger.css';

interface SuggestedProposalTriggerProps {
  onClick: () => void;
  isActive: boolean;
  proposalCount?: number;
  showLabelOnMount?: boolean;
  labelDelay?: number;
  labelDuration?: number;
}

export const SuggestedProposalTrigger: React.FC<SuggestedProposalTriggerProps> = ({
  onClick,
  isActive,
  proposalCount = 0,
  showLabelOnMount = true,
  labelDelay = 3000,
  labelDuration = 5000
}) => {
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    if (!showLabelOnMount || proposalCount === 0) return;

    // Show label after delay
    const showTimer = setTimeout(() => {
      setShowLabel(true);
    }, labelDelay);

    // Hide label after duration
    const hideTimer = setTimeout(() => {
      setShowLabel(false);
    }, labelDelay + labelDuration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [showLabelOnMount, labelDelay, labelDuration, proposalCount]);

  const handleClick = () => {
    onClick();
  };

  return (
    <div className="sp-trigger-wrapper">
      <span className={`sp-trigger-label ${showLabel ? 'visible' : ''}`}>
        Suggested Proposal
      </span>
      <button
        className={`sp-trigger-btn ${isActive ? 'active' : ''}`}
        onClick={handleClick}
        title="AI Suggested Proposal"
        aria-label={`View suggested proposals${proposalCount > 0 ? ` (${proposalCount})` : ''}`}
      >
        <svg viewBox="0 0 24 24">
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        {proposalCount > 0 && (
          <span className="sp-trigger-badge">{proposalCount}</span>
        )}
      </button>
    </div>
  );
};

export default SuggestedProposalTrigger;

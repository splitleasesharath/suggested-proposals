import React from 'react';

interface ActionButtonsProps {
  onInterested: () => void;
  onRemove: () => void;
  isProcessing?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onInterested,
  onRemove,
  isProcessing = false
}) => {
  return (
    <div className="sp-action-buttons">
      <button
        className="sp-btn sp-btn-interested"
        onClick={onInterested}
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Interested'}
      </button>
      <button
        className="sp-btn sp-btn-remove"
        onClick={onRemove}
        disabled={isProcessing}
      >
        Remove
      </button>
    </div>
  );
};

export default ActionButtons;

import React from 'react';
import { NegotiationSummary } from '../types';

interface WhyThisProposalProps {
  negotiationSummary: NegotiationSummary[];
}

export const WhyThisProposal: React.FC<WhyThisProposalProps> = ({ negotiationSummary }) => {
  const summary = negotiationSummary?.[0]?.summary;

  return (
    <div className="sp-why-section">
      <div className="sp-why-header">
        <svg
          className="sp-why-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <h4 className="sp-why-title">Why This Proposal?</h4>
      </div>
      <p className="sp-why-content">
        This proposal was suggested by a Split Lease Agent on your behalf.
      </p>
      {summary && (
        <p className="sp-why-summary">{summary}</p>
      )}
    </div>
  );
};

export default WhyThisProposal;

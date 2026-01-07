import React, { useState } from 'react';
import { SuggestedProposalPopup, SuggestedProposalTrigger } from './components';
import { useSuggestedProposals } from './hooks';
import { mockProposals } from './utils/mockData';
import './App.css';

function App() {
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' }>>([]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const {
    isVisible,
    proposalCounter,
    totalProposals,
    show,
    hide,
    goToNext,
    goToPrevious,
    handleInterested,
    handleRemove,
    state
  } = useSuggestedProposals({
    initialProposals: mockProposals,
    onInterested: async (proposalId) => {
      console.log('Interested in proposal:', proposalId);
      showToast('Interest registered! A Split Lease agent will contact you soon.', 'success');
    },
    onRemove: async (proposalId) => {
      console.log('Removed proposal:', proposalId);
      showToast('Proposal removed from suggestions.', 'success');
    },
    onOwnProposal: async (proposal) => {
      console.log('Own proposal:', proposal);
    }
  });

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      goToNext();
    } else {
      goToPrevious();
    }
  };

  return (
    <div className="demo-app">
      {/* Demo Header */}
      <header className="demo-header">
        <div className="demo-logo">Split Lease</div>
        <nav className="demo-nav">
          <button className="demo-nav-item">Listings</button>
          <button className="demo-nav-item">My Proposals</button>
          <button className="demo-nav-item">Messages</button>
          <SuggestedProposalTrigger
            onClick={isVisible ? hide : show}
            isActive={isVisible}
            proposalCount={totalProposals}
            showLabelOnMount={true}
            labelDelay={3000}
            labelDuration={5000}
          />
        </nav>
      </header>

      {/* Main Content */}
      <main className="demo-main">
        <div className="demo-hero">
          <h1>Suggested Proposals Component Demo</h1>
          <p>
            This demo showcases the Suggested Proposal popup component for Split Lease.
            Click the lightbulb button in the header to view suggested proposals.
            Wait 3 seconds to see the animated label appear!
          </p>
          <button className="demo-cta" onClick={show}>
            View Suggested Proposals ({totalProposals})
          </button>
        </div>

        <div className="demo-info">
          <h2>Component Features</h2>
          <ul>
            <li>Animated trigger button with slide-in label</li>
            <li>Browse through multiple suggested proposals</li>
            <li>View property photos, amenities, and pricing</li>
            <li>See location on map with address</li>
            <li>Read AI-generated proposal summaries</li>
            <li>Express interest or remove proposals</li>
            <li>Click outside popup to close (Group Focus)</li>
            <li>Keyboard navigation (Arrow keys, Escape)</li>
          </ul>
        </div>
      </main>

      {/* Suggested Proposal Popup */}
      <SuggestedProposalPopup
        proposals={state.filteredProposals}
        currentIndex={proposalCounter}
        onInterested={handleInterested}
        onRemove={handleRemove}
        onNavigate={handleNavigate}
        onClose={hide}
        isVisible={isVisible}
      />

      {/* Toast Notifications */}
      <div className="demo-toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`demo-toast demo-toast-${toast.type}`}>
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

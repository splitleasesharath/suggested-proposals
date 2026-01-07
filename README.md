# Suggested Proposals Component

A reusable React component for displaying suggested rental proposals in the Split Lease application.

## Features

- **Proposal Carousel**: Navigate through multiple suggested proposals
- **Photo Gallery**: View property images with thumbnail navigation
- **Amenity Display**: See bedrooms, bathrooms, guests, and property type
- **Pricing Information**: View nightly and total prices
- **Map Integration**: Display property location (supports Google Maps API)
- **AI Summary**: Show why a proposal was suggested
- **Action Buttons**: Express interest or remove proposals
- **Keyboard Navigation**: Arrow keys for navigation, Escape to close
- **Responsive Design**: Works on all screen sizes
- **Toast Notifications**: Feedback for user actions

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

This will start the demo app at `http://localhost:8000`

## Usage

### Basic Usage

```tsx
import { SuggestedProposalPopup, useSuggestedProposals } from 'suggested-proposals';

function App() {
  const {
    isVisible,
    proposalCounter,
    show,
    hide,
    goToNext,
    goToPrevious,
    handleInterested,
    handleRemove,
    state
  } = useSuggestedProposals({
    initialProposals: proposals,
    onInterested: async (proposalId) => {
      // Handle interest action
    },
    onRemove: async (proposalId) => {
      // Handle remove action
    }
  });

  return (
    <SuggestedProposalPopup
      proposals={state.filteredProposals}
      currentIndex={proposalCounter}
      onInterested={handleInterested}
      onRemove={handleRemove}
      onNavigate={(dir) => dir === 'next' ? goToNext() : goToPrevious()}
      onClose={hide}
      isVisible={isVisible}
    />
  );
}
```

### With Google Maps

```tsx
<SuggestedProposalPopup
  {...props}
  config={{
    googleMapsApiKey: 'YOUR_API_KEY'
  }}
/>
```

## Components

### SuggestedProposalPopup
Main popup component that displays proposal details.

### Sub-components
- `ImageGallery` - Photo display with thumbnails
- `AmenityIcons` - Property feature icons
- `PriceDisplay` - Pricing information
- `ActionButtons` - Interest/Remove buttons
- `MapSection` - Location map
- `WhyThisProposal` - AI-generated summary

## Hooks

### useSuggestedProposals
Custom hook for managing proposal state and navigation.

```tsx
const {
  state,
  currentProposal,
  isVisible,
  proposalCounter,
  totalProposals,
  show,
  hide,
  toggle,
  goToNext,
  goToPrevious,
  handleInterested,
  handleRemove,
  canGoNext,
  canGoPrev
} = useSuggestedProposals(options);
```

## Types

All TypeScript interfaces are exported from `src/types/index.ts`:

- `Proposal` - Main proposal data structure
- `Listing` - Property listing information
- `GeographicAddress` - Location data
- `NegotiationSummary` - AI-generated summary
- `SuggestedProposalPopupProps` - Component props

## Styling

The component uses CSS custom properties for easy theming:

```css
:root {
  --sp-primary-purple: #250856;
  --sp-primary-contrast: #FFFFFF;
  --sp-medium-deep-blue: #0206d4;
  /* ... more variables in SuggestedProposalPopup.css */
}
```

## License

MIT

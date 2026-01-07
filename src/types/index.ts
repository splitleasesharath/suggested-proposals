// Proposal Status enum
export type ProposalStatus =
  | 'suggested'
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'expired'
  | 'finalized';

// Alert Type enum
export type AlertType = 'error' | 'information' | 'warning' | 'success' | 'empty';

// Days enum for check-in/check-out
export type Day =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

// Listing Type
export type ListingType =
  | 'Entire Place'
  | 'Private Room'
  | 'Shared Room'
  | 'Studio';

// Geographic Address
export interface GeographicAddress {
  address: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Amenity
export interface Amenity {
  id: string;
  name: string;
  icon: string;
  category?: string;
}

// House Rule
export interface HouseRule {
  id: string;
  rule: string;
  icon?: string;
}

// Listing Photo
export interface ListingPhoto {
  id: string;
  photo: string; // URL
  caption?: string;
  order?: number;
}

// Listing
export interface Listing {
  id: string;
  name: string;
  location: GeographicAddress;
  featuresPhotos: ListingPhoto[];
  featuresAmenities: Amenity[];
  featuresHouseRules: HouseRule[];
  featuresQtyBedrooms: number;
  featuresQtyBathrooms: number;
  featuresQtyBeds: number;
  featuresQtyGuests: number;
  featuresTypeOfSpace: ListingType;
  kitchenType?: string;
}

// User (simplified)
export interface User {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

// Host Account
export interface HostAccount {
  id: string;
  name: string;
  user: User;
}

// Rental Application
export interface RentalApplication {
  id: string;
  submitted: boolean;
  submittedAt?: Date;
}

// Guest
export interface Guest {
  id: string;
  user: User;
  rentalApplication?: RentalApplication;
}

// Negotiation Summary
export interface NegotiationSummary {
  id: string;
  proposalAssociated: string; // Proposal ID
  summary: string;
  statusProposal: ProposalStatus;
  toAccount: string; // User ID
}

// Proposal - Core data type
export interface Proposal {
  id: string;

  // Basic Information
  proposalNightlyPrice: number;
  totalPriceForReservation: number;
  startDate: Date;
  endDate: Date;
  checkInDay: Day;
  checkOutDay: Day;
  durationInMonths: number;

  // Pricing Fields
  fourWeekRent: number;
  fourWeekCompensation: number;
  cleaningFee: number;
  damageDeposit: number;
  hostCompensation: number;
  totalCompensation: number;

  // Host Counter Offer Fields (prefixed with "hc")
  hcTotalPrice?: number;
  hcFourWeekRent?: number;
  hcCheckInDay?: Day;
  hcCheckOutDay?: Day;
  hcCleaningFee?: number;
  hcDamageDeposit?: number;
  hcDurationInMonths?: number;

  // Relationships
  listing: Listing;
  guest: Guest;
  hostAccount: HostAccount;
  interested: string[]; // User IDs
  notInterested: string[]; // User IDs
  negotiationSummary: NegotiationSummary[];

  // Status & Flags
  status: ProposalStatus;
  isFinalized: boolean;
  deleted: boolean;
  counterOfferHappened: boolean;
  viewedProposedProposal: boolean;

  // Negotiation
  comment?: string;
  history: string[];
}

// Component Props
export interface SuggestedProposalPopupProps {
  proposals: Proposal[];
  currentIndex: number;
  onInterested: (proposalId: string) => void;
  onRemove: (proposalId: string) => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  onClose: () => void;
  isVisible: boolean;
  onOwnProposal?: (proposal: Proposal) => void;
}

// State management
export interface SuggestedProposalState {
  proposalCounter: number;
  isVisible: boolean;
  detailsVisible: boolean;
  interestSection: string;
  filteredProposals: Proposal[];
  currentProposal: Proposal | null;
}

// Toast/Alert configuration
export interface ToastConfig {
  title: string;
  content?: string;
  type: AlertType;
  duration?: number;
  showOnLive?: boolean;
}

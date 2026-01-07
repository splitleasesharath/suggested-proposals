import { Proposal } from '../types';

export const mockProposals: Proposal[] = [
  {
    id: 'proposal-1',
    proposalNightlyPrice: 125.5,
    totalPriceForReservation: 2510.0,
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-02-21'),
    checkInDay: 'Saturday',
    checkOutDay: 'Saturday',
    durationInMonths: 1,
    fourWeekRent: 3514.0,
    fourWeekCompensation: 500.0,
    cleaningFee: 150.0,
    damageDeposit: 500.0,
    hostCompensation: 500.0,
    totalCompensation: 1000.0,
    listing: {
      id: 'listing-1',
      name: 'Modern Downtown Studio with City Views',
      location: {
        address: '123 Main Street',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102',
        country: 'USA',
        coordinates: {
          lat: 37.7749,
          lng: -122.4194
        }
      },
      featuresPhotos: [
        {
          id: 'photo-1',
          photo: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
          caption: 'Living Room',
          order: 1
        },
        {
          id: 'photo-2',
          photo: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
          caption: 'Kitchen',
          order: 2
        },
        {
          id: 'photo-3',
          photo: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
          caption: 'Bedroom',
          order: 3
        }
      ],
      featuresAmenities: [
        { id: 'wifi', name: 'WiFi', icon: 'wifi' },
        { id: 'ac', name: 'Air Conditioning', icon: 'ac' },
        { id: 'washer', name: 'Washer', icon: 'washer' }
      ],
      featuresHouseRules: [
        { id: 'no-smoking', rule: 'No smoking' },
        { id: 'no-pets', rule: 'No pets' }
      ],
      featuresQtyBedrooms: 1,
      featuresQtyBathrooms: 1,
      featuresQtyBeds: 1,
      featuresQtyGuests: 2,
      featuresTypeOfSpace: 'Studio',
      kitchenType: 'Full Kitchen'
    },
    guest: {
      id: 'guest-1',
      user: {
        id: 'user-1',
        email: 'guest@example.com',
        firstName: 'John',
        lastName: 'Doe'
      },
      rentalApplication: {
        id: 'app-1',
        submitted: true,
        submittedAt: new Date('2024-01-15')
      }
    },
    hostAccount: {
      id: 'host-1',
      name: 'Premium Properties',
      user: {
        id: 'host-user-1',
        email: 'host@example.com',
        firstName: 'Jane',
        lastName: 'Smith'
      }
    },
    interested: [],
    notInterested: [],
    negotiationSummary: [
      {
        id: 'summary-1',
        proposalAssociated: 'proposal-1',
        summary:
          'This property matches your preferred location in downtown SF with easy access to public transit. The nightly rate is 15% below average for similar listings in this area.',
        statusProposal: 'suggested',
        toAccount: 'user-1'
      }
    ],
    status: 'suggested',
    isFinalized: false,
    deleted: false,
    counterOfferHappened: false,
    viewedProposedProposal: false,
    history: []
  },
  {
    id: 'proposal-2',
    proposalNightlyPrice: 89.0,
    totalPriceForReservation: 1780.0,
    startDate: new Date('2024-02-15'),
    endDate: new Date('2024-03-05'),
    checkInDay: 'Friday',
    checkOutDay: 'Wednesday',
    durationInMonths: 1,
    fourWeekRent: 2492.0,
    fourWeekCompensation: 400.0,
    cleaningFee: 100.0,
    damageDeposit: 400.0,
    hostCompensation: 400.0,
    totalCompensation: 800.0,
    listing: {
      id: 'listing-2',
      name: 'Cozy Mission District 1BR Apartment',
      location: {
        address: '456 Valencia Street',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94110',
        country: 'USA',
        coordinates: {
          lat: 37.7599,
          lng: -122.4214
        }
      },
      featuresPhotos: [
        {
          id: 'photo-4',
          photo: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
          caption: 'Exterior',
          order: 1
        },
        {
          id: 'photo-5',
          photo: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800',
          caption: 'Living Area',
          order: 2
        }
      ],
      featuresAmenities: [
        { id: 'wifi', name: 'WiFi', icon: 'wifi' },
        { id: 'parking', name: 'Free Parking', icon: 'parking' }
      ],
      featuresHouseRules: [
        { id: 'quiet-hours', rule: 'Quiet hours after 10pm' }
      ],
      featuresQtyBedrooms: 1,
      featuresQtyBathrooms: 1,
      featuresQtyBeds: 2,
      featuresQtyGuests: 3,
      featuresTypeOfSpace: 'Entire Place',
      kitchenType: 'Full Kitchen'
    },
    guest: {
      id: 'guest-1',
      user: {
        id: 'user-1',
        email: 'guest@example.com',
        firstName: 'John',
        lastName: 'Doe'
      }
    },
    hostAccount: {
      id: 'host-2',
      name: 'City Rentals SF',
      user: {
        id: 'host-user-2',
        email: 'cityrental@example.com',
        firstName: 'Mike',
        lastName: 'Johnson'
      }
    },
    interested: [],
    notInterested: [],
    negotiationSummary: [
      {
        id: 'summary-2',
        proposalAssociated: 'proposal-2',
        summary:
          'This listing is in the vibrant Mission District, close to restaurants and nightlife you mentioned enjoying. The host has excellent reviews and offers flexible check-in times.',
        statusProposal: 'suggested',
        toAccount: 'user-1'
      }
    ],
    status: 'suggested',
    isFinalized: false,
    deleted: false,
    counterOfferHappened: false,
    viewedProposedProposal: false,
    history: []
  },
  {
    id: 'proposal-3',
    proposalNightlyPrice: 175.0,
    totalPriceForReservation: 5250.0,
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-03-31'),
    checkInDay: 'Friday',
    checkOutDay: 'Sunday',
    durationInMonths: 1,
    fourWeekRent: 4900.0,
    fourWeekCompensation: 700.0,
    cleaningFee: 200.0,
    damageDeposit: 750.0,
    hostCompensation: 700.0,
    totalCompensation: 1400.0,
    listing: {
      id: 'listing-3',
      name: 'Luxury 2BR with Panoramic Bay Views',
      location: {
        address: '789 Embarcadero',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94111',
        country: 'USA',
        coordinates: {
          lat: 37.7946,
          lng: -122.394
        }
      },
      featuresPhotos: [
        {
          id: 'photo-6',
          photo: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
          caption: 'Bay View',
          order: 1
        },
        {
          id: 'photo-7',
          photo: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
          caption: 'Kitchen',
          order: 2
        },
        {
          id: 'photo-8',
          photo: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800',
          caption: 'Master Bedroom',
          order: 3
        },
        {
          id: 'photo-9',
          photo: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800',
          caption: 'Bathroom',
          order: 4
        }
      ],
      featuresAmenities: [
        { id: 'wifi', name: 'WiFi', icon: 'wifi' },
        { id: 'ac', name: 'Air Conditioning', icon: 'ac' },
        { id: 'gym', name: 'Building Gym', icon: 'gym' },
        { id: 'pool', name: 'Rooftop Pool', icon: 'pool' }
      ],
      featuresHouseRules: [
        { id: 'no-smoking', rule: 'No smoking' },
        { id: 'no-parties', rule: 'No parties or events' }
      ],
      featuresQtyBedrooms: 2,
      featuresQtyBathrooms: 2,
      featuresQtyBeds: 3,
      featuresQtyGuests: 5,
      featuresTypeOfSpace: 'Entire Place',
      kitchenType: 'Gourmet Kitchen'
    },
    guest: {
      id: 'guest-1',
      user: {
        id: 'user-1',
        email: 'guest@example.com',
        firstName: 'John',
        lastName: 'Doe'
      },
      rentalApplication: {
        id: 'app-1',
        submitted: true,
        submittedAt: new Date('2024-01-15')
      }
    },
    hostAccount: {
      id: 'host-3',
      name: 'Waterfront Luxury Stays',
      user: {
        id: 'host-user-3',
        email: 'waterfront@example.com',
        firstName: 'Sarah',
        lastName: 'Williams'
      }
    },
    interested: [],
    notInterested: [],
    negotiationSummary: [
      {
        id: 'summary-3',
        proposalAssociated: 'proposal-3',
        summary:
          'This premium listing offers stunning Bay views and luxury amenities. Perfect for your extended business trip with the home office setup you requested. The host offers a 10% discount for stays over 3 weeks.',
        statusProposal: 'suggested',
        toAccount: 'user-1'
      }
    ],
    status: 'suggested',
    isFinalized: false,
    deleted: false,
    counterOfferHappened: false,
    viewedProposedProposal: false,
    history: []
  }
];

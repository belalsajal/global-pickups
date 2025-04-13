import OnboardingTour from './OnboardingTour';

// Pre-configured tour steps for the dashboard
export const dashboardTourSteps = [
  {
    target: 'body',
    content: 'Welcome to Global Pickups! Let us show you around.',
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="welcome"]',
    content: 'This is your personal dashboard. Your journey begins here!',
    placement: 'bottom',
  },
  {
    target: '[data-tour="profile"]',
    content: 'Here you can see your profile information and rating. Complete your profile to build trust with other users.',
    placement: 'bottom',
  },
  {
    target: '[data-tour="search"]',
    content: 'Search for travelers or item requests based on location, date, and other criteria.',
    placement: 'bottom',
  },
  {
    target: '[data-tour="travel-plans"]',
    content: 'View and manage your travel plans. Add new trips to let others know when you can deliver items.',
    placement: 'top',
  },
  {
    target: '[data-tour="item-requests"]',
    content: 'Here you can see all your item requests. Create new requests for items you need delivered.',
    placement: 'top',
  }
];

export { OnboardingTour };
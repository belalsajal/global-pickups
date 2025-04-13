// filepath: /home/belalsajal/projects/global-pickups/src/components/LandingPage/data.js
import {
  FlightTakeoff, Security, Payment, Chat, CheckCircle,
  Star, Public, Search, Luggage, Wallet, Groups,
  CalendarMonth, Scale, LocationOn, ArrowForward,
  Flight, LocalShipping, AddCircle, Info, ArrowBack
} from '@mui/icons-material';

// City data (would come from an API in a real application)
export const cities = [
  'New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Berlin',
  'Mumbai', 'Beijing', 'Rio de Janeiro', 'Cairo', 'Moscow',
  'Toronto', 'Singapore', 'Dubai', 'Los Angeles', 'Rome'
];

// Feature cards data
export const featureCards = [
  {
    title: 'Enhanced Trust & Safety',
    description: 'Our advanced security infrastructure ensures all transactions remain secure, private, and reliable.',
    icon: <Security sx={{ fontSize: 40, color: '#6d8ec5' }} />, // Lake Blue
    color: '#6d8ec5', // Lake Blue
    shadowColor: 'rgba(109, 142, 197, 0.2)', // Lake Blue shadow
    benefits: [
      'Multi-factor identity verification system',
      'Bank-grade payment security with escrow protection',
      'Advanced user rating and review algorithm',
      'Dedicated 24/7 global support team'
    ]
  },
  {
    title: 'Intelligent Communication',
    description: 'Our revamped messaging platform facilitates seamless connections between Journey Providers and Shipment Seekers.',
    icon: <Chat sx={{ fontSize: 40, color: '#d3622c' }} />, // Flame
    color: '#d3622c', // Flame
    shadowColor: 'rgba(211, 98, 44, 0.2)', // Flame shadow
    benefits: [
      'Real-time messaging with instant notifications',
      'AI-powered auto-translation for 30+ languages',
      'Smart location-based meeting point recommendations',
      'Secure media sharing for item verification'
    ]
  },
  {
    title: 'Secure Financial Ecosystem',
    description: 'Our enhanced payment system provides comprehensive protection and flexible options for all users.',
    icon: <Payment sx={{ fontSize: 40, color: '#576238' }} />, // Moss
    color: '#576238', // Moss
    shadowColor: 'rgba(87, 98, 56, 0.2)', // Moss shadow
    benefits: [
      'Enhanced escrow protection with transaction tracking',
      'Dynamic fee structure based on delivery complexity',
      'Multiple currency support and payment methods',
      'Tiered insurance options for items of all values'
    ]
  },
  {
    title: 'Expanded Global Network',
    description: 'Our community has grown to connect users across 120+ countries with enhanced local support.',
    icon: <Public sx={{ fontSize: 40, color: '#f0c845' }} />, // Saffron
    color: '#f0c845', // Saffron
    shadowColor: 'rgba(240, 200, 69, 0.2)', // Saffron shadow
    benefits: [
      '25,000+ active users worldwide and growing',
      'Enhanced coverage in 120+ countries',
      'Specialized local pickup and delivery options',
      'Regional community hubs and support centers'
    ]
  },
  {
    title: 'AI-Powered Matching',
    description: 'Our next-generation algorithm finds optimal matches between Journey Providers and Shipment Seekers.',
    icon: <Luggage sx={{ fontSize: 40, color: '#d3622c' }} />, // Flame
    color: '#d3622c', // Flame
    shadowColor: 'rgba(211, 98, 44, 0.2)', // Flame shadow
    benefits: [
      'Advanced AI matching with predictive logistics',
      'Comprehensive filtering with saved preferences',
      'Smart notifications for high-compatibility matches',
      'Optimized routing suggestions for multi-stop journeys'
    ]
  },
  {
    title: 'Global Travel Resources',
    description: 'Access our expanded knowledge base with country-specific delivery information and guides.',
    icon: <Info sx={{ fontSize: 40, color: '#6d8ec5' }} />, // Lake Blue
    color: '#6d8ec5', // Lake Blue
    shadowColor: 'rgba(109, 142, 197, 0.2)', // Lake Blue shadow
    benefits: [
      'Updated customs and import regulations by country',
      'Comprehensive prohibited and restricted items database',
      'Professional packing guidelines and certification',
      'Interactive travel documentation assistant'
    ]
  }
];

// How It Works steps data
export const howItWorksSteps = [
  {
    title: 'Register Your Journey',
    description: 'Add details about your upcoming trips including dates, route, and available capacity. Become a Journey Provider and earn while traveling.',
    icon: <FlightTakeoff sx={{ fontSize: 36, color: '#6d8ec5' }} />,
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: '#6d8ec5', // Lake Blue
    shadowColor: 'rgba(109, 142, 197, 0.3)',
    step: 'post'
  },
  {
    title: 'Connect with Your Match',
    description: 'Our enhanced AI matching system links Journey Providers with Shipment Seekers. Get automatic matches or browse available requests for your route.',
    icon: <Search sx={{ fontSize: 36, color: '#d3622c' }} />,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: '#d3622c', // Flame
    shadowColor: 'rgba(211, 98, 44, 0.3)',
    step: 'match'
  },
  {
    title: 'Secure & Deliver',
    description: 'Use our secure communication platform, agree on terms, and complete your transaction with our enhanced payment protection system.',
    icon: <Wallet sx={{ fontSize: 36, color: '#f0c845' }} />,
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: '#f0c845', // Saffron
    shadowColor: 'rgba(240, 200, 69, 0.3)',
    step: 'deliver'
  }
];

// Testimonials data
export const testimonials = [
  {
    name: 'Michael S.',
    location: 'New York, USA',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'The enhanced Global Pickups platform made finding a Journey Provider from Tokyo incredibly easy. Their secure verification system gave me peace of mind, and the AI matching found the perfect carrier for my limited edition vinyl in just hours!',
    role: 'Shipment Seeker',
    icon: <Luggage fontSize="small" />,
  },
  {
    name: 'Sarah T.',
    location: 'London, UK',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'As a frequent business traveler, I\'ve earned over $5,000 in the past year using the upgraded Journey Provider features. The new route optimization suggestions have helped me take on multiple deliveries with minimal detours!',
    role: 'Journey Provider',
    icon: <FlightTakeoff fontSize="small" />,
  },
  {
    name: 'Alex R.',
    location: 'Berlin, Germany',
    avatar: 'https://randomuser.me/api/portraits/men/72.jpg',
    text: 'The new secure payment system and item tracking feature gave me complete confidence when sending time-sensitive documents to London. I could monitor the entire journey, and the escrow protection meant worry-free transactions.',
    role: 'Shipment Seeker',
    icon: <Luggage fontSize="small" />,
  }
];

// Statistics data
export const statistics = [
  {
    value: '25k+',
    label: 'Active Users',
    icon: <Groups fontSize="large" />,
    color: 'primary.main'
  },
  {
    value: '22k+',
    label: 'Items Delivered',
    icon: <LocalShipping fontSize="large" />,
    color: 'secondary.main'
  },
  {
    value: '120+',
    label: 'Countries Covered',
    icon: <Public fontSize="large" />,
    color: 'success.main'
  },
  {
    value: '4.9',
    label: 'Average Rating',
    icon: <Star fontSize="large" />,
    color: '#ff9800'
  }
];

// Benefits for CTA section
export const benefits = [
  'Register in under 90 seconds with enhanced verification',
  'Free to join, with transparent fee structure',
  'Immediate access to our expanded global network',
  '24/7 multilingual customer support'
];
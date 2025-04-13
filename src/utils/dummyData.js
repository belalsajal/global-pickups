// Dummy data for the application
export const travelers = [
  {
    id: 'trav-1',
    user_id: 'user-123',
    full_name: 'Sophia Chen',
    avatar_url: 'https://randomuser.me/api/portraits/women/32.jpg',
    rating: 4.9,
    verified: true,
    departure_location: 'Tokyo, Japan',
    destination: 'London, UK',
    departure_date: '2025-05-15',
    arrival_date: '2025-05-16',
    max_weight: 5,
    max_dimensions: '30x20x10 cm',
    notes: 'Taking a direct flight. Can carry small electronics and gifts.'
  },
  {
    id: 'trav-2',
    user_id: 'user-234',
    full_name: 'Michael Rodriguez',
    avatar_url: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 4.7,
    verified: true,
    departure_location: 'New York, USA',
    destination: 'Paris, France',
    departure_date: '2025-05-18',
    arrival_date: '2025-05-19',
    max_weight: 3,
    max_dimensions: '25x15x8 cm',
    notes: 'Business trip. Can carry small packages only.'
  },
  {
    id: 'trav-3',
    user_id: 'user-345',
    full_name: 'Aisha Patel',
    avatar_url: 'https://randomuser.me/api/portraits/women/67.jpg',
    rating: 4.8,
    verified: true,
    departure_location: 'Mumbai, India',
    destination: 'Dubai, UAE',
    departure_date: '2025-05-20',
    arrival_date: '2025-05-20',
    max_weight: 7,
    max_dimensions: '35x25x15 cm',
    notes: 'Flying Emirates. Happy to carry gifts and small packages.'
  },
  {
    id: 'trav-4',
    user_id: 'user-456',
    full_name: 'David Kim',
    avatar_url: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 4.6,
    verified: false,
    departure_location: 'Seoul, South Korea',
    destination: 'Sydney, Australia',
    departure_date: '2025-05-25',
    arrival_date: '2025-05-26',
    max_weight: 4,
    max_dimensions: '28x18x12 cm',
    notes: 'Weekend trip. Can carry cosmetics and small tech items.'
  },
  {
    id: 'trav-5',
    user_id: 'user-567',
    full_name: 'Emma Johnson',
    avatar_url: 'https://randomuser.me/api/portraits/women/23.jpg',
    rating: 5.0,
    verified: true,
    departure_location: 'London, UK',
    destination: 'Toronto, Canada',
    departure_date: '2025-05-28',
    arrival_date: '2025-05-28',
    max_weight: 6,
    max_dimensions: '32x22x12 cm',
    notes: 'Direct flight. Happy to carry books and non-perishable items.'
  },
  {
    id: 'trav-2',
    user_id: 'user-124',
    full_name: 'Akio Tanaka',
    avatar_url: 'https://randomuser.me/api/portraits/men/42.jpg',
    rating: 4.7,
    verified: true,
    departure_location: 'London, UK',
    destination: 'New York, USA',
    departure_date: '2025-04-20',
    arrival_date: '2025-04-21',
    max_weight: 8,
    bio: 'Frequent business traveler. Happy to help!'
  },
  {
    id: 'trav-3',
    user_id: 'user-125',
    full_name: 'Elena Rodriguez',
    avatar_url: 'https://randomuser.me/api/portraits/women/24.jpg',
    rating: 4.8,
    verified: true,
    departure_location: 'Barcelona, Spain',
    destination: 'Berlin, Germany',
    departure_date: '2025-04-25',
    arrival_date: '2025-04-25',
    max_weight: 3,
    bio: 'Love to travel and meet new people.'
  },
  {
    id: 'trav-4',
    user_id: 'user-126',
    full_name: 'Ahmed Khan',
    avatar_url: 'https://randomuser.me/api/portraits/men/55.jpg',
    rating: 4.5,
    verified: true,
    departure_location: 'Dubai, UAE',
    destination: 'Dhaka, Bangladesh',
    departure_date: '2025-05-05',
    arrival_date: '2025-05-06',
    max_weight: 10,
    bio: 'Regular traveler between UAE and Bangladesh.'
  }
];

export const itemRequests = [
  {
    id: 'req-1',
    user_id: 'user-678',
    requester: {
      full_name: 'Emma Wilson',
      avatar_url: 'https://randomuser.me/api/portraits/women/23.jpg',
      rating: 4.9,
      verified: true
    },
    item_name: 'Japanese Snack Box',
    description: 'Looking for someone to bring a box of assorted Japanese snacks (Tokyo Treat subscription box)',
    source_location: 'Tokyo, Japan',
    destination_location: 'London, UK',
    deadline: '2025-06-01',
    estimated_weight: 2,
    estimated_value: 35,
    item_category: 'Food & Snacks',
    reward_amount: 15,
    status: 'open'
  },
  {
    id: 'req-2',
    user_id: 'user-789',
    requester: {
      full_name: 'James Lee',
      avatar_url: 'https://randomuser.me/api/portraits/men/34.jpg',
      rating: 4.7,
      verified: true
    },
    item_name: 'Art Supplies Set',
    description: 'Need someone to bring special watercolor paper and brushes from this art store in Paris',
    source_location: 'Paris, France',
    destination_location: 'New York, USA',
    deadline: '2025-05-30',
    estimated_weight: 1.5,
    estimated_value: 85,
    item_category: 'Art & Crafts',
    reward_amount: 25,
    status: 'open'
  },
  {
    id: 'req-3',
    user_id: 'user-890',
    requester: {
      full_name: 'Sarah Ahmed',
      avatar_url: 'https://randomuser.me/api/portraits/women/45.jpg',
      rating: 4.5,
      verified: false
    },
    item_name: 'Limited Edition Watch',
    description: 'Looking for someone to bring a limited edition watch from Dubai Mall',
    source_location: 'Dubai, UAE',
    destination_location: 'Mumbai, India',
    deadline: '2025-06-05',
    estimated_weight: 0.5,
    estimated_value: 300,
    item_category: 'Luxury Goods',
    reward_amount: 50,
    status: 'open'
  },
  {
    id: 'req-4',
    user_id: 'user-901',
    requester: {
      full_name: 'Thomas Brown',
      avatar_url: 'https://randomuser.me/api/portraits/men/56.jpg',
      rating: 4.8,
      verified: true
    },
    item_name: 'Korean Skincare Products',
    description: 'Need someone to bring specific Korean skincare products from Seoul',
    source_location: 'Seoul, South Korea',
    destination_location: 'Sydney, Australia',
    deadline: '2025-06-10',
    estimated_weight: 1,
    estimated_value: 120,
    item_category: 'Beauty & Cosmetics',
    reward_amount: 30,
    status: 'open'
  },
  {
    id: 'req-5',
    user_id: 'user-012',
    requester: {
      full_name: 'Olivia Martinez',
      avatar_url: 'https://randomuser.me/api/portraits/women/78.jpg',
      rating: 4.6,
      verified: true
    },
    item_name: 'British Tea Collection',
    description: 'Looking for someone to bring a premium tea collection from Fortnum & Mason',
    source_location: 'London, UK',
    destination_location: 'Toronto, Canada',
    deadline: '2025-06-15',
    estimated_weight: 1.5,
    estimated_value: 65,
    item_category: 'Food & Beverages',
    reward_amount: 20,
    status: 'open'
  },
  {
    id: 'req-1',
    user_id: 'user-127',
    item_name: 'Japanese Snack Box',
    description: 'Looking for someone to bring a box of assorted Japanese snacks',
    source_location: 'Tokyo, Japan',
    destination_location: 'London, UK',
    deadline: '2025-04-20',
    weight: 2,
    dimensions: '20x15x10 cm',
    status: 'open',
    requester: {
      full_name: 'Emma Wilson',
      avatar_url: 'https://randomuser.me/api/portraits/women/23.jpg',
      rating: 4.9
    }
  },
  {
    id: 'req-2',
    user_id: 'user-128',
    item_name: 'Limited Edition Vinyl Record',
    description: 'Hoping someone can bring a special edition vinyl that\'s only available in the US',
    source_location: 'New York, USA',
    destination_location: 'Berlin, Germany',
    deadline: '2025-05-15',
    weight: 0.5,
    dimensions: '30x30x5 cm',
    status: 'open',
    requester: {
      full_name: 'Lukas Müller',
      avatar_url: 'https://randomuser.me/api/portraits/men/67.jpg',
      rating: 4.7
    }
  },
  {
    id: 'req-3',
    user_id: 'user-129',
    item_name: 'Hand-crafted Ceramic Tea Set',
    description: 'Looking for someone to transport a delicate tea set from Barcelona',
    source_location: 'Barcelona, Spain',
    destination_location: 'Dubai, UAE',
    deadline: '2025-04-30',
    weight: 1.5,
    dimensions: '25x25x15 cm',
    status: 'open',
    requester: {
      full_name: 'Aisha Al-Farsi',
      avatar_url: 'https://randomuser.me/api/portraits/women/39.jpg',
      rating: 4.8
    }
  }
];

// Helper function to filter travelers based on search criteria
export const filterTravelers = (criteria) => {
  if (!criteria) return travelers;
  
  return travelers.filter(traveler => {
    // Match departure city if provided
    if (criteria.from && !traveler.departure_location.toLowerCase().includes(criteria.from.toLowerCase())) {
      return false;
    }
    
    // Match destination city if provided
    if (criteria.to && !traveler.destination.toLowerCase().includes(criteria.to.toLowerCase())) {
      return false;
    }
    
    // Match travel date if provided
    if (criteria.date) {
      const travelDate = new Date(traveler.departure_date);
      const criteriaDate = new Date(criteria.date);
      
      // Compare dates (ignore time portion)
      if (travelDate.toDateString() !== criteriaDate.toDateString()) {
        return false;
      }
    }
    
    // Match weight capacity if provided
    if (criteria.weight && traveler.max_weight < parseFloat(criteria.weight)) {
      return false;
    }
    
    return true;
  });
};

// Helper function to filter item requests based on search criteria
export const filterItemRequests = (criteria) => {
  if (!criteria) return itemRequests;
  
  return itemRequests.filter(request => {
    // Match source location if provided
    if (criteria.from && !request.source_location.toLowerCase().includes(criteria.from.toLowerCase())) {
      return false;
    }
    
    // Match destination location if provided
    if (criteria.to && !request.destination_location.toLowerCase().includes(criteria.to.toLowerCase())) {
      return false;
    }
    
    // Match deadline date if provided
    if (criteria.date) {
      const requestDate = new Date(request.deadline);
      const criteriaDate = new Date(criteria.date);
      
      // Request deadline should be on or after the criteria date
      if (requestDate < criteriaDate) {
        return false;
      }
    }
    
    // Match weight if provided
    if (criteria.weight && request.weight > parseFloat(criteria.weight)) {
      return false;
    }
    
    return true;
  });
};
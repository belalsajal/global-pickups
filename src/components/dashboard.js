import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Grid, Card, CardContent, 
  Button, Avatar, Chip, CircularProgress, Alert,
  Container
} from '@mui/material';
import { Flight, LocalShipping, Star, AdminPanelSettings, ArrowBack } from '@mui/icons-material';
import { supabase } from '../supabase';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import OnboardingTour from './shared/Onboarding/OnboardingTour';
import { dashboardTourSteps } from './shared/Onboarding';

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [travelPlans, setTravelPlans] = useState([]);
  const [itemRequests, setItemRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [searchType, setSearchType] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState(null);
  const [runTour, setRunTour] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        if (location.state?.searchResults && location.state?.searchType) {
          setSearchResults(location.state.searchResults);
          setSearchType(location.state.searchType);
          setLoading(false);
          return;
        }
        
        const storedSearchResults = localStorage.getItem('searchResults');
        if (storedSearchResults) {
          const parsedResults = JSON.parse(storedSearchResults);
          setSearchResults(parsedResults.results);
          setSearchType(parsedResults.type);
          setSearchCriteria(parsedResults.criteria);
          setLoading(false);
          return;
        }
        
        const adminUser = localStorage.getItem('adminUser');
        if (adminUser) {
          const parsedAdminUser = JSON.parse(adminUser);
          setUserProfile({
            id: parsedAdminUser.id,
            full_name: parsedAdminUser.name,
            avatar_url: null,
            bio: 'Admin account for testing and management',
            rating: 5.0,
            verified: true
          });
          setIsAdmin(true);
          setLoading(false);
          return;
        }
        
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error('No user logged in');
        }

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileError) throw profileError;
        
        const profile = profileData || {
          id: user.id,
          full_name: user.user_metadata?.full_name || 'New User',
          avatar_url: null,
          bio: 'No bio yet',
          rating: 0,
          verified: false
        };
        
        setUserProfile(profile);
        
        const { data: travelPlansData, error: travelPlansError } = await supabase
          .from('travel_plans')
          .select('*')
          .eq('user_id', user.id)
          .order('departure_date', { ascending: true });
        
        if (travelPlansError) throw travelPlansError;
        
        setTravelPlans(travelPlansData || []);
        
        const { data: itemRequestsData, error: itemRequestsError } = await supabase
          .from('item_requests')
          .select(`
            *,
            requester:profiles(full_name, avatar_url, rating)
          `)
          .eq('user_id', user.id)
          .order('deadline', { ascending: true });
        
        if (itemRequestsError) throw itemRequestsError;
        
        setItemRequests(itemRequestsData || []);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    const checkFirstVisit = () => {
      const hasSeenTour = localStorage.getItem('hasSeenDashboardTour');
      if (!hasSeenTour && !searchResults) {
        setTimeout(() => {
          setRunTour(true);
          localStorage.setItem('hasSeenDashboardTour', 'true');
        }, 1000);
      }
    };
    
    fetchDashboardData();
    checkFirstVisit();
  }, [location, searchResults]);

  const handleTourClose = () => {
    setRunTour(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    localStorage.removeItem('searchResults');
    supabase.auth.signOut();
    navigate('/');
  };

  const clearSearchResults = () => {
    setSearchResults(null);
    setSearchType(null);
    setSearchCriteria(null);
    localStorage.removeItem('searchResults');
    navigate('/dashboard', { replace: true });
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  const displayProfile = userProfile || {
    id: 'user-123',
    full_name: 'Belal Sajal',
    avatar_url: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.8,
    bio: 'Frequent traveler between Asia and Europe. Happy to help bring items to fellow travelers!',
    verified: true
  };
  
  const displayTravelPlans = travelPlans.length > 0 ? travelPlans : [
    {
      id: 'trip-1',
      departure_location: 'Tokyo, Japan',
      destination: 'London, UK',
      departure_date: '2025-04-15',
      arrival_date: '2025-04-16',
      max_weight: 5,
      max_dimensions: '30x20x10 cm'
    },
    {
      id: 'trip-2',
      departure_location: 'London, UK',
      destination: 'New York, USA',
      departure_date: '2025-05-10',
      arrival_date: '2025-05-10',
      max_weight: 3,
      max_dimensions: '25x15x8 cm'
    }
  ];
  
  const displayItemRequests = itemRequests.length > 0 ? itemRequests : [
    {
      id: 'req-1',
      item_name: 'Japanese Snack Box',
      source_location: 'Tokyo, Japan',
      destination_location: 'London, UK',
      deadline: '2025-04-20',
      status: 'open',
      requester: {
        full_name: 'Emma Wilson',
        avatar_url: 'https://randomuser.me/api/portraits/women/23.jpg',
        rating: 4.9
      }
    }
  ];

  if (searchResults) {
    const formatCriteriaText = () => {
      const parts = [];
      if (searchCriteria?.from) parts.push(`from "${searchCriteria.from}"`);
      if (searchCriteria?.to) parts.push(`to "${searchCriteria.to}"`);
      if (searchCriteria?.date) {
        const date = new Date(searchCriteria.date).toLocaleDateString();
        parts.push(`on/before ${date}`);
      }
      if (searchCriteria?.weight) parts.push(`with weight ${searchCriteria.weight}kg`);
      
      return parts.length > 0 
        ? parts.join(' ')
        : 'with your criteria';
    };

    return (
      <Box sx={{ p: 3 }}>
        <OnboardingTour 
          steps={dashboardTourSteps} 
          run={runTour} 
          onClose={handleTourClose}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Button 
            startIcon={<ArrowBack />} 
            variant="outlined" 
            onClick={clearSearchResults}
          >
            Back to Dashboard
          </Button>
          <Button variant="outlined" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          Showing search results {formatCriteriaText()}
        </Alert>
        
        <Typography variant="h5" gutterBottom>
          {searchType === 'travelers' 
            ? <><Flight sx={{ mr: 1, verticalAlign: 'middle' }} />Travelers Matching Your Search</>
            : <><LocalShipping sx={{ mr: 1, verticalAlign: 'middle' }} />Item Requests Matching Your Search</>
          }
        </Typography>
        
        {searchResults.length === 0 ? (
          <Alert severity="warning" sx={{ mt: 2 }}>
            No results found matching your search criteria. Try broadening your search.
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {/* ... existing search results display code ... */}
          </Grid>
        )}
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <OnboardingTour 
        steps={dashboardTourSteps} 
        run={runTour} 
        onClose={handleTourClose}
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" data-tour="welcome">
          Welcome, {displayProfile.full_name}!
        </Typography>
        <Button variant="outlined" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Card sx={{ mb: 4 }} data-tour="profile">
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar 
                src={displayProfile.avatar_url} 
                alt={displayProfile.full_name}
                sx={{ width: 80, height: 80 }}
              />
            </Grid>
            <Grid item xs>
              <Typography variant="h6">
                {displayProfile.full_name}
                {displayProfile.verified && (
                  <Chip 
                    size="small" 
                    label="Verified" 
                    color="primary" 
                    sx={{ ml: 1 }}
                  />
                )}
                {isAdmin && (
                  <Chip 
                    size="small" 
                    label="Admin" 
                    color="secondary" 
                    icon={<AdminPanelSettings fontSize="small" />}
                    sx={{ ml: 1 }}
                  />
                )}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Star sx={{ color: 'gold', mr: 0.5 }} />
                <Typography variant="body2">
                  {displayProfile.rating} / 5.0 rating
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {displayProfile.bio}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      <Box sx={{ mb: 4 }} data-tour="search">
        <Typography variant="h5" gutterBottom>Find Travelers or Requests</Typography>
        <SearchBar />
      </Box>
      
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={() => setRunTour(true)}
        >
          Take a Quick Tour
        </Button>
      </Box>
      
      <Box sx={{ mb: 4 }} data-tour="travel-plans">
        <Typography variant="h5" gutterBottom>
          <Flight sx={{ mr: 1, verticalAlign: 'middle' }} />
          Your Travel Plans
        </Typography>
        
        <Grid container spacing={3}>
          {/* ... existing travel plans display code ... */}
        </Grid>
      </Box>
      
      <Box sx={{ mb: 4 }} data-tour="item-requests">
        <Typography variant="h5" gutterBottom>
          <LocalShipping sx={{ mr: 1, verticalAlign: 'middle' }} />
          Your Item Requests
        </Typography>
        
        <Grid container spacing={3}>
          {/* ... existing item requests display code ... */}
        </Grid>
      </Box>

      {isAdmin && (
        <Box sx={{ mt: 4 }} data-tour="admin-panel">
          {/* ... existing admin panel code ... */}
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;
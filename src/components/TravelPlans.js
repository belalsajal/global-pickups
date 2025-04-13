import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Grid, CardContent, 
  Button, Avatar, Chip, CircularProgress, TextField,
  InputAdornment, FormControl, InputLabel, Select, MenuItem,
  Paper, Stack, Divider, Dialog, DialogTitle, DialogContent,
  DialogActions, IconButton, Tooltip, Snackbar, Alert
} from '@mui/material';
import { 
  Flight, Search, FilterList, CalendarMonth, 
  Place, Person, Luggage, AttachMoney, Star, BookmarkBorder,
  Bookmark, Close, Delete, Favorite, FavoriteBorder,
  Security, VerifiedUser, LocalShipping, HelpOutline as HelpOutlineIcon
} from '@mui/icons-material';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {
  TravelPlansContainer,
  TravelPlansHeader,
  StyledPaper,
  PopularRouteCard,
  SavedRouteCard,
  TravelPlanCard,
  TravelPlanCardHeader,
  TravelPlanCardContent,
  TravelPlanCardFooter,
  RouteText,
  SearchButton,
  GridItemWrapper,
  TravelPlanFormContainer,
  colors
} from './styled/TravelPlansStyled';
import OnboardingTour, { travelPlanTourSteps } from './shared/Onboarding';

const ResponsiveGridLayout = WidthProvider(Responsive);

const TravelPlans = () => {
  const [travelPlans, setTravelPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    source: '',
    destination: '',
    departureDate: '',
  });
  const [savedRoutes, setSavedRoutes] = useState([]);
  const [user, setUser] = useState(null);
  const [saveRouteDialog, setSaveRouteDialog] = useState(false);
  const [routeName, setRouteName] = useState('');
  const [routeNote, setRouteNote] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [popularRoutes, setPopularRoutes] = useState([]);
  const [runTour, setRunTour] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTravelPlans();
    fetchPopularRoutes();
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        fetchSavedRoutes(user.id);
      }
    };
    getUser();
  }, []);

  const fetchTravelPlans = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('travel_plans')
        .select(`
          *,
          traveler:profiles(id, full_name, avatar_url, rating)
        `)
        .eq('status', 'active')
        .order('departure_date', { ascending: true });
      
      if (error) throw error;
      
      setTravelPlans(data || []);
    } catch (error) {
      console.error('Error fetching travel plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedRoutes = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('saved_routes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setSavedRoutes(data || []);
    } catch (error) {
      console.error('Error fetching saved routes:', error);
    }
  };
  
  const fetchPopularRoutes = async () => {
    try {
      const { data, error } = await supabase
        .from('travel_plans')
        .select('source_location, destination_location, count')
        .eq('status', 'active')
        .order('count', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      
      setPopularRoutes(data || []);
    } catch (error) {
      console.error('Error fetching popular routes:', error);
      setPopularRoutes([
        { source_location: 'New York', destination_location: 'London', count: 24 },
        { source_location: 'San Francisco', destination_location: 'Tokyo', count: 19 },
        { source_location: 'Paris', destination_location: 'Dubai', count: 15 },
        { source_location: 'Singapore', destination_location: 'Sydney', count: 12 },
        { source_location: 'Berlin', destination_location: 'Amsterdam', count: 10 }
      ]);
    }
  };

  const openSaveRouteDialog = () => {
    setRouteName(`${filters.source} to ${filters.destination}`);
    setRouteNote('');
    setSaveRouteDialog(true);
  };

  const handleSaveRoute = async () => {
    if (!user) {
      setSnackbar({
        open: true,
        message: 'Please log in to save routes',
        severity: 'warning'
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('saved_routes')
        .insert([
          { 
            user_id: user.id, 
            source_location: filters.source, 
            destination_location: filters.destination,
            name: routeName,
            notes: routeNote,
            created_at: new Date()
          }
        ]);
      
      if (error) throw error;
      
      fetchSavedRoutes(user.id);
      setSaveRouteDialog(false);
      
      setSnackbar({
        open: true,
        message: 'Route saved successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error saving route:', error);
      setSnackbar({
        open: true,
        message: 'Error saving route. Please try again.',
        severity: 'error'
      });
    }
  };

  const deleteSavedRoute = async (routeId) => {
    try {
      const { error } = await supabase
        .from('saved_routes')
        .delete()
        .eq('id', routeId);
      
      if (error) throw error;
      
      fetchSavedRoutes(user.id);
      
      setSnackbar({
        open: true,
        message: 'Route deleted successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error deleting saved route:', error);
      setSnackbar({
        open: true,
        message: 'Error deleting route',
        severity: 'error'
      });
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const applyFilters = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('travel_plans')
        .select(`
          *,
          traveler:profiles(id, full_name, avatar_url, rating)
        `)
        .eq('status', 'active');
      
      if (filters.source) {
        query = query.ilike('source_location', `%${filters.source}%`);
      }
      
      if (filters.destination) {
        query = query.ilike('destination_location', `%${filters.destination}%`);
      }
      
      if (filters.departureDate) {
        query = query.gte('departure_date', filters.departureDate);
      }
      
      const { data, error } = await query.order('departure_date', { ascending: true });
      
      if (error) throw error;
      
      setTravelPlans(data || []);
    } catch (error) {
      console.error('Error applying filters:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setFilters({
      source: '',
      destination: '',
      departureDate: '',
    });
    fetchTravelPlans();
  };

  const applyPopularRoute = (source, destination) => {
    setFilters({
      ...filters,
      source,
      destination
    });
    setTimeout(() => applyFilters(), 100);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  const layouts = {
    lg: [
      { i: 'filters', x: 0, y: 0, w: 12, h: 2, static: true },
      { i: 'popularRoutes', x: 0, y: 2, w: 6, h: 2 },
      { i: 'savedRoutes', x: 6, y: 2, w: 6, h: 2 },
      { i: 'travelPlans', x: 0, y: 4, w: 12, h: 6 }
    ],
    md: [
      { i: 'filters', x: 0, y: 0, w: 10, h: 2, static: true },
      { i: 'popularRoutes', x: 0, y: 2, w: 5, h: 2 },
      { i: 'savedRoutes', x: 5, y: 2, w: 5, h: 2 },
      { i: 'travelPlans', x: 0, y: 4, w: 10, h: 6 }
    ],
    sm: [
      { i: 'filters', x: 0, y: 0, w: 6, h: 3, static: true },
      { i: 'popularRoutes', x: 0, y: 3, w: 6, h: 2 },
      { i: 'savedRoutes', x: 0, y: 5, w: 6, h: 2 },
      { i: 'travelPlans', x: 0, y: 7, w: 6, h: 8 }
    ],
    xs: [
      { i: 'filters', x: 0, y: 0, w: 4, h: 4, static: true },
      { i: 'popularRoutes', x: 0, y: 4, w: 4, h: 3 },
      { i: 'savedRoutes', x: 0, y: 7, w: 4, h: 3 },
      { i: 'travelPlans', x: 0, y: 10, w: 4, h: 10 }
    ]
  };

  const renderFilters = () => (
    <GridItemWrapper>
      <StyledPaper className="filter-section" elevation={0}>
        <TravelPlansHeader>
          <FilterList />
          <Typography variant="h6">Filter Travel Plans</Typography>
        </TravelPlansHeader>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="From"
              name="source"
              value={filters.source}
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Place fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="To"
              name="destination"
              value={filters.destination}
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Place fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="date"
              label="Departure Date"
              name="departureDate"
              value={filters.departureDate}
              onChange={handleFilterChange}
              InputLabelProps={{ 
                shrink: true 
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonth fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={resetFilters}
          >
            Reset
          </Button>
          <Box>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={openSaveRouteDialog}
              sx={{ mr: 1 }}
              disabled={!filters.source || !filters.destination}
            >
              Save Route
            </Button>
            <SearchButton 
              variant="contained" 
              startIcon={<Search />} 
              onClick={applyFilters}
            >
              Search
            </SearchButton>
          </Box>
        </Box>
      </StyledPaper>
    </GridItemWrapper>
  );

  const renderPopularRoutes = () => (
    <GridItemWrapper>
      <StyledPaper className="popular-routes" elevation={0}>
        <TravelPlansHeader>
          <Star />
          <Typography variant="h6">Popular Routes</Typography>
        </TravelPlansHeader>
        
        <Grid container spacing={2}>
          {popularRoutes.map((route, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <PopularRouteCard
                onClick={() => applyPopularRoute(route.source_location, route.destination_location)}
              >
                <CardContent>
                  <RouteText variant="subtitle1">
                    {route.source_location} → {route.destination_location}
                  </RouteText>
                  <Box display="flex" alignItems="center">
                    <LocalShipping fontSize="small" color="action" />
                    <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                      {route.count} deliveries this month
                    </Typography>
                  </Box>
                </CardContent>
              </PopularRouteCard>
            </Grid>
          ))}
        </Grid>
      </StyledPaper>
    </GridItemWrapper>
  );

  const renderSavedRoutes = () => (
    <GridItemWrapper>
      <StyledPaper className="saved-routes" elevation={0}>
        <TravelPlansHeader>
          <Bookmark />
          <Typography variant="h6">Saved Routes</Typography>
        </TravelPlansHeader>
        
        {!user ? (
          <Typography variant="body1" color="textSecondary" align="center">
            Please log in to view saved routes
          </Typography>
        ) : savedRoutes.length === 0 ? (
          <Typography variant="body1" color="textSecondary" align="center">
            You don't have any saved routes yet
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {savedRoutes.slice(0, 4).map((route) => (
              <Grid item xs={12} sm={6} key={route.id}>
                <SavedRouteCard>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                      <RouteText variant="subtitle1">
                        {route.name}
                      </RouteText>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => deleteSavedRoute(route.id)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                    
                    <Typography variant="body2">
                      From: {route.source_location}
                    </Typography>
                    <Typography variant="body2">
                      To: {route.destination_location}
                    </Typography>
                    
                    {route.notes && (
                      <Typography variant="body2" color="textSecondary" mt={1}>
                        {route.notes}
                      </Typography>
                    )}
                    
                    <Button 
                      size="small" 
                      color="primary" 
                      sx={{ mt: 1 }}
                      onClick={() => applyPopularRoute(route.source_location, route.destination_location)}
                    >
                      Apply Filter
                    </Button>
                  </CardContent>
                </SavedRouteCard>
              </Grid>
            ))}
          </Grid>
        )}
      </StyledPaper>
    </GridItemWrapper>
  );

  const renderTravelPlans = () => (
    <GridItemWrapper>
      <TravelPlansHeader>
        <Flight />
        <Typography variant="h6">Available Travel Plans</Typography>
      </TravelPlansHeader>
      
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <CircularProgress color="primary" />
        </Box>
      ) : travelPlans.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No travel plans found
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Try adjusting your filters or check back later
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {travelPlans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan.id}>
              <TravelPlanCard>
                <CardContent>
                  <TravelPlanCardHeader>
                    <Box>
                      <RouteText variant="h6">
                        {plan.source_location} → {plan.destination_location}
                      </RouteText>
                      <Typography variant="body2" color="textSecondary">
                        <CalendarMonth fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                        {format(new Date(plan.departure_date), 'MMM dd, yyyy')}
                        {plan.arrival_date && ` - ${format(new Date(plan.arrival_date), 'MMM dd, yyyy')}`}
                      </Typography>
                    </Box>
                    <Avatar
                      src={plan.traveler?.avatar_url}
                      alt={plan.traveler?.full_name || 'Traveler'}
                    />
                  </TravelPlanCardHeader>
                  
                  <TravelPlanCardContent>
                    <Typography variant="body2" fontWeight="medium">
                      Traveler: {plan.traveler?.full_name || 'Anonymous'}
                      {plan.traveler?.rating && (
                        <Chip 
                          icon={<Star fontSize="small" sx={{ color: colors.accent }} />}
                          label={plan.traveler.rating.toFixed(1)}
                          size="small"
                          sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
                        />
                      )}
                    </Typography>
                    
                    <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
                      <Chip 
                        icon={<Luggage fontSize="small" />}
                        label={`${plan.available_space || 0} items available`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Chip 
                        icon={<AttachMoney fontSize="small" />}
                        label={`${plan.max_weight || 5} kg max`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      {plan.is_verified && (
                        <Chip 
                          icon={<VerifiedUser fontSize="small" />}
                          label="Verified"
                          size="small"
                          color="success"
                        />
                      )}
                    </Box>
                  </TravelPlanCardContent>
                  
                  <TravelPlanCardFooter>
                    <Button
                      size="small"
                      startIcon={<Favorite />}
                      color="primary"
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => navigate(`/travel-plan/${plan.id}`)}
                    >
                      View Details
                    </Button>
                  </TravelPlanCardFooter>
                </CardContent>
              </TravelPlanCard>
            </Grid>
          ))}
        </Grid>
      )}
    </GridItemWrapper>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <TravelPlansContainer>
        <Typography variant="h4" gutterBottom fontWeight="600">
          Travel Plans
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Find travelers heading to your destination who can deliver your items
        </Typography>
        
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4 }}
          rowHeight={120}
          margin={[16, 16]}
          containerPadding={[0, 0]}
          isDraggable={false}
        >
          <div key="filters">
            {renderFilters()}
          </div>
          <div key="popularRoutes">
            {renderPopularRoutes()}
          </div>
          <div key="savedRoutes">
            {renderSavedRoutes()}
          </div>
          <div key="travelPlans">
            {renderTravelPlans()}
          </div>
        </ResponsiveGridLayout>
      </TravelPlansContainer>
      
      <Dialog open={saveRouteDialog} onClose={() => setSaveRouteDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Save Route
          <IconButton
            aria-label="close"
            onClick={() => setSaveRouteDialog(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Route Name"
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Notes (optional)"
            value={routeNote}
            onChange={(e) => setRouteNote(e.target.value)}
            margin="normal"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveRouteDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSaveRoute}
            disabled={!routeName}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Box sx={{ p: 3 }}>
        <OnboardingTour steps={travelPlanTourSteps} run={runTour} onClose={() => setRunTour(false)} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h2" data-tour="travel-plans-title">
            My Travel Plans
          </Typography>
          <Button 
            variant="outlined" 
            size="small" 
            startIcon={<HelpOutlineIcon />} 
            onClick={() => setRunTour(true)}
          >
            Help
          </Button>
        </Box>
        
        <TravelPlanFormContainer data-tour="add-travel-plan">
          {/* Add Travel Plan Form */}
        </TravelPlanFormContainer>
        
        <Box sx={{ mt: 4 }} data-tour="travel-plans-list">
          <Typography variant="h6" gutterBottom>
            Your Travel Plans
          </Typography>
          {/* Travel Plans List */}
        </Box>
      </Box>
    </Container>
  );
};

export default TravelPlans;
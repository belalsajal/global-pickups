import React, { useState } from 'react';
import { 
  Box, Container, Typography, TextField, Button, 
  Grid, Paper, Tabs, Tab, Alert, CircularProgress, InputAdornment,
  useTheme, alpha, Card, CardContent, Divider, Tooltip
} from '@mui/material';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import { 
  LocalShipping, FlightTakeoff, Place, CalendarToday, 
  AttachMoney, Add, Info, Description, Scale
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Custom styled Tab component
const StyledTab = styled(Tab)(({ theme }) => ({
  minWidth: 200,
  height: 40,
  borderRadius: 20,
  textTransform: 'uppercase',
  fontFamily: "'Poppins', 'Montserrat', sans-serif",
  fontWeight: 500,
  fontSize: 14,
  transition: 'all 0.3s ease',
  '&.Mui-selected': {
    backgroundColor: '#4A90E2',
    color: '#FFFFFF',
  },
  '&:not(.Mui-selected)': {
    backgroundColor: '#F5F7FA',
    color: '#A9A9A9',
    '&:hover': {
      backgroundColor: '#A3CFFA',
      color: '#4A90E2',
    },
  },
}));

// Custom styled Card component
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  borderRadius: 10,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
}));

// Custom styled TextField component
const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    transition: 'all 0.3s ease',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.light,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#4A90E2',
      borderWidth: 2,
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '12px 14px',
  },
  '& .MuiInputLabel-root': {
    fontFamily: "'Poppins', 'Montserrat', sans-serif",
  },
}));

// Custom styled Button component
const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FF6F61',
  color: '#FFFFFF',
  borderRadius: 8,
  padding: '8px 24px',
  width: 200,
  height: 40,
  fontFamily: "'Poppins', 'Montserrat', sans-serif",
  fontWeight: 500,
  fontSize: 14,
  textTransform: 'uppercase',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#E65A50',
    boxShadow: '0 4px 8px rgba(230, 90, 80, 0.3)',
  },
}));

const TravelersAndRequests = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(1); // Default to "REQUEST ITEM" tab (index 1)
  const navigate = useNavigate();
  
  // Travel Plan form state
  const [travelFormData, setTravelFormData] = useState({
    departure_location: '',
    destination: '',
    departure_date: '',
    arrival_date: '',
    max_weight: '',
    transportation_type: 'flight',
    notes: '',
  });
  
  // Request Item form state
  const [requestFormData, setRequestFormData] = useState({
    item_name: '',
    item_description: '',
    from_city: '',
    to_city: '',
    need_by_date: '',
    estimated_value: '',
    approximate_weight: '1',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError(null);
    setSuccess(false);
  };

  // Handle travel plan form changes
  const handleTravelFormChange = (e) => {
    const { name, value } = e.target;
    setTravelFormData({
      ...travelFormData,
      [name]: value
    });
  };
  
  // Handle request item form changes
  const handleRequestFormChange = (e) => {
    const { name, value } = e.target;
    setRequestFormData({
      ...requestFormData,
      [name]: value
    });
  };

  // Submit travel plan
  const handleTravelPlanSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    // Form validation
    if (!travelFormData.departure_location || !travelFormData.destination || 
        !travelFormData.departure_date || !travelFormData.arrival_date ||
        !travelFormData.max_weight) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }
    
    // Validate dates
    const departureDate = new Date(travelFormData.departure_date);
    const arrivalDate = new Date(travelFormData.arrival_date);
    const today = new Date();
    
    if (departureDate > arrivalDate) {
      setError('Departure date cannot be after arrival date');
      setLoading(false);
      return;
    }
    
    if (departureDate < today) {
      setError('Departure date must be in the future');
      setLoading(false);
      return;
    }

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to add a travel plan');
      }
      
      // Insert travel plan
      const { error: insertError } = await supabase
        .from('travel_plans')
        .insert([
          {
            user_id: user.id,
            departure_location: travelFormData.departure_location,
            destination: travelFormData.destination,
            departure_date: travelFormData.departure_date,
            arrival_date: travelFormData.arrival_date,
            max_weight: parseFloat(travelFormData.max_weight),
            notes: travelFormData.notes,
            transportation_type: travelFormData.transportation_type,
            status: 'active'
          }
        ]);
      
      if (insertError) throw insertError;
      
      setSuccess(true);
      
      // Reset form
      setTravelFormData({
        departure_location: '',
        destination: '',
        departure_date: '',
        arrival_date: '',
        max_weight: '',
        transportation_type: 'flight',
        notes: '',
      });
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Submit item request
  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    // Form validation
    if (!requestFormData.item_name || !requestFormData.from_city || 
        !requestFormData.to_city || !requestFormData.approximate_weight ||
        !requestFormData.estimated_value) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }
    
    // Validate need by date if provided
    if (requestFormData.need_by_date) {
      const needByDate = new Date(requestFormData.need_by_date);
      const today = new Date();
      
      if (needByDate < today) {
        setError('Need by date must be in the future');
        setLoading(false);
        return;
      }
    }

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to request an item');
      }
      
      // Insert item request
      const { error: insertError } = await supabase
        .from('item_requests')
        .insert([
          {
            user_id: user.id,
            item_name: requestFormData.item_name,
            item_description: requestFormData.item_description,
            source_location: requestFormData.from_city,
            destination_location: requestFormData.to_city,
            deadline: requestFormData.need_by_date || null,
            estimated_weight: parseFloat(requestFormData.approximate_weight),
            estimated_value: parseFloat(requestFormData.estimated_value) || null,
            status: 'open',
            created_at: new Date().toISOString()
          }
        ]);
      
      if (insertError) throw insertError;
      
      setSuccess(true);
      
      // Reset form
      setRequestFormData({
        item_name: '',
        item_description: '',
        from_city: '',
        to_city: '',
        need_by_date: '',
        estimated_value: '',
        approximate_weight: '1',
      });
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 5, animation: 'fadeIn 0.6s ease-in-out', '@keyframes fadeIn': {
      '0%': { opacity: 0, transform: 'translateY(20px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' }
    }}}>
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          mb: 4, 
          fontWeight: 600, 
          textAlign: 'center',
          color: theme.palette.primary.main,
          fontFamily: "'Poppins', 'Montserrat', sans-serif",
        }}
      >
        {tabValue === 0 ? 'Post Your Travel Plans' : 'Request an Item from Anywhere in the World'}
      </Typography>
      
      {/* Tab Navigation */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        mb: 4,
        '@media (max-width:768px)': {
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
            my: 1
          }
        }
      }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="travel tabs"
          TabIndicatorProps={{ style: { display: 'none' } }}
          sx={{ 
            mb: 3,
            '& .MuiTabs-flexContainer': {
              gap: '10px',
              '@media (max-width:768px)': {
                flexDirection: 'column',
                gap: '10px'
              }
            }
          }}
        >
          <StyledTab 
            icon={<FlightTakeoff sx={{ mr: 1 }} />} 
            iconPosition="start"
            label="Post Travel Plan" 
            id="travel-tab-0"
            aria-controls="travel-tabpanel-0"
          />
          <StyledTab 
            icon={<LocalShipping sx={{ mr: 1 }} />} 
            iconPosition="start"
            label="Request Item" 
            id="travel-tab-1" 
            aria-controls="travel-tabpanel-1"
          />
        </Tabs>
      </Box>
      
      <StyledCard>
        <CardContent sx={{ p: 4 }}>
          {/* Subtitle text based on selected tab */}
          <Typography 
            variant="body1" 
            color="text.secondary" 
            align="center" 
            sx={{ 
              mb: 4, 
              fontFamily: "'Poppins', 'Montserrat', sans-serif",
              fontSize: 14
            }}
          >
            {tabValue === 0 
              ? 'Share your travel details so others can request item transportation' 
              : 'Tell us what you need, where it\'s from, and where you want it delivered. We\'ll connect you with travelers who can help.'}
          </Typography>
          
          {/* Error and Success messages */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: '8px',
                animation: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
                '@keyframes shake': {
                  '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
                  '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
                  '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
                  '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
                }
              }}
            >
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert 
              severity="success" 
              sx={{ 
                mb: 3,
                borderRadius: '8px',
                backgroundColor: '#34C759',
                color: 'white',
                fontFamily: "'Poppins', 'Montserrat', sans-serif",
                fontSize: 14,
                animation: 'pulseGlow 2s infinite ease-in-out',
                '@keyframes pulseGlow': {
                  '0%': { boxShadow: '0 0 0 0 rgba(52, 199, 89, 0.4)' },
                  '70%': { boxShadow: '0 0 0 10px rgba(52, 199, 89, 0)' },
                  '100%': { boxShadow: '0 0 0 0 rgba(52, 199, 89, 0)' }
                }
              }}
            >
              {tabValue === 0 
                ? 'Your travel plan has been added successfully!' 
                : 'Request Submitted Successfully!'}
            </Alert>
          )}
          
          {/* Travel Plan Form Tab Panel */}
          <Box
            role="tabpanel"
            hidden={tabValue !== 0}
            id="travel-tabpanel-0"
            aria-labelledby="travel-tab-0"
          >
            {tabValue === 0 && (
              <Box component="form" onSubmit={handleTravelPlanSubmit}>
                <Grid container spacing={3} grid={true}>
                  <Grid item xs={12} md={6} grid={true}>
                    <StyledTextField
                      fullWidth
                      required
                      label="Departure Location"
                      name="departure_location"
                      value={travelFormData.departure_location}
                      onChange={handleTravelFormChange}
                      placeholder="City, Country"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Place sx={{ color: '#4A90E2' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6} grid={true}>
                    <StyledTextField
                      fullWidth
                      required
                      label="Destination"
                      name="destination"
                      value={travelFormData.destination}
                      onChange={handleTravelFormChange}
                      placeholder="City, Country"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Place sx={{ color: '#4A90E2' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6} grid={true}>
                    <StyledTextField
                      fullWidth
                      required
                      label="Departure Date"
                      name="departure_date"
                      type="date"
                      value={travelFormData.departure_date}
                      onChange={handleTravelFormChange}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: new Date().toISOString().split('T')[0] }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarToday sx={{ color: '#4A90E2' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6} grid={true}>
                    <StyledTextField
                      fullWidth
                      required
                      label="Arrival Date"
                      name="arrival_date"
                      type="date"
                      value={travelFormData.arrival_date}
                      onChange={handleTravelFormChange}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ 
                        min: travelFormData.departure_date || new Date().toISOString().split('T')[0]
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarToday sx={{ color: '#4A90E2' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6} grid={true}>
                    <StyledTextField
                      fullWidth
                      required
                      select
                      SelectProps={{ native: true }}
                      label="Transportation Type"
                      name="transportation_type"
                      value={travelFormData.transportation_type}
                      onChange={handleTravelFormChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FlightTakeoff sx={{ color: '#4A90E2' }} />
                          </InputAdornment>
                        ),
                      }}
                    >
                      <option value="flight">Flight</option>
                      <option value="train">Train</option>
                      <option value="bus">Bus</option>
                      <option value="car">Car</option>
                      <option value="ship">Ship</option>
                      <option value="other">Other</option>
                    </StyledTextField>
                  </Grid>
                  
                  <Grid item xs={12} md={6} grid={true}>
                    <StyledTextField
                      fullWidth
                      required
                      label="Maximum Weight Capacity"
                      name="max_weight"
                      type="number"
                      value={travelFormData.max_weight}
                      onChange={handleTravelFormChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Scale sx={{ color: '#4A90E2' }} />
                          </InputAdornment>
                        ),
                        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} grid={true}>
                    <StyledTextField
                      fullWidth
                      label="Additional Notes"
                      name="notes"
                      value={travelFormData.notes}
                      onChange={handleTravelFormChange}
                      multiline
                      rows={3}
                      placeholder="Any special instructions or limitations..."
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                            <Description sx={{ color: '#4A90E2' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} grid={true}>
                    <SubmitButton 
                      type="submit" 
                      variant="contained"
                      disabled={loading}
                      startIcon={<FlightTakeoff />}
                    >
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'SUBMIT TRAVEL PLAN'}
                    </SubmitButton>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
          
          {/* Request Item Form Tab Panel */}
          <Box
            role="tabpanel"
            hidden={tabValue !== 1}
            id="travel-tabpanel-1"
            aria-labelledby="travel-tab-1"
          >
            {tabValue === 1 && (
              <Box component="form" onSubmit={handleRequestSubmit}>
                <Grid container spacing={3} grid={true}>
                  <Grid item xs={12} md={6} grid={true}>
                    <StyledTextField
                      fullWidth
                      required
                      label="Item Name"
                      name="item_name"
                      value={requestFormData.item_name}
                      onChange={handleRequestFormChange}
                      placeholder="What do you need?"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Info sx={{ color: '#4A90E2' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6} grid={true}>
                    <StyledTextField
                      fullWidth
                      required
                      label="Estimated Value ($)"
                      name="estimated_value"
                      type="number"
                      value={requestFormData.estimated_value}
                      onChange={handleRequestFormChange}
                      placeholder="Approximate value in USD"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoney sx={{ color: '#4A90E2' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} grid={true}>
                    <StyledTextField
                      fullWidth
                      required
                      label="Item Description"
                      name="item_description"
                      value={requestFormData.item_description}
                      onChange={handleRequestFormChange}
                      multiline
                      rows={3}
                      placeholder="Describe the item in detail (size, brand, where to buy, etc.)"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                            <Description sx={{ color: '#4A90E2' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6} grid={true}>
                    <StyledTextField
                      fullWidth
                      required
                      label="From City"
                      name="from_city"
                      value={requestFormData.from_city}
                      onChange={handleRequestFormChange}
                      placeholder="Where is the item located?"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Place sx={{ color: '#4A90E2' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6} grid={true}>
                    <StyledTextField
                      fullWidth
                      required
                      label="To City (delivery)"
                      name="to_city"
                      value={requestFormData.to_city}
                      onChange={handleRequestFormChange}
                      placeholder="Where do you want it delivered?"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Place sx={{ color: '#4A90E2' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6} grid={true}>
                    <StyledTextField
                      fullWidth
                      label="Need By Date"
                      name="need_by_date"
                      type="date"
                      value={requestFormData.need_by_date}
                      onChange={handleRequestFormChange}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: new Date().toISOString().split('T')[0] }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarToday sx={{ color: '#4A90E2' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6} grid={true}>
                    <StyledTextField
                      fullWidth
                      required
                      label="Approximate Weight (kg)"
                      name="approximate_weight"
                      type="number"
                      value={requestFormData.approximate_weight}
                      onChange={handleRequestFormChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Scale sx={{ color: '#4A90E2' }} />
                          </InputAdornment>
                        ),
                        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                      }}
                      inputProps={{ step: "0.1", min: "0.1" }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} grid={true}>
                    <SubmitButton 
                      type="submit" 
                      variant="contained"
                      disabled={loading}
                      startIcon={<Add />}
                      sx={{
                        backgroundColor: '#FF6F61',
                        '&:hover': {
                          backgroundColor: '#E65A50',
                        }
                      }}
                    >
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'SUBMIT REQUEST'}
                    </SubmitButton>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </CardContent>
      </StyledCard>
    </Container>
  );
};

export default TravelersAndRequests;
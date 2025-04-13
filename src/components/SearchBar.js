import React, { useState, useEffect, useCallback, memo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Paper, 
  Button, 
  useTheme, 
  useMediaQuery,
  Typography,
  Autocomplete,
  TextField,
  InputAdornment,
  Divider,
  Avatar,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  Search as SearchIcon, 
  FlightTakeoff as FlightTakeoffIcon, 
  FlightLand as FlightLandIcon,
  DateRange as DateRangeIcon, 
  Scale as ScaleIcon,
  SwapHoriz as SwapHorizIcon,
  Close as CloseIcon,
  LocalShipping as LocalShippingIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { filterTravelers, filterItemRequests } from '../utils/dummyData';

// Popular cities for autocomplete suggestions
const popularCities = [
  "London", "New York", "Tokyo", "Paris", "Sydney", "Dubai",
  "Singapore", "Toronto", "Berlin", "Barcelona", "Mumbai", "Shanghai",
  "Los Angeles", "Chicago", "Amsterdam", "Rome", "Istanbul", "Bangkok",
  "Hong Kong", "Seoul", "Dhaka", "Cairo", "Jakarta", "Rio de Janeiro"
];

// Define memoized components outside the main component to prevent unnecessary re-renders
const MotionPaper = motion(Paper);
const MotionBox = motion(Box);

// Memoized Autocomplete for departure city
const DepartureAutocomplete = memo(({ value, onChange, inputValue, onInputChange, colors }) => (
  <Autocomplete
    freeSolo
    id="departure-city"
    options={popularCities}
    value={value}
    onChange={onChange}
    inputValue={inputValue}
    onInputChange={onInputChange}
    renderInput={(params) => (
      <TextField 
        {...params} 
        placeholder="E.g., London"
        variant="outlined"
        fullWidth
        size="small"
        InputProps={{
          ...params.InputProps,
          startAdornment: (
            <InputAdornment position="start">
              <FlightTakeoffIcon sx={{ color: colors.main, fontSize: 18 }} />
            </InputAdornment>
          )
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 1.5,
            height: '40px',
            bgcolor: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              bgcolor: 'white',
            },
            '&.Mui-focused': {
              bgcolor: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.main,
                borderWidth: 1.5
              }
            }
          },
          '& .MuiInputBase-input': { 
            fontSize: '0.85rem',
            padding: '0 14px'
          }
        }}
      />
    )}
  />
));

// Memoized Autocomplete for destination city
const DestinationAutocomplete = memo(({ value, onChange, inputValue, onInputChange, colors }) => (
  <Autocomplete
    freeSolo
    id="destination-city"
    options={popularCities}
    value={value}
    onChange={onChange}
    inputValue={inputValue}
    onInputChange={onInputChange}
    renderInput={(params) => (
      <TextField 
        {...params} 
        placeholder="E.g., New York"
        variant="outlined"
        fullWidth
        size="small"
        InputProps={{
          ...params.InputProps,
          startAdornment: (
            <InputAdornment position="start">
              <FlightLandIcon sx={{ color: colors.main, fontSize: 18 }} />
            </InputAdornment>
          )
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 1.5,
            height: '40px',
            bgcolor: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              bgcolor: 'white',
            },
            '&.Mui-focused': {
              bgcolor: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.main,
                borderWidth: 1.5
              }
            }
          },
          '& .MuiInputBase-input': { 
            fontSize: '0.85rem',
            padding: '0 14px'
          }
        }}
      />
    )}
  />
));

const SearchBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [departureCity, setDepartureCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [departureCityInput, setDepartureCityInput] = useState('');
  const [destinationCityInput, setDestinationCityInput] = useState('');
  const [searchMode, setSearchMode] = useState('travelers'); // 'travelers' or 'requests'
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Colors for the search bar
  const colors = {
    main: '#4681f4', // Primary blue
    secondary: '#6d8ec5', // Lake Blue (secondary accent)
    shadow: 'rgba(70, 129, 244, 0.3)'
  };

  // Handle loaded state for performance optimization
  useEffect(() => {
    // Small delay to ensure proper mounting
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Prepare search criteria
    const searchCriteria = {
      from: departureCity,
      to: destinationCity,
      date: date || null,
      weight: weight || null
    };
    
    // Perform search based on mode
    if (searchMode === 'travelers') {
      const results = filterTravelers(searchCriteria);
      console.log('Traveler search results:', results);
      
      // Store results in localStorage for the dashboard to use
      localStorage.setItem('searchResults', JSON.stringify({
        type: 'travelers',
        criteria: searchCriteria,
        results,
        timestamp: new Date().toISOString()
      }));
      
      // Show a message about the results
      setSnackbarMessage(`Found ${results.length} travelers matching your criteria`);
      setSnackbarOpen(true);
      
      // Navigate to dashboard with search results
      navigate('/dashboard', { state: { searchResults: results, searchType: 'travelers' } });
    } else {
      const results = filterItemRequests(searchCriteria);
      console.log('Item request search results:', results);
      
      // Store results in localStorage for the dashboard to use
      localStorage.setItem('searchResults', JSON.stringify({
        type: 'requests',
        criteria: searchCriteria,
        results,
        timestamp: new Date().toISOString()
      }));
      
      // Show a message about the results
      setSnackbarMessage(`Found ${results.length} item requests matching your criteria`);
      setSnackbarOpen(true);
      
      // Navigate to dashboard with search results
      navigate('/dashboard', { state: { searchResults: results, searchType: 'requests' } });
    }
  };

  const clearSearch = () => {
    setDepartureCity('');
    setDepartureCityInput('');
    setDestinationCity('');
    setDestinationCityInput('');
    setDate('');
    setWeight('');
  };

  // Add function to swap departure and destination cities
  const swapCities = () => {
    setDepartureCity(destinationCity);
    setDestinationCity(departureCity);
    setDepartureCityInput(destinationCityInput);
    setDestinationCityInput(departureCityInput);
  };

  // Fix for the Autocomplete component refreshing the whole search bar
  // Update the onChange and onInputChange handlers to prevent unnecessary re-renders
  const handleDepartureChange = useCallback((event, newValue) => {
    setDepartureCity(newValue);
  }, []);

  const handleDepartureInputChange = useCallback((event, newInputValue) => {
    setDepartureCityInput(newInputValue);
  }, []);

  const handleDestinationChange = useCallback((event, newValue) => {
    setDestinationCity(newValue);
  }, []);

  const handleDestinationInputChange = useCallback((event, newInputValue) => {
    setDestinationCityInput(newInputValue);
  }, []);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isLoaded && (
          <MotionPaper
            component="form"
            onSubmit={handleSearch}
            elevation={5}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 30,
              duration: 0.4
            }}
            sx={{
              p: { xs: 2, sm: 2.5, md: 2.5 },
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              borderRadius: '12px',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              position: 'relative',
              background: 'linear-gradient(145deg, #ffffff 0%, #f8faff 100%)',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 28px rgba(0, 0, 0, 0.1)'
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                background: `linear-gradient(90deg, ${colors.main} 0%, rgba(255, 255, 255, 0.5) 100%)`,
                borderRadius: '4px 4px 0 0',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '150px',
                height: '150px',
                background: `radial-gradient(circle, ${colors.shadow} 0%, rgba(255, 255, 255, 0) 70%)`,
                opacity: 0.5,
                zIndex: 0,
                pointerEvents: 'none',
                transition: 'all 0.3s ease-in-out',
              },
              '&:hover::after': {
                opacity: 0.7,
                transform: 'scale(1.2)'
              }
            }}
          >
            {/* Header */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mb: 2,
                position: 'relative',
                zIndex: 1
              }}
            >
              <Avatar 
                sx={{ 
                  bgcolor: 'white', 
                  width: 40, 
                  height: 40, 
                  mr: 1.5,
                  boxShadow: `0 6px 15px ${colors.shadow}`,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  border: `1px solid ${colors.main}10`,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${colors.main}20 0%, ${colors.main}10 100%)`,
                    zIndex: 0
                  }
                }}
              >
                <Box sx={{ 
                  position: 'relative', 
                  zIndex: 1,
                  transition: 'all 0.3s ease',
                }}>
                  <SearchIcon sx={{ fontSize: 22, color: colors.main }} />
                </Box>
              </Avatar>
              
              <Typography 
                variant="h6" 
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                sx={{ 
                  fontWeight: 'bold',
                  color: '#1A3C5E',
                  fontSize: { xs: '16px', md: '18px' },
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -6,
                    left: 0,
                    width: '30px',
                    height: '3px',
                    background: `linear-gradient(90deg, ${colors.main} 0%, ${colors.main}80 100%)`,
                    borderRadius: '3px',
                  }
                }}
              >
                Find Travelers & Requests
              </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />
            
            {/* Search Mode Toggle */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 2,
              position: 'relative',
              zIndex: 1
            }}>
              <Box
                sx={{
                  display: 'flex',
                  borderRadius: '20px',
                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                  p: 0.5,
                  position: 'relative',
                }}
              >
                <Button
                  onClick={() => setSearchMode('travelers')}
                  variant={searchMode === 'travelers' ? 'contained' : 'text'}
                  startIcon={<FlightTakeoffIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    minWidth: '130px',
                    borderRadius: '16px',
                    py: 0.5,
                    color: searchMode === 'travelers' ? 'white' : '#637381',
                    bgcolor: searchMode === 'travelers' ? colors.main : 'transparent',
                    fontSize: '0.8rem',
                    textTransform: 'none',
                    fontWeight: searchMode === 'travelers' ? 600 : 500,
                    '&:hover': {
                      bgcolor: searchMode === 'travelers' ? colors.main : `${colors.main}10`,
                    },
                    transition: 'all 0.3s'
                  }}
                >
                  Find Travelers
                </Button>
                <Button
                  onClick={() => setSearchMode('requests')}
                  variant={searchMode === 'requests' ? 'contained' : 'text'}
                  startIcon={<LocalShippingIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    minWidth: '130px',
                    borderRadius: '16px',
                    py: 0.5,
                    color: searchMode === 'requests' ? 'white' : '#637381',
                    bgcolor: searchMode === 'requests' ? colors.main : 'transparent',
                    fontSize: '0.8rem',
                    textTransform: 'none',
                    fontWeight: searchMode === 'requests' ? 600 : 500,
                    '&:hover': {
                      bgcolor: searchMode === 'requests' ? colors.main : `${colors.main}10`,
                    },
                    transition: 'all 0.3s'
                  }}
                >
                  Find Requests
                </Button>
              </Box>
            </Box>

            {/* Search Fields Grid */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: 1.5, 
              mb: 2.5,
              position: 'relative',
              zIndex: 1
            }}>
              {/* Departure City */}
              <Box>
                <Typography variant="caption" sx={{ display: 'block', mb: 0.5, ml: 0.5, color: '#637381', fontWeight: 500 }}>
                  {searchMode === 'travelers' ? 'Departure City' : 'Item Source Location'}
                </Typography>
                <DepartureAutocomplete 
                  value={departureCity}
                  onChange={handleDepartureChange}
                  inputValue={departureCityInput}
                  onInputChange={handleDepartureInputChange}
                  colors={colors}
                />
              </Box>

              {/* Destination City */}
              <Box>
                <Typography variant="caption" sx={{ display: 'block', mb: 0.5, ml: 0.5, color: '#637381', fontWeight: 500 }}>
                  {searchMode === 'travelers' ? 'Destination City' : 'Item Destination'}
                </Typography>
                <DestinationAutocomplete 
                  value={destinationCity}
                  onChange={handleDestinationChange}
                  inputValue={destinationCityInput}
                  onInputChange={handleDestinationInputChange}
                  colors={colors}
                />
              </Box>

              {/* Travel Date */}
              <Box>
                <Typography variant="caption" sx={{ display: 'block', mb: 0.5, ml: 0.5, color: '#637381', fontWeight: 500 }}>
                  {searchMode === 'travelers' ? 'Travel Date' : 'Delivery By Date'}
                </Typography>
                <TextField 
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  fullWidth
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DateRangeIcon sx={{ color: colors.main, fontSize: 18 }} />
                      </InputAdornment>
                    )
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                      height: '40px',
                      bgcolor: 'rgba(255, 255, 255, 0.7)',
                      '&:hover': {
                        bgcolor: 'white',
                      },
                      '&.Mui-focused': {
                        bgcolor: 'white',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: colors.main,
                          borderWidth: 1.5
                        }
                      }
                    },
                    '& .MuiInputBase-input': { 
                      fontSize: '0.85rem',
                      padding: '0 14px'
                    }
                  }}
                />
              </Box>

              {/* Weight */}
              <Box>
                <Typography variant="caption" sx={{ display: 'block', mb: 0.5, ml: 0.5, color: '#637381', fontWeight: 500 }}>
                  {searchMode === 'travelers' ? 'Weight Capacity (kg)' : 'Item Weight (kg)'}
                </Typography>
                <TextField 
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  fullWidth
                  placeholder={searchMode === 'travelers' ? 'Min capacity' : 'Max weight'}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ScaleIcon sx={{ color: colors.main, fontSize: 18 }} />
                      </InputAdornment>
                    )
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                      height: '40px',
                      bgcolor: 'rgba(255, 255, 255, 0.7)',
                      '&:hover': {
                        bgcolor: 'white',
                      },
                      '&.Mui-focused': {
                        bgcolor: 'white',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: colors.main,
                          borderWidth: 1.5
                        }
                      }
                    },
                    '& .MuiInputBase-input': { 
                      fontSize: '0.85rem',
                      padding: '0 14px'
                    }
                  }}
                />
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr auto',
              gap: 1,
              position: 'relative',
              zIndex: 1
            }}>
              {/* Swap Button for Mobile */}
              {isMobile && (
                <Button
                  type="button"
                  onClick={swapCities}
                  variant="outlined"
                  startIcon={<SwapHorizIcon />}
                  sx={{
                    color: colors.main,
                    borderColor: `${colors.main}40`,
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    textTransform: 'none',
                    fontWeight: 500,
                    marginBottom: 1,
                    '&:hover': {
                      borderColor: colors.main,
                      bgcolor: `${colors.main}08`,
                    }
                  }}
                >
                  Swap Locations
                </Button>
              )}

              {/* Search Button */}
              <Button
                type="submit"
                variant="contained"
                startIcon={<SearchIcon />}
                sx={{
                  color: 'white',
                  bgcolor: colors.main,
                  borderRadius: '8px',
                  py: isMobile ? 1 : 1.5,
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: `0 4px 12px ${colors.shadow}`,
                  '&:hover': {
                    bgcolor: '#3B75E0',
                    boxShadow: `0 6px 16px ${colors.shadow}`
                  }
                }}
              >
                Search
              </Button>

              {/* Clear Button */}
              <Button
                type="button"
                onClick={clearSearch}
                variant="outlined"
                startIcon={<CloseIcon />}
                sx={{
                  color: '#637381',
                  borderColor: '#C4CDD5',
                  borderRadius: '8px',
                  py: isMobile ? 1 : 1.5,
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  fontWeight: 500,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#637381',
                    bgcolor: 'rgba(99, 115, 129, 0.08)',
                  }
                }}
              >
                Clear
              </Button>

              {/* Swap Button for Desktop */}
              {!isMobile && (
                <Button
                  type="button"
                  onClick={swapCities}
                  variant="text"
                  sx={{
                    minWidth: 'auto',
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    p: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: colors.main,
                    '&:hover': {
                      bgcolor: `${colors.main}10`,
                    }
                  }}
                >
                  <SwapHorizIcon />
                </Button>
              )}
            </Box>
          </MotionPaper>
        )}
      </AnimatePresence>
      
      {/* Feedback Snackbar */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity="success" 
          sx={{ width: '100%' }}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SearchBar;
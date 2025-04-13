import React, { useState } from 'react';
import { 
  Box, Typography, Button, Grid, Paper, Stack, TextField, Autocomplete,
  InputAdornment, Avatar, Snackbar, Alert, CircularProgress
} from '@mui/material';
import { 
  FlightTakeoff, LocationOn, CalendarMonth, Scale, 
  Info, AddCircle, Flight, Luggage
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { motion } from '../../shared/MotionComponents';
import { submitTravelPlan } from '../../../services/mockApiService';

const TravelPlanTab = () => {
  // States for traveler form
  const [travelFromCity, setTravelFromCity] = useState('');
  const [travelToCity, setTravelToCity] = useState('');
  const [departureDate, setDepartureDate] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [availableWeight, setAvailableWeight] = useState('');
  const [travelNotes, setTravelNotes] = useState('');
  
  // States for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Sample city data (this would come from an API in a real application)
  const cities = [
    'New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Berlin',
    'Mumbai', 'Beijing', 'Rio de Janeiro', 'Cairo', 'Moscow',
    'Toronto', 'Singapore', 'Dubai', 'Los Angeles', 'Rome'
  ];
  
  const handleTravelSubmit = async (e) => {
    e.preventDefault();
    
    // Basic form validation
    if (!travelFromCity || !travelToCity || !departureDate || !arrivalDate || !availableWeight) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error'
      });
      return;
    }

    // Check if departure date is before arrival date
    if (new Date(departureDate) > new Date(arrivalDate)) {
      setSnackbar({
        open: true,
        message: 'Departure date must be before arrival date',
        severity: 'error'
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Format dates for API submission
      const formattedDepartureDate = departureDate ? departureDate.toISOString().split('T')[0] : null;
      const formattedArrivalDate = arrivalDate ? arrivalDate.toISOString().split('T')[0] : null;

      // Prepare data for API
      const travelPlanData = {
        fromCity: travelFromCity,
        toCity: travelToCity,
        departureDate: formattedDepartureDate,
        arrivalDate: formattedArrivalDate,
        availableWeight: Number(availableWeight),
        notes: travelNotes || ''
      };
      
      // Call mock API
      const response = await submitTravelPlan(travelPlanData);
      
      // Handle success
      if (response.success) {
        setSnackbar({
          open: true,
          message: 'Travel plan submitted successfully!',
          severity: 'success'
        });
        
        // Reset form fields
        setTravelFromCity('');
        setTravelToCity('');
        setDepartureDate(null);
        setArrivalDate(null);
        setAvailableWeight('');
        setTravelNotes('');
      }
    } catch (error) {
      console.error('Error submitting travel plan:', error);
      setSnackbar({
        open: true,
        message: 'Failed to submit travel plan. Please try again.',
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  const MotionBox = motion(Box);

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        duration: 0.6
      }}
      exit={{ opacity: 0, y: 20 }}
    >
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          borderRadius: 3,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8faff 100%)',
          boxShadow: '0 15px 35px rgba(18, 46, 101, 0.12)',
          position: 'relative',
          overflow: 'hidden',
          willChange: 'transform',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-5px) scale(1.01)',
            boxShadow: '0 20px 40px rgba(18, 46, 101, 0.15)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '5px',
            background: 'linear-gradient(90deg, #4681f4 0%, rgba(255,255,255,0.5) 100%)',
            borderRadius: '5px 5px 0 0'
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-50px',
            right: '-50px',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(70, 129, 244, 0.08) 0%, rgba(255,255,255,0) 70%)',
            zIndex: 0,
            pointerEvents: 'none',
            opacity: 0.7,
            transition: 'all 0.3s ease-in-out',
          },
          '&:hover::after': {
            opacity: 0.9,
            transform: 'scale(1.2)'
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Avatar 
              sx={{ 
                bgcolor: 'white', 
                width: 70, 
                height: 70,
                boxShadow: '0 8px 20px rgba(70, 129, 244, 0.2)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                border: '2px solid rgba(70, 129, 244, 0.1)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(70, 129, 244, 0.1) 0%, rgba(70, 129, 244, 0.05) 100%)',
                  zIndex: 0
                }
              }}
            >
              <Box sx={{ 
                position: 'relative', 
                zIndex: 1,
                transform: 'scale(1.2)',
              }}>
                <Flight sx={{ fontSize: 36, color: '#3662ea' }} />
              </Box>
            </Avatar>
            
            <Typography 
              variant="h5" 
              component="h3" 
              gutterBottom 
              sx={{ 
                mb: 0, 
                color: '#3662ea', 
                fontWeight: 'bold',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '60px',
                  height: '3px',
                  background: 'linear-gradient(90deg, #4681f4 0%, #3662ea 100%)',
                  borderRadius: '3px'
                }
              }}
            >
              Share Your Travel Plans & Earn Money
            </Typography>
          </Box>
          
          <Typography 
            variant="body1" 
            paragraph 
            sx={{ 
              mb: 4, 
              color: '#637381',
              lineHeight: 1.7,
              maxWidth: '800px',
              fontSize: '1.05rem',
              pl: 3
            }}
          >
            Let others know about your upcoming trip and how much luggage space you can spare. 
            You'll get matched with people needing items transported on your route.
          </Typography>
          
          <Box component="form" onSubmit={handleTravelSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    background: 'linear-gradient(145deg, #f8faff 0%, #ffffff 100%)',
                    borderRadius: '12px',
                    p: 2.5,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                  }}
                >
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      mb: 2.5, 
                      fontWeight: 600, 
                      color: '#3662ea',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5
                    }}
                  >
                    <Box sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'rgba(70, 129, 244, 0.1)',
                    }}>
                      <FlightTakeoff sx={{ fontSize: 18, color: '#4681f4' }} />
                    </Box>
                    Travel Details
                  </Typography>
                  <Stack spacing={3}>
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Autocomplete
                        options={cities}
                        renderInput={(params) => 
                          <TextField 
                            {...params} 
                            label="Departure City" 
                            required
                            fullWidth
                            variant="outlined"
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                <>
                                  <InputAdornment position="start">
                                    <LocationOn sx={{ color: '#4681f4' }} />
                                  </InputAdornment>
                                  {params.InputProps.startAdornment}
                                </>
                              )
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#4681f4',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#4681f4',
                                  borderWidth: 2,
                                },
                              },
                              '& .MuiInputLabel-root.Mui-focused': {
                                color: '#4681f4',
                              },
                            }}
                          />
                        }
                        value={travelFromCity}
                        onChange={(e, newValue) => setTravelFromCity(newValue)}
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Autocomplete
                        options={cities}
                        renderInput={(params) => 
                          <TextField 
                            {...params} 
                            label="Destination City" 
                            required
                            fullWidth
                            variant="outlined"
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                <>
                                  <InputAdornment position="start">
                                    <LocationOn sx={{ color: '#4681f4' }} />
                                  </InputAdornment>
                                  {params.InputProps.startAdornment}
                                </>
                              )
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#4681f4',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#4681f4',
                                  borderWidth: 2,
                                },
                              },
                              '& .MuiInputLabel-root.Mui-focused': {
                                color: '#4681f4',
                              },
                            }}
                          />
                        }
                        value={travelToCity}
                        onChange={(e, newValue) => setTravelToCity(newValue)}
                      />
                    </motion.div>
                    
                    <Stack direction="row" spacing={2}>
                      <Box sx={{ flex: 1 }}>
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              label="Departure Date"
                              value={departureDate}
                              onChange={(newValue) => setDepartureDate(newValue)}
                              slotProps={{
                                textField: {
                                  required: true,
                                  fullWidth: true,
                                  variant: "outlined",
                                  InputProps: {
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <CalendarMonth sx={{ color: '#4681f4' }} />
                                      </InputAdornment>
                                    )
                                  },
                                  sx: {
                                    '& .MuiOutlinedInput-root': {
                                      '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#4681f4',
                                      },
                                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#4681f4',
                                        borderWidth: 2,
                                      },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                      color: '#4681f4',
                                    },
                                  }
                                }
                              }}
                            />
                          </LocalizationProvider>
                        </motion.div>
                      </Box>
                      
                      <Box sx={{ flex: 1 }}>
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              label="Arrival Date"
                              value={arrivalDate}
                              onChange={(newValue) => setArrivalDate(newValue)}
                              slotProps={{
                                textField: {
                                  required: true,
                                  fullWidth: true,
                                  variant: "outlined",
                                  InputProps: {
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <CalendarMonth sx={{ color: '#4681f4' }} />
                                      </InputAdornment>
                                    )
                                  },
                                  sx: {
                                    '& .MuiOutlinedInput-root': {
                                      '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#4681f4',
                                      },
                                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#4681f4',
                                        borderWidth: 2,
                                      },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                      color: '#4681f4',
                                    },
                                  }
                                }
                              }}
                            />
                          </LocalizationProvider>
                        </motion.div>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    background: 'linear-gradient(145deg, #f8faff 0%, #ffffff 100%)',
                    borderRadius: '12px',
                    p: 2.5,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      mb: 2.5, 
                      fontWeight: 600, 
                      color: '#3662ea',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5
                    }}
                  >
                    <Box sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'rgba(70, 129, 244, 0.1)',
                    }}>
                      <Luggage sx={{ fontSize: 18, color: '#4681f4' }} />
                    </Box>
                    Capacity & Notes
                  </Typography>
                  <Stack spacing={3} sx={{ flex: 1 }}>
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <TextField
                        label="Available Weight (kg)"
                        type="number"
                        required
                        fullWidth
                        variant="outlined"
                        helperText="Maximum weight you can carry"
                        value={availableWeight}
                        onChange={(e) => setAvailableWeight(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Scale sx={{ color: '#4681f4' }} />
                            </InputAdornment>
                          )
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#4681f4',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#4681f4',
                              borderWidth: 2,
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#4681f4',
                          },
                          '& .MuiFormHelperText-root': {
                            fontSize: '0.75rem',
                          },
                        }}
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                      whileHover={{ scale: 1.02 }}
                      style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                    >
                      <TextField
                        label="Notes (Optional)"
                        fullWidth
                        variant="outlined"
                        placeholder="Any special notes about your trip"
                        multiline
                        rows={4}
                        value={travelNotes}
                        onChange={(e) => setTravelNotes(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                              <Info sx={{ color: '#4681f4' }} />
                            </InputAdornment>
                          )
                        }}
                        sx={{
                          flex: 1,
                          '& .MuiOutlinedInput-root': {
                            height: '100%',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#4681f4',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#4681f4',
                              borderWidth: 2,
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#4681f4',
                          },
                        }}
                      />
                    </motion.div>
                  </Stack>
                </Box>
              </Grid>
              
              <Grid item xs={12} sx={{ textAlign: 'center', mt: 4 }}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    type="submit" 
                    variant="contained" 
                    size="large"
                    startIcon={isSubmitting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : <AddCircle />}
                    disabled={isSubmitting}
                    sx={{ 
                      px: 5, 
                      py: 1.5, 
                      borderRadius: 3,
                      background: 'linear-gradient(45deg, #3662ea 0%, #4681f4 100%)',
                      boxShadow: '0 8px 16px rgba(54, 98, 234, 0.25)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #2955C8 0%, #3662ea 100%)',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 12px 20px rgba(54, 98, 234, 0.3)'
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '200%',
                        height: '100%',
                        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
                        animation: 'shimmer 2.5s infinite',
                        zIndex: 1
                      }
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Add Travel Plan'}
                  </Button>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MotionBox>
  );
};

export default TravelPlanTab;
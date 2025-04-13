import React, { useState } from 'react';
import { 
  Box, Typography, Button, Grid, Paper, Stack, TextField, Autocomplete,
  InputAdornment, Snackbar, Alert, CircularProgress
} from '@mui/material';
import { 
  LocalShipping, Info, LocationOn, CalendarMonth, Scale, 
  Payment, AddCircle
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MotionBox, motion } from '../../shared/MotionComponents';
import { submitItemRequest } from '../../../services/mockApiService';

const RequestItemTab = () => {
  // States for request form
  const [requestFromCity, setRequestFromCity] = useState('');
  const [requestToCity, setRequestToCity] = useState('');
  const [requestDeadline, setRequestDeadline] = useState(null);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemWeight, setItemWeight] = useState('');
  const [itemValue, setItemValue] = useState('');
  
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
  
  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    
    // Basic form validation
    if (!requestFromCity || !requestToCity || !requestDeadline || !itemName || !itemDescription || !itemWeight || !itemValue) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error'
      });
      return;
    }

    // Validate numeric fields
    if (isNaN(itemWeight) || Number(itemWeight) <= 0) {
      setSnackbar({
        open: true,
        message: 'Please enter a valid weight',
        severity: 'error'
      });
      return;
    }

    if (isNaN(itemValue) || Number(itemValue) <= 0) {
      setSnackbar({
        open: true,
        message: 'Please enter a valid item value',
        severity: 'error'
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Format date for API submission
      const formattedDeadline = requestDeadline ? requestDeadline.toISOString().split('T')[0] : null;

      // Prepare data for API
      const itemRequestData = {
        fromCity: requestFromCity,
        toCity: requestToCity,
        deadline: formattedDeadline,
        itemName: itemName,
        description: itemDescription,
        weight: Number(itemWeight),
        value: Number(itemValue)
      };
      
      // Call mock API
      const response = await submitItemRequest(itemRequestData);
      
      // Handle success
      if (response.success) {
        setSnackbar({
          open: true,
          message: 'Item request submitted successfully!',
          severity: 'success'
        });
        
        // Reset form fields
        setRequestFromCity('');
        setRequestToCity('');
        setRequestDeadline(null);
        setItemName('');
        setItemDescription('');
        setItemWeight('');
        setItemValue('');
      }
    } catch (error) {
      console.error('Error submitting item request:', error);
      setSnackbar({
        open: true,
        message: 'Failed to submit item request. Please try again.',
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
            background: 'linear-gradient(90deg, #f57c00 0%, rgba(255,255,255,0.5) 100%)',
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
            background: 'radial-gradient(circle, rgba(245, 124, 0, 0.08) 0%, rgba(255,255,255,0) 70%)',
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
          <Typography 
            variant="h5" 
            component="h3" 
            gutterBottom 
            sx={{ 
              mb: 3, 
              color: '#f57c00', 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '60px',
                height: '3px',
                background: 'linear-gradient(90deg, #f5a74d 0%, #f57c00 100%)',
                borderRadius: '3px'
              }
            }}
          >
            <LocalShipping sx={{ fontSize: 28 }} /> Request an Item from Anywhere in the World
          </Typography>
          <Typography 
            variant="body1" 
            paragraph 
            sx={{ 
              mb: 4, 
              color: '#637381',
              lineHeight: 1.7,
              maxWidth: '800px',
              fontSize: '1.05rem'
            }}
          >
            Tell us what you need, where it's from, and where you want it delivered. We'll connect you with travelers who can help.
          </Typography>
          
          <Box component="form" onSubmit={handleRequestSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500, color: '#f57c00' }}>
                  Location Details
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
                          label="From City (item location)" 
                          required
                          fullWidth
                          variant="outlined"
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <>
                                <InputAdornment position="start">
                                  <LocationOn sx={{ color: '#f57c00' }} />
                                </InputAdornment>
                                {params.InputProps.startAdornment}
                              </>
                            )
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#f57c00',
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#f57c00',
                                borderWidth: 2,
                              },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: '#f57c00',
                            },
                          }}
                        />
                      }
                      value={requestFromCity}
                      onChange={(e, newValue) => setRequestFromCity(newValue)}
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
                          label="To City (delivery location)" 
                          required
                          fullWidth
                          variant="outlined"
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <>
                                <InputAdornment position="start">
                                  <LocationOn sx={{ color: '#f57c00' }} />
                                </InputAdornment>
                                {params.InputProps.startAdornment}
                              </>
                            )
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#f57c00',
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#f57c00',
                                borderWidth: 2,
                              },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: '#f57c00',
                            },
                          }}
                        />
                      }
                      value={requestToCity}
                      onChange={(e, newValue) => setRequestToCity(newValue)}
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Need By Date"
                        value={requestDeadline}
                        onChange={(newValue) => setRequestDeadline(newValue)}
                        slotProps={{
                          textField: {
                            required: true,
                            fullWidth: true,
                            variant: "outlined",
                            helperText: "When do you need this item by?",
                            InputProps: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <CalendarMonth sx={{ color: '#f57c00' }} />
                                </InputAdornment>
                              )
                            },
                            sx: {
                              '& .MuiOutlinedInput-root': {
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#f57c00',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#f57c00',
                                  borderWidth: 2,
                                },
                              },
                              '& .MuiInputLabel-root.Mui-focused': {
                                color: '#f57c00',
                              },
                            }
                          }
                        }}
                      />
                    </LocalizationProvider>
                  </motion.div>
                </Stack>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500, color: '#f57c00' }}>
                  Item Details
                </Typography>
                <Stack spacing={3}>
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <TextField
                      label="Item Name"
                      required
                      fullWidth
                      variant="outlined"
                      placeholder="e.g. Japanese Matcha Tea"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocalShipping sx={{ color: '#f57c00' }} />
                          </InputAdornment>
                        )
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#f57c00',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#f57c00',
                            borderWidth: 2,
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#f57c00',
                        },
                      }}
                    />
                  </motion.div>
                  
                  <Stack direction="row" spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <TextField
                          label="Approximate Weight (kg)"
                          type="number"
                          required
                          fullWidth
                          variant="outlined"
                          value={itemWeight}
                          onChange={(e) => setItemWeight(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Scale sx={{ color: '#f57c00' }} />
                              </InputAdornment>
                            )
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#f57c00',
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#f57c00',
                                borderWidth: 2,
                              },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: '#f57c00',
                            },
                          }}
                        />
                      </motion.div>
                    </Box>
                    
                    <Box sx={{ flex: 1 }}>
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <TextField
                          label="Estimated Value ($)"
                          type="number"
                          required
                          fullWidth
                          variant="outlined"
                          helperText="Approximate value in USD"
                          value={itemValue}
                          onChange={(e) => setItemValue(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Payment sx={{ color: '#f57c00' }} />
                              </InputAdornment>
                            )
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#f57c00',
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#f57c00',
                                borderWidth: 2,
                              },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: '#f57c00',
                            },
                          }}
                        />
                      </motion.div>
                    </Box>
                  </Stack>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <TextField
                      label="Item Description"
                      required
                      fullWidth
                      variant="outlined"
                      placeholder="Please provide as much detail as possible"
                      multiline
                      rows={3}
                      value={itemDescription}
                      onChange={(e) => setItemDescription(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                            <Info sx={{ color: '#f57c00' }} />
                          </InputAdornment>
                        )
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#f57c00',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#f57c00',
                            borderWidth: 2,
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#f57c00',
                        },
                      }}
                    />
                  </motion.div>
                </Stack>
              </Grid>
              
              <Grid item xs={12} sx={{ textAlign: 'center', mt: 4 }}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="secondary" 
                    size="large"
                    startIcon={<AddCircle />}
                    sx={{ 
                      px: 5, 
                      py: 1.5, 
                      borderRadius: 3,
                      background: 'linear-gradient(45deg, #f57c00 0%, #f5a74d 100%)',
                      boxShadow: '0 8px 16px rgba(245, 124, 0, 0.25)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #e06900 0%, #f57c00 100%)',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 12px 20px rgba(245, 124, 0, 0.3)'
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
                    {isSubmitting ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Add Request'}
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

export default RequestItemTab;
import React, { useState } from 'react';
import { 
  Box, Container, Typography, TextField, Button, 
  Grid, Paper, Alert, CircularProgress, InputAdornment,
  Chip, useTheme, alpha, Tooltip, Fade
} from '@mui/material';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import { 
  Flight, Scale, LocationOn, Notes, 
  CalendarMonth, Train, DirectionsBus, DirectionsCar,
  DirectionsBoat, MoreHoriz
} from '@mui/icons-material';

const AddTravelPlan = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    departure_location: '',
    destination: '',
    arrival_date: '',
    max_weight: '',
    max_dimensions: '',
    notes: '',
    transportation_type: 'flight'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    // Form validation
    if (!formData.departure_location || !formData.destination || 
        !formData.arrival_date || !formData.max_weight || 
        !formData.max_dimensions) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }
    
    // Validate dates
    const arrivalDate = new Date(formData.arrival_date);
    const today = new Date();
    
    if (isNaN(arrivalDate.getTime())) {
      setError('Please enter a valid arrival date');
      setLoading(false);
      return;
    }
    
    // Check that arrival date is in the future
    if (arrivalDate < today) {
      setError('Arrival date must be in the future');
      setLoading(false);
      return;
    }

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to add a travel plan');
      }
      
      // Determine departure date (1 day before arrival as default)
      const departureDate = new Date(arrivalDate);
      departureDate.setDate(departureDate.getDate() - 1);
      
      // Insert travel plan
      const { error: insertError } = await supabase
        .from('travel_plans')
        .insert([
          {
            user_id: user.id,
            departure_location: formData.departure_location,
            destination: formData.destination,
            departure_date: departureDate.toISOString().split('T')[0], // day before arrival
            arrival_date: formData.arrival_date,
            max_weight: parseFloat(formData.max_weight),
            max_dimensions: formData.max_dimensions,
            notes: formData.notes,
            transportation_type: formData.transportation_type,
            status: 'active'
          }
        ]);
      
      if (insertError) throw insertError;
      
      // Success
      setSuccess(true);
      
      // Reset form
      setFormData({
        departure_location: '',
        destination: '',
        arrival_date: '',
        max_weight: '',
        max_dimensions: '',
        notes: '',
        transportation_type: 'flight'
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

  // Get transportation icon based on type
  const getTransportIcon = (type) => {
    switch(type) {
      case 'flight': return <Flight />;
      case 'train': return <Train />;
      case 'bus': return <DirectionsBus />;
      case 'car': return <DirectionsCar />;
      case 'ship': return <DirectionsBoat />;
      default: return <MoreHoriz />;
    }
  };

  return (
    <Box sx={{ 
      animation: 'fadeIn 0.5s ease-out',
      '@keyframes fadeIn': {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 }
      },
      padding: '25px' // Increased padding for spacious feel
    }}>
      <Typography 
        variant="h4" 
        component="h2" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold', 
          color: '#000000',
          mb: 3,
          fontFamily: 'Poppins, sans-serif',
          fontSize: '32px',
        }}
      >
        Share Your Travel Plans & <span style={{ color: '#F4C430' }}>Earn Money</span>
      </Typography>
      
      <Typography 
        variant="body1" 
        color="#666666" 
        paragraph 
        sx={{ 
          mb: 4, 
          maxWidth: '90%',
          fontSize: '18px',
          fontFamily: 'Poppins, sans-serif',
          lineHeight: 1.6
        }}
      >
        Let others know about your upcoming trip and how much luggage space you can spare. 
        You'll get matched with people needing items transported on your route.
      </Typography>
      
      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 3,
            borderRadius: '8px',
            animation: 'slideIn 0.3s ease-out',
            '@keyframes slideIn': {
              '0%': { transform: 'translateY(-10px)', opacity: 0 },
              '100%': { transform: 'translateY(0)', opacity: 1 }
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
            bgcolor: '#34C759',
            color: 'white',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '16px'
          }}
        >
          Your travel plan has been added successfully!
        </Alert>
      )}
      
      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{
          '& .MuiInputBase-root': {
            borderRadius: '8px',
            height: '45px',
            width: '100%',
            bgcolor: 'white',
            border: '1px solid #D3D3D3',
            transition: 'all 0.3s ease',
            '&:focus-within': {
              borderColor: '#4A90E2',
              boxShadow: '0 0 0 2px rgba(74, 144, 226, 0.2)',
            }
          },
          '& .MuiFormLabel-root': {
            fontFamily: 'Poppins, sans-serif',
            fontSize: '16px',
            color: '#000000',
            '&.Mui-focused': {
              color: '#4A90E2'
            }
          },
          '& .MuiInputBase-input': {
            fontFamily: 'Poppins, sans-serif',
            fontSize: '16px'
          },
          '& .MuiFormHelperText-root': {
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px'
          }
        }}
      >
        <Grid container spacing={3}>
          {/* Row 1: Departure City and Destination City side by side */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Departure City"
              name="departure_location"
              value={formData.departure_location}
              onChange={handleChange}
              placeholder="City, Country"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn sx={{ color: '#A9A9A9' }} />
                  </InputAdornment>
                ),
              }}
              FormHelperTextProps={{
                sx: { 
                  '&::after': {
                    content: '"*"',
                    color: '#FF6F61',
                    marginLeft: '2px'
                  }
                }
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Destination City"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="City, Country"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn sx={{ color: '#A9A9A9' }} />
                  </InputAdornment>
                ),
              }}
              FormHelperTextProps={{
                sx: { 
                  '&::after': {
                    content: '"*"',
                    color: '#FF6F61',
                    marginLeft: '2px'
                  }
                }
              }}
            />
          </Grid>
          
          {/* Row 2: Arrival Date and Available Weight side by side */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Arrival Date"
              name="arrival_date"
              type="date"
              value={formData.arrival_date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              inputProps={{ 
                min: new Date().toISOString().split('T')[0],
                style: { fontFamily: 'Poppins, sans-serif' }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonth sx={{ color: '#A9A9A9' }} />
                  </InputAdornment>
                ),
              }}
              FormHelperTextProps={{
                sx: { 
                  '&::after': {
                    content: '"*"',
                    color: '#FF6F61',
                    marginLeft: '2px'
                  }
                }
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Available Weight (kg)"
              name="max_weight"
              type="number"
              value={formData.max_weight}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Scale sx={{ color: '#A9A9A9' }} />
                  </InputAdornment>
                ),
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
              FormHelperTextProps={{
                sx: { 
                  '&::after': {
                    content: '"*"',
                    color: '#FF6F61',
                    marginLeft: '2px'
                  }
                }
              }}
            />
          </Grid>
          
          {/* Row 3: Notes as a full-width text area */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notes (Optional)"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any special notes about your trip"
              multiline
              rows={3}
              sx={{
                '& .MuiInputBase-root': {
                  height: 'auto',
                  bgcolor: '#F5F7FA'
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5, mr: 1 }}>
                    <Notes sx={{ color: '#A9A9A9' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          {/* Submit Button */}
          <Grid item xs={12} sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <Flight />}
              sx={{
                py: 1.5,
                px: 5,
                borderRadius: '8px',
                fontWeight: 'medium',
                textTransform: 'none',
                fontSize: '16px',
                fontFamily: 'Poppins, sans-serif',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                bgcolor: '#4A90E2',
                '&:hover': {
                  bgcolor: '#3A80D2',
                  transform: 'scale(1.05)',
                }
              }}
            >
              {loading ? 'Submitting...' : 'POST TRAVEL PLAN'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddTravelPlan;
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Grid,
  TextField,
  Button,
  Divider,
  CircularProgress,
  Tabs,
  Tab,
  Alert,
  Chip
} from '@mui/material';
import { 
  Person, 
  Edit, 
  FlightTakeoff, 
  LocalShipping, 
  Save,
  LocationOn
} from '@mui/icons-material';
import { supabase } from '../supabase';

// Tab Panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    avatar_url: '',
    bio: '',
    location: '',
    phone: ''
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [travelHistory, setTravelHistory] = useState([]);
  const [requestHistory, setRequestHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (tabValue === 1) {
      fetchTravelHistory();
    } else if (tabValue === 2) {
      fetchRequestHistory();
    }
  }, [tabValue]);

  const fetchProfile = async () => {
    setLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not found');
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setProfile(data);
        setFormData({
          full_name: data.full_name || '',
          avatar_url: data.avatar_url || '',
          bio: data.bio || '',
          location: data.location || '',
          phone: data.phone || ''
        });
      }
    } catch (error) {
      setError('Failed to load profile');
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTravelHistory = async () => {
    if (!profile) return;
    
    setHistoryLoading(true);
    try {
      const { data, error } = await supabase
        .from('travel_plans')
        .select('*')
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTravelHistory(data || []);
    } catch (error) {
      console.error('Error loading travel history:', error);
    } finally {
      setHistoryLoading(false);
    }
  };

  const fetchRequestHistory = async () => {
    if (!profile) return;
    
    setHistoryLoading(true);
    try {
      const { data, error } = await supabase
        .from('item_requests')
        .select('*')
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequestHistory(data || []);
    } catch (error) {
      console.error('Error loading request history:', error);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleUpdateProfile = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          avatar_url: formData.avatar_url,
          bio: formData.bio,
          location: formData.location,
          phone: formData.phone,
          updated_at: new Date().toISOString()
        })
        .eq('id', profile.id);

      if (error) throw error;
      
      setSuccess('Profile updated successfully!');
      setEditMode(false);
      // Refresh profile data
      fetchProfile();
    } catch (error) {
      setError('Failed to update profile. Please try again.');
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading profile...
        </Typography>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          Profile not found. Please log in and try again.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}
      
      <Paper elevation={3} sx={{ 
        p: 4, 
        borderRadius: '16px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
        position: 'relative',
        overflow: 'hidden',
        mb: 4,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '5px',
          background: 'linear-gradient(90deg, #6d8ec5 0%, #d3622c 100%)',
          borderRadius: '5px 5px 0 0'
        }
      }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
            <Avatar
              src={profile.avatar_url}
              alt={profile.full_name}
              sx={{ 
                width: 120, 
                height: 120, 
                margin: '0 auto',
                border: '4px solid #fff',
                boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
              }}
            />
            
            {!editMode && (
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => setEditMode(true)}
                sx={{ mt: 2, width: '80%' }}
              >
                Edit Profile
              </Button>
            )}
          </Grid>
          
          <Grid item xs={12} md={9}>
            {editMode ? (
              <Box component="form">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>Edit Profile</Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Profile Picture URL"
                      name="avatar_url"
                      value={formData.avatar_url}
                      onChange={handleChange}
                      helperText="Enter URL of your profile picture"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: <LocationOn sx={{ color: '#6d8ec5', mr: 1 }} />
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      multiline
                      rows={4}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                    <Button 
                      variant="outlined" 
                      onClick={() => {
                        setEditMode(false);
                        // Reset form data to original profile data
                        setFormData({
                          full_name: profile.full_name || '',
                          avatar_url: profile.avatar_url || '',
                          bio: profile.bio || '',
                          location: profile.location || '',
                          phone: profile.phone || ''
                        });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="contained" 
                      onClick={handleUpdateProfile}
                      disabled={saving}
                      startIcon={saving ? <CircularProgress size={20} /> : <Save />}
                    >
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                  {profile.full_name}
                </Typography>
                
                {profile.location && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOn sx={{ color: '#6d8ec5', mr: 0.5, fontSize: '1.1rem' }} />
                    <Typography variant="body1" color="text.secondary">
                      {profile.location}
                    </Typography>
                  </Box>
                )}
                
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Chip 
                    label="Traveler" 
                    color="primary" 
                    size="small" 
                    icon={<FlightTakeoff />} 
                  />
                  <Chip 
                    label="Requester" 
                    color="secondary" 
                    size="small" 
                    icon={<LocalShipping />} 
                  />
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {profile.bio || 'No bio added yet.'}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Member since
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {new Date(profile.created_at).toLocaleDateString()}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {profile.email}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Phone
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {profile.phone || 'Not provided'}
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
      
      <Paper elevation={3} sx={{ 
        borderRadius: '16px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
        overflow: 'hidden'
      }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="fullWidth"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '.MuiTab-root': {
              fontWeight: 'bold',
              py: 2
            }
          }}
        >
          <Tab label="Overview" icon={<Person />} iconPosition="start" />
          <Tab label="Travel Plans" icon={<FlightTakeoff />} iconPosition="start" />
          <Tab label="Item Requests" icon={<LocalShipping />} iconPosition="start" />
        </Tabs>
        
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>
            Account Overview
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 3, borderRadius: '12px' }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Latest Travel Plans
                </Typography>
                
                {historyLoading ? (
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <CircularProgress size={30} />
                  </Box>
                ) : travelHistory.length > 0 ? (
                  travelHistory.slice(0, 3).map((plan, index) => (
                    <Box key={index} sx={{ 
                      py: 1,
                      borderBottom: index < 2 ? '1px solid #eee' : 'none'
                    }}>
                      <Typography variant="body1" fontWeight="medium">
                        {plan.from_city} to {plan.to_city}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(plan.departure_date).toLocaleDateString()} • {plan.available_weight} kg capacity
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body1" color="text.secondary">
                    No travel plans yet.
                  </Typography>
                )}
                
                {travelHistory.length > 0 && (
                  <Button 
                    variant="text" 
                    onClick={() => setTabValue(1)} 
                    sx={{ mt: 2 }}
                  >
                    View All Travel Plans
                  </Button>
                )}
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper elevation={1} sx={{ p: 3, borderRadius: '12px' }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Latest Item Requests
                </Typography>
                
                {historyLoading ? (
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <CircularProgress size={30} />
                  </Box>
                ) : requestHistory.length > 0 ? (
                  requestHistory.slice(0, 3).map((request, index) => (
                    <Box key={index} sx={{ 
                      py: 1,
                      borderBottom: index < 2 ? '1px solid #eee' : 'none'
                    }}>
                      <Typography variant="body1" fontWeight="medium">
                        {request.item_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {request.from_city} to {request.to_city} • {request.item_weight} kg
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body1" color="text.secondary">
                    No item requests yet.
                  </Typography>
                )}
                
                {requestHistory.length > 0 && (
                  <Button 
                    variant="text" 
                    onClick={() => setTabValue(2)} 
                    sx={{ mt: 2 }}
                  >
                    View All Item Requests
                  </Button>
                )}
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <Paper elevation={1} sx={{ p: 3, borderRadius: '12px' }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Account Statistics
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <Typography variant="h4" color="primary" fontWeight="bold">
                        {travelHistory.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Travel Plans
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <Typography variant="h4" color="secondary" fontWeight="bold">
                        {requestHistory.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Item Requests
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <Typography variant="h4" color="success.main" fontWeight="bold">
                        0
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Completed Deliveries
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <Typography variant="h4" color="warning.main" fontWeight="bold">
                        0
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Pending Matches
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Travel Plans History
          </Typography>
          
          {historyLoading ? (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <CircularProgress />
            </Box>
          ) : travelHistory.length > 0 ? (
            <Grid container spacing={2}>
              {travelHistory.map((plan, index) => (
                <Grid item xs={12} key={index}>
                  <Paper elevation={1} sx={{ 
                    p: 3, 
                    borderRadius: '12px',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                    }
                  }}>
                    <Grid container alignItems="center">
                      <Grid item xs={12} sm={8}>
                        <Typography variant="h6" gutterBottom>
                          {plan.from_city} <span style={{ opacity: 0.6 }}>→</span> {plan.to_city}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Departure: {new Date(plan.departure_date).toLocaleDateString()} • 
                          Arrival: {new Date(plan.arrival_date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2">
                          Available Weight: <strong>{plan.available_weight} kg</strong>
                        </Typography>
                        {plan.notes && (
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            Notes: {plan.notes}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={4} sx={{ textAlign: 'right' }}>
                        <Chip 
                          label={plan.status || 'Active'} 
                          color={plan.status === 'completed' ? 'success' : 'primary'} 
                          size="small" 
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="caption" display="block" color="text.secondary">
                          Posted on {new Date(plan.created_at).toLocaleDateString()}
                        </Typography>
                        <Button 
                          variant="outlined" 
                          size="small" 
                          sx={{ mt: 1 }}
                        >
                          View Details
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                You haven't posted any travel plans yet.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<FlightTakeoff />}
                sx={{ mt: 2 }}
                href="/travel-request"
              >
                Post a Travel Plan
              </Button>
            </Box>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Item Requests History
          </Typography>
          
          {historyLoading ? (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <CircularProgress />
            </Box>
          ) : requestHistory.length > 0 ? (
            <Grid container spacing={2}>
              {requestHistory.map((request, index) => (
                <Grid item xs={12} key={index}>
                  <Paper elevation={1} sx={{ 
                    p: 3, 
                    borderRadius: '12px',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                    }
                  }}>
                    <Grid container alignItems="center">
                      <Grid item xs={12} sm={8}>
                        <Typography variant="h6" gutterBottom>
                          {request.item_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          From: {request.from_city} • To: {request.to_city}
                        </Typography>
                        <Typography variant="body2">
                          Weight: <strong>{request.item_weight} kg</strong> • 
                          Value: <strong>${request.item_value}</strong>
                        </Typography>
                        {request.item_description && (
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            Description: {request.item_description}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={4} sx={{ textAlign: 'right' }}>
                        <Chip 
                          label={request.status || 'Pending'} 
                          color={request.status === 'completed' ? 'success' : 'secondary'} 
                          size="small" 
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="caption" display="block" color="text.secondary">
                          Posted on {new Date(request.created_at).toLocaleDateString()}
                        </Typography>
                        <Button 
                          variant="outlined" 
                          size="small" 
                          sx={{ mt: 1 }}
                        >
                          View Details
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                You haven't posted any item requests yet.
              </Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                startIcon={<LocalShipping />}
                sx={{ mt: 2 }}
                href="/travel-request"
              >
                Request an Item
              </Button>
            </Box>
          )}
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Profile;
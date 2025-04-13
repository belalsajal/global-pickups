import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  FormGroup,
  Divider,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import {
  Notifications,
  Lock,
  Delete,
  Visibility,
  VisibilityOff,
  Email,
  Security,
  Language,
  CreditCard,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { supabase } from '../supabase';

const Settings = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  
  // Settings states
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    language: 'English',
    currency: 'USD'
  });
  
  // Password change states
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  useEffect(() => {
    fetchUserData();
  }, []);
  
  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('No user found');
      }
      
      setUser(user);
      
      // Fetch user settings
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (data) {
        setSettings({
          emailNotifications: data.email_notifications ?? true,
          pushNotifications: data.push_notifications ?? true,
          marketingEmails: data.marketing_emails ?? false,
          language: data.language || 'English',
          currency: data.currency || 'USD'
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load user settings');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSettingChange = (event) => {
    const { name, checked, value } = event.target;
    
    // For switches (boolean values)
    if (typeof checked !== 'undefined') {
      setSettings({
        ...settings,
        [name]: checked
      });
    } 
    // For text fields
    else {
      setSettings({
        ...settings,
        [name]: value
      });
    }
  };
  
  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value
    });
  };
  
  const togglePasswordVisibility = (field) => {
    switch (field) {
      case 'current':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };
  
  const saveSettings = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user.id,
          email_notifications: settings.emailNotifications,
          push_notifications: settings.pushNotifications,
          marketing_emails: settings.marketingEmails,
          language: settings.language,
          currency: settings.currency,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });
      
      if (error) throw error;
      
      setSuccess('Settings saved successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setError('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  
  const updatePassword = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      
      // Validate passwords
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        setError('New passwords do not match');
        setSaving(false);
        return;
      }
      
      if (passwordForm.newPassword.length < 6) {
        setError('Password must be at least 6 characters');
        setSaving(false);
        return;
      }
      
      // Update password using Supabase Auth
      const { error } = await supabase.auth.updateUser({
        password: passwordForm.newPassword
      });
      
      if (error) throw error;
      
      setSuccess('Password updated successfully!');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (error) {
      console.error('Error updating password:', error);
      setError('Failed to update password. Please check your current password and try again.');
    } finally {
      setSaving(false);
    }
  };
  
  const handleDeleteAccount = async () => {
    try {
      setSaving(true);
      setError(null);
      
      // In a real app, you'd want to add more verification steps
      // and possibly queue this for admin approval
      
      // For demo purposes, we'll just close the dialog
      setOpenDeleteDialog(false);
      setSuccess('Account deletion request submitted. Our team will contact you to confirm.');
    } catch (error) {
      console.error('Error deleting account:', error);
      setError('Failed to process account deletion request.');
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading settings...
        </Typography>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
        Account Settings
      </Typography>
      
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
      
      <Grid container spacing={4}>
        {/* Left side - Settings navigation */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={3} 
            sx={{ 
              borderRadius: '16px',
              overflow: 'hidden'
            }}
          >
            <List component="nav">
              <ListItem 
                selected 
                sx={{ 
                  bgcolor: 'primary.main', 
                  color: 'white',
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    fontWeight: 'bold'
                  }
                }}
              >
                <ListItemIcon>
                  <SettingsIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="General Settings" />
              </ListItem>
              
              <ListItem button>
                <ListItemIcon>
                  <Notifications />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItem>
              
              <ListItem button>
                <ListItemIcon>
                  <Lock />
                </ListItemIcon>
                <ListItemText primary="Privacy & Security" />
              </ListItem>
              
              <ListItem button>
                <ListItemIcon>
                  <Language />
                </ListItemIcon>
                <ListItemText primary="Language & Region" />
              </ListItem>
              
              <ListItem button>
                <ListItemIcon>
                  <CreditCard />
                </ListItemIcon>
                <ListItemText primary="Payment Methods" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        {/* Right side - Settings content */}
        <Grid item xs={12} md={8}>
          {/* General Settings Section */}
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              borderRadius: '16px',
              mb: 4,
              position: 'relative',
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
            }}
          >
            <Typography variant="h6" gutterBottom>
              Notification Preferences
            </Typography>
            
            <FormGroup>
              <FormControlLabel 
                control={
                  <Switch 
                    checked={settings.emailNotifications} 
                    onChange={handleSettingChange} 
                    name="emailNotifications" 
                    color="primary"
                  />
                } 
                label="Email Notifications" 
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
                Receive updates about travel plans, item requests, and matches via email
              </Typography>
              
              <FormControlLabel 
                control={
                  <Switch 
                    checked={settings.pushNotifications} 
                    onChange={handleSettingChange} 
                    name="pushNotifications" 
                    color="primary"
                  />
                } 
                label="Push Notifications" 
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
                Receive real-time notifications within the app
              </Typography>
              
              <FormControlLabel 
                control={
                  <Switch 
                    checked={settings.marketingEmails} 
                    onChange={handleSettingChange} 
                    name="marketingEmails" 
                    color="primary"
                  />
                } 
                label="Marketing Emails" 
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
                Receive occasional updates about new features, promotions, and tips
              </Typography>
            </FormGroup>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" gutterBottom>
              Regional Settings
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Language"
                  name="language"
                  value={settings.language}
                  onChange={handleSettingChange}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Chinese">Chinese</option>
                </TextField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Currency"
                  name="currency"
                  value={settings.currency}
                  onChange={handleSettingChange}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                  <option value="CAD">CAD ($)</option>
                </TextField>
              </Grid>
            </Grid>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button 
                variant="contained"
                onClick={saveSettings}
                disabled={saving}
                startIcon={saving ? <CircularProgress size={20} /> : null}
              >
                {saving ? 'Saving...' : 'Save Settings'}
              </Button>
            </Box>
          </Paper>
          
          {/* Security Section */}
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              borderRadius: '16px',
              mb: 4,
              position: 'relative',
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
            }}
          >
            <Typography variant="h6" gutterBottom>
              Security
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Change Password
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => togglePasswordVisibility('current')}
                          edge="end"
                        >
                          {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                      startAdornment: <Lock sx={{ color: 'action.active', mr: 1 }} />
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="New Password"
                    type={showNewPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => togglePasswordVisibility('new')}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      )
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => togglePasswordVisibility('confirm')}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      )
                    }}
                  />
                </Grid>
              </Grid>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button 
                  variant="contained"
                  onClick={updatePassword}
                  disabled={
                    saving || 
                    !passwordForm.currentPassword || 
                    !passwordForm.newPassword || 
                    !passwordForm.confirmPassword
                  }
                  startIcon={saving ? <CircularProgress size={20} /> : <Security />}
                >
                  Update Password
                </Button>
              </Box>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom color="error">
                Danger Zone
              </Typography>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                Once you delete your account, there is no going back. This action cannot be undone.
              </Typography>
              
              <Button 
                variant="outlined" 
                color="error"
                startIcon={<Delete />}
                onClick={() => setOpenDeleteDialog(true)}
              >
                Delete Account
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Delete Account Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle sx={{ color: 'error.main' }}>
          Delete Your Account?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. All your data, including travel plans, item requests, 
            and messages will be permanently deleted.
          </DialogContentText>
          <DialogContentText sx={{ mt: 2, fontWeight: 'bold' }}>
            Are you absolutely sure you want to delete your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteAccount} 
            color="error"
            startIcon={saving ? <CircularProgress size={20} /> : <Delete />}
            disabled={saving}
          >
            {saving ? 'Processing...' : 'Yes, Delete My Account'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Settings;
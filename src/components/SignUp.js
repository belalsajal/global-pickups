import React, { useState } from 'react';
import { 
  Box, Container, TextField, Button, Typography, 
  Paper, Alert, CircularProgress, Link, 
  Stepper, Step, StepLabel, Grid, Checkbox, FormControlLabel,
  Avatar, InputAdornment, StepConnector, styled, IconButton,
  LinearProgress
} from '@mui/material';
import { 
  Email, Lock, Person, Description, Check,
  Visibility, VisibilityOff, PersonAdd, Phone
} from '@mui/icons-material';
import { supabase } from '../supabase';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
// Import ApiService
import apiService from '../services/apiService';

// Custom styled step connector with gradient
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.MuiStepConnector-alternativeLabel`]: {
    top: 22,
  },
  [`&.MuiStepConnector-active`]: {
    [`& .MuiStepConnector-line`]: {
      backgroundImage: 'linear-gradient(90deg, #4681f4 0%, #3662ea 100%)',
    },
  },
  [`&.MuiStepConnector-completed`]: {
    [`& .MuiStepConnector-line`]: {
      backgroundImage: 'linear-gradient(90deg, #4681f4 0%, #3662ea 100%)',
    },
  },
  [`& .MuiStepConnector-line`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

// Custom styled step icon
const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  zIndex: 1,
  color: '#fff',
  width: 45,
  height: 45,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient(90deg, #4681f4 0%, #3662ea 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient(90deg, #4681f4 0%, #3662ea 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;
  const icons = {
    1: <Email />,
    2: <Person />,
    3: <Check />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const SignUp = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    termsAccepted: false,
    role: 'requester' // Default role
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the role from URL query parameters
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    if (roleParam && ['traveler', 'requester'].includes(roleParam)) {
      setFormData(prev => ({ ...prev, role: roleParam }));
    }
  }, [location]);

  const steps = ['Account Details', 'Security', 'Additional Info'];

  const handleNext = () => {
    // Validate current step before proceeding
    if (activeStep === 0) {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        setError("Please fill in all required fields");
        return;
      }
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address");
        return;
      }
    } else if (activeStep === 1) {
      if (!formData.password || !formData.confirmPassword) {
        setError("Please fill in all required fields");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords don't match");
        return;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }
    }

    setError(null);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setError(null);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'password') {
      // Calculate password strength
      let strength = 0;
      if (value.length >= 8) strength += 25;
      if (/[A-Z]/.test(value)) strength += 25;
      if (/[0-9]/.test(value)) strength += 25;
      if (/[^A-Za-z0-9]/.test(value)) strength += 25;
      setPasswordStrength(strength);
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (!formData.termsAccepted) {
      setError("You must accept the terms and conditions");
      return;
    }
    
    setLoading(true);
    try {
      // Sign up using ApiService
      const response = await apiService.signUp({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        role: formData.role,
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      // Check if email confirmation is enabled
      if (response.data && response.data.user && !response.data.user.confirmed_at) {
        setShowVerificationMessage(true);
      } else {
        navigate('/login');
      }
    } catch (error) {
      setError(error.message || "An error occurred during signup");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    try {
      setResendSuccess(false);
      setResendError(null);
      
      const { error } = await apiService.resendVerification({ email: formData.email });
      
      if (error) {
        setResendError(error.message);
      } else {
        setResendSuccess(true);
      }
    } catch (err) {
      setResendError('Failed to resend verification email');
      console.error(err);
    }
  };

  if (showVerificationMessage) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          py: 2,
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 3,
            borderRadius: '10px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
            maxWidth: '400px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Check Your Email
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            We've sent a verification email to <strong>{formData.email}</strong>. Please check your inbox and click the verification link to activate your account.
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            If you don't see the email, please check your spam folder.
          </Typography>
          <Button
            onClick={handleResendEmail}
            variant="contained"
            sx={{
              mb: 2,
              background: 'linear-gradient(90deg, #4681f4 0%, #3662ea 100%)',
              '&:hover': {
                background: 'linear-gradient(90deg, #5590ff 0%, #4671f5 100%)',
              },
            }}
          >
            Resend Verification Email
          </Button>
          {resendSuccess && (
            <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
              Verification email has been resent!
            </Typography>
          )}
          {resendError && (
            <Typography variant="body2" color="error.main" sx={{ mt: 1 }}>
              {resendError}
            </Typography>
          )}
          <Box sx={{ mt: 2 }}>
            <Link component={RouterLink} to="/login" variant="body2">
              Back to Login
            </Link>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 2,
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          backgroundColor: 'rgba(70, 129, 244, 0.05)',
          top: '-150px',
          right: '-150px',
          zIndex: 0
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          backgroundColor: 'rgba(245, 124, 0, 0.05)',
          bottom: '-100px',
          left: '-100px',
          zIndex: 0
        }
      }}
    >
      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1, maxWidth: '280px' }}>
        <Box sx={{ textAlign: 'center', mb: 1 }}>
          <Typography 
            component="h1" 
            variant="h6"
            sx={{ 
              fontWeight: 700,
              color: '#1A3C5E',
              mb: 0.25,
              fontSize: '1rem'
            }}
          >
            Create {formData.role === 'traveler' ? 'Traveler' : 'Requester'} Account
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ maxWidth: '220px', mx: 'auto', fontSize: '0.75rem' }}
          >
            {formData.role === 'traveler' 
              ? 'Share your trips and earn by delivering items' 
              : 'Find travelers to transport your items across the globe'}
          </Typography>
        </Box>

        <Paper
          elevation={4}
          sx={{ 
            p: 1.5,
            borderRadius: '10px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
            background: `linear-gradient(145deg, #ffffff 0%, #f8faff 100%)`,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '4px',
              background: 'linear-gradient(90deg, #4681f4 0%, rgba(54, 98, 234, 0.5) 100%)',
              borderRadius: '4px 4px 0 0'
            }
          }}
        >
          <Stepper 
            activeStep={activeStep} 
            alternativeLabel 
            connector={<ColorlibConnector />}
            sx={{ mb: 1, '& .MuiStepLabel-label': { fontSize: '0.7rem' } }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 2, borderRadius: 1, py: 0, fontSize: '0.75rem' }}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {activeStep === 0 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleChange}
                  autoFocus
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person fontSize="small" sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    mb: 1,
                    '& .MuiInputBase-root': {
                      borderRadius: 2,
                      fontSize: '0.8rem'
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '0.8rem'
                    }
                  }}
                />
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person fontSize="small" sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    mb: 1,
                    '& .MuiInputBase-root': {
                      borderRadius: 2,
                      fontSize: '0.8rem'
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '0.8rem'
                    }
                  }}
                />
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email fontSize="small" sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    mb: 1,
                    '& .MuiInputBase-root': {
                      borderRadius: 2,
                      fontSize: '0.8rem'
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '0.8rem'
                    }
                  }}
                />
              </motion.div>
            )}

            {activeStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock fontSize="small" sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  sx={{ 
                    mb: 1,
                    '& .MuiInputBase-root': {
                      borderRadius: 2,
                      fontSize: '0.8rem'
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '0.8rem'
                    }
                  }}
                />
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock fontSize="small" sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                          size="small"
                        >
                          {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  sx={{ 
                    mb: 1,
                    '& .MuiInputBase-root': {
                      borderRadius: 2,
                      fontSize: '0.8rem'
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '0.8rem'
                    }
                  }}
                />
                <Box sx={{ mt: 1, mb: 0.5 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={passwordStrength} 
                    sx={{
                      height: 4,
                      borderRadius: 2,
                      mb: 0.5,
                      bgcolor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: passwordStrength < 33 ? '#f44336' : passwordStrength < 66 ? '#ff9800' : '#4caf50',
                      }
                    }} 
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                    Password Strength: {passwordStrength < 33 ? 'Weak' : passwordStrength < 66 ? 'Medium' : 'Strong'}
                  </Typography>
                </Box>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                <TextField
                  margin="dense"
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone fontSize="small" sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    mb: 1,
                    '& .MuiInputBase-root': {
                      borderRadius: 2,
                      fontSize: '0.8rem'
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '0.8rem'
                    }
                  }}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.termsAccepted}
                      onChange={handleCheckboxChange}
                      name="termsAccepted"
                      color="primary"
                      size="small"
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                      I agree to the{' '}
                      <Link component="button" variant="body2" sx={{ fontSize: '0.75rem' }} onClick={() => console.log('Terms clicked')}>
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link component="button" variant="body2" sx={{ fontSize: '0.75rem' }} onClick={() => console.log('Privacy clicked')}>
                        Privacy Policy
                      </Link>
                    </Typography>
                  }
                  sx={{ mb: 1 }}
                />
              </motion.div>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                sx={{ 
                  borderRadius: 2,
                  fontSize: '0.7rem',
                  py: 0.5,
                  px: 1,
                  minWidth: '70px',
                  borderColor: '#4681f4',
                  color: '#4681f4',
                  '&:hover': {
                    borderColor: '#3662ea',
                    backgroundColor: 'rgba(70, 129, 244, 0.04)'
                  }
                }}
              >
                Back
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ 
                    borderRadius: 2,
                    background: 'linear-gradient(90deg, #4681f4 0%, #3662ea 100%)',
                    boxShadow: '0 4px 10px rgba(70, 129, 244, 0.25)',
                    '&:hover': {
                      boxShadow: '0 6px 15px rgba(70, 129, 244, 0.3)',
                      background: 'linear-gradient(90deg, #5590ff 0%, #4671f5 100%)'
                    },
                    py: 0.5,
                    px: 1,
                    minWidth: '70px',
                    fontSize: '0.7rem'
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ 
                    borderRadius: 2,
                    background: 'linear-gradient(90deg, #4681f4 0%, #3662ea 100%)',
                    boxShadow: '0 4px 10px rgba(70, 129, 244, 0.25)',
                    '&:hover': {
                      boxShadow: '0 6px 15px rgba(70, 129, 244, 0.3)',
                      background: 'linear-gradient(90deg, #5590ff 0%, #4671f5 100%)'
                    },
                    py: 0.5,
                    px: 1,
                    minWidth: '70px',
                    fontSize: '0.7rem'
                  }}
                >
                  Continue
                </Button>
              )}
            </Box>
          </form>

          <Box sx={{ mt: 1.5, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
              Already have an account?{' '}
              <Link component={RouterLink} to="/login" variant="body2" sx={{ fontWeight: 500, fontSize: '0.75rem' }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUp;
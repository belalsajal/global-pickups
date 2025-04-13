import React, { useState } from 'react';
import { 
  Box, Container, TextField, Button, Typography, 
  Paper, Alert, CircularProgress, Link, 
  Avatar, InputAdornment, IconButton, Divider
} from '@mui/material';
import { 
  Email, Lock, Visibility, VisibilityOff, 
  Login as LoginIcon, AdminPanelSettings
} from '@mui/icons-material';
import { supabase } from '../supabase';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Define MotionPaper outside of the component to prevent re-animations
const MotionPaper = motion(Paper);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Admin bypass for testing
    if (email === 'admin@test.com' && password === 'admin123') {
      // Store admin user in local storage
      localStorage.setItem('adminUser', JSON.stringify({
        id: 'admin-123',
        email: 'admin@test.com',
        role: 'admin',
        name: 'Admin User'
      }));
      
      // Navigate to dashboard
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 500);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Successful login
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'Invalid login credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Demo login handler
  const handleDemoAdminLogin = () => {
    setEmail('admin@test.com');
    setPassword('admin123');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 8 }}>
        <MotionPaper
          elevation={3}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ p: 4 }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LoginIcon />
            </Avatar>
            <Typography component="h1" variant="h5" gutterBottom>
              Sign in to Global Pickups
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Connect with travelers and send items worldwide
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>

            <Divider sx={{ my: 2 }}>or</Divider>

            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              startIcon={<AdminPanelSettings />}
              onClick={handleDemoAdminLogin}
              sx={{ mb: 2 }}
            >
              Demo Admin Login
            </Button>

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Link component={RouterLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Box>
          </Box>
        </MotionPaper>
      </Box>
    </Container>
  );
};

export default Login;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/dashboard';
import LandingPage from './components/LandingPage';
import NavBar from './components/NavBar/NavBar'; // Import the new NavBar component
import Login from './components/Login';
import SignUp from './components/SignUp';
import VerificationPage from './components/VerificationPage'; // Import the new VerificationPage component
import AddTravelPlan from './components/AddTravelPlan';
import RequestItem from './components/RequestItem';
import TravelAndRequestTabs from './components/TravelAndRequestTabs';
import About from './components/About';
import FAQ from './components/FAQ'; // Import the new FAQ component
import Services from './components/Services'; // Import the Services component
import Pricing from './components/Pricing/Pricing'; // Import the new Pricing component
import Privacy from './components/Privacy'; // Import the new Privacy component
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { supabase } from './supabase';

// Import the v2 logo
import v2Logo from './assets/images/v2.png';

// Check if mock API mode is enabled
const useMockApi = process.env.REACT_APP_USE_MOCK_API === 'true';

// Create a theme with the new color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#6d8ec5', // Lake Blue as primary color
      light: '#8ba6d3', // Lighter shade of Lake Blue
      dark: '#5775aa', // Darker shade of Lake Blue
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#d3622c', // Flame as secondary color
      light: '#e07e50', // Lighter shade of Flame
      dark: '#b14c1e', // Darker shade of Flame
      contrastText: '#ffffff',
    },
    background: {
      default: '#f0eadc', // Eggshell as default background
      paper: '#ffffff',
    },
    text: {
      primary: '#333333', // Dark gray for primary text
      secondary: '#576238', // Moss for secondary text
    },
    error: {
      main: '#d32f2f', // Keep standard error color
    },
    success: {
      main: '#576238', // Moss for success color
    },
    warning: {
      main: '#f0c845', // Saffron for warnings
      light: '#ffd95d', // Mustard for light warning
    },
    info: {
      main: '#6d8ec5', // Lake Blue for info
    },
    // Custom colors for specific components
    custom: {
      lakeBlue: '#6d8ec5',
      flame: '#d3622c',
      saffron: '#f0c845',
      moss: '#576238',
      mustard: '#ffd95d',
      eggshell: '#f0eadc',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Arial', sans-serif",
    h1: {
      fontFamily: "'Montserrat', 'Inter', sans-serif",
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h2: {
      fontFamily: "'Montserrat', 'Inter', sans-serif",
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h3: {
      fontFamily: "'Montserrat', 'Inter', sans-serif",
      fontWeight: 700,
      letterSpacing: '-0.3px',
    },
    h4: {
      fontFamily: "'Montserrat', 'Inter', sans-serif",
      fontWeight: 700,
      letterSpacing: '-0.2px',
    },
    h5: {
      fontFamily: "'Montserrat', 'Inter', sans-serif",
      fontWeight: 600,
    },
    h6: {
      fontFamily: "'Montserrat', 'Inter', sans-serif",
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      fontSize: '0.9375rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#5775aa', // Darker Lake Blue
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: '#b14c1e', // Darker Flame
          },
        },
        outlined: {
          borderColor: '#6d8ec5', // Lake Blue
          '&:hover': {
            borderColor: '#5775aa', // Darker Lake Blue
            backgroundColor: 'rgba(109, 142, 197, 0.08)', // Very light Lake Blue
          }
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(109, 142, 197, 0.08)', // Very light Lake Blue
          }
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
          backgroundColor: '#ffffff',
          borderTop: '3px solid #6d8ec5', // Lake Blue accent
          '&:hover': {
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
          }
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&.Mui-focused fieldset': {
              borderColor: '#6d8ec5', // Lake Blue border when focused
            },
            '&:hover fieldset': {
              borderColor: '#5775aa', // Darker Lake Blue on hover
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#6d8ec5', // Lake Blue label when focused
          }
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          backgroundImage: 'linear-gradient(rgba(240, 234, 220, 0.05), rgba(240, 234, 220, 0.05))', // Subtle eggshell tint
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#333333',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
          backgroundImage: 'linear-gradient(90deg, rgba(109, 142, 197, 0.08), rgba(211, 98, 44, 0.03))', // Subtle gradient
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#d3622c', // Flame color for tab indicator
          height: 3,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#d3622c', // Flame color for selected tab
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#f0eadc', // Eggshell
          '&.MuiChip-colorPrimary': {
            backgroundColor: 'rgba(109, 142, 197, 0.15)', // Light Lake Blue
            color: '#5775aa', // Darker Lake Blue
          },
          '&.MuiChip-colorSecondary': {
            backgroundColor: 'rgba(211, 98, 44, 0.15)', // Light Flame
            color: '#b14c1e', // Darker Flame
          },
          '&.MuiChip-colorSuccess': {
            backgroundColor: 'rgba(87, 98, 56, 0.15)', // Light Moss
            color: '#576238', // Moss
          },
          '&.MuiChip-colorWarning': {
            backgroundColor: 'rgba(240, 200, 69, 0.15)', // Light Saffron
            color: '#d9b130', // Darker Saffron
          },
        },
      },
    },
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If mock API is enabled, use a mock user or set loading to false directly
    if (useMockApi) {
      // Option 1: Set a mock user for testing
      // setUser({ id: 'mock-user-id', email: 'mock@example.com', name: 'Mock User' });
      
      // Option 2: Just disable loading state without setting a user
      setLoading(false);
      
      return; // Skip the real authentication with Supabase
    }
    
    // Check for active session on component mount
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Fetch user profile data from your database
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        setUser(profile || session.user);
      }
      
      setLoading(false);
    };
    
    checkUser();
    
    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Fetch user profile after sign in
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          setUser(profile || session.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );
    
    // Clean up subscription on unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    if (useMockApi) {
      setUser(null);
      return;
    }
    
    await supabase.auth.signOut();
    setUser(null);
  };

  // Simple route protection component
  const ProtectedRoute = ({ children }) => {
    if (loading) return <div>Loading...</div>;
    
    // In mock API mode, allow access to protected routes for testing
    if (useMockApi && !user) {
      return children;
    }
    
    if (!user) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <NavBar />
          
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={
                user ? <Navigate to="/dashboard" replace /> : <LandingPage />
              } />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/login" element={
                user ? <Navigate to="/dashboard" replace /> : <Login />
              } />
              
              <Route path="/signup" element={
                user ? <Navigate to="/dashboard" replace /> : <SignUp />
              } />
              
              <Route path="/verification" element={<VerificationPage />} />
              
              <Route path="/about" element={<About />} />
              
              <Route path="/faq" element={<FAQ />} />
              
              <Route path="/services" element={<Services />} />
              
              <Route path="/pricing" element={<Pricing />} />
              
              <Route path="/privacy" element={<Privacy />} />
              
              <Route path="/add-travel-plan" element={
                <ProtectedRoute>
                  <AddTravelPlan />
                </ProtectedRoute>
              } />
              
              <Route path="/request-item" element={
                <ProtectedRoute>
                  <RequestItem />
                </ProtectedRoute>
              } />
              
              <Route path="/travel-request" element={
                <ProtectedRoute>
                  <TravelAndRequestTabs />
                </ProtectedRoute>
              } />
              
              <Route path="/travel-plans" element={
                <ProtectedRoute>
                  <div>Travel Plans Page (Coming Soon)</div>
                </ProtectedRoute>
              } />
              
              <Route path="/item-requests" element={
                <ProtectedRoute>
                  <div>Item Requests Page (Coming Soon)</div>
                </ProtectedRoute>
              } />
              
              <Route path="/messages" element={
                <ProtectedRoute>
                  <div>Messages Page (Coming Soon)</div>
                </ProtectedRoute>
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <div>Profile Page (Coming Soon)</div>
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute>
                  <div>Settings Page (Coming Soon)</div>
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography,
  Paper, useTheme, alpha, useMediaQuery,
  Snackbar, Alert, IconButton, Tooltip, Button
} from '@mui/material';
import { 
  Flight, ErrorOutline, CheckCircleOutline, 
  Refresh, LocalShipping
} from '@mui/icons-material';
import RequestItem from './RequestItem';
import AddTravelPlan from './AddTravelPlan';
import { checkServerStatus } from '../utils/apiHelper';

// TabPanel component to handle tab content display
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
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const TravelAndRequestTabs = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [serverStatus, setServerStatus] = useState({ online: false, checking: true });
  const [showStatusAlert, setShowStatusAlert] = useState(false);

  const handleTabChange = (event, newValue) => {
    // Prevent animations when changing tabs by directly updating the state
    setTabValue(newValue);
  };

  const checkServerStatus = async () => {
    setServerStatus(prev => ({ ...prev, checking: true }));
    try {
      // Use our API helper utility with built-in mock fallback
      const response = await checkServerStatus();
      
      // The API helper will return mock data if the real API is unreachable
      setServerStatus({ 
        online: true, 
        checking: false,
        isMock: response.message && response.message.includes('Mock')
      });
      
      // Only show status alert if it's a real connection or first mock connection
      if (!response.message || !response.message.includes('Mock') || process.env.NODE_ENV === 'development') {
        setShowStatusAlert(true);
      }
    } catch (error) {
      console.error('Server check failed completely:', error);
      setServerStatus({ online: false, checking: false });
      setShowStatusAlert(true);
    }
  };

  useEffect(() => {
    // In development, delay the initial check to avoid affecting the initial page load
    const initialCheckDelay = process.env.NODE_ENV === 'development' ? 2000 : 0;
    
    const initialCheckTimeout = setTimeout(() => {
      checkServerStatus();
    }, initialCheckDelay);
    
    // Set up periodic checks, but with a longer interval in development
    const checkInterval = process.env.NODE_ENV === 'development' ? 600000 : 300000; // 10 min dev, 5 min prod
    const interval = setInterval(checkServerStatus, checkInterval);
    
    return () => {
      clearTimeout(initialCheckTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <Container maxWidth="lg" sx={{ 
      py: 4,
      animation: 'fadeIn 0.8s ease-out',
      '@keyframes fadeIn': {
        '0%': { opacity: 0, transform: 'translateY(15px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' }
      }
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Tooltip title="Check server status">
          <IconButton 
            onClick={checkServerStatus} 
            color={serverStatus.online ? "success" : "error"}
            sx={{ opacity: serverStatus.checking ? 0.5 : 1 }}
            disabled={serverStatus.checking}
          >
            {serverStatus.checking ? (
              <Refresh sx={{ animation: 'spin 1.5s linear infinite', '@keyframes spin': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } } }} />
            ) : serverStatus.online ? (
              <CheckCircleOutline />
            ) : (
              <ErrorOutline />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      <Typography 
        variant="h3" 
        component="h1" 
        align="center" 
        gutterBottom
        sx={{ 
          fontWeight: 700,
          mb: 4,
          color: theme.palette.primary.main,
          fontFamily: 'Montserrat, Poppins, sans-serif',
          position: 'relative',
          textShadow: '0px 1px 2px rgba(0,0,0,0.05)',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -10,
            left: '50%',
            width: '80px',
            height: '4px',
            backgroundColor: theme.palette.secondary.main,
            transform: 'translateX(-50%)',
            borderRadius: '2px'
          }
        }}
      >
        Global Pickups
      </Typography>
      
      <Typography 
        variant="h6" 
        color="text.secondary" 
        align="center" 
        sx={{ 
          mb: 5,
          maxWidth: '800px',
          mx: 'auto',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 400,
          lineHeight: 1.6
        }}
      >
        Connect with travelers worldwide to request items or offer your travel space
      </Typography>
      
      <Paper 
        elevation={4} 
        sx={{ 
          borderRadius: '16px',
          overflow: 'hidden',
          mb: 6,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
          },
          background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(250,250,255,0.95) 100%)',
          backdropFilter: 'blur(10px)'
        }}
      >
        {/* Unified Tab Design */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            gap: '10px', 
            p: 3,
            flexDirection: { xs: 'column', sm: 'row' }
          }}
        >
          <Button 
            startIcon={
              <Flight 
                sx={{ 
                  color: tabValue === 0 ? '#FFFFFF' : '#A9A9A9',
                  fontSize: '20px'
                }} 
              />
            } 
            onClick={() => handleTabChange(null, 0)}
            sx={{
              width: '200px',
              height: '40px',
              borderRadius: '20px',
              textTransform: 'none',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 500,
              fontSize: '16px',
              boxShadow: tabValue === 0 ? '0 2px 6px rgba(0, 0, 0, 0.1)' : 'none',
              backgroundColor: tabValue === 0 ? '#4A90E2' : '#F5F7FA',
              color: tabValue === 0 ? '#FFFFFF' : '#A9A9A9',
              '&:hover': {
                backgroundColor: tabValue === 0 ? '#4A90E2' : '#A3CFFA',
                color: tabValue === 0 ? '#FFFFFF' : '#4A90E2',
                transform: 'translateY(-2px)',
                transition: 'all 0.3s'
              },
              transition: 'all 0.3s'
            }}
          >
            Post Travel Plan
          </Button>
          
          <Button 
            startIcon={
              <LocalShipping 
                sx={{ 
                  color: tabValue === 1 ? '#FFFFFF' : '#A9A9A9',
                  fontSize: '20px'
                }}
              />
            } 
            onClick={() => handleTabChange(null, 1)}
            sx={{
              width: '200px',
              height: '40px',
              borderRadius: '20px',
              textTransform: 'none',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 500,
              fontSize: '16px',
              boxShadow: tabValue === 1 ? '0 2px 6px rgba(0, 0, 0, 0.1)' : 'none',
              backgroundColor: tabValue === 1 ? '#4A90E2' : '#F5F7FA',
              color: tabValue === 1 ? '#FFFFFF' : '#A9A9A9',
              '&:hover': {
                backgroundColor: tabValue === 1 ? '#4A90E2' : '#A3CFFA',
                color: tabValue === 1 ? '#FFFFFF' : '#4A90E2',
                transform: 'translateY(-2px)',
                transition: 'all 0.3s'
              },
              transition: 'all 0.3s'
            }}
          >
            Request Item
          </Button>
        </Box>
        
        <Box sx={{ px: { xs: 2, md: 3 } }}>
          <TabPanel value={tabValue} index={0}>
            <AddTravelPlan />
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            <RequestItem />
          </TabPanel>
        </Box>
      </Paper>

      <Snackbar 
        open={showStatusAlert} 
        autoHideDuration={6000} 
        onClose={() => setShowStatusAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowStatusAlert(false)} 
          severity={serverStatus.online ? "success" : "error"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {serverStatus.online 
            ? (serverStatus.isMock 
                ? "Using mock data - backend server not detected" 
                : "Server is running properly")
            : "Server connection issue - some features may be unavailable"}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TravelAndRequestTabs;
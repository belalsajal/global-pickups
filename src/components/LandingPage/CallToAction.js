import React from 'react';
import { 
  Box, Container, Grid, Typography, Button 
} from '@mui/material';
import { 
  FlightTakeoff, Public 
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const CallToAction = () => {
  return (
    <Box 
      sx={{ 
        py: { xs: 8, md: 10 },
        background: 'linear-gradient(135deg, #1A3C5E 0%, #2c5282 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/images/world-map-dots.svg")',
          backgroundSize: 'cover',
          opacity: 0.1,
          zIndex: 1
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography 
              variant="h2" 
              component="h2" 
              fontWeight={700} 
              sx={{ 
                mb: 2,
                fontSize: { xs: '2.2rem', md: '3rem' },
                background: 'linear-gradient(90deg, #ffffff 0%, #e0e0e0 100%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Ready to Transform Your Travel Experience?
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 4,
                opacity: 0.9,
                maxWidth: '600px',
                lineHeight: 1.6
              }}
            >
              Join our global community today and discover a new way to travel and connect. 
              Save money, help others, and make meaningful connections around the world.
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: '50%', 
                  bgcolor: 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2
                }}>
                  <FlightTakeoff sx={{ color: '#6d8ec5' }} />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={600}>20,000+</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>Active Travelers</Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: '50%', 
                  bgcolor: 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2
                }}>
                  <Public sx={{ color: '#f0c845' }} />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={600}>150+</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>Countries Covered</Typography>
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Button 
                variant="contained" 
                size="large" 
                component={RouterLink}
                to="/signup"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  bgcolor: '#f57c00',
                  color: 'white',
                  borderRadius: 2,
                  fontWeight: 600,
                  boxShadow: '0 8px 20px rgba(245, 124, 0, 0.3)',
                  '&:hover': {
                    bgcolor: '#e65100',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 25px rgba(245, 124, 0, 0.4)'
                  },
                  transition: 'all 0.3s'
                }}
              >
                Sign Up Now
              </Button>
              
              <Button 
                variant="outlined" 
                size="large" 
                component={RouterLink}
                to="/how-it-works"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderColor: 'rgba(255,255,255,0.5)',
                  color: 'white',
                  borderRadius: 2,
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Learn How It Works
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box 
              sx={{ 
                position: 'relative',
                height: '400px',
                width: '100%',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: '300px',
                  height: '300px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1
                }
              }}
            >
              <Box 
                component="img"
                src="/images/globe-connections.png" 
                alt="Global connections"
                sx={{ 
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '90%',
                  maxWidth: '400px',
                  filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.3))'
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CallToAction;
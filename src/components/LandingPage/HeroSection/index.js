import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
// Update to use the original heroImage.png filename
import heroImage from '../../../assets/images/heroImage.png';

const HeroSection = () => {
  // Add state to force image refresh
  const [imageKey, setImageKey] = useState(Date.now());
  
  // Force a refresh of the image when component mounts
  useEffect(() => {
    setImageKey(Date.now());
  }, []);
  
  return (
    <Box 
      sx={{ 
        backgroundColor: '#f5f5f5',
        padding: '50px 0',
        textAlign: 'center'
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <h1>Welcome to Global Pickups</h1>
        <p>Connecting travelers with delivery requesters worldwide.</p>
        
        {/* Hero Image with key for forced refresh */}
        <Box
          sx={{
            mt: { xs: 4, md: 0 },
            display: 'flex',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <Box
            component="img"
            key={imageKey}  // Add key to force re-render
            src={heroImage}
            alt="Global Pickups - Connect travelers with delivery requesters"
            sx={{
              maxWidth: '100%',
              height: 'auto',
              maxHeight: { xs: '300px', sm: '400px', md: '500px' },
              objectFit: 'contain',
              filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.15))',
              animation: 'float 6s ease-in-out infinite',
              '@keyframes float': {
                '0%': {
                  transform: 'translateY(0px)'
                },
                '50%': {
                  transform: 'translateY(-15px)'
                },
                '100%': {
                  transform: 'translateY(0px)'
                }
              }
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
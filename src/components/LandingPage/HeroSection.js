import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { MotionBox, MotionTypography } from '../shared/MotionComponents';
// Fix the import path to correctly reference the image
import heroImage from '../../assets/images/hnn.png';

const HeroSection = () => {
  const scrollToNextSection = () => {
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: '#1A3C5E',
        color: 'white',
        overflow: 'hidden',
        pt: { xs: 6, md: 12 },
        pb: { xs: 8, md: 12 },
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(26, 60, 94, 0.9) 0%, rgba(54, 98, 234, 0.75) 100%)',
          zIndex: 0
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2,
          zIndex: -1
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <MotionTypography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                  mb: 3,
                  textShadow: '0 3px 15px rgba(0,0,0,0.4)',
                  lineHeight: 1.2,
                  mt: { xs: 4, md: 0 },
                  background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(240,245,255,0.9) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textFillColor: 'transparent'
                }}
              >
                Travel & Earn, Shop & Save
              </MotionTypography>

              <MotionTypography
                variant="h5"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  mb: 3,
                  maxWidth: '650px',
                  textShadow: '0 2px 5px rgba(0,0,0,0.3)',
                  opacity: 0.9,
                  letterSpacing: '0.5px'
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Connect with travelers to transport your items or earn by delivering packages on your next trip.
              </MotionTypography>
              
              <MotionTypography
                variant="body1"
                sx={{
                  fontWeight: 400,
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  mb: 4,
                  maxWidth: '600px',
                  opacity: 0.8,
                  textShadow: '0 1px 3px rgba(0,0,0,0.2)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Join our global community of travelers and shoppers sharing resources and saving money.
              </MotionTypography>

              <MotionBox
                display="flex"
                flexWrap="wrap"
                gap={2}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    background: 'linear-gradient(90deg, #f0c845 0%, #f57c00 100%)',
                    color: '#1A3C5E',
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #f57c00 0%, #f0c845 100%)',
                      transform: 'translateY(-2px)',
                    },
                    boxShadow: '0 4px 14px rgba(245, 124, 0, 0.4)',
                  }}
                  onClick={scrollToNextSection}
                >
                  Get Started
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  component="a"
                  href="/about"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 600,
                    px: 4,
                    '&:hover': {
                      borderColor: 'white',
                      background: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  About Us
                </Button>
              </MotionBox>
            </MotionBox>
          </Grid>

          <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
            <MotionBox
              display="flex"
              justifyContent="center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <Box
                component="img"
                src={heroImage}
                alt="Global Pickups - Connect travelers with delivery requesters"
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.35))',
                  transform: 'scale(1.05)', 
                  transition: 'transform 0.5s ease-out',
                  animation: 'float 6s ease-in-out infinite',
                  '@keyframes float': {
                    '0%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-15px)' },
                    '100%': { transform: 'translateY(0px)' },
                  }
                }}
              />
            </MotionBox>
          </Grid>
        </Grid>

        <MotionBox
          position="absolute"
          bottom="20px"
          left="50%"
          sx={{ transform: 'translateX(-50%)', cursor: 'pointer' }}
          onClick={scrollToNextSection}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            y: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1,
              ease: "easeInOut"
            },
            opacity: {
              duration: 0.8,
              delay: 0.5
            }
          }}
        >
          <KeyboardArrowDown fontSize="large" />
        </MotionBox>
      </Container>
    </Box>
  );
};

export default HeroSection;
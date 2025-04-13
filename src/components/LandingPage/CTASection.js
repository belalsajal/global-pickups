import React from 'react';
import { Box, Container, Typography, Button, Card, Grid, Avatar, Stack } from '@mui/material';
import { CheckCircle, ArrowForward, LocalShipping, FlightTakeoff, Savings } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CTASection = () => {
  const MotionCard = motion(Card);
  const MotionBox = motion(Box);

  const benefits = [
    {
      icon: <FlightTakeoff sx={{ fontSize: '2rem', color: '#4A90E2' }} />,
      title: "Travel Smarter",
      description: "Earn money while you travel by utilizing your unused luggage space"
    },
    {
      icon: <LocalShipping sx={{ fontSize: '2rem', color: '#F57C00' }} />,
      title: "Global Delivery",
      description: "Ship items worldwide at a fraction of traditional shipping costs"
    },
    {
      icon: <Savings sx={{ fontSize: '2rem', color: '#5BB98C' }} />,
      title: "Save Money",
      description: "No subscription fees - pay only a 2.5% commission on completed deliveries"
    }
  ];

  return (
    <Box 
      sx={{ 
        py: 10,
        bgcolor: '#f8faff',
        backgroundImage: 'linear-gradient(135deg, #f8faff 0%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <MotionBox
          sx={{ textAlign: 'center', mb: 6 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              color: '#1A3C5E',
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
            }}
          >
            Ready to Transform Your Travel?
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: '700px',
              mx: 'auto',
              mb: 1,
              fontWeight: 400,
              fontSize: { xs: '1rem', sm: '1.15rem' },
              lineHeight: 1.6
            }}
          >
            Join our global community connecting travelers with item requesters —
            save money and make connections worldwide
          </Typography>
          <Box
            sx={{
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, #4A90E2 0%, #F57C00 100%)',
              mx: 'auto',
              mt: 3,
              mb: 4,
              borderRadius: '4px'
            }}
          />
        </MotionBox>
        
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12}>
            <MotionCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              sx={{
                height: '100%',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                border: '1px solid rgba(0,0,0,0.05)',
                p: { xs: 3, md: 4 }
              }}
            >
              <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 4, color: '#1A3C5E', textAlign: 'center' }}>
                Why Join Global Pickups?
              </Typography>
              
              <Grid container spacing={4} justifyContent="center" sx={{ mb: 4 }}>
                {benefits.map((benefit, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                      sx={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        p: 2,
                        pb: 3,
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        height: '100%',
                        '&:hover': {
                          bgcolor: 'rgba(74, 144, 226, 0.08)',
                          transform: 'translateY(-5px)',
                          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.05)'
                        }
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor: 'rgba(74, 144, 226, 0.1)',
                          mb: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {benefit.icon}
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#1A3C5E' }}>
                        {benefit.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {benefit.description}
                      </Typography>
                    </MotionBox>
                  </Grid>
                ))}
              </Grid>
              
              <Box sx={{ textAlign: 'center' }}>
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2} 
                  sx={{ 
                    justifyContent: 'center',
                    maxWidth: '500px',
                    mx: 'auto'
                  }}
                >
                  <Button 
                    variant="contained" 
                    component={Link}
                    to="/signup"
                    endIcon={<ArrowForward />}
                    sx={{ 
                      px: 4, 
                      py: 1.5,
                      fontWeight: 600,
                      fontSize: '1rem',
                      borderRadius: '50px',
                      bgcolor: '#F57C00',
                      '&:hover': {
                        bgcolor: '#E65100',
                      },
                      flex: { xs: '1 1 auto', sm: '0 0 auto' },
                    }}
                  >
                    Sign Up Free
                  </Button>
                  <Button 
                    variant="outlined" 
                    component={Link}
                    to="/services"
                    endIcon={<ArrowForward />}
                    sx={{ 
                      px: 4, 
                      py: 1.5,
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      borderRadius: '50px',
                      borderColor: '#4A90E2',
                      borderWidth: 2,
                      color: '#4A90E2',
                      flex: { xs: '1 1 auto', sm: '0 0 auto' },
                      '&:hover': {
                        borderColor: '#2D6BBE',
                        color: '#2D6BBE',
                        bgcolor: 'rgba(74, 144, 226, 0.05)',
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </Stack>
                
                <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle sx={{ color: '#5BB98C', mr: 1, fontSize: '0.9rem' }} />
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    No credit card required. Join 5,000+ users worldwide.
                  </Typography>
                </Box>
              </Box>
            </MotionCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CTASection;
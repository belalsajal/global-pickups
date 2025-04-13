import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Grid, Card, CardContent, Avatar, Button, 
  Paper, IconButton, Chip, useMediaQuery, useTheme, Rating, Divider
} from '@mui/material';
import { 
  Star, StarBorder, FlightTakeoff, Luggage, Info, FormatQuote, 
  ArrowBackIos, ArrowForwardIos, VerifiedUser, LocationOn, Event 
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const MotionCard = motion(Card);
  const MotionBox = motion(Box);
  
  // For featured testimonial carousel
  const [currentFeatured, setCurrentFeatured] = useState(0);
  const featuredTestimonials = [
    {
      id: 1,
      name: "Jessica Martinez",
      location: "Toronto, Canada",
      avatar: "https://randomuser.me/api/portraits/women/36.jpg",
      rating: 5,
      text: "I saved over $350 on shipping costs for my mother's handmade quilt! The traveler carefully transported it from Mexico City to Toronto, and it arrived in perfect condition. The peace of mind knowing it was being hand-carried was priceless.",
      role: "requester",
      date: "March 15, 2025",
      item: "Family heirloom quilt",
      distance: "2,200 miles",
      savings: "$350",
      country: "🇨🇦"
    },
    {
      id: 2,
      name: "Marcus Chen",
      location: "Singapore",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
      rating: 5,
      text: "As a digital nomad who travels between Asia and Europe monthly, I've earned an extra $4,200 in six months just by delivering items along my usual routes. The platform is intuitive, and the verification system gives everyone peace of mind.",
      role: "traveler",
      date: "February 2, 2025",
      earnings: "$4,200",
      journeys: "24 completed deliveries",
      time: "6 months",
      country: "🇸🇬"
    },
    {
      id: 3,
      name: "Amara Okafor",
      location: "Lagos, Nigeria",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      rating: 5,
      text: "I run a small African fashion boutique in Paris and needed authentic fabrics from Lagos. Through Global Pickups, I connected with someone who brought 5kg of premium materials, saving me 70% on express shipping and import fees. Game-changer for my business!",
      role: "requester",
      date: "January 10, 2025",
      item: "Premium fabric collection",
      savings: "70% on shipping",
      business: "Fashion boutique owner",
      country: "🇳🇬"
    }
  ];
  
  // Auto-rotate featured testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatured((prev) => (prev + 1) % featuredTestimonials.length);
    }, 10000); // Change every 10 seconds
    
    return () => clearInterval(interval);
  }, [featuredTestimonials.length]);

  return (
    <Box 
      sx={{ 
        py: 10, 
        background: 'linear-gradient(to bottom, #f8f8f8 0%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0) 70%)',
          top: '-200px',
          left: '-200px',
          zIndex: 0
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 124, 0, 0.05) 0%, rgba(245, 124, 0, 0) 70%)',
          bottom: '-150px',
          right: '-150px',
          zIndex: 0
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <MotionBox 
          sx={{ textAlign: 'center', mb: 8 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              position: 'relative',
              display: 'inline-block',
              color: '#1A3C5E',
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '100px',
                height: '4px',
                background: 'linear-gradient(90deg, #1A3C5E 0%, #f57c00 100%)',
                bottom: '-15px',
                left: 'calc(50% - 50px)',
                borderRadius: '4px'
              }
            }}
          >
            User Success Stories
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              maxWidth: '800px', 
              mx: 'auto', 
              mt: 5,
              fontWeight: 400
            }}
          >
            Real experiences from our global community of travelers and requesters
          </Typography>
        </MotionBox>
        
        {/* Featured Testimonial Carousel */}
        <Box mb={6}>
          <Paper 
            elevation={0}
            sx={{ 
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              background: 'transparent',
              mb: 4
            }}
          >
            <AnimatePresence mode="wait">
              <MotionBox
                key={currentFeatured}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: 'center',
                  background: 'linear-gradient(135deg, #EBF2FA 0%, #F8F9FB 100%)',
                  borderRadius: '16px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                {/* Quote decoration */}
                <FormatQuote 
                  sx={{ 
                    position: 'absolute', 
                    top: 20, 
                    left: 20, 
                    fontSize: 40, 
                    color: 'rgba(25, 118, 210, 0.1)',
                    transform: 'rotate(180deg)'
                  }} 
                />
                <FormatQuote 
                  sx={{ 
                    position: 'absolute', 
                    bottom: 20, 
                    right: 20, 
                    fontSize: 40, 
                    color: 'rgba(25, 118, 210, 0.1)' 
                  }} 
                />
                
                {/* Left side with image and profile */}
                <Box 
                  sx={{ 
                    width: { xs: '100%', md: '35%' },
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 2,
                    textAlign: 'center'
                  }}
                >
                  <Avatar 
                    src={featuredTestimonials[currentFeatured].avatar} 
                    sx={{ 
                      width: 120, 
                      height: 120, 
                      mb: 2, 
                      border: '4px solid white',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
                    }} 
                  />
                  
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 0.5, 
                      justifyContent: 'center' 
                    }}
                  >
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      sx={{ 
                        fontWeight: 'bold', 
                        mr: 1,
                        color: '#1A3C5E'
                      }}
                    >
                      {featuredTestimonials[currentFeatured].name}
                    </Typography>
                    <Typography variant="h5" component="span">{featuredTestimonials[currentFeatured].country}</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOn sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {featuredTestimonials[currentFeatured].location}
                    </Typography>
                  </Box>
                  
                  <Rating 
                    value={featuredTestimonials[currentFeatured].rating} 
                    readOnly 
                    icon={<Star sx={{ color: 'gold' }} />}
                    emptyIcon={<StarBorder sx={{ color: 'gold' }} />}
                    sx={{ mb: 2 }}
                  />
                  
                  <Chip 
                    icon={featuredTestimonials[currentFeatured].role === 'traveler' ? 
                      <FlightTakeoff sx={{ fontSize: 16 }} /> : 
                      <Luggage sx={{ fontSize: 16 }} />} 
                    label={featuredTestimonials[currentFeatured].role === 'traveler' ? 'Traveler' : 'Item Requester'} 
                    color={featuredTestimonials[currentFeatured].role === 'traveler' ? 'primary' : 'secondary'} 
                    variant="outlined"
                  />
                  
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="caption" display="flex" alignItems="center" sx={{ mb: 1 }}>
                      <Event fontSize="small" sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                      {featuredTestimonials[currentFeatured].date}
                    </Typography>
                    
                    {featuredTestimonials[currentFeatured].savings && (
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                        Saved {featuredTestimonials[currentFeatured].savings}
                      </Typography>
                    )}
                    
                    {featuredTestimonials[currentFeatured].earnings && (
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                        Earned {featuredTestimonials[currentFeatured].earnings}
                      </Typography>
                    )}
                  </Box>
                </Box>
                
                {/* Right side with testimonial text */}
                <Box 
                  sx={{ 
                    width: { xs: '100%', md: '65%' },
                    p: 5,
                    py: { xs: 4, md: 5 },
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    bgcolor: '#fff',
                    height: '100%',
                    zIndex: 2,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)',
                      zIndex: -1
                    }
                  }}
                >
                  <Typography 
                    variant="h6" 
                    paragraph 
                    sx={{ 
                      fontStyle: 'italic', 
                      lineHeight: 1.8,
                      fontSize: '1.1rem',
                      mb: 4,
                      position: 'relative',
                      zIndex: 2
                    }}
                  >
                    "{featuredTestimonials[currentFeatured].text}"
                  </Typography>
                  
                  <Divider sx={{ mb: 3 }} />
                  
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 2, 
                      mt: 'auto',
                      mb: 3
                    }}
                  >
                    {featuredTestimonials[currentFeatured].item && (
                      <Chip 
                        size="small" 
                        label={`Item: ${featuredTestimonials[currentFeatured].item}`} 
                        variant="outlined" 
                      />
                    )}
                    
                    {featuredTestimonials[currentFeatured].distance && (
                      <Chip 
                        size="small" 
                        label={`Distance: ${featuredTestimonials[currentFeatured].distance}`} 
                        variant="outlined" 
                      />
                    )}
                    
                    {featuredTestimonials[currentFeatured].journeys && (
                      <Chip 
                        size="small" 
                        label={featuredTestimonials[currentFeatured].journeys} 
                        variant="outlined" 
                      />
                    )}
                    
                    {featuredTestimonials[currentFeatured].time && (
                      <Chip 
                        size="small" 
                        label={`In just ${featuredTestimonials[currentFeatured].time}`} 
                        variant="outlined" 
                      />
                    )}
                    
                    {featuredTestimonials[currentFeatured].business && (
                      <Chip 
                        size="small" 
                        label={featuredTestimonials[currentFeatured].business} 
                        variant="outlined" 
                      />
                    )}
                    
                    <Chip 
                      size="small" 
                      icon={<VerifiedUser sx={{ fontSize: 16 }} />} 
                      label="Verified Review" 
                      color="success" 
                      variant="outlined" 
                    />
                  </Box>
                  
                  {/* Add the button inside the testimonial card */}
                  <Button 
                    variant="contained"
                    color="primary" 
                    component={Link} 
                    to="/success-stories"
                    size="medium"
                    sx={{ 
                      mt: 'auto',
                      alignSelf: 'flex-end',
                      px: 3,
                      py: 1,
                      fontWeight: 600,
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(109, 142, 197, 0.2)',
                      '&:hover': {
                        boxShadow: '0 6px 16px rgba(109, 142, 197, 0.4)',
                        transform: 'translateY(-3px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                    endIcon={<ArrowForwardIos sx={{ fontSize: 16 }} />}
                  >
                    More Customer Success Stories
                  </Button>
                </Box>
              </MotionBox>
            </AnimatePresence>
            
            {/* Navigation buttons */}
            <Box 
              sx={{ 
                position: 'absolute', 
                bottom: { xs: 10, md: '50%' }, 
                left: { xs: '50%', md: 10 },
                transform: { xs: 'translateX(-50%)', md: 'translateY(50%)' },
                display: 'flex',
                gap: { xs: 5, md: 0 },
                flexDirection: { xs: 'row', md: 'column' },
                zIndex: 10
              }}
            >
              <IconButton 
                onClick={() => setCurrentFeatured(prev => (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length)}
                sx={{ 
                  bgcolor: 'white', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  '&:hover': {
                    bgcolor: 'white',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                  },
                  mb: { xs: 0, md: 2 }
                }}
              >
                {isMobile ? <ArrowBackIos /> : <ArrowBackIos />}
              </IconButton>
              
              <IconButton 
                onClick={() => setCurrentFeatured(prev => (prev + 1) % featuredTestimonials.length)}
                sx={{ 
                  bgcolor: 'white', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  '&:hover': {
                    bgcolor: 'white',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                  }
                }}
              >
                {isMobile ? <ArrowForwardIos /> : <ArrowForwardIos />}
              </IconButton>
            </Box>
          </Paper>
          
          {/* Pagination indicator for featured testimonials */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            {featuredTestimonials.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentFeatured(index)}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  mx: 0.5,
                  bgcolor: currentFeatured === index ? 'primary.main' : 'rgba(0, 0, 0, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    bgcolor: currentFeatured === index ? 'primary.main' : 'rgba(0, 0, 0, 0.3)',
                    transform: 'scale(1.2)'
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
import React, { useState } from 'react';
import { 
  Box, Container, Typography, Grid, Button, Avatar, Card, CardContent, 
  useMediaQuery, IconButton, List, ListItem, ListItemIcon, ListItemText,
  Tabs, Tab, Paper
} from '@mui/material';
import { 
  FlightTakeoff, Search, Wallet, ArrowForward, ArrowBack, CheckCircle, 
  CompareArrows, LocalShipping, KeyboardArrowDown, Flight, ShoppingBag
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import StepPopup from './popups/StepPopup';
import { MotionBox, MotionCard, MotionTypography, SlideUpBox } from '../../shared/MotionComponents';

const HowItWorksSection = () => {
  const isMobile = useMediaQuery('(max-width:900px)');
  const [currentTab, setCurrentTab] = useState(0);
  
  const [howItWorksPopup, setHowItWorksPopup] = useState({
    open: false,
    step: null
  });
  
  // Data for the traveler journey (I am traveling)
  const travelerSteps = [
    {
      title: 'Step 1: Post Your Travel Plan',
      description: 'Add your upcoming travel details including departure and arrival cities, dates, and how much space you can spare in your luggage.',
      icon: <FlightTakeoff sx={{ fontSize: 36, color: '#6d8ec5' }} />,
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      color: '#6d8ec5', // Lake Blue
      shadowColor: 'rgba(109, 142, 197, 0.3)',
      step: 'post-travel',
      benefits: [
        'Create your travel listing in under 2 minutes',
        'Specify your travel route and dates clearly',
        'Set your compensation expectations',
        'Indicate available luggage space and weight',
        'Control which items you\'re willing to carry'
      ],
      miniSteps: [
        'Enter your travel details (cities and dates)',
        'Specify available luggage space',
        'Set your compensation preferences'
      ]
    },
    {
      title: 'Step 2: Match With Requesters',
      description: 'Our intelligent system connects you with people who need items delivered on your route. Browse requests and choose the ones that work for you.',
      icon: <Search sx={{ fontSize: 36, color: '#d3622c' }} />,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      color: '#d3622c', // Flame
      shadowColor: 'rgba(211, 98, 44, 0.3)',
      step: 'match-travel',
      benefits: [
        'Receive notifications for matching requests',
        'Filter by item size, weight, and value',
        'Chat securely with requesters',
        'View detailed item information'
      ],
      miniSteps: [
        'Browse matching item requests for your route',
        'Check item details and compensation offered',
        'Contact and negotiate with requesters'
      ]
    },
    {
      title: 'Step 3: Deliver and Get Paid',
      description: 'Pick up the item, transport it safely during your journey, and deliver it at your destination. Once delivery is confirmed, you receive your payment.',
      icon: <Wallet sx={{ fontSize: 36, color: '#f0c845' }} />,
      image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      color: '#f0c845', // Saffron
      shadowColor: 'rgba(240, 200, 69, 0.3)',
      step: 'deliver-travel',
      benefits: [
        'Receive secure payment through escrow',
        'Track delivery progress',
        'Build your reputation with reviews',
        'Earn extra money while traveling'
      ],
      miniSteps: [
        'Coordinate pickup with the requester',
        'Transport item safely during your trip',
        'Deliver item at destination and get paid',
        'Receive your payment and a review'
      ]
    }
  ];
  
  // Data for the requester journey (I want an item)
  const requesterSteps = [
    {
      title: 'Step 1: Post Your Item Request',
      description: 'Specify what item you need, where it should be picked up from, and where it needs to be delivered. Add details about size, weight, and your budget.',
      icon: <ShoppingBag sx={{ fontSize: 36, color: '#d3622c' }} />,
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      color: '#d3622c', // Flame
      shadowColor: 'rgba(211, 98, 44, 0.3)',
      step: 'post-request',
      benefits: [
        'Create your request in just 2 minutes',
        'Clearly specify item details and location',
        'Set your budget for delivery',
        'Add photos and description of the item',
        'Choose between standard and express delivery'
      ],
      miniSteps: [
        'Enter item details and locations',
        'Specify budget and delivery timeframe',
        'Upload photos or links to the item'
      ]
    },
    {
      title: 'Step 2: Match With Travelers',
      description: 'Our system matches your request with travelers on that route. Browse traveler profiles, check ratings, and choose who you want to transport your item.',
      icon: <Search sx={{ fontSize: 36, color: '#6d8ec5' }} />,
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      color: '#6d8ec5', // Lake Blue
      shadowColor: 'rgba(109, 142, 197, 0.3)',
      step: 'match-request',
      benefits: [
        'Get matched with travelers on your route',
        'View traveler profiles and ratings',
        'Chat securely through our platform',
        'Compare offers from multiple travelers'
      ],
      miniSteps: [
        'Browse matching travelers for your request',
        'Check traveler ratings and reviews',
        'Contact and negotiate with travelers'
      ]
    },
    {
      title: 'Step 3: Pay and Receive Your Item',
      description: 'Make secure payment through our escrow system. The traveler picks up and delivers your item, and you release payment after successful delivery.',
      icon: <Wallet sx={{ fontSize: 36, color: '#5bb98c' }} />,
      image: 'https://images.unsplash.com/photo-1579621970590-9d624316904b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      color: '#5bb98c', // Emerald
      shadowColor: 'rgba(91, 185, 140, 0.3)',
      step: 'pay-request',
      benefits: [
        'Make secure payment held in escrow',
        'Track your item during transit',
        'Verify delivery before releasing payment',
        'Save on international shipping costs'
      ],
      miniSteps: [
        'Make secure payment through our platform',
        'Track item status throughout the journey',
        'Receive item and confirm delivery',
        'Leave a review for the traveler'
      ]
    }
  ];

  // Handle opening the StepPopup with the correct step ID
  const handleOpenHowItWorksPopup = (step) => {
    // Get the full step ID including the journey type
    let stepId;
    
    if (typeof step === 'string') {
      // If called directly with a string ID
      stepId = step;
    } else {
      // If called with a step object, determine correct journey type
      const baseStep = step.step.split('-')[0];
      const journeyType = currentTab === 0 ? 'travel' : 'request';
      stepId = `${baseStep}-${journeyType}`;
    }
    
    setHowItWorksPopup({
      open: true,
      step: stepId
    });
  };
  
  // Close popup dialog for How It Works section
  const handleCloseHowItWorksPopup = () => {
    setHowItWorksPopup({
      open: false,
      step: null
    });
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // Render step cards based on current tab - updated to vertical flow
  const renderStepCards = () => {
    const steps = currentTab === 0 ? travelerSteps : requesterSteps;
    
    return (
      <Box sx={{ mt: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        {steps.map((step, index) => (
          <MotionBox
            key={step.step}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            sx={{
              position: 'relative',
              width: { xs: '100%', md: `${100 / steps.length}%` },
              mb: { xs: 4, md: 0 },
              px: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              // Show connection line between steps (except for the last one)
              ...(index < steps.length - 1 && {
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '120px', // Position after the step number circle
                  right: { xs: '50%', md: '0' },
                  width: { xs: '1px', md: '50px' }, // Vertical line on mobile, horizontal on desktop
                  height: { xs: '50px', md: '1px' }, // Vertical line on mobile, horizontal on desktop
                  backgroundColor: '#e0e0e0',
                  display: { xs: 'block', md: 'block' },
                  transform: { xs: 'translateX(50%)', md: 'translateY(20px)' },
                  zIndex: 0
                }
              })
            }}
          >
            {/* Step number circle */}
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: step.color,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: 'bold',
                mb: 3,
                boxShadow: `0 5px 15px ${step.shadowColor}`,
                zIndex: 2
              }}
            >
              {index + 1}
            </Box>
            
            <Box
              sx={{
                width: '100%',
                // Increased fixed height to ensure content fits
                height: { xs: 'auto', md: 490 },
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <MotionCard
                whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0,0,0,0.12)' }}
                sx={{
                  width: '100%',
                  height: '100%', // Take full height of parent container
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  position: 'relative',
                  border: '1px solid rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '5px',
                    background: `linear-gradient(90deg, ${step.color} 0%, rgba(255,255,255,0.5) 100%)`,
                  }
                }}
                onClick={() => handleOpenHowItWorksPopup(step)}
              >
                <CardContent 
                  sx={{ 
                    p: 3, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: '100%', // Full height
                    justifyContent: 'space-between', // Evenly distribute content
                  }}
                >
                  {/* Top content wrapper */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', mb: 'auto' }}>
                    {/* Card header with icon and title - Force single line for title */}
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      height: 60, // Fixed height for header to ensure alignment
                    }}>
                      <Avatar
                        sx={{
                          bgcolor: 'white',
                          color: step.color,
                          boxShadow: `0 0 15px ${step.shadowColor}`,
                          width: 48, // Increased size
                          height: 48, // Increased size
                          mr: 1.5,
                          flexShrink: 0
                        }}
                      >
                        {step.icon}
                      </Avatar>
                      <Typography
                        variant="h6"
                        component="h3"
                        noWrap // Force single line
                        title={step.title.split(':')[1] || step.title} // Show full title on hover
                        sx={{
                          fontWeight: 'bold',
                          color: step.color,
                          fontSize: '1.1rem', // Increased font size
                          width: '100%',
                        }}
                      >
                        {step.title.split(':')[1] || step.title}
                      </Typography>
                    </Box>
                    
                    {/* Card content - description with fixed height */}
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 2, 
                        color: 'text.secondary', 
                        lineHeight: 1.5,
                        height: '4.5em', // Fixed height (3 lines)
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        fontSize: '1rem', // Increased font size
                      }}
                    >
                      {step.description}
                    </Typography>
                    
                    {/* Card content - mini steps list */}
                    <List 
                      dense 
                      sx={{ 
                        pl: 0,
                        py: 0,
                        '& .MuiListItem-root': {
                          py: 0.6, // Slightly increased padding
                        }
                      }}
                    >
                      {step.miniSteps.map((miniStep, i) => (
                        <ListItem key={i} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircle fontSize="small" sx={{ color: step.color, fontSize: '0.95rem' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={miniStep} 
                            primaryTypographyProps={{
                              style: { 
                                fontSize: '0.95rem', // Increased font size
                                lineHeight: 1.4, // Increased line height
                                whiteSpace: 'normal', // Allow wrapping
                                fontWeight: 400, // Medium weight for better readability
                              }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  
                  {/* Learn more button - always at bottom with fixed spacing */}
                  <Box 
                    sx={{ 
                      mt: 2,
                      width: '100%',
                      position: 'relative',
                    }}
                  >
                    <Button
                      variant="contained" // Changed to contained for better visibility
                      fullWidth
                      endIcon={<ArrowForward />}
                      sx={{
                        backgroundColor: step.color,
                        color: 'white',
                        py: 1.2, // Slightly taller
                        fontWeight: 500,
                        fontSize: '0.95rem', // Increased font size
                        zIndex: 5,
                        '&:hover': {
                          backgroundColor: step.color,
                          filter: 'brightness(1.1)',
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenHowItWorksPopup(step);
                      }}
                    >
                      Learn More
                    </Button>
                  </Box>
                </CardContent>
              </MotionCard>
            </Box>
          </MotionBox>
        ))}
      </Box>
    );
  };

  const MotionTab = motion(Tab);
  
  return (
    <Box 
      id="how-it-works"
      sx={{ 
        py: 10, 
        bgcolor: '#f8f8f8',
        backgroundImage: 'linear-gradient(to bottom, #f8f8f8 0%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          backgroundColor: 'rgba(25, 118, 210, 0.05)',
          top: '-100px',
          left: '-100px',
          zIndex: 0
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          backgroundColor: 'rgba(245, 124, 0, 0.05)',
          bottom: '-50px',
          right: '-50px',
          zIndex: 0
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <MotionTypography 
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            How It Works
          </MotionTypography>
          
          <MotionTypography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              maxWidth: '700px', 
              mx: 'auto', 
              mt: 5,
              fontSize: '1.1rem',
              lineHeight: 1.6
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Our platform connects travelers with item requesters, creating a win-win situation that saves money and time.
          </MotionTypography>
        </Box>
        
        {/* Tab Controls for two user journeys */}
        <Box sx={{ mb: 5, mt: 6 }}>
          <Tabs 
            value={currentTab} 
            onChange={handleTabChange}
            variant="fullWidth" 
            textColor="primary"
            aria-label="Travel or request tabs"
            sx={{
              maxWidth: 800,
              mx: 'auto',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              backgroundColor: 'white',
              overflow: 'hidden',
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px'
              },
              '& .MuiTab-root': {
                py: 2,
                transition: 'all 0.3s',
                minHeight: '64px',
                textTransform: 'none'
              }
            }}
          >
            <MotionTab 
              whileHover={{ y: -2 }}
              whileTap={{ y: 1 }}
              icon={<Flight sx={{ fontSize: isMobile ? 22 : 28 }} />} 
              label={
                <Typography 
                  variant={isMobile ? "body2" : "body1"} 
                  fontWeight={600} 
                  sx={{ ml: 1 }}
                >
                  I am traveling
                </Typography>
              }
              sx={{ 
                flexDirection: 'row',
                color: currentTab === 0 ? '#3662ea' : 'text.secondary',
              }}
            />
            <MotionTab 
              whileHover={{ y: -2 }}
              whileTap={{ y: 1 }}
              icon={<LocalShipping sx={{ fontSize: isMobile ? 22 : 28 }} />} 
              label={
                <Typography 
                  variant={isMobile ? "body2" : "body1"} 
                  fontWeight={600} 
                  sx={{ ml: 1 }}
                >
                  I want an item
                </Typography>
              }
              sx={{ 
                flexDirection: 'row',
                color: currentTab === 1 ? '#f57c00' : 'text.secondary'
              }}
            />
          </Tabs>
        </Box>
        
        {/* Render step cards based on selected tab */}
        {renderStepCards()}
        
        {/* Popup with detailed information about each step */}
        <StepPopup
          open={howItWorksPopup.open}
          step={howItWorksPopup.step}
          onClose={handleCloseHowItWorksPopup}
        />
      </Container>
    </Box>
  );
};

// Remove the HeroSection as it's now in its own file
export { HowItWorksSection };
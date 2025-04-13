import React from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, Typography, Box, IconButton, List, ListItem, 
  ListItemIcon, ListItemText, Divider, useMediaQuery, useTheme 
} from '@mui/material';
import { Close, CheckCircle, ArrowForward } from '@mui/icons-material';

const StepPopup = ({ open, step, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Data for the traveler journey (I am traveling)
  const travelerSteps = [
    {
      title: 'Step 1: Post Your Travel Plan',
      description: 'Add your upcoming travel details including departure and arrival cities, dates, and how much space you can spare in your luggage.',
      step: 'post-travel',
      color: '#6d8ec5', // Lake Blue
      shadowColor: 'rgba(109, 142, 197, 0.3)',
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
      step: 'match-travel',
      color: '#d3622c', // Flame
      shadowColor: 'rgba(211, 98, 44, 0.3)',
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
      step: 'deliver-travel',
      color: '#f0c845', // Saffron
      shadowColor: 'rgba(240, 200, 69, 0.3)',
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
      step: 'post-request',
      color: '#d3622c', // Flame
      shadowColor: 'rgba(211, 98, 44, 0.3)',
      benefits: [
        'Create your request in just 2 minutes',
        'Clearly specify item details and location',
        'Set your budget for delivery',
        'Add photos and description of the item',
        'Choose between standard and express delivery options',
        'Get immediate quotes based on your item details'
      ],
      miniSteps: [
        'Create an account or log in to your existing account',
        'Provide detailed item description, dimensions and weight',
        'Specify pickup and delivery locations with any special instructions',
        'Set your delivery timeline and budget constraints',
        'Upload photos or links to the item you need delivered'
      ]
    },
    {
      title: 'Step 2: Match With Travelers',
      description: 'Our system matches your request with travelers on that route. Browse traveler profiles, check ratings, and choose who you want to transport your item.',
      step: 'match-request',
      color: '#6d8ec5', // Lake Blue
      shadowColor: 'rgba(109, 142, 197, 0.3)',
      benefits: [
        'Get matched with travelers already going to your destination',
        'View verified traveler profiles with identity verification badges',
        'Read detailed traveler ratings and reviews from previous deliveries',
        'Chat securely through our encrypted messaging system',
        'Compare offers from multiple travelers to get the best deal',
        'Receive real-time notifications about new matching travelers'
      ],
      miniSteps: [
        'Review automatically matched travelers based on your route',
        'Filter travelers by rating, delivery timeline, or price',
        'Contact potential travelers through our secure chat',
        'Negotiate terms and compensation directly with travelers',
        'Select your preferred traveler and confirm the arrangement'
      ]
    },
    {
      title: 'Step 3: Pay and Receive Your Item',
      description: 'Make secure payment through our escrow system. The traveler picks up and delivers your item, and you release payment after successful delivery.',
      step: 'pay-request',
      color: '#5bb98c', // Emerald
      shadowColor: 'rgba(91, 185, 140, 0.3)',
      benefits: [
        'Your payment is securely held in escrow until delivery confirmation',
        'Track your item\'s journey with real-time location updates',
        'Receive photo confirmation at pickup and delivery points',
        'Verify item condition before releasing payment',
        'Get insurance coverage for valuable items (optional)',
        'Save up to 80% compared to traditional international shipping'
      ],
      miniSteps: [
        'Make secure payment through our escrow protection system',
        'Receive confirmation when your item is picked up (with photos)',
        'Track the item\'s location throughout the delivery journey',
        'Meet the traveler or arrange contactless delivery at destination',
        'Inspect your item and confirm successful delivery',
        'Rate and review your traveler after the transaction'
      ]
    }
  ];
  
  // Find the step data from both traveler and requester steps
  const findStepData = () => {
    // Check if the step contains the journey type
    const isTravelerJourney = step && step.includes('travel');
    const isRequesterJourney = step && step.includes('request');
    
    // Extract the base step (post, match, deliver/pay)
    const baseStep = step ? step.split('-')[0] : '';
    
    // Use requester data for request steps, otherwise use traveler data
    if (isRequesterJourney) {
      const matchingStep = requesterSteps.find(s => s.step.startsWith(baseStep));
      return matchingStep || null;
    } else if (isTravelerJourney) {
      const matchingStep = travelerSteps.find(s => s.step.startsWith(baseStep));
      return matchingStep || null;
    } else if (baseStep) {
      // If no journey type in step, try to match by base step only
      // First try requester steps
      const requesterMatch = requesterSteps.find(s => s.step.startsWith(baseStep));
      if (requesterMatch) return requesterMatch;
      
      // Then try traveler steps
      const travelerMatch = travelerSteps.find(s => s.step.startsWith(baseStep));
      if (travelerMatch) return travelerMatch;
    }
    
    // Default fallback if needed
    return null;
  };
  
  const stepData = findStepData();
  
  if (!stepData) return null;
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          bgcolor: stepData.color,
          color: 'white',
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="h5" component="div" fontWeight={600}>
          {stepData.title}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ py: 4 }}>
        <Typography variant="body1" paragraph>
          {stepData.description}
        </Typography>
        
        {/* Step-by-step instructions */}
        <Box sx={{ my: 3 }}>
          <Typography variant="h6" gutterBottom color="secondary" fontWeight={600}>
            Step-by-Step Process
          </Typography>
          <List>
            {stepData.miniSteps.map((miniStep, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemIcon sx={{ mt: 0.5 }}>
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: stepData.color,
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.8rem'
                    }}
                  >
                    {index + 1}
                  </Box>
                </ListItemIcon>
                <ListItemText 
                  primary={miniStep} 
                  sx={{ '& .MuiListItemText-primary': { fontWeight: 500 } }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        {/* Benefits section - moved from cards to popup */}
        <Box sx={{ my: 3 }}>
          <Typography variant="h6" gutterBottom color="secondary" fontWeight={600}>
            Key Benefits
          </Typography>
          <List>
            {stepData.benefits.map((benefit, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckCircle sx={{ color: stepData.color }} />
                </ListItemIcon>
                <ListItemText primary={benefit} />
              </ListItem>
            ))}
          </List>
        </Box>
        
        {/* Additional information or call-to-action */}
        <Box sx={{ mt: 4, bgcolor: `${stepData.shadowColor}`, p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom fontWeight={600} color={stepData.color}>
            Ready to Get Started?
          </Typography>
          <Typography variant="body2" paragraph>
            Join thousands of users who are already saving money and time with our platform.
          </Typography>
          <Button 
            variant="contained" 
            endIcon={<ArrowForward />}
            sx={{ 
              bgcolor: stepData.color,
              '&:hover': {
                bgcolor: stepData.color,
                filter: 'brightness(0.9)'
              }
            }}
          >
            Sign Up Now
          </Button>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StepPopup;
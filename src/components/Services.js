import React from 'react';
import { 
  Container, Typography, Box, Grid, Card, CardContent, Button, 
  List, ListItem, ListItemIcon, ListItemText, Divider, Paper,
  useMediaQuery, useTheme
} from '@mui/material';
import { 
  FlightTakeoff, LocalShipping, Security, VerifiedUser, 
  AttachMoney, Public, Speed, CheckCircle, Payment, Cancel
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Services = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Core service features that apply to all users
  const coreFeatures = [
    {
      title: 'Secure Platform',
      description: 'End-to-end encryption and thorough identity verification keeps your transactions and personal data secure.',
      icon: <Security fontSize="large" sx={{ color: '#4a6da7' }} />
    },
    {
      title: 'Escrow Payment System',
      description: 'Your payment is held securely until delivery is confirmed, protecting both parties in every transaction.',
      icon: <Payment fontSize="large" sx={{ color: '#d3622c' }} />
    },
    {
      title: 'Verified Users',
      description: 'Our comprehensive verification process ensures you\'re dealing with real, trustworthy individuals.',
      icon: <VerifiedUser fontSize="large" sx={{ color: '#5bb98c' }} />
    },
    {
      title: 'Global Network',
      description: 'Connect with travelers and requesters from over 150 countries worldwide.',
      icon: <Public fontSize="large" sx={{ color: '#f0c845' }} />
    },
    {
      title: 'Cost-Effective',
      description: 'Save up to 80% compared to traditional international shipping methods.',
      icon: <AttachMoney fontSize="large" sx={{ color: '#4a6da7' }} />
    },
    {
      title: 'Fast Delivery',
      description: 'Items are transported by travelers who are already making the journey, often faster than standard mail.',
      icon: <Speed fontSize="large" sx={{ color: '#d3622c' }} />
    }
  ];
  
  // Additional service information
  const additionalInfo = [
    {
      title: 'What Can Be Shipped',
      content: [
        'Gifts and personal items',
        'Electronics and gadgets',
        'Specialty foods (subject to customs regulations)',
        'Books and educational materials',
        'Clothing and accessories',
        'Collectibles and memorabilia',
        'Important documents (non-confidential)'
      ]
    },
    {
      title: 'What Cannot Be Shipped',
      content: [
        'Illegal items',
        'Dangerous or hazardous materials',
        'Perishable goods without proper packaging',
        'Live animals',
        'Extremely valuable items without additional insurance',
        'Prescription medications',
        'Items requiring special permits without documentation'
      ]
    }
  ];
  
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            color: '#1A3C5E',
            position: 'relative',
            display: 'inline-block',
            '&::after': {
              content: '""',
              position: 'absolute',
              width: '100px',
              height: '4px',
              background: 'linear-gradient(90deg, #1A3C5E 0%, #f57c00 100%)',
              bottom: '-10px',
              left: 'calc(50% - 50px)',
              borderRadius: '4px'
            }
          }}
        >
          Our Services
        </Typography>
        <Typography 
          variant="h5" 
          component="p" 
          color="text.secondary" 
          sx={{ 
            maxWidth: '800px', 
            mx: 'auto', 
            mt: 5,
            mb: 3 
          }}
        >
          Global Pickups connects travelers with people who need items delivered, creating an efficient 
          peer-to-peer delivery network that saves money and time while promoting sustainable travel.
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 2, 
            flexWrap: 'wrap',
            mt: 4 
          }}
        >
          <Button 
            variant="contained" 
            size="large" 
            color="primary" 
            component={RouterLink}
            to="/how-it-works#travelers"
            sx={{ 
              borderRadius: 2,
              px: 3,
              py: 1.5,
              fontWeight: 600
            }}
          >
            I'm a Traveler
          </Button>
          <Button 
            variant="contained" 
            size="large" 
            color="secondary" 
            component={RouterLink}
            to="/how-it-works#requesters"
            sx={{ 
              borderRadius: 2,
              px: 3,
              py: 1.5,
              fontWeight: 600
            }}
          >
            I Need Something Delivered
          </Button>
        </Box>
      </Box>
      
      {/* Core Features - now the main service section */}
      <Box sx={{ mb: 8 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          textAlign="center" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            mb: 4,
            color: '#1A3C5E'
          }}
        >
          Our Platform Features
        </Typography>
        
        {/* Completely redesigned layout using flexbox instead of Grid */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* First row */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
            {/* First card */}
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                borderRadius: 3,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' },
                border: `1px solid ${coreFeatures[0].icon.props.sx.color}15`,
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Box 
                  sx={{ 
                    width: 70,
                    height: 70,
                    mx: 'auto',
                    mb: 2,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: coreFeatures[0].icon.props.sx.color + '15',
                  }}
                >
                  {React.cloneElement(coreFeatures[0].icon, { 
                    sx: { ...coreFeatures[0].icon.props.sx, fontSize: 36 } 
                  })}
                </Box>
                <Typography 
                  variant="h6" 
                  component="h3" 
                  fontWeight={600}
                  sx={{ 
                    mb: 1.5, 
                    color: coreFeatures[0].icon.props.sx.color,
                  }}
                >
                  {coreFeatures[0].title}
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
                  {coreFeatures[0].description}
                </Typography>
              </Box>
            </Paper>
            
            {/* Second card */}
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                borderRadius: 3,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' },
                border: `1px solid ${coreFeatures[1].icon.props.sx.color}15`,
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Box 
                  sx={{ 
                    width: 70,
                    height: 70,
                    mx: 'auto',
                    mb: 2,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: coreFeatures[1].icon.props.sx.color + '15',
                  }}
                >
                  {React.cloneElement(coreFeatures[1].icon, { 
                    sx: { ...coreFeatures[1].icon.props.sx, fontSize: 36 } 
                  })}
                </Box>
                <Typography 
                  variant="h6" 
                  component="h3" 
                  fontWeight={600}
                  sx={{ 
                    mb: 1.5, 
                    color: coreFeatures[1].icon.props.sx.color,
                  }}
                >
                  {coreFeatures[1].title}
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
                  {coreFeatures[1].description}
                </Typography>
              </Box>
            </Paper>
          </Box>
          
          {/* Second row */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
            {/* Third card */}
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                borderRadius: 3,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' },
                border: `1px solid ${coreFeatures[2].icon.props.sx.color}15`,
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Box 
                  sx={{ 
                    width: 70,
                    height: 70,
                    mx: 'auto',
                    mb: 2,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: coreFeatures[2].icon.props.sx.color + '15',
                  }}
                >
                  {React.cloneElement(coreFeatures[2].icon, { 
                    sx: { ...coreFeatures[2].icon.props.sx, fontSize: 36 } 
                  })}
                </Box>
                <Typography 
                  variant="h6" 
                  component="h3" 
                  fontWeight={600}
                  sx={{ 
                    mb: 1.5, 
                    color: coreFeatures[2].icon.props.sx.color,
                  }}
                >
                  {coreFeatures[2].title}
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
                  {coreFeatures[2].description}
                </Typography>
              </Box>
            </Paper>
            
            {/* Fourth card */}
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                borderRadius: 3,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' },
                border: `1px solid ${coreFeatures[3].icon.props.sx.color}15`,
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Box 
                  sx={{ 
                    width: 70,
                    height: 70,
                    mx: 'auto',
                    mb: 2,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: coreFeatures[3].icon.props.sx.color + '15',
                  }}
                >
                  {React.cloneElement(coreFeatures[3].icon, { 
                    sx: { ...coreFeatures[3].icon.props.sx, fontSize: 36 } 
                  })}
                </Box>
                <Typography 
                  variant="h6" 
                  component="h3" 
                  fontWeight={600}
                  sx={{ 
                    mb: 1.5, 
                    color: coreFeatures[3].icon.props.sx.color,
                  }}
                >
                  {coreFeatures[3].title}
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
                  {coreFeatures[3].description}
                </Typography>
              </Box>
            </Paper>
          </Box>
          
          {/* Third row */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
            {/* Fifth card */}
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                borderRadius: 3,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' },
                border: `1px solid ${coreFeatures[4].icon.props.sx.color}15`,
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Box 
                  sx={{ 
                    width: 70,
                    height: 70,
                    mx: 'auto',
                    mb: 2,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: coreFeatures[4].icon.props.sx.color + '15',
                  }}
                >
                  {React.cloneElement(coreFeatures[4].icon, { 
                    sx: { ...coreFeatures[4].icon.props.sx, fontSize: 36 } 
                  })}
                </Box>
                <Typography 
                  variant="h6" 
                  component="h3" 
                  fontWeight={600}
                  sx={{ 
                    mb: 1.5, 
                    color: coreFeatures[4].icon.props.sx.color,
                  }}
                >
                  {coreFeatures[4].title}
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
                  {coreFeatures[4].description}
                </Typography>
              </Box>
            </Paper>
            
            {/* Sixth card */}
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                borderRadius: 3,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' },
                border: `1px solid ${coreFeatures[5].icon.props.sx.color}15`,
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Box 
                  sx={{ 
                    width: 70,
                    height: 70,
                    mx: 'auto',
                    mb: 2,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: coreFeatures[5].icon.props.sx.color + '15',
                  }}
                >
                  {React.cloneElement(coreFeatures[5].icon, { 
                    sx: { ...coreFeatures[5].icon.props.sx, fontSize: 36 } 
                  })}
                </Box>
                <Typography 
                  variant="h6" 
                  component="h3" 
                  fontWeight={600}
                  sx={{ 
                    mb: 1.5, 
                    color: coreFeatures[5].icon.props.sx.color,
                  }}
                >
                  {coreFeatures[5].title}
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
                  {coreFeatures[5].description}
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
      
      {/* What Can/Cannot Be Shipped */}
      <Box sx={{ mb: 8 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          textAlign="center" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            mb: 4,
            color: '#1A3C5E'
          }}
        >
          Shipping Guidelines
        </Typography>
        <Grid container spacing={4}>
          {additionalInfo.map((info, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 4, 
                  borderRadius: 3,
                  height: '100%',
                  bgcolor: index === 1 ? '#fff5f5' : '#f5f9ff'
                }}
              >
                <Typography 
                  variant="h5" 
                  component="h3" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600,
                    color: index === 1 ? '#d32f2f' : '#1976d2',
                    pb: 2,
                    borderBottom: '1px solid',
                    borderColor: index === 1 ? 'rgba(211, 47, 47, 0.2)' : 'rgba(25, 118, 210, 0.2)'
                  }}
                >
                  {info.title}
                </Typography>
                <List>
                  {info.content.map((item, idx) => (
                    <ListItem key={idx} sx={{ py: 1 }}>
                      <ListItemIcon>
                        {index === 0 ? 
                          <CheckCircle sx={{ color: 'success.main' }} /> : 
                          <Cancel sx={{ color: 'error.main' }} />
                        }
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      {/* Call to Action */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          p: 6, 
          borderRadius: 4,
          textAlign: 'center',
          color: 'white'
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom fontWeight={600}>
          Ready to Get Started?
        </Typography>
        <Typography paragraph sx={{ maxWidth: '700px', mx: 'auto', mb: 4 }}>
          Join thousands of users already saving money and time with our global peer-to-peer delivery network.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
          <Button 
            variant="contained" 
            size="large" 
            component={RouterLink}
            to="/signup"
            sx={{ 
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)'
              },
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600
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
              borderColor: 'white',
              color: 'white',
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255,255,255,0.1)'
              },
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600
            }}
          >
            Learn More
          </Button>
        </Box>
      </Box>
      
      {/* FAQ Link */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h6" gutterBottom>
          Have more questions?
        </Typography>
        <Button 
          variant="text" 
          color="primary" 
          size="large" 
          component={RouterLink}
          to="/faq"
          sx={{ fontWeight: 600 }}
        >
          Visit our FAQ Page
        </Button>
      </Box>
    </Container>
  );
};

export default Services;
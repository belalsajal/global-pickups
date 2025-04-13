import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  IconButton, 
  Divider,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
  TextField
} from '@mui/material';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  LinkedIn,
  Email,
  Phone,
  LocationOn,
  KeyboardArrowRight
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Motion components for animations
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // Dynamic current year
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  useEffect(() => {
    // Update current year if needed (if user keeps the app open during new year)
    const interval = setInterval(() => {
      const year = new Date().getFullYear();
      if (year !== currentYear) {
        setCurrentYear(year);
      }
    }, 1000 * 60 * 60); // Check every hour
    
    return () => clearInterval(interval);
  }, [currentYear]);
  
  // State for newsletter subscription
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      // Here you would typically send this to your API
      setSubscribed(true);
      setEmail('');
      // Reset subscription status after 3 seconds
      setTimeout(() => setSubscribed(false), 3000);
    }
  };
  
  return (
    <Box 
      component="footer" 
      sx={{
        bgcolor: '#1A3C5E',
        color: 'white',
        pt: 4, // Reduced from 8
        pb: 2, // Added explicit bottom padding
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          backgroundColor: 'rgba(245, 124, 0, 0.1)',
          top: '-150px',
          right: '-100px',
          zIndex: 0
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          bottom: '-100px',
          left: '-100px',
          zIndex: 0
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={2}> {/* Reduced spacing from 4 to 2 */}
          {/* Brand and description */}
          <Grid item xs={12} md={4}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography 
                variant="h6" // Reduced from h5
                component="h2" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  mb: 0.5 // Reduced margin bottom
                }}
              >
                <Box 
                  component="img"
                  src="/logo192.png"
                  alt="Global Pickups Logo"
                  sx={{ 
                    width: 30, // Reduced from 40
                    mr: 1,
                    filter: 'brightness(0) invert(1)'
                  }}
                />
                Global Pickups
              </Typography>
              
              <Typography 
                variant="body2" 
                sx={{ 
                  mb: 1.5, // Reduced from 3
                  color: 'rgba(255,255,255,0.7)',
                  maxWidth: '300px',
                  fontSize: '0.8rem' // Smaller font size
                }}
              >
                Connecting travelers with item transportation needs worldwide. 
                Save on shipping costs and earn while you travel with our innovative platform.
              </Typography>
              
              <Stack direction="row" spacing={1}>
                <IconButton 
                  size="small" 
                  aria-label="Facebook"
                  sx={{ 
                    color: 'white',
                    padding: '4px', // Smaller padding
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-3px)',
                      color: '#4267B2' // Facebook blue
                    },
                    transition: 'all 0.2s'
                  }}
                >
                  <Facebook fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small" 
                  aria-label="Twitter"
                  sx={{ 
                    color: 'white',
                    padding: '4px', // Smaller padding
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-3px)',
                      color: '#1DA1F2' // Twitter blue
                    },
                    transition: 'all 0.2s'
                  }}
                >
                  <Twitter fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small" 
                  aria-label="Instagram"
                  sx={{ 
                    color: 'white',
                    padding: '4px', // Smaller padding
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-3px)',
                      color: '#E1306C' // Instagram color
                    },
                    transition: 'all 0.2s'
                  }}
                >
                  <Instagram fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small" 
                  aria-label="LinkedIn"
                  sx={{ 
                    color: 'white',
                    padding: '4px', // Smaller padding
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-3px)',
                      color: '#0077B5' // LinkedIn blue
                    },
                    transition: 'all 0.2s'
                  }}
                >
                  <LinkedIn fontSize="small" />
                </IconButton>
              </Stack>
            </MotionBox>
          </Grid>
          
          {/* Quick links */}
          <Grid item xs={6} sm={4} md={2}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Typography 
                variant="subtitle2" // Changed from subtitle1 to subtitle2
                component="h3" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  position: 'relative',
                  display: 'inline-block',
                  mb: 0.5, // Smaller margin bottom
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '20px', // Smaller width
                    height: '2px',
                    background: '#f57c00',
                    bottom: '-3px', // Moved closer
                    left: 0,
                  }
                }}
              >
                Quick Links
              </Typography>
              
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {[
                  { name: 'Home', href: '/' },
                  { name: 'About', href: '/about' },
                  { name: 'Services', href: '/services' },
                  { name: 'Contact', href: '/contact' },
                  { name: 'FAQ', href: '/faq' }
                ].map((item) => (
                  <Box 
                    component="li" 
                    key={item.name} 
                    sx={{ 
                      mb: 0.75, // Reduced from 1.5
                      transition: 'all 0.2s',
                      '&:hover': {
                        transform: 'translateX(5px)'
                      }
                    }}
                  >
                    <Link 
                      href={item.href} 
                      underline="hover" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '0.8rem', // Smaller font
                        '&:hover': {
                          color: '#f57c00'
                        }
                      }}
                    >
                      <KeyboardArrowRight sx={{ fontSize: 14, mr: 0.25, opacity: 0.7 }} />
                      {item.name}
                    </Link>
                  </Box>
                ))}
              </Box>
            </MotionBox>
          </Grid>
          
          {/* Services */}
          <Grid item xs={6} sm={4} md={2}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography 
                variant="subtitle2" // Changed from subtitle1 to subtitle2
                component="h3" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  position: 'relative',
                  display: 'inline-block',
                  mb: 0.5, // Smaller margin
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '20px', // Smaller width
                    height: '2px',
                    background: '#f57c00',
                    bottom: '-3px', // Moved closer
                    left: 0,
                  }
                }}
              >
                Services
              </Typography>
              
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {[
                  { name: 'Travel Plans', href: '/travel-plans' },
                  { name: 'Item Requests', href: '/item-requests' },
                  { name: 'Tracking', href: '/tracking' },
                  { name: 'Delivery', href: '/delivery' },
                  { name: 'Payments', href: '/payments' }
                ].map((item) => (
                  <Box 
                    component="li" 
                    key={item.name} 
                    sx={{ 
                      mb: 0.75, // Reduced from 1.5
                      transition: 'all 0.2s',
                      '&:hover': {
                        transform: 'translateX(5px)'
                      }
                    }}
                  >
                    <Link 
                      href={item.href} 
                      underline="hover" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '0.8rem', // Smaller font
                        '&:hover': {
                          color: '#f57c00'
                        }
                      }}
                    >
                      <KeyboardArrowRight sx={{ fontSize: 14, mr: 0.25, opacity: 0.7 }} />
                      {item.name}
                    </Link>
                  </Box>
                ))}
              </Box>
            </MotionBox>
          </Grid>
          
          {/* Contact */}
          <Grid item xs={12} sm={4} md={4}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Typography 
                variant="subtitle2" // Changed from subtitle1 to subtitle2
                component="h3" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  position: 'relative',
                  display: 'inline-block',
                  mb: 0.5, // Smaller margin
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '20px', // Smaller width
                    height: '2px',
                    background: '#f57c00',
                    bottom: '-3px', // Moved closer
                    left: 0,
                  }
                }}
              >
                Contact Us
              </Typography>
              
              <Box sx={{ mb: 1.5 }}> {/* Reduced from 3 */}
                <Box sx={{ display: 'flex', mb: 1 }}> {/* Reduced from 2 */}
                  <Email sx={{ mr: 1, color: '#f57c00', fontSize: 16 }} /> {/* Smaller icon */}
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}> {/* Smaller font */}
                    <Link 
                      href="mailto:support@globalpickups.com" 
                      sx={{ 
                        color: 'inherit',
                        textDecoration: 'none',
                        '&:hover': { color: '#f57c00', textDecoration: 'underline' }
                      }}
                    >
                      support@globalpickups.com
                    </Link>
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', mb: 1 }}> {/* Reduced from 2 */}
                  <Phone sx={{ mr: 1, color: '#f57c00', fontSize: 16 }} /> {/* Smaller icon */}
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}> {/* Smaller font */}
                    <Link 
                      href="tel:+15551234567" 
                      sx={{ 
                        color: 'inherit',
                        textDecoration: 'none',
                        '&:hover': { color: '#f57c00', textDecoration: 'underline' }
                      }}
                    >
                      +1 (555) 123-4567
                    </Link>
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', mb: 1 }}> {/* Reduced from 2 */}
                  <LocationOn sx={{ mr: 1, color: '#f57c00', fontSize: 16 }} /> {/* Smaller icon */}
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}> {/* Smaller font */}
                    123 Global Street, San Francisco, CA 94105
                  </Typography>
                </Box>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 0.5, fontSize: '0.85rem' }}> {/* Smaller margin and font size */}
                  Subscribe to our newsletter
                </Typography>
                
                <Box 
                  component="form"
                  onSubmit={handleSubscribe}
                  sx={{ 
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    '& .MuiInputBase-root': {
                      bgcolor: 'rgba(255,255,255,0.1)',
                      borderRadius: { xs: 1, sm: '4px 0 0 4px' },
                      mb: { xs: 1, sm: 0 },
                      height: '40px' // Reduced height
                    },
                    mb: 1 // Reduced from 2
                  }}
                >
                  <TextField
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    required
                    type="email"
                    fullWidth
                    InputProps={{
                      style: {
                        color: 'white',
                        fontSize: '0.8rem' // Smaller font
                      }
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                          borderRight: { sm: 'none' }
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#f57c00',
                        }
                      },
                      '& .MuiInputBase-input::placeholder': {
                        color: 'rgba(255, 255, 255, 0.5)',
                        opacity: 1
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: '#f57c00',
                      borderRadius: { xs: 1, sm: '0 4px 4px 0' },
                      '&:hover': {
                        bgcolor: '#e65100'
                      },
                      height: { sm: '40px' }, // Reduced from 56px
                      fontSize: '0.8rem' // Smaller font
                    }}
                  >
                    Subscribe
                  </Button>
                </Box>
                
                {subscribed && (
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#4caf50',
                      fontSize: '0.75rem', // Smaller font
                      animation: 'fadeIn 0.5s',
                      '@keyframes fadeIn': {
                        '0%': { opacity: 0 },
                        '100%': { opacity: 1 }
                      }
                    }}
                  >
                    Thank you for subscribing!
                  </Typography>
                )}
              </Box>
            </MotionBox>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2 }} /> {/* Reduced margin from 4 to 2 */}
        
        <Box 
          sx={{ 
            py: 1.5, // Reduced from 3
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'center' },
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <MotionTypography 
            variant="body2" 
            color="rgba(255,255,255,0.6)"
            sx={{ mb: { xs: 1, sm: 0 }, fontSize: '0.75rem' }} // Smaller margin and font
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            © {currentYear} Global Pickups. All rights reserved.
          </MotionTypography>
          
          <Box 
            sx={{ 
              display: 'flex', 
              gap: 1.5, // Reduced from 2
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', sm: 'flex-end' } 
            }}
          >
            {[
              { name: 'Privacy Policy', href: '/privacy' },
              { name: 'Terms of Service', href: '/terms' },
              { name: 'Cookies Settings', href: '/cookies' }
            ].map((text) => (
              <MotionTypography
                key={text.name}
                variant="body2"
                component={Link}
                href={text.href}
                sx={{ 
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  fontSize: '0.75rem', // Smaller font
                  '&:hover': {
                    color: '#f57c00',
                    textDecoration: 'underline'
                  }
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {text.name}
              </MotionTypography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
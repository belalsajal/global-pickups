import React, { useState, useEffect } from 'react';
import { 
  AppBar, Toolbar, Button, Box, Container, 
  useScrollTrigger, IconButton, Drawer, List, ListItem,
  ListItemText, Divider, Hidden, Typography
} from '@mui/material';
import { Menu as MenuIcon, Close } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { MotionBox } from '../shared/MotionComponents';

const NavigationBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 80
  });

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'How It Works', path: '/#how-it-works' },
    { label: 'Safety', path: '/#safety' },
    { label: 'FAQ', path: '/#faq' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2 }}>
        <Box 
          component="img" 
          src="/logo.png" 
          alt="Global Pickups" 
          sx={{ height: 80 }} // Doubled the size for mobile drawer
        />
        <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.label} 
            component={RouterLink} 
            to={item.path} 
            button 
            sx={{ textAlign: 'center' }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', px: 2 }}>
          <Button 
            component={RouterLink}
            to="/login" 
            sx={{ mb: 1 }}
          >
            Login
          </Button>
          <Button 
            component={RouterLink}
            to="/signup" 
            variant="contained" 
            color="primary"
          >
            Sign Up
          </Button>
        </Box>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        color="transparent" 
        elevation={0}
        sx={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          boxShadow: scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
          transition: 'all 0.3s ease',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          padding: scrolled ? '5px 0' : '15px 0',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <MotionBox
              component={RouterLink}
              to="/"
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                textDecoration: 'none',
                flexGrow: 0, // Changed from 1 to 0 to prevent pushing other elements
                mr: 4 // Added margin to create space between logo and other elements
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box 
                component="img" 
                src="/logo.png" 
                alt="Global Pickups" 
                sx={{ 
                  height: scrolled ? '80px' : '100px', // Doubled from 40px/50px to 80px/100px
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  zIndex: 100, // Ensure logo is always on top
                  mr: 2 // Increased right margin to create more space
                }}
              />
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 600, 
                  display: { xs: 'none', sm: 'block' },
                  color: scrolled ? 'primary.main' : 'common.white',
                  transition: 'all 0.3s ease',
                  textShadow: scrolled ? 'none' : '0 2px 4px rgba(0,0,0,0.3)',
                  ml: 2 // Added left margin to move text away from logo
                }}
              >
                Global Pickups
              </Typography>
            </MotionBox>

            <Box sx={{ flexGrow: 1 }} /> {/* Added spacer to push menu items to the right */}

            <Hidden mdDown>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {navItems.map((item, index) => (
                  <MotionBox
                    key={item.label}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Button 
                      component={RouterLink}
                      to={item.path}
                      sx={{ 
                        mx: 1,
                        color: scrolled ? 'text.primary' : 'white',
                        '&:hover': {
                          backgroundColor: scrolled ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.15)'
                        },
                        textShadow: scrolled ? 'none' : '0 1px 2px rgba(0,0,0,0.3)'
                      }}
                    >
                      {item.label}
                    </Button>
                  </MotionBox>
                ))}

                <Box sx={{ ml: 2, display: 'flex' }}>
                  <MotionBox
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: navItems.length * 0.1 }}
                  >
                    <Button 
                      component={RouterLink}
                      to="/login"
                      sx={{ 
                        mr: 1,
                        color: scrolled ? 'primary.main' : 'white',
                        borderColor: scrolled ? 'primary.main' : 'white',
                        '&:hover': {
                          backgroundColor: scrolled ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.15)',
                          borderColor: scrolled ? 'primary.dark' : 'white'
                        }
                      }}
                    >
                      Login
                    </Button>
                  </MotionBox>

                  <MotionBox
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (navItems.length + 1) * 0.1 }}
                  >
                    <Button 
                      component={RouterLink}
                      to="/signup"
                      variant="contained" 
                      color="primary"
                      sx={{
                        boxShadow: scrolled ? undefined : '0 4px 14px rgba(0,0,0,0.25)',
                        bgcolor: scrolled ? 'primary.main' : 'white',
                        color: scrolled ? 'white' : 'primary.main',
                        '&:hover': {
                          bgcolor: scrolled ? 'primary.dark' : 'rgba(255,255,255,0.9)',
                          boxShadow: scrolled ? undefined : '0 6px 20px rgba(0,0,0,0.3)'
                        }
                      }}
                    >
                      Sign Up
                    </Button>
                  </MotionBox>
                </Box>
              </Box>
            </Hidden>

            <Hidden mdUp>
              <IconButton
                color={scrolled ? "inherit" : "default"}
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ 
                  ml: 2,
                  bgcolor: scrolled ? 'transparent' : 'rgba(255,255,255,0.2)',
                  color: scrolled ? 'text.primary' : 'white',
                  '&:hover': {
                    bgcolor: scrolled ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.3)'
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Increase the spacer height to match the larger logo */}
      <Toolbar 
        sx={{ 
          height: { xs: '100px', md: '130px' }, // Increased from 70px/100px to 100px/130px
          transition: 'all 0.3s ease' 
        }} 
      />

      <Hidden mdUp>
        <Drawer
          anchor="right"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          PaperProps={{
            sx: {
              boxSizing: 'border-box',
              width: 280,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </>
  );
};

export default NavigationBar;

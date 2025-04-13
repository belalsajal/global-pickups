import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Button, IconButton, Box,
  Menu, MenuItem, Avatar, Divider, ListItemIcon, useScrollTrigger,
  Slide, Container
} from '@mui/material';
import {
  Person, Menu as MenuIcon, Login, PersonAdd,
  Logout, Settings, FlightTakeoff, LocalShipping, Chat, Dashboard as DashboardIcon, Info,
  AddCircle
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

// Function to hide navbar on scroll down
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navigation = ({ user, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const open = Boolean(anchorEl);
  const mobileMenuOpen = Boolean(mobileMenuAnchorEl);
  
  // Detect scroll position to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          bgcolor: 'transparent', 
          color: scrolled ? 'text.primary' : (location.pathname === '/' ? 'white' : 'text.primary'), 
          boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          transition: 'all 0.3s ease',
          borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
          background: scrolled ? 'linear-gradient(90deg, rgba(109, 142, 197, 0.08), rgba(211, 98, 44, 0.03))' : 'transparent',
        }}
        elevation={0}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 1, px: 0 }}>
            <Typography 
              variant="h5" 
              component={Link} 
              to="/"
              sx={{ 
                fontWeight: 700, 
                color: scrolled ? '#6d8ec5' : (location.pathname === '/' ? 'white' : '#6d8ec5'), 
                textDecoration: 'none',
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: '-0.5px',
                mr: 3,
                textShadow: (!scrolled && location.pathname === '/') ? '0 1px 3px rgba(0,0,0,0.3)' : 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  opacity: 0.9
                }
              }}
            >
              Global Pickups
            </Typography>
            
            <Box sx={{ flexGrow: 1 }} />
            
            {user ? (
              <>
                <Box 
                  sx={{ 
                    display: { xs: 'none', md: 'flex' }, 
                    gap: 1,
                    '.MuiButton-root': {
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      borderRadius: '8px',
                      px: 2,
                      transition: 'all 0.2s ease',
                      color: scrolled ? 'text.primary' : (location.pathname === '/' ? 'white' : 'text.primary'),
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        bgcolor: scrolled ? 'rgba(109, 142, 197, 0.08)' : 'rgba(255, 255, 255, 0.15)',
                      }
                    }
                  }}
                >
                  <Button 
                    component={Link} 
                    to="/dashboard"
                    startIcon={<DashboardIcon />}
                    sx={{
                      borderBottom: location.pathname === '/dashboard' ? '3px solid #6d8ec5' : 'none',
                      color: location.pathname === '/dashboard' ? '#6d8ec5' : 'inherit',
                      pb: location.pathname === '/dashboard' ? 0.5 : 1,
                    }}
                  >
                    Dashboard
                  </Button>
                  <Button 
                    component={Link} 
                    to="/travel-plans"
                    startIcon={<FlightTakeoff />}
                    sx={{
                      borderBottom: location.pathname === '/travel-plans' ? '3px solid #6d8ec5' : 'none',
                      color: location.pathname === '/travel-plans' ? '#6d8ec5' : 'inherit',
                      pb: location.pathname === '/travel-plans' ? 0.5 : 1,
                    }}
                  >
                    Travel Plans
                  </Button>
                  <Button 
                    component={Link} 
                    to="/item-requests"
                    startIcon={<LocalShipping />}
                    sx={{
                      borderBottom: location.pathname === '/item-requests' ? '3px solid #6d8ec5' : 'none',
                      color: location.pathname === '/item-requests' ? '#6d8ec5' : 'inherit',
                      pb: location.pathname === '/item-requests' ? 0.5 : 1,
                    }}
                  >
                    Requests
                  </Button>
                  <Button 
                    component={Link} 
                    to="/messages"
                    startIcon={<Chat />}
                    sx={{
                      borderBottom: location.pathname === '/messages' ? '3px solid #6d8ec5' : 'none',
                      color: location.pathname === '/messages' ? '#6d8ec5' : 'inherit',
                      pb: location.pathname === '/messages' ? 0.5 : 1,
                    }}
                  >
                    Messages
                  </Button>
                  <Button 
                    component={Link} 
                    to="/about"
                    startIcon={<Info />}
                    sx={{
                      borderBottom: location.pathname === '/about' ? '3px solid #6d8ec5' : 'none',
                      color: location.pathname === '/about' ? '#6d8ec5' : 'inherit',
                      pb: location.pathname === '/about' ? 0.5 : 1,
                    }}
                  >
                    About
                  </Button>
                  <Button 
                    variant="contained"
                    component={Link} 
                    to="/travel-request"
                    startIcon={<AddCircle />}
                    sx={{
                      ml: 1,
                      bgcolor: '#d3622c', // Flame color for CTA button
                      '&:hover': {
                        bgcolor: '#b14c1e', // Darker flame
                        boxShadow: '0 6px 15px rgba(211, 98, 44, 0.3)',
                      },
                      fontWeight: 600,
                    }}
                  >
                    Post/Request
                  </Button>
                </Box>
                
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ 
                    ml: 2,
                    border: '2px solid',
                    borderColor: scrolled ? '#e0e3e7' : (location.pathname === '/' ? 'rgba(255, 255, 255, 0.5)' : '#e0e3e7'),
                    p: 0.2,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: '#6d8ec5', // Lake Blue
                      transform: 'translateY(-2px)'
                    }
                  }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar 
                    src={user.avatar_url} 
                    alt={user.full_name}
                    sx={{ width: 32, height: 32 }}
                  />
                </IconButton>
                
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      borderRadius: 2,
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                      borderTop: '3px solid #6d8ec5', // Lake Blue accent
                      '& .MuiMenuItem-root': {
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        py: 1.2,
                        px: 2.5,
                        borderRadius: 1,
                        mx: 0.5,
                        my: 0.2,
                        '&:hover': {
                          bgcolor: 'rgba(109, 142, 197, 0.08)', // Light Lake Blue
                        }
                      }
                    }
                  }}
                >
                  <MenuItem component={Link} to="/profile">
                    <ListItemIcon>
                      <Person sx={{ color: '#6d8ec5' }} fontSize="small" />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                  <MenuItem component={Link} to="/dashboard">
                    <ListItemIcon>
                      <DashboardIcon sx={{ color: '#6d8ec5' }} fontSize="small" />
                    </ListItemIcon>
                    Dashboard
                  </MenuItem>
                  <MenuItem component={Link} to="/settings">
                    <ListItemIcon>
                      <Settings sx={{ color: '#6d8ec5' }} fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <Divider sx={{ my: 1 }} />
                  <MenuItem onClick={onLogout} sx={{ color: '#d3622c' }}> {/* Flame color for logout */}
                    <ListItemIcon>
                      <Logout sx={{ color: '#d3622c' }} fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
                
                {/* Mobile menu button */}
                <IconButton 
                  color="inherit" 
                  edge="end" 
                  sx={{ 
                    display: { xs: 'flex', md: 'none' },
                    color: scrolled ? '#6d8ec5' : (location.pathname === '/' ? 'white' : '#6d8ec5'),
                  }}
                  aria-label="menu"
                  onClick={handleMobileMenuOpen}
                >
                  <MenuIcon />
                </IconButton>
                
                {/* Mobile Menu */}
                <Menu
                  anchorEl={mobileMenuAnchorEl}
                  id="mobile-menu"
                  open={mobileMenuOpen}
                  onClose={handleMobileMenuClose}
                  onClick={handleMobileMenuClose}
                  PaperProps={{
                    sx: {
                      width: '85vw',
                      maxWidth: '300px',
                      borderRadius: 2,
                      boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                      mt: 1.5,
                      p: 1,
                      backgroundColor: '#ffffff',
                      backgroundImage: 'linear-gradient(rgba(240, 234, 220, 0.05), rgba(240, 234, 220, 0.05))', // Subtle eggshell tint
                      borderTop: '3px solid #6d8ec5', // Lake Blue accent
                      '& .MuiMenuItem-root': {
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        py: 1.5,
                        borderRadius: 1,
                        my: 0.5,
                        '&:hover': {
                          bgcolor: 'rgba(109, 142, 197, 0.08)', // Light Lake Blue
                        }
                      }
                    }
                  }}
                >
                  <MenuItem component={Link} to="/dashboard">
                    <ListItemIcon>
                      <DashboardIcon sx={{ color: '#6d8ec5' }} />
                    </ListItemIcon>
                    Dashboard
                  </MenuItem>
                  <MenuItem component={Link} to="/travel-request" sx={{ color: '#d3622c', fontWeight: 700 }}>
                    <ListItemIcon>
                      <AddCircle sx={{ color: '#d3622c' }} />
                    </ListItemIcon>
                    Post or Request
                  </MenuItem>
                  <MenuItem component={Link} to="/travel-plans">
                    <ListItemIcon>
                      <FlightTakeoff sx={{ color: '#6d8ec5' }} />
                    </ListItemIcon>
                    Travel Plans
                  </MenuItem>
                  <MenuItem component={Link} to="/item-requests">
                    <ListItemIcon>
                      <LocalShipping sx={{ color: '#6d8ec5' }} />
                    </ListItemIcon>
                    Item Requests
                  </MenuItem>
                  <MenuItem component={Link} to="/messages">
                    <ListItemIcon>
                      <Chat sx={{ color: '#6d8ec5' }} />
                    </ListItemIcon>
                    Messages
                  </MenuItem>
                  <MenuItem component={Link} to="/about">
                    <ListItemIcon>
                      <Info sx={{ color: '#6d8ec5' }} />
                    </ListItemIcon>
                    About
                  </MenuItem>
                  <Divider sx={{ my: 1.5 }} />
                  <MenuItem component={Link} to="/profile">
                    <ListItemIcon>
                      <Person sx={{ color: '#6d8ec5' }} />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                  <MenuItem component={Link} to="/settings">
                    <ListItemIcon>
                      <Settings sx={{ color: '#6d8ec5' }} />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={onLogout} sx={{ color: '#d3622c' }}> {/* Flame color */}
                    <ListItemIcon>
                      <Logout sx={{ color: '#d3622c' }} />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 1,
                  alignItems: 'center',
                  '.MuiButton-root': {
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    borderRadius: '8px',
                    py: 1,
                    transition: 'all 0.2s ease',
                  }
                }}
              >
                <Button 
                  component={Link} 
                  to="/about"
                  startIcon={<Info />}
                  sx={{
                    color: scrolled ? 'text.primary' : (location.pathname === '/' ? 'white' : 'text.primary'),
                    borderBottom: location.pathname === '/about' ? '3px solid #6d8ec5' : 'none',
                    pb: location.pathname === '/about' ? 0.5 : 1,
                    '&:hover': {
                      bgcolor: scrolled ? 'rgba(109, 142, 197, 0.08)' : 'rgba(255, 255, 255, 0.15)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  About
                </Button>
                <Button 
                  component={Link} 
                  to="/login"
                  startIcon={<Login />}
                  sx={{
                    color: scrolled ? 'text.primary' : (location.pathname === '/' ? 'white' : 'text.primary'),
                    borderBottom: location.pathname === '/login' ? '3px solid #6d8ec5' : 'none',
                    pb: location.pathname === '/login' ? 0.5 : 1,
                    '&:hover': {
                      bgcolor: scrolled ? 'rgba(109, 142, 197, 0.08)' : 'rgba(255, 255, 255, 0.15)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  Login
                </Button>
                <Button 
                  variant="contained" 
                  component={Link} 
                  to="/signup"
                  startIcon={<PersonAdd />}
                  sx={{
                    bgcolor: '#d3622c', // Flame color for CTA
                    '&:hover': {
                      bgcolor: '#b14c1e', // Darker flame
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 15px rgba(211, 98, 44, 0.3)',
                    },
                    fontWeight: 600,
                    boxShadow: '0 4px 10px rgba(211, 98, 44, 0.25)',
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {/* Add spacing to account for the fixed navbar */}
      <Toolbar sx={{ mb: 1 }} />
    </>
  );
};

export default Navigation;
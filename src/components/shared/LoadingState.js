import React from 'react';
import { Box, CircularProgress, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingState = ({ 
  message = 'Loading...', 
  fullScreen = false,
  minHeight = '200px',
  showLogo = false,
  withBackground = true
}) => {
  const MotionPaper = motion(Paper);
  const containerStyles = fullScreen ? {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)'
  } : {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: minHeight,
    width: '100%'
  };

  const content = (
    <>
      {showLogo && (
        <Box sx={{ mb: 2 }}>
          <img 
            src="/logo192.png" 
            alt="Global Pickups Logo" 
            style={{ width: 60, height: 60 }}
          />
        </Box>
      )}
      <CircularProgress 
        size={fullScreen ? 60 : 40} 
        thickness={4} 
        sx={{ 
          color: '#4681f4',
          mb: 2
        }} 
      />
      <Typography 
        variant="body1" 
        component="div"
        sx={{ 
          color: fullScreen ? '#1A3C5E' : 'text.secondary',
          fontWeight: fullScreen ? 500 : 400,
          textAlign: 'center',
          maxWidth: '80%',
          fontSize: fullScreen ? '1rem' : '0.9rem'
        }}
      >
        {message}
      </Typography>
    </>
  );

  if (withBackground && !fullScreen) {
    return (
      <Box sx={containerStyles}>
        <MotionPaper
          elevation={2}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          sx={{
            p: 3,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
            background: `linear-gradient(145deg, #ffffff 0%, #f8faff 100%)`,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '3px',
              background: 'linear-gradient(90deg, #4681f4 0%, rgba(54, 98, 234, 0.5) 100%)',
              borderRadius: '3px 3px 0 0'
            }
          }}
        >
          {content}
        </MotionPaper>
      </Box>
    );
  }

  return (
    <Box sx={containerStyles}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {content}
      </Box>
    </Box>
  );
};

export default LoadingState;
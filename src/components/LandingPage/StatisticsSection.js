import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Groups, LocalShipping, Public, Star } from '@mui/icons-material';

const StatisticsSection = () => {
  const MotionBox = motion(Box);
  
  return (
    <Box sx={{ mt: 8, textAlign: 'center' }}>
      <MotionBox
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <Paper 
          elevation={0} 
          sx={{ 
            py: 5, 
            px: { xs: 2, md: 5 }, 
            borderRadius: '16px',
            background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
          }}
        >
          <Typography 
            variant="h5" 
            component="h3" 
            gutterBottom 
            sx={{ 
              mb: 4, 
              fontWeight: 'medium',
              color: '#1A3C5E'
            }}
          >
            Why thousands of people love Global Pickups
          </Typography>
          
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={6} md={3}>
              <Box sx={{ p: 1 }}>
                <Typography 
                  variant="h3" 
                  component="p" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Groups fontSize="large" sx={{ mr: 1 }} /> 20k+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Active Users
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={6} md={3}>
              <Box sx={{ p: 1 }}>
                <Typography 
                  variant="h3" 
                  component="p" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: 'secondary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <LocalShipping fontSize="large" sx={{ mr: 1 }} /> 15k+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Items Delivered
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={6} md={3}>
              <Box sx={{ p: 1 }}>
                <Typography 
                  variant="h3" 
                  component="p" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: 'success.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Public fontSize="large" sx={{ mr: 1 }} /> 120+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Countries Covered
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={6} md={3}>
              <Box sx={{ p: 1 }}>
                <Typography 
                  variant="h3" 
                  component="p" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: '#ff9800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Star fontSize="large" sx={{ mr: 1 }} /> 4.8
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Average Rating
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </MotionBox>
    </Box>
  );
};

export default StatisticsSection;
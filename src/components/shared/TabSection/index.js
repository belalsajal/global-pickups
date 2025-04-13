import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, useMediaQuery } from '@mui/material';
import { Flight, LocalShipping } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { motion } from '../MotionComponents';
import TravelPlanTab from './TravelPlanTab';
import RequestItemTab from './RequestItemTab';

const TabSection = () => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const TabPanel = ({ children, value, index, ...other }) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        style={{ width: '100%' }}
        {...other}
      >
        {value === index && (
          <Box pt={3}>
            {children}
          </Box>
        )}
      </div>
    );
  };

  const MotionTab = motion(Tab);

  return (
    <Box sx={{ 
      width: '100%',
      bgcolor: '#f7f9fc',
      borderTop: '1px solid #eaeef3',
      p: { xs: 2, sm: 3, md: 4 },
      borderBottomLeftRadius: '10px',
      borderBottomRightRadius: '10px'
    }}>
      <Typography 
        variant="h5" 
        component="h2" 
        gutterBottom 
        sx={{ 
          textAlign: 'center', 
          fontWeight: 'bold',
          mb: 4,
          color: '#1a3c5e',
          position: 'relative',
          display: 'inline-block',
          mx: 'auto',
          width: '100%',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -10,
            left: 'calc(50% - 40px)',
            width: '80px',
            height: '3px',
            background: 'linear-gradient(90deg, #4681f4 0%, #f57c00 100%)',
            borderRadius: '3px'
          }
        }}
      >
        What are you looking for?
      </Typography>
      
      <Tabs 
        value={tabValue} 
        onChange={handleTabChange}
        variant="fullWidth" 
        textColor="primary"
        aria-label="Travel or request tabs"
        sx={{
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
              I'm Traveling
            </Typography>
          }
          sx={{ 
            flexDirection: 'row',
            color: tabValue === 0 ? '#3662ea' : 'text.secondary',
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
              I Need Something Delivered
            </Typography>
          }
          sx={{ 
            flexDirection: 'row',
            color: tabValue === 1 ? '#f57c00' : 'text.secondary'
          }}
        />
      </Tabs>
      
      <TabPanel value={tabValue} index={0}>
        <TravelPlanTab />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <RequestItemTab />
      </TabPanel>
    </Box>
  );
};

export default TabSection;
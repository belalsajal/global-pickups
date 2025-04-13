import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@mui/material';
import NavigationBar from './NavigationBar';
import HeroSection from './HeroSection';
import SearchSection from './SearchSection';
import TabSection from '../shared/TabSection';
// Removed FeaturesSection import
import TestimonialsSection from './TestimonialsSection';
import CTASection from './CTASection';
import StatisticsSection from './StatisticsSection';

const LandingPage = ({ onSignUp, onLogin }) => {
  return (
    <>
      {/* SEO optimization with React Helmet */}
      <Helmet>
        <title>Global Pickups | Connecting Travelers with Item Transportation Needs</title>
        <meta name="description" content="Global Pickups connects travelers with people who need items transported across the world. Save on shipping costs and earn while you travel." />
        <meta name="keywords" content="travel, shipping, transportation, global delivery, peer-to-peer delivery, travel with purpose" />
        <meta property="og:title" content="Global Pickups | Connecting Travelers with Item Transportation" />
        <meta property="og:description" content="Connect with travelers to transport your items around the world or earn money by carrying items during your travels." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://globalpickups.com" />
        <meta property="og:image" content="/logo512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://globalpickups.com" />
      </Helmet>

      <Box sx={{ overflow: 'hidden' }}>
        <NavigationBar />
        {/* Hero Section */}
        <HeroSection />
        
        {/* Search and Tab Section - moved out of the hero into a dedicated container */}
        <Container maxWidth="lg" sx={{ mt: -8, mb: 8, position: 'relative', zIndex: 10 }}>
          <Box sx={{ 
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', 
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <SearchSection />
            <TabSection />
          </Box>
        </Container>

        {/* Join As a Traveler or Requester section moved above HowItWorks */}
        <CTASection />
        
        {/* Other sections below */}
        <HowItWorksSection />
        {/* FeaturesSection removed */}
        <StatisticsSection />
        <TestimonialsSection />
      </Box>
    </>
  );
};

export default LandingPage;
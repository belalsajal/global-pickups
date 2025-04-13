import React from 'react';
import { Box, Container } from '@mui/material';
import { Helmet } from 'react-helmet';

// Import modular components
import HeroSection from './LandingPage/HeroSection';
import SearchSection from './LandingPage/SearchSection';
import { HowItWorksSection } from './LandingPage/HowItWorksSection';
import StatisticsSection from './LandingPage/StatisticsSection';
import TestimonialsSection from './LandingPage/TestimonialsSection';
import CTASection from './LandingPage/CTASection';

const LandingPage = ({ onSignUp, onLogin }) => {
  return (
    <>
      <Helmet>
        <title>Global Pickups - Connect Travelers with Item Requesters</title>
        <meta name="description" content="Global Pickups is a platform that connects travelers with people who need items delivered. Save on shipping costs and earn money while traveling." />
      </Helmet>

      {/* Hero Section */}
      <HeroSection />

      {/* Search Section */}
      <SearchSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Features Section removed */}

      {/* Statistics Section */}
      <StatisticsSection />

      {/* Tab Section removed - now available on Services page */}

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />
    </>
  );
};

export default LandingPage;
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import WhoWeAre from './About/WhoWeAre';
import WhatWeDo from './About/WhatWeDo';
import WhySection from './About/WhySection';
import JoinCommunity from './About/JoinCommunity';

const About = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Use IntersectionObserver for fade-in animations when component mounts
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    // Select all sections to animate
    document.querySelectorAll('section').forEach(section => {
      section.classList.add('fade-section');
      observer.observe(section);
    });

    return () => {
      document.querySelectorAll('section').forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>About Global Pickups | Our Story</title>
        <meta name="description" content="Learn how Global Pickups connects travelers with item transportation needs across the globe, making international delivery personal and affordable." />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style>
          {`
            body {
              font-family: 'Poppins', sans-serif;
              margin: 0;
              padding: 0;
            }
            .fade-section {
              opacity: 0;
              transform: translateY(20px);
              transition: opacity 0.5s ease, transform 0.5s ease;
            }
            .fade-section.visible {
              opacity: 1;
              transform: translateY(0);
            }
            *:focus-visible {
              outline: 2px solid #4A90E2;
              outline-offset: 2px;
            }
          `}
        </style>
      </Helmet>
      
      <main>
        <WhoWeAre />
        <WhatWeDo />
        <WhySection />
        <JoinCommunity />
      </main>
    </>
  );
};

export default About;
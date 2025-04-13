import React from 'react';
import { Container, Box } from '@mui/material';
import SearchBar from '../SearchBar';

const SearchSection = () => {
  return (
    <Container maxWidth="lg" sx={{ mb: 0, position: 'relative', zIndex: 10 }}>
      <Box sx={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: '10px 10px 0 0',
        py: 3,
        px: 2,
        boxShadow: '0 -5px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <SearchBar />
      </Box>
    </Container>
  );
};

export default SearchSection;
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { 
  Container, 
  Typography, 
  Box, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Grid,
  Paper,
  TextField,
  Button
} from '@mui/material';
import { ExpandMore, Search, HelpOutline } from '@mui/icons-material';
import { motion } from 'framer-motion';

// FAQ data - you can extend this later
const faqCategories = [
  {
    category: "General Questions",
    questions: [
      {
        question: "What is Global Pickups?",
        answer: "Global Pickups is a platform that connects travelers with people who need items transported across borders. Our service allows travelers to monetize their extra luggage space, while helping people ship items internationally more affordably than traditional shipping methods."
      },
      {
        question: "How does Global Pickups work?",
        answer: "Travelers post their upcoming trips and available luggage space. People who need items transported (requesters) post what they need delivered. Our platform matches compatible travelers and requesters, facilitates secure payment, and provides tracking and communication tools."
      },
      {
        question: "Is Global Pickups available worldwide?",
        answer: "Yes, our service is available globally. However, users must comply with all applicable laws and regulations regarding customs, duties, and prohibited items when transporting goods internationally."
      },
      {
        question: "How much does it cost to use Global Pickups?",
        answer: "Registration is free. Travelers set their own compensation rates for carrying items. Global Pickups charges a small service fee on successful matches to maintain the platform and provide customer support."
      }
    ]
  },
  {
    category: "For Travelers",
    questions: [
      {
        question: "How do I become a traveler on Global Pickups?",
        answer: "Sign up for an account, verify your identity through our secure process, and then you can post your travel plans including departure/arrival locations, dates, and available luggage space."
      },
      {
        question: "How much can I earn as a traveler?",
        answer: "Earnings vary depending on your route, the size and value of items you transport, and your own pricing. Many travelers earn enough to offset a significant portion of their travel costs."
      },
      {
        question: "What items am I allowed to transport?",
        answer: "You can transport legal items that comply with airline regulations and customs laws of your departure and destination countries. Prohibited items include dangerous goods, illegal substances, weapons, and certain perishables."
      },
      {
        question: "What happens if something goes wrong during transport?",
        answer: "Our platform includes an insurance option to protect both travelers and requesters. In case of damage, loss, or other issues, our support team will help resolve the situation according to our protection policies."
      }
    ]
  },
  {
    category: "For Requesters",
    questions: [
      {
        question: "How do I request an item to be transported?",
        answer: "Create a listing describing your item, including its size, weight, value, pickup location, destination, and timeline. Our system will match you with suitable travelers heading to your destination."
      },
      {
        question: "How much does it cost to ship an item?",
        answer: "Costs depend on the item's size, weight, value, and destination. Typically, our service costs 40-70% less than traditional international shipping options."
      },
      {
        question: "How is my item protected during transport?",
        answer: "All transactions include basic insurance. For higher-value items, you can purchase additional insurance. We verify traveler identities and use a secure escrow payment system that releases funds only after successful delivery."
      },
      {
        question: "What if my item doesn't arrive or is damaged?",
        answer: "Report the issue immediately through our platform. Our support team will investigate and resolve the situation according to our protection policies, which may include compensation for lost or damaged items."
      }
    ]
  },
  {
    category: "Safety & Trust",
    questions: [
      {
        question: "How does Global Pickups verify user identities?",
        answer: "We use a combination of ID verification, address verification, and social media validation. All users must complete this verification process before using our services."
      },
      {
        question: "How are payments handled?",
        answer: "We use a secure escrow system. Requesters pay upfront, but funds are only released to travelers after successful delivery. This protects both parties in the transaction."
      },
      {
        question: "Can I trust someone to carry my valuable items?",
        answer: "Our comprehensive rating and review system helps you make informed decisions. Additionally, our insurance policies and secure payment system provide multiple layers of protection."
      },
      {
        question: "What happens if there's a dispute between a traveler and requester?",
        answer: "Our dedicated support team mediates disputes following clear resolution procedures. Most issues are resolved quickly through our standardized process."
      }
    ]
  }
];

const MotionContainer = motion(Container);
const MotionTypography = motion(Typography);
const MotionBox = motion(Box);
const MotionAccordion = motion(Accordion);
const MotionPaper = motion(Paper);

const FAQ = () => {
  const [search, setSearch] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [filteredFaqs, setFilteredFaqs] = useState(faqCategories);

  useEffect(() => {
    // Filter FAQs based on search query
    if (search.trim() === '') {
      setFilteredFaqs(faqCategories);
      return;
    }
    
    const searchLower = search.toLowerCase();
    const filtered = faqCategories.map(category => ({
      category: category.category,
      questions: category.questions.filter(
        item => 
          item.question.toLowerCase().includes(searchLower) || 
          item.answer.toLowerCase().includes(searchLower)
      )
    })).filter(category => category.questions.length > 0);
    
    setFilteredFaqs(filtered);
  }, [search]);

  // Handle accordion expansion
  const handleChange = (category) => (event, isExpanded) => {
    setExpandedCategory(isExpanded ? category : null);
  };

  return (
    <>
      <Helmet>
        <title>FAQ - Global Pickups</title>
        <meta name="description" content="Frequently asked questions about Global Pickups - connecting travelers with item transportation needs worldwide" />
      </Helmet>
      
      <Box
        sx={{
          backgroundColor: '#1A3C5E',
          color: 'white',
          pt: 10,
          pb: 8,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(26, 60, 94, 0.9) 0%, rgba(54, 98, 234, 0.75) 100%)',
            zIndex: 0
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <MotionTypography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 700, 
              textAlign: 'center',
              mb: 2,
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </MotionTypography>
          
          <MotionTypography 
            variant="h6"
            sx={{ 
              textAlign: 'center',
              mb: 5,
              maxWidth: '800px',
              mx: 'auto',
              opacity: 0.9
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Find answers to common questions about Global Pickups, our services, and how our platform works
          </MotionTypography>
        </Container>
      </Box>
      
      <MotionContainer 
        maxWidth="lg" 
        sx={{ 
          py: 5,
          mt: -4,
          position: 'relative',
          zIndex: 2
        }}
      >
        <MotionPaper
          elevation={3}
          sx={{ 
            p: 3, 
            mb: 5,
            borderRadius: '12px',
            background: 'linear-gradient(145deg, #ffffff 0%, #f8faff 100%)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h6" component="h2" gutterBottom sx={{ color: '#1A3C5E', fontWeight: 600 }}>
                Looking for something specific?
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Search our FAQ database to find quick answers to your questions
              </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search FAQs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    startAdornment: <Search color="action" sx={{ mr: 1 }} />,
                    sx: { borderRadius: 2 }
                  }}
                />
                <Button 
                  variant="contained" 
                  sx={{ 
                    background: 'linear-gradient(90deg, #f0c845 0%, #f57c00 100%)',
                    color: 'white',
                    px: 3,
                    '&:hover': {
                      background: 'linear-gradient(90deg, #f57c00 0%, #f0c845 100%)',
                    }
                  }}
                >
                  Search
                </Button>
              </Box>
            </Grid>
          </Grid>
        </MotionPaper>
        
        {filteredFaqs.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <HelpOutline sx={{ fontSize: 60, color: '#1A3C5E', opacity: 0.5, mb: 2 }} />
            <Typography variant="h5" gutterBottom>No matching questions found</Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your search terms or browse through our categories below
            </Typography>
          </Box>
        ) : (
          filteredFaqs.map((category, categoryIndex) => (
            <MotionBox
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + categoryIndex * 0.1 }}
              sx={{ mb: 5 }}
            >
              <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom 
                sx={{ 
                  color: '#1A3C5E', 
                  fontWeight: 600,
                  position: 'relative',
                  pl: 2,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 4,
                    height: '70%',
                    backgroundColor: '#4A90E2',
                    borderRadius: '4px'
                  }
                }}
              >
                {category.category}
              </Typography>
              
              {category.questions.map((faq, index) => (
                <MotionAccordion 
                  key={index}
                  expanded={expandedCategory === `${category.category}-${index}`}
                  onChange={handleChange(`${category.category}-${index}`)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + (categoryIndex * 0.1) + (index * 0.05) }}
                  sx={{
                    mb: 1.5,
                    borderRadius: '8px',
                    '&:before': { display: 'none' },
                    boxShadow: 'none',
                    border: '1px solid rgba(0,0,0,0.08)',
                    overflow: 'hidden',
                    '&.Mui-expanded': {
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    }
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore sx={{ color: '#4A90E2' }} />}
                    sx={{ 
                      backgroundColor: expandedCategory === `${category.category}-${index}` 
                        ? 'rgba(74, 144, 226, 0.04)' 
                        : 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(74, 144, 226, 0.08)'
                      }
                    }}
                  >
                    <Typography fontWeight={500}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ backgroundColor: 'white', pt: 0 }}>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </MotionAccordion>
              ))}
            </MotionBox>
          ))
        )}
        
        {/* Call to Action Section */}
        <MotionPaper
          elevation={2}
          sx={{
            p: { xs: 3, md: 5 },
            mt: 6,
            mb: 3,
            borderRadius: '12px',
            background: 'linear-gradient(145deg, #1A3C5E 0%, #2a5789 100%)',
            color: 'white',
            textAlign: 'center'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Typography variant="h5" gutterBottom>
            Didn't find what you were looking for?
          </Typography>
          <Typography variant="body1" paragraph sx={{ maxWidth: '800px', mx: 'auto', mb: 4, opacity: 0.9 }}>
            Our support team is here to help answer any additional questions you may have about Global Pickups
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(90deg, #f0c845 0%, #f57c00 100%)',
                color: 'white',
                px: 4,
                py: 1.5,
                '&:hover': {
                  background: 'linear-gradient(90deg, #f57c00 0%, #f0c845 100%)',
                },
                boxShadow: '0 4px 14px rgba(245, 124, 0, 0.4)',
              }}
            >
              Contact Support
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                color: 'white',
                borderColor: 'white',
                px: 4,
                py: 1.5,
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Submit a Question
            </Button>
          </Box>
        </MotionPaper>
      </MotionContainer>
    </>
  );
};

export default FAQ;
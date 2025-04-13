import React from 'react';
import { 
  Box, Container, Typography, Button, Paper, Alert, 
  CircularProgress, Link, Avatar
} from '@mui/material';
import { MarkEmailRead, ArrowBack } from '@mui/icons-material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../supabase';

const VerificationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = React.useState('pending');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  
  // Get the email from state passed during navigation
  const email = location.state?.email || 'your email';

  const handleResendVerification = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });
      
      if (error) throw error;
      
      setStatus('resent');
    } catch (error) {
      setError(error.message || "Failed to resend verification email");
      console.error("Error resending verification:", error);
    } finally {
      setLoading(false);
    }
  };

  const MotionPaper = motion(Paper);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 3,
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          backgroundColor: 'rgba(70, 129, 244, 0.05)',
          top: '-150px',
          right: '-150px',
          zIndex: 0
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          backgroundColor: 'rgba(245, 124, 0, 0.05)',
          bottom: '-100px',
          left: '-100px',
          zIndex: 0
        }
      }}
    >
      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1, maxWidth: '320px' }}>
        <MotionPaper
          elevation={4}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ 
            p: 2.5,
            borderRadius: '10px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
            background: `linear-gradient(145deg, #ffffff 0%, #f8faff 100%)`,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '4px',
              background: 'linear-gradient(90deg, #4681f4 0%, rgba(54, 98, 234, 0.5) 100%)',
              borderRadius: '4px 4px 0 0'
            }
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Avatar 
              sx={{ 
                bgcolor: 'rgba(70, 129, 244, 0.1)', 
                width: 70, 
                height: 70, 
                boxShadow: `0 6px 15px rgba(70, 129, 244, 0.2)`,
                border: '2px solid rgba(70, 129, 244, 0.1)'
              }}
            >
              <MarkEmailRead sx={{ fontSize: 40, color: '#4681f4' }} />
            </Avatar>
          </Box>
          
          <Typography 
            variant="h5" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700, 
              color: '#1A3C5E',
              mb: 1,
              fontSize: '1.5rem'
            }}
          >
            Verify Your Email
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ mb: 2, color: 'text.secondary', fontSize: '0.9rem' }}
          >
            We've sent a verification email to <strong>{email}</strong>. Please check your inbox and click the verification link to activate your account.
          </Typography>
          
          {status === 'resent' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Alert 
                severity="success" 
                sx={{ mb: 2, fontSize: '0.85rem', borderRadius: 2 }}
              >
                Verification email has been resent.
              </Alert>
            </motion.div>
          )}
          
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Alert 
                severity="error" 
                sx={{ mb: 2, fontSize: '0.85rem', borderRadius: 2 }}
              >
                {error}
              </Alert>
            </motion.div>
          )}
          
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="body2" 
              sx={{ color: 'text.secondary', fontStyle: 'italic', fontSize: '0.85rem' }}
            >
              If you don't see the email, please check your spam folder.
            </Typography>
          </Box>
          
          <Button
            fullWidth
            variant="contained"
            disabled={loading}
            onClick={handleResendVerification}
            sx={{ 
              mb: 2,
              borderRadius: 2,
              background: 'linear-gradient(90deg, #4681f4 0%, #3662ea 100%)',
              boxShadow: '0 4px 12px rgba(70, 129, 244, 0.3)',
              py: 1,
              '&:hover': {
                boxShadow: '0 6px 15px rgba(70, 129, 244, 0.4)',
                background: 'linear-gradient(90deg, #3662ea 0%, #2c52d3 100%)',
              },
              fontSize: '0.9rem'
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Resend Verification Email'}
          </Button>
          
          <Button
            startIcon={<ArrowBack fontSize="small" />}
            component={RouterLink}
            to="/login"
            sx={{ 
              color: '#4681f4',
              '&:hover': {
                backgroundColor: 'rgba(70, 129, 244, 0.05)'
              },
              fontSize: '0.9rem'
            }}
          >
            Back to Login
          </Button>
        </MotionPaper>
      </Container>
    </Box>
  );
};

export default VerificationPage;
import React from 'react';
import { Box, Typography, Button, Paper, Divider, Snackbar, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { WarningAmber as WarningIcon, Refresh as RefreshIcon, BugReport as BugReportIcon } from '@mui/icons-material';
import * as Sentry from '@sentry/react';

// Styled motion components
const MotionPaper = motion(Paper);
const MotionBox = motion(Box);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      isReportSent: false,
      showFeedback: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error("React Error Boundary caught an error:", error, errorInfo);
    this.setState({ error, errorInfo });
    
    // Send error to Sentry
    Sentry.captureException(error, { 
      extra: { 
        componentStack: errorInfo.componentStack,
        userInfo: this.props.userInfo || 'Not available'
      } 
    });
  }

  handleReportError = () => {
    // Send detailed feedback to Sentry
    if (this.state.error) {
      Sentry.withScope((scope) => {
        scope.setExtra('user_feedback', true);
        scope.setLevel('fatal');
        Sentry.captureException(this.state.error);
      });
      
      this.setState({ isReportSent: true, showFeedback: true });
      
      // Hide feedback after 3 seconds
      setTimeout(() => {
        this.setState({ showFeedback: false });
      }, 3000);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '80vh', 
            p: 2,
            bgcolor: '#f5f5f5'
          }}
        >
          <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
            elevation={3}
            sx={{ 
              maxWidth: 600, 
              width: '100%', 
              overflow: 'hidden',
              borderRadius: 2,
              position: 'relative',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
          >
            <Box 
              sx={{ 
                bgcolor: 'error.main', 
                p: 2, 
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <WarningIcon sx={{ color: 'white', fontSize: 30 }} />
              <Typography variant="h6" component="h2" sx={{ color: 'white', fontFamily: 'Poppins, sans-serif' }}>
                Oops! Something went wrong
              </Typography>
            </Box>
            
            <Box sx={{ p: 3 }}>
              <MotionBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Typography variant="body1" sx={{ mb: 3, fontFamily: 'Poppins, sans-serif' }}>
                  We apologize for the inconvenience. The application has encountered an unexpected error. 
                  Our team has been automatically notified and we're working to fix this issue.
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    startIcon={<RefreshIcon />}
                    onClick={() => window.location.reload()}
                    sx={{ 
                      borderRadius: 2,
                      textTransform: 'none',
                      px: 3,
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  >
                    Refresh Page
                  </Button>
                  
                  <Button 
                    variant="outlined" 
                    color="error"
                    startIcon={<BugReportIcon />}
                    onClick={this.handleReportError}
                    disabled={this.state.isReportSent}
                    sx={{ 
                      borderRadius: 2,
                      textTransform: 'none',
                      px: 3,
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  >
                    {this.state.isReportSent ? 'Error Reported' : 'Report This Issue'}
                  </Button>
                </Box>
              </MotionBox>
              
              {process.env.NODE_ENV === 'development' && (
                <MotionBox
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ delay: 0.3 }}
                  sx={{ mt: 4 }}
                >
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif' }}>
                    Developer Information
                  </Typography>
                  <Typography variant="subtitle2" color="error.main" sx={{ fontWeight: 'bold', fontFamily: 'Poppins, sans-serif' }}>
                    {this.state.error && this.state.error.toString()}
                  </Typography>
                  <Box 
                    component="pre" 
                    sx={{ 
                      mt: 2, 
                      overflow: 'auto', 
                      maxHeight: '300px',
                      bgcolor: 'grey.100',
                      p: 2,
                      borderRadius: 1,
                      fontSize: '0.75rem',
                      fontFamily: 'monospace'
                    }}
                  >
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                  </Box>
                </MotionBox>
              )}
            </Box>
          </MotionPaper>
          
          <Snackbar 
            open={this.state.showFeedback} 
            autoHideDuration={3000} 
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert severity="success" sx={{ width: '100%' }}>
              Thank you for reporting this issue. We'll fix it as soon as possible.
            </Alert>
          </Snackbar>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

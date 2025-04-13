import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { supabase } from '../supabase';
import {
  Container, Box, Typography, Paper, Button, TextField, Avatar,
  Chip, Grid, Rating, Card, CardContent, Divider, Modal, IconButton, 
  List, ListItem, ListItemText, ListItemAvatar, CircularProgress, 
  Timeline, TimelineItem, TimelineContent, TimelineSeparator, 
  TimelineConnector, TimelineDot, TimelineOppositeContent, Menu, MenuItem,
  useTheme, useMediaQuery, Snackbar, Alert, Dialog, DialogTitle, 
  DialogContent, DialogActions, Stepper, Step, StepLabel
} from '@mui/material';
import {
  LocationOn as Place, CalendarToday, LocalShipping, Person,
  AttachMoney, CheckCircle, Share, Send, Phone, Email,
  AccessTime, BookmarkBorder, Bookmark, WhatsApp, Facebook, Twitter,
  ContentCopy, ArrowBack, Category, Scale, CalendarMonth, Message,
  Close as CloseIcon
} from '@mui/icons-material';
import TimelineIcon from '@mui/icons-material/Timeline';
import { format } from 'date-fns';

const ItemRequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [itemRequest, setItemRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const [deliveryStatus, setDeliveryStatus] = useState('pending');
  
  // New state variables for enhanced features
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [timelineModalOpen, setTimelineModalOpen] = useState(false);
  const [deliveryTimeline, setDeliveryTimeline] = useState([]);
  const [saveRouteModalOpen, setSaveRouteModalOpen] = useState(false);
  const [savedRoutes, setSavedRoutes] = useState([]);

  // New state variables for sharing functionality
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [shareMenuAnchor, setShareMenuAnchor] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Fetch item request details when component mounts
  useEffect(() => {
    const fetchItemRequest = async () => {
      try {
        setLoading(true);
        
        // Check current user
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          setCurrentUser(profileData);
        }

        // Fetch item request with requester details
        const { data, error } = await supabase
          .from('item_requests')
          .select(`
            *,
            requester:profiles(id, full_name, avatar_url, rating),
            traveler:profiles(id, full_name, avatar_url, rating)
          `)
          .eq('id', id)
          .single();
        
        if (error) throw error;
        setItemRequest(data);
        
        // If the request has a traveler, fetch the messages
        if (data.traveler_id) {
          fetchMessages();
          setDeliveryStatus(data.status);
          fetchDeliveryTimeline();
        }
      } catch (error) {
        console.error('Error fetching item request:', error);
        setNotification({
          open: true,
          message: 'Error fetching item request details',
          severity: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchItemRequest();
  }, [id]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('item_request_id', id)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      setMessageHistory(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchDeliveryTimeline = async () => {
    try {
      // Get all item request history from messages and status updates
      const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .eq('item_request_id', id)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      // Get the item request details with all timestamps
      const { data: requestDetails, error: requestError } = await supabase
        .from('item_requests')
        .select('*')
        .eq('id', id)
        .single();
      
      if (requestError) throw requestError;
      
      // Combine all data and generate the timeline
      generateDeliveryTimeline({ 
        ...requestDetails, 
        requester: itemRequest.requester, 
        traveler: itemRequest.traveler 
      });
      
      // Update messages
      setMessageHistory(messages || []);
      
    } catch (error) {
      console.error('Error fetching delivery timeline:', error);
      setNotification({
        open: true,
        message: 'Error loading delivery timeline',
        severity: 'error'
      });
    }
  };

  // Function to fetch saved routes for the current user
  const fetchSavedRoutes = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('saved_routes')
        .select('*')
        .eq('user_id', userId);
      
      if (error) throw error;
      setSavedRoutes(data || []);
    } catch (error) {
      console.error('Error fetching saved routes:', error);
    }
  };

  // Function to save the current route
  const handleSaveRoute = async () => {
    try {
      if (!currentUser) {
        setNotification({
          open: true,
          message: 'Please log in to save routes',
          severity: 'warning'
        });
        return;
      }

      // Check if route already exists
      const existingRoute = savedRoutes.find(route => 
        route.source === itemRequest.source_location && 
        route.destination === itemRequest.destination_location
      );

      if (existingRoute) {
        setNotification({
          open: true,
          message: 'This route is already saved',
          severity: 'info'
        });
        return;
      }

      // Save the new route
      const { error } = await supabase.from('saved_routes').insert({
        user_id: currentUser.id,
        source: itemRequest.source_location,
        destination: itemRequest.destination_location,
        created_at: new Date().toISOString()
      });
      
      if (error) throw error;
      
      // Update saved routes
      fetchSavedRoutes(currentUser.id);
      
      setSaveRouteModalOpen(false);
      setNotification({
        open: true,
        message: 'Route saved successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error saving route:', error);
      setNotification({
        open: true,
        message: 'Error saving route',
        severity: 'error'
      });
    }
  };

  // Generate delivery timeline data based on the item request history
  const generateDeliveryTimeline = (request) => {
    const timeline = [];
    
    if (request.created_at) {
      timeline.push({
        time: new Date(request.created_at),
        status: 'Request Created',
        description: `Item request created by ${request.requester?.full_name}`,
        icon: 'create'
      });
    }
    
    if (request.accepted_at) {
      timeline.push({
        time: new Date(request.accepted_at),
        status: 'Accepted',
        description: `${request.traveler?.full_name} accepted the delivery request`,
        icon: 'check'
      });
    }
    
    // Check for in_transit status from message history
    const inTransitMsg = messageHistory.find(msg => 
      msg.sender_id === 'system' && msg.message.includes('Status updated to: in_transit')
    );
    
    if (inTransitMsg) {
      timeline.push({
        time: new Date(inTransitMsg.created_at),
        status: 'In Transit',
        description: 'Item is now in transit with the traveler',
        icon: 'shipping'
      });
    }
    
    if (request.delivered_at) {
      timeline.push({
        time: new Date(request.delivered_at),
        status: 'Delivered',
        description: 'Item has been delivered to the destination',
        icon: 'delivered'
      });
    }
    
    if (request.completed_at) {
      timeline.push({
        time: new Date(request.completed_at),
        status: 'Completed',
        description: 'Delivery confirmed by the requester',
        icon: 'complete'
      });
    }
    
    // Sort timeline by date
    timeline.sort((a, b) => a.time - b.time);
    setDeliveryTimeline(timeline);
  };

  const handleOfferToDeliver = async () => {
    try {
      if (!currentUser) {
        setNotification({
          open: true,
          message: 'Please log in to offer delivery',
          severity: 'warning'
        });
        return;
      }

      // Check if the user is trying to deliver their own request
      if (currentUser.id === itemRequest.requester_id) {
        setNotification({
          open: true,
          message: 'You cannot deliver your own request',
          severity: 'warning'
        });
        return;
      }

      // Update the item request with the traveler's ID and change status to "accepted"
      const { error } = await supabase
        .from('item_requests')
        .update({ 
          traveler_id: currentUser.id,
          status: 'accepted',
          accepted_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) throw error;

      // Create initial system message
      await supabase.from('messages').insert({
        item_request_id: id,
        sender_id: 'system',
        receiver_id: itemRequest.requester_id,
        message: `${currentUser.full_name} has offered to deliver your item.`,
        created_at: new Date().toISOString()
      });
      
      // Refresh item request data
      const { data: updatedRequest } = await supabase
        .from('item_requests')
        .select(`
          *,
          requester:profiles(id, full_name, avatar_url, rating),
          traveler:profiles(id, full_name, avatar_url, rating)
        `)
        .eq('id', id)
        .single();
      
      setItemRequest(updatedRequest);
      setDeliveryStatus('accepted');
      setOfferModalOpen(false);
      setNotification({
        open: true,
        message: 'Successfully offered to deliver this item!',
        severity: 'success'
      });
      
      // Fetch messages
      fetchMessages();
    } catch (error) {
      console.error('Error offering to deliver:', error);
      setNotification({
        open: true,
        message: 'Error offering to deliver this item',
        severity: 'error'
      });
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;
    
    try {
      // Determine the receiver
      const receiverId = currentUser.id === itemRequest.requester_id
        ? itemRequest.traveler_id
        : itemRequest.requester_id;
      
      // Insert new message
      const { error } = await supabase.from('messages').insert({
        item_request_id: id,
        sender_id: currentUser.id,
        receiver_id: receiverId,
        message: messageText,
        created_at: new Date().toISOString()
      });
      
      if (error) throw error;
      
      // Clear message text and refresh messages
      setMessageText('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
      setNotification({
        open: true,
        message: 'Error sending message',
        severity: 'error'
      });
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      const { error } = await supabase
        .from('item_requests')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString(),
          ...(newStatus === 'delivered' ? { delivered_at: new Date().toISOString() } : {})
        })
        .eq('id', id);
      
      if (error) throw error;
      
      // Create system message about status change
      await supabase.from('messages').insert({
        item_request_id: id,
        sender_id: 'system',
        receiver_id: currentUser.id === itemRequest.requester_id 
          ? itemRequest.traveler_id 
          : itemRequest.requester_id,
        message: `Status updated to: ${newStatus}`,
        created_at: new Date().toISOString()
      });
      
      setDeliveryStatus(newStatus);
      setNotification({
        open: true,
        message: `Status successfully updated to ${newStatus}`,
        severity: 'success'
      });
      
      // Refresh messages
      fetchMessages();
    } catch (error) {
      console.error('Error updating status:', error);
      setNotification({
        open: true,
        message: 'Error updating status',
        severity: 'error'
      });
    }
  };

  const handleConfirmDelivery = async () => {
    try {
      const { error } = await supabase
        .from('item_requests')
        .update({ 
          status: 'completed',
          updated_at: new Date().toISOString(),
          completed_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) throw error;
      
      // Create system message about completion
      await supabase.from('messages').insert({
        item_request_id: id,
        sender_id: 'system',
        receiver_id: itemRequest.traveler_id,
        message: 'Delivery confirmed! Transaction completed.',
        created_at: new Date().toISOString()
      });
      
      setDeliveryStatus('completed');
      setNotification({
        open: true,
        message: 'Delivery successfully confirmed! Transaction completed.',
        severity: 'success'
      });
      
      // Open rating modal after confirming delivery
      setRatingModalOpen(true);
      
      // Refresh messages
      fetchMessages();
    } catch (error) {
      console.error('Error confirming delivery:', error);
      setNotification({
        open: true,
        message: 'Error confirming delivery',
        severity: 'error'
      });
    }
  };

  const handleSubmitRating = async () => {
    try {
      // Determine who is being rated (traveler or requester)
      const ratedUserId = currentUser.id === itemRequest.requester_id
        ? itemRequest.traveler_id
        : itemRequest.requester_id;
      
      // Insert rating into ratings table
      const { error } = await supabase.from('ratings').insert({
        item_request_id: id,
        rated_by: currentUser.id,
        rated_user: ratedUserId,
        rating: ratingValue,
        feedback: feedbackText,
        created_at: new Date().toISOString()
      });
      
      if (error) throw error;
      
      // Update the user's average rating in their profile
      const { data: existingRatings } = await supabase
        .from('ratings')
        .select('rating')
        .eq('rated_user', ratedUserId);
      
      if (existingRatings && existingRatings.length > 0) {
        const averageRating = existingRatings.reduce((acc, curr) => acc + curr.rating, 0) / existingRatings.length;
        
        await supabase
          .from('profiles')
          .update({ rating: averageRating.toFixed(1) })
          .eq('id', ratedUserId);
      }
      
      setRatingModalOpen(false);
      setNotification({
        open: true,
        message: 'Thank you for your feedback!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error submitting rating:', error);
      setNotification({
        open: true,
        message: 'Error submitting rating',
        severity: 'error'
      });
    }
  };

  // Handle sharing the item request
  const handleShare = () => {
    setShareUrl(window.location.href);
    setShareModalOpen(true);
  };

  // Close share menu
  const handleCloseShareMenu = () => {
    setShareMenuAnchor(null);
  };

  // Copy link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Error copying link:', err);
        setNotification({
          open: true,
          message: 'Error copying link to clipboard',
          severity: 'error'
        });
      });
  };

  // Share on social media platforms
  const handleSharePlatform = (platform) => {
    let shareLink = '';
    const text = `Check out this item request on Global Pickups: ${itemRequest.item_name}`;
    
    switch(platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodeURIComponent(text + ': ' + shareUrl)}`;
        break;
      case 'email':
        shareLink = `mailto:?subject=${encodeURIComponent('Item Request on Global Pickups')}&body=${encodeURIComponent(text + '\n\n' + shareUrl)}`;
        break;
      default:
        break;
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank');
    }
    
    handleCloseShareMenu();
    setShareModalOpen(false);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  const renderDeliveryStatus = () => {
    // Map status to step number
    const statusMap = {
      'open': 0,
      'accepted': 1,
      'in_transit': 2,
      'delivered': 3,
      'completed': 4
    };
    
    const steps = ['Open', 'Accepted', 'In Transit', 'Delivered', 'Completed'];
    const activeStep = statusMap[deliveryStatus] || 0;
    
    return (
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom>
          Delivery Status
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    );
  };

  const renderStatusButtons = () => {
    // Only show status buttons if the user is part of this transaction
    if (!currentUser || (currentUser.id !== itemRequest.traveler_id && currentUser.id !== itemRequest.requester_id)) {
      return null;
    }
    
    // Buttons for traveler
    if (currentUser.id === itemRequest.traveler_id) {
      return (
        <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {deliveryStatus === 'accepted' && (
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => handleUpdateStatus('in_transit')}
            >
              Mark as In Transit
            </Button>
          )}
          
          {deliveryStatus === 'in_transit' && (
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => handleUpdateStatus('delivered')}
            >
              Mark as Delivered
            </Button>
          )}
        </Box>
      );
    }
    
    // Button for requester to confirm delivery
    if (currentUser.id === itemRequest.requester_id && deliveryStatus === 'delivered') {
      return (
        <Box sx={{ mt: 2 }}>
          <Button 
            variant="contained" 
            color="success"
            onClick={handleConfirmDelivery}
            startIcon={<CheckCircle />}
          >
            Confirm Delivery
          </Button>
        </Box>
      );
    }
    
    return null;
  };

  const renderMessageSystem = () => {
    // Only show if there's a traveler assigned and the user is part of this transaction
    if (!itemRequest.traveler_id || !currentUser || 
        (currentUser.id !== itemRequest.traveler_id && currentUser.id !== itemRequest.requester_id)) {
      return null;
    }
    
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          <Message sx={{ mr: 1, verticalAlign: 'middle' }} />
          Messages
        </Typography>
        
        <Paper elevation={2} sx={{ p: 2, maxHeight: '300px', overflow: 'auto', mb: 2 }}>
          {messageHistory.length === 0 ? (
            <Typography variant="body2" color="text.secondary" align="center">
              No messages yet. Start the conversation!
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {messageHistory.map((msg, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: msg.sender_id === currentUser.id ? 'flex-end' : 'flex-start',
                    maxWidth: '80%'
                  }}
                >
                  {msg.sender_id === 'system' ? (
                    <Alert severity="info" sx={{ width: '100%' }}>
                      {msg.message}
                    </Alert>
                  ) : (
                    <Paper 
                      elevation={1} 
                      sx={{ 
                        p: 1.5, 
                        bgcolor: msg.sender_id === currentUser.id ? 'primary.light' : 'grey.100',
                        borderRadius: 2
                      }}
                    >
                      <Typography variant="body2" color={msg.sender_id === currentUser.id ? 'white' : 'text.primary'}>
                        {msg.message}
                      </Typography>
                      <Typography variant="caption" color={msg.sender_id === currentUser.id ? 'white' : 'text.secondary'}>
                        {formatDate(msg.created_at)} {new Date(msg.created_at).toLocaleTimeString()}
                      </Typography>
                    </Paper>
                  )}
                </Box>
              ))}
            </Box>
          )}
        </Paper>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            placeholder="Type your message here..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button 
            variant="contained" 
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
          >
            Send
          </Button>
        </Box>
      </Box>
    );
  };

  // Timeline and Route Buttons
  const renderActionButtons = () => {
    return (
      <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'center' }}>
        <Button
          variant="outlined"
          startIcon={<TimelineIcon />}
          onClick={() => setTimelineModalOpen(true)}
          sx={{ borderRadius: '20px' }}
        >
          View Timeline
        </Button>
        
        <Button
          variant="outlined"
          startIcon={savedRoutes.some(route => 
            route.source === itemRequest?.source_location && 
            route.destination === itemRequest?.destination_location
          ) ? <Bookmark /> : <BookmarkBorder />}
          onClick={() => setSaveRouteModalOpen(true)}
          sx={{ borderRadius: '20px' }}
        >
          Save Route
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<Share />}
          onClick={handleShare}
          sx={{ borderRadius: '20px' }}
        >
          Share
        </Button>
      </Box>
    );
  };
  
  // Timeline Modal
  const renderTimelineModal = () => {
    return (
      <Modal
        open={timelineModalOpen}
        onClose={() => setTimelineModalOpen(false)}
        aria-labelledby="timeline-modal-title"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '70%' },
          maxWidth: '800px',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4
        }}>
          <Typography id="timeline-modal-title" variant="h5" component="h2" gutterBottom>
            Delivery Timeline
          </Typography>
          
          <Box sx={{ maxHeight: '60vh', overflow: 'auto', my: 2 }}>
            <Timeline position="alternate">
              {deliveryTimeline.map((event, index) => (
                <TimelineItem key={index}>
                  <TimelineOppositeContent color="text.secondary">
                    {formatDate(event.time)}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color={
                      event.status === 'Completed' ? 'success' :
                      event.status === 'Delivered' ? 'info' :
                      event.status === 'In Transit' ? 'warning' : 'grey'
                    }>
                      {event.icon === 'create' && <CalendarMonth />}
                      {event.icon === 'check' && <CheckCircle />}
                      {event.icon === 'shipping' && <LocalShipping />}
                      {event.icon === 'delivered' && <Place />}
                      {event.icon === 'complete' && <CheckCircle />}
                    </TimelineDot>
                    {index < deliveryTimeline.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="h6" component="span">
                      {event.status}
                    </Typography>
                    <Typography>{event.description}</Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
            
            {deliveryTimeline.length === 0 && (
              <Typography align="center" sx={{ py: 4 }}>
                No timeline data available yet.
              </Typography>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={() => setTimelineModalOpen(false)}>Close</Button>
          </Box>
        </Box>
      </Modal>
    );
  };
  
  // Save Route Modal
  const renderSaveRouteModal = () => {
    return (
      <Modal
        open={saveRouteModalOpen}
        onClose={() => setSaveRouteModalOpen(false)}
        aria-labelledby="save-route-modal-title"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '60%' },
          maxWidth: '600px',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4
        }}>
          <Typography id="save-route-modal-title" variant="h5" component="h2" gutterBottom>
            Save This Route
          </Typography>
          
          <Box sx={{ my: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>From:</strong> {itemRequest?.source_location}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>To:</strong> {itemRequest?.destination_location}
            </Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Save this route to quickly filter travel plans and item requests for your frequently used routes.
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button 
              variant="outlined" 
              onClick={() => setSaveRouteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              startIcon={<Bookmark />}
              onClick={handleSaveRoute}
            >
              Save Route
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  // Share Modal
  const renderShareModal = () => {
    return (
      <Modal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        aria-labelledby="share-modal-title"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '70%', md: '50%' },
          maxWidth: '500px',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4
        }}>
          <Typography id="share-modal-title" variant="h5" component="h2" gutterBottom>
            Share This Item Request
          </Typography>
          
          <Box sx={{ my: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>{itemRequest?.item_name}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              From: {itemRequest?.source_location} 
              <br />
              To: {itemRequest?.destination_location}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <TextField
              fullWidth
              size="small"
              value={shareUrl}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <IconButton onClick={handleCopyLink} size="small">
                    <ContentCopy />
                  </IconButton>
                ),
              }}
              sx={{ mr: 1 }}
            />
            {copySuccess && (
              <Chip
                label="Copied!"
                color="success"
                size="small"
                sx={{ ml: 1 }}
              />
            )}
          </Box>
          
          <Typography variant="subtitle2" gutterBottom>
            Share via:
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2, mb: 3 }}>
            <IconButton
              onClick={() => handleSharePlatform('facebook')}
              sx={{ color: '#3b5998' }}
            >
              <Facebook fontSize="large" />
            </IconButton>
            
            <IconButton
              onClick={() => handleSharePlatform('twitter')}
              sx={{ color: '#1DA1F2' }}
            >
              <Twitter fontSize="large" />
            </IconButton>
            
            <IconButton
              onClick={() => handleSharePlatform('whatsapp')}
              sx={{ color: '#25D366' }}
            >
              <WhatsApp fontSize="large" />
            </IconButton>
            
            <IconButton
              onClick={() => handleSharePlatform('email')}
              sx={{ color: '#D44638' }}
            >
              <Email fontSize="large" />
            </IconButton>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => setShareModalOpen(false)}>Close</Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!itemRequest) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          Item request not found. It may have been removed.
        </Alert>
        <Button 
          sx={{ mt: 2 }}
          startIcon={<ArrowBack />}
          onClick={() => navigate('/item-requests')}
        >
          Back to Item Requests
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBack />}
        onClick={() => navigate('/item-requests')}
        sx={{ mb: 2 }}
      >
        Back to Item Requests
      </Button>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {itemRequest.item_name}
            </Typography>
            
            <Chip 
              label={itemRequest.category} 
              size="small" 
              icon={<Category />}
              sx={{ mb: 2 }}
            />
            
            <Typography variant="body1" paragraph>
              {itemRequest.description}
            </Typography>
            
            <Divider sx={{ my: 3 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    <Place fontSize="small" sx={{ verticalAlign: 'text-bottom', mr: 0.5 }} />
                    From Location
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {itemRequest.source_location}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    <Place fontSize="small" sx={{ verticalAlign: 'text-bottom', mr: 0.5 }} />
                    To Location
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {itemRequest.destination_location}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    <CalendarMonth fontSize="small" sx={{ verticalAlign: 'text-bottom', mr: 0.5 }} />
                    Needed By
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {formatDate(itemRequest.deadline)}
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    <Scale fontSize="small" sx={{ verticalAlign: 'text-bottom', mr: 0.5 }} />
                    Weight
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {itemRequest.weight} kg
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    <AttachMoney fontSize="small" sx={{ verticalAlign: 'text-bottom', mr: 0.5 }} />
                    Estimated Value
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    ${itemRequest.estimated_value}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    <AttachMoney fontSize="small" sx={{ verticalAlign: 'text-bottom', mr: 0.5 }} />
                    Offered Compensation
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    ${itemRequest.compensation}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            
            {/* Render delivery status if there's a traveler */}
            {itemRequest.traveler_id && renderDeliveryStatus()}
            
            {/* Add the action buttons below the main details */}
            {renderActionButtons()}
            
            {/* Status update buttons */}
            {renderStatusButtons()}
          </Paper>
          
          {/* Message system */}
          {renderMessageSystem()}
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Requester
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar 
                src={itemRequest.requester?.avatar_url} 
                alt={itemRequest.requester?.full_name} 
                sx={{ width: 64, height: 64, mr: 2 }}
              />
              <Box>
                <Typography variant="body1" fontWeight="medium">
                  {itemRequest.requester?.full_name || 'Anonymous User'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ★ {itemRequest.requester?.rating || '4.5'} rating
                </Typography>
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Request Posted:
            </Typography>
            <Typography variant="body2" paragraph>
              {formatDate(itemRequest.created_at)}
            </Typography>
          </Paper>
          
          {/* Show traveler info if assigned */}
          {itemRequest.traveler_id && (
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Traveler
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  src={itemRequest.traveler?.avatar_url} 
                  alt={itemRequest.traveler?.full_name} 
                  sx={{ width: 64, height: 64, mr: 2 }}
                />
                <Box>
                  <Typography variant="body1" fontWeight="medium">
                    {itemRequest.traveler?.full_name || 'Traveler User'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ★ {itemRequest.traveler?.rating || '4.5'} rating
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Accepted On:
              </Typography>
              <Typography variant="body2" paragraph>
                {formatDate(itemRequest.accepted_at || itemRequest.updated_at)}
              </Typography>
            </Paper>
          )}
          
          {/* Show "Offer to Deliver" button if no traveler and user is not the requester */}
          {!itemRequest.traveler_id && currentUser && currentUser.id !== itemRequest.requester_id && (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              startIcon={<LocalShipping />}
              onClick={() => setOfferModalOpen(true)}
              sx={{ mb: 2 }}
            >
              Offer to Deliver
            </Button>
          )}
        </Grid>
      </Grid>
      
      {/* Offer to Deliver Modal */}
      <Dialog open={offerModalOpen} onClose={() => setOfferModalOpen(false)}>
        <DialogTitle>Confirm Delivery Offer</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Are you sure you want to offer to deliver this item?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            By accepting, you commit to:
          </Typography>
          <ul>
            <li>Picking up the item from {itemRequest.source_location}</li>
            <li>Delivering it safely to {itemRequest.destination_location}</li>
            <li>Completing the delivery by {formatDate(itemRequest.deadline)}</li>
          </ul>
          <Typography variant="body2" color="text.secondary">
            You'll be able to communicate with the requester after accepting.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOfferModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleOfferToDeliver}>Confirm</Button>
        </DialogActions>
      </Dialog>
      
      {/* Rating Modal */}
      <Dialog open={ratingModalOpen} onClose={() => setRatingModalOpen(false)}>
        <DialogTitle>Rate Your Experience</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            How was your experience with {currentUser?.id === itemRequest?.requester_id 
              ? itemRequest?.traveler?.full_name 
              : itemRequest?.requester?.full_name}?
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography component="legend" sx={{ mr: 2 }}>Rating:</Typography>
            <Rating
              name="rating"
              value={ratingValue}
              onChange={(event, newValue) => {
                setRatingValue(newValue);
              }}
              precision={0.5}
              size="large"
            />
          </Box>
          
          <TextField
            autoFocus
            margin="dense"
            id="feedback"
            label="Feedback (optional)"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRatingModalOpen(false)}>Skip</Button>
          <Button variant="contained" onClick={handleSubmitRating}>Submit</Button>
        </DialogActions>
      </Dialog>
      
      {/* Timeline Modal */}
      {renderTimelineModal()}
      
      {/* Save Route Modal */}
      {renderSaveRouteModal()}
      
      {/* Share Modal */}
      {renderShareModal()}
      
      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert 
          onClose={() => setNotification({ ...notification, open: false })} 
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ItemRequestDetail;
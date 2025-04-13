import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Grid, Card, CardContent, 
  Button, Avatar, Chip, CircularProgress, TextField,
  InputAdornment, FormControl, InputLabel, Select, MenuItem,
  Paper, Stack, Divider, Badge, Tooltip, IconButton,
  Alert, Snackbar, Menu, ListItemIcon, ListItemText, MenuItem as MenuItemComponent,
  Drawer, Slider, Switch, FormControlLabel
} from '@mui/material';
import { 
  Search, FilterList, LocalShipping, Place, Category, 
  AttachMoney, CalendarToday, Person, ShoppingBag,
  VerifiedUser, Security, PriorityHigh, AccessTime, Share,
  Download, ContentCopy, Bookmark, BookmarkBorder, Sort,
  Notifications, FilterAlt, MoreVert, GetApp, Star, StarBorder,
  FlightTakeoff, LocationCity, Compare, CheckCircle, ViewComfy, ViewList,
  Height, CropFree, Dashboard
} from '@mui/icons-material';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { CSVLink } from 'react-csv';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
// Import our styled components
import { 
  RequestCard, CardHeader, CardBody, LocationBox, PriceChip,
  FilterContainer, ControlsBar, CardSizeSlider, ActionButton,
  GridContainer, EmptyStateContainer
} from './styled/RequestItemStyled';

const ResponsiveGridLayout = WidthProvider(Responsive);

const ItemRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sourceLocation: '',
    destinationLocation: '',
    category: '',
    urgency: '',
    priceRange: '',
    weightRange: '',
    showVerifiedOnly: false,
    dateRange: [null, null]
  });
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const [sortOption, setSortOption] = useState('newest');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [savedRequests, setSavedRequests] = useState([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [layouts, setLayouts] = useState(null);
  const [cardHeight, setCardHeight] = useState(220);

  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        fetchSavedRequests(user.id);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (requests.length > 0) {
      generateInitialLayouts();
    }
  }, [requests, viewMode]);

  const generateInitialLayouts = () => {
    const lgLayout = requests.map((request, index) => ({
      i: request.id.toString(),
      x: (index % 3) * 4, 
      y: Math.floor(index / 3) * 6,
      w: 4,
      h: 6,
    }));
    
    const mdLayout = requests.map((request, index) => ({
      i: request.id.toString(),
      x: (index % 2) * 6,
      y: Math.floor(index / 2) * 6,
      w: 6,
      h: 6,
    }));
    
    const smLayout = requests.map((request, index) => ({
      i: request.id.toString(),
      x: 0,
      y: index * 6,
      w: 12,
      h: 6,
    }));
    
    setLayouts({
      lg: lgLayout,
      md: mdLayout,
      sm: smLayout,
    });
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('item_requests')
        .select(`
          *,
          requester:profiles(id, full_name, avatar_url, rating, verified)
        `)
        .eq('status', 'open')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching item requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedRequests = async (userId) => {
    if (!userId) return;
    
    try {
      const { data, error } = await supabase
        .from('saved_requests')
        .select('request_id')
        .eq('user_id', userId);
      
      if (error) throw error;
      
      setSavedRequests(data?.map(item => item.request_id) || []);
    } catch (error) {
      console.error('Error fetching saved requests:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const applyFilters = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('item_requests')
        .select(`
          *,
          requester:profiles(id, full_name, avatar_url, rating, verified)
        `)
        .eq('status', 'open');
      
      if (filters.sourceLocation) {
        query = query.ilike('source_location', `%${filters.sourceLocation}%`);
      }
      
      if (filters.destinationLocation) {
        query = query.ilike('destination_location', `%${filters.destinationLocation}%`);
      }
      
      if (filters.category) {
        query = query.eq('category', filters.category);
      }
      
      if (filters.urgency) {
        query = query.eq('urgency', filters.urgency);
      }
      
      if (filters.weightRange) {
        const [minWeight, maxWeight] = filters.weightRange.split('-').map(Number);
        if (minWeight && maxWeight) {
          query = query.gte('item_weight', minWeight).lte('item_weight', maxWeight);
        }
      }
      
      if (filters.priceRange) {
        const [minPrice, maxPrice] = filters.priceRange.split('-').map(Number);
        if (minPrice && maxPrice) {
          query = query.gte('offered_price', minPrice).lte('offered_price', maxPrice);
        }
      }

      if (filters.showVerifiedOnly) {
        query = query.eq('requester.verified', true);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setRequests(data || []);
      setNotification({
        open: true,
        message: `Found ${data.length} matching shipment requests`,
        severity: 'info'
      });
    } catch (error) {
      console.error('Error applying filters:', error);
      setNotification({
        open: true,
        message: 'Error applying filters. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setFilters({
      sourceLocation: '',
      destinationLocation: '',
      category: '',
      urgency: '',
      priceRange: '',
      weightRange: '',
      showVerifiedOnly: false,
      dateRange: [null, null]
    });
    fetchRequests();
  };

  const handleSaveRequest = async (requestId) => {
    if (!user) {
      setNotification({
        open: true,
        message: 'Please sign in to save shipment requests',
        severity: 'info'
      });
      return;
    }

    try {
      if (savedRequests.includes(requestId)) {
        const { error } = await supabase
          .from('saved_requests')
          .delete()
          .eq('user_id', user.id)
          .eq('request_id', requestId);
        
        if (error) throw error;
        
        setSavedRequests(savedRequests.filter(id => id !== requestId));
        setNotification({
          open: true,
          message: 'Shipment request removed from saved items',
          severity: 'success'
        });
      } else {
        const { error } = await supabase
          .from('saved_requests')
          .insert({
            user_id: user.id,
            request_id: requestId,
            saved_at: new Date()
          });
        
        if (error) throw error;
        
        setSavedRequests([...savedRequests, requestId]);
        setNotification({
          open: true,
          message: 'Shipment request saved successfully',
          severity: 'success'
        });
      }
    } catch (error) {
      console.error('Error saving request:', error);
      setNotification({
        open: true,
        message: 'Failed to save shipment request. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    handleMenuClose();
    sortRequests(option);
  };

  const sortRequests = (option) => {
    const sortedRequests = [...requests];
    
    switch(option) {
      case 'newest':
        sortedRequests.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case 'oldest':
        sortedRequests.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case 'price_high':
        sortedRequests.sort((a, b) => (b.offered_price || 0) - (a.offered_price || 0));
        break;
      case 'price_low':
        sortedRequests.sort((a, b) => (a.offered_price || 0) - (b.offered_price || 0));
        break;
      case 'weight_high':
        sortedRequests.sort((a, b) => (b.item_weight || 0) - (a.item_weight || 0));
        break;
      case 'weight_low':
        sortedRequests.sort((a, b) => (a.item_weight || 0) - (b.item_weight || 0));
        break;
      case 'urgency':
        const urgencyOrder = { high: 3, medium: 2, low: 1 };
        sortedRequests.sort((a, b) => urgencyOrder[b.urgency] - urgencyOrder[a.urgency]);
        break;
    }
    
    setRequests(sortedRequests);
    setNotification({
      open: true,
      message: `Shipment requests sorted by ${getSortOptionLabel(option)}`,
      severity: 'info'
    });
  };

  const getSortOptionLabel = (option) => {
    switch(option) {
      case 'newest': return 'Newest first';
      case 'oldest': return 'Oldest first';
      case 'price_high': return 'Highest compensation';
      case 'price_low': return 'Lowest compensation';
      case 'weight_high': return 'Heaviest items';
      case 'weight_low': return 'Lightest items';
      case 'urgency': return 'Urgency level';
      default: return '';
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  const getUrgencyColor = (urgency) => {
    switch(urgency?.toLowerCase()) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
      default:
        return 'success';
    }
  };

  const getStatusInfo = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending':
        return { color: 'warning', label: 'Pending Journey Provider' };
      case 'accepted':
        return { color: 'info', label: 'Accepted, In Progress' };
      case 'in_transit':
        return { color: 'secondary', label: 'In Transit' };
      case 'delivered':
        return { color: 'success', label: 'Successfully Delivered' };
      case 'cancelled':
        return { color: 'error', label: 'Cancelled' };
      default:
        return { color: 'default', label: 'Open Request' };
    }
  };

  const generateCsvData = () => {
    return [
      ['Item Name', 'Category', 'Source Location', 'Destination Location', 'Weight (kg)', 'Compensation ($)', 'Urgency', 'Posted Date', 'Delivery Deadline', 'Requester'],
      ...requests.map(req => [
        req.item_name,
        req.category,
        req.source_location,
        req.destination_location,
        req.item_weight,
        req.offered_price,
        req.urgency,
        formatDate(req.created_at),
        req.delivery_deadline ? formatDate(req.delivery_deadline) : 'Not specified',
        req.requester?.full_name || 'Anonymous'
      ])
    ];
  };

  const onLayoutChange = (layout, layouts) => {
    setLayouts(layouts);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  const renderRequestCard = (request) => {
    return (
      <RequestCard elevation={2}>
        <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardHeader>
            <Typography variant="h6" gutterBottom>
              {request.item_name}
            </Typography>
            <Box>
              <Chip 
                label={getStatusInfo(request.status).label}
                size="small"
                color={getStatusInfo(request.status).color}
                sx={{ mr: 1 }}
              />
              {user && (
                <IconButton 
                  size="small" 
                  onClick={() => handleSaveRequest(request.id)}
                  color={savedRequests.includes(request.id) ? "primary" : "default"}
                >
                  {savedRequests.includes(request.id) ? 
                    <Bookmark fontSize="small" /> : 
                    <BookmarkBorder fontSize="small" />
                  }
                </IconButton>
              )}
            </Box>
          </CardHeader>
          
          <CardBody>
            <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              <Chip 
                label={request.category || 'General Item'}
                size="small" 
                icon={<Category />}
                variant="outlined"
              />
              <Chip 
                label={`${request.urgency || 'Normal'} Priority`}
                size="small"
                icon={<PriorityHigh />}
                color={getUrgencyColor(request.urgency)}
              />
              {request.delivery_deadline && (
                <Chip 
                  label={`By ${formatDate(request.delivery_deadline)}`}
                  size="small"
                  icon={<AccessTime />}
                  color={
                    new Date(request.delivery_deadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 
                      ? 'warning' 
                      : 'default'
                  }
                  variant="outlined"
                />
              )}
            </Box>
            
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <LocationBox theme="source">
                <Typography variant="body2" color="text.secondary">
                  <Place fontSize="small" sx={{ verticalAlign: 'text-bottom', mr: 0.5 }} />
                  From
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {request.source_location}
                </Typography>
              </LocationBox>
              <LocationBox theme="destination">
                <Typography variant="body2" color="text.secondary">
                  <Place fontSize="small" sx={{ verticalAlign: 'text-bottom', mr: 0.5 }} />
                  To
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {request.destination_location}
                </Typography>
              </LocationBox>
            </Stack>
            
            {request.item_weight && (
              <Typography variant="body2" sx={{ mb: 1 }}>
                <LocalShipping fontSize="small" sx={{ verticalAlign: 'text-bottom', mr: 0.5 }} />
                Weight: <strong>{request.item_weight} kg</strong>
              </Typography>
            )}
            
            <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  src={request.requester?.avatar_url}
                  alt={request.requester?.full_name || 'Anonymous'}
                  sx={{ width: 24, height: 24 }}
                >
                  {(request.requester?.full_name || 'A')[0]}
                </Avatar>
                <Typography variant="body2">
                  {request.requester?.full_name || 'Anonymous'}
                  {request.requester?.verified && (
                    <VerifiedUser color="primary" fontSize="small" sx={{ ml: 0.5, verticalAlign: 'text-bottom' }} />
                  )}
                </Typography>
              </Stack>
              
              {request.offered_price && (
                <PriceChip 
                  label={`$${request.offered_price}`}
                  icon={<AttachMoney />}
                />
              )}
            </Box>
          </CardBody>
        </CardContent>
      </RequestCard>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        <ShoppingBag sx={{ mr: 1, verticalAlign: 'middle' }} />
        Shipment Requests
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Browse shipment requests from global users who need items delivered across borders securely
      </Typography>
      
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FilterList sx={{ mr: 1 }} />
            <Typography variant="h6">Find Global Shipment Requests</Typography>
          </Box>
          <Button 
            variant="outlined" 
            size="small"
            onClick={() => setDrawerOpen(true)}
            startIcon={<FilterAlt />}
          >
            Advanced Filters
          </Button>
        </Box>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="From Location"
              name="sourceLocation"
              value={filters.sourceLocation}
              onChange={handleFilterChange}
              placeholder="e.g. Tokyo"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Place />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="To Location"
              name="destinationLocation"
              value={filters.destinationLocation}
              onChange={handleFilterChange}
              placeholder="e.g. London"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Place />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Item Category</InputLabel>
              <Select
                labelId="category-label"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                label="Item Category"
                startAdornment={
                  <InputAdornment position="start">
                    <Category />
                  </InputAdornment>
                }
              >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="clothing">Clothing & Accessories</MenuItem>
                <MenuItem value="books">Books & Media</MenuItem>
                <MenuItem value="beauty">Beauty & Health</MenuItem>
                <MenuItem value="food">Food & Snacks</MenuItem>
                <MenuItem value="collectibles">Collectibles</MenuItem>
                <MenuItem value="medicine">Medicine & Healthcare</MenuItem>
                <MenuItem value="documents">Documents</MenuItem>
                <MenuItem value="other">Other Items</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="urgency-label">Priority Level</InputLabel>
              <Select
                labelId="urgency-label"
                name="urgency"
                value={filters.urgency}
                onChange={handleFilterChange}
                label="Priority Level"
                startAdornment={
                  <InputAdornment position="start">
                    <PriorityHigh />
                  </InputAdornment>
                }
              >
                <MenuItem value="">All Priorities</MenuItem>
                <MenuItem value="high">High Priority</MenuItem>
                <MenuItem value="medium">Medium Priority</MenuItem>
                <MenuItem value="low">Low Priority</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="weight-label">Weight Range</InputLabel>
              <Select
                labelId="weight-label"
                name="weightRange"
                value={filters.weightRange}
                onChange={handleFilterChange}
                label="Weight Range"
                startAdornment={
                  <InputAdornment position="start">
                    <LocalShipping />
                  </InputAdornment>
                }
              >
                <MenuItem value="">Any Weight</MenuItem>
                <MenuItem value="0-1">Lightweight (0-1 kg)</MenuItem>
                <MenuItem value="1-5">Medium (1-5 kg)</MenuItem>
                <MenuItem value="5-10">Heavy (5-10 kg)</MenuItem>
                <MenuItem value="10-20">Very Heavy (10-20 kg)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="price-label">Compensation Range</InputLabel>
              <Select
                labelId="price-label"
                name="priceRange"
                value={filters.priceRange}
                onChange={handleFilterChange}
                label="Compensation Range"
                startAdornment={
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                }
              >
                <MenuItem value="">Any Compensation</MenuItem>
                <MenuItem value="0-50">$0-$50</MenuItem>
                <MenuItem value="50-100">$50-$100</MenuItem>
                <MenuItem value="100-250">$100-$250</MenuItem>
                <MenuItem value="250-500">$250-$500</MenuItem>
                <MenuItem value="500-1000">$500+</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6} sx={{ display: 'flex', gap: 1 }}>
            <Button 
              variant="contained" 
              onClick={applyFilters}
              startIcon={<Search />}
              sx={{ flex: 1 }}
            >
              Find Matching Requests
            </Button>
            <Button 
              variant="outlined" 
              onClick={resetFilters}
              sx={{ flex: 1 }}
            >
              Reset Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              {requests.length} Global Shipment {requests.length === 1 ? 'Request' : 'Requests'} Found
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                onClick={toggleViewMode}
                startIcon={viewMode === 'grid' ? <ViewList /> : <ViewComfy />}
                size="small"
              >
                {viewMode === 'grid' ? 'List View' : 'Grid View'}
              </Button>
              
              <Button 
                variant="outlined"
                onClick={handleMenuOpen}
                startIcon={<Sort />}
                size="small"
              >
                {getSortOptionLabel(sortOption)}
              </Button>
              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItemComponent onClick={() => handleSortChange('newest')}>
                  <ListItemIcon><AccessTime fontSize="small" /></ListItemIcon>
                  <ListItemText>Newest first</ListItemText>
                </MenuItemComponent>
                <MenuItemComponent onClick={() => handleSortChange('oldest')}>
                  <ListItemIcon><AccessTime fontSize="small" /></ListItemIcon>
                  <ListItemText>Oldest first</ListItemText>
                </MenuItemComponent>
                <MenuItemComponent onClick={() => handleSortChange('price_high')}>
                  <ListItemIcon><AttachMoney fontSize="small" /></ListItemIcon>
                  <ListItemText>Highest compensation</ListItemText>
                </MenuItemComponent>
                <MenuItemComponent onClick={() => handleSortChange('price_low')}>
                  <ListItemIcon><AttachMoney fontSize="small" /></ListItemIcon>
                  <ListItemText>Lowest compensation</ListItemText>
                </MenuItemComponent>
                <MenuItemComponent onClick={() => handleSortChange('weight_high')}>
                  <ListItemIcon><LocalShipping fontSize="small" /></ListItemIcon>
                  <ListItemText>Heaviest items</ListItemText>
                </MenuItemComponent>
                <MenuItemComponent onClick={() => handleSortChange('weight_low')}>
                  <ListItemIcon><LocalShipping fontSize="small" /></ListItemIcon>
                  <ListItemText>Lightest items</ListItemText>
                </MenuItemComponent>
                <MenuItemComponent onClick={() => handleSortChange('urgency')}>
                  <ListItemIcon><PriorityHigh fontSize="small" /></ListItemIcon>
                  <ListItemText>Urgency level</ListItemText>
                </MenuItemComponent>
              </Menu>

              {user && (
                <CSVLink 
                  data={generateCsvData()} 
                  filename="global-shipment-requests.csv"
                  className="no-underline"
                >
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<GetApp />}
                  >
                    Export
                  </Button>
                </CSVLink>
              )}
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => navigate('/request-item')}
                startIcon={<ShoppingBag />}
              >
                Create New Request
              </Button>
            </Box>
          </Box>
          
          {viewMode === 'grid' && layouts ? (
            <ResponsiveGridLayout
              className="layout"
              layouts={layouts}
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{ lg: 12, md: 12, sm: 12, xs: 1, xxs: 1 }}
              rowHeight={30}
              isDraggable={true}
              isResizable={true}
              onLayoutChange={onLayoutChange}
              containerPadding={[10, 10]}
            >
              {requests.map(request => (
                <div key={request.id.toString()} onClick={() => navigate(`/item-request/${request.id}`)}>
                  <Badge 
                    badgeContent={request.urgency?.toUpperCase()} 
                    color={getUrgencyColor(request.urgency)}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    sx={{ width: '100%', height: '100%' }}
                  >
                    {renderRequestCard(request)}
                  </Badge>
                </div>
              ))}
            </ResponsiveGridLayout>
          ) : (
            <Grid container spacing={3}>
              {requests.map((request) => (
                <Grid item xs={12} key={request.id} onClick={() => navigate(`/item-request/${request.id}`)} sx={{ cursor: 'pointer' }}>
                  <Badge 
                    badgeContent={request.urgency?.toUpperCase()} 
                    color={getUrgencyColor(request.urgency)}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    sx={{ width: '100%' }}
                  >
                    {renderRequestCard(request)}
                  </Badge>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
      
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 320, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Advanced Filters
          </Typography>
          
          <FormControlLabel
            control={
              <Switch
                checked={filters.showVerifiedOnly}
                onChange={(e) => setFilters({...filters, showVerifiedOnly: e.target.checked})}
              />
            }
            label="Only show verified requesters"
            sx={{ mb: 2, display: 'block' }}
          />
          
          <Typography gutterBottom>Card Height</Typography>
          <Slider
            value={cardHeight}
            onChange={(e, newValue) => setCardHeight(newValue)}
            min={180}
            max={300}
            step={20}
            marks
            valueLabelDisplay="auto"
            sx={{ mb: 3 }}
          />
          
          <Button 
            variant="contained" 
            fullWidth 
            onClick={() => {
              applyFilters();
              setDrawerOpen(false);
            }}
            sx={{ mb: 1 }}
          >
            Apply Filters
          </Button>
          <Button 
            variant="outlined" 
            fullWidth 
            onClick={() => {
              resetFilters();
              setDrawerOpen(false);
            }}
          >
            Reset All Filters
          </Button>
        </Box>
      </Drawer>
      
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={() => setNotification({...notification, open: false})}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setNotification({...notification, open: false})}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      {requests.length === 0 && !loading && (
        <EmptyStateContainer>
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <ShoppingBag sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No Shipment Requests Found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              No matching shipment requests were found with your current filters.
            </Typography>
            <Button 
              variant="outlined"
              onClick={resetFilters}
              startIcon={<FilterList />}
            >
              Clear All Filters
            </Button>
            <Button 
              variant="contained" 
              sx={{ ml: 2 }}
              onClick={() => navigate('/request-item')}
              startIcon={<ShoppingBag />}
            >
              Create New Request
            </Button>
          </Box>
        </EmptyStateContainer>
      )}
    </Container>
  );
};

export default ItemRequests;
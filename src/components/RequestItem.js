import React from 'react';
import { 
  Box, Typography, InputAdornment,
  useTheme, CircularProgress
} from '@mui/material';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import { 
  Inventory2, LocationOn, CalendarMonth, Scale, 
  AttachMoney, Description
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Import styled components
import {
  RequestContainer,
  PageTitle,
  PageDescription,
  FormGrid,
  StyledTextField,
  SubmitButton,
  StyledAlert,
  StyledSuccessAlert
} from './styled/RequestItemStyled';

const ResponsiveGridLayout = WidthProvider(Responsive);

// Form validation schema
const schema = yup.object().shape({
  item_name: yup.string().required('Item name is required'),
  item_description: yup.string(),
  source_location: yup.string().required('Source location is required'),
  destination_location: yup.string().required('Destination location is required'),
  deadline: yup
    .date()
    .required('Deadline date is required')
    .min(new Date(), 'Deadline must be in the future'),
  estimated_weight: yup
    .number()
    .required('Weight is required')
    .positive('Weight must be positive')
    .typeError('Weight must be a number'),
  estimated_value: yup
    .number()
    .nullable()
    .transform((value, originalValue) => 
      originalValue === '' ? null : value)
    .typeError('Value must be a number'),
  compensation_amount: yup
    .number()
    .nullable()
    .transform((value, originalValue) => 
      originalValue === '' ? null : value)
    .typeError('Compensation must be a number'),
  compensation_type: yup.string().default('cash')
});

const RequestItem = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      item_name: '',
      item_description: '',
      source_location: '',
      destination_location: '',
      deadline: '',
      estimated_weight: 1,
      estimated_value: '',
      compensation_amount: '',
      compensation_type: 'cash'
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to request an item');
      }
      
      // Insert item request
      const { error: insertError } = await supabase
        .from('item_requests')
        .insert([
          {
            user_id: user.id,
            item_name: data.item_name,
            item_description: data.item_description,
            source_location: data.source_location,
            destination_location: data.destination_location,
            deadline: data.deadline,
            estimated_weight: data.estimated_weight,
            estimated_value: data.estimated_value,
            compensation_amount: data.compensation_amount,
            compensation_type: data.compensation_type,
            status: 'open',
            created_at: new Date().toISOString()
          }
        ]);
      
      if (insertError) throw insertError;
      
      // Success
      setSuccess(true);
      
      // Reset form
      reset();
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Layout configuration for react-grid-layout
  const layouts = {
    lg: [
      { i: 'title', x: 0, y: 0, w: 12, h: 1, static: true },
      { i: 'description', x: 0, y: 1, w: 12, h: 1, static: true },
      { i: 'alerts', x: 0, y: 2, w: 12, h: 1, static: true },
      { i: 'item_name', x: 0, y: 3, w: 6, h: 1 },
      { i: 'item_description', x: 6, y: 3, w: 6, h: 2 },
      { i: 'source_location', x: 0, y: 4, w: 6, h: 1 },
      { i: 'destination_location', x: 6, y: 5, w: 6, h: 1 },
      { i: 'deadline', x: 0, y: 5, w: 6, h: 1 },
      { i: 'estimated_weight', x: 0, y: 6, w: 4, h: 1 },
      { i: 'estimated_value', x: 4, y: 6, w: 4, h: 1 },
      { i: 'compensation_amount', x: 8, y: 6, w: 4, h: 1 },
      { i: 'submit', x: 0, y: 7, w: 12, h: 1, static: true }
    ],
    md: [
      { i: 'title', x: 0, y: 0, w: 10, h: 1, static: true },
      { i: 'description', x: 0, y: 1, w: 10, h: 1, static: true },
      { i: 'alerts', x: 0, y: 2, w: 10, h: 1, static: true },
      { i: 'item_name', x: 0, y: 3, w: 5, h: 1 },
      { i: 'item_description', x: 5, y: 3, w: 5, h: 2 },
      { i: 'source_location', x: 0, y: 4, w: 5, h: 1 },
      { i: 'destination_location', x: 5, y: 5, w: 5, h: 1 },
      { i: 'deadline', x: 0, y: 5, w: 5, h: 1 },
      { i: 'estimated_weight', x: 0, y: 6, w: 3, h: 1 },
      { i: 'estimated_value', x: 3, y: 6, w: 3, h: 1 },
      { i: 'compensation_amount', x: 6, y: 6, w: 4, h: 1 },
      { i: 'submit', x: 0, y: 7, w: 10, h: 1, static: true }
    ],
    sm: [
      { i: 'title', x: 0, y: 0, w: 6, h: 1, static: true },
      { i: 'description', x: 0, y: 1, w: 6, h: 1, static: true },
      { i: 'alerts', x: 0, y: 2, w: 6, h: 1, static: true },
      { i: 'item_name', x: 0, y: 3, w: 6, h: 1 },
      { i: 'item_description', x: 0, y: 4, w: 6, h: 2 },
      { i: 'source_location', x: 0, y: 6, w: 6, h: 1 },
      { i: 'destination_location', x: 0, y: 7, w: 6, h: 1 },
      { i: 'deadline', x: 0, y: 8, w: 6, h: 1 },
      { i: 'estimated_weight', x: 0, y: 9, w: 6, h: 1 },
      { i: 'estimated_value', x: 0, y: 10, w: 6, h: 1 },
      { i: 'compensation_amount', x: 0, y: 11, w: 6, h: 1 },
      { i: 'submit', x: 0, y: 12, w: 6, h: 1, static: true }
    ]
  };

  return (
    <RequestContainer>
      <div key="title">
        <PageTitle variant="h4" component="h2" gutterBottom>
          Request an Item from <span>Anywhere in the World</span>
        </PageTitle>
      </div>
      
      <div key="description">
        <PageDescription variant="body1" paragraph>
          Tell us what you need, where it's from, and where you want it delivered. We'll connect you with travelers who can help.
        </PageDescription>
      </div>
      
      <div key="alerts">
        {error && <StyledAlert severity="error">{error}</StyledAlert>}
        {success && (
          <StyledSuccessAlert severity="success">
            Your item request has been submitted successfully! Redirecting...
          </StyledSuccessAlert>
        )}
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={100}
          containerPadding={[15, 15]}
          margin={[20, 20]}
        >
          <div key="item_name">
            <Controller
              name="item_name"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  label="Item Name"
                  placeholder="What do you need?"
                  error={!!errors.item_name}
                  helperText={errors.item_name?.message || ""}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Inventory2 sx={{ color: theme.palette.primary.main }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
          
          <div key="item_description">
            <Controller
              name="item_description"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  label="Item Description"
                  placeholder="Provide details about the item"
                  error={!!errors.item_description}
                  helperText={errors.item_description?.message || ""}
                  fullWidth
                  multiline
                  rows={4}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Description sx={{ color: theme.palette.primary.main }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
          
          <div key="source_location">
            <Controller
              name="source_location"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  label="Source Location"
                  placeholder="Where is the item located?"
                  error={!!errors.source_location}
                  helperText={errors.source_location?.message || ""}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn sx={{ color: theme.palette.primary.main }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
          
          <div key="destination_location">
            <Controller
              name="destination_location"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  label="Destination Location"
                  placeholder="Where do you want it delivered?"
                  error={!!errors.destination_location}
                  helperText={errors.destination_location?.message || ""}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn sx={{ color: theme.palette.primary.main }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
          
          <div key="deadline">
            <Controller
              name="deadline"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  type="date"
                  label="Deadline"
                  InputLabelProps={{ 
                    shrink: true,
                  }}
                  error={!!errors.deadline}
                  helperText={errors.deadline?.message || ""}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonth sx={{ color: theme.palette.primary.main }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
          
          <div key="estimated_weight">
            <Controller
              name="estimated_weight"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  label="Weight (kg)"
                  type="number"
                  error={!!errors.estimated_weight}
                  helperText={errors.estimated_weight?.message || ""}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Scale sx={{ color: theme.palette.primary.main }} />
                      </InputAdornment>
                    ),
                    inputProps: { min: 0, step: 0.1 }
                  }}
                />
              )}
            />
          </div>
          
          <div key="estimated_value">
            <Controller
              name="estimated_value"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  label="Estimated Value ($)"
                  type="number"
                  error={!!errors.estimated_value}
                  helperText={errors.estimated_value?.message || ""}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoney sx={{ color: theme.palette.primary.main }} />
                      </InputAdornment>
                    ),
                    inputProps: { min: 0, step: 1 }
                  }}
                />
              )}
            />
          </div>
          
          <div key="compensation_amount">
            <Controller
              name="compensation_amount"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  label="Compensation ($)"
                  type="number"
                  error={!!errors.compensation_amount}
                  helperText={errors.compensation_amount?.message || ""}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoney sx={{ color: theme.palette.primary.main }} />
                      </InputAdornment>
                    ),
                    inputProps: { min: 0, step: 1 }
                  }}
                />
              )}
            />
          </div>
          
          <div key="submit" style={{ display: 'flex', justifyContent: 'center' }}>
            <SubmitButton
              type="submit"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </SubmitButton>
          </div>
        </ResponsiveGridLayout>
      </form>
    </RequestContainer>
  );
};

export default RequestItem;
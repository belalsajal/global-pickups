import styled from 'styled-components';
import { Box, TextField, Button, Grid, Alert, Typography, Card, CardContent, Chip, Drawer, IconButton, Paper } from '@mui/material';

// Styled components for RequestItem
export const RequestContainer = styled(Box)`
  animation: fadeIn 0.5s ease-out;
  padding: 30px;
  border-radius: 12px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  max-width: 1200px;
  margin: 0 auto;

  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const PageTitle = styled(Typography)`
  font-weight: bold;
  color: #000000;
  margin-bottom: 1.5rem;
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  line-height: 1.3;

  span {
    color: #FF6F61;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: #FF6F61;
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }
  }

  &:hover span:after {
    transform: scaleX(1);
  }
`;

export const PageDescription = styled(Typography)`
  color: #666666;
  margin-bottom: 2rem;
  max-width: 90%;
  font-size: 1.125rem;
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
`;

export const FormGrid = styled(Grid)`
  margin-top: 1rem;
`;

export const StyledTextField = styled(TextField)`
  & .MuiInputBase-root {
    border-radius: 8px;
    background-color: white;
    transition: all 0.3s ease;
    border: 1px solid #e0e0e0;
    
    &:hover {
      border-color: #FF6F61;
    }
    
    &:focus-within {
      border-color: #FF6F61;
      box-shadow: 0 0 0 2px rgba(255, 111, 97, 0.2);
    }
  }
  
  & .MuiInputLabel-root {
    font-family: 'Poppins', sans-serif;
    
    &.Mui-focused {
      color: #FF6F61;
    }
  }
  
  & .MuiInputBase-input {
    font-family: 'Poppins', sans-serif;
    padding: 12px 14px;
  }
`;

export const SubmitButton = styled(Button)`
  background-color: #FF6F61;
  color: white;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  padding: 10px 30px;
  border-radius: 8px;
  text-transform: none;
  transition: all 0.3s ease;
  margin-top: 1.5rem;
  
  &:hover {
    background-color: #e55a4d;
    box-shadow: 0 4px 12px rgba(255, 111, 97, 0.3);
    transform: translateY(-2px);
  }
  
  &:disabled {
    background-color: #cccccc;
  }
`;

export const StyledAlert = styled(Alert)`
  margin-bottom: 1.5rem;
  border-radius: 8px;
  animation: slideIn 0.3s ease-out;
  
  @keyframes slideIn {
    0% { transform: translateY(-10px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
`;

export const StyledSuccessAlert = styled(Alert)`
  margin-bottom: 1.5rem;
  border-radius: 8px;
  background-color: #34C759;
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
`;

export const FilterControls = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
  align-items: center;
`;

export const GridControlBar = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// New styled components for ItemRequests
export const RequestCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;

export const EnhancedRequestCard = styled(RequestCard)`
  transition: all 0.3s ease;
  height: ${props => props.customHeight ? `${props.customHeight}px` : '100%'};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
`;

export const CardHeaderStyled = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

export const CardBodyStyled = styled(Box)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const CardFooterStyled = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 12px;
`;

export const LocationWrapper = styled(Box)`
  display: flex;
  flex-direction: ${props => props.vertical ? 'column' : 'row'};
  gap: 12px;
  margin-bottom: 16px;
  
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export const UrgencyChip = styled(Chip)`
  font-weight: bold;
  
  &.high {
    background-color: rgba(244, 67, 54, 0.1);
    color: #f44336;
    border: 1px solid #f44336;
  }
  
  &.medium {
    background-color: rgba(255, 152, 0, 0.1);
    color: #ff9800;
    border: 1px solid #ff9800;
  }
  
  &.low {
    background-color: rgba(76, 175, 80, 0.1);
    color: #4caf50;
    border: 1px solid #4caf50;
  }
`;

export const CategoryChip = styled(Chip)`
  background-color: rgba(33, 150, 243, 0.1);
  color: #2196f3;
  border: 1px solid #2196f3;
`;

export const FilterDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    padding: 24px;
    width: 100%;
    max-width: 350px;
  }
`;

export const ActionButton = styled(Button)`
  text-transform: none;
  border-radius: 8px;
  padding: 6px 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const SortButton = styled(Button)`
  background-color: white;
  border: 1px solid #e0e0e0;
  color: #333;
  font-weight: 500;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const BookmarkButton = styled(IconButton)`
  &.saved {
    color: #FF6F61;
  }
  
  &:hover {
    background-color: rgba(255, 111, 97, 0.1);
  }
`;

export const CardHeader = styled(Box)`
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const CardBody = styled(Box)`
  flex-grow: 1;
`;

export const LocationBox = styled(Box)`
  padding: 8px;
  background: ${props => props.theme === 'source' ? 'rgba(0, 128, 255, 0.05)' : 'rgba(76, 175, 80, 0.05)'};
  border-radius: 8px;
  margin-bottom: 12px;
`;

export const PriceChip = styled(Chip)`
  font-weight: bold;
  background: linear-gradient(135deg, #4caf50, #2e7d32);
  color: white;
`;

export const FilterContainer = styled(Paper)`
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
`;

export const ControlsBar = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
`;

export const CardSizeSlider = styled(Box)`
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const GridContainer = styled(Box)`
  margin-top: 16px;
  min-height: 500px;
`;

export const EmptyStateContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  text-align: center;
  background: #f9f9f9;
  border-radius: 12px;
  margin: 24px 0;
`;
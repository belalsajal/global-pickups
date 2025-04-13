import styled from 'styled-components';
import { Paper, Card, Typography, Button } from '@mui/material';

// Color palette
export const colors = {
  primary: '#FF6F61',
  secondary: '#3662ea',
  accent: '#FFA41B',
  background: '#f5f7fa',
  cardBg: '#FFFFFF',
  text: '#333333',
  textLight: '#757575',
  border: 'rgba(0, 0, 0, 0.08)'
};

export const TravelPlansContainer = styled.div`
  margin-bottom: 20px;
`;

export const TravelPlansHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  
  svg {
    margin-right: 8px;
    color: ${colors.primary};
  }
`;

export const StyledPaper = styled(Paper)`
  padding: 24px;
  margin-bottom: 32px;
  transition: all 0.3s;
  
  &.popular-routes {
    background: linear-gradient(to right, ${colors.background}, #e9f0ff);
  }
  
  &.saved-routes {
    border-left: 4px solid ${colors.secondary};
  }
  
  &.filter-section {
    border-left: 4px solid ${colors.primary};
  }
`;

export const PopularRouteCard = styled(Card)`
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 10px;
  border: 1px solid ${colors.border};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const SavedRouteCard = styled(Card)`
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 10px;
  border: 1px solid ${colors.border};
  height: 100%;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const TravelPlanCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  border-radius: 10px;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

export const TravelPlanCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

export const TravelPlanCardContent = styled.div`
  flex-grow: 1;
`;

export const TravelPlanCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${colors.border};
`;

export const RouteText = styled(Typography)`
  font-weight: 600;
  margin-bottom: 8px;
`;

export const SearchButton = styled(Button)`
  border-radius: 20px;
  background: ${colors.primary};
  
  &:hover {
    background: ${colors.accent};
  }
`;

export const GridItemWrapper = styled.div`
  background-color: ${colors.cardBg};
  border-radius: 10px;
  padding: 16px;
  height: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;
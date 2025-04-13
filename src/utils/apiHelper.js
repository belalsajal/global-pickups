import * as mockApiService from '../services/mockApiService';

/**
 * API Helper
 * 
 * A utility to handle API calls with built-in fallbacks to mock services when needed
 */

// Determine if we should use mock API
const shouldUseMock = () => {
  // Use mocks when explicitly set in environment or when in development mode
  return process.env.REACT_APP_USE_MOCK_API === 'true' || 
         (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL);
};

// Get the correct API URL based on environment
const getApiBaseUrl = () => {
  // If an API URL is explicitly set in environment variables, use that
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // React app typically runs on port 3000, while backend often runs on a different port
  // Default to port 5000 for backend if not specified
  const backendPort = process.env.REACT_APP_API_PORT || '5000';
  
  // In development, when using localhost, use the correct port
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:${backendPort}`;
  }
  
  // In production, API calls are often relative to the current host
  return '';
};

// Check server status with fallback to mock
export const checkServerStatus = async () => {
  if (shouldUseMock()) {
    console.log('Using mock server status');
    return mockApiService.getMockServerStatus();
  }
  
  try {
    const apiBaseUrl = getApiBaseUrl();
    console.log(`Checking server status at: ${apiBaseUrl}/api/status`);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${apiBaseUrl}/api/status`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      credentials: 'include'
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error('Server returned error status');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Error checking server status, falling back to mock:', error.message);
    return mockApiService.getMockServerStatus();
  }
};

// Generic API calling function with fallback to mock
export const callApi = async (endpoint, method = 'GET', data = null, mockFunction = null) => {
  if (shouldUseMock() && mockFunction) {
    console.log(`Using mock for ${endpoint}`);
    return mockFunction();
  }
  
  try {
    const apiBaseUrl = getApiBaseUrl();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      credentials: 'include'
    };
    
    if (data && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(data);
    }
    
    const response = await fetch(`${apiBaseUrl}${endpoint}`, options);
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.warn(`Error calling API ${endpoint}, falling back to mock:`, error.message);
    if (mockFunction) {
      return mockFunction();
    }
    throw error;
  }
};

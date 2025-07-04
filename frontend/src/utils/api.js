import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add default headers
API.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Request interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      console.error(`Server error ${status}:`, data);
      
      // Handle specific error cases
      if (status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      
      throw error;
    } else if (error.request) {
      // Request made but no response
      console.error('Network error:', error.request);
      throw new Error('Network error: Unable to reach the server');
    } else {
      // Something happened in setting up the request
      console.error('Request setup error:', error.message);
      throw new Error('Error: ' + error.message);
    }
  }
);

// Retry logic
const retryCount = 3;
const retryDelay = 1000;

API.interceptors.response.use(undefined, async (error) => {
  const { config, response } = error;
  if (!config || !config.retry) {
    config.retry = retryCount;
  }

  if (config.retry === 0) {
    return Promise.reject(error);
  }

  config.retry--;
  
  if (response) {
    // Only retry on certain status codes
    if (response.status >= 500) {
      await new Promise(resolve => setTimeout(resolve, retryDelay));
      return API(config);
    }
  }

  return Promise.reject(error);
});

export default API;
export { API };

import axios from 'axios';

// Create axios instance
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true // Send cookies with requests
});

// Remove any trailing slashes from baseURL
axiosInstance.defaults.baseURL = baseURL.replace(/\/+$/, '');

// Request interceptor to add CSRF token and auth token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get CSRF token from cookies
    const csrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrfToken='))
      ?.split('=')[1];

    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }

    // Get auth token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Ensure the URL doesn't start with double slashes
    if (config.url) {
      config.url = config.url.replace(/^\/+/g, '');
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      // Handle forbidden access
      window.location.href = '/unauthorized';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

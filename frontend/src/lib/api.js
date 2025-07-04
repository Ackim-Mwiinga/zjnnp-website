import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const API = {
  // User endpoints
  login: '/auth/login',
  register: '/auth/register',
  profile: '/auth/profile',
  updateProfile: '/auth/profile',

  // Manuscript endpoints
  manuscripts: '/manuscripts',
  manuscript: (id) => `/manuscripts/${id}`,

  // Review endpoints
  reviews: '/reviews',
  review: (id) => `/reviews/${id}`,

  // Article endpoints
  articles: '/articles',
  article: (id) => `/articles/${id}`,

  // Editorial Board endpoints
  editorialBoard: '/editorialBoard',

  // Static Content endpoints
  staticContent: '/staticContent',

  // Newsletter endpoints
  newsletter: '/newsletter',

  // Page endpoints
  pages: '/pages',
  page: (slug) => `/pages/${slug}`,
};

// Create axios instance
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

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

export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    
    if (status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else if (status === 403) {
      window.location.href = '/unauthorized';
    } else if (status === 404) {
      window.location.href = '/not-found';
    } else if (status >= 500) {
      return {
        type: 'server',
        message: data?.message || 'Server error. Please try again later.',
        status
      };
    } else {
      return {
        type: 'validation',
        message: data?.message || 'Invalid request.',
        status,
        errors: data?.errors
      };
    }
  } else if (error.request) {
    // Request made but no response
    return {
      type: 'network',
      message: 'Network error: Unable to reach the server',
      status: 0
    };
  } else {
    // Something happened in setting up the request
    return {
      type: 'unknown',
      message: error.message || 'An unexpected error occurred',
      status: 0
    };
  }
};

export const formatError = (error) => {
  if (error.type === 'validation' && error.errors) {
    return Object.entries(error.errors).map(([field, message]) => 
      `${field}: ${message}`
    ).join('\n');
  }
  return error.message;
};

export const isRetryableError = (error) => {
  if (error.response) {
    const { status } = error.response;
    // Retry on server errors and network errors
    return status >= 500 || status === 0;
  }
  return true;
};

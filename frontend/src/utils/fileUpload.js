import axios from 'axios';

export const uploadFile = async (file, endpoint = '/api/files/upload', config = {}) => {
  if (!file) {
    throw new Error('File is required');
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(endpoint, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config.headers
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const validateFileUpload = (file, maxSize = 5 * 1024 * 1024, allowedTypes = ['pdf', 'doc', 'docx']) => {
  if (!file) {
    return 'File is required';
  }

  if (file.size > maxSize) {
    return `File size exceeds ${maxSize / (1024 * 1024)}MB limit`;
  }

  const fileType = file.name.split('.').pop().toLowerCase();
  if (!allowedTypes.includes(fileType)) {
    return `File type must be one of: ${allowedTypes.join(', ')}`;
  }

  return null;
};

export const createFilePreview = (file) => {
  return new Promise((resolve) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    } else {
      resolve(null);
    }
  });
};

export const getFileTypeIcon = (file) => {
  const type = file.name.split('.').pop().toLowerCase();
  const icons = {
    pdf: '📄',
    doc: '📄',
    docx: '📄',
    jpg: '🖼️',
    jpeg: '🖼️',
    png: '🖼️',
    gif: '🖼️'
  };
  return icons[type] || '📄';
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

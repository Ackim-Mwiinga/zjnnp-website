export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const validatePhone = (phone) => {
  // Basic phone number validation
  const phoneRegex = /^\+?\d{10,15}$/;
  return phoneRegex.test(phone);
};

export const validateDate = (date) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(date);
};

export const validateWordCount = (count) => {
  const num = parseInt(count);
  return !isNaN(num) && num > 0 && num < 100000;
};

export const validateFile = (file, maxSize = 5 * 1024 * 1024) => {
  if (!file) return 'File is required';
  if (file.size > maxSize) return 'File is too large (max 5MB)';
  return null;
};

export const validateForm = (formData, validations) => {
  const errors = {};
  Object.entries(validations).forEach(([field, validation]) => {
    const value = formData[field];
    if (validation.required && (!value || value.trim() === '')) {
      errors[field] = `${field} is required`;
    }
    if (validation.email && !validateEmail(value)) {
      errors[field] = 'Please enter a valid email address';
    }
    if (validation.password && !validatePassword(value)) {
      errors[field] = 'Password must be at least 8 characters and include uppercase, lowercase, and numbers';
    }
    if (validation.phone && !validatePhone(value)) {
      errors[field] = 'Please enter a valid phone number';
    }
    if (validation.date && !validateDate(value)) {
      errors[field] = 'Please enter a valid date (YYYY-MM-DD)';
    }
    if (validation.file && validateFile(value)) {
      errors[field] = validateFile(value);
    }
  });
  return errors;
};

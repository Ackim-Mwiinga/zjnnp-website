import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CompleteProfile = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personal: {
      fullName: '',
      title: '',
      gender: '',
      dateOfBirth: '',
    },
    contact: {
      email: '',
      phone: '',
    },
    institution: {
      name: '',
      department: '',
    },
    academic: {
      degrees: '',
      orcid: '',
      scopus: '',
      expertise: '',
    },
    preferences: {
      reviewer: false,
      newsletter: false,
    },
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (section, field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: e.target.value,
      },
    }));
  };

  const handleCheckboxChange = (section, field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: e.target.checked,
      },
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate current step fields
    if (currentStep === 1) {
      if (!formData.personal.fullName) newErrors.fullName = 'Full name is required';
      if (!formData.personal.title) newErrors.title = 'Title is required';
    }

    if (currentStep === 2) {
      if (!formData.contact.email) newErrors.email = 'Email is required';
      if (!formData.contact.phone) newErrors.phone = 'Phone is required';
    }

    if (currentStep === 3) {
      if (!formData.institution.name) newErrors.institution = 'Institution is required';
      if (!formData.institution.department) newErrors.department = 'Department is required';
    }

    if (currentStep === 4) {
      if (!formData.academic.degrees) newErrors.degrees = 'Degrees are required';
      if (!formData.academic.expertise) newErrors.expertise = 'Areas of expertise are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateForm()) return;
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/dashboard');
    } catch (err) {
      alert('Error completing profile. Please try again.');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.personal.fullName}
                  onChange={handleInputChange('personal', 'fullName')}
                  className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1f5f43]"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <select
                  value={formData.personal.title}
                  onChange={handleInputChange('personal', 'title')}
                  className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1f5f43]"
                >
                  <option value="">Select title</option>
                  <option value="Dr.">Dr.</option>
                  <option value="Prof.">Prof.</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                </select>
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    value={formData.personal.gender}
                    onChange={handleInputChange('personal', 'gender')}
                    className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1f5f43]"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.personal.dateOfBirth}
                    onChange={handleInputChange('personal', 'dateOfBirth')}
                    className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1f5f43]"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.contact.email}
                  onChange={handleInputChange('contact', 'email')}
                  className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1f5f43]"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.contact.phone}
                  onChange={handleInputChange('contact', 'phone')}
                  className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1f5f43]"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Institutional Affiliation</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institution Name
                </label>
                <input
                  type="text"
                  value={formData.institution.name}
                  onChange={handleInputChange('institution', 'name')}
                  className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1f5f43]"
                />
                {errors.institution && (
                  <p className="text-red-500 text-sm mt-1">{errors.institution}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  value={formData.institution.department}
                  onChange={handleInputChange('institution', 'department')}
                  className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1f5f43]"
                />
                {errors.department && (
                  <p className="text-red-500 text-sm mt-1">{errors.department}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Academic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Degrees
                </label>
                <textarea
                  value={formData.academic.degrees}
                  onChange={handleInputChange('academic', 'degrees')}
                  rows={3}
                  className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1f5f43]"
                  placeholder="List your academic degrees (e.g., PhD in Neurology)"
                />
                {errors.degrees && (
                  <p className="text-red-500 text-sm mt-1">{errors.degrees}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ORCID ID
                </label>
                <input
                  type="text"
                  value={formData.academic.orcid}
                  onChange={handleInputChange('academic', 'orcid')}
                  className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1f5f43]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scopus ID
                </label>
                <input
                  type="text"
                  value={formData.academic.scopus}
                  onChange={handleInputChange('academic', 'scopus')}
                  className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1f5f43]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Areas of Expertise
                </label>
                <textarea
                  value={formData.academic.expertise}
                  onChange={handleInputChange('academic', 'expertise')}
                  rows={3}
                  className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1f5f43]"
                  placeholder="List your areas of expertise (e.g., Neurology, Mental Health)"
                />
                {errors.expertise && (
                  <p className="text-red-500 text-sm mt-1">{errors.expertise}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.preferences.reviewer}
                  onChange={handleCheckboxChange('preferences', 'reviewer')}
                  className="h-4 w-4 text-[#1f5f43] focus:ring-[#1f5f43] border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  I am interested in being a reviewer
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.preferences.newsletter}
                  onChange={handleCheckboxChange('preferences', 'newsletter')}
                  className="h-4 w-4 text-[#1f5f43] focus:ring-[#1f5f43] border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Subscribe to newsletter
                </label>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conflict of Interest Agreement
                </label>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    I hereby declare that I have no conflicts of interest that could influence my work as a reviewer or author for ZJNNP.
                  </p>
                </div>
                <div className="mt-4">
                  <input
                    type="checkbox"
                    required
                    className="h-4 w-4 text-[#1f5f43] focus:ring-[#1f5f43] border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    I agree to the Conflict of Interest Policy
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl p-8 bg-white rounded-xl shadow-xl"
      >
        <h2 className="text-2xl font-bold text-[#103b55] text-center mb-8">
          Complete Your Profile
        </h2>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-green-500" />
                <span>Account Created</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-full bg-[#1f5f43] rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 5) * 100}%` }}
                />
              </div>
              <div className="flex items-center space-x-2">
                <span>Profile Complete</span>
                {currentStep === 5 && (
                  <FaCheckCircle className="text-green-500" />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {renderStep()}

          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300"
              >
                Back
              </button>
            )}
            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-[#1f5f43] text-white rounded-lg font-semibold hover:bg-[#103b55] transition-colors duration-300"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-[#1f5f43] text-white rounded-lg font-semibold hover:bg-[#103b55] transition-colors duration-300"
              >
                Complete Profile
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CompleteProfile;

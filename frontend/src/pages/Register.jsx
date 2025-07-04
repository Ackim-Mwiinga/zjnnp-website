import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../utils/api';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await API.post('/auth/register', {
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      
      // Redirect to profile setup
      window.location.href = '/profile-setup';
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="/images/zjnnp-logo.png"
            alt="ZJNNP"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                  Position
                </label>
                <input
                  type="text"
                  name="position"
                  id="position"
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={formData.position}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
                  Institution
                </label>
                <input
                  type="text"
                  name="institution"
                  id="institution"
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={formData.institution}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  id="department"
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="institutionalAddress" className="block text-sm font-medium text-gray-700">
                  Institutional Address
                </label>
                <textarea
                  name="institutionalAddress"
                  id="institutionalAddress"
                  rows="3"
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={formData.institutionalAddress}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Academic Information</h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="degrees" className="block text-sm font-medium text-gray-700">
                  Degrees
                </label>
                <input
                  type="text"
                  name="degrees"
                  id="degrees"
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={formData.degrees}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="orcid" className="block text-sm font-medium text-gray-700">
                  ORCID ID
                </label>
                <input
                  type="text"
                  name="orcid"
                  id="orcid"
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={formData.orcid}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="scopusId" className="block text-sm font-medium text-gray-700">
                  Scopus ID
                </label>
                <input
                  type="text"
                  name="scopusId"
                  id="scopusId"
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={formData.scopusId}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="researchGate" className="block text-sm font-medium text-gray-700">
                  ResearchGate Profile
                </label>
                <input
                  type="text"
                  name="researchGate"
                  id="researchGate"
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={formData.researchGate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="areasOfExpertise" className="block text-sm font-medium text-gray-700">
                  Areas of Expertise
                </label>
                <textarea
                  name="areasOfExpertise"
                  id="areasOfExpertise"
                  rows="3"
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={formData.areasOfExpertise}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="wantsToReview"
                  name="wantsToReview"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={formData.wantsToReview}
                  onChange={handleChange}
                />
                <label htmlFor="wantsToReview" className="ml-3 block text-sm text-gray-700">
                  I want to be considered as a reviewer
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="wantsUpdates"
                  name="wantsUpdates"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={formData.wantsUpdates}
                  onChange={handleChange}
                />
                <label htmlFor="wantsUpdates" className="ml-3 block text-sm text-gray-700">
                  I want to receive updates about ZJNNP
                </label>
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

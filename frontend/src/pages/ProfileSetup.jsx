import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    fullName: '',
    gender: '',
    dateOfBirth: '',
    position: '',
    institution: '',
    department: '',
    country: '',
    institutionalAddress: '',
    degrees: '',
    orcid: '',
    scopusId: '',
    researchGate: '',
    areasOfExpertise: '',
    wantsToReview: false,
    wantsUpdates: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Client-side validation
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      setLoading(false);
      return;
    }

    try {
      const response = await API.post('/auth/complete-profile', formData);
      if (response.data.success) {
        // Redirect based on user role
        switch (user.role) {
          case 'author':
            navigate('/dashboard');
            break;
          case 'reviewer':
            navigate('/review-queue');
            break;
          case 'editor':
            navigate('/editor-dashboard');
            break;
          case 'admin':
            navigate('/admin-dashboard');
            break;
          default:
            navigate('/dashboard');
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to complete profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Complete Your Profile
          </h2>
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
              {/* Personal Information */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <select
                  id="title"
                  name="title"
                  required
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={formData.title}
                  onChange={handleChange}
                >
                  <option value="">Select title</option>
                  <option value="Dr">Dr</option>
                  <option value="Prof">Prof</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                </select>
              </div>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  required
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>

              {/* Professional Information */}
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

              {/* Academic Information */}
              <div>
                <label htmlFor="degrees" className="block text-sm font-medium text-gray-700">
                  Degrees
                </label>
                <textarea
                  name="degrees"
                  id="degrees"
                  rows="3"
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={formData.degrees}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="orcid" className="block text-sm font-medium text-gray-700">
                  ORCID
                </label>
                <input
                  type="text"
                  name="orcid"
                  id="orcid"
                  placeholder="e.g., 0000-0002-1825-0097"
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
                  placeholder="https://www.researchgate.net/profile/..."
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={formData.researchGate}
                  onChange={handleChange}
                />
              </div>

              {/* Research Information */}
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

              {/* Preferences */}
              <div>
                <div className="flex items-center">
                  <input
                    id="wantsToReview"
                    name="wantsToReview"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={formData.wantsToReview}
                    onChange={handleChange}
                  />
                  <label htmlFor="wantsToReview" className="ml-2 block text-sm text-gray-900">
                    I want to be considered for reviewing manuscripts
                  </label>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <input
                    id="wantsUpdates"
                    name="wantsUpdates"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={formData.wantsUpdates}
                    onChange={handleChange}
                  />
                  <label htmlFor="wantsUpdates" className="ml-2 block text-sm text-gray-900">
                    I want to receive updates about journal news
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white`}
            >
              {loading ? 'Completing...' : 'Complete Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;

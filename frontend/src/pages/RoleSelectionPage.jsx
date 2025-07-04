import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import axios from 'axios';

const RoleSelectionPage = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const roles = [
    {
      id: 'author',
      title: 'Author',
      description: 'Submit and manage your manuscripts, track submission status, and receive feedback.',
      icon: '📝',
    },
    {
      id: 'reviewer',
      title: 'Peer Reviewer',
      description: 'Review submitted manuscripts, provide feedback, and help maintain publication quality.',
      icon: '🔍',
    },
    {
      id: 'editor',
      title: 'Editor',
      description: 'Manage the peer review process, assign reviewers, and make editorial decisions.',
      icon: '✏️',
    },
    {
      id: 'publisher',
      title: 'Publisher',
      description: 'Oversee the final publication process and manage published content.',
      icon: '📚',
    },
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedRole) {
      setError('Please select a role to continue');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Call the API to update the user's role
      const response = await axios.put(
        '/api/users/me/role',
        { role: selectedRole },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      // Update the user in the auth context
      updateUser(response.data.user);
      
      // Redirect to the appropriate dashboard
      navigate(`/dashboard/${selectedRole}`);
    } catch (err) {
      console.error('Error updating role:', err);
      setError(err.response?.data?.message || 'Failed to update role. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Select Your Role
          </h1>
          <p className="text-lg text-gray-600">
            Choose the role that best describes your primary function on our platform.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {roles.map((role) => (
              <motion.div
                key={role.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-6 border-2 rounded-lg cursor-pointer transition-colors ${
                  selectedRole === role.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 bg-white'
                }`}
                onClick={() => handleRoleSelect(role.id)}
              >
                <div className="flex items-start">
                  <div className="text-3xl mr-4">{role.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {role.title}
                    </h3>
                    <p className="text-sm text-gray-600">{role.description}</p>
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedRole === role.id
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedRole === role.id && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!selectedRole || isSubmitting}
              className={`px-8 py-3 rounded-md text-white font-medium ${
                selectedRole && !isSubmitting
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              } transition-colors`}
            >
              {isSubmitting ? 'Saving...' : 'Continue to Dashboard'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleSelectionPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Authentication check
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Welcome to Your Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h3 className="text-xl font-semibold mb-4">Your Articles</h3>
              <div className="space-y-4">
                <p className="text-gray-600">Manage your submitted articles and track their progress.</p>
                <button
                  onClick={() => navigate('/submission-portal')}
                  className="w-full bg-[#103b55] text-white py-2 px-4 rounded hover:bg-[#1f5f43] transition"
                >
                  Submit New Article
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h3 className="text-xl font-semibold mb-4">Notifications</h3>
              <div className="space-y-4">
                <p className="text-gray-600">Check your latest notifications and updates.</p>
                <button
                  onClick={() => navigate('/notifications')}
                  className="w-full bg-[#103b55] text-white py-2 px-4 rounded hover:bg-[#1f5f43] transition"
                >
                  View Notifications
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h3 className="text-xl font-semibold mb-4">Profile</h3>
              <div className="space-y-4">
                <p className="text-gray-600">Update your profile information and settings.</p>
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full bg-[#103b55] text-white py-2 px-4 rounded hover:bg-[#1f5f43] transition"
                >
                  Edit Profile
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

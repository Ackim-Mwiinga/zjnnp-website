import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Unauthorized() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="text-center">
          <div className="text-4xl font-bold text-red-500 mb-4">
            403
          </div>
          <h1 className="text-2xl font-bold mb-4">Unauthorized Access</h1>
          <p className="text-gray-600 mb-6">
            You do not have permission to access this page.
          </p>
          <button
            onClick={handleBackToHome}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}

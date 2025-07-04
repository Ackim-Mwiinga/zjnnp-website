import React, { useState, useEffect } from 'react';
import { API } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const ReviewQueue = () => {
  const { user } = useAuth();
  const [manuscripts, setManuscripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchManuscripts();
  }, []);

  const fetchManuscripts = async () => {
    try {
      const response = await API.get('/manuscripts/review-queue');
      setManuscripts(response.data.manuscripts);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch review queue');
      setLoading(false);
    }
  };

  const handleReview = async (manuscriptId) => {
    try {
      await API.post(`/manuscripts/${manuscriptId}/start-review`);
      fetchManuscripts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to start review');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading review queue...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-4 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold text-red-600">Error</h2>
          <p className="text-red-500">{error}</p>
          <button
            onClick={fetchManuscripts}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Review Queue</h1>
            <div className="flex space-x-4">
              <button
                onClick={fetchManuscripts}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Refresh
              </button>
            </div>
          </div>

          {manuscripts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No manuscripts available for review at this time.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {manuscripts.map((manuscript) => (
                <div
                  key={manuscript._id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <h3 className="text-lg font-medium text-gray-900">
                    {manuscript.title}
                  </h3>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Submitted by: {manuscript.author.fullName}</p>
                    <p>Submitted on: {new Date(manuscript.createdAt).toLocaleDateString()}</p>
                    <p>Keywords: {manuscript.keywords.join(', ')}</p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleReview(manuscript._id)}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Start Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewQueue;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

function EditorDashboard() {
  useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [reviewers, setReviewers] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [selectedReviewer, setSelectedReviewer] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [submissionsRes, reviewersRes] = await Promise.all([
          axios.get('/api/editor/submissions', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }),
          axios.get('/api/editor/reviewers', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
        ]);
        setSubmissions(submissionsRes.data);
        setReviewers(reviewersRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAssignReviewer = async () => {
    try {
      await axios.post('/api/editor/assign-reviewer', {
        submissionId: selectedSubmission._id,
        reviewerId: selectedReviewer
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      // Refresh submissions list
      const response = await axios.get('/api/editor/submissions', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSubmissions(response.data);
      setSelectedSubmission(null);
      setSelectedReviewer('');
    } catch (error) {
      console.error('Error assigning reviewer:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <motion.div initial="hidden" animate="show" variants={fadeInUp}>
        <h1 className="text-3xl font-bold mb-6">Editor Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Pending Submissions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {submissions.map((submission) => (
                  <tr key={submission._id} className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {submission.manuscriptDetails.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {submission.authorInfo.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        submission.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                        submission.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                        submission.status === 'reviewed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {submission.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedSubmission(submission)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Assign Reviewer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedSubmission && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Assign Reviewer</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Manuscript Details</h3>
                <div className="mt-2">
                  <p className="text-gray-600">Title: {selectedSubmission.manuscriptDetails.title}</p>
                  <p className="text-gray-600">Type: {selectedSubmission.manuscriptDetails.manuscriptType}</p>
                  <p className="text-gray-600">Keywords: {selectedSubmission.manuscriptDetails.keywords.join(', ')}</p>
                </div>
              </div>

              <div>
                <label htmlFor="reviewer" className="block text-sm font-medium text-gray-700">
                  Select Reviewer
                </label>
                <select
                  id="reviewer"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  value={selectedReviewer}
                  onChange={(e) => setSelectedReviewer(e.target.value)}
                  required
                >
                  <option value="">Select a reviewer</option>
                  {reviewers.map((reviewer) => (
                    <option key={reviewer._id} value={reviewer._id}>
                      {reviewer.fullName} - {reviewer.areasOfExpertise}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <button
                  onClick={handleAssignReviewer}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Assign Reviewer
                </button>
                <button
                  onClick={() => {
                    setSelectedSubmission(null);
                    setSelectedReviewer('');
                  }}
                  className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default EditorDashboard;

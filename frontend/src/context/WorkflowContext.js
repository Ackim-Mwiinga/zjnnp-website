import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const WorkflowContext = createContext(null);

export const WorkflowProvider = ({ children }) => {
  const [submissionStates] = useState({});
  const [userRoles, setUserRoles] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [reviewAssignments, setReviewAssignments] = useState({});
  const [reviewComments, setReviewComments] = useState({});

  // Workflow states
  const SUBMISSION_STATES = {
    DRAFT: 'draft',
    SUBMITTED: 'submitted',
    UNDER_REVIEW: 'under_review',
    REVIEW_COMPLETED: 'review_completed',
    REVISION_REQUIRED: 'revision_required',
    ACCEPTED: 'accepted',
    REJECTED: 'rejected',
    PUBLISHED: 'published'
  };

  // Review states
  const REVIEW_STATES = {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    REJECTED: 'rejected'
  };

  // Review recommendations
  const REVIEW_RECOMMENDATIONS = {
    ACCEPT: 'accept',
    MINOR_REVISION: 'minor_revision',
    MAJOR_REVISION: 'major_revision',
    REJECT: 'reject'
  };

  // User roles
  const USER_ROLES = {
    USER: 'user',
    REVIEWER: 'reviewer',
    EDITOR: 'editor',
    ADMIN: 'admin'
  };

  // Initialize user roles and review assignments
  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const response = await axios.get('/api/user/roles');
        setUserRoles(response.data.roles);
      } catch (error) {
        console.error('Failed to fetch user roles:', error);
      }
    };

    const fetchReviewAssignments = async () => {
      try {
        const response = await axios.get('/api/reviews/assignments');
        setReviewAssignments(response.data.assignments);
      } catch (error) {
        console.error('Failed to fetch review assignments:', error);
      }
    };

    fetchUserRoles();
    fetchReviewAssignments();
  }, []);

  // Submission actions
  const submitArticle = async (articleData) => {
    try {
      const response = await axios.post('/api/submissions', {
        ...articleData,
        status: SUBMISSION_STATES.SUBMITTED
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to submit article');
    }
  };

  // Review workflow actions
  const assignReviewers = async (submissionId, reviewerIds) => {
    try {
      await axios.post(`/api/reviews/assign`, {
        submissionId,
        reviewerIds
      });
      return true;
    } catch (error) {
      throw new Error('Failed to assign reviewers');
    }
  };

  const submitReview = async (reviewData) => {
    try {
      const response = await axios.post('/api/reviews/submit', {
        ...reviewData,
        status: REVIEW_STATES.COMPLETED
      });
      setReviewComments(prev => ({
        ...prev,
        [reviewData.submissionId]: {
          ...prev[reviewData.submissionId],
          [reviewData.reviewerId]: response.data.review
        }
      }));
      return response.data;
    } catch (error) {
      throw new Error('Failed to submit review');
    }
  };

  const updateReviewStatus = async (reviewId, newStatus) => {
    try {
      await axios.put(`/api/reviews/${reviewId}/status`, { status: newStatus });
      return true;
    } catch (error) {
      throw new Error('Failed to update review status');
    }
  };

  const updateSubmissionStatus = async (submissionId, newStatus) => {
    try {
      await axios.put(`/api/submissions/${submissionId}/status`, { status: newStatus });
      return true;
    } catch (error) {
      throw new Error('Failed to update submission status');
    }
  };

  const addNotification = (notification) => {
    setNotifications(prev => [...prev, notification]);
  };

  const getSubmissionReviews = (submissionId) => {
    return reviewComments[submissionId] || {};
  };

  const getReviewersForSubmission = (submissionId) => {
    return Object.keys(reviewAssignments)
      .filter(key => reviewAssignments[key].submissionId === submissionId)
      .map(key => reviewAssignments[key].reviewerId);
  };

  const value = {
    SUBMISSION_STATES,
    REVIEW_STATES,
    REVIEW_RECOMMENDATIONS,
    USER_ROLES,
    submissionStates,
    userRoles,
    notifications,
    reviewAssignments,
    reviewComments,
    submitArticle,
    assignReviewers,
    submitReview,
    updateReviewStatus,
    updateSubmissionStatus,
    addNotification,
    getSubmissionReviews,
    getReviewersForSubmission
  };

  return (
    <WorkflowContext.Provider value={value}>
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (context === undefined) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};

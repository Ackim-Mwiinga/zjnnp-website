const Notification = require('../models/Notification');
const User = require('../models/User');

const createNotification = async (recipientId, type, message, data = {}) => {
  const notification = new Notification({
    recipient: recipientId,
    type,
    message,
    data
  });

  await notification.save();
  return notification;
};

const getNotifications = async (userId, limit = 20) => {
  return Notification.find({ recipient: userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('data.articleId', 'title')
    .populate('data.reviewId', 'comments')
    .populate('data.submissionId', 'title');
};

const markAsRead = async (notificationId, userId) => {
  const notification = await Notification.findById(notificationId);
  
  if (!notification || notification.recipient.toString() !== userId.toString()) {
    throw new Error('Notification not found or unauthorized');
  }

  notification.read = true;
  await notification.save();
  return notification;
};

const sendArticleSubmittedNotification = async (article, author) => {
  const editors = await User.find({ role: 'editor' });
  
  await Promise.all(editors.map(editor =>
    createNotification(editor._id, 'article-submitted', 
      `New article submitted: ${article.title}`,
      { articleId: article._id }
    )
  ));
};

const sendReviewAssignedNotification = async (review, article) => {
  await createNotification(review.reviewer, 'review-assigned',
    `You have been assigned to review: ${article.title}`,
    { articleId: article._id, reviewId: review._id }
  );
};

module.exports = {
  createNotification,
  getNotifications,
  markAsRead,
  sendArticleSubmittedNotification,
  sendReviewAssignedNotification
};

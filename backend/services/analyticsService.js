const Article = require('../models/Article');
const Review = require('../models/Review');
const User = require('../models/User');
const UserActivity = require('../models/UserActivity');

const getDashboardStats = async () => {
  const [totalArticles, pendingReviews, activeUsers, avgReviewTime] = await Promise.all([
    Article.countDocuments(),
    Review.countDocuments({ status: 'pending' }),
    User.countDocuments({ lastLogin: { $gt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }),
    Review.aggregate([
      {
        $match: {
          status: 'completed',
          completedAt: { $exists: true }
        }
      },
      {
        $project: {
          reviewTime: {
            $divide: [
              {
                $subtract: ["$completedAt", "$createdAt"]
              },
              86400000 // Convert to days
            ]
          }
        }
      },
      {
        $group: {
          _id: null,
          avgReviewTime: { $avg: "$reviewTime" }
        }
      }
    ])
  ]);

  return {
    totalArticles,
    pendingReviews,
    activeUsers,
    avgReviewTime: avgReviewTime[0]?.avgReviewTime || 0
  };
};

const getArticleStats = async () => {
  const stats = await Article.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        status: '$_id',
        count: 1,
        _id: 0
      }
    }
  ]);

  return stats;
};

const getUserActivity = async (userId, limit = 10) => {
  return UserActivity.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('user', 'email name')
    .populate('metadata.articleId', 'title')
    .populate('metadata.reviewId', 'comments')
    .populate('metadata.submissionId', 'title');
};

module.exports = {
  getDashboardStats,
  getArticleStats,
  getUserActivity
};

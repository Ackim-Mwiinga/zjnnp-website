import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Chart from 'react-apexcharts';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const AnalyticsDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalArticles: 0,
    pendingReviews: 0,
    activeUsers: 0,
    avgReviewTime: 0
  });
  const [articleStats, setArticleStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('/api/analytics/dashboard', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setStats(response.data.stats);
      setArticleStats(response.data.articleStats);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const articleStatusChart = {
    series: [
      {
        name: 'Articles',
        data: articleStats.map(stat => stat.count)
      }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: articleStats.map(stat => stat.status)
      }
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
        <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Articles</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalArticles}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Pending Reviews</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.pendingReviews}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Active Users</h3>
            <p className="text-3xl font-bold text-green-600">{stats.activeUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Avg Review Time</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.avgReviewTime} days</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Article Status Distribution</h2>
          <Chart options={articleStatusChart.options} series={articleStatusChart.series} type="bar" height={350} />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="space-y-4">
              {/* Activity feed will be populated here */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">New Article Submission</h3>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                  New
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;

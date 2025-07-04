import React from 'react';
import { motion } from 'framer-motion';
import { FaPodcast, FaBook, FaUsers, FaNewspaper, FaBrain } from 'react-icons/fa';


const channels = [
  {
    id: 1,
    title: 'Quarterly Journal',
    icon: <FaBook className="text-4xl" />,
    description: 'Peer-reviewed research articles and reviews',
    status: 'Available',
    cta: {
      text: 'View Latest Issue',
      link: '/issues'
    }
  },
  {
    id: 2,
    title: 'Picture Prognosis',
    icon: <FaBrain className="text-4xl" />,
    description: 'Case highlights and clinical insights',
    status: 'Available',
    cta: {
      text: 'Submit a Case',
      link: '/submit-case'
    }
  },
  {
    id: 3,
    title: 'Peer Review Workshops',
    icon: <FaUsers className="text-4xl" />,
    description: 'Training and certification programs',
    status: 'Coming Soon',
    cta: {
      text: 'Join Waitlist',
      link: '/workshops'
    }
  },
  {
    id: 4,
    title: 'Podcast',
    icon: <FaPodcast className="text-4xl" />,
    description: 'Expert interviews and discussions',
    status: 'Coming Soon',
    cta: {
      text: 'Subscribe',
      link: '/podcast'
    }
  },
  {
    id: 5,
    title: 'Community Blog',
    icon: <FaNewspaper className="text-4xl" />,
    description: 'Latest news and updates',
    status: 'Available',
    cta: {
      text: 'Read Blog',
      link: '/blog'
    }
  },
];

const Channels = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-[#103b55] mb-4">
          Our Channels
        </h1>
        <p className="text-xl text-gray-600">
          Stay connected with ZJNNP through our publishing and engagement channels — designed to amplify African neuroscience and mental health voices.
        </p>
      </motion.div>

      {/* Channels Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {channels.map((channel) => (
          <motion.div
            key={channel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: channel.id * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-[#103b55]/10 rounded-full">
                {channel.icon}
              </div>
              <h2 className="text-2xl font-bold text-[#103b55] mb-2">
                {channel.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {channel.description}
              </p>
              <div className={`px-4 py-2 rounded-full text-sm ${
                channel.status === 'Available'
                  ? 'bg-[#1f5f43]/10 text-[#1f5f43]'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {channel.status}
              </div>
              <a
                href={channel.cta.link}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#1f5f43] text-white font-semibold hover:bg-[#103b55] transition-colors duration-300"
              >
                {channel.cta.text}
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Channels;

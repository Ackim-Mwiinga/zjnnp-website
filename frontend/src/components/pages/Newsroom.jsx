import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaNewspaper, FaUser } from 'react-icons/fa';


const newsItems = [
  {
    id: 1,
    title: 'Call for Papers: Special Issue on Neurological Emergencies',
    date: 'June 2025',
    author: 'Editorial Team',
    category: 'Announcement',
    content: 'We are pleased to announce a special issue focusing on neurological emergencies in sub-Saharan Africa. Submit your research by September 1, 2025.',
  },
  {
    id: 2,
    title: 'New Peer Review Workshop Announced',
    date: 'May 2025',
    author: 'Editorial Board',
    category: 'Events',
    content: 'Join our upcoming peer review training workshop scheduled for August 2025. Limited seats available.',
  },
  {
    id: 3,
    title: 'Q2 2025 Issue Now Available',
    date: 'May 2025',
    author: 'Editorial Team',
    category: 'Issue Release',
    content: 'The latest issue of ZJNNP is now available online. Featured articles include...',
  },
  {
    id: 4,
    title: 'Editorial Board Expansion',
    date: 'April 2025',
    author: 'Editorial Team',
    category: 'Milestone',
    content: 'We welcome three new members to our editorial board, bringing expertise in...',
  },
];

const Newsroom = () => {
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
          Newsroom
        </h1>
        <p className="text-xl text-gray-600">
          Discover announcements, editorial notes, and highlights from the African neuroscience community. Stay informed with calls for papers, issue releases, and events.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-[#1f5f43]/10 text-[#1f5f43] rounded-full text-sm">
            All
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm">
            Announcements
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm">
            Events
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm">
            Issue Releases
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm">
            Milestones
          </button>
        </div>
      </div>

      {/* News Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {newsItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: item.id * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-[#103b55]/10 rounded-full">
                <FaNewspaper className="text-4xl text-[#103b55]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#103b55]">
                  {item.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                  <div className="flex items-center gap-2">
                    <FaCalendar />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUser />
                    <span>{item.author}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              {item.content}
            </p>
            <div className="px-4 py-2 bg-[#1f5f43]/10 text-[#1f5f43] rounded-full text-sm">
              {item.category}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Submit News */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-[#f8fafc] p-8 rounded-xl mt-12"
      >
        <h2 className="text-2xl font-bold text-[#103b55] mb-6">
          Submit News
        </h2>
        <p className="text-gray-600 mb-6">
          Have a story to share? We welcome submissions from authors, researchers, and healthcare professionals.
        </p>
        <a
          href="/submit-news"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#1f5f43] text-white font-semibold hover:bg-[#103b55] transition-colors duration-300"
        >
          Submit Your Story
        </a>
      </motion.div>
    </div>
  );
};

export default Newsroom;

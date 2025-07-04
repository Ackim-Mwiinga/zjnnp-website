import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaBook, FaClock, FaUsers } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-[#103b55] mb-4">
              About ZJNNP
            </h1>
            <p className="text-xl text-gray-600">
              The Zambia Journal of Neurosurgery, Neurology and Psychiatry (ZJNNP) is a peer-reviewed, open-access journal committed to publishing high-quality research relevant to Africa's neurological and mental health landscape.
            </p>
          </div>
          <div className="flex-1">
            <div className="bg-[#1f5f43] p-8 rounded-xl text-white">
              <h2 className="text-2xl font-bold mb-4">
                Our Mission
              </h2>
              <p>
                To advance neurological sciences and mental health care across sub-Saharan Africa through rigorous academic research and practical clinical insights.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Key Info Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-[#103b55]/10 rounded-full">
              <FaBrain className="text-4xl text-[#103b55]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#103b55]">Quarterly Publication</h3>
              <p className="text-gray-600">Issued every three months</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-[#103b55]/10 rounded-full">
              <FaBook className="text-4xl text-[#103b55]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#103b55]">Open Access</h3>
              <p className="text-gray-600">Free to read and share</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-[#103b55]/10 rounded-full">
              <FaUsers className="text-4xl text-[#103b55]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#103b55]">Peer-Reviewed</h3>
              <p className="text-gray-600">Expert validation</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-[#103b55] mb-6">
          Journal History
        </h2>
        <div className="relative">
          <div className="absolute left-1/2 w-px h-full bg-gray-200" />
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <div className="w-1/2">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1f5f43] flex items-center justify-center">
                    <FaClock className="text-white" />
                  </div>
                  <span className="font-semibold text-[#1f5f43]">2025</span>
                </div>
              </div>
              <div className="w-1/2">
                <h3 className="font-semibold text-[#103b55] mb-2">
                  Launch Year
                </h3>
                <p className="text-gray-600">
                  First issue published, focusing on advancing neurological sciences across Africa
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-[#f8fafc] p-8 rounded-xl"
      >
        <h2 className="text-2xl font-bold text-[#103b55] mb-6">
          Contact Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-[#103b55] mb-2">Maina Soko Medical Center</h3>
            <p className="text-gray-600">
              Ash Rd, Lusaka<br />
              PO Box 10101
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[#103b55] mb-2">Contact</h3>
            <p className="text-gray-600">
              Email: info@zjnnp.com<br />
              Phone: +260 774081218
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;

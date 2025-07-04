import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaBook, FaUsers, FaGlobeAfrica, FaCheck } from 'react-icons/fa';

const AboutSection = () => {
  return (
    <section className="py-12 sm:py-24 bg-[#f8fafc]">
      {/* About ZJNNP */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16"
      >
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4 sm:mb-6">
              <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-[#1f5f43] flex items-center justify-center">
                <FaBrain className="text-3xl sm:text-4xl text-white" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#103b55]">About ZJNNP</h2>
                <p className="text-lg sm:text-xl text-gray-600">Advancing neurological sciences across Africa</p>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <p className="text-sm sm:text-base text-gray-600">Founded in 2025 • Quarterly publication</p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <FaGlobeAfrica className="text-[#1f5f43] w-4 h-4 sm:w-5 sm:h-5" />
                  <span>15+ Countries</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBook className="text-[#1f5f43] w-4 h-4 sm:w-5 sm:h-5" />
                  <span>500+ Articles</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              A peer-reviewed, open-access quarterly journal dedicated to advancing neurological and mental-health research across sub-Saharan Africa.
            </p>
            <a 
              href="/about-us"
              className="mt-3 sm:mt-4 inline-flex items-center px-4 sm:px-6 py-2 rounded-lg bg-[#1f5f43] text-white hover:bg-[#103b55] transition-colors duration-300"
            >
              Read More
            </a>
          </div>
        </div>
      </motion.div>

      {/* Aims & Mission Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 mb-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Aims Card */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#1f5f43]/20 flex items-center justify-center">
                <FaCheck className="text-3xl text-[#1f5f43]" />
              </div>
              <h3 className="text-2xl font-bold text-[#103b55]">Aims</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-[#1f5f43]/10 flex items-center justify-center">
                  <FaCheck className="text-[#1f5f43]" />
                </div>
                <p className="text-gray-600">Advancing neurological sciences in sub-Saharan Africa</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-[#1f5f43]/10 flex items-center justify-center">
                  <FaCheck className="text-[#1f5f43]" />
                </div>
                <p className="text-gray-600">Original research, case reports, review articles</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-[#1f5f43]/10 flex items-center justify-center">
                  <FaCheck className="text-[#1f5f43]" />
                </div>
                <p className="text-gray-600">Focus on neurosurgery, neurology, psychiatry</p>
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#1f5f43]/20 flex items-center justify-center">
                <FaUsers className="text-3xl text-[#1f5f43]" />
              </div>
              <h3 className="text-2xl font-bold text-[#103b55]">Mission</h3>
            </div>
            <p className="text-gray-600">
              ZJNNP fosters academic exchange, promotes clinical excellence, and stimulates research innovation in neurological and mental health disciplines.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Featured Issue */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 relative h-64 md:h-80 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1f5f43] to-[#103b55] opacity-30" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Q2 2025 Issue</h3>
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-[#103b55] mb-2">Featured Issue</h3>
                <p className="text-gray-600">Explore our latest research on neurological disorders and mental health in sub-Saharan Africa.</p>
              </div>
              <a 
                href="/issues"
                className="inline-flex items-center px-6 py-2 rounded-lg bg-[#1f5f43] text-white hover:bg-[#103b55] transition-colors duration-300"
              >
                View Issue
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;

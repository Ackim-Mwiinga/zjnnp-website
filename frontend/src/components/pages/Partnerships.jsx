import React from 'react';
import { motion } from 'framer-motion';
import { FaUniversity, FaHospital, FaBook, FaBrain, FaUsers } from 'react-icons/fa';


const partnershipTypes = [
  {
    id: 1,
    title: 'Academic Partners',
    icon: <FaUniversity className="text-4xl" />,
    description: 'Collaborations with universities and research institutions',
  },
  {
    id: 2,
    title: 'Medical Partners',
    icon: <FaHospital className="text-4xl" />,
    description: 'Partnerships with hospitals and healthcare organizations',
  },
  {
    id: 3,
    title: 'Research Partners',
    icon: <FaBook className="text-4xl" />,
    description: 'Collaborations on research projects and initiatives',
  },
  {
    id: 4,
    title: 'Editorial Partners',
    icon: <FaBrain className="text-4xl" />,
    description: 'Joint editorial boards and review processes',
  },
  {
    id: 5,
    title: 'Community Partners',
    icon: <FaUsers className="text-4xl" />,
    description: 'Engagement with professional societies and organizations',
  },
];

const currentPartners = [
  {
    id: 1,
    name: 'University of Zambia',
    type: 'Academic',
  },
  {
    id: 2,
    name: 'Maina Soko Medical Center',
    type: 'Medical',
  },
  {
    id: 3,
    name: 'Zambia Medical Association',
    type: 'Community',
  },
];

const Partnerships = () => {
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
          Our Partnerships
        </h1>
        <p className="text-xl text-gray-600">
          ZJNNP partners with academic institutions, hospitals, NGOs, and medical societies to promote collaborative research and advance neurological care in Africa.
        </p>
      </motion.div>

      {/* Partnership Types */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
      >
        {partnershipTypes.map((type) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: type.id * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-[#103b55]/10 rounded-full">
                {type.icon}
              </div>
              <h2 className="text-2xl font-bold text-[#103b55] mb-2">
                {type.title}
              </h2>
              <p className="text-gray-600">
                {type.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Current Partners */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-[#103b55] mb-6">
          Current Partners
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPartners.map((partner) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: partner.id * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <h3 className="text-xl font-bold text-[#103b55]">
                  {partner.name}
                </h3>
                <span className="px-4 py-2 bg-[#1f5f43]/10 text-[#1f5f43] rounded-full text-sm">
                  {partner.type} Partner
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Become a Partner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-[#f8fafc] p-8 rounded-xl"
      >
        <h2 className="text-2xl font-bold text-[#103b55] mb-6">
          Become a Partner
        </h2>
        <p className="text-gray-600 mb-6">
          Interested in partnering with ZJNNP? We welcome collaborations that advance neurological sciences and mental health care in Africa.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#1f5f43] text-white font-semibold hover:bg-[#103b55] transition-colors duration-300"
        >
          Contact Us
        </a>
      </motion.div>
    </div>
  );
};

export default Partnerships;

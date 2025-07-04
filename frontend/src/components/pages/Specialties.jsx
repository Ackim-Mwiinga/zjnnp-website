import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaChild, FaHospital, FaMicroscope, FaShieldAlt, FaGlobeAfrica } from 'react-icons/fa';


const specialties = [
  {
    id: 1,
    title: 'Neurology',
    icon: <FaBrain className="text-4xl" />,
    description: 'Clinical and research aspects of neurological disorders in sub-Saharan Africa',
    tags: ['Clinical', 'Research', 'African Context'],
  },
  {
    id: 2,
    title: 'Psychiatry',
    icon: <FaHospital className="text-4xl" />,
    description: 'Mental health care and research with African cultural considerations',
    tags: ['Clinical', 'Cultural', 'Research'],
  },
  {
    id: 3,
    title: 'Neurosurgery',
    icon: <FaMicroscope className="text-4xl" />,
    description: 'Advanced surgical techniques and outcomes in neurosurgical care',
    tags: ['Surgical', 'Technical', 'Innovation'],
  },
  {
    id: 4,
    title: 'Pediatric Neurosciences',
    icon: <FaChild className="text-4xl" />,
    description: 'Child and adolescent neurological development and disorders',
    tags: ['Pediatric', 'Developmental', 'Clinical'],
  },
  {
    id: 5,
    title: 'Neurocritical Care',
    icon: <FaShieldAlt className="text-4xl" />,
    description: 'Intensive care management of neurological emergencies',
    tags: ['Critical Care', 'Emergency', 'Technical'],
  },
  {
    id: 6,
    title: 'Neuroimaging',
    icon: <FaGlobeAfrica className="text-4xl" />,
    description: 'Imaging techniques and applications in neurological diagnosis',
    tags: ['Technical', 'Diagnostic', 'Research'],
  },
];

const Specialties = () => {
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
          Our Specialties
        </h1>
        <p className="text-xl text-gray-600">
          Explore the core neurological and mental health specialties ZJNNP covers. From neurosurgery to neuroethics, we showcase research that reflects the unique challenges and innovations of sub-Saharan Africa.
        </p>
      </motion.div>

      {/* Filter Bar */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-[#1f5f43]/10 text-[#1f5f43] rounded-full text-sm">
            All
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm">
            Clinical
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm">
            Research
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm">
            Technical
          </button>
        </div>
      </div>

      {/* Specialties Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {specialties.map((specialty) => (
          <motion.div
            key={specialty.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: specialty.id * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-[#103b55]/10 rounded-full">
                {specialty.icon}
              </div>
              <h2 className="text-2xl font-bold text-[#103b55] mb-2">
                {specialty.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {specialty.description}
              </p>
              <div className="flex gap-2">
                {specialty.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#1f5f43]/10 text-[#1f5f43] rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Specialties;

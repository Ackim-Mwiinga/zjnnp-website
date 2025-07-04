import React from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaClipboardCheck, FaFileDownload, FaBook, FaPen } from 'react-icons/fa';


const resources = [
  {
    id: 1,
    title: 'Author Guidelines',
    icon: <FaFileAlt className="text-4xl" />,
    description: 'Detailed submission requirements and formatting standards',
    files: [
      { name: 'Manuscript Template', format: 'docx' },
      { name: 'Author Checklist', format: 'pdf' },
    ],
  },
  {
    id: 2,
    title: 'Peer Review Training',
    icon: <FaClipboardCheck className="text-4xl" />,
    description: 'Comprehensive guide for effective peer review',
    files: [
      { name: 'Review Guidelines', format: 'pdf' },
      { name: 'Training Slides', format: 'pptx' },
    ],
  },
  {
    id: 3,
    title: 'Reporting Standards',
    icon: <FaBook className="text-4xl" />,
    description: 'CARE, PRISMA, and other reporting guidelines',
    files: [
      { name: 'CARE Checklist', format: 'pdf' },
      { name: 'PRISMA Flowchart', format: 'png' },
    ],
  },
  {
    id: 4,
    title: 'Templates & Forms',
    icon: <FaPen className="text-4xl" />,
    description: 'Downloadable templates for various submission types',
    files: [
      { name: 'Case Report Template', format: 'docx' },
      { name: 'Review Article Template', format: 'docx' },
    ],
  },
];

const Resources = () => {
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
          Resources
        </h1>
        <p className="text-xl text-gray-600">
          Access author tools, editorial standards, and reference guides to support your publication journey. Whether you're submitting a manuscript or preparing to review, our resources are designed to guide you every step of the way.
        </p>
      </motion.div>

      {/* Resources Accordion */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        {resources.map((resource) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: resource.id * 0.1 }}
            className="bg-white rounded-xl shadow-lg"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-[#103b55]/10 rounded-full">
                  {resource.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#103b55]">
                    {resource.title}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    {resource.description}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resource.files.map((file) => (
                  <a key={file.name} href={`/resources/${resource.title.toLowerCase().replace(/\s+/g, '-')}/${file.name}.${file.format}`} download className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className="p-3 bg-[#1f5f43]/10 rounded-full">
                      <FaFileDownload className="text-[#1f5f43]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#103b55]">{file.name}</h3>
                      <p className="text-gray-600">.{file.format}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Resources;

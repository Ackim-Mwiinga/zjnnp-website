import React from 'react';
import { motion } from 'framer-motion';

import { FaBook, FaBrain, FaUsers } from 'react-icons/fa';
import Hero from './Hero';
import AboutSection from './AboutSection';

const MainContent = () => {
  const comingSoonSections = [
    {
      title: 'Top Articles',
      icon: () => <FaBook className="text-4xl text-[#103b55]" />,
      description: 'Stay updated with the latest research in neurosciences.',
      action: {
        text: 'Notify Me When Available',
        onClick: () => {
          // TODO: Implement newsletter subscription
          alert('Newsletter subscription coming soon!');
        }
      }
    },
    {
      title: 'Picture Prognosis',
      icon: () => <FaBrain className="text-4xl text-[#103b55]" />,
      description: 'Share your medical cases and learn from others.',
      action: {
        text: 'Submit a Case',
        onClick: () => {
          // TODO: Implement case submission
          alert('Case submission coming soon!');
        }
      }
    },
    {
      title: 'Peer Review Workshop',
      icon: () => <FaUsers className="text-4xl text-[#103b55]" />,
      description: 'Join our upcoming peer review training program.',
      action: {
        text: 'Join the Waitlist',
        onClick: () => {
          // TODO: Implement waitlist
          alert('Waitlist coming soon!');
        }
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <Hero />

      {/* Coming Soon Section */}
      <section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {comingSoonSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-[#103b55]/10 rounded-full">
                  {section.icon()}
                </div>
                <h2 className="text-2xl font-bold text-[#103b55] mb-2">{section.title}</h2>
                <p className="text-gray-600 mb-4">{section.description}</p>
                <div className="bg-[#1f5f43]/10 rounded-full px-4 py-1.5 text-sm text-[#1f5f43] mb-4">
                  Coming Soon
                </div>
                <button
                  onClick={section.action.onClick}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#1f5f43] text-white font-semibold hover:bg-[#103b55] transition-colors duration-300"
                >
                  {section.action.text}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <AboutSection />


    </div>
  );
};

export default MainContent;

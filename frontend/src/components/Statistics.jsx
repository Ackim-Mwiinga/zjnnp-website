import React from 'react';
import { motion } from 'framer-motion';
import { faChartLine, faBookMedical, faBrain } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Statistics = () => {
  const stats = [
    {
      icon: faChartLine,
      number: '500+',
      title: 'Articles',
      description: 'Latest research and insights'
    },
    {
      icon: faBookMedical,
      number: '15+',
      title: 'Countries',
      description: 'Global research network'
    },
    {
      icon: faBrain,
      number: '25+',
      title: 'Specialties',
      description: 'Focused research areas'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm p-8 transform hover:scale-[1.02] transition-all duration-300 border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1f5f43]/10 to-[#103b55]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#1f5f43]/20 flex items-center justify-center mb-6">
                  <FontAwesomeIcon icon={stat.icon} className="text-4xl text-[#1f5f43]" />
                </div>
                <h3 className="text-3xl font-bold mb-2 text-[#103b55]">{stat.number}</h3>
                <p className="text-[#1f5f43]">{stat.title}</p>
                <p className="text-sm text-gray-600 mt-2">{stat.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;

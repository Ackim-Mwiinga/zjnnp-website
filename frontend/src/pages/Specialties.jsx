import React from 'react';
import { Link } from 'react-router-dom';
import { FaBrain, FaHeart, FaBalanceScale, FaMicroscope } from 'react-icons/fa';

const Specialties = () => {
  const specialties = [
    {
      title: "Neurosurgery",
      description: "Advanced surgical procedures for neurological conditions",
      icon: <FaBrain className="text-4xl" />
    },
    {
      title: "Neurology",
      description: "Diagnosis and treatment of neurological disorders",
      icon: <FaMicroscope className="text-4xl" />
    },
    {
      title: "Psychiatry",
      description: "Mental health and behavioral disorders",
      icon: <FaHeart className="text-4xl" />
    },
    {
      title: "Neuroethics",
      description: "Ethical considerations in neurological practice",
      icon: <FaBalanceScale className="text-4xl" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f9ff] to-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#103b55] mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#1f5f43] to-[#103b55]">
            Specialties
          </h1>
          <p className="text-xl text-[#1f5f43] max-w-2xl mx-auto">
            Explore our specialized areas of research and practice, dedicated to advancing neurological and mental health sciences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specialties.map((specialty, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-lg p-8 text-center group hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div className="text-[#1f5f43] mb-6">
                <div className="w-16 h-16 rounded-full bg-[#1f5f43]/10 flex items-center justify-center mx-auto">
                  {specialty.icon}
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-[#103b55] mb-3 group-hover:text-[#1f5f43] transition-colors">
                {specialty.title}
              </h3>
              <p className="text-gray-600 text-lg group-hover:text-[#1f5f43] transition-colors">
                {specialty.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center">
          <Link 
            to="/submit-article" 
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[#1f5f43] to-[#103b55] text-white font-semibold text-lg hover:from-[#103b55] hover:to-[#1f5f43] transition-all duration-300 transform hover:scale-[1.02]"
          >
            Submit Research
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Specialties;

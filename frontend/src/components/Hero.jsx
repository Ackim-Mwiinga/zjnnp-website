import React from 'react';
import { motion } from 'framer-motion';


const Hero = () => {
  return (
    <section className="relative text-white text-center h-[60vh] sm:h-[80vh] mt-16 sm:mt-24">
      <div className="absolute inset-0 bg-black">
        <img 
          src="/images/placeholder.gif" 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#1f5f43]/20 to-[#103b55]/20 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1f5f43]/10 to-[#103b55]/10 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1f5f43]/5 to-[#103b55]/5 mix-blend-overlay" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col items-center justify-center h-full space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 text-white">
            Advancing Neurological Research
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed">
            Discover cutting-edge research and insights in neuroscience and mental health, connecting global experts and advancing knowledge
          </p>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;

import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-[#0B2D4A] flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center"
      >
        {/* Loading Spinner */}
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        
        {/* Optional: Add your logo here */}
        {/* <img 
          src="/logo.png" 
          alt="ZJNNP Logo" 
          className="w-24 h-24 mt-4"
        /> */}

        {/* Loading Text */}
        <div className="mt-4 text-white text-lg font-semibold">
          Loading ZJNNP Journal...
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;

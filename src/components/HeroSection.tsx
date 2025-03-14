
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <motion.div 
      className="w-full flex flex-col items-center justify-center py-12 md:py-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.div 
        className="w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-indigo-800 flex items-center justify-center shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
      >
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="text-blue-800 dark:text-blue-200"
        >
          <path 
            d="M20 12V17C20 18.8856 20 19.8284 19.4142 20.4142C18.8284 21 17.8856 21 16 21H8C6.11438 21 5.17157 21 4.58579 20.4142C4 19.8284 4 18.8856 4 17V12M12 3L12 15M12 3L16 7M12 3L8 7" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      
      <motion.span 
        className="text-sm uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        Automation Tool
      </motion.span>
      
      <motion.h1 
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center max-w-3xl mb-4 text-gray-900 dark:text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        Extract JustDial Leads
      </motion.h1>
      
      <motion.p 
        className="text-base md:text-lg text-center max-w-2xl text-gray-600 dark:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        Easily extract business leads from JustDial. Enter a category and location to get started.
        We'll handle the extraction and deliver the results in a clean Excel file.
      </motion.p>
    </motion.div>
  );
};

export default HeroSection;


import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import LeadExtractor from '@/components/LeadExtractor';

const Index = () => {
  useEffect(() => {
    // Apply smooth scrolling behavior to the document
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <motion.div 
      className="min-h-screen w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <LeadExtractor />
    </motion.div>
  );
};

export default Index;

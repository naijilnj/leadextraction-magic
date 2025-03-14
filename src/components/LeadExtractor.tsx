
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import HeroSection from './HeroSection';
import SearchForm from './SearchForm';
import ResultsDisplay from './ResultsDisplay';
import AnimatedBackground from './AnimatedBackground';
import { Lead, extractLeads, exportToExcel } from '@/utils/extractorService';

const LeadExtractor: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchParams, setSearchParams] = useState<{ category: string; location: string } | null>(null);
  const { toast } = useToast();

  const handleSearch = async (category: string, location: string) => {
    setIsLoading(true);
    try {
      const extractedLeads = await extractLeads(category, location);
      setLeads(extractedLeads);
      setSearchParams({ category, location });
      
      toast({
        title: 'Leads Extracted',
        description: `Found ${extractedLeads.length} leads for ${category} in ${location}`,
      });
    } catch (error) {
      console.error('Error extracting leads:', error);
      toast({
        title: 'Extraction Failed',
        description: 'There was an error extracting leads. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    if (!leads.length || !searchParams) return;
    
    try {
      const fileName = exportToExcel(leads, searchParams.category, searchParams.location);
      
      toast({
        title: 'Export Successful',
        description: `Exported ${leads.length} leads to ${fileName}`,
      });
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      toast({
        title: 'Export Failed',
        description: 'There was an error exporting to Excel. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleClear = () => {
    setLeads([]);
    setSearchParams(null);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-8 px-4">
      <AnimatedBackground />
      
      <motion.div 
        className="w-full max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <HeroSection />
        
        <SearchForm 
          onSubmit={handleSearch} 
          isLoading={isLoading} 
        />
        
        <ResultsDisplay 
          leads={leads} 
          isLoading={isLoading} 
          onExport={handleExport}
          onClear={handleClear}
        />
        
        <motion.div 
          className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <p>
            This tool is for demonstration purposes only. In a production environment,
            web scraping would be implemented with proper API integration.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LeadExtractor;


import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, RefreshCw, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SearchFormProps {
  onSubmit: (category: string, location: string) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit, isLoading }) => {
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category.trim() || !location.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please enter both a category and location',
        variant: 'destructive',
      });
      return;
    }
    onSubmit(category, location);
  };

  return (
    <motion.div 
      className="w-full max-w-xl mx-auto mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.3 }}
    >
      <div className="glass-card p-6 md:p-8">
        <div className="mb-4 flex items-start bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
          <Info size={18} className="text-amber-600 dark:text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
          <div className="text-sm text-amber-700 dark:text-amber-300">
            <p className="font-medium">Backend Required for Real Scraping</p>
            <p className="mt-1">
              Real JustDial data extraction requires a Node.js backend with Puppeteer. 
              This demo will show simulated data.
            </p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label htmlFor="category" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Business Category
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Search size={18} />
              </span>
              <input
                id="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Restaurants, Plumbers, Doctors"
                className="w-full pl-10 pr-4 py-3 rounded-lg input-glass focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-gray-900 dark:text-white placeholder:text-gray-500"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="location" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Location
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <MapPin size={18} />
              </span>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Mumbai, Delhi, Bangalore"
                className="w-full pl-10 pr-4 py-3 rounded-lg input-glass focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-gray-900 dark:text-white placeholder:text-gray-500"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span className="flex items-center justify-center">
              {isLoading ? (
                <>
                  <RefreshCw size={18} className="mr-2 animate-spin" />
                  Simulating...
                </>
              ) : (
                'Show Sample Leads'
              )}
            </span>
          </button>
          
          <AnimatePresence>
            {isLoading && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-center text-gray-600 dark:text-gray-300"
              >
                Generating sample leads for demonstration purposes...
              </motion.p>
            )}
          </AnimatePresence>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2"
          >
            <p>
              Note: Real JustDial extraction would require a backend with Puppeteer as shown in the reference code.
            </p>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="link" size="sm" className="text-xs underline text-blue-500 dark:text-blue-400 mt-1 h-auto p-0">
                  Why can't we scrape directly?
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs text-xs">
                <p>
                  JustDial uses advanced anti-scraping techniques that require server-side tools like Puppeteer to bypass.
                  Browser security restrictions prevent running Puppeteer in client-side JavaScript.
                </p>
              </TooltipContent>
            </Tooltip>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default SearchForm;

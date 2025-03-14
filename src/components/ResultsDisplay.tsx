
import React from 'react';
import { FileSpreadsheet, Download, RefreshCw, Trash2, Phone, Mail, Globe, MapPin, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Lead, standardizePhoneNumber } from '@/utils/extractorService';
import { Badge } from '@/components/ui/badge';

interface ResultsDisplayProps {
  leads: Lead[];
  isLoading: boolean;
  onExport: () => void;
  onClear: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  leads, 
  isLoading, 
  onExport,
  onClear
}) => {
  if (isLoading) {
    return (
      <motion.div 
        className="w-full max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass-card p-8 min-h-[200px] flex flex-col items-center justify-center">
          <RefreshCw size={36} className="text-blue-500 dark:text-blue-400 animate-spin mb-4" />
          <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
            Extracting leads...
          </p>
        </div>
      </motion.div>
    );
  }

  if (!leads.length) return null;

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-card p-6 md:p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FileSpreadsheet size={20} className="text-green-600 dark:text-green-500 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {leads.length} Leads Found
            </h3>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onClear}
              className="border-gray-300 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600 dark:hover:text-red-400 transition-all"
            >
              <Trash2 size={16} className="mr-1" /> Clear
            </Button>
            <Button 
              onClick={onExport}
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white transition-all"
            >
              <Download size={16} className="mr-1" /> Export
            </Button>
          </div>
        </div>
        
        <div className="bg-white/50 dark:bg-black/50 rounded-lg border border-gray-200 dark:border-gray-800 mb-4">
          <ScrollArea className="h-[500px] rounded-md">
            <div className="p-4">
              <AnimatePresence>
                {leads.map((lead, index) => (
                  <motion.div 
                    key={index}
                    className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-lg text-gray-900 dark:text-white">{lead.name}</h3>
                      {lead.rating && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Star size={12} className="text-yellow-500 fill-yellow-500" />
                          {lead.rating}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                      <div className="flex items-center text-gray-700 dark:text-gray-300">
                        <Phone size={16} className="mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <span className="font-medium">{standardizePhoneNumber(lead.phone)}</span>
                      </div>
                      
                      <div className="flex items-start text-gray-700 dark:text-gray-300">
                        <MapPin size={16} className="mr-2 text-red-500 dark:text-red-400 flex-shrink-0 mt-1" />
                        <span>{lead.address}</span>
                      </div>
                      
                      {lead.email && (
                        <div className="flex items-center text-gray-700 dark:text-gray-300">
                          <Mail size={16} className="mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                          <span className="truncate">{lead.email}</span>
                        </div>
                      )}
                      
                      {lead.website && (
                        <div className="flex items-center text-gray-700 dark:text-gray-300">
                          <Globe size={16} className="mr-2 text-green-600 dark:text-green-400 flex-shrink-0" />
                          <a 
                            href={lead.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="truncate text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            {lead.website.replace(/(^\w+:|^)\/\//, '')}
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          Click the Export button to download these leads as an Excel file.
        </p>
      </div>
    </motion.div>
  );
};

export default ResultsDisplay;

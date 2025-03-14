
import React from 'react';
import { FileSpreadsheet, Download, RefreshCw, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Lead } from '@/utils/extractorService';

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
      className="w-full max-w-2xl mx-auto"
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
          <ScrollArea className="h-[400px] rounded-md">
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-2 px-4 text-gray-600 dark:text-gray-400 text-sm font-medium">Name</th>
                    <th className="text-left py-2 px-4 text-gray-600 dark:text-gray-400 text-sm font-medium">Phone</th>
                    <th className="text-left py-2 px-4 text-gray-600 dark:text-gray-400 text-sm font-medium">Address</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {leads.map((lead, index) => (
                      <motion.tr 
                        key={index}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <td className="py-3 px-4 text-gray-900 dark:text-gray-200 font-medium">{lead.name}</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{lead.phone}</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300 truncate max-w-[200px]">
                          {lead.address}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
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

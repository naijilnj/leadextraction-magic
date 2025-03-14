
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ className }) => {
  return (
    <div 
      className={cn(
        "fixed inset-0 -z-10 overflow-hidden opacity-30", 
        className
      )}
    >
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-indigo-900 opacity-60 blur-3xl animate-float"></div>
        <div className="absolute top-1/3 -right-20 h-[400px] w-[600px] rounded-full bg-gradient-to-bl from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-900 opacity-60 blur-3xl animate-float" style={{animationDelay: "-2s"}}></div>
        <div className="absolute -bottom-40 left-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-900 opacity-60 blur-3xl animate-float" style={{animationDelay: "-4s"}}></div>
      </div>
    </div>
  );
};

export default AnimatedBackground;


import React from 'react';

interface SkyYearProps {
  year: string;
}

const SkyYear: React.FC<SkyYearProps> = ({ year }) => {
  return (
    <div className="absolute top-8 left-0 right-0 z-10 flex justify-center pointer-events-none overflow-hidden select-none">
      <div className="relative">
        {/* Large ethereal year display */}
        <h1 className="text-[15rem] md:text-[25rem] font-bold text-white/[0.03] leading-none tracking-tighter transition-all duration-1000 transform">
          {year}
        </h1>
        
        {/* Glowing secondary layer */}
        <h1 className="absolute top-0 left-0 text-[15rem] md:text-[25rem] font-bold text-white/[0.02] leading-none tracking-tighter blur-3xl">
          {year}
        </h1>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center space-x-24 opacity-20">
            <div className="w-1 h-1 bg-white rounded-full animate-ping delay-100" />
            <div className="w-1 h-1 bg-white rounded-full animate-ping delay-500" />
            <div className="w-1 h-1 bg-white rounded-full animate-ping delay-1000" />
        </div>
      </div>
    </div>
  );
};

export default SkyYear;

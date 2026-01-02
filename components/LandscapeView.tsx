
import React, { useState, useEffect } from 'react';
import { LandscapeInfo } from '../types';

interface LandscapeViewProps {
  date: Date;
  info: LandscapeInfo | null;
  loading: boolean;
  isWeekend: boolean;
}

const LandscapeView: React.FC<LandscapeViewProps> = ({ date, info, loading, isWeekend }) => {
  const [fallbackUrl, setFallbackUrl] = useState<string>('');
  
  useEffect(() => {
    // Generate a consistent but distinct seed for each day as a fallback
    const daySeed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
    setFallbackUrl(`https://picsum.photos/seed/${daySeed}/1600/1200?blur=1`);
  }, [date]);

  const activeImageUrl = info?.imageUrl || fallbackUrl;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform scale-100"
        style={{ backgroundImage: `url(${activeImageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 to-transparent md:block hidden" />
      </div>

      {/* Landscape Content */}
      <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16 pointer-events-none">
        <div className={`transition-all duration-700 max-w-2xl ${loading || !info ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          {isWeekend && (
            <div className="mb-4">
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-emerald-500/30">
                Weekend Sanctuary
              </span>
            </div>
          )}
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight drop-shadow-2xl">
            {info?.title || "Exploring the Horizon"}
          </h2>
          <p className="text-lg md:text-xl text-slate-200/90 font-light leading-relaxed max-w-xl backdrop-blur-sm bg-black/10 p-4 rounded-2xl border border-white/5">
            {info?.description || "Wait while the celestial mists reveal today's vista..."}
          </p>
        </div>
      </div>
      
      {/* Loading Shimmer */}
      {loading && (
        <div className="absolute inset-0 z-10 bg-slate-950/40 backdrop-blur-md flex items-center justify-center">
          <div className="flex flex-col items-center">
             <div className="w-16 h-16 border-t-2 border-r-2 border-indigo-500 rounded-full animate-spin mb-4" />
             <p className="text-indigo-300 font-serif italic text-xl animate-pulse text-center">
               Dreaming of landscapes...<br/>
               <span className="text-sm font-sans not-italic text-indigo-400 opacity-80">Generating AI imagery</span>
             </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandscapeView;

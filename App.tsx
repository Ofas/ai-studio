
import React, { useState, useEffect, useCallback } from 'react';
import { format, isWeekend, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon, Cloud, Wind, ChevronLeft, ChevronRight } from 'lucide-react';
import CalendarSidebar from './components/CalendarSidebar';
import LandscapeView from './components/LandscapeView';
import SkyYear from './components/SkyYear';
import { getLandscapeDescription, generateLandscapeImage } from './services/geminiService';
import { LandscapeInfo } from './types';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [landscapeInfo, setLandscapeInfo] = useState<LandscapeInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const updateLandscape = useCallback(async (date: Date) => {
    setLoading(true);
    setLandscapeInfo(null); // Reset for new loading state
    
    // Step 1: Get the poetic description
    const info = await getLandscapeDescription(date, isWeekend(date));
    
    // Step 2: Generate the matching image
    const imageUrl = await generateLandscapeImage(info, date);
    
    setLandscapeInfo({
      ...info,
      imageUrl: imageUrl
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    updateLandscape(selectedDate);
  }, [selectedDate, updateLandscape]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handlePrevMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    setCurrentMonth(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    setCurrentMonth(next);
  };

  return (
    <div className="relative h-screen w-screen bg-slate-950 overflow-hidden flex flex-col md:flex-row text-slate-100 selection:bg-indigo-500/30">
      {/* Background Layer: The Sky & Landscapes */}
      <div className="flex-1 relative order-2 md:order-1 h-[60vh] md:h-full">
        <SkyYear year={selectedDate.getFullYear().toString()} />
        <LandscapeView 
          date={selectedDate} 
          info={landscapeInfo} 
          loading={loading}
          isWeekend={isWeekend(selectedDate)}
        />
        
        {/* Date Selector Banner (Bottom/Daily) */}
        <div className="absolute bottom-4 left-4 right-4 md:left-8 md:bottom-8 z-20 pointer-events-none">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl max-w-lg pointer-events-auto shadow-2xl">
            <div className="flex items-baseline space-x-3 mb-1">
               <span className="text-4xl md:text-5xl font-serif italic text-white">{format(selectedDate, 'dd')}</span>
               <span className="text-xl md:text-2xl font-light text-slate-300">{format(selectedDate, 'MMMM')}</span>
            </div>
            <p className="text-slate-400 font-medium uppercase tracking-widest text-xs flex items-center">
              <CalendarIcon size={12} className="mr-2" />
              Selected Journey
            </p>
          </div>
        </div>
      </div>

      {/* Sidebar Layer: Calendar Application */}
      <div className="w-full md:w-[400px] lg:w-[450px] bg-slate-900/40 backdrop-blur-2xl border-l border-white/5 order-1 md:order-2 flex flex-col h-[40vh] md:h-full z-30">
        <div className="p-6 md:p-8 flex flex-col h-full overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-serif tracking-tight">Celestial Calendar</h1>
            <div className="flex space-x-2">
              <button 
                onClick={handlePrevMonth}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={handleNextMonth}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <CalendarSidebar 
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />

          <div className="mt-auto pt-8 border-t border-white/10">
            <div className="flex items-center space-x-3 text-slate-400 text-sm">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <Cloud size={16} className="text-indigo-400" />
              </div>
              <p>The year follows your gaze in the sky above.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;


import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameDay, isSameMonth, isWeekend } from 'date-fns';

interface CalendarSidebarProps {
  currentMonth: Date;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({ currentMonth, selectedDate, onDateSelect }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex-1">
      <div className="mb-4 text-center">
        <h2 className="text-lg font-medium text-slate-300">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
      </div>
      
      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-tighter py-2">
            {day}
          </div>
        ))}
        {days.map((day, idx) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isSelected = isSameDay(day, selectedDate);
          const isDayWeekend = isWeekend(day);

          return (
            <button
              key={idx}
              onClick={() => onDateSelect(day)}
              className={`
                relative h-12 md:h-14 flex flex-col items-center justify-center rounded-xl transition-all duration-300
                ${isCurrentMonth ? 'text-slate-100' : 'text-slate-600'}
                ${isSelected ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'hover:bg-white/5'}
                ${!isSelected && isDayWeekend ? 'ring-1 ring-emerald-500/30' : ''}
              `}
            >
              <span className="text-sm md:text-base font-medium">{format(day, 'd')}</span>
              {isDayWeekend && !isSelected && (
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" title="Weekend Lake" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarSidebar;

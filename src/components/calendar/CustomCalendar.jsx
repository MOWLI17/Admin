import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Plus } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const CustomCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const startDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const events = [
    { day: 15, title: 'Team Sync', time: '10:00 AM', type: 'meeting' },
    { day: 15, title: 'Code Review', time: '2:00 PM', type: 'code' },
    { day: 18, title: 'Sprint Review', time: '4:00 PM', type: 'meeting' },
    { day: 22, title: 'Design Handoff', time: '1:00 PM', type: 'design' },
  ];

  return (
    <div className="flex flex-col gap-6 h-full rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-indigo-500" />
          <h3 className="text-xl font-bold">{monthName} {year}</h3>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setCurrentDate(new Date(year, currentDate.getMonth() - 1))} className="p-2 rounded-xl transition-colors hover:bg-slate-800">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={() => setCurrentDate(new Date(year, currentDate.getMonth() + 1))} className="p-2 rounded-xl transition-colors hover:bg-slate-800">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="py-2 text-center text-xs font-bold uppercase tracking-widest text-slate-500">
            {day}
          </div>
        ))}

        {[...Array(startDayOfMonth)].map((_, i) => <div key={`empty-${i}`}></div>)}

        {[...Array(daysInMonth(currentDate.getMonth(), year))].map((_, i) => {
          const dayNum = i + 1;
          const hasEvents = events.filter(e => e.day === dayNum);
          const isSelected = selectedDay === dayNum;

          return (
            <Motion.div
              key={dayNum}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedDay(dayNum)}
              className={`group relative flex h-24 flex-col rounded-2xl border p-2 transition-all cursor-pointer shadow-xl shadow-slate-900/10
                ${isSelected 
                  ? 'border-indigo-500 bg-indigo-500/10' 
                  : 'border-slate-800 bg-slate-900 hover:border-slate-600'}`}
            >
              <span className={`text-sm font-bold ${isSelected ? 'text-indigo-400' : 'text-slate-400 group-hover:text-white'}`}>
                {dayNum}
              </span>
              
              <div className="mt-1 flex flex-col gap-1 overflow-hidden">
                {hasEvents.map((event, idx) => (
                  <div key={idx} className={`h-1.5 w-1.5 rounded-full ${event.type === 'meeting' ? 'bg-indigo-500' : event.type === 'design' ? 'bg-purple-500' : 'bg-emerald-500'}`}></div>
                ))}
              </div>

              {isSelected && (
                <div className="mt-auto flex justify-center text-[10px] text-indigo-400 font-bold uppercase tracking-widest">
                  Active
                </div>
              )}
            </Motion.div>
          );
        })}
      </div>

      {/* Events Sidebar */}
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-slate-300">Today's Schedule</h4>
          <button className="flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500">
            <Plus className="h-3.5 w-3.5" />
            Add Event
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {events.filter(e => e.day === selectedDay).map((event, i) => (
              <Motion.div
                key={i}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/30 p-4 transition-all hover:bg-slate-900/60"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${event.type === 'meeting' ? 'bg-indigo-500' : 'bg-emerald-500'}`}></div>
                  <div>
                    <div className="font-bold text-sm tracking-tight">{event.title}</div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                      <Clock className="h-3 w-3" />
                      {event.time}
                    </div>
                  </div>
                </div>
                <button className="text-[10px] font-bold uppercase tracking-wider text-slate-500 transition-colors hover:text-white">Edit</button>
              </Motion.div>
            ))}
          </AnimatePresence>
          {events.filter(e => e.day === selectedDay).length === 0 && (
            <div className="text-center py-6 text-sm text-slate-500">Empty day. Time to focus!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;

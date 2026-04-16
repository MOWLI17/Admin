import React from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarPage = () => {
  const timeSlots = Array.from({ length: 11 }, (_, i) => `${i + 12 === 12 ? 12 : i}:00 AM`);
  const days = [
    { name: 'Sun', date: 12 },
    { name: 'Mon', date: 13 },
    { name: 'Tue', date: 14 },
    { name: 'Wed', date: 15 },
    { name: 'Thu', date: 16 },
    { name: 'Fri', date: 17 },
    { name: 'Sat', date: 18 }
  ];

  return (
    <div className="flex h-full lg:h-[calc(100vh-64px)] w-full flex-col lg:flex-row gap-8 bg-[#f8fafc] p-4 md:p-8">
      {/* Left Sidebar Menu */}
      <div className="flex w-full lg:w-64 flex-col gap-6">
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#003366] py-3 text-sm font-bold text-white shadow-xl shadow-blue-900/40 transition-all hover:bg-[#002244] hover:scale-[1.02]">
          <Plus className="h-5 w-5" />
          Create Event
        </button>

        <div className="hidden lg:flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex h-32 items-center justify-center rounded-2xl bg-[#f1f5f9] text-xs font-bold uppercase tracking-widest text-[#94a3b8]">
            [Mini Calendar View]
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#64748b]">My Calendars</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Personal', color: 'bg-[#1e40af]' },
                { label: 'CMOS Tech', color: 'bg-[#fbbf24]' },
                { label: 'Holidays', color: 'bg-[#ef4444]' }
              ].map((cal) => (
                <div key={cal.label} className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-md ${cal.color}`}></div>
                  <span className="text-sm font-bold text-[#475569]">{cal.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Calendar View */}
      <div className="flex-1 overflow-hidden rounded-[32px] md:rounded-[40px] border border-[#e2e8f0] bg-white p-4 md:p-8 shadow-sm">
        {/* Calendar Header */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <h2 className="text-xl md:text-2xl font-black text-[#1e293b]">Calendar</h2>
            <button className="rounded-xl bg-[#f1f5f9] px-3 py-1 text-xs font-bold text-[#475569] hover:bg-[#e2e8f0]">Today</button>
            <div className="flex gap-1">
              <button className="p-1.5 rounded-lg text-[#94a3b8] hover:bg-[#f1f5f9] hover:text-[#1e293b]"><ChevronLeft className="h-5 w-5" /></button>
              <button className="p-1.5 rounded-lg text-[#94a3b8] hover:bg-[#f1f5f9] hover:text-[#1e293b]"><ChevronRight className="h-5 w-5" /></button>
            </div>
            <h3 className="ml-0 sm:ml-4 text-lg md:text-xl font-black text-[#1e293b]">April 2026</h3>
          </div>

          <div className="flex gap-1 rounded-2xl bg-[#f1f5f9] p-1 w-full sm:w-auto overflow-x-auto">
            {['Month', 'Week', 'Day', 'Agenda'].map((view) => (
              <button
                key={view}
                className={`flex-1 sm:flex-none rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  view === 'Week' ? 'bg-white text-[#1e293b] shadow-sm' : 'text-[#64748b] hover:text-[#1e293b]'
                }`}
              >
                {view}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Container */}
        <div className="flex flex-col h-full overflow-x-auto scrollbar-hide">
          <div className="min-w-[800px]">
            {/* Calendar Day Headers */}
            <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-[#f1f5f9] pb-4">
              <div className=""></div>
              {days.map((day) => (
                <div key={day.date} className="flex flex-col items-center gap-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#94a3b8]">{day.date} {day.name}</span>
                </div>
              ))}
            </div>

            {/* Time & Day Grid */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 w-[80px] border-r border-[#f1f5f9]"></div>
              
              {timeSlots.map((time, i) => {
                const events = [
                  { dayIdx: 1, timeIdx: 2, title: 'Team Sync', color: 'bg-blue-500' },
                  { dayIdx: 4, timeIdx: 1, title: 'Inspect Concrete', color: 'bg-[#fbbf24]' },
                  { dayIdx: 3, timeIdx: 5, title: 'Safety Audit', color: 'bg-emerald-500' },
                  { dayIdx: 5, timeIdx: 4, title: 'Client Review', color: 'bg-purple-500' },
                  { dayIdx: 2, timeIdx: 8, title: 'Procurement', color: 'bg-rose-500' },
                ];

                return (
                  <div key={time} className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-[#f1f5f9] h-20">
                    <div className="flex justify-center pt-2 text-xs font-bold text-[#94a3b8]">{time}</div>
                    {[...Array(7)].map((_, j) => {
                      const event = events.find(e => e.dayIdx === j && e.timeIdx === i);
                      return (
                        <div key={j} className="border-r border-[#f1f5f9] last:border-0 relative">
                          {event && (
                            <div className={`absolute inset-x-1 top-2 rounded-xl ${event.color} p-2 md:p-3 shadow-lg shadow-black/10`}>
                              <p className="text-[10px] font-black uppercase text-white leading-tight truncate">{event.title}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;

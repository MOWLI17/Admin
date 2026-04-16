import React from 'react';
import { Map as MapIcon, User, Navigation } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { useDashboard } from '../../hooks/useDashboard';

const LiveMap = () => {
  const { users } = useDashboard();

  return (
    <div className="relative h-[440px] w-full overflow-hidden rounded-[40px] border border-[#e2e8f0] bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1e40af]/10 text-[#1e40af]">
            <MapIcon className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-black tracking-tight text-[#1e293b]">Workforce Map</h3>
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-[#94a3b8]">
          <span className="flex h-2 w-2 animate-pulse rounded-full bg-[#10b981]"></span>
          Live Stream
        </div>
      </div>

      <div className="relative h-full w-full rounded-[32px] border border-[#f1f5f9] bg-[#f8fafc] overflow-hidden shadow-inner font-mono">
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-8 border-[#e2e8f0] opacity-30">
          {[...Array(8)].map((_, i) => <div key={i} className="border-r border-[#e2e8f0]"></div>)}
        </div>
        <div className="absolute inset-0 grid grid-rows-8 opacity-30">
          {[...Array(8)].map((_, i) => <div key={i} className="border-b border-[#e2e8f0]"></div>)}
        </div>

        {users.map((user) => (
          <Motion.div
            key={user.id}
            initial={false}
            animate={{ left: `${user.location.x}%`, top: `${user.location.y}%` }}
            transition={{ type: 'spring', damping: 15, stiffness: 60 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className="group relative">
              {/* User Avatar with refined border */}
              <div className="relative h-12 w-12 overflow-hidden rounded-2xl border-2 border-white bg-white shadow-xl shadow-[#1e40af]/20 transition-all group-hover:scale-110">
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              </div>
              
              {/* Ping Ring */}
              <Motion.div
                animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl border-2 border-[#1e40af]"
              ></Motion.div>

              {/* Enhanced Tooltip */}
              <div className="absolute top-14 left-1/2 -translate-x-1/2 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                <div className="rounded-xl bg-[#1e293b] px-4 py-2.5 text-[11px] font-bold text-white whitespace-nowrap shadow-2xl">
                  <span className="block text-white mb-0.5">{user.name}</span>
                  <span className="text-[#94a3b8] flex items-center gap-1">
                    <Navigation className="h-3 w-3 inline" /> {user.role}
                  </span>
                  {/* Arrow */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-[#1e293b]"></div>
                </div>
              </div>
            </div>
          </Motion.div>
        ))}
      </div>
    </div>
  );
};

export default LiveMap;

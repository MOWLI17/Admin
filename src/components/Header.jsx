import React, { useEffect } from 'react';
import { Search, Bell, User, Hammer, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { logout, timeLeft } = useAuth();

  const formatCountdown = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <header className="sticky top-0 z-40 h-16 w-full border-b border-[#e2e8f0] bg-white px-4 md:px-8">
      <div className="flex h-full items-center justify-between">
        {/* Search Bar - Hidden on small mobile */}
        <div className="relative hidden flex-1 max-w-md items-center md:flex">
          <Search className="absolute left-4 h-5 w-5 text-[#94a3b8]" />
          <input
            placeholder="Search team, tasks, or files..."
            className="w-full rounded-2xl bg-[#f1f5f9] px-12 py-2.5 text-sm font-medium outline-none placeholder:text-[#94a3b8] focus:bg-white focus:ring-2 focus:ring-[#1e40af]/10"
          />
        </div>

        {/* Brand placeholder for Mobile */}
        <div className="md:hidden"></div>

        {/* Session Timer */}
        <div className="hidden xl:flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-2 ml-4">
          <div className={`h-2 w-2 rounded-full ${timeLeft < 300 ? 'bg-red-500 animate-ping' : 'bg-amber-500'}`}></div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 leading-none">Session</span>
            <span className="text-xs font-black text-white font-mono mt-0.5">
              {formatCountdown(timeLeft)}
            </span>
          </div>
        </div>

        {/* User Section */}
        <div className="flex items-center gap-2 sm:gap-6">
          <button className="hidden items-center gap-2 rounded-xl bg-[#f1f5f9] px-4 py-2 transition-all hover:bg-[#e2e8f0] sm:flex">
            <Hammer className="h-4 w-4 text-[#475569]" />
            <span className="text-sm font-bold text-[#475569]">Working</span>
            <span className="h-2 w-2 rounded-full bg-[#10b981]"></span>
          </button>
          
          <div className="relative">
            <Bell className="h-5 w-5 cursor-pointer text-[#475569] transition-colors hover:text-[#1e40af]" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 rounded-full border-2 border-white bg-[#ef4444]"></span>
          </div>

          <div className="h-8 w-[1px] bg-slate-200"></div>

          <button 
            onClick={logout}
            className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-400 transition-all hover:text-red-500 hover:border-red-100"
          >
            <LogOut className="h-4 w-4" />
          </button>

          <button className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#1e40af] text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, 
  Users, 
  HardHat, 
  MessageSquare, 
  Calendar, 
  Settings, 
  Menu,
  X
} from 'lucide-react';
import { cn } from '../utils/cn';

import logo from '../asset/logo.jpg';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutGrid },
    { name: 'Directory', path: '/directory', icon: Users },
    { name: 'Workforce', path: '/workforce', icon: HardHat },
    { name: 'Hub', path: '/messages', icon: MessageSquare },
    { name: 'Calendar', path: '/calendar', icon: Calendar },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-[60] flex h-10 w-10 items-center justify-center rounded-xl bg-[#001b3a] text-white shadow-lg transition-all hover:bg-black lg:hidden"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
        ></div>
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed left-0 top-0 z-[55] h-screen w-64 border-r border-[#001b3a] bg-[#001b3a] text-slate-400 transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col p-6">
          {/* Logo */}
          <div className="mb-10 flex items-center gap-3 py-4">
            <div className="flex h-12 w-full items-center justify-start overflow-hidden">
              <img src={logo} alt="ConnectNBuild Logo" className="h-full object-contain" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "group flex items-center gap-4 rounded-xl px-5 py-3.5 text-sm font-bold transition-all tracking-tight",
                    isActive 
                      ? "bg-[#1e40af] text-white shadow-2xl shadow-blue-900/60" 
                      : "hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-slate-500 group-hover:text-white")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer Info */}
          <div className="mt-auto px-2 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-600">
            v1.0.4-stable
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

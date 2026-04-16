import React, { useState } from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { Mail, Phone, MapPin, MoreHorizontal, Search } from 'lucide-react';

const Directory = () => {
  const { users } = useDashboard();
  const [filter, setFilter] = useState('');

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="flex flex-col gap-8 w-full mx-auto px-4 md:px-8 py-10 bg-[#f8fafc]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-black tracking-tight text-[#1e293b]">Team Directory</h1>
        <div className="relative flex w-full sm:w-64 items-center">
          <Search className="absolute left-3 h-4 w-4 text-slate-400" />
          <input 
            placeholder="Search directory..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-500 shadow-sm"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredUsers.map((user) => (
          <div key={user.id} className="group relative flex flex-col rounded-[32px] border border-[#e2e8f0] bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
            <button className="absolute right-6 top-6 text-slate-300 hover:text-slate-600 transition-colors">
              <MoreHorizontal className="h-5 w-5" />
            </button>
            
            <div className="mb-4 flex items-center gap-4">
              <img src={user.avatar} alt="" className="h-16 w-16 rounded-2xl border-4 border-[#f1f5f9] object-cover" />
              <div>
                <h3 className="text-lg font-black text-[#1e293b] truncate uppercase tracking-tighter">{user.name}</h3>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{user.role}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-slate-50">
              <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
                <Mail className="h-4 w-4" />
                <span className="truncate">{user.name.toLowerCase().replace(' ', '.')}@connectbuild.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 010-{user.id + 10}</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
                <MapPin className="h-4 w-4" />
                <span>Sector {user.id % 5 + 1}, On-Site</span>
              </div>
            </div>

            <button className="mt-6 w-full rounded-xl bg-[#f1f5f9] py-2.5 text-xs font-black uppercase text-[#1e293b] transition-all hover:bg-blue-600 hover:text-white">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Directory;

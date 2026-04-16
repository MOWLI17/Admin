import React, { useState } from 'react';
import { 
  Search, 
  MoreVertical, 
  ChevronDown, 
  Filter, 
  Download, 
  UserPlus, 
  Circle 
} from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard';

const Workforce = () => {
  const { users } = useDashboard();
  const [searchTerm, setSearchTerm] = useState('');

  const tableData = users;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Ongoing': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'On Leave': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full mx-auto px-4 md:px-8 py-10 pb-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-[#1e293b]">Workforce</h1>
          <p className="text-sm font-medium text-[#64748b] mt-1">Real-time team productivity monitoring.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-4 py-2.5 text-sm font-bold text-[#475569] shadow-sm transition-all hover:bg-[#f1f5f9]">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-[#1e40af] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-[#1d4ed8]">
            <UserPlus className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between rounded-3xl border border-[#e2e8f0] bg-white p-4 shadow-sm gap-4">
        <div className="relative flex w-full max-w-sm items-center">
          <Search className="absolute left-4 h-5 w-5 text-[#94a3b8]" />
          <input
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl bg-[#f8fafc] px-12 py-2.5 text-sm font-bold text-[#1e293b] outline-none border border-transparent focus:border-[#1e40af]/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <button className="flex items-center gap-2 text-sm font-bold text-[#64748b] hover:text-[#1e293b] whitespace-nowrap">
            <Filter className="h-4 w-4" />
            Category
            <ChevronDown className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-2 text-sm font-bold text-[#64748b] hover:text-[#1e293b] whitespace-nowrap">
            Efficiency
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-[32px] border border-[#e2e8f0] bg-white shadow-sm scrollbar-hide">
        <div className="min-w-[900px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#f1f5f9] bg-[#f8fafc]/50">
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-[#94a3b8]">Member</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-[#94a3b8]">Role</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-[#94a3b8]">Status</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-[#94a3b8]">Index</th>
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-[#94a3b8]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {tableData.map((user) => (
                <tr key={user.id} className="group hover:bg-[#f1f5f9]/40 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img src={user.avatar} alt="" className="h-10 w-10 rounded-xl border-2 border-white shadow-sm" />
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-[#1e293b]">{user.name}</span>
                        <span className="text-[10px] font-bold text-[#94a3b8]">ID-{user.id + 1000}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-[#475569]">{user.role}</td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${getStatusColor(user.status)}`}>
                      <Circle className="h-1.5 w-1.5 fill-current" />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-black text-[#1e293b]">{user.efficiency || '92%'}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <button className="rounded-xl border border-[#e2e8f0] bg-white px-3 py-1.5 text-xs font-bold transition-all hover:bg-[#e2e8f0]">View</button>
                      <button className="p-2 text-[#94a3b8] hover:text-[#1e293b]"><MoreVertical className="h-5 w-5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Workforce;

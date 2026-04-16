import React from 'react';
import { Activity, Users, Clock, Zap } from 'lucide-react';
import LiveMap from '../components/dashboard/LiveMap';
import MessagingHub from '../components/messaging/MessagingHub';
import { useDashboard } from '../hooks/useDashboard';

const Dashboard = () => {
  const { users } = useDashboard();

  const stats = [
    { title: 'Total Members', value: users.length, icon: Users, change: '+2', color: 'indigo', bg: 'bg-[#1e40af]/10', text: 'text-[#1e40af]' },
    { title: 'Active Status', value: users.filter(u => u.status === 'Active').length, icon: Activity, change: 'Stable', color: 'emerald', bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
    { title: 'Session Time', value: '142h', icon: Clock, change: '+12%', color: 'purple', bg: 'bg-purple-500/10', text: 'text-purple-500' },
    { title: 'Task Velocity', value: '92%', icon: Zap, change: '+5%', color: 'amber', bg: 'bg-amber-500/10', text: 'text-amber-500' },
  ];

  return (
    <div className="flex flex-col gap-10 w-full mx-auto px-4 md:px-8 py-10 pb-20">
      {/* Stats Grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (stat.change && (
          <div
            key={i}
            className="flex items-center justify-between rounded-[32px] border border-[#e2e8f0] bg-white p-6 shadow-sm transition-all hover:shadow-md animate-in fade-in slide-in-from-bottom-2 duration-500"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex flex-col gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#94a3b8]">{stat.title}</span>
              <div className="flex items-end gap-2 text-3xl font-black text-[#1e293b]">{stat.value}</div>
              <span className={`text-[10px] font-bold uppercase ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-[#94a3b8]'}`}>{stat.change} Today</span>
            </div>
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg} ${stat.text}`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
        )))}
      </section>

      {/* Main Grid */}
      <section className="grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <LiveMap />
          
          {/* Recent Activity Mini-List */}
          <div className="rounded-[40px] border border-[#e2e8f0] bg-white p-8 shadow-sm">
            <h3 className="mb-6 font-black tracking-tight text-[#1e293b] uppercase text-xs">Recent Activity Stream</h3>
            <div className="flex flex-col gap-6">
              {[
                { user: users[0], action: 'pushed a new map update', time: '2m ago' },
                { user: users[1], action: 'resolved 4 issues in UI components', time: '15m ago' },
                { user: users[2], action: 'deployed staging environment', time: '45m ago' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between border-b border-[#f1f5f9] pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <img src={activity.user?.avatar} alt={activity.user?.name} className="h-10 w-10 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] object-cover" />
                    <div>
                      <div className="text-sm font-bold tracking-tight text-[#1e293b] leading-tight">
                        {activity.user?.name} <span className="font-medium text-[#64748b]">{activity.action}</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-[#94a3b8] tracking-tighter">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <MessagingHub />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

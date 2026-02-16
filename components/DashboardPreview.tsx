import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { Users, Mail, DollarSign, Calendar, Search, Bell, Settings, MessageSquare, Menu as MenuIcon } from 'lucide-react';

const data = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 2000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 1890 },
  { name: 'Sat', value: 2390 },
  { name: 'Sun', value: 3490 },
];

const barData = [
  { name: 'Leads', value: 45 },
  { name: 'Calls', value: 22 },
  { name: 'Sales', value: 12 },
];

export default function DashboardPreview() {
  return (
    <section className="py-10 bg-transparent -mt-20 relative z-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-900 rounded-xl shadow-2xl shadow-black/50 border border-slate-800 overflow-hidden ring-1 ring-white/10">
          {/* Mock Window Header */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="flex-1 bg-slate-950 border border-slate-800 rounded-md px-3 py-1.5 text-xs text-slate-500 flex items-center font-mono">
              <Search className="w-3 h-3 mr-2" /> app.companyflow.com/dashboard
            </div>
          </div>

          {/* Dashboard Layout */}
          <div className="flex h-[600px] md:h-[700px] bg-slate-950">
            {/* Sidebar */}
            <div className="w-20 md:w-64 bg-slate-900 text-slate-400 flex-shrink-0 flex flex-col border-r border-slate-800">
              <div className="p-6 font-bold text-white text-xl hidden md:flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-purple-600"></div>
                Flow.
              </div>
              <div className="md:hidden p-4 flex justify-center">
                 <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-purple-600"></div>
              </div>
              
              <div className="flex-1 px-3 space-y-1 mt-4">
                <div className="flex items-center gap-3 p-3 bg-blue-500/10 text-blue-400 rounded-lg cursor-pointer border border-blue-500/20">
                  <div className="w-5 h-5"><Users /></div>
                  <span className="hidden md:inline font-medium">Dashboard</span>
                </div>
                {['Conversations', 'Calendars', 'Opportunities', 'Marketing'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 hover:bg-slate-800/50 hover:text-slate-200 rounded-lg cursor-pointer transition-colors">
                    <div className="w-5 h-5">
                        {i === 0 ? <MessageSquare /> : i === 1 ? <Calendar /> : i === 2 ? <DollarSign /> : <Mail />}
                    </div>
                    <span className="hidden md:inline">{item}</span>
                    </div>
                ))}
              </div>
              <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 p-2 hover:bg-slate-800 rounded-lg cursor-pointer">
                  <Settings className="w-5 h-5" />
                  <span className="hidden md:inline">Settings</span>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-slate-950 p-6 overflow-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white">Overview</h2>
                  <p className="text-slate-500">Welcome back, Company Admin</p>
                </div>
                <div className="flex gap-4">
                  <button className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-slate-400 hover:text-white transition-colors"><Bell className="w-5 h-5" /></button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20">New Contact</button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-400 font-medium">Total Revenue</span>
                    <span className="text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded text-xs font-bold border border-emerald-400/20">+12.5%</span>
                  </div>
                  <div className="text-3xl font-bold text-white">$124,500</div>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-400 font-medium">Active Leads</span>
                    <span className="text-blue-400 bg-blue-400/10 px-2 py-1 rounded text-xs font-bold border border-blue-400/20">+5.2%</span>
                  </div>
                  <div className="text-3xl font-bold text-white">1,204</div>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-400 font-medium">Conversion Rate</span>
                    <span className="text-slate-500 bg-slate-800 px-2 py-1 rounded text-xs font-bold">2.4%</span>
                  </div>
                  <div className="text-3xl font-bold text-white">18.2%</div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <h3 className="font-bold text-white mb-6">Revenue Growth</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <Tooltip 
                            contentStyle={{backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc'}}
                            itemStyle={{color: '#f8fafc'}}
                        />
                        <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                   <h3 className="font-bold text-white mb-6">Pipeline Health</h3>
                   <div className="h-64 w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData}>
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}}/>
                          <Tooltip 
                            cursor={{fill: 'transparent'}} 
                            contentStyle={{backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc'}}
                          />
                          <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                     </ResponsiveContainer>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
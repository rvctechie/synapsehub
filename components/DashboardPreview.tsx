import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from 'recharts';
import { Users, Mail, DollarSign, Calendar, Settings, MessageSquare, ChevronDown, Plus, Filter } from 'lucide-react';

const areaData = [
  { name: 'Mon', value: 2400 },
  { name: 'Tue', value: 1398 },
  { name: 'Wed', value: 9800 },
  { name: 'Thu', value: 3908 },
  { name: 'Fri', value: 4800 },
  { name: 'Sat', value: 3800 },
  { name: 'Sun', value: 4300 },
];

const barData = [
  { name: 'Jan', leads: 40, sales: 24 },
  { name: 'Feb', leads: 30, sales: 13 },
  { name: 'Mar', leads: 20, sales: 98 },
  { name: 'Apr', leads: 27, sales: 39 },
  { name: 'May', leads: 18, sales: 48 },
  { name: 'Jun', leads: 23, sales: 38 },
];

export default function DashboardPreview() {
  return (
    <section className="bg-transparent -mt-24 relative z-20 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-2 shadow-2xl shadow-black/80">
            <div className="bg-slate-950 rounded-lg overflow-hidden border border-slate-800">
            {/* Mock Window Header */}
            <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                </div>
                <div className="hidden md:flex bg-slate-950 border border-slate-800 rounded-md px-32 py-1.5 text-xs text-slate-500 items-center font-mono">
                    <span className="text-slate-600 mr-2">🔒</span> app.synapsehub.com
                </div>
                <div className="w-16"></div> {/* Spacer */}
            </div>

            {/* Dashboard Layout */}
            <div className="flex h-[600px] md:h-[700px] bg-slate-950">
                {/* Sidebar */}
                <div className="hidden md:flex w-64 bg-slate-950 text-slate-400 flex-shrink-0 flex-col border-r border-slate-800">
                <div className="p-5 border-b border-slate-800/50 flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">S</div>
                    <div>
                        <div className="text-sm font-semibold text-white">SynapseHub</div>
                        <div className="text-xs text-slate-500">Enterprise Plan</div>
                    </div>
                    <ChevronDown className="w-4 h-4 ml-auto text-slate-600" />
                </div>
                
                <div className="flex-1 px-3 py-6 space-y-1">
                    <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 mb-2">Main</div>
                    <div className="flex items-center gap-3 p-2 bg-blue-500/10 text-blue-400 rounded-md cursor-pointer border border-blue-500/20">
                    <div className="w-4 h-4"><Users className="w-4 h-4" /></div>
                    <span className="text-sm font-medium">Launchpad</span>
                    </div>
                    {['Dashboard', 'Conversations', 'Calendars', 'Contacts', 'Opportunities', 'Payments'].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 hover:bg-slate-900 text-slate-400 hover:text-slate-200 rounded-md cursor-pointer transition-colors group">
                            <div className="w-4 h-4 group-hover:text-blue-400 transition-colors">
                                {i === 0 ? <Users className="w-4 h-4"/> : i === 1 ? <MessageSquare className="w-4 h-4"/> : i === 2 ? <Calendar className="w-4 h-4"/> : <DollarSign className="w-4 h-4"/>}
                            </div>
                            <span className="text-sm">{item}</span>
                        </div>
                    ))}
                    <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 mt-6 mb-2">Marketing</div>
                    {['Social Planner', 'Emails', 'Templates', 'Trigger Links'].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 hover:bg-slate-900 text-slate-400 hover:text-slate-200 rounded-md cursor-pointer transition-colors">
                            <div className="w-4 h-4"><Mail className="w-4 h-4"/></div>
                            <span className="text-sm">{item}</span>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 p-2 hover:bg-slate-900 rounded-md cursor-pointer text-slate-400">
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Settings</span>
                    </div>
                </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-slate-950 p-8 overflow-auto">
                {/* Header */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Dashboard</h2>
                    <p className="text-slate-500 text-sm">Overview of your business performance.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-800 rounded-md text-slate-400 text-sm hover:text-white hover:border-slate-700 transition-all">
                            <Calendar className="w-4 h-4" /> Last 30 Days <ChevronDown className="w-3 h-3" />
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white text-sm font-medium transition-all shadow-lg shadow-blue-900/20">
                            <Plus className="w-4 h-4" /> Add Widget
                        </button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total Revenue', value: '$124,500', trend: '+12.5%', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
                        { label: 'Active Opportunities', value: '45', trend: '+5.2%', color: 'text-blue-400', bg: 'bg-blue-400/10' },
                        { label: 'Pipeline Value', value: '$34,000', trend: '-2.1%', color: 'text-rose-400', bg: 'bg-rose-400/10' },
                        { label: 'Conversion Rate', value: '18.2%', trend: '+1.4%', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-slate-900/50 p-5 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors">
                            <div className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-2">{stat.label}</div>
                            <div className="flex items-end justify-between">
                                <div className="text-2xl font-bold text-white">{stat.value}</div>
                                <div className={`text-xs font-bold px-1.5 py-0.5 rounded ${stat.bg} ${stat.color}`}>{stat.trend}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-slate-900/50 p-6 rounded-lg border border-slate-800">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold text-white text-sm">Revenue Growth</h3>
                            <Filter className="w-4 h-4 text-slate-500 cursor-pointer hover:text-slate-300" />
                        </div>
                        <div className="h-64 w-full min-w-0">
                            <ResponsiveContainer width="99%" height="100%">
                            <AreaChart data={areaData}>
                                <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} />
                                <Tooltip 
                                    contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', fontSize: '12px'}}
                                    itemStyle={{color: '#f8fafc'}}
                                />
                                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold text-white text-sm">Lead Sources</h3>
                            <Settings className="w-4 h-4 text-slate-500 cursor-pointer hover:text-slate-300" />
                        </div>
                        <div className="h-64 w-full min-w-0">
                            <ResponsiveContainer width="99%" height="100%">
                                <BarChart data={barData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} width={30} />
                                <Tooltip 
                                    cursor={{fill: '#1e293b'}} 
                                    contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', fontSize: '12px'}}
                                />
                                <Bar dataKey="sales" stackId="a" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={12} />
                                <Bar dataKey="leads" stackId="a" fill="#1e293b" radius={[4, 0, 0, 4]} barSize={12} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
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
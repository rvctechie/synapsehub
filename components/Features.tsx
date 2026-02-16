import React from 'react';
import { Mail, Calendar, PieChart, MousePointer, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: <PieChart className="w-8 h-8 text-white" />,
    title: "CRM & Pipeline Management",
    description: "Visualize your sales process. Drag and drop leads through stages and never lose track of a deal again.",
    color: "bg-blue-600"
  },
  {
    icon: <Mail className="w-8 h-8 text-white" />,
    title: "Automated Email & SMS Campaigns",
    description: "Build unlimited email campaigns and automated SMS follow-up sequences to nurture leads on autopilot.",
    color: "bg-indigo-600"
  },
  {
    icon: <MousePointer className="w-8 h-8 text-white" />,
    title: "Funnel Builder & Landing Pages",
    description: "Create high-converting landing pages and sales funnels in minutes with our intuitive drag-and-drop builder.",
    color: "bg-purple-600"
  },
  {
    icon: <Calendar className="w-8 h-8 text-white" />,
    title: "Appointment Scheduling & AI Follow-Ups",
    description: "Let leads book appointments directly into your calendar. Use AI to follow up and confirm bookings automatically.",
    color: "bg-emerald-600"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-blue-500 font-bold tracking-wide uppercase text-sm mb-2">Features</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything you need to grow</h3>
          <p className="text-lg text-slate-400">
            Stop paying for 10 different subscriptions. CompanyFlow brings your entire tech stack under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col p-6 rounded-2xl border border-slate-800 bg-slate-900 hover:border-slate-700 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 group hover:-translate-y-1">
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
              <p className="text-slate-400 leading-relaxed mb-4 flex-grow">
                {feature.description}
              </p>
              <div className="flex items-center text-blue-400 font-semibold text-sm cursor-pointer group-hover:gap-2 transition-all">
                 Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
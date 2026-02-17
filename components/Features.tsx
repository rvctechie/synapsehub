import React from 'react';
import { MessageSquare, Calendar, Star, PhoneMissed, ArrowRight, Layout, BarChart3, Smartphone } from 'lucide-react';

const features = [
  {
    icon: <MessageSquare className="w-6 h-6 text-white" />,
    title: "Unified Inbox",
    description: "Stop logging into 5 apps. Manage Facebook, Instagram, Google Chat, SMS, and Emails in one single conversation stream.",
    color: "bg-blue-600"
  },
  {
    icon: <PhoneMissed className="w-6 h-6 text-white" />,
    title: "Missed Call Text-Back",
    description: "Our system automatically texts back leads who call when you're busy, ensuring you never lose a customer to a competitor.",
    color: "bg-rose-600"
  },
  {
    icon: <Star className="w-6 h-6 text-white" />,
    title: "Reputation Management",
    description: "Automate Google Review requests. Boost your local ranking and build trust on autopilot without lifting a finger.",
    color: "bg-yellow-600"
  },
  {
    icon: <Calendar className="w-6 h-6 text-white" />,
    title: "AI Booking Calendar",
    description: "Replace Calendly. Let clients book appointments directly on your site. Automated reminders reduce no-shows by 80%.",
    color: "bg-emerald-600"
  },
  {
    icon: <Layout className="w-6 h-6 text-white" />,
    title: "Funnels & Websites",
    description: "Drag-and-drop builder for high-converting landing pages. Host courses, memberships, and client portals.",
    color: "bg-purple-600"
  },
  {
    icon: <Smartphone className="w-6 h-6 text-white" />,
    title: "Mobile App Access",
    description: "Run your business from your pocket. Reply to leads, check appointments, and send invoices on the go.",
    color: "bg-indigo-600"
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-white" />,
    title: "Pipelines & Analytics",
    description: "Visual sales pipelines help you track every opportunity. Know exactly where your money is coming from.",
    color: "bg-cyan-600"
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-white" />,
    title: "Conversation AI",
    description: "Train our AI bot to answer FAQs and book appointments for you 24/7, even while you sleep.",
    color: "bg-pink-600"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-blue-500 font-bold tracking-wide uppercase text-sm mb-2">Platform Capabilities</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">The Toolkit for Modern Business</h3>
          <p className="text-lg text-slate-400">
             We combined the functionality of 10+ separate tools into one streamlined dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700 transition-all duration-300 group hover:-translate-y-1">
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-grow">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
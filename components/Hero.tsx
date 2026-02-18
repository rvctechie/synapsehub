import React from 'react';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  onOpenChat?: () => void;
}

export default function Hero({ onOpenChat }: HeroProps) {
  return (
    <section className="relative pt-40 pb-32 lg:pt-48 lg:pb-40 overflow-hidden bg-slate-950">
      {/* Sophisticated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950/40 to-slate-950"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800/60 text-slate-300 text-xs md:text-sm font-medium mb-10 hover:border-slate-700 transition-colors cursor-pointer backdrop-blur-sm group">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-white">New Release:</span> AI Workflow Builder 2.0
          <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
        </div>
        
        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-8 leading-[1.1]">
          Automate Business. <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 animate-gradient-x">Scale Faster.</span>
        </h1>
        
        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-12 leading-relaxed font-light">
          The all-in-one platform to manage your leads, sales pipeline, and customer communication. Replace 10+ tools with one powerful dashboard.
        </p>
        
        {/* CTA Area */}
        <div className="flex justify-center items-center">
          
          {/* Enhanced Talk Now Widget - Centered & Larger */}
          <button 
            onClick={onOpenChat}
            className="relative pl-3 pr-10 py-3 bg-slate-900/80 backdrop-blur-md text-white border border-slate-700 hover:border-blue-500/50 rounded-2xl font-medium transition-all duration-300 flex items-center gap-5 group hover:bg-slate-800 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] hover:-translate-y-1"
          >
            <div className="relative">
                <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                    alt="Support Agent"
                    className="w-20 h-20 rounded-xl border-2 border-slate-600 group-hover:border-blue-400 transition-colors object-cover shadow-2xl" 
                />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-500 border-4 border-slate-900 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.6)]"></span>
            </div>
            <div className="text-left flex flex-col justify-center">
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-widest leading-none mb-2">Online Now</span>
                <span className="leading-none text-2xl group-hover:text-blue-200 transition-colors font-bold tracking-tight">Talk to Support</span>
                <span className="text-slate-400 text-sm mt-1 group-hover:text-slate-300">Wait time: &lt; 1 min</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
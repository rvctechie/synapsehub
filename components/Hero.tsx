import React from 'react';
import { ArrowRight, ChevronRight, PlayCircle } from 'lucide-react';

export default function Hero() {
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
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <button className="w-full sm:w-auto px-8 h-14 bg-white text-slate-950 rounded-lg font-bold text-base hover:bg-slate-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2">
            Start Free Trial <ArrowRight className="w-4 h-4"/>
          </button>
          
          {/* Enhanced Talk Now Widget */}
          <button className="w-full sm:w-auto h-14 pl-2 pr-6 bg-slate-900/50 backdrop-blur-sm text-white border border-slate-700 hover:border-slate-500 rounded-lg font-medium text-base transition-all flex items-center justify-start gap-3 group hover:bg-slate-800/50">
            <div className="relative">
                <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80" 
                    alt="Sales Representative"
                    className="w-10 h-10 rounded-md border border-slate-600 group-hover:border-slate-400 transition-colors object-cover" 
                />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
            </div>
            <div className="text-left flex flex-col justify-center">
                <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider leading-none mb-1">Online Now</span>
                <span className="leading-none group-hover:text-blue-200 transition-colors">Talk to Sales</span>
            </div>
          </button>
        </div>
        
        <p className="mt-8 text-sm text-slate-500 font-medium">
          No credit card required for trial • Cancel anytime • 24/7 Support
        </p>
      </div>
    </section>
  );
}
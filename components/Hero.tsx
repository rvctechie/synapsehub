import React from 'react';
import { PlayCircle, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-950">
      {/* Background Illustration/Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-600 opacity-20 blur-[100px]"></div>
        <div className="absolute right-0 top-1/2 -z-10 h-[200px] w-[200px] rounded-full bg-purple-600 opacity-20 blur-[100px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-sm font-semibold mb-8 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          New: AI-Powered Workflow Builder
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
          Automate Your Business. <br className="hidden md:block"/>
          <span className="gradient-text">Grow Faster.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
          All-in-one CRM, marketing, and sales automation for companies.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold text-lg hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2">
            Start Free Trial <ArrowRight className="w-5 h-5"/>
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white border border-slate-800 rounded-lg font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
            <PlayCircle className="w-5 h-5"/> Book a Demo
          </button>
        </div>
        
        <p className="mt-6 text-sm text-slate-500">
          No credit card required for trial • Cancel anytime • 24/7 Support
        </p>
      </div>
    </section>
  );
}
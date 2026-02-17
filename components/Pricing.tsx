import React, { useState } from 'react';
import { Check, Info, Zap } from 'lucide-react';

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-slate-950 relative">
      <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">Simple, Transparent Pricing</h2>
          <p className="text-slate-400 mb-10 text-lg font-light">
            Start with a 14-day free trial. No setup fees. No hidden costs.
          </p>
          
          <div className="flex items-center justify-center gap-4 bg-slate-900/50 backdrop-blur w-fit mx-auto p-1.5 rounded-full border border-slate-800">
            <button
              onClick={() => setAnnual(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!annual ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${annual ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              Yearly <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-400/20">SAVE 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Solopreneur Plan */}
          <div className="group border border-slate-800 rounded-2xl p-8 hover:border-slate-600 transition-all duration-300 bg-slate-900/40 flex flex-col hover:shadow-xl">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-white">Solopreneur</h3>
                <Zap className="w-5 h-5 text-slate-600 group-hover:text-yellow-400 transition-colors" />
            </div>
            <p className="text-slate-400 text-sm mb-6 h-10">Perfect for consultants, creators, and one-person armies.</p>
            <div className="mb-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">${annual ? '230' : '297'}</span>
              <span className="text-slate-500 text-sm">/mo</span>
            </div>
            <button className="w-full py-3 border border-slate-700 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors mb-8">
              Start Free Trial
            </button>
            <div className="space-y-4 flex-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Core Essentials</p>
              {[
                  'Unified Inbox (SMS, Email, Social)', 
                  'Calendar & Appointment Booking', 
                  'Missed Call Text-Back Automation', 
                  'Website & Funnel Builder', 
                  'Payments, Invoicing & Contracts'
              ].map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300 list-none">
                  <Check className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" /> {feat}
                </li>
              ))}
            </div>
          </div>

          {/* Enterpriser Plan (Highlighted) */}
          <div className="relative border border-blue-500/50 rounded-2xl p-8 shadow-2xl shadow-blue-900/10 bg-slate-900 flex flex-col z-10 scale-105 ring-1 ring-blue-500/20">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide shadow-lg uppercase">
              Most Popular
            </div>
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-white">Enterpriser</h3>
                <Zap className="w-5 h-5 text-blue-400 fill-blue-400" />
            </div>
            <p className="text-slate-400 text-sm mb-6 h-10">For growing teams and agencies needing advanced automation.</p>
            <div className="mb-6 flex items-baseline gap-1">
              <span className="text-5xl font-bold text-white tracking-tight">${annual ? '390' : '497'}</span>
              <span className="text-slate-500 text-sm">/mo</span>
            </div>
            <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all mb-8 shadow-lg shadow-blue-500/25">
              Start Free Trial
            </button>
            <div className="space-y-4 flex-1">
              <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">Everything in Solopreneur, plus:</p>
              {[
                  'Unlimited Team Members', 
                  'Advanced AI Workflow Automation', 
                  'Affiliate Management System', 
                  'Membership Course Hosting', 
                  'Smart Webhooks & API Access'
              ].map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-200 list-none">
                  <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" /> <span className="font-medium">{feat}</span>
                </li>
              ))}
            </div>
          </div>

          {/* Pro Plan */}
          <div className="group border border-slate-800 rounded-2xl p-8 hover:border-slate-600 transition-all duration-300 bg-slate-900/40 flex flex-col hover:shadow-xl">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-white">SaaS Pro</h3>
                <Zap className="w-5 h-5 text-slate-600 group-hover:text-purple-400 transition-colors" />
            </div>
            <p className="text-slate-400 text-sm mb-6 h-10">Resell the platform as your own software brand.</p>
            <div className="mb-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">${annual ? '690' : '897'}</span>
              <span className="text-slate-500 text-sm">/mo</span>
            </div>
            <button className="w-full py-3 border border-slate-700 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors mb-8">
              Start Free Trial
            </button>
            <div className="space-y-4 flex-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Everything in Enterpriser, plus:</p>
              {[
                  'White Label Desktop App', 
                  'SaaS Reseller License (Unlimited)', 
                  'Client Reporting Dashboard', 
                  'Twilio & Mailgun Re-billing', 
                  'Dedicated Success Manager'
              ].map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300 list-none">
                  <Check className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" /> {feat}
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
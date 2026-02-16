import React, { useState } from 'react';
import { Check } from 'lucide-react';

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-400 mb-8 text-lg">
            Choose the plan that fits your growth stage.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!annual ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
            <button 
              onClick={() => setAnnual(!annual)}
              className="relative w-14 h-8 bg-slate-800 rounded-full p-1 transition-colors duration-300 focus:outline-none border border-slate-700"
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${annual ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
            <span className={`text-sm font-medium ${annual ? 'text-white' : 'text-slate-500'}`}>
              Yearly <span className="text-emerald-400 text-xs font-bold bg-emerald-950 border border-emerald-900 px-2 py-0.5 rounded-full ml-1">Save 45%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter Plan */}
          <div className="border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all duration-300 relative bg-slate-900 flex flex-col">
            <h3 className="text-xl font-bold text-white mb-2">Company Starter</h3>
            <p className="text-slate-400 text-sm mb-6">For solopreneurs and small teams.</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">${annual ? '192' : '350'}</span>
              <span className="text-slate-500">/mo</span>
            </div>
            <button className="w-full py-3 border border-slate-700 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors mb-8">
              Start 14-Day Free Trial
            </button>
            <ul className="space-y-4 flex-1">
              {['All Marketing Tools', '2-Way SMS & Email', 'Pipeline Management', 'Website Builder', 'Unlimited Contacts'].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0" /> {feat}
                </li>
              ))}
            </ul>
          </div>

          {/* Unlimited Plan (Highlighted) */}
          <div className="border border-blue-600/50 rounded-2xl p-8 shadow-2xl shadow-blue-900/20 relative bg-slate-900 transform md:-translate-y-4 flex flex-col z-10 ring-1 ring-blue-500/20">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
              Most Popular
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Company Unlimited</h3>
            <p className="text-slate-400 text-sm mb-6">Everything you need to scale.</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">${annual ? '357' : '650'}</span>
              <span className="text-slate-500">/mo</span>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all mb-8 shadow-lg shadow-blue-500/25">
              Start 14-Day Free Trial
            </button>
            <ul className="space-y-4 flex-1">
              {['Everything in Starter', 'Unlimited Sub-Accounts', 'Desktop & Mobile App', 'API Access', 'Branded Client Portal', 'Priority Support'].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-200">
                  <div className="bg-blue-500/20 rounded-full p-0.5"><Check className="w-4 h-4 text-blue-400 flex-shrink-0" /></div> 
                  <span className="font-medium text-white">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all duration-300 relative bg-slate-900 flex flex-col">
            <h3 className="text-xl font-bold text-white mb-2">Pro SaaS</h3>
            <p className="text-slate-400 text-sm mb-6">Resell our platform as your own.</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">${annual ? '522' : '950'}</span>
              <span className="text-slate-500">/mo</span>
            </div>
            <button className="w-full py-3 border border-slate-700 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors mb-8">
              Start 14-Day Free Trial
            </button>
            <ul className="space-y-4 flex-1">
              {['Everything in Unlimited', 'White Label Desktop App', 'Resell at Your Price', 'Automated Client Onboarding', 'SaaS Mode Dashboard'].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0" /> {feat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
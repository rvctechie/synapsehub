import React from 'react';
import { Magnet, MessageCircle, CreditCard, ArrowRight } from 'lucide-react';

export default function MarketingEngine() {
  return (
    <section className="py-24 bg-slate-900 border-y border-slate-800 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section 1: Consolidate Tools */}
        <div className="text-center max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-16">
            We help you consolidate all of your marketing tools.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col">
               <h3 className="text-xl font-bold text-white mb-4">Do you want more customers?</h3>
               <p className="text-slate-400 leading-relaxed text-sm flex-grow">
                 With the support of our community, you will know the best strategies the most successful digital marketers are using to make a ton of money online.
               </p>
            </div>
            <div className="bg-slate-950 p-8 rounded-2xl border border-blue-600/30 hover:border-blue-500/50 transition-all relative overflow-hidden group flex flex-col shadow-lg shadow-blue-900/10">
               <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors"></div>
               <h3 className="text-xl font-bold text-white mb-4 relative z-10">Do you want to keep your clients longer?</h3>
               <p className="text-slate-400 leading-relaxed text-sm relative z-10 flex-grow">
                 With our all-in-one marketing and sales platform, you will be able to keep your tools in one place (while saving a fortune) and streamline your entire delivery process so you can focus on keeping your clients happy.
               </p>
            </div>
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col">
               <h3 className="text-xl font-bold text-white mb-4">Do you want to scale your business?</h3>
               <p className="text-slate-400 leading-relaxed text-sm flex-grow">
                 CompanyFlow will help you grow your business by connecting you with the most successful digital marketers on the planet who will be able to help you close more deals or allow you to offer more services.
               </p>
            </div>
          </div>
        </div>

        {/* Section 2: Marketing Engine */}
        <div className="mt-32 pt-16 border-t border-slate-800/50">
           <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                Building The Digital <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Marketing Engine</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                All the tools you need in one platform without having to "duct-tape" multiple platforms together!
              </p>
              
              <div className="flex flex-col items-center justify-center gap-3">
                <button className="bg-white text-blue-900 px-10 py-5 rounded-full font-bold text-xl hover:bg-blue-50 transition-all shadow-xl shadow-blue-900/20 transform hover:-translate-y-1 flex items-center gap-2">
                  Start 14 Day Free Trial <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-slate-500 text-sm font-medium">No obligations, no contracts, cancel at any time</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 relative px-4">
              {/* Connector Lines (Desktop only) */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-500/10 via-blue-500/40 to-blue-500/10 border-t border-dashed border-slate-700/50 z-0"></div>

              {/* Capture */}
              <div className="relative z-10 flex flex-col items-center text-center group">
                 <div className="w-24 h-24 rounded-full bg-slate-900 border-2 border-blue-500 flex items-center justify-center mb-6 shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform duration-300">
                    <Magnet className="w-10 h-10 text-blue-400" />
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-4">Capture</h3>
                 <p className="text-slate-400 leading-relaxed px-4">
                   Capture leads using our landing pages, surveys, forms, calendars, inbound phone system & more!
                 </p>
              </div>

              {/* Nurture */}
              <div className="relative z-10 flex flex-col items-center text-center group">
                 <div className="w-24 h-24 rounded-full bg-slate-900 border-2 border-purple-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-900/20 group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-10 h-10 text-purple-400" />
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-4">Nurture</h3>
                 <p className="text-slate-400 leading-relaxed px-4">
                   Automatically message leads via voicemail, forced calls, SMS, emails, FB Messenger & more!
                 </p>
              </div>

              {/* Close */}
              <div className="relative z-10 flex flex-col items-center text-center group">
                 <div className="w-24 h-24 rounded-full bg-slate-900 border-2 border-emerald-500 flex items-center justify-center mb-6 shadow-lg shadow-emerald-900/20 group-hover:scale-110 transition-transform duration-300">
                    <CreditCard className="w-10 h-10 text-emerald-400" />
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-4">Close</h3>
                 <p className="text-slate-400 leading-relaxed px-4">
                   Use our built in tools to collect payments, schedule appointments, and track analytics!
                 </p>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}
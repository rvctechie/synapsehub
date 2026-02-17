import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import AiFeatureDemo from './components/AiFeatureDemo';
import AiEmployees from './components/AiEmployees';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import DashboardPreview from './components/DashboardPreview';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30">
      <Navbar />
      
      <main>
        <Hero />
        
        <DashboardPreview />
        
        {/* Social Proof Strip - Professional SVG Logos */}
        <div className="bg-slate-950 border-b border-slate-900 pb-16 pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-medium text-slate-500 mb-10 uppercase tracking-widest">Powering 10,000+ Fast-Growing Companies</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
               {/* Logo 1 */}
               <svg className="h-8 w-auto text-white" viewBox="0 0 100 30" fill="currentColor">
                 <path d="M10,15 L20,5 L30,15 L20,25 Z M40,5 H50 V25 H40 Z M60,5 H90 V10 H60 Z M60,20 H90 V25 H60 Z" />
               </svg>
               {/* Logo 2 */}
               <svg className="h-7 w-auto text-white" viewBox="0 0 100 30" fill="currentColor">
                 <circle cx="15" cy="15" r="10" />
                 <rect x="35" y="5" width="60" height="20" rx="5" />
               </svg>
               {/* Logo 3 */}
               <svg className="h-9 w-auto text-white" viewBox="0 0 100 30" fill="currentColor">
                  <path d="M10,25 L20,5 L30,25 M5,25 H35" stroke="currentColor" strokeWidth="3" />
                  <rect x="45" y="10" width="10" height="10" />
                  <rect x="60" y="10" width="10" height="10" />
                  <rect x="75" y="10" width="10" height="10" />
               </svg>
               {/* Logo 4 */}
               <svg className="h-8 w-auto text-white" viewBox="0 0 100 30" fill="currentColor">
                 <path d="M10,15 Q25,5 40,15 T70,15 T100,15" stroke="currentColor" strokeWidth="4" fill="none" />
               </svg>
               {/* Logo 5 */}
               <svg className="h-6 w-auto text-white" viewBox="0 0 100 30" fill="currentColor">
                 <rect x="0" y="0" width="20" height="20" transform="rotate(45 15 15)" />
                 <text x="40" y="20" fontFamily="sans-serif" fontWeight="bold" fontSize="18">NEXUS</text>
               </svg>
            </div>
          </div>
        </div>

        <Features />

        <AiFeatureDemo />

        <AiEmployees />
        
        <Testimonials />
        
        <Pricing />

        <FAQ />
        
        {/* Call to Action - Professional Gradient */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-900/20 z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 z-10"></div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full z-0"></div>

          <div className="max-w-4xl mx-auto px-6 relative z-20 text-center">
             <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white tracking-tight">Ready to streamline your business?</h2>
             <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light">
               Join the fastest growing community of digital marketers and business owners consolidating their tech stack today.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-white text-slate-950 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors shadow-xl hover:shadow-2xl hover:shadow-blue-900/20 transform hover:-translate-y-1">
                  Start Your 14-Day Free Trial
                </button>
                <button className="px-8 py-4 rounded-lg font-bold text-lg text-white border border-slate-700 hover:bg-slate-800 transition-colors">
                  View Demo
                </button>
             </div>
             <p className="mt-8 text-sm text-slate-500 font-medium">No credit card required • Cancel anytime</p>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
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
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Social Proof Strip */}
        <div className="bg-slate-950 border-y border-slate-900 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-medium text-slate-500 mb-8 uppercase tracking-wider">Trusted by 10,000+ Companies & Business Owners</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
               <span className="text-2xl font-bold font-serif text-white">AcmeCorp</span>
               <span className="text-2xl font-bold font-mono text-white">GlobalScale</span>
               <span className="text-2xl font-bold italic text-white">NextGen</span>
               <span className="text-2xl font-bold tracking-tight text-white">Strive.io</span>
               <span className="text-2xl font-bold text-white">MarketFlow</span>
            </div>
          </div>
        </div>

        <Features />

        <AiFeatureDemo />

        <AiEmployees />
        
        <Testimonials />
        
        <Pricing />

        <FAQ />
        
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600 opacity-90 z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 z-0"></div>
          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
             <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Ready to Scale Your Company?</h2>
             <p className="text-xl text-blue-100 mb-10">Join the fastest growing community of digital marketers.</p>
             <button className="bg-white text-blue-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
               Start Free Trial
             </button>
             <p className="mt-6 text-sm text-blue-200 font-medium">No credit card required. Cancel anytime.</p>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
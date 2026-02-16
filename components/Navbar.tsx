import React, { useState, useEffect } from 'react';
import { Menu, X, BarChart2 } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md shadow-lg border-b border-slate-800 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg shadow-lg shadow-blue-500/20">
              <BarChart2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">CompanyFlow</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Features</a>
            <a href="#demo" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">AI Demo</a>
            <a href="#pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</a>
            <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Login</a>
            <button className="bg-white text-slate-950 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-all shadow-md hover:shadow-lg">
              Get Started
            </button>
          </div>

          <button className="md:hidden text-slate-300" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-b border-slate-800 shadow-xl p-4 flex flex-col gap-4">
          <a href="#features" className="text-base font-medium text-slate-300 py-2" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
          <a href="#demo" className="text-base font-medium text-slate-300 py-2" onClick={() => setIsMobileMenuOpen(false)}>AI Demo</a>
          <a href="#pricing" className="text-base font-medium text-slate-300 py-2" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
          <hr className="border-slate-800" />
          <a href="#" className="text-base font-medium text-slate-300 py-2">Login</a>
          <button className="bg-blue-600 text-white w-full py-3 rounded-lg font-semibold">Get Started</button>
        </div>
      )}
    </nav>
  );
}
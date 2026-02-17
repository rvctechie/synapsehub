import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
               <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-3d-spin">
                 <defs>
                   <linearGradient id="logoGradientFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                     <stop offset="0%" stopColor="#3b82f6" />
                     <stop offset="100%" stopColor="#8b5cf6" />
                   </linearGradient>
                 </defs>
                 <path d="M50 50 L50 15" stroke="url(#logoGradientFooter)" strokeWidth="4" strokeLinecap="round"/>
                 <path d="M50 50 L80.3 32.5" stroke="url(#logoGradientFooter)" strokeWidth="4" strokeLinecap="round"/>
                 <path d="M50 50 L80.3 67.5" stroke="url(#logoGradientFooter)" strokeWidth="4" strokeLinecap="round"/>
                 <path d="M50 50 L50 85" stroke="url(#logoGradientFooter)" strokeWidth="4" strokeLinecap="round"/>
                 <path d="M50 50 L19.7 67.5" stroke="url(#logoGradientFooter)" strokeWidth="4" strokeLinecap="round"/>
                 <path d="M50 50 L19.7 32.5" stroke="url(#logoGradientFooter)" strokeWidth="4" strokeLinecap="round"/>

                 <path d="M50 15 L80.3 32.5 L80.3 67.5 L50 85 L19.7 67.5 L19.7 32.5 Z" stroke="url(#logoGradientFooter)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>

                 <circle cx="50" cy="50" r="8" fill="url(#logoGradientFooter)" stroke="none" />
                 <circle cx="50" cy="15" r="5" fill="#020617" stroke="url(#logoGradientFooter)" strokeWidth="4" />
                 <circle cx="80.3" cy="32.5" r="5" fill="#020617" stroke="url(#logoGradientFooter)" strokeWidth="4" />
                 <circle cx="80.3" cy="67.5" r="5" fill="#020617" stroke="url(#logoGradientFooter)" strokeWidth="4" />
                 <circle cx="50" cy="85" r="5" fill="#020617" stroke="url(#logoGradientFooter)" strokeWidth="4" />
                 <circle cx="19.7" cy="67.5" r="5" fill="#020617" stroke="url(#logoGradientFooter)" strokeWidth="4" />
                 <circle cx="19.7" cy="32.5" r="5" fill="#020617" stroke="url(#logoGradientFooter)" strokeWidth="4" />
              </svg>
              <span className="text-xl font-bold text-white tracking-tight">Synapse<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Hub</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-4 text-slate-500">
              The all-in-one platform for marketing companies. Scale your business without the tech headaches.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Changelog</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Roadmap</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Status</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">GDPR</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-900 pt-8 text-sm text-center text-slate-600">
          &copy; {new Date().getFullYear()} SynapseHub Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
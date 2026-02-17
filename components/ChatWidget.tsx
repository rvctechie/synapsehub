import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 md:w-96 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-white text-sm">SynapseHub Support</h3>
              <p className="text-blue-100 text-xs flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span> We typically reply in minutes
              </p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="h-80 p-4 overflow-y-auto bg-slate-950 space-y-4">
             <div className="flex gap-3">
               <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">SH</div>
               <div className="bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-tl-none text-sm shadow-sm border border-slate-700">
                 Hi there! 👋 How can we help you scale your company today?
               </div>
             </div>
          </div>

          <div className="p-4 bg-slate-900 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 bg-slate-950 border border-slate-800 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:scale-110 transition-all duration-200"
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
      </button>
    </div>
  );
}
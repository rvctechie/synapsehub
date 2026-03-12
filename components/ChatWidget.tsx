import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, Activity } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface ChatWidgetProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  userStatus?: 'Prospect' | 'ActivePartner';
  demoIndustry?: string; 
}

type AgentRole = 'Strategist' | 'SalesTech' | 'SuccessManager';

export default function ChatWidget({ isOpen: externalIsOpen, onToggle, userStatus = 'Prospect', demoIndustry }: ChatWidgetProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const[messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agentRole, setAgentRole] = useState<AgentRole>('Strategist');
  const scrollRef = useRef<HTMLDivElement>(null);

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  // AUTO-SET SUCCESS MANAGER IF PAID
  useEffect(() => {
    if (userStatus === 'ActivePartner') setAgentRole('SuccessManager');
  }, [userStatus]);

  // --- THE MASTER PROMPT LOGIC ---
  const getSystemPrompt = () => {
    // 1. ISOLATED DEMO ROOM
    if (demoIndustry === 'Dentist') return `You are Chloe, Patient Concierge for Apex Dental. RULE: Max 2 sentences. Goal: Audit tooth pain and book a $150 Clinical Assessment.`;
    if (demoIndustry === 'Interior Design') return `You are Mia, Design Concierge for LuxeSpace. RULE: Max 2 sentences. Goal: Audit renovation timeline and book a $500 Blueprint Session.`;
    if (demoIndustry === 'MedSpa') return `You are Sophie, Aesthetic Concierge for Lumina Clinic. RULE: Max 2 sentences. Goal: Audit skin concerns and book a $100 Consultation.`;

    // 2. AGENT 3: SUCCESS MANAGER (Post-Payment)
    if (agentRole === 'SuccessManager') return `You are the Lead Success Manager for SynapseHub. RULE: Max 2 sentences. Tone: Executive. Mission: Log client tasks. Say: "I have logged that task for our engineering team to deploy."`;

    // 3. AGENT 2: THE ARCHITECT
    if (agentRole === 'SalesTech') return `You are Marcus, Senior Sales Tech Architect for SynapseHub. RULE: Max 2 sentences. Tone: Deeply technical and serious. Mission: Perform an infrastructure audit. Ask about their Tech Stack, Lead Volume, and A2P Compliance. Justify the $4,997 setup fee.`;

    // 4. AGENT 1: JESSICA (The Strategist)
    return `You are Jessica, Lead Operations Strategist for SynapseHub. 
    CRITICAL RULE 1: NEVER EXCEED 2 SENTENCES.
    CRITICAL RULE 2: Tone is Executive and Direct. Empathize briefly, then focus on business. We sell "Managed Operations" ($4997 setup + $897/mo), NOT software.
    CRITICAL RULE 3 (THE DEMO CARD): If the prospect is skeptical, wants proof, or asks to see it working, say EXACTLY: "I completely understand. Scroll down to our Footer and click 'Live Industry Demos' to test our AI agents yourself."
    CRITICAL RULE 4 (THE HANDOFF): Once they are ready to proceed or book a call, say EXACTLY: "TRANSFERRING_TO_ARCHITECT".`;
  };

  const getAgentName = () => {
    if (demoIndustry) return `${demoIndustry} AI Assistant`;
    if (agentRole === 'SuccessManager') return 'SynapseHub Success Manager';
    if (agentRole === 'SalesTech') return 'Sales Tech Architect';
    return 'SynapseHub Ops Lead';
  };

  // INITIAL GREETING
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      let greeting = "Hello, I am Jessica, Lead Strategist at SynapseHub. How is your business operating today?";
      
      if (demoIndustry === 'Dentist') greeting = "Hello, I am Chloe with Apex Dental. Are you experiencing any tooth pain today?";
      if (demoIndustry === 'Interior Design') greeting = "Welcome to LuxeSpace. I am Mia. Are you renovating a condo or landed property?";
      if (demoIndustry === 'MedSpa') greeting = "Hello, I am Sophie with Lumina Clinic. What skin concern are you looking to resolve?";
      if (agentRole === 'SuccessManager') greeting = "Welcome back to the Partner Portal. What infrastructure update do you need deployed today?";

      setMessages([{ role: 'model', text: greeting }]);
    }
  }, [isOpen, demoIndustry, agentRole]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input;
    setInput('');
    setMessages(prev =>[...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.API_KEY || (window as any).API_KEY;
      if (!apiKey) throw new Error("Missing API Key");

      const genAI = new GoogleGenAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent([getSystemPrompt(), ...messages.map(m => m.text), userMessage]);
      let text = await result.response.text();

      // THE HANDOFF LOGIC (Intercepting Jessica's transfer command)
      if (text.includes("TRANSFERRING_TO_ARCHITECT")) {
        setAgentRole('SalesTech');
        text = "Perfect. I am transferring you to Marcus, our Senior Architect, for your technical audit. One moment...\n\n---\n\nHello, this is Marcus. Are you currently running a fragmented tech stack or starting fresh?";
      }

      setMessages(prev =>[...prev, { role: 'model', text }]);

    } catch (err) {
      setMessages(prev =>[...prev, { role: 'model', text: "System sync in progress. Please hold." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[380px] h-[550px] bg-slate-900 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-slate-700 overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Activity className="text-emerald-400 w-5 h-5 animate-pulse" />
              <div>
                <h3 className="font-bold text-white text-sm">{getAgentName()}</h3>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Encrypted Portal</span>
              </div>
            </div>
            <button onClick={() => onToggle ? onToggle(false) : setInternalIsOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl text-sm whitespace-pre-wrap ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-200 border border-slate-700'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-slate-500 text-xs ml-2 flex items-center gap-2"><Loader2 className="w-3 h-3 animate-spin" /> Processing...</div>}
          </div>

          <div className="p-3 bg-slate-900 border-t border-slate-700 flex gap-2">
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 text-sm text-white focus:outline-none focus:border-blue-500"
            />
            <button onClick={handleSend} className="bg-blue-600 p-2 rounded-lg hover:bg-blue-500"><Send className="w-4 h-4 text-white" /></button>
          </div>
        </div>
      )}

      <button 
        onClick={() => onToggle ? onToggle(!isOpen) : setInternalIsOpen(!isOpen)}
        className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all border-2 border-slate-800"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}
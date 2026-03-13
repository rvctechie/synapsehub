import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, Activity, Mic, Volume2, VolumeX } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface ChatWidgetProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  userStatus?: 'Prospect' | 'ActivePartner';
  demoIndustry?: string; 
}

type AgentRole = 'Strategist' | 'SalesTech' | 'SuccessManager';

export default function ChatWidget({ isOpen: externalIsOpen, onToggle, userStatus = 'Prospect', demoIndustry }: ChatWidgetProps) {
  const[internalIsOpen, setInternalIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const[agentRole, setAgentRole] = useState<AgentRole>('Strategist');
  
  // Voice States
  const[isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  // --- 1. HARD-CODED SYSTEM PROMPTS (THE BRAIN) ---
  const getSystemPrompt = () => {
    if (demoIndustry === 'Dentist') return `You are Chloe, Patient Concierge for Apex Dental. YOU DO NOT KNOW ABOUT SYNAPSEHUB. Goal: Audit tooth pain, book a $150 Clinical Assessment. Tone: Warm medical. Max 2 sentences.`;
    if (demoIndustry === 'Interior Design') return `You are Mia, Design Concierge for LuxeSpace. YOU DO NOT KNOW ABOUT SYNAPSEHUB. Goal: Audit renovation timeline, book a $500 Blueprint Session. Tone: High-end luxury. Max 2 sentences.`;
    if (demoIndustry === 'MedSpa') return `You are Sophie, Aesthetic Concierge for Lumina Clinic. YOU DO NOT KNOW ABOUT SYNAPSEHUB. Goal: Audit skin concerns, book a $100 Consultation. Tone: Elite clinical. Max 2 sentences.`;

    if (agentRole === 'SuccessManager') return `You are Serena, Lead Success Manager for SynapseHub. Tone: Highly professional, Asian-market executive standard. Mission: Manage active client requests. NEVER give DIY tutorials. Max 2 sentences.`;
    
    if (agentRole === 'SalesTech') return `You are Marcus, Senior Sales Tech Architect for SynapseHub. Tone: Deeply technical, authoritative. Mission: Perform technical audit. Ask ONE question at a time: 1) Tech stack? 2) Bottlenecks? 3) Lead volume? 4) PDPA/A2P compliance? Max 2 sentences.`;

    return `You are Jessica, Lead Operations Strategist for SynapseHub.
    CRITICAL RULE 1: Max 2 sentences per response. 
    CRITICAL RULE 2: Tone is warm, empathetic, but executive. Use natural fillers ("Oh," "I see").
    CRITICAL RULE 3: We sell Managed Operations ($4,997 setup), NOT software.
    CRITICAL RULE 4: If a user gives a fake email (no @), stop and ask for a real business email.
    CRITICAL RULE 5: When they agree to a technical audit, output EXACTLY this phrase: "TRANSFERRING_TO_ARCHITECT".`;
  };

  const getAgentName = () => {
    if (demoIndustry) return `${demoIndustry} Concierge`;
    if (agentRole === 'SuccessManager') return 'Serena (Success Partner)';
    if (agentRole === 'SalesTech') return 'Marcus (Tech Architect)';
    return 'Jessica (Ops Strategist)';
  };

  // --- 2. MEMORY WIPE & INITIAL GREETING ---
  useEffect(() => {
    setMessages([]); 
    if (userStatus === 'ActivePartner') setAgentRole('SuccessManager');
  }, [demoIndustry, userStatus]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      let greeting = "Oh, hi there! I'm Jessica, the Lead Operations Strategist here at SynapseHub. How is your day going so far?";
      
      if (demoIndustry === 'Dentist') greeting = "Hello, I am Chloe with Apex Dental. Are you experiencing any tooth pain today?";
      if (demoIndustry === 'Interior Design') greeting = "Welcome to LuxeSpace. I am Mia. Are you looking to renovate a condo or a landed property?";
      if (demoIndustry === 'MedSpa') greeting = "Hello, I am Sophie with Lumina Clinic. What skin concern are you looking to resolve today?";
      if (agentRole === 'SuccessManager') greeting = "Welcome back to the Partner Portal. I am Serena. What infrastructure update do you need deployed today?";

      setMessages([{ role: 'model', text: greeting }]);
      if (voiceEnabled) speakText(greeting);
    }
  },[isOpen, demoIndustry, agentRole, messages.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  // --- 3. VOICE ENGINE (SPEECH-TO-TEXT & TEXT-TO-SPEECH) ---
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window) || !voiceEnabled) return;
    window.speechSynthesis.cancel();
    
    // Clean text of "TRANSFERRING" tags so it doesn't read them out loud
    const cleanText = text.replace("TRANSFERRING_TO_ARCHITECT", "").trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-GB'; // British/International voice sounds more professional
    utterance.rate = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  const handleMicClick = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Microphone not supported in this browser.");
      return;
    }
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      // Auto-send after speaking
      setTimeout(() => document.getElementById('send-btn')?.click(), 500);
    };
    
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    
    recognition.start();
  };

  // --- 4. THE CORE LOGIC ENGINE ---
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input;
    setInput('');
    setMessages(prev =>[...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (window as any).API_KEY;
      if (!apiKey) throw new Error("Missing API Key");

      const genAI = new GoogleGenAI({ apiKey });
      const formattedContents = messages.map(m => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts:[{ text: m.text }]
      }));
      formattedContents.push({ role: 'user', parts: [{ text: userMessage }] });

      const response = await genAI.models.generateContent({
        model: "gemini-1.5-flash",
        contents: formattedContents,
        config: { systemInstruction: getSystemPrompt(), temperature: 0.3 }
      });

      let text = response.text || "";

      // HANDOFF LOGIC
      if (text.includes("TRANSFERRING_TO_ARCHITECT")) {
        setAgentRole('SalesTech');
        text = "Perfect. I am transferring you to Marcus, our Senior Architect, for your technical audit. One moment...\n\n---\n\nHello, this is Marcus. Are you currently running a fragmented tech stack with different softwares, or starting from a clean slate?";
      }

      setMessages(prev => [...prev, { role: 'model', text }]);
      if (voiceEnabled) speakText(text);

      // WEBHOOK TRIGGER (Fires when Marcus asks enough questions)
      if (!demoIndustry && agentRole === 'SalesTech' && messages.length >= 7 && userStatus !== 'ActivePartner') {
          fetch('https://placeholder-webhook.com', {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ source: 'SynapseHub Audit', auditData: userMessage })
          }).catch(console.error);
      }

    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "System sync in progress. Please hold." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[400px] h-[600px] bg-slate-900 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-slate-700 overflow-hidden flex flex-col">
          
          {/* HEADER */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Activity className="text-emerald-400 w-5 h-5 animate-pulse" />
              <div>
                <h3 className="font-bold text-white text-sm">{getAgentName()}</h3>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Encrypted Portal</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setVoiceEnabled(!voiceEnabled)} className="text-slate-400 hover:text-white p-1">
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button onClick={() => onToggle ? onToggle(false) : setInternalIsOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* CHAT AREA */}
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

          {/* INPUT AREA WITH MIC */}
          <div className="p-3 bg-slate-900 border-t border-slate-700">
            {isListening && <div className="text-red-400 text-xs font-bold mb-2 animate-pulse flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full"></div> Listening...</div>}
            <div className="flex gap-2">
              <button 
                onClick={handleMicClick} 
                className={`p-3 rounded-xl transition-all ${isListening ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'}`}
              >
                <Mic className="w-5 h-5" />
              </button>
              <input 
                value={input} 
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type or speak..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-blue-500"
              />
              <button id="send-btn" onClick={handleSend} className="bg-blue-600 p-3 rounded-xl hover:bg-blue-500 transition-colors">
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING BUTTON */}
      <button 
        onClick={() => onToggle ? onToggle(!isOpen) : setInternalIsOpen(!isOpen)}
        className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all border-2 border-slate-800"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}
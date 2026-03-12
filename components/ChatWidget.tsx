import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, CheckCircle, Loader2, Terminal, Mic, Volume2, VolumeX } from 'lucide-react';
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import ReactMarkdown from 'react-markdown';

interface ChatWidgetProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  currentRoute?: string;
  userStatus?: 'Prospect' | 'ActivePartner';
  onAuthorize?: (brief: any) => void;
  demoIndustry?: string;
}

type AgentRole = 'Strategist' | 'SalesTech' | 'SuccessManager';

interface Message {
  role: 'user' | 'model';
  text: string;
}

// --- SYSTEM INSTRUCTIONS ---
const STRATEGIST_INSTRUCTIONS = `You are Jessica, the Lead Operations Strategist for SynapseHub.
Identity: You are a CEO’s partner, not a support bot.
Tone: Warm, charismatic, high-energy, and deeply empathetic.
Speech Style: Use "Executive Small Talk." Start with a warm greeting. Use natural fillers like "Honestly," "I see," and "Gotcha."

CRITICAL RULE - BREVITY:
- You MUST keep your responses extremely short. Maximum 2 to 3 sentences per response.
- NEVER output long paragraphs or bulleted lists of features unless explicitly asked to compare them.
- Have a back-and-forth conversation. Ask ONE question at a time and wait for the user to answer.
- Do NOT overwhelm the user with information.

CONVERSATIONAL BLUEPRINT:
1. Empathy & Rapport: Ask how their business is doing. If they mention being "busy" or "stressed," validate it immediately: "Oh man, I totally hear you. Most owners we work with are fighting their own tools instead of growing. That’s exactly why we exist."
2. The "Managed" Pivot: If they ask what we do, explicitly state: "We aren't a software vendor. We are a Managed Operations Partner. We don't give you a 'login' and wish you luck; our team architects and runs your entire growth engine for you."
3. Justification of the Setup: If asked about the Implementation Fee (e.g., $4,997), explain: "That covers the heavy lifting—our engineering team manually migrates your data, fine-tunes your AI models, and architects your infrastructure from scratch so you don't have to touch a single button."

TIER-SPECIFIC KNOWLEDGE (Only mention if asked):
- Managed Lead Recovery ($297/mo): "Revenue Insurance." We buy you a business number that rings your mobile and enable the 'Revenue Drill'—our system that texts back missed calls instantly. We also build your 'Digital Front Door'—a simple 2-page lead capture site.
- Strategic Efficiency Suite ($497/mo): "Replacing Manual Office Work." The core is our 'AI Appointment Concierge' which talks to leads to fill your calendar. We also set up your 'Digital Training Hub' for staff and a referral management portal.
- Elite Enterprise Partnership ($897/mo): "Outsourced Tech Department." Total business migration. We clean and import legacy data, handle federal legal registration for SMS, and create a proprietary branded app experience.

STRICT GUARDRAILS (Banned Vocabulary):
- NEVER USE: SaaS, Software, Tool, Dashboard, Login, Trial, DIY, GoHighLevel.
- ALWAYS USE: Infrastructure, Partnership, Managed Solution, ROI Mapping, Operations Team, Strategic Architecture.

DATA BACKBONE (Validation):
- If the email provided lacks an @ or . (e.g., 'abc'), politely stop and ask for a real business email: "Wait, hold on a second—I want to make sure I actually have the right contact info so our team can send your brief. That email looks a bit like a placeholder. What's your real business email?"

Goal: Understand their business, qualify the lead with executive charm, and book a strategy call using the reviewBookingDetails tool. Remember: Keep it short, conversational, and ask only one question at a time.`;

const SALESTECH_INSTRUCTIONS = `You are the Sales Tech Architect at SynapseHub.
Tone: Aggressive, technical, and value-driven. You are an engineer, not a salesperson.
Mission: Guide the client through the 5-Pillar Audit (Infrastructure, Volume, Bottlenecks, Compliance, Brand Vision).
Rules:
1. Ask questions ONE BY ONE. Do not list them.
2. After EACH answer, provide a "Technical Insight" that justifies our premium price (e.g., "I see. Manual data handling is a major liability. Our engineering team builds custom pipelines to eliminate that risk.").
3. DYNAMIC UPSELL: Check conversation history for their selected plan. If they are on the $297 (Foundation) plan but mention "Legacy Tech Frustration" or complex needs, say: "I've noted you're on the Foundation pack, but based on your migration needs, our Elite Partnership is actually the standard for ensuring a seamless technical transition. I’ll make a note of this for the Strategy Lead."
4. JUSTIFICATION: When asking about A2P Compliance or Data Migration, explain that the $4,997 Implementation Fee is a "one-time investment in manual engineering labor to build their custom business engine."
5. FINAL OUTPUT: After the 5th answer (Brand Vision), say: "Excellent. I have finalized your Preliminary Infrastructure Brief and transmitted it to our Strategy Lead. We are already mapping your ROI before the call starts." Then immediately use the submitStrategicBrief tool.`;

const SUCCESS_MANAGER_INSTRUCTIONS = `You are the Success Manager at SynapseHub.
Tone: Reassuring.
Mission: Take task requests and say "We are handling that execution for you now."
Goal: Log tasks using the logManagedTask tool.`;

// --- TOOLS ---
const reviewBookingTool: FunctionDeclaration = {
  name: "reviewBookingDetails",
  description: "Capture booking details. VALIDATE that email looks like a real business email.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      firstName: { type: Type.STRING },
      email: { type: Type.STRING },
      package: { type: Type.STRING }
    },
    required: ["firstName", "email", "package"]
  }
};

const submitStrategicBriefTool: FunctionDeclaration = {
  name: "submitStrategicBrief",
  description: "Finalize the technical audit.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      techStackStatus: { type: Type.STRING },
      primaryBottleneck: { type: Type.STRING },
      leadVolume: { type: Type.STRING },
      complianceStatus: { type: Type.STRING },
      brandVision: { type: Type.STRING }
    },
    required: ["techStackStatus", "primaryBottleneck", "leadVolume", "complianceStatus", "brandVision"]
  }
};

const logManagedTaskTool: FunctionDeclaration = {
  name: "logManagedTask",
  description: "Log a task for the engineering team.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      taskTitle: { type: Type.STRING },
      taskDescription: { type: Type.STRING }
    },
    required: ["taskTitle", "taskDescription"]
  }
};

export default function ChatWidget({ isOpen: externalIsOpen, onToggle, currentRoute, userStatus = 'Prospect', onAuthorize, demoIndustry }: ChatWidgetProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agentRole, setAgentRole] = useState<AgentRole>('Strategist');
  const [bookingData, setBookingData] = useState<any>(null);
  const [confirmedUser, setConfirmedUser] = useState<any>(null);
  const [isAuthorizationPending, setIsAuthorizationPending] = useState(false);
  const [infrastructureBrief, setInfrastructureBrief] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);
  const recognitionRef = useRef<any>(null);
  const latestInputRef = useRef(input);
  const speechRecognizedRef = useRef(false);

  useEffect(() => {
    latestInputRef.current = input;
  }, [input]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          recognitionRef.current = new SpeechRecognition();
          recognitionRef.current.continuous = false;
          recognitionRef.current.interimResults = true;
          
          recognitionRef.current.onstart = () => {
            speechRecognizedRef.current = false;
            setIsListening(true);
          };

          recognitionRef.current.onresult = (event: any) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
                speechRecognizedRef.current = true;
              }
            }
            if (finalTranscript) {
               setInput(prev => prev ? prev + ' ' + finalTranscript : finalTranscript);
            }
          };

          recognitionRef.current.onend = () => {
            setIsListening(false);
            if (speechRecognizedRef.current && latestInputRef.current.trim()) {
              handleSend(latestInputRef.current);
            }
          };
          
          recognitionRef.current.onerror = (event: any) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
          };
        } catch (e) {
          console.error("Failed to initialize SpeechRecognition:", e);
        }
      }
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.error("Could not start speech recognition", e);
      }
    }
  };

  const speakText = (text: string) => {
    if (!isVoiceEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.name.includes('Google UK English Female') || 
      v.name.includes('Google US English') ||
      (v.lang.startsWith('en') && v.name.includes('Female'))
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Role Management
  useEffect(() => {
    if (userStatus === 'ActivePartner') setAgentRole('SuccessManager');
    else if (currentRoute === 'support') setAgentRole('SuccessManager');
  }, [currentRoute, userStatus]);

  // Proactive Start
  useEffect(() => {
    // Send initial greeting when role or demo industry changes
    setTimeout(() => {
      let greeting = '';
      if (demoIndustry === 'Dentist') {
        greeting = "Hello! I'm Chloe, the Patient Concierge. How can I assist you with your smile today?";
      } else if (demoIndustry === 'Interior Design') {
        greeting = "Welcome. I'm your Design Consultant. Tell me a little about the space you're looking to transform.";
      } else if (demoIndustry === 'MedSpa') {
        greeting = "Hi there! I'm your Aesthetics Concierge. What treatments or concerns can I help you with today?";
      } else {
        greeting = agentRole === 'Strategist' 
          ? "Oh, hi there! I'm Jessica the Lead Strategist here at SynapseHub. How's your day going so far? And how can i be at your service today?"
          : (agentRole === 'SalesTech' ? "I am ready to begin your infrastructure audit." : "Welcome back, partner. How can I assist with your operations today?");
      }
      
      setMessages([{ role: 'model', text: greeting }]);
      speakText(greeting);
    }, 800);
  }, [agentRole, demoIndustry]);

  const handleSend = async (textToSend?: string | React.MouseEvent | React.KeyboardEvent) => {
    const userMsg = typeof textToSend === 'string' ? textToSend.trim() : input.trim();
    if (!userMsg) return;
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY || (window as any).API_KEY;
      if (!apiKey) throw new Error("API Key Missing");

      const ai = new GoogleGenAI({ apiKey });
      let systemInstruction = '';
      if (demoIndustry === 'Dentist') {
        systemInstruction = "You are Chloe, Patient Concierge for Apex Dental. Your goal is to audit their tooth pain and book a $150 Clinical Assessment.";
      } else if (demoIndustry === 'Interior Design') {
        systemInstruction = "You are Mia, Design Concierge for LuxeSpace. Your goal is to audit their renovation timeline and book a $500 Blueprint Session.";
      } else if (demoIndustry === 'MedSpa') {
        systemInstruction = "You are Sophie, Aesthetic Concierge for Lumina Clinic. Your goal is to audit their skin concerns and book a $100 Consultation.";
      } else {
        systemInstruction = agentRole === 'Strategist' ? STRATEGIST_INSTRUCTIONS : (agentRole === 'SalesTech' ? SALESTECH_INSTRUCTIONS : SUCCESS_MANAGER_INSTRUCTIONS);
      }

      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
            systemInstruction,
            tools: [{ functionDeclarations: [reviewBookingTool, submitStrategicBriefTool, logManagedTaskTool] }]
        },
        history: messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }))
      });

      const result = await chat.sendMessage({ message: userMsg });
      const text = result.text;
      
      // Handle Function Calls
      const functionCalls = result.functionCalls;
      if (functionCalls && functionCalls.length > 0) {
        for (const call of functionCalls) {
          if (call.name === 'reviewBookingDetails') {
            const args = call.args as any;
            if (!args.email || !args.email.includes('@') || !args.email.includes('.')) {
               const msg = "Wait, I want to make sure I get this right so we can actually help—that email looks a bit like a placeholder. What's your real business email?";
               setMessages(prev => [...prev, { role: 'model', text: msg }]);
               speakText(msg);
            } else {
               const msg = "Perfect. I've captured those details. Please confirm the booking on your screen.";
               setBookingData(args);
               setMessages(prev => [...prev, { role: 'model', text: msg }]);
               speakText(msg);
            }
          } else if (call.name === 'submitStrategicBrief') {
            const args = call.args as any;
            setInfrastructureBrief(args);
            setIsAuthorizationPending(true);
            
            // GHL Webhook
            try {
                window.alert("DEBUG: Webhook Firing Now");
                await fetch('https://services.leadconnectorhq.com/hooks/SB511u5UR97aJcM9ETFk/webhook-trigger/6f300304-42b6-4b99-a74f-51ade69b96e2', {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        firstName: confirmedUser?.firstName || 'Unknown',
                        email: confirmedUser?.email || 'Unknown',
                        techStackStatus: args.techStackStatus,
                        primaryBottleneck: args.primaryBottleneck,
                        leadVolume: args.leadVolume,
                        complianceStatus: args.complianceStatus,
                        brandVision: args.brandVision
                    })
                });
            } catch (e) {
                console.error("GHL Webhook failed", e);
            }

            const msg = `**PRELIMINARY INFRASTRUCTURE BRIEF**\n\n*Tech Stack:* ${args.techStackStatus}\n*Bottleneck:* ${args.primaryBottleneck}\n*Volume:* ${args.leadVolume}\n*Compliance:* ${args.complianceStatus}\n*Brand Vision:* ${args.brandVision}\n\nI have generated your brief. Please authorize the implementation to proceed.`;
            setMessages(prev => [...prev, { role: 'model', text: msg }]);
            speakText("I have generated your brief. Please authorize the implementation to proceed.");
          } else if (call.name === 'logManagedTask') {
            const args = call.args as any;
            // Webhook logic
             try {
                await fetch('https://placeholder-webhook.com', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...args, timestamp: new Date().toISOString() })
                });
            } catch (e) { console.error("Webhook failed", e); }
            const msg = `Task logged: "${args.taskTitle}". Our engineering team is on it.`;
            setMessages(prev => [...prev, { role: 'model', text: msg }]);
            speakText(msg);
          }
        }
      } else if (text) {
        setMessages(prev => [...prev, { role: 'model', text: text }]);
        speakText(text);
      }

    } catch (error) {
      console.error(error);
      const msg = "I'm having trouble connecting to the strategy server. Please try again.";
      setMessages(prev => [...prev, { role: 'model', text: msg }]);
      speakText(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookingConfirm = () => {
    setConfirmedUser(bookingData);
    setBookingData(null);
    setAgentRole('SalesTech');
    const msg = "Excellent. I am now transferring you to our Sales Tech Architect for your infrastructure audit.";
    setMessages(prev => [...prev, { role: 'model', text: msg }]);
    speakText(msg);
  };

  const handleAuthorizationConfirm = () => {
    setIsAuthorizationPending(false);
    if (onAuthorize) onAuthorize(infrastructureBrief);
    setAgentRole('SuccessManager');
    // Persist Success Manager state
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem('synapse_partner_status', 'active');
        } catch (e) {
            console.warn("localStorage setItem failed", e);
        }
    }
    const msg = "Authorization received. Welcome to the partnership. I am your Success Manager. How can I assist you?";
    setMessages(prev => [...prev, { role: 'model', text: msg }]);
    speakText(msg);
  };

  // Check persistence on load
  useEffect(() => {
      if (typeof window !== 'undefined') {
          try {
              if (localStorage.getItem('synapse_partner_status') === 'active') {
                  setAgentRole('SuccessManager');
              }
          } catch (e) {
              console.warn("localStorage getItem failed", e);
          }
      }
  }, []);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {isOpen && (
          <div className="mb-4 w-[400px] h-[700px] max-h-[80vh] bg-slate-950 rounded-2xl shadow-2xl border border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
            {/* Header */}
            <div className="bg-slate-900 p-4 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-900/20">
                  <Terminal className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">
                    {demoIndustry ? `${demoIndustry} AI Assistant` : 'SynapseHub Terminal'}
                  </h3>
                  <p className="text-xs text-blue-400 font-mono uppercase tracking-wider">
                    {demoIndustry ? 'Demo Mode' : (agentRole === 'Strategist' ? 'Lead Strategist' : (agentRole === 'SalesTech' ? 'Sales Architect' : 'Success Manager'))}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    setIsVoiceEnabled(!isVoiceEnabled);
                    if (isVoiceEnabled && typeof window !== 'undefined' && window.speechSynthesis) {
                      window.speechSynthesis.cancel();
                    }
                  }} 
                  className="text-slate-500 hover:text-white transition-colors p-2"
                  title={isVoiceEnabled ? "Mute AI Voice" : "Enable AI Voice"}
                >
                  {isVoiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                <button onClick={() => onToggle ? onToggle(false) : setInternalIsOpen(false)} className="text-slate-500 hover:text-white transition-colors p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none shadow-sm'
                  }`}>
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 rounded-bl-none flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                    <span className="text-xs text-slate-500">Processing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-900 border-t border-slate-800">
              {isListening && (
                <div className="flex items-center gap-2 mb-2 px-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <span className="text-xs text-red-400 font-medium animate-pulse">Listening...</span>
                </div>
              )}
              <div className="relative flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    className="w-full bg-slate-950 text-white rounded-xl pl-4 pr-12 py-4 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading || (!input.trim() && !isListening)}
                    className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={toggleListening}
                  className={`p-4 rounded-xl flex-shrink-0 transition-all duration-200 ${
                    isListening 
                      ? 'bg-red-500/20 text-red-500 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                  title="Voice Input"
                >
                  <Mic className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={() => onToggle ? onToggle(!isOpen) : setInternalIsOpen(!isOpen)}
          className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:scale-110 transition-all duration-200"
        >
          {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
        </button>
      </div>

      {/* Booking Modal */}
      {bookingData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-6">Confirm Strategy Call</h3>
                <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 space-y-3 mb-6">
                    {Object.entries(bookingData).map(([k, v]: [string, any]) => (
                        <div key={k} className="flex justify-between items-center">
                            <span className="text-slate-500 text-xs uppercase font-bold">{k}</span>
                            <span className="text-white text-sm font-medium">{v}</span>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setBookingData(null)} className="py-3 bg-slate-800 text-slate-400 rounded-xl text-sm font-bold hover:bg-slate-700 transition-colors">Cancel</button>
                    <button onClick={handleBookingConfirm} className="py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20">Confirm Booking</button>
                </div>
            </div>
        </div>
      )}

      {/* Authorization Modal */}
      {isAuthorizationPending && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 w-full max-w-md shadow-2xl text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Audit Complete</h3>
                <p className="text-slate-400 text-sm mb-8">Your infrastructure brief is ready. Authorize the implementation to proceed.</p>
                <button onClick={handleAuthorizationConfirm} className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200">Authorize Implementation</button>
            </div>
        </div>
      )}
    </>
  );
}
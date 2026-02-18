import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Mic, MicOff, Loader2, Volume2, Radio } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";

interface ChatWidgetProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

// System instruction based on website content
const SYSTEM_INSTRUCTION = `
You are the SynapseHub AI Voice Support Assistant.
Your goal is to help visitors understand our SaaS platform, Pricing, and Features.
Keep answers SHORT, conversational, and friendly. Do not lecture.

BUSINESS KNOWLEDGE (Use ONLY this):
- Product: SynapseHub, an all-in-one marketing and sales platform (CRM) replacing 10+ tools.
- Pricing (Monthly): Solopreneur ($297/mo), Enterpriser ($497/mo), SaaS Pro ($897/mo).
- Pricing (Yearly): Save 20%. Solopreneur ($230/mo), Enterpriser ($390/mo), SaaS Pro ($690/mo).
- Free Trial: 14 Days. No setup fees. Cancel anytime.
- Key Features: Unified Inbox (FB, Insta, SMS, Email), Missed Call Text-Back, AI Booking Calendar, Funnel Builder, Reputation Management.
- Support: 24/7 Chat support.

RULES:
1. If asked about something not listed above, say: "I don't have that info right now, but I recommend booking a consultation with our experts."
2. Be professional but energetic.
3. If asked who you are: "I'm the SynapseHub Voice Assistant."
`;

export default function ChatWidget({ isOpen: externalIsOpen, onToggle }: ChatWidgetProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); // Model is speaking
  const [volume, setVolume] = useState(0);

  const isControlled = externalIsOpen !== undefined && onToggle !== undefined;
  const isOpen = isControlled ? externalIsOpen : internalIsOpen;

  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sessionRef = useRef<any>(null);
  const inputProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const toggleOpen = () => {
    const newState = !isOpen;
    if (isControlled && onToggle) {
      onToggle(newState);
    } else {
      setInternalIsOpen(newState);
    }
    if (!newState) {
      disconnect();
    }
  };

  const closeChat = () => {
    disconnect();
    if (isControlled && onToggle) {
        onToggle(false);
    } else {
        setInternalIsOpen(false);
    }
  };

  const disconnect = async () => {
    if (sessionRef.current) {
        // There is no explicit .close() on the session object in the current SDK version provided in context,
        // but we stop processing.
        sessionRef.current = null;
    }
    
    // Stop Microphone
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    // Stop Audio Context
    if (audioContextRef.current) {
      await audioContextRef.current.close();
      audioContextRef.current = null;
    }

    // Stop all playing sources
    audioSourcesRef.current.forEach(source => {
        try { source.stop(); } catch(e) {}
    });
    audioSourcesRef.current.clear();

    setIsConnected(false);
    setIsConnecting(false);
    setIsSpeaking(false);
    setVolume(0);
  };

  const connect = async () => {
    try {
      setIsConnecting(true);
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        alert("API Key missing");
        setIsConnecting(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });

      // 1. Setup Audio Contexts
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContextClass({ sampleRate: 24000 }); // Output rate
      
      // 2. Microphone Stream (Input)
      // Input needs to be re-sampled to 16kHz for Gemini
      const stream = await navigator.mediaDevices.getUserMedia({ audio: {
        channelCount: 1,
        sampleRate: 16000
      }});
      streamRef.current = stream;

      // 3. Connect to Gemini Live
      // Note: We use a separate input context for recording to ensure 16kHz
      const inputContext = new AudioContextClass({ sampleRate: 16000 });
      const source = inputContext.createMediaStreamSource(stream);
      sourceRef.current = source;
      
      const processor = inputContext.createScriptProcessor(4096, 1, 1);
      inputProcessorRef.current = processor;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
            responseModalities: [Modality.AUDIO],
            systemInstruction: SYSTEM_INSTRUCTION,
            speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
            }
        },
        callbacks: {
            onopen: () => {
                console.log("Gemini Live Connected");
                setIsConnected(true);
                setIsConnecting(false);
                
                // Start pumping audio
                processor.onaudioprocess = (e) => {
                    const inputData = e.inputBuffer.getChannelData(0);
                    // Calculate volume for visualizer
                    let sum = 0;
                    for(let i=0; i<inputData.length; i++) sum += inputData[i] * inputData[i];
                    const rms = Math.sqrt(sum / inputData.length);
                    if (!isSpeaking) setVolume(Math.min(rms * 5, 1)); // Visualize mic only if model isn't speaking

                    const b64Data = float32ToB64(inputData);
                    
                    sessionPromise.then(session => {
                        session.sendRealtimeInput({
                            media: {
                                mimeType: "audio/pcm;rate=16000",
                                data: b64Data
                            }
                        });
                    });
                };
                
                source.connect(processor);
                processor.connect(inputContext.destination);
            },
            onmessage: async (msg: LiveServerMessage) => {
                // Handle Audio Output
                const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                if (audioData && audioContextRef.current) {
                   setIsSpeaking(true);
                   
                   const audioBuffer = await decodeAudioData(audioData, audioContextRef.current);
                   
                   // Schedule playback
                   const ctx = audioContextRef.current;
                   const startTime = Math.max(ctx.currentTime, nextStartTimeRef.current);
                   
                   const sourceNode = ctx.createBufferSource();
                   sourceNode.buffer = audioBuffer;
                   sourceNode.connect(ctx.destination);
                   sourceNode.start(startTime);
                   
                   nextStartTimeRef.current = startTime + audioBuffer.duration;
                   audioSourcesRef.current.add(sourceNode);

                   sourceNode.onended = () => {
                       audioSourcesRef.current.delete(sourceNode);
                       if (audioSourcesRef.current.size === 0) {
                           setIsSpeaking(false);
                           setVolume(0);
                       }
                   };
                   
                   // Simple mock volume for model speaking
                   setVolume(0.8 + Math.random() * 0.2); 
                }
                
                if (msg.serverContent?.interrupted) {
                    audioSourcesRef.current.forEach(s => s.stop());
                    audioSourcesRef.current.clear();
                    nextStartTimeRef.current = 0;
                    setIsSpeaking(false);
                }
            },
            onclose: () => {
                console.log("Gemini Live Closed");
                disconnect();
            },
            onerror: (err) => {
                console.error("Gemini Live Error", err);
                disconnect();
            }
        }
      });
      
      sessionRef.current = sessionPromise;

    } catch (err) {
      console.error("Connection failed", err);
      setIsConnecting(false);
      setIsConnected(false);
    }
  };

  // --- Audio Helpers ---
  
  function float32ToB64(array: Float32Array) {
    // Convert Float32 [-1, 1] to Int16
    const l = array.length;
    const buffer = new Int16Array(l);
    for (let i = 0; i < l; i++) {
        let s = Math.max(-1, Math.min(1, array[i]));
        buffer[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    // Int16 to Binary String
    let binary = '';
    const bytes = new Uint8Array(buffer.buffer);
    const len = bytes.byteLength;
    for(let i=0; i<len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  async function decodeAudioData(base64: string, ctx: AudioContext) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i=0; i<binary.length; i++) bytes[i] = binary.charCodeAt(i);
    
    // Convert Int16 PCM to Float32 AudioBuffer
    const int16 = new Int16Array(bytes.buffer);
    const buffer = ctx.createBuffer(1, int16.length, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i=0; i<int16.length; i++) {
        channelData[i] = int16[i] / 32768.0;
    }
    return buffer;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 md:w-96 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden animate-in slide-in-from-bottom-5 duration-200 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center shadow-lg z-10">
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Radio className={`w-4 h-4 ${isConnected ? 'animate-pulse text-green-300' : 'text-blue-200'}`} />
                SynapseHub Voice AI
              </h3>
              <p className="text-blue-100 text-xs mt-1 opacity-90">
                {isConnected ? (isSpeaking ? "AI Speaking..." : "Listening...") : "Tap microphone to start"}
              </p>
            </div>
            <button onClick={closeChat} className="text-white/80 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Main Visualizer Area */}
          <div className="h-80 bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
             
             {/* Background Glow */}
             <div className={`absolute inset-0 bg-blue-500/10 transition-opacity duration-500 ${isConnected ? 'opacity-100' : 'opacity-0'}`}></div>
             
             {/* Dynamic Orb */}
             <div className="relative z-10">
                <div 
                    className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-100 ${
                        isConnected 
                        ? (isSpeaking ? 'bg-purple-500/20 shadow-[0_0_50px_rgba(168,85,247,0.4)]' : 'bg-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.4)]')
                        : 'bg-slate-800'
                    }`}
                    style={{
                        transform: `scale(${1 + volume * 0.5})`
                    }}
                >
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${isConnected ? 'bg-gradient-to-tr from-blue-600 to-purple-600' : 'bg-slate-700'}`}>
                        {isConnecting ? (
                            <Loader2 className="w-10 h-10 text-white animate-spin" />
                        ) : isConnected ? (
                            <Volume2 className={`w-10 h-10 text-white transition-opacity ${isSpeaking ? 'opacity-100' : 'opacity-50'}`} />
                        ) : (
                            <MicOff className="w-10 h-10 text-slate-400" />
                        )}
                    </div>
                </div>
             </div>

             {/* Connection Button */}
             <div className="mt-12 z-10">
                {!isConnected ? (
                    <button 
                        onClick={connect}
                        disabled={isConnecting}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-full font-bold shadow-lg hover:scale-105 transition-all active:scale-95 disabled:opacity-70 disabled:scale-100"
                    >
                        <Mic className="w-5 h-5 text-blue-600" />
                        Start Voice Chat
                    </button>
                ) : (
                    <button 
                        onClick={disconnect}
                        className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full font-bold hover:bg-red-500 hover:text-white transition-all"
                    >
                        <MicOff className="w-5 h-5" />
                        End Call
                    </button>
                )}
             </div>

             {/* Privacy Note */}
             <div className="absolute bottom-4 text-xs text-slate-600">
                AI can make mistakes. Please check important info.
             </div>
          </div>
        </div>
      )}

      {/* Toggle Button (Same Design) */}
      <button 
        onClick={toggleOpen}
        className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:scale-110 transition-all duration-200 z-50 relative"
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
        {!isOpen && (
            <span className="absolute top-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-slate-950"></span>
            </span>
        )}
      </button>
    </div>
  );
}
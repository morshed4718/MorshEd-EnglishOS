import React, { useState, useRef, useEffect } from 'react';
import { speakText, stopSpeech, playChime } from '../utils/speechUtils';
import { 
  Sparkles, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Bot, 
  User, 
  RotateCcw,
  GraduationCap
} from 'lucide-react';

interface AiTutorChatProps {
  accent: 'en-US' | 'en-GB';
  onPracticeSuccess: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
}

export const AiTutorChat: React.FC<AiTutorChatProps> = ({ accent, onPracticeSuccess }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'tutor',
      text: "Hello and Welcome to MorshEd EnglishOS! 👋 I am your dedicated English speaking coach. Whether you want to correct common Banglish mistakes, prepare for an IELTS exam, or practice natural everyday conversation, I am here to guide you step-by-step. What would you like to speak about today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [autoSpeak, setAutoSpeak] = useState<boolean>(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickPrompts = [
    "Why do we say 'I agree' instead of 'I am agree'?",
    "Can you give me 3 phrases for a Job Interview?",
    "How can I pronounce the 'TH' sound correctly?",
    "Test my English with an everyday conversation scenario."
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6).map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            text: m.text
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();
      const tutorReply = data.reply || 'Great effort! Let us continue practicing.';

      const tutorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'tutor',
        text: tutorReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, tutorMessage]);
      onPracticeSuccess();

      if (autoSpeak) {
        // Strip markdown stars for clear speech synthesis
        const cleanForAudio = tutorReply.replace(/\*+/g, '').replace(/💡.+/g, '');
        speakText(cleanForAudio, { lang: accent });
      }
    } catch (err) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'tutor',
        text: "I am right here with you! You expressed your thought well. Keep speaking and practicing daily to reinforce muscle memory.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = accent;
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsRecording(true);
        playChime('beep');
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleSendMessage(transcript);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      setIsRecording(false);
    }
  };

  const stopVoiceInput = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsRecording(false);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col h-[700px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-white">MorshEd AI English Mentor</h2>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-xs text-slate-400 font-bengali">
              বাঙালি শিক্ষার্থীদের জন্য সার্বক্ষণিক বন্ধুসুলভ ইংরেজি শিক্ষক
            </p>
          </div>
        </div>

        {/* Audio Toggle & Accent Indicator */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setAutoSpeak(!autoSpeak)}
            className={`p-2 rounded-xl text-xs flex items-center space-x-1.5 transition border ${
              autoSpeak
                ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/30'
                : 'bg-slate-800 text-slate-500 border-slate-700'
            }`}
            title="Auto-speak AI responses"
          >
            {autoSpeak ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{autoSpeak ? 'Audio On' : 'Muted'}</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {messages.map((msg) => {
          const isTutor = msg.sender === 'tutor';
          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${isTutor ? '' : 'flex-row-reverse space-x-reverse'}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs shrink-0 shadow ${
                  isTutor ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
                }`}
              >
                {isTutor ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div className={`max-w-[85%] space-y-1.5 ${isTutor ? '' : 'text-right'}`}>
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                    isTutor
                      ? 'bg-slate-800/80 border border-slate-700/70 text-slate-100 rounded-tl-sm'
                      : 'bg-indigo-600 text-white rounded-tr-sm shadow-md'
                  }`}
                >
                  {msg.text}
                </div>

                <div className="flex items-center space-x-2 text-[10px] text-slate-500 px-1">
                  <span>{msg.timestamp}</span>
                  {isTutor && (
                    <button
                      onClick={() => speakText(msg.text.replace(/\*+/g, ''), { lang: accent })}
                      className="text-indigo-400 hover:text-indigo-300 flex items-center space-x-0.5"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Listen</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center space-x-2 text-xs text-indigo-400 bg-indigo-500/10 p-3 rounded-2xl w-fit">
            <Sparkles className="w-4 h-4 animate-spin text-emerald-400" />
            <span>MorshEd AI is evaluating your message and preparing constructive advice...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="py-2 flex space-x-2 overflow-x-auto no-scrollbar">
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs whitespace-nowrap transition"
          >
            💬 {p}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="pt-2 border-t border-slate-800 flex items-center space-x-2">
        <button
          onClick={isRecording ? stopVoiceInput : startVoiceInput}
          className={`p-3 rounded-2xl transition shadow-lg shrink-0 ${
            isRecording
              ? 'bg-rose-600 text-white animate-pulse'
              : 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700'
          }`}
          title={isRecording ? 'Listening... click to stop' : 'Speak via microphone'}
        >
          {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Speak or type your sentence here..."
          className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500 placeholder-slate-500 shadow-inner"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim() || isLoading}
          className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-2xl shadow-lg shadow-indigo-600/30 transition shrink-0"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { 
  Mic, 
  MessageSquare, 
  BookOpen, 
  Award, 
  Flame, 
  Volume2, 
  Sparkles, 
  GraduationCap,
  Layers
} from 'lucide-react';

export type ActiveTab = 'pronounce' | 'roleplay' | 'sentences' | 'vocab' | 'ielts' | 'tutor';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  accent: 'en-US' | 'en-GB';
  setAccent: (accent: 'en-US' | 'en-GB') => void;
  streak: number;
  totalSpokenCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  accent,
  setAccent,
  streak,
  totalSpokenCount
}) => {
  const navItems = [
    { id: 'pronounce' as ActiveTab, label: 'Pronunciation Lab', bangla: 'উচ্চারণ ল্যাব', icon: Mic },
    { id: 'roleplay' as ActiveTab, label: 'Roleplay Studio', bangla: 'বাস্তব সংলাপ', icon: MessageSquare },
    { id: 'sentences' as ActiveTab, label: 'Sentence Architect', bangla: 'ভুল ও বাক্য গঠন', icon: Layers },
    { id: 'vocab' as ActiveTab, label: 'Vocab Vault', bangla: 'শব্দভাণ্ডার', icon: BookOpen },
    { id: 'ielts' as ActiveTab, label: 'IELTS Speaking', bangla: 'আইইএলটিএস ড্রিল', icon: Award },
    { id: 'tutor' as ActiveTab, label: 'AI Tutor', bangla: 'এআই মেন্টর', icon: Sparkles }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('pronounce')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg text-white tracking-tight">
                  MorshEd <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">EnglishOS</span>
                </span>
                <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-1.5 py-0.5 rounded font-mono">v1.0</span>
              </div>
              <p className="text-xs text-slate-400 font-bengali hidden sm:block">
                বাঙালিদের স্মার্ট ইংরেজি স্পিকিং ও ফ্লুয়েন্সি প্ল্যাটফর্ম
              </p>
            </div>
          </div>

          {/* Quick Stats & Controls */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Accent Selector */}
            <div className="flex items-center bg-slate-800/80 rounded-lg p-1 border border-slate-700 text-xs font-medium">
              <button
                onClick={() => setAccent('en-US')}
                className={`px-2 py-1 rounded transition-colors flex items-center space-x-1 ${
                  accent === 'en-US' ? 'bg-indigo-600 text-white font-semibold shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="US American Accent"
              >
                <span>🇺🇸 US</span>
              </button>
              <button
                onClick={() => setAccent('en-GB')}
                className={`px-2 py-1 rounded transition-colors flex items-center space-x-1 ${
                  accent === 'en-GB' ? 'bg-indigo-600 text-white font-semibold shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="UK British Accent"
              >
                <span>🇬🇧 UK</span>
              </button>
            </div>

            {/* Streak Badge */}
            <div className="flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-lg text-xs font-bold text-amber-400">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
              <span>{streak} Days</span>
            </div>

            {/* Total Spoken Score */}
            <div className="hidden md:flex items-center space-x-1.5 bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-1 rounded-lg text-xs font-semibold text-indigo-300">
              <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>{totalSpokenCount} Spoken</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 no-scrollbar border-t border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                <span className={`text-[11px] font-bengali ${isActive ? 'text-indigo-200' : 'text-slate-500'}`}>
                  ({item.bangla})
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

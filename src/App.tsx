import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { PronunciationLab } from './components/PronunciationLab';
import { RoleplayStudio } from './components/RoleplayStudio';
import { SentenceArchitect } from './components/SentenceArchitect';
import { VocabularyVault } from './components/VocabularyVault';
import { IeltsDrill } from './components/IeltsDrill';
import { AiTutorChat } from './components/AiTutorChat';
import { Flame, CheckCircle, Volume2, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('pronounce');
  const [accent, setAccent] = useState<'en-US' | 'en-GB'>('en-US');
  const [streak, setStreak] = useState<number>(3);
  const [totalSpokenCount, setTotalSpokenCount] = useState<number>(14);
  const [dailyGoalTarget] = useState<number>(5);
  const [dailyGoalCompleted, setDailyGoalCompleted] = useState<number>(3);

  // Load state from localStorage if available
  useEffect(() => {
    try {
      const savedCount = localStorage.getItem('morshed_spoken_count');
      if (savedCount) setTotalSpokenCount(parseInt(savedCount, 10));

      const savedStreak = localStorage.getItem('morshed_streak');
      if (savedStreak) setStreak(parseInt(savedStreak, 10));
    } catch (e) {}
  }, []);

  const handlePracticeSuccess = () => {
    setTotalSpokenCount(prev => {
      const next = prev + 1;
      try { localStorage.setItem('morshed_spoken_count', next.toString()); } catch (e) {}
      return next;
    });

    setDailyGoalCompleted(prev => Math.min(dailyGoalTarget, prev + 1));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        accent={accent}
        setAccent={setAccent}
        streak={streak}
        totalSpokenCount={totalSpokenCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Daily Progress Tracker Bar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center space-x-2">
                <span>আজকের স্পিকিং লক্ষ্য (Daily Fluency Goal):</span>
                <span className="text-emerald-400 font-mono">{dailyGoalCompleted} / {dailyGoalTarget} Drills</span>
              </div>
              <p className="text-[11px] text-slate-400 font-bengali">
                প্রতিদিন মাত্র ৫টি ইংরেজি উচ্চারণ ও সংলাপ অনুশীলন করলেই অভ্যাসে রূপ নেবে।
              </p>
            </div>
          </div>

          <div className="w-full sm:w-48 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 transition-all duration-500"
              style={{ width: `${(dailyGoalCompleted / dailyGoalTarget) * 100}%` }}
            />
          </div>
        </div>

        {/* Dynamic Tab Views */}
        {activeTab === 'pronounce' && (
          <PronunciationLab accent={accent} onPracticeSuccess={handlePracticeSuccess} />
        )}

        {activeTab === 'roleplay' && (
          <RoleplayStudio accent={accent} onPracticeSuccess={handlePracticeSuccess} />
        )}

        {activeTab === 'sentences' && (
          <SentenceArchitect accent={accent} onPracticeSuccess={handlePracticeSuccess} />
        )}

        {activeTab === 'vocab' && (
          <VocabularyVault accent={accent} onPracticeSuccess={handlePracticeSuccess} />
        )}

        {activeTab === 'ielts' && (
          <IeltsDrill accent={accent} onPracticeSuccess={handlePracticeSuccess} />
        )}

        {activeTab === 'tutor' && (
          <AiTutorChat accent={accent} onPracticeSuccess={handlePracticeSuccess} />
        )}
      </main>

      {/* Global Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 mt-12 text-center text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <span className="font-semibold text-slate-300">MorshEd EnglishOS</span>
          <span>•</span>
          <span className="font-bengali">বাঙালিদের সাবলীল ইংরেজি কথা বলার অপারেটিং সিস্টেম</span>
        </div>
        <p className="text-[11px] text-slate-600">
          Built with Speech Synthesis, Web Speech Recognition, and interactive phonetic pedagogy.
        </p>
      </footer>
    </div>
  );
}

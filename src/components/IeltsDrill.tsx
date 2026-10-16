import React, { useState, useEffect, useRef } from 'react';
import { IELTS_CUE_CARDS, IELTS_PART_1, IeltsCueCard } from '../data/ieltsSpeakingData';
import { speakText, playChime } from '../utils/speechUtils';
import confetti from 'canvas-confetti';
import { 
  Award, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  CheckCircle2,
  BookOpen
} from 'lucide-react';

interface IeltsDrillProps {
  accent: 'en-US' | 'en-GB';
  onPracticeSuccess: () => void;
}

export const IeltsDrill: React.FC<IeltsDrillProps> = ({ accent, onPracticeSuccess }) => {
  const [selectedCueCard, setSelectedCueCard] = useState<IeltsCueCard>(IELTS_CUE_CARDS[0]);
  const [prepTimeLeft, setPrepTimeLeft] = useState<number>(60);
  const [isPrepRunning, setIsPrepRunning] = useState<boolean>(false);
  const [speakTimeLeft, setSpeakTimeLeft] = useState<number>(120);
  const [isSpeakingRunning, setIsSpeakingRunning] = useState<boolean>(false);
  const [spokenTranscript, setSpokenTranscript] = useState<string>('');
  const [showModelAnswer, setShowModelAnswer] = useState<boolean>(false);

  const recognitionRef = useRef<any>(null);

  // 1-min Prep Timer
  useEffect(() => {
    let timer: any;
    if (isPrepRunning && prepTimeLeft > 0) {
      timer = setInterval(() => {
        setPrepTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (prepTimeLeft === 0 && isPrepRunning) {
      setIsPrepRunning(false);
      playChime('beep');
    }
    return () => clearInterval(timer);
  }, [isPrepRunning, prepTimeLeft]);

  // 2-min Speaking Timer
  useEffect(() => {
    let timer: any;
    if (isSpeakingRunning && speakTimeLeft > 0) {
      timer = setInterval(() => {
        setSpeakTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (speakTimeLeft === 0 && isSpeakingRunning) {
      setIsSpeakingRunning(false);
      stopSpeechRecording();
      playChime('success');
      confetti({ particleCount: 50, spread: 80 });
      onPracticeSuccess();
    }
    return () => clearInterval(timer);
  }, [isSpeakingRunning, speakTimeLeft]);

  const startPrepTimer = () => {
    setIsPrepRunning(true);
    playChime('click');
  };

  const resetPrepTimer = () => {
    setIsPrepRunning(false);
    setPrepTimeLeft(60);
  };

  const startSpeakingTimer = () => {
    setSpeakTimeLeft(120);
    setIsSpeakingRunning(true);
    setSpokenTranscript('');

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = accent;
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (e: any) => {
          let text = '';
          for (let i = 0; i < e.results.length; i++) {
            text += e.results[i][0].transcript + ' ';
          }
          setSpokenTranscript(text);
        };

        recognitionRef.current = recognition;
        recognition.start();
      } catch (err) {}
    }
  };

  const stopSpeechRecording = () => {
    setIsSpeakingRunning(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/20 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>IELTS Speaking Band 7.5+ Studio (আইইএলটিএস স্পিকিং প্রস্তুতি)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Master the Part 2 Cue Card & Spoken Fluency
            </h1>
            <p className="text-sm text-slate-300 font-bengali mt-1">
              ১ মিনিট প্রস্তুতি এবং পূর্ণ ২ মিনিট একটানা কথা বলার রিয়েল পরীক্ষার সিমুলেটর।
            </p>
          </div>

          <div className="flex space-x-2">
            {IELTS_CUE_CARDS.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => {
                  setSelectedCueCard(card);
                  resetPrepTimer();
                  setSpeakTimeLeft(120);
                  setIsSpeakingRunning(false);
                  setShowModelAnswer(false);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition border ${
                  selectedCueCard.id === card.id
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                Topic #{idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Cue Card & Timers Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Cue Card Presentation */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30">
                IELTS Speaking Part 2
              </span>
              <span className="text-xs text-slate-400">Target: Band 7.5+</span>
            </div>

            {/* Topic Title */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {selectedCueCard.topic}
              </h2>
              <p className="text-sm text-slate-400 font-bengali mt-1">
                বিষয়: {selectedCueCard.banglaTopic}
              </p>
            </div>

            {/* Bullet Points */}
            <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-800 space-y-2.5">
              <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                You should speak about:
              </span>
              <ul className="space-y-2">
                {selectedCueCard.bulletPoints.map((point, i) => (
                  <li key={i} className="flex items-start space-x-2 text-sm text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bengali Guidance */}
            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl text-xs sm:text-sm text-amber-200/90 font-bengali leading-relaxed space-y-1">
              <strong className="text-amber-400 font-bold block">💡 আইইএলটিএস বিশেষজ্ঞ পরামর্শ:</strong>
              {selectedCueCard.banglaGuidance}
            </div>

            {/* Connecting Phrases */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase text-slate-400">
                Band 8 Discourse Markers & Connectors:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedCueCard.connectingPhrases.map((phrase, i) => (
                  <span
                    key={i}
                    onClick={() => speakText(phrase, { lang: accent })}
                    className="cursor-pointer px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-300 hover:bg-indigo-500/20 transition"
                  >
                    🔊 "{phrase}"
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Prep & Speaking Timers */}
        <div className="lg:col-span-5 space-y-4">
          {/* 1-Minute Prep Timer Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>1-Minute Preparation Timer</span>
              </span>
              <span className="text-xs text-slate-500 font-bengali">নোট নেওয়ার সময়</span>
            </div>

            <div className="text-center py-2">
              <div className="text-4xl font-mono font-extrabold text-amber-400">
                00:{prepTimeLeft < 10 ? `0${prepTimeLeft}` : prepTimeLeft}
              </div>
              <p className="text-xs text-slate-400 font-bengali mt-1">
                {isPrepRunning ? 'নোটবইয়ে সংক্ষেপে বুলেট পয়েন্ট লিখুন...' : 'প্রস্তুতি শুরু করতে Start চাপুন'}
              </p>
            </div>

            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={isPrepRunning ? () => setIsPrepRunning(false) : startPrepTimer}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition flex items-center space-x-1.5"
              >
                {isPrepRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPrepRunning ? 'Pause' : 'Start 1-Min Prep'}</span>
              </button>
              <button
                onClick={resetPrepTimer}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2-Minute Speaking Recorder */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                <Mic className="w-4 h-4 text-emerald-400" />
                <span>2-Minute Real Speaking Simulation</span>
              </span>
              <span className="text-xs text-emerald-400 font-semibold font-mono">
                {Math.floor(speakTimeLeft / 60)}:{speakTimeLeft % 60 < 10 ? `0${speakTimeLeft % 60}` : speakTimeLeft % 60}
              </span>
            </div>

            <div className="text-center py-2">
              <button
                onClick={isSpeakingRunning ? stopSpeechRecording : startSpeakingTimer}
                className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition shadow-lg ${
                  isSpeakingRunning
                    ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse shadow-rose-600/30'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                }`}
              >
                {isSpeakingRunning ? (
                  <>
                    <MicOff className="w-4 h-4" />
                    <span>Speaking in Progress... (Click to Finish)</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    <span>Begin 2-Minute Speech</span>
                  </>
                )}
              </button>
            </div>

            {/* Live Transcript Display */}
            {spokenTranscript && (
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 max-h-36 overflow-y-auto space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Live Transcript:</span>
                <p className="italic">"{spokenTranscript}"</p>
              </div>
            )}

            {/* Toggle Model Answer */}
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowModelAnswer(!showModelAnswer)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold text-indigo-300 flex items-center justify-center space-x-1.5 transition"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{showModelAnswer ? 'Hide Band 8 Answer' : 'Read Band 8 Model Answer'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Band 8 Model Answer Modal / Section */}
      {showModelAnswer && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                Band 8.5 Native Script
              </span>
              <h3 className="text-base font-bold text-white">Examiner-Level Model Answer</h3>
            </div>
            <button
              onClick={() => speakText(selectedCueCard.modelAnswerBand8, { lang: accent })}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-1.5 transition shadow"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Listen Full Model Audio</span>
            </button>
          </div>

          <div className="text-sm text-slate-200 whitespace-pre-line leading-relaxed bg-slate-800/40 p-5 rounded-2xl border border-slate-800">
            {selectedCueCard.modelAnswerBand8}
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-xs text-slate-400">High-scoring Vocabulary:</span>
            {selectedCueCard.vocabularyHighlights.map((vocab, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                ✨ {vocab}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

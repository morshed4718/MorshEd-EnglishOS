import React, { useState, useRef, useEffect } from 'react';
import { ROLEPLAY_SCENARIOS, RoleplayScenario, RoleplayTurn } from '../data/roleplayScenarios';
import { speakText, playChime, calculateMatchScore } from '../utils/speechUtils';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  Mic, 
  MicOff, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  HelpCircle,
  Briefcase,
  Plane,
  Stethoscope,
  Coffee,
  RotateCcw,
  Send,
  MessageCircle
} from 'lucide-react';

interface RoleplayStudioProps {
  accent: 'en-US' | 'en-GB';
  onPracticeSuccess: () => void;
}

export const RoleplayStudio: React.FC<RoleplayStudioProps> = ({ accent, onPracticeSuccess }) => {
  const [selectedScenario, setSelectedScenario] = useState<RoleplayScenario>(ROLEPLAY_SCENARIOS[0]);
  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(0);
  const [userSpokenText, setUserSpokenText] = useState<string>('');
  const [customInputText, setCustomInputText] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [evalScore, setEvalScore] = useState<number | null>(null);
  const [isTurnCompleted, setIsTurnCompleted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const currentTurn: RoleplayTurn = selectedScenario.turns[currentTurnIndex] || selectedScenario.turns[0];

  useEffect(() => {
    // When turn changes, auto-speak the agent's prompt
    resetTurnState();
    if (currentTurn && currentTurn.speaker === 'agent') {
      speakText(currentTurn.englishPrompt, { lang: accent, rate: 0.95 });
    }
  }, [selectedScenario, currentTurnIndex]);

  const resetTurnState = () => {
    setUserSpokenText('');
    setCustomInputText('');
    setEvalScore(null);
    setIsTurnCompleted(false);
    setErrorMessage(null);
  };

  const playPromptAudio = (text: string) => {
    speakText(text, { lang: accent, rate: 0.92 });
  };

  const handleStartRecording = () => {
    setErrorMessage(null);
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorMessage('ব্রাউজারে ভয়েস রেকগনিশন সক্রিয় নয়। Chrome বা Edge ব্রাউজার ব্যবহার করুন।');
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
        setUserSpokenText(transcript);
        evaluateResponse(transcript);
      };

      recognition.onerror = (event: any) => {
        setIsRecording(false);
        setErrorMessage(event.error === 'not-allowed' ? 'মাইক্রোফোন পারমিশন দিন।' : 'কথা স্পষ্ট করে বলুন।');
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      setIsRecording(false);
      setErrorMessage('Could not initialize microphone.');
    }
  };

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsRecording(false);
  };

  const evaluateResponse = (spoken: string) => {
    // Compare with best sample response or length/fluency
    const sampleResponses = currentTurn.sampleResponses || [];
    let bestScore = 65; // base score for speaking
    if (sampleResponses.length > 0) {
      const scores = sampleResponses.map(sr => calculateMatchScore(sr, spoken));
      bestScore = Math.max(...scores, Math.min(100, spoken.split(' ').length * 12));
    }

    setEvalScore(bestScore);
    setIsTurnCompleted(true);

    if (bestScore >= 60) {
      playChime('success');
      onPracticeSuccess();
    }
  };

  const handleManualSubmit = () => {
    if (!customInputText.trim()) return;
    setUserSpokenText(customInputText);
    evaluateResponse(customInputText);
    speakText(customInputText, { lang: accent });
  };

  const handleNextTurn = () => {
    if (currentTurnIndex < selectedScenario.turns.length - 1) {
      setCurrentTurnIndex(prev => prev + 1);
    } else {
      // Completed scenario!
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 }
      });
      playChime('success');
    }
  };

  const getScenarioIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-indigo-400" />;
      case 'Plane': return <Plane className="w-5 h-5 text-sky-400" />;
      case 'Stethoscope': return <Stethoscope className="w-5 h-5 text-rose-400" />;
      default: return <Coffee className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Scenario Category Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ROLEPLAY_SCENARIOS.map((sc) => {
          const isSelected = selectedScenario.id === sc.id;
          return (
            <div
              key={sc.id}
              onClick={() => {
                setSelectedScenario(sc);
                setCurrentTurnIndex(0);
              }}
              className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-950/70 border-indigo-500 shadow-lg shadow-indigo-600/20 ring-1 ring-indigo-500'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
                    {getScenarioIcon(sc.iconName)}
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    {sc.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{sc.title}</h3>
                <p className="text-xs text-slate-300 font-bengali mt-0.5">{sc.banglaTitle}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>{sc.turns.length} Dialogues</span>
                <span className="text-indigo-400 font-medium">প্র্যাকটিস শুরু →</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Conversation Stage */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        {/* Progress Bar & Turn Count */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">
              {selectedScenario.category}
            </span>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2 mt-0.5">
              <span>{selectedScenario.title}</span>
              <span className="text-sm font-normal text-slate-400 font-bengali">
                ({selectedScenario.banglaTitle})
              </span>
            </h2>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400">Turn {currentTurnIndex + 1} of {selectedScenario.turns.length}</span>
            <div className="w-24 sm:w-36 h-2 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${((currentTurnIndex + 1) / selectedScenario.turns.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Dialogue Bubble: Agent (Interviewer / Officer / Waiter) */}
        <div className="flex items-start space-x-4 bg-slate-800/50 p-5 rounded-2xl border border-slate-700/60">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-2xl shrink-0 shadow">
            {currentTurn.avatarText}
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-indigo-300">{currentTurn.name}</span>
              <button
                onClick={() => playPromptAudio(currentTurn.englishPrompt)}
                className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 text-xs font-medium flex items-center space-x-1.5 transition"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Play ({accent})</span>
              </button>
            </div>

            <p className="text-lg font-semibold text-white leading-relaxed">
              "{currentTurn.englishPrompt}"
            </p>

            <div className="text-xs text-slate-300 font-bengali bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              💡 <strong>বাংলা অর্থ:</strong> {currentTurn.banglaMeaning}
            </div>
          </div>
        </div>

        {/* Turn Guide & Tips for Bengali Native Speaker */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wide">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>কীভাবে স্মার্টলি উত্তর দেবেন (Bangla Guidance)</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-200/90 font-bengali leading-relaxed">
            {currentTurn.banglaClue}
          </p>

          {/* Vocabulary highlights */}
          {currentTurn.vocabularyFocus && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs text-slate-400">স্মার্ট ফ্রেজসমূহ:</span>
              {currentTurn.vocabularyFocus.map((vocab, i) => (
                <span
                  key={i}
                  onClick={() => speakText(vocab, { lang: accent })}
                  className="cursor-pointer px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-medium border border-amber-500/30 hover:bg-amber-500/30 transition"
                >
                  🔊 {vocab}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Recommended Sample Answers */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
            Sample Fluent Responses (এভাবে উত্তর দিন):
          </h4>
          <div className="space-y-2">
            {currentTurn.sampleResponses?.map((resp, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-700 hover:border-slate-600 transition"
              >
                <p className="text-xs sm:text-sm text-slate-200 font-medium pr-3">
                  "{resp}"
                </p>
                <button
                  onClick={() => speakText(resp, { lang: accent, rate: 0.9 })}
                  className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition shrink-0"
                  title="Listen to phrase"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* User Recording / Response Zone */}
        <div className="bg-slate-800/50 border border-slate-700/80 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-white">Your Turn to Speak (এখন আপনার বলার পালা)</h4>
              <p className="text-xs text-slate-400 font-bengali">
                মাইক্রোফোনে ক্লিক করে সাবলীলভাবে উত্তর দিন অথবা নিচের বক্সে লিখুন।
              </p>
            </div>

            <button
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition shadow-lg ${
                isRecording
                  ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse shadow-rose-600/30'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
              }`}
            >
              {isRecording ? (
                <>
                  <MicOff className="w-4 h-4" />
                  <span>Recording... (Stop)</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  <span>Speak Your Answer</span>
                </>
              )}
            </button>
          </div>

          {/* Fallback Type & Submit Bar */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={customInputText}
              onChange={(e) => setCustomInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleManualSubmit()}
              placeholder="Or type what you would say in English..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500 placeholder-slate-500"
            />
            <button
              onClick={handleManualSubmit}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-1.5 transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit</span>
            </button>
          </div>

          {errorMessage && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* User Transcript & Feedback */}
          {userSpokenText && (
            <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase text-slate-400">
                  Your Spoken Answer:
                </span>
                {evalScore !== null && (
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Fluency: {evalScore}%
                  </span>
                )}
              </div>
              <p className="text-sm sm:text-base font-semibold text-white">
                "{userSpokenText}"
              </p>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => speakText(userSpokenText, { lang: accent })}
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Hear your sentence spoken</span>
                </button>

                {isTurnCompleted && (
                  <button
                    onClick={handleNextTurn}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-indigo-600/30 transition"
                  >
                    <span>
                      {currentTurnIndex < selectedScenario.turns.length - 1 ? 'Continue to Next Turn →' : 'Complete Scenario 🎉'}
                    </span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { PRONUNCIATION_CHALLENGES, PronunciationChallenge } from '../data/pronunciationData';
import { speakText, stopSpeech, playChime, calculateMatchScore } from '../utils/speechUtils';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  Mic, 
  MicOff, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  HelpCircle,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

interface PronunciationLabProps {
  accent: 'en-US' | 'en-GB';
  onPracticeSuccess: () => void;
}

export const PronunciationLab: React.FC<PronunciationLabProps> = ({ accent, onPracticeSuccess }) => {
  const [selectedChallenge, setSelectedChallenge] = useState<PronunciationChallenge>(PRONUNCIATION_CHALLENGES[0]);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [spokenText, setSpokenText] = useState<string>('');
  const [score, setScore] = useState<number | null>(null);
  const [isPlayingWord, setIsPlayingWord] = useState<string | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Reset state when challenge or sentence changes
    setSpokenText('');
    setScore(null);
    setSpeechError(null);
    if (isRecording) {
      stopRecording();
    }
  }, [selectedChallenge, activeSentenceIndex]);

  const currentDrill = selectedChallenge.drillSentences[activeSentenceIndex] || selectedChallenge.drillSentences[0];

  const handlePlayWord = (word: string) => {
    setIsPlayingWord(word);
    speakText(word, {
      lang: accent,
      rate: 0.85,
      onEnd: () => setIsPlayingWord(null)
    });
  };

  const handlePlaySentence = (sentence: string) => {
    setIsPlayingWord(sentence);
    speakText(sentence, {
      lang: accent,
      rate: 0.88,
      onEnd: () => setIsPlayingWord(null)
    });
  };

  const startRecording = () => {
    setSpeechError(null);
    setSpokenText('');
    setScore(null);

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechError('Web Speech API is not supported in this browser. Please use Chrome or Edge for voice recognition.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = accent;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsRecording(true);
        playChime('beep');
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSpokenText(transcript);
        evaluateSpeech(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsRecording(false);
        if (event.error === 'not-allowed') {
          setSpeechError('মাইক্রোফোন অ্যাক্সেসের অনুমতি নেই। ব্রাউজারে মাইক্রোফোন পারমিশন অন করুন।');
        } else if (event.error === 'no-speech') {
          setSpeechError('কোনো কথা শোনা যায়নি। দয়া করে আবার স্পষ্ট করে বলুন।');
        } else {
          setSpeechError(`Error: ${event.error}. Try speaking clearly into the mic.`);
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e: any) {
      console.error(e);
      setSpeechError('Could not start speech recognition.');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore
      }
    }
    setIsRecording(false);
  };

  const evaluateSpeech = (spoken: string) => {
    const calculatedScore = calculateMatchScore(currentDrill.sentence, spoken);
    setScore(calculatedScore);

    if (calculatedScore >= 80) {
      playChime('success');
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
      onPracticeSuccess();
    } else {
      playChime('incorrect');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome / Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/20 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Bangladeshi Pronunciation Lab (উচ্চারণ সংস্কার কেন্দ্র)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Master Tough Sounds & Native Phonetics
            </h1>
            <p className="text-sm text-slate-300 font-bengali mt-1">
              বাঙালিদের যেসব ইংরেজি ধ্বনিতে সবচেয়ে বেশি দেশি টান থাকে (যেমন F vs P, V vs B, TH, S vs SH) তা নিখুঁত করার বিজ্ঞানসম্মত ল্যাব।
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="flex items-center space-x-3 bg-slate-800/80 border border-slate-700/80 rounded-xl p-3 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
              {PRONUNCIATION_CHALLENGES.length}
            </div>
            <div>
              <div className="text-xs text-slate-400">সাউন্ড চ্যালেঞ্জ</div>
              <div className="text-sm font-semibold text-white">তৈরি করা মডিউল</div>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Selector Pills */}
      <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {PRONUNCIATION_CHALLENGES.map((ch) => {
          const isSelected = selectedChallenge.id === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => {
                setSelectedChallenge(ch);
                setActiveSentenceIndex(0);
              }}
              className={`px-4 py-2.5 rounded-xl text-left transition-all shrink-0 border ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
              }`}
            >
              <div className="text-xs font-mono font-bold text-emerald-400 mb-0.5">{ch.phonetics}</div>
              <div className="text-sm font-semibold whitespace-nowrap">{ch.title}</div>
              <div className="text-[11px] font-bengali text-slate-400 mt-0.5">{ch.banglaTitle}</div>
            </button>
          );
        })}
      </div>

      {/* Main Study & Practice Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Theory & Mouth Mechanics */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                  {selectedChallenge.phonetics}
                </span>
                <h2 className="text-lg font-bold text-white mt-1">
                  {selectedChallenge.banglaTitle}
                </h2>
              </div>
            </div>

            {/* Bangla Explanation */}
            <div className="text-sm text-slate-300 font-bengali leading-relaxed bg-slate-800/40 p-3.5 rounded-xl border border-slate-800">
              {selectedChallenge.banglaExplanation}
            </div>

            {/* Mouth & Tongue Position Tip */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-400 uppercase tracking-wide">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>মুখ ও ঠোঁটের সঠিক ভঙ্গি (Mouth Mechanics)</span>
              </div>
              <p className="text-xs text-amber-200/90 font-bengali leading-relaxed">
                {selectedChallenge.mouthTip}
              </p>
            </div>

            {/* Common Mistake Callout */}
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-xs text-rose-300 font-bengali">
              ⚠️ <strong className="font-semibold text-rose-200">সাধারণ ভুল:</strong> {selectedChallenge.commonMistake}
            </div>
          </div>

          {/* Minimal Pairs Comparison Table */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Minimal Pairs (তুলনামূলক শব্দযুগল)</span>
              <span className="text-xs text-slate-400 font-normal">ক্লিক করে শুনুন</span>
            </h3>

            <div className="space-y-2">
              {selectedChallenge.pairs.map((pair, idx) => (
                <div key={idx} className="grid grid-cols-2 gap-2 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
                  {/* Word A */}
                  <div className="flex items-center justify-between bg-slate-900/70 p-2 rounded-lg border border-slate-800">
                    <div>
                      <div className="text-sm font-bold text-white">{pair.wordA}</div>
                      <div className="text-[11px] font-mono text-indigo-400">{pair.ipaA}</div>
                      <div className="text-[11px] font-bengali text-slate-400">{pair.meaningA}</div>
                    </div>
                    <button
                      onClick={() => handlePlayWord(pair.wordA)}
                      className="p-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 transition"
                      title="Listen"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Word B */}
                  <div className="flex items-center justify-between bg-slate-900/70 p-2 rounded-lg border border-slate-800">
                    <div>
                      <div className="text-sm font-bold text-white">{pair.wordB}</div>
                      <div className="text-[11px] font-mono text-emerald-400">{pair.ipaB}</div>
                      <div className="text-[11px] font-bengali text-slate-400">{pair.meaningB}</div>
                    </div>
                    <button
                      onClick={() => handlePlayWord(pair.wordB)}
                      className="p-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 transition"
                      title="Listen"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Voice Drill & AI Speech Recognition */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            {/* Header with drill pagination */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  Sentence Drill #{activeSentenceIndex + 1} of {selectedChallenge.drillSentences.length}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  {currentDrill.difficulty}
                </span>
              </div>

              {/* Next/Prev buttons */}
              <div className="flex items-center space-x-2">
                <button
                  disabled={activeSentenceIndex === 0}
                  onClick={() => setActiveSentenceIndex(prev => prev - 1)}
                  className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 text-xs"
                >
                  Prev
                </button>
                <button
                  disabled={activeSentenceIndex >= selectedChallenge.drillSentences.length - 1}
                  onClick={() => setActiveSentenceIndex(prev => prev + 1)}
                  className="px-2.5 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-40 text-xs font-medium"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Target Sentence Box */}
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 space-y-3 text-center">
              <span className="text-xs text-indigo-400 uppercase font-semibold tracking-wider">
                Target Sentence to Pronounce
              </span>
              <p className="text-xl sm:text-2xl font-bold text-white tracking-wide leading-relaxed">
                "{currentDrill.sentence}"
              </p>
              <p className="text-sm text-slate-300 font-bengali">
                অর্থ: {currentDrill.banglaMeaning}
              </p>

              {/* Key Words to Nail */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-1.5">
                <span className="text-xs text-slate-400">বিশেষ ফোকাস শব্দ:</span>
                {currentDrill.focusWords.map((w, idx) => (
                  <span
                    key={idx}
                    onClick={() => handlePlayWord(w)}
                    className="cursor-pointer px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold hover:bg-indigo-500/30 transition"
                  >
                    🔊 {w}
                  </span>
                ))}
              </div>

              {/* Action Buttons: Listen & Record */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => handlePlaySentence(currentDrill.sentence)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm flex items-center space-x-2 border border-slate-700 shadow-sm transition"
                >
                  <Volume2 className="w-4 h-4 text-indigo-400" />
                  <span>Listen Model ({accent})</span>
                </button>

                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center space-x-2 transition shadow-lg ${
                    isRecording
                      ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse shadow-rose-600/40 ring-4 ring-rose-500/20'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                  }`}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="w-4 h-4" />
                      <span>Listening... (Click to Stop)</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4" />
                      <span>Start Speaking Practice</span>
                    </>
                  )}
                </button>
              </div>

              {isRecording && (
                <div className="text-xs text-emerald-400 animate-pulse mt-2 font-medium">
                  🎙️ Microphone is active — read the target sentence aloud clearly!
                </div>
              )}
            </div>

            {/* Error Message if any */}
            {speechError && (
              <div className="bg-rose-500/10 border border-rose-500/30 p-3.5 rounded-xl text-rose-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{speechError}</span>
              </div>
            )}

            {/* Results & Feedback Box */}
            {spokenText && (
              <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold uppercase text-slate-400">
                    What we heard you say (আপনার উচ্চারিত বাক্য):
                  </div>
                  {score !== null && (
                    <div
                      className={`text-sm font-extrabold px-3 py-1 rounded-full border ${
                        score >= 80
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : score >= 60
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                      }`}
                    >
                      Score: {score}% Match
                    </div>
                  )}
                </div>

                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 font-medium text-white text-base">
                  "{spokenText}"
                </div>

                {/* Score Commentary */}
                {score !== null && (
                  <div className="space-y-2">
                    {score >= 80 ? (
                      <div className="flex items-start space-x-2 text-emerald-300 text-xs sm:text-sm font-bengali bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong>অসাধারণ উচ্চারণ!</strong> আপনার ধ্বনি ও শব্দের স্পষ্টতা আন্তর্জাতিক মানের কাছাকাছি এসেছে। এই গতি ধরে রাখুন!
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start space-x-2 text-amber-300 text-xs sm:text-sm font-bengali bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
                        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong>আরেকটু চেষ্টা করুন:</strong> কিছু শব্দের উচ্চারণে দেশি টান বা অস্পষ্টতা রয়েছে। মডেল অডিওটি আবার শুনুন এবং ঠোঁট-দাঁতের ভঙ্গি খেয়াল করে আবার বলুন।
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

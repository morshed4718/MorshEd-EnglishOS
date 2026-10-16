import React, { useState } from 'react';
import { COMMON_MISTAKES, SENTENCE_PUZZLES, CommonMistakeItem, SentenceBuilderPuzzle } from '../data/sentenceMasterData';
import { speakText, playChime } from '../utils/speechUtils';
import confetti from 'canvas-confetti';
import { 
  Check, 
  X, 
  Volume2, 
  Sparkles, 
  Layers, 
  Search, 
  HelpCircle, 
  RotateCcw,
  BookCheck,
  ArrowRight
} from 'lucide-react';

interface SentenceArchitectProps {
  accent: 'en-US' | 'en-GB';
  onPracticeSuccess: () => void;
}

export const SentenceArchitect: React.FC<SentenceArchitectProps> = ({ accent, onPracticeSuccess }) => {
  const [activeSubTab, setActiveSubTab] = useState<'mistakes' | 'builder' | 'quiz'>('mistakes');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Sentence Builder State
  const [puzzleIndex, setPuzzleIndex] = useState<number>(0);
  const currentPuzzle: SentenceBuilderPuzzle = SENTENCE_PUZZLES[puzzleIndex];
  const [availableWords, setAvailableWords] = useState<string[]>([...currentPuzzle.scrambledWords]);
  const [constructedWords, setConstructedWords] = useState<string[]>([]);
  const [builderStatus, setBuilderStatus] = useState<'idle' | 'success' | 'wrong'>('idle');

  // Quick Quiz State
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);

  // Filter mistakes
  const categories = ['All', 'Literal Translation (Banglish)', 'Grammar', 'Prepositions', 'Vocabulary'];
  const filteredMistakes = COMMON_MISTAKES.filter(m => {
    const matchesCat = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesSearch = m.incorrect.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.correct.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.banglaMeaning.includes(searchTerm) ||
                          m.banglaExplanation.includes(searchTerm);
    return matchesCat && matchesSearch;
  });

  // Builder actions
  const handleWordSelect = (word: string, indexInAvailable: number) => {
    if (builderStatus === 'success') return;
    setConstructedWords(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter((_, idx) => idx !== indexInAvailable));
    setBuilderStatus('idle');
  };

  const handleWordRemove = (word: string, indexInConstructed: number) => {
    if (builderStatus === 'success') return;
    setConstructedWords(prev => prev.filter((_, idx) => idx !== indexInConstructed));
    setAvailableWords(prev => [...prev, word]);
    setBuilderStatus('idle');
  };

  const handleResetBuilder = () => {
    setAvailableWords([...currentPuzzle.scrambledWords]);
    setConstructedWords([]);
    setBuilderStatus('idle');
  };

  const handleCheckBuilder = () => {
    const constructedSentence = constructedWords.join(' ').trim().toLowerCase();
    const target = currentPuzzle.targetEnglish.trim().toLowerCase();

    if (constructedSentence === target) {
      setBuilderStatus('success');
      playChime('success');
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
      speakText(currentPuzzle.targetEnglish, { lang: accent });
      onPracticeSuccess();
    } else {
      setBuilderStatus('wrong');
      playChime('incorrect');
    }
  };

  const handleNextPuzzle = () => {
    const nextIdx = (puzzleIndex + 1) % SENTENCE_PUZZLES.length;
    setPuzzleIndex(nextIdx);
    setAvailableWords([...SENTENCE_PUZZLES[nextIdx].scrambledWords]);
    setConstructedWords([]);
    setBuilderStatus('idle');
  };

  // Quiz actions
  const currentQuizItem = COMMON_MISTAKES[quizIndex % COMMON_MISTAKES.length];
  // Generate random order of correct vs incorrect
  const quizOptions = React.useMemo(() => {
    return [
      { text: currentQuizItem.correct, isCorrect: true },
      { text: currentQuizItem.incorrect, isCorrect: false }
    ].sort(() => Math.random() - 0.5);
  }, [quizIndex]);

  const handleQuizAnswer = (isCorrect: boolean, text: string) => {
    if (quizAnswered) return;
    setSelectedQuizOption(text);
    setQuizAnswered(true);

    if (isCorrect) {
      playChime('success');
      setQuizScore(prev => prev + 1);
      onPracticeSuccess();
    } else {
      playChime('incorrect');
    }
  };

  const handleNextQuizQuestion = () => {
    setQuizIndex(prev => prev + 1);
    setSelectedQuizOption(null);
    setQuizAnswered(false);
  };

  return (
    <div className="space-y-6">
      {/* Sub navigation tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveSubTab('mistakes')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center space-x-2 ${
              activeSubTab === 'mistakes'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookCheck className="w-4 h-4" />
            <span>Top Banglish Mistakes (ভুল সংশোধন)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('builder')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center space-x-2 ${
              activeSubTab === 'builder'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Sentence Builder (বাক্য গঠন)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('quiz')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center space-x-2 ${
              activeSubTab === 'quiz'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Mistakes Quiz (দ্রুত কুইজ)</span>
          </button>
        </div>
      </div>

      {/* 1. MISTAKES EXPLORER */}
      {activeSubTab === 'mistakes' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search mistakes (e.g., agree, tell, since, phone)..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500 placeholder-slate-500"
              />
            </div>

            <div className="flex space-x-1 overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Mistakes Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMistakes.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 shadow-lg space-y-4 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-400 font-bengali">{item.banglaMeaning}</span>
                </div>

                {/* Incorrect vs Correct */}
                <div className="space-y-2">
                  {/* Incorrect Box */}
                  <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                    <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 block">
                        ভুল ব্যবহার (Avoid):
                      </span>
                      <p className="text-sm font-semibold text-rose-200 line-through">
                        {item.incorrect}
                      </p>
                    </div>
                  </div>

                  {/* Correct Box */}
                  <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                          সঠিক রূপ (Use):
                        </span>
                        <button
                          onClick={() => speakText(item.correct, { lang: accent })}
                          className="p-1 rounded-md bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 transition"
                          title="Listen to correct sentence"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-sm font-bold text-white">
                        {item.correct}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Explanation */}
                <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800/80 space-y-1">
                  <div className="text-xs font-semibold text-amber-300 flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>কেন এই ভুল হয়? (Bengali Explanation)</span>
                  </div>
                  <p className="text-xs text-slate-300 font-bengali leading-relaxed">
                    {item.banglaExplanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. SENTENCE BUILDER */}
      {activeSubTab === 'builder' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs text-indigo-400 uppercase font-semibold">
                Puzzle {puzzleIndex + 1} of {SENTENCE_PUZZLES.length}
              </span>
              <h3 className="text-lg font-bold text-white">Arrange the Words into Fluent English</h3>
            </div>
            <button
              onClick={handleNextPuzzle}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white flex items-center space-x-1"
            >
              <span>Next Puzzle</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bengali Source Prompt */}
          <div className="bg-gradient-to-r from-indigo-950/50 to-slate-900 p-5 rounded-2xl border border-indigo-500/20 text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              বাংলা ভাবার্থ:
            </span>
            <p className="text-xl sm:text-2xl font-bold text-white font-bengali">
              "{currentPuzzle.banglaPrompt}"
            </p>
          </div>

          {/* Dropzone (Constructed Sentence) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">
                Your Sentence Assembly (শব্দগুলো সাজান):
              </span>
              {constructedWords.length > 0 && (
                <button
                  onClick={handleResetBuilder}
                  className="text-xs text-rose-400 hover:underline flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Words</span>
                </button>
              )}
            </div>

            <div className={`min-h-[70px] p-4 rounded-2xl border-2 border-dashed flex flex-wrap gap-2 items-center transition ${
              builderStatus === 'success'
                ? 'border-emerald-500 bg-emerald-500/10'
                : builderStatus === 'wrong'
                ? 'border-rose-500 bg-rose-500/10'
                : 'border-slate-700 bg-slate-950/70'
            }`}>
              {constructedWords.length === 0 ? (
                <span className="text-xs text-slate-500 font-medium">
                  নিচের শব্দগুলোতে ক্লিক করে বাক্য গঠন করুন...
                </span>
              ) : (
                constructedWords.map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleWordRemove(word, idx)}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm shadow hover:bg-rose-600 transition flex items-center space-x-1"
                    title="Click to remove"
                  >
                    <span>{word}</span>
                    <span className="text-xs opacity-60">×</span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Available Word Tiles */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400">Available Words:</span>
            <div className="flex flex-wrap gap-2 p-4 bg-slate-800/40 rounded-2xl border border-slate-800">
              {availableWords.map((word, idx) => (
                <button
                  key={idx}
                  onClick={() => handleWordSelect(word, idx)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-sm transition hover:scale-105 active:scale-95 shadow-sm"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {/* Check and Grammar Tip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <button
              onClick={handleCheckBuilder}
              disabled={constructedWords.length === 0}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition flex items-center justify-center space-x-2"
            >
              <Check className="w-4 h-4" />
              <span>Check Answer</span>
            </button>

            {builderStatus === 'success' && (
              <div className="text-sm font-bold text-emerald-400 font-bengali animate-bounce">
                🎉 একদম সঠিক! দারুণ বাক্য গঠন করেছেন।
              </div>
            )}

            {builderStatus === 'wrong' && (
              <div className="text-sm font-bold text-rose-400 font-bengali">
                ❌ বাক্যটি মেলেনি। ব্যাকরণ খেয়াল করে পুনরায় চেষ্টা করুন।
              </div>
            )}
          </div>

          {/* Grammar breakdown tip */}
          {builderStatus === 'success' && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ব্যাকরণগত নোট (Grammar Master Tip)</span>
              </span>
              <p className="text-xs text-slate-300 font-bengali leading-relaxed">
                {currentPuzzle.grammarTipBangla}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 3. QUICK MISTAKES QUIZ */}
      {activeSubTab === 'quiz' && (
        <div className="max-w-2xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono text-indigo-400">Question #{quizIndex + 1}</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
              Score: {quizScore} Correct
            </span>
          </div>

          <div className="text-center space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Which sentence is grammatically correct?
            </span>
            <p className="text-lg font-bold text-white font-bengali">
              ভাবার্থ: "{currentQuizItem.banglaMeaning}"
            </p>
          </div>

          <div className="space-y-3">
            {quizOptions.map((opt, idx) => {
              const isSelected = selectedQuizOption === opt.text;
              return (
                <button
                  key={idx}
                  onClick={() => handleQuizAnswer(opt.isCorrect, opt.text)}
                  className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition ${
                    quizAnswered
                      ? opt.isCorrect
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200'
                        : isSelected
                        ? 'bg-rose-500/20 border-rose-500 text-rose-200'
                        : 'bg-slate-800/40 border-slate-800 text-slate-400'
                      : 'bg-slate-800/70 border-slate-700 text-white hover:border-indigo-500 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt.text}</span>
                    {quizAnswered && opt.isCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                    {quizAnswered && isSelected && !opt.isCorrect && <X className="w-4 h-4 text-rose-400" />}
                  </div>
                </button>
              );
            })}
          </div>

          {quizAnswered && (
            <div className="space-y-4 pt-2">
              <div className="p-3 bg-slate-800/70 rounded-xl text-xs text-slate-300 font-bengali border border-slate-700">
                💡 <strong>নিয়ম:</strong> {currentQuizItem.banglaExplanation}
              </div>

              <button
                onClick={handleNextQuizQuestion}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition"
              >
                Next Question →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

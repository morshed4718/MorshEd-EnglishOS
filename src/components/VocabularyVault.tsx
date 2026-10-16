import React, { useState } from 'react';
import { VOCABULARY_LIST, VocabWord } from '../data/vocabularyData';
import { speakText } from '../utils/speechUtils';
import { 
  Volume2, 
  Search, 
  Star, 
  BookOpen, 
  Layers, 
  Sparkles, 
  RotateCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface VocabularyVaultProps {
  accent: 'en-US' | 'en-GB';
  onPracticeSuccess: () => void;
}

export const VocabularyVault: React.FC<VocabularyVaultProps> = ({ accent, onPracticeSuccess }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'flashcard'>('grid');
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const levels = ['All', 'Beginner (A1-A2)', 'Intermediate (B1-B2)', 'Advanced & IELTS (C1)'];

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredWords = VOCABULARY_LIST.filter(word => {
    const matchesLevel = selectedLevel === 'All' || word.level === selectedLevel;
    const matchesSearch = word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          word.banglaMeaning.includes(searchTerm) ||
                          word.banglaPhonetic.includes(searchTerm);
    return matchesLevel && matchesSearch;
  });

  const currentFlashcard = filteredWords[flashcardIndex] || filteredWords[0];

  const handleNextFlashcard = () => {
    setIsFlipped(false);
    setFlashcardIndex(prev => (prev + 1) % filteredWords.length);
  };

  const handlePrevFlashcard = () => {
    setIsFlipped(false);
    setFlashcardIndex(prev => (prev - 1 + filteredWords.length) % filteredWords.length);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search words (e.g. resilient, hesitate, দৃষ্টিভঙ্গি)..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500 placeholder-slate-500"
          />
        </div>

        {/* Level Filters */}
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1 overflow-x-auto no-scrollbar">
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setSelectedLevel(lvl);
                  setFlashcardIndex(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition ${
                  selectedLevel === lvl
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded text-xs transition ${
                viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
              title="Grid View"
            >
              <BookOpen className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('flashcard')}
              className={`p-1.5 rounded text-xs transition ${
                viewMode === 'flashcard' ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
              title="Flashcards Mode"
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* FLASHCARD MODE */}
      {viewMode === 'flashcard' && filteredWords.length > 0 && (
        <div className="max-w-xl mx-auto space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <span>Card {flashcardIndex + 1} of {filteredWords.length}</span>
            <span>Click to flip card 🔄</span>
          </div>

          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer bg-gradient-to-br from-slate-900 to-indigo-950/60 border border-slate-700/80 rounded-3xl p-8 min-h-[300px] flex flex-col justify-between shadow-2xl relative transition hover:border-indigo-500"
          >
            {/* Top row */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                {currentFlashcard.level}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speakText(currentFlashcard.word, { lang: accent });
                }}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-400"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Front or Back Content */}
            {!isFlipped ? (
              <div className="text-center py-6 space-y-2">
                <h2 className="text-4xl font-extrabold text-white tracking-tight">
                  {currentFlashcard.word}
                </h2>
                <p className="text-sm font-mono text-indigo-400">
                  {currentFlashcard.ipa}
                </p>
                <div className="text-xs text-emerald-400 font-bengali">
                  উচ্চারণ বাংলায়: <strong>{currentFlashcard.banglaPhonetic}</strong>
                </div>
                <div className="pt-4 text-xs text-slate-400">
                  (অর্থ ও উদাহরণ দেখতে কার্ডের ওপর ক্লিক করুন)
                </div>
              </div>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="text-2xl font-bold text-emerald-300 font-bengali">
                  {currentFlashcard.banglaMeaning}
                </div>
                <p className="text-xs text-slate-300">
                  "{currentFlashcard.exampleSentence}"
                </p>
                <p className="text-xs text-slate-400 font-bengali">
                  ({currentFlashcard.exampleBangla})
                </p>
                <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-amber-300 font-bengali mt-2">
                  💡 {currentFlashcard.banglaTip}
                </div>
              </div>
            )}

            {/* Bottom info */}
            <div className="text-center text-xs text-slate-500">
              MorshEd Spoken Vault
            </div>
          </div>

          {/* Flashcard Nav controls */}
          <div className="flex items-center justify-center space-x-4 pt-2">
            <button
              onClick={handlePrevFlashcard}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5"
            >
              <RotateCw className="w-4 h-4" />
              <span>Flip Card</span>
            </button>
            <button
              onClick={handleNextFlashcard}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWords.map((item) => {
            const isFav = favorites.has(item.id);
            return (
              <div
                key={item.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg space-y-3 flex flex-col justify-between transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      {item.level}
                    </span>
                    <button
                      onClick={(e) => toggleFavorite(item.id, e)}
                      className="text-slate-500 hover:text-amber-400 transition"
                    >
                      <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  </div>

                  {/* Word & Pronunciation */}
                  <div className="flex items-baseline justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight">{item.word}</h3>
                      <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono mt-0.5">
                        <span>{item.ipa}</span>
                        <span>•</span>
                        <span className="font-bengali text-emerald-400 font-semibold">{item.banglaPhonetic}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => speakText(item.word, { lang: accent })}
                      className="p-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 transition"
                      title="Pronounce word"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bangla Meaning */}
                  <div className="text-sm font-bold text-emerald-300 font-bengali mt-2">
                    {item.banglaMeaning}
                  </div>

                  {/* Example */}
                  <div className="mt-3 bg-slate-800/40 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 uppercase font-semibold">Example</span>
                      <button
                        onClick={() => speakText(item.exampleSentence, { lang: accent })}
                        className="text-indigo-400 hover:text-indigo-300"
                        title="Listen to sentence"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="font-medium italic">"{item.exampleSentence}"</p>
                    <p className="text-slate-400 font-bengali text-[11px]">({item.exampleBangla})</p>
                  </div>
                </div>

                {/* Bangla Tip */}
                <div className="pt-2 border-t border-slate-800 text-[11px] text-amber-200/90 font-bengali">
                  💡 {item.banglaTip}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

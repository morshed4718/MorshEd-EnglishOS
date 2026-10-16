// Web Speech Synthesis (Text-to-Speech)
export function speakText(
  text: string,
  options: {
    lang?: 'en-US' | 'en-GB' | 'en-IN';
    rate?: number;
    pitch?: number;
    onEnd?: () => void;
  } = {}
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('SpeechSynthesis not supported on this browser.');
    return;
  }

  window.speechSynthesis.cancel(); // Stop any active speech

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = options.lang || 'en-US';
  utterance.rate = options.rate ?? 0.95; // Slightly slower for clear English learning
  utterance.pitch = options.pitch ?? 1.0;

  // Attempt to select a natural voice
  const voices = window.speechSynthesis.getVoices();
  const targetVoice = voices.find(
    (v) => v.lang.startsWith(options.lang || 'en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Daniel'))
  ) || voices.find((v) => v.lang.startsWith(options.lang || 'en'));

  if (targetVoice) {
    utterance.voice = targetVoice;
  }

  if (options.onEnd) {
    utterance.onend = options.onEnd;
  }

  window.speechSynthesis.speak(utterance);
}

// Stop any speaking audio
export function stopSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// Play UI pleasant tones using Web Audio API
export function playChime(type: 'success' | 'incorrect' | 'click' | 'beep') {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (type === 'success') {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'incorrect') {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(311.13, now); // Eb4
      osc.frequency.setValueAtTime(277.18, now + 0.15); // C#4
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'beep') {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch (e) {
    // Audio context may be restricted before user gesture
  }
}

// Calculate similarity between two strings (0 to 100%)
export function calculateMatchScore(target: string, spoken: string): number {
  const cleanTarget = target.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
  const cleanSpoken = spoken.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();

  if (!cleanTarget || !cleanSpoken) return 0;
  if (cleanTarget === cleanSpoken) return 100;

  const targetWords = cleanTarget.split(/\s+/);
  const spokenWords = cleanSpoken.split(/\s+/);

  let matchedWords = 0;
  targetWords.forEach(w => {
    if (spokenWords.includes(w)) {
      matchedWords++;
    }
  });

  const wordOverlapScore = (matchedWords / targetWords.length) * 100;

  // Character Levenshtein distance check for fine granularity
  const matrix: number[][] = [];
  const n = cleanTarget.length;
  const m = cleanSpoken.length;

  for (let i = 0; i <= n; i++) matrix[i] = [i];
  for (let j = 0; j <= m; j++) matrix[0][j] = j;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const cost = cleanTarget[i - 1] === cleanSpoken[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  const levScore = Math.max(0, 100 - (matrix[n][m] / Math.max(n, m)) * 100);

  return Math.round((wordOverlapScore * 0.6) + (levScore * 0.4));
}

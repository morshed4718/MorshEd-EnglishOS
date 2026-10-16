import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

app.use(cors());
app.use(express.json());

// Initialize Google GenAI client if API key is present
const apiKey = process.env.GEMINI_API_KEY || '';
let genAI: GoogleGenAI | null = null;
if (apiKey) {
  try {
    genAI = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('[AI Studio] Could not initialize GoogleGenAI with key:', err);
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'MorshEd EnglishOS',
    aiEnabled: Boolean(apiKey),
    timestamp: new Date().toISOString()
  });
});

// AI Tutor chat & pronunciation coaching endpoint
app.post('/api/tutor', async (req, res) => {
  const { message, history, context, scenario, focusLanguage } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  // System instruction specifically customized for Bengali native speakers learning English
  const systemPrompt = `You are "MorshEd English Tutor" — an expert, ultra-encouraging English speaking and pronunciation mentor specifically dedicated to helping Bengali native speakers master spoken English, overcome typical "Banglish" hesitations, master IELTS speaking, and gain unshakable confidence.

Key Characteristics of Bengali Learners you coach on:
1. Phonetic traps:
   - 'P' vs 'F' (Bengalis often pronounce 'F' as a bilabial 'P' / ফ / প).
   - 'V' vs 'B' (Bengalis often confuse 'V' with 'B' / ভ / ব, saying "Berry good" instead of "Very good").
   - 'Th' /θ/ & /ð/ (confused with 'T' / ট / থ or 'D' / ড / দ, saying "tink" instead of "think").
   - 'S' vs 'Sh' /ʃ/ (often mixing স and শ).
   - 'Z' vs 'J' (saying "pleajure" or "joo" instead of "zoo").
   - Silent letters ('Wednesday', 'Doubt', 'Debt', 'Subtle', 'Receipt', 'Listen').
2. Common Grammatical Pitfalls:
   - Saying "I am agree" instead of "I agree".
   - Saying "He told to me" instead of "He told me" or "He said to me".
   - Saying "I am living here since 3 years" instead of "I have been living here for 3 years".
   - Saying "He do" instead of "He does".
   - Double comparatives ("more better", "more taller").
   - Overusing "actually", "basically", "you know".

Your Response Format:
1. Conversational Reply: Reply naturally in fluent, accessible English, continuing the roleplay or conversation.
2. Bengali Support: Provide brief, friendly Bengali guidance/translation (বাংলা সহায়তা) so the learner feels 100% understood.
3. Grammar/Pronunciation Tip: Point out 1 quick constructive fix if the user made any grammatical or phrasing error, with the exact correction.
4. Next Speaking Prompt: Give 1 simple question or prompt for the user to practice speaking next.

Keep responses warm, enthusiastic, concise (under 120 words), and easy to read.`;

  if (genAI && apiKey) {
    try {
      const chatMessages = (history || []).map((h: { role: string; text: string }) => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.text }]
      }));

      chatMessages.push({
        role: 'user',
        parts: [{ text: `[Current Scenario: ${scenario || 'General Spoken Practice'}]\nLearner: ${message}` }]
      });

      const response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: chatMessages,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        }
      });

      const replyText = response.text || 'I hear you loud and clear! Let us keep practicing!';
      return res.json({ reply: replyText });
    } catch (err: any) {
      console.error('[API Tutor Error]:', err?.message || err);
      // Fallback below
    }
  }

  // Intelligent fallback rule engine if no API key or API call failed
  const userLower = message.toLowerCase().trim();
  let fallbackReply = '';
  let banglaHint = '';

  if (userLower.includes('agree') && (userLower.includes('am agree') || userLower.includes('is agree'))) {
    fallbackReply = `Great point! Quick tip: In English, we say **"I agree"** (never "I am agree"). In Bengali we say "আমি একমত", but in English "agree" is already an active verb!`;
    banglaHint = `মনে রাখবেন: "I am agree" ভুল, সঠিক হলো "I agree"।`;
  } else if (userLower.includes('since') && /\d+\s*(years|months|days)/i.test(userLower)) {
    fallbackReply = `Excellent! Notice this small rule: for a duration of time (e.g., 3 years), use **"for"** instead of "since". For example: *"I have been learning English for 3 years"*. Use *"since"* for a specific starting point like *"since 2021"*.`;
    banglaHint = `সময়কাল (৩ বছর) হলে 'for' বসে, আর শুরুর পয়েন্ট (২০২১ সাল) হলে 'since' বসে।`;
  } else if (userLower.includes('tell to') || userLower.includes('said me')) {
    fallbackReply = `I understand your message clearly! Note: Say **"He told me"** (no 'to') or **"He said to me"**.`;
    banglaHint = `'Told'-এর সাথে 'to' বসে না। 'He told me' বলুন।`;
  } else if (userLower.includes('hi') || userLower.includes('hello') || userLower.includes('hey')) {
    fallbackReply = `Hello there! Welcome to MorshEd EnglishOS. I am your personal English tutor. How was your day, and what topic would you like to speak about today? (e.g. Job Interview, IELTS, or Daily Routine?)`;
    banglaHint = `কেমন আছেন? আজকের স্পিকিং প্র্যাকটিস শুরু করার জন্য প্রস্তুত?`;
  } else if (userLower.includes('ielts') || userLower.includes('cue card')) {
    fallbackReply = `IELTS Speaking test requires 4 key things: Fluency & Coherence, Lexical Resource (Vocabulary), Grammatical Range, and Pronunciation. When answering, use the PEEL method: Point, Explain, Example, Link back to topic. What topic would you like to practice?`;
    banglaHint = `আইইএলটিএস-এ ভালো ব্যান্ডের জন্য দীর্ঘ ও স্বাভাবিক বাক্য বলুন।`;
  } else {
    fallbackReply = `That is a wonderful thought! You expressed it well. To sound even more natural and fluent, try expanding with a linking phrase like *"Furthermore,"* or *"In addition to that,"*. Could you tell me more about that in one or two sentences?`;
    banglaHint = `আপনার উত্তরটি খুব চমৎকার হয়েছে! বাক্য আরও সুন্দর করতে কানেক্টিং ওয়ার্ড ব্যবহার করুন।`;
  }

  return res.json({
    reply: `${fallbackReply}\n\n💡 **বাংলা টিপ:** ${banglaHint}`
  });
});

// Configure Vite middleware in development or serve static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`[MorshEd-EnglishOS] Dev server running on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

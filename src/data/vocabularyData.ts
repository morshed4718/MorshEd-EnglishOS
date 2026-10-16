export interface VocabWord {
  id: string;
  word: string;
  level: 'Beginner (A1-A2)' | 'Intermediate (B1-B2)' | 'Advanced & IELTS (C1)';
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'idiom';
  ipa: string;
  banglaPhonetic: string;
  banglaMeaning: string;
  englishDefinition: string;
  exampleSentence: string;
  exampleBangla: string;
  synonyms: string[];
  banglaTip: string;
}

export const VOCABULARY_LIST: VocabWord[] = [
  {
    id: 'vocab-1',
    word: 'Appreciate',
    level: 'Beginner (A1-A2)',
    partOfSpeech: 'verb',
    ipa: '/əˈpriːʃieɪt/',
    banglaPhonetic: 'অ্যাপ্রিশিয়েট',
    banglaMeaning: 'প্রশংসা করা বা আন্তরিক কৃতজ্ঞতা প্রকাশ করা',
    englishDefinition: 'To recognize the full worth of someone or something; to be grateful for.',
    exampleSentence: 'I deeply appreciate your valuable time and advice.',
    exampleBangla: 'আপনার মূল্যবান সময় এবং উপদেশের জন্য আমি আন্তরিকভাবে কৃতজ্ঞ।',
    synonyms: ['Value', 'Acknowledge', 'Cherish'],
    banglaTip: '“Thank you” এর চেয়ে “I truly appreciate this” শুনলে অনেক বেশি প্রফেশনাল ও মার্জিত মনে হয়।'
  },
  {
    id: 'vocab-2',
    word: 'Resilient',
    level: 'Advanced & IELTS (C1)',
    partOfSpeech: 'adjective',
    ipa: '/rɪˈzɪliənt/',
    banglaPhonetic: 'রিযিলিয়েন্ট',
    banglaMeaning: 'স্থিতিস্থাপক, প্রতিকূলতা কাটিয়ে ওঠার অদম্য ক্ষমতা সম্পন্ন',
    englishDefinition: 'Able to withstand or recover quickly from difficult conditions.',
    exampleSentence: 'The people of Bangladesh are extraordinarily resilient in times of natural disasters.',
    exampleBangla: 'প্রাকৃতিক দুর্যোগের সময়ে বাংলাদেশের মানুষ অসাধারণ ধৈর্য ও অদম্য সাহসের পরিচয় দেয়।',
    synonyms: ['Tough', 'Strong-willed', 'Adaptive'],
    banglaTip: 'IELTS Speaking ও Writing এ ব্যান্ড ৮ পেতে “strong person” না বলে “resilient individual” বলুন।'
  },
  {
    id: 'vocab-3',
    word: 'Hesitate',
    level: 'Beginner (A1-A2)',
    partOfSpeech: 'verb',
    ipa: '/ˈhɛzɪteɪt/',
    banglaPhonetic: 'হেযিটেট',
    banglaMeaning: 'দ্বিধাবোধ করা বা ইতস্তত করা',
    englishDefinition: 'To pause before saying or doing something that you are unsure about.',
    exampleSentence: 'Do not hesitate to reach out if you have any questions.',
    exampleBangla: 'আপনার কোনো প্রশ্ন থাকলে যোগাযোগ করতে বিন্দুমাত্র দ্বিধা করবেন না।',
    synonyms: ['Pause', 'Waver', 'Delay'],
    banglaTip: 'ইমেইল বা কথোপকথনে শেষে “Do not hesitate to ask” বলা অত্যন্ত জনপ্রিয় ও মার্জিত ভদ্রতা।'
  },
  {
    id: 'vocab-4',
    word: 'Perspective',
    level: 'Intermediate (B1-B2)',
    partOfSpeech: 'noun',
    ipa: '/pərˈspɛktɪv/',
    banglaPhonetic: 'পারস্পেক্টিভ',
    banglaMeaning: 'দৃষ্টিকোণ, দৃষ্টিভঙ্গি বা বিবেচনার দিক',
    englishDefinition: 'A particular attitude toward or way of regarding something; a point of view.',
    exampleSentence: 'From my perspective, continuous practice is the fastest key to fluency.',
    exampleBangla: 'আমার দৃষ্টিকোণ থেকে, অনর্গল কথা বলার সবচেয়ে দ্রুত চাবিকাঠি হলো নিরবচ্ছিন্ন অনুশীলন।',
    synonyms: ['Point of view', 'Outlook', 'Standpoint'],
    banglaTip: 'বারবার “In my opinion” না বলে “From my perspective” বললে কথার গভীরতা বৃদ্ধি পায়।'
  },
  {
    id: 'vocab-5',
    word: 'Fluency',
    level: 'Intermediate (B1-B2)',
    partOfSpeech: 'noun',
    ipa: '/ˈfluːənsi/',
    banglaPhonetic: 'ফ্লুয়েন্সি',
    banglaMeaning: 'সাবলীলতা বা অনর্গল কথা বলার দক্ষতা',
    englishDefinition: 'The ability to speak or write a foreign language easily and accurately.',
    exampleSentence: 'Speaking every single day built her conversational fluency within six months.',
    exampleBangla: 'প্রতিদিন কথা বলার অভ্যাস ছয় মাসের মধ্যে তার কথোপকথনের সাবলীলতা তৈরি করেছে।',
    synonyms: ['Eloquence', 'Smoothness', 'Articulateness'],
    banglaTip: 'মনে রাখবেন: ফ্লুয়েন্সি মানে দ্রুত কথা বলা নয়, বরং আটকে না গিয়ে স্বাভাবিক ছন্দে বলা।'
  },
  {
    id: 'vocab-6',
    word: 'Collaborate',
    level: 'Intermediate (B1-B2)',
    partOfSpeech: 'verb',
    ipa: '/kəˈlæbəreɪt/',
    banglaPhonetic: 'কোলাবোরেট',
    banglaMeaning: 'যৌথভাবে বা একসাথে কাজ করা',
    englishDefinition: 'To work jointly on an activity or project to achieve a common goal.',
    exampleSentence: 'Our remote team collaborates seamlessly using modern digital platforms.',
    exampleBangla: 'আমাদের রিমোট টিম আধুনিক ডিজিটাল প্ল্যাটফর্ম ব্যবহার করে নিরবচ্ছিন্নভাবে একসঙ্গে কাজ করে।',
    synonyms: ['Cooperate', 'Team up', 'Join forces'],
    banglaTip: 'জব ইন্টারভিউতে “I worked with team” না বলে “I collaborated closely with colleagues” বলুন।'
  },
  {
    id: 'vocab-7',
    word: 'Inevitably',
    level: 'Advanced & IELTS (C1)',
    partOfSpeech: 'adverb',
    ipa: '/ɪnˈɛvɪtəbli/',
    banglaPhonetic: 'ইন-এভিটাব্লি',
    banglaMeaning: 'অনিবার্যভাবে, যা এড়ানো অসম্ভব',
    englishDefinition: 'As is certain to happen; unavoidably.',
    exampleSentence: 'Rapid technological advancements will inevitably transform how we work.',
    exampleBangla: 'দ্রুত প্রযুক্তিগত অগ্রগতি অনিবার্যভাবেই আমাদের কাজের ধরনকে বদলে দেবে।',
    synonyms: ['Unavoidably', 'Necessarily', 'Certainly'],
    banglaTip: 'কোনো যৌক্তিক উপসংহার টানার সময় “Inevitably” শব্দ যোগ করলে বক্তব্যের মান বহুগুণ বাড়ে।'
  },
  {
    id: 'vocab-8',
    word: 'Articulate',
    level: 'Advanced & IELTS (C1)',
    partOfSpeech: 'adjective',
    ipa: '/ɑːrˈtɪkjələt/',
    banglaPhonetic: 'আর্টিকুলেট',
    banglaMeaning: 'স্পষ্টভাষী, গুছিয়ে স্পষ্টভাবে প্রকাশ করতে সক্ষম',
    englishDefinition: 'Having or showing the ability to speak fluently and coherently.',
    exampleSentence: 'He is an articulate speaker who can explain complex ideas very simply.',
    exampleBangla: 'তিনি একজন অত্যন্ত স্পষ্টভাষী বক্তা যিনি জটিল ধারণাগুলোকেও খুব সহজভাবে বোঝাতে পারেন।',
    synonyms: ['Eloquent', 'Clear-spoken', 'Persuasive'],
    banglaTip: 'যখন কারও কথা স্পষ্ট ও সুন্দর লাগে, তখন প্রশংসা করে বলতে পারেন: “You are very articulate!”'
  }
];

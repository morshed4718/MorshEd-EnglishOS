export interface PronunciationChallenge {
  id: string;
  category: string;
  title: string;
  banglaTitle: string;
  banglaExplanation: string;
  mouthTip: string;
  phonetics: string;
  pairs: Array<{
    wordA: string;
    wordB: string;
    ipaA: string;
    ipaB: string;
    meaningA: string;
    meaningB: string;
  }>;
  drillSentences: Array<{
    sentence: string;
    banglaMeaning: string;
    focusWords: string[];
    difficulty: 'Easy' | 'Medium' | 'Challenging';
  }>;
  commonMistake: string;
}

export const PRONUNCIATION_CHALLENGES: PronunciationChallenge[] = [
  {
    id: 'f-vs-p',
    category: 'Vowel & Consonant Pitfalls',
    title: 'The "F" vs "P" Distinction',
    banglaTitle: 'F বনাম P এর বিভ্রান্তি দূর করুন',
    banglaExplanation: 'বাংলায় ‘ফ’ উচ্চারণ করতে আমরা দুই ঠোঁট স্পর্শ করি (Bilabial)। কিন্তু ইংরেজিতে ‘F’ হলো Labiodental—অর্থাৎ উপরের দাঁত নিচের ঠোঁটকে আলতোভাবে স্পর্শ করবে এবং বাতাস বের হবে।',
    mouthTip: 'উপরের পাটির সামনের দাঁতগুলো নিচের ঠোঁটের ওপর রাখুন এবং মুখ দিয়ে ফুঁ দিন (যেমন মোমবাতি নেভানোর মতো নয়, বরং সাইকেলের পাম্পার থেকে বাতাস বের হওয়ার মতো)।',
    phonetics: '/f/ vs /p/',
    pairs: [
      { wordA: 'Fan', wordB: 'Pan', ipaA: '/fæn/', ipaB: '/pæn/', meaningA: 'পাখা', meaningB: 'কড়াই' },
      { wordA: 'Face', wordB: 'Pace', ipaA: '/feɪs/', ipaB: '/peɪs/', meaningA: 'মুখমণ্ডল', meaningB: 'গতি' },
      { wordA: 'Coffee', wordB: 'Copy', ipaA: '/ˈkɒfi/', ipaB: '/ˈkɒpi/', meaningA: 'কফি পানীয়', meaningB: 'অনুলিপি বা নকল' },
      { wordA: 'Full', wordB: 'Pull', ipaA: '/fʊl/', ipaB: '/pʊl/', meaningA: 'পরিপূর্ণ', meaningB: 'টানা' },
      { wordA: 'Fine', wordB: 'Pine', ipaA: '/faɪn/', ipaB: '/paɪn/', meaningA: 'সুন্দর/ভালো', meaningB: 'পাইন গাছ' }
    ],
    drillSentences: [
      {
        sentence: "Phillip found fifteen fine pens for four people.",
        banglaMeaning: "ফিলিপ চারজনের জন্য পনেরোটি ভালো কলম খুঁজে পেয়েছিল।",
        focusWords: ["Phillip", "found", "fifteen", "fine", "pens", "four"],
        difficulty: "Medium"
      },
      {
        sentence: "Please turn off the fan before you leave.",
        banglaMeaning: "যাওয়ার আগে দয়া করে ফ্যানটি বন্ধ করুন।",
        focusWords: ["Please", "fan"],
        difficulty: "Easy"
      },
      {
        sentence: "She prefers fresh coffee from French beans.",
        banglaMeaning: "তিনি ফ্রেন্স বিনের তাজা কফি পছন্দ করেন।",
        focusWords: ["prefers", "fresh", "coffee", "French"],
        difficulty: "Challenging"
      }
    ],
    commonMistake: 'বাঙালিরা অনেকেই Coffee-কে "কপি", Fan-কে "প্যান" এর মতো উচ্চারণ করে ফেলেন।'
  },
  {
    id: 'v-vs-b',
    category: 'Vowel & Consonant Pitfalls',
    title: 'The "V" vs "B" & "W" Masterclass',
    banglaTitle: 'V বনাম B এবং W এর সঠিক উচ্চারণ',
    banglaExplanation: 'বাংলা বর্ণমালায় ‘ভ’ রয়েছে, কিন্তু ইংরেজি ‘V’ উচ্চারণের সময় উপরের দাঁত নিচের ঠোঁটের ভিতরের অংশে হালকা চেপে ধরে গলায় কম্পন (Vibration) তৈরি করতে হয়। ‘B’ উচ্চারণে কেবল দুই ঠোঁট স্পর্শ করে।',
    mouthTip: 'নিজের গলায় হাত রাখুন—‘V’ উচ্চারণের সময় গলার স্বরতন্ত্রীতে পরিষ্কার কাঁপুনি অনুভব করবেন (Zzz-এর মতো ভিনভিন শব্দ)।',
    phonetics: '/v/ vs /b/ & /w/',
    pairs: [
      { wordA: 'Van', wordB: 'Ban', ipaA: '/væn/', ipaB: '/bæn/', meaningA: 'গাড়ি', meaningB: 'নিষেধাজ্ঞা' },
      { wordA: 'Very', wordB: 'Berry', ipaA: '/ˈvɛri/', ipaB: '/ˈbɛri/', meaningA: 'খুব/অনেক', meaningB: 'বেরি ফল' },
      { wordA: 'Vote', wordB: 'Boat', ipaA: '/voʊt/', ipaB: '/boʊt/', meaningA: 'ভোট', meaningB: 'নৌকা' },
      { wordA: 'Vest', wordB: 'Best', ipaA: '/vɛst/', ipaB: '/bɛst/', meaningA: 'গেঞ্জি/ওয়েস্টকোট', meaningB: 'সেরা' },
      { wordA: 'Vowel', wordB: 'Bowel', ipaA: '/ˈvaʊ.əl/', ipaB: '/ˈbaʊ.əl/', meaningA: 'স্বরবর্ণ', meaningB: 'অন্ত্র' }
    ],
    drillSentences: [
      {
        sentence: "Victor drove a very big van through the village.",
        banglaMeaning: "ভিক্টর গ্রামের মধ্য দিয়ে একটি খুব বড় ভ্যান চালিয়েছিল।",
        focusWords: ["Victor", "very", "big", "van", "village"],
        difficulty: "Medium"
      },
      {
        sentence: "I believe it is vital to value everyone's view.",
        banglaMeaning: "আমি বিশ্বাস করি প্রত্যেকের মতামতকে মূল্যায়ন করা অত্যন্ত জরুরি।",
        focusWords: ["believe", "vital", "value", "view"],
        difficulty: "Challenging"
      },
      {
        sentence: "This is the best video I have ever viewed.",
        banglaMeaning: "এটি আমার দেখা সবচেয়ে সেরা ভিডিও।",
        focusWords: ["best", "video", "viewed"],
        difficulty: "Easy"
      }
    ],
    commonMistake: '"Very good"-কে "বেরি গুড" বা "ভেরি" না বলে সাধারণ "ব" বলা।'
  },
  {
    id: 'th-sound',
    category: 'Vowel & Consonant Pitfalls',
    title: 'The Voiceless and Voiced "TH" Sound',
    banglaTitle: '"TH" ধ্বনির জাদু: Think বনাম Tink',
    banglaExplanation: 'ইংরেজিতে "TH" ধ্বনি দুটি রূপ নেয়: ১. অঘোষ /θ/ যেমন Think, Three, Both (জিভ দুই দাঁতের মাঝখানে এসে মৃদু বাতাস বের হয়, বাংলা ‘থ’ নয়)। ২. ঘোষ /ð/ যেমন This, That, Brother (জিভ দাঁতে ঠেকিয়ে গলায় কম্পন)।',
    mouthTip: 'জিভের ডগা উপরের ও নিচের পাটির সামনের দাঁতের ঠিক মাঝখানে রাখুন। কখনওই বাংলা ‘ট’ বা ‘ড’ উচ্চারণ করবেন না।',
    phonetics: '/θ/ (Think) & /ð/ (This)',
    pairs: [
      { wordA: 'Think', wordB: 'Tink', ipaA: '/θɪŋk/', ipaB: '/tɪŋk/', meaningA: 'ভাবা বা চিন্তা করা', meaningB: 'টুংটাং শব্দ' },
      { wordA: 'Thank', wordB: 'Tank', ipaA: '/θæŋk/', ipaB: '/tæŋk/', meaningA: 'ধন্যবাদ জানানো', meaningB: 'পানির ট্যাংক' },
      { wordA: 'Theme', wordB: 'Team', ipaA: '/θiːm/', ipaB: '/tiːm/', meaningA: 'মূল বিষয়বস্তু', meaningB: 'দল' },
      { wordA: 'Three', wordB: 'Tree', ipaA: '/θriː/', ipaB: '/triː/', meaningA: 'তিন সংখ্যা', meaningB: 'গাছ' },
      { wordA: 'Breathe', wordB: 'Breed', ipaA: '/briːð/', ipaB: '/briːd/', meaningA: 'শ্বাস নেওয়া', meaningB: 'প্রজনন' }
    ],
    drillSentences: [
      {
        sentence: "I think three thousand people attended the theater.",
        banglaMeaning: "আমার মনে হয় তিন হাজার মানুষ থিয়েটারে উপস্থিত ছিলেন।",
        focusWords: ["think", "three", "thousand", "theater"],
        difficulty: "Challenging"
      },
      {
        sentence: "Thank you for thinking about this thoroughly.",
        banglaMeaning: "এই বিষয়টি গভীরভাবে বিবেচনা করার জন্য আপনাকে ধন্যবাদ।",
        focusWords: ["Thank", "thinking", "this", "thoroughly"],
        difficulty: "Medium"
      },
      {
        sentence: "This is my brother and that is my father.",
        banglaMeaning: "ইনি আমার ভাই এবং উনি আমার বাবা।",
        focusWords: ["This", "brother", "that", "father"],
        difficulty: "Easy"
      }
    ],
    commonMistake: '"Three"-কে "ট্রি" (Tree) বা "Thank you"-কে "ট্যাঙ্ক ইউ" বলা।'
  },
  {
    id: 's-vs-sh',
    category: 'Vowel & Consonant Pitfalls',
    title: 'The "S" /s/ vs "SH" /ʃ/ Clarity',
    banglaTitle: '"S" বনাম "SH": স ও শ এর নিখুঁত উচ্চারণ',
    banglaExplanation: 'বাংলা অঞ্চলে অনেকেই ‘স’ এবং ‘শ’ গুলিয়ে ফেলেন। যেমন "See" কে "Shee" বা "Ship" কে "Sip" বলে ফেলেন। ইংরেজিতে ‘S’ হলো পরিষ্কার হিসহিস শব্দ (দন্ত্য স), আর ‘SH’ হলো ফিসফিস করে থামানোর মতো শব্দ (তালব্য শ)।',
    mouthTip: '‘S’ বলার সময় দাঁত বন্ধ করে জিবের ডগা উপরের মাড়ির পেছনে রাখুন (সাপের হিসহিস শব্দ)। ‘SH’ বলার সময় ঠোঁট গোল করে সামনে বাড়ান (বাচ্চাকে চুপ করানোর ‘শশশ’ শব্দ)।',
    phonetics: '/s/ vs /ʃ/',
    pairs: [
      { wordA: 'See', wordB: 'She', ipaA: '/siː/', ipaB: '/ʃiː/', meaningA: 'দেখা', meaningB: 'সে (মহিলা)' },
      { wordA: 'Sip', wordB: 'Ship', ipaA: '/sɪp/', ipaB: '/ʃɪp/', meaningA: 'এক চুমুক পান করা', meaningB: 'জাহাজ' },
      { wordA: 'Sore', wordB: 'Shore', ipaA: '/sɔːr/', ipaB: '/ʃɔːr/', meaningA: 'ব্যথাযুক্ত বা ক্ষত', meaningB: 'সমুদ্রের তীর' },
      { wordA: 'Sell', wordB: 'Shell', ipaA: '/sɛl/', ipaB: '/ʃɛl/', meaningA: 'বিক্রি করা', meaningB: 'খোসা বা ঝিনুক' },
      { wordA: 'Sign', wordB: 'Shine', ipaA: '/saɪn/', ipaB: '/ʃaɪn/', meaningA: 'চিহ্ন বা স্বাক্ষর', meaningB: 'উজ্জ্বল আলো ছড়ানো' }
    ],
    drillSentences: [
      {
        sentence: "She sells sea shells on the sea shore.",
        banglaMeaning: "সে সমুদ্র তীরে সমুদ্রের ঝিনুকের খোলস বিক্রি করে।",
        focusWords: ["She", "sells", "sea", "shells", "shore"],
        difficulty: "Challenging"
      },
      {
        sentence: "Please sit down and sip some fresh sweet soup.",
        banglaMeaning: "দয়া করে বসুন এবং কিছুটা মিষ্টি স্যুপ পান করুন।",
        focusWords: ["sit", "sip", "some", "sweet", "soup"],
        difficulty: "Medium"
      }
    ],
    commonMistake: '"Six" কে "শিক্-স" বা "Special" কে "স্পেশাল" না বলে "সপেশাল" বলা।'
  },
  {
    id: 'z-vs-j',
    category: 'Vowel & Consonant Pitfalls',
    title: 'The "Z" /z/ vs "J" /dʒ/ Buzz',
    banglaTitle: '"Z" বনাম "J": ভোঁ ভোঁ গুঞ্জন বনাম সাধারণ জ',
    banglaExplanation: 'বাংলায় ‘য’ বা ‘জ’ একই রকম শোনায়। কিন্তু ইংরেজি ‘Z’ হলো মৌমাছির গুঞ্জনের মতো ভাইব্রেটিং শব্দ (Zzzzz)। ‘J’ হলো বাংলা ‘জ’ এর মতো (যেমন Jump, Judge)।',
    mouthTip: 'দাঁত দুটো একসঙ্গে লাগিয়ে বাতাস ছেড়ে জিভে কম্পন তৈরি করুন। যেন মৌমাছি উড়ে যাচ্ছে: Zzzzzz!',
    phonetics: '/z/ vs /dʒ/',
    pairs: [
      { wordA: 'Zoo', wordB: 'Jew', ipaA: '/zuː/', ipaB: '/dʒuː/', meaningA: 'চিড়িয়াখানা', meaningB: 'ইহুদি' },
      { wordA: 'Zip', wordB: 'Jip', ipaA: '/zɪp/', ipaB: '/dʒɪp/', meaningA: 'চেইন আটকানো', meaningB: 'জিপ গাড়ি' },
      { wordA: 'Prize', wordB: 'Price', ipaA: '/praɪz/', ipaB: '/praɪs/', meaningA: 'পুরস্কার', meaningB: 'দাম' },
      { wordA: 'Buzz', wordB: 'Badge', ipaA: '/bʌz/', ipaB: '/bædʒ/', meaningA: 'গুঞ্জন শব্দ', meaningB: 'ব্যাজ বা পদক' }
    ],
    drillSentences: [
      {
        sentence: "The zebra in the zoo buzzed with zero hesitation.",
        banglaMeaning: "চিড়িয়াখানার জেব্রাটি বিন্দুমাত্র দ্বিধাবোধ না করেই ছুটে চলল।",
        focusWords: ["zebra", "zoo", "buzzed", "zero"],
        difficulty: "Medium"
      },
      {
        sentence: "Jack was amazed by the golden prize he received.",
        banglaMeaning: "জ্যাক প্রাপ্ত স্বর্ণপদক দেখে ভীষণ আনন্দিত হয়েছিল।",
        focusWords: ["amazed", "prize"],
        difficulty: "Easy"
      }
    ],
    commonMistake: '"Zero" কে "জেরো", "Music" (মিউজিক)-কে "মিউসিক" বা "মিউজিক" শক্তভাবে বলা।'
  },
  {
    id: 'silent-letters',
    category: 'Elite Pronunciation Secrets',
    title: 'Deceptive Silent Letters in English',
    banglaTitle: 'উচ্চারণ না হওয়া ‘নীরব বর্ণ’ বা Silent Letters',
    banglaExplanation: 'ইংরেজিতে বানান আর উচ্চারণের তফাত সবচেয়ে বেশি ধরা পড়ে সাইলেন্ট লেটার্সে। ভুল উচ্চারণ করলে দেশি টান খুব বেশি বোঝা যায়।',
    mouthTip: 'এই বর্ণগুলো বানানে থাকবে কিন্তু মুখে একদমই আনবেন না। পুরো বাদ দিয়ে উচ্চারণ করুন।',
    phonetics: 'Silent d, b, p, l, k, g',
    pairs: [
      { wordA: 'Wednesday', wordB: 'wenz-dei', ipaA: '/ˈwɛnzdeɪ/', ipaB: 'd বাদ', meaningA: 'বুধবার (নো ‘ওয়েডনেসডে’)', meaningB: 'সঠিক: ওয়েন্‌য্‌ডে' },
      { wordA: 'Doubt', wordB: 'daut', ipaA: '/daʊt/', ipaB: 'b বাদ', meaningA: 'সন্দেহ (নো ‘ডাউব্ট’)', meaningB: 'সঠিক: ডাউট' },
      { wordA: 'Salmon', wordB: 'sam-un', ipaA: '/ˈsæmən/', ipaB: 'l বাদ', meaningA: 'স্যামন মাছ (নো ‘স্যালমন’)', meaningB: 'সঠিক: স্যামন' },
      { wordA: 'Subtle', wordB: 'sut-tl', ipaA: '/ˈsʌtl/', ipaB: 'b বাদ', meaningA: 'সুক্ষ্ম (নো ‘সাবটল’)', meaningB: 'সঠিক: সাট্‌ল' },
      { wordA: 'Receipt', wordB: 'ri-seet', ipaA: '/rɪˈsiːt/', ipaB: 'p বাদ', meaningA: 'রসিদ (নো ‘রিসিপ্ট’)', meaningB: 'সঠিক: রিসীট' }
    ],
    drillSentences: [
      {
        sentence: "I have no doubt we will have fresh salmon on Wednesday.",
        banglaMeaning: "আমার কোনো সন্দেহ নেই যে আমরা বুধবারে তাজা স্যামন খাব।",
        focusWords: ["doubt", "salmon", "Wednesday"],
        difficulty: "Challenging"
      },
      {
        sentence: "Could you please give me the receipt for the luggage?",
        banglaMeaning: "আপনি কি দয়া করে মালামালের রসিদটি আমাকে দিতে পারেন?",
        focusWords: ["receipt"],
        difficulty: "Easy"
      }
    ],
    commonMistake: '"Receipt" কে "রিসিপ্ট", "Debt" কে "ডেব্ট", "Wednesday" কে "ওয়েড-নেস-ডে" বলা।'
  }
];

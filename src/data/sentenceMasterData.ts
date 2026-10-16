export interface CommonMistakeItem {
  id: string;
  category: 'Grammar' | 'Vocabulary' | 'Literal Translation (Banglish)' | 'Prepositions';
  incorrect: string;
  correct: string;
  banglaMeaning: string;
  banglaExplanation: string;
  ruleSummary: string;
  exampleSentence: string;
}

export interface SentenceBuilderPuzzle {
  id: string;
  banglaPrompt: string;
  targetEnglish: string;
  scrambledWords: string[];
  grammarTipBangla: string;
}

export const COMMON_MISTAKES: CommonMistakeItem[] = [
  {
    id: 'mistake-1',
    category: 'Literal Translation (Banglish)',
    incorrect: 'I am agree with your opinion.',
    correct: 'I agree with your opinion.',
    banglaMeaning: 'আমি আপনার মতামতের সাথে একমত।',
    banglaExplanation: 'বাংলায় ‘একমত’ একটি বিশেষণ মনে হলেও ইংরেজিতে ‘Agree’ নিজেই একটি স্বয়ংসম্পূর্ণ মূল ক্রিয়া (verb)। তাই এর আগে ‘am/is/are’ বসে না।',
    ruleSummary: 'Never say "I am agree". Always use "I agree" or "I do not agree".',
    exampleSentence: 'I completely agree with the strategy proposed by our manager.'
  },
  {
    id: 'mistake-2',
    category: 'Literal Translation (Banglish)',
    incorrect: 'Please open the fan / light.',
    correct: 'Please turn on the fan / light.',
    banglaMeaning: 'দয়া করে ফ্যান/লাইটটি চালু করুন।',
    banglaExplanation: 'বাংলায় আমরা বলি "লাইট খোলো" বা "ফ্যান খোলো"। কিন্তু ইংরেজিতে বৈদ্যুতিক জিনিস চালু করার ক্ষেত্রে "Turn on" বা "Switch on" এবং বন্ধ করতে "Turn off" বলতে হয়। "Open" মানে দরজা বা বাক্স খোলা।',
    ruleSummary: 'Electrical devices: Turn on / Turn off. Physical objects (doors, books): Open / Close.',
    exampleSentence: 'It is getting quite hot in the room, please switch on the air conditioner.'
  },
  {
    id: 'mistake-3',
    category: 'Grammar',
    incorrect: 'He told to me that he was busy.',
    correct: 'He told me that he was busy.',
    banglaMeaning: 'সে আমাকে বলল যে সে ব্যস্ত ছিল।',
    banglaExplanation: 'Tell ক্রিয়ার পর সরাসরি অবজেক্ট বসে (told me / told him)। এর মাঝে "to" বসে না। যদি "to" বসাতে চান তবে Say ক্রিয়া ব্যবহার করবেন: "He said to me"।',
    ruleSummary: 'Told + Person (No "to"). Said + TO + Person.',
    exampleSentence: 'She told me the whole story without leaving out any details.'
  },
  {
    id: 'mistake-4',
    category: 'Prepositions',
    incorrect: 'Let us discuss about the problem.',
    correct: 'Let us discuss the problem.',
    banglaMeaning: 'চলুন আমরা সমস্যাটি নিয়ে আলোচনা করি।',
    banglaExplanation: '‘Discuss’ শব্দের অর্থই হলো ‘কোনো বিষয় নিয়ে আলোচনা করা’। তাই discuss-এর পরে আবার ‘about’ বসানো ভুল (redundancy)।',
    ruleSummary: 'Discuss + topic (never "discuss about"). Talk about / discuss.',
    exampleSentence: 'The committee met this morning to discuss the budget allocation.'
  },
  {
    id: 'mistake-5',
    category: 'Prepositions',
    incorrect: 'I have been living in Dhaka since five years.',
    correct: 'I have been living in Dhaka for five years.',
    banglaMeaning: 'আমি পাঁচ বছর ধরে ঢাকায় বসবাস করছি।',
    banglaExplanation: 'মোট সময়কাল বা ব্যাপ্তি (Period of time: ৫ বছর, ৩ ঘণ্টা, ২ দিন) বোঝালে ‘For’ বসে। আর কোনো নির্দিষ্ট শুরুর মুহূর্ত (Point of time: 2019, 8 AM, Monday) বোঝালে ‘Since’ বসে।',
    ruleSummary: 'Duration = FOR. Specific Starting Moment = SINCE.',
    exampleSentence: 'She has been working at this university for six years.'
  },
  {
    id: 'mistake-6',
    category: 'Literal Translation (Banglish)',
    incorrect: 'Why did you cut the phone?',
    correct: 'Why did you hang up the phone?',
    banglaMeaning: 'তুমি ফোন কেটে দিলে কেন?',
    banglaExplanation: 'বাংলায় "ফোন কাটা" থেকে অনেকে "Cut the phone" বলেন। ইংরেজিতে ফোন কল কেটে দেওয়াকে "Hang up" বা "Disconnect" বলা হয়।',
    ruleSummary: 'Phone call ending = Hang up / Disconnect (never "cut").',
    exampleSentence: 'I lost the signal, so the call hung up automatically.'
  },
  {
    id: 'mistake-7',
    category: 'Grammar',
    incorrect: 'He is more taller than his elder brother.',
    correct: 'He is taller than his elder brother.',
    banglaMeaning: 'সে তার বড় ভাইয়ের চেয়ে বেশি লম্বা।',
    banglaExplanation: 'যেসব শব্দের শেষে ‘-er’ যোগ করে তুলনামূলক রূপ (Comparative) তৈরি করা যায় (tall -> taller), তার আগে আবার ‘more’ বসিয়ে দ্বৈত রূপ (Double comparative) তৈরি করা ভুল।',
    ruleSummary: 'Never combine "more" with "-er" adjectives (more taller ❌ -> taller ✅).',
    exampleSentence: 'The climate in Chittagong is cooler than in Dhaka.'
  },
  {
    id: 'mistake-8',
    category: 'Vocabulary',
    incorrect: 'I passed out from Dhaka University in 2022.',
    correct: 'I graduated from Dhaka University in 2022.',
    banglaMeaning: 'আমি ২০২২ সালে ঢাকা বিশ্ববিদ্যালয় থেকে স্নাতক সম্পন্ন করেছি।',
    banglaExplanation: 'আন্তর্জাতিক ইংরেজিতে "Pass out" মানে হলো অজ্ঞান হয়ে যাওয়া (Faint)! কলেজ বা বিশ্ববিদ্যালয় ডিগ্রি শেষ করার ক্ষেত্রে বলতে হয় "Graduated from" বা "Completed degree"।',
    ruleSummary: 'Pass out = Faint (অজ্ঞান হওয়া). Graduate = ডিগ্রি সম্পন্ন করা।',
    exampleSentence: 'My sister graduated from engineering school with top honors.'
  }
];

export const SENTENCE_PUZZLES: SentenceBuilderPuzzle[] = [
  {
    id: 'puzzle-1',
    banglaPrompt: 'আমি গতকাল তার সাথে ফোনে কথা বলেছিলাম।',
    targetEnglish: 'I spoke with him on the phone yesterday',
    scrambledWords: ['spoke', 'I', 'yesterday', 'with', 'on', 'him', 'the', 'phone'],
    grammarTipBangla: 'ফোনে কথা বলার ক্ষেত্রে প্রিপজিশন "on the phone" এবং অতীতের কাজের জন্য "spoke" (past tense) ব্যবহৃত হয়।'
  },
  {
    id: 'puzzle-2',
    banglaPrompt: 'এই বিষয়ে আমার সিদ্ধান্ত পরিবর্তন করার কোনো কারণ নেই।',
    targetEnglish: 'There is no reason to change my decision on this matter',
    scrambledWords: ['is', 'no', 'decision', 'There', 'to', 'reason', 'change', 'my', 'on', 'this', 'matter'],
    grammarTipBangla: '"There is no reason to..." একটি অত্যন্ত চমৎকার কাঠামোগত এক্সপ্রেশন যা সাবলীল ইংরেজিতে বহুল ব্যবহৃত হয়।'
  },
  {
    id: 'puzzle-3',
    banglaPrompt: 'আপনি কি দয়া করে আমাকে রেলস্টেশনের পথটি বলতে পারেন?',
    targetEnglish: 'Could you please tell me the way to the railway station',
    scrambledWords: ['you', 'tell', 'Could', 'me', 'please', 'the', 'way', 'to', 'the', 'station', 'railway'],
    grammarTipBangla: 'ভদ্রভাবে অনুরোধ করতে "Can you" এর চেয়ে "Could you please..." ব্যবহার করা অনেক বেশি মার্জিত ও প্রফেশনাল।'
  },
  {
    id: 'puzzle-4',
    banglaPrompt: 'সে সকাল আটটা থেকে অবিরাম কাজ করে যাচ্ছে।',
    targetEnglish: 'He has been working continuously since eight in the morning',
    scrambledWords: ['has', 'He', 'been', 'working', 'continuously', 'since', 'eight', 'in', 'the', 'morning'],
    grammarTipBangla: 'অতীত থেকে শুরু হয়ে এখনও চলছে এমন কাজের জন্য Present Perfect Continuous Tense (has been + verb-ing) ব্যবহৃত হয়।'
  }
];

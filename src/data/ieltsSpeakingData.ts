export interface IeltsCueCard {
  id: string;
  topic: string;
  banglaTopic: string;
  cardPrompt: string;
  bulletPoints: string[];
  banglaGuidance: string;
  modelAnswerBand8: string;
  vocabularyHighlights: string[];
  connectingPhrases: string[];
}

export interface IeltsPart1Category {
  category: string;
  banglaCategory: string;
  questions: Array<{
    question: string;
    banglaMeaning: string;
    sampleAnswer: string;
    proTipBangla: string;
  }>;
}

export const IELTS_PART_1: IeltsPart1Category[] = [
  {
    category: 'Hometown & Living Area',
    banglaCategory: 'নিজের শহর ও বাসস্থান',
    questions: [
      {
        question: "Where is your hometown, and what do you like most about it?",
        banglaMeaning: "আপনার নিজের শহর কোনটি এবং এখানকার কোন বিষয়টি আপনি সবচেয়ে বেশি পছন্দ করেন?",
        sampleAnswer: "I was born and raised in Sylhet, which is nestled in the northeastern part of Bangladesh. What fascinates me most is its scenic lush tea gardens and the serene atmosphere, which provides a peaceful escape from the hustle and bustle.",
        proTipBangla: "শুধুমাত্র 'Sylhet' বা 'I like green' না বলে 'nestled in...', 'scenic lush tea gardens' এর মতো বর্ণনামূলক শব্দ ব্যবহার করুন।"
      },
      {
        question: "Has your hometown changed much since your childhood?",
        banglaMeaning: "আপনার শৈশবের পর থেকে আপনার শহর কি খুব বেশি বদলে গেছে?",
        sampleAnswer: "Tremendously, yes! Over the past decade, it has witnessed unprecedented urban development. Many multistory complexes have replaced traditional houses, and the transportation infrastructure has expanded considerably.",
        proTipBangla: "'Yes, it changed' এর বদলে 'Tremendously, yes!' বা 'Unprecedented urban development' ব্যবহার ব্যান্ড ৭+ নিশ্চিত করে।"
      }
    ]
  },
  {
    category: 'Work and Studies',
    banglaCategory: 'কাজ ও পড়াশোনা',
    questions: [
      {
        question: "Do you currently work, or are you a student?",
        banglaMeaning: "আপনি কি বর্তমানে চাকরি করছেন, নাকি আপনি একজন শিক্ষার্থী?",
        sampleAnswer: "Presently, I am working as a full-time software developer at a dynamic tech firm. My daily routine involves designing intuitive user interfaces and collaborating with engineering teams to optimize performance.",
        proTipBangla: "নিজের কাজের ২-৩টি সুনির্দিষ্ট দিক তুলে ধরুন।"
      }
    ]
  }
];

export const IELTS_CUE_CARDS: IeltsCueCard[] = [
  {
    id: 'cue-1',
    topic: 'Describe a challenging goal you achieved through perseverance',
    banglaTopic: 'অধ্যবসায়ের মাধ্যমে আপনি অর্জন করেছেন এমন একটি কঠিন লক্ষ্য বর্ণনা করুন',
    cardPrompt: 'You should say:\n- What the goal was\n- When and why you decided to pursue it\n- What obstacles you faced along the way\n- And explain how you felt after reaching this milestone.',
    bulletPoints: [
      'What the goal was (লক্ষ্যটি কী ছিল)',
      'When and why you decided to pursue it (কখন এবং কেন শুরু করেছিলেন)',
      'What obstacles you faced along the way (কী কী বাধার সম্মুখীন হয়েছিলেন)',
      'How you felt after reaching this milestone (লক্ষ্যে পৌঁছানোর পর কেমন অনুভূতি হয়েছিল)'
    ],
    banglaGuidance: '১ মিনিট নোট নেওয়ার সময় বুলেট পয়েন্ট অনুযায়ী মূল মূল শব্দগুলো লিখুন। পরীক্ষার সময় একটানা ২ মিনিট বলার জন্য গল্প তৈরি করুন (শুরু, সংকট এবং চূড়ান্ত সফলতা)।',
    modelAnswerBand8: "I would like to speak about an ambition that tested my resilience to the core—namely, mastering computer programming and securing an international remote position within nine months.\n\nBack in 2023, right after completing my graduation, I realized that practical software development demands skills far beyond classroom theory. I decided to immerse myself in intensive daily coding bootcamps.\n\nThe journey, however, was anything but a walk in the park. Balancing rigorous study schedules while dealing with frequent power outages and self-doubt was profoundly challenging. There were countless nights when debugging a stubborn piece of code felt overwhelming.\n\nYet, through sheer persistence and structured time-management, I gradually built complex full-stack web applications. When I received my official offer letter, a profound sense of exhilaration and accomplishment washed over me. It reaffirmed my core conviction that relentless consistency can conquer any steep learning curve.",
    vocabularyHighlights: ['tested my resilience to the core', 'immerse myself', 'anything but a walk in the park', 'sheer persistence', 'profound sense of exhilaration', 'steep learning curve'],
    connectingPhrases: ['I would like to speak about...', 'The journey, however, was...', 'Yet, through sheer persistence...', 'Looking back at this milestone...']
  },
  {
    id: 'cue-2',
    topic: 'Describe a person who has had an inspiring influence on your life',
    banglaTopic: 'আপনার জীবনে গভীর অনুপ্রেরণা জুগিয়েছেন এমন একজন ব্যক্তির বর্ণনা',
    cardPrompt: 'You should say:\n- Who this person is\n- How you first came to know them\n- What special qualities they possess\n- And explain why they inspire you so deeply.',
    bulletPoints: [
      'Who this person is (ব্যক্তিটি কে)',
      'How you first came to know them (কীভাবে পরিচয় বা জানা হয়েছিল)',
      'What special qualities they possess (তাদের বিশেষ গুণাবলি কী কী)',
      'Why they inspire you so deeply (কেন তারা আপনাকে এত গভীরভাবে অনুপ্রাণিত করেন)'
    ],
    banglaGuidance: 'ব্যক্তির ব্যক্তিত্ব (Personality traits), নৈতিক সততা ও তাদের কাজের উদাহরণ দিন। যেমন: unshakeable optimism, empathy, dedication.',
    modelAnswerBand8: "The individual who has profoundly shaped my outlook on life is none other than my maternal grandfather. Having lived through significant historical upheavals, he always personified quiet dignity and unmatched intellectual curiosity.\n\nThroughout his forty-year tenure as a high school mathematics teacher, he didn't merely teach formulas; he instilled a love for critical reasoning and moral integrity in generations of students. What I admire most about him is his unshakeable optimism and gentle empathy. Even in the face of acute adversity, he remained calm, generous, and steadfastly committed to helping those in need.\n\nWhenever I feel overwhelmed by modern pressures, his words of wisdom echo in my mind. He taught me that genuine success is measured not by wealth, but by the positive imprint we leave on others' lives.",
    vocabularyHighlights: ['profoundly shaped my outlook', 'personified quiet dignity', 'unshakeable optimism', 'acute adversity', 'positive imprint'],
    connectingPhrases: ['The individual who has profoundly shaped...', 'Throughout his tenure...', 'What I admire most...', 'He taught me that genuine success...']
  }
];

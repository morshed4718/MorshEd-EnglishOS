export interface RoleplayTurn {
  speaker: 'agent' | 'user';
  name: string;
  avatarText: string;
  englishPrompt: string;
  banglaMeaning: string;
  sampleResponses?: string[];
  banglaClue?: string;
  vocabularyFocus?: string[];
}

export interface RoleplayScenario {
  id: string;
  title: string;
  banglaTitle: string;
  category: 'Career & Work' | 'Travel & Visa' | 'Daily Life' | 'Academic & IELTS';
  description: string;
  banglaDescription: string;
  iconName: string;
  turns: RoleplayTurn[];
}

export const ROLEPLAY_SCENARIOS: RoleplayScenario[] = [
  {
    id: 'job-interview',
    title: 'Job Interview Simulation',
    banglaTitle: 'চাকরির ভাইভা বা ইন্টারভিউ সিমুলেশন',
    category: 'Career & Work',
    description: 'Practice high-impact corporate interview questions with confident delivery.',
    banglaDescription: 'আন্তর্জাতিক কোম্পানি ও কর্পোরেট জবের জন্য সাবলীল ও আত্মবিশ্বাসী উত্তর দেওয়ার প্র্যাকটিস।',
    iconName: 'Briefcase',
    turns: [
      {
        speaker: 'agent',
        name: 'Interviewer (Sarah)',
        avatarText: '👩‍💼',
        englishPrompt: "Good morning! Thank you for coming in today. Could you briefly introduce yourself and highlight your key experience?",
        banglaMeaning: "শুভ সকাল! আজ আসার জন্য ধন্যবাদ। সংক্ষেপে আপনার নিজের পরিচয় দিন এবং আপনার প্রধান অভিজ্ঞতাগুলো তুলে ধরুন।",
        sampleResponses: [
          "Good morning! Thank you for having me. My name is [Name], and I have over 3 years of hands-on experience in software development and client relations.",
          "Good morning Sarah! It is a pleasure to be here. Over the past few years, I have specialized in building customer-centric web applications."
        ],
        banglaClue: "শুরুতে ধন্যবাদ দিন, তারপর নাম ও কত বছরের অভিজ্ঞতা তা স্পষ্টভাবে বলুন। 'I am agree' বা 'Myself...' বলবেন না!",
        vocabularyFocus: ["hands-on experience", "specialized in", "customer-centric", "pleasure to be here"]
      },
      {
        speaker: 'agent',
        name: 'Interviewer (Sarah)',
        avatarText: '👩‍💼',
        englishPrompt: "That sounds impressive. How do you usually handle tight deadlines or stressful situations at work?",
        banglaMeaning: "শুনতে বেশ চমৎকার লাগছে। কাজের ক্ষেত্রে কঠিন সময়সীমা বা চাপের পরিস্থিতি আপনি কীভাবে সামলান?",
        sampleResponses: [
          "Whenever I face a tight deadline, I prioritize tasks based on their urgency and impact, communicate proactively with my team, and maintain focused focus.",
          "I stay calm by breaking down large milestones into smaller, actionable daily goals and keeping stakeholders informed."
        ],
        banglaClue: "'Prioritize' (অগ্রাধিকার দেওয়া) ও 'Proactively communicate' (আগাম যোগাযোগ) শব্দগুলো ইন্টারভিউয়ারকে মুগ্ধ করে।",
        vocabularyFocus: ["prioritize tasks", "urgency and impact", "communicate proactively", "milestones"]
      },
      {
        speaker: 'agent',
        name: 'Interviewer (Sarah)',
        avatarText: '👩‍💼',
        englishPrompt: "Where do you see yourself five years from now in your professional journey?",
        banglaMeaning: "আগামী পাঁচ বছরে আপনার পেশাগত জীবনে নিজেকে কোথায় দেখতে চান?",
        sampleResponses: [
          "In five years, I envision myself taking on leadership responsibilities, mentoring younger colleagues, and driving strategic projects for the organization.",
          "I see myself as a seasoned specialist who bridges technical execution with business strategy."
        ],
        banglaClue: "ভবিষ্যত পরিকল্পনার ক্ষেত্রে 'I envision myself...' (আমি নিজেকে দেখি) ব্যবহার করুন।",
        vocabularyFocus: ["envision myself", "leadership responsibilities", "mentoring", "seasoned specialist"]
      }
    ]
  },
  {
    id: 'airport-immigration',
    title: 'Airport & Immigration Clearance',
    banglaTitle: 'এয়ারপোর্ট ও ইমিগ্রেশন কাউন্টারে সাবলীল কথোপকথন',
    category: 'Travel & Visa',
    description: 'Master airport customs, boarding gate inquiries, and immigration counter confidence.',
    banglaDescription: 'বিদেশে ভ্রমণের সময় ইমিগ্রেশন অফিসার ও বিমানবন্দর কর্মীদের সাথে কথা বলার নিখুঁত অনুশীলন।',
    iconName: 'Plane',
    turns: [
      {
        speaker: 'agent',
        name: 'Immigration Officer',
        avatarText: '👮‍♂️',
        englishPrompt: "Passport and landing card, please. What is the primary purpose of your visit to the country?",
        banglaMeaning: "অনুগ্রহ করে আপনার পাসপোর্ট এবং ল্যান্ডিং কার্ড দিন। এই দেশে আপনার ভ্রমণের মূল উদ্দেশ্য কী?",
        sampleResponses: [
          "Good day, Officer! Here is my passport and boarding pass. I am here for higher studies at the university.",
          "Good afternoon! Here is my passport. I am visiting for a two-week vacation to explore tourist destinations.",
          "Hello! I am attending an international business tech conference in London for four days."
        ],
        banglaClue: "উদ্দেশ্য সুস্পষ্টভাবে বলুন: tourism, higher studies, নাকি business conference। অতিরিক্ত অপ্রয়োজনীয় কথা বলবেন না।",
        vocabularyFocus: ["primary purpose", "higher studies", "business conference", "vacation"]
      },
      {
        speaker: 'agent',
        name: 'Immigration Officer',
        avatarText: '👮‍♂️',
        englishPrompt: "How long do you intend to stay, and where will you be staying during this period?",
        banglaMeaning: "আপনি কতদিন থাকার ইচ্ছা পোষণ করছেন এবং এই সময়ে কোথায় থাকবেন?",
        sampleResponses: [
          "I will be staying for exactly two weeks at the Grand Central Hotel. Here is my confirmed booking reservation.",
          "I am enrolled in a two-year master's program, and I will be residing at the campus student dormitory."
        ],
        banglaClue: "হোটেল বুকিং বা ডরমিটরির প্রমাণপত্র সাথে আছে তা উল্লেখ করুন।",
        vocabularyFocus: ["intend to stay", "confirmed reservation", "residing at", "dormitory"]
      },
      {
        speaker: 'agent',
        name: 'Immigration Officer',
        avatarText: '👮‍♂️',
        englishPrompt: "Do you have a return ticket and sufficient funds to cover your daily expenses?",
        banglaMeaning: "আপনার কাছে কি রিটার্ন টিকিট এবং দৈনিক খরচ চালানোর মতো পর্যাপ্ত ফান্ড রয়েছে?",
        sampleResponses: [
          "Yes, Officer. Here is my return flight confirmation for the 24th, along with my international credit card and bank statement.",
          "Yes, I have already booked my return ticket, and my trip is fully funded by my sponsor."
        ],
        banglaClue: "'Sufficient funds' মানে পর্যাপ্ত টাকা। 'Return ticket' সাথে সাথে দেখান।",
        vocabularyFocus: ["sufficient funds", "flight confirmation", "fully funded"]
      }
    ]
  },
  {
    id: 'doctor-clinic',
    title: 'Visiting the Doctor & Describing Symptoms',
    banglaTitle: 'ডাক্তারের কাছে গিয়ে নিজের অসুখ ও লক্ষণ বর্ণনা',
    category: 'Daily Life',
    description: 'Learn precise medical English terms to explain pain, fever, allergies, and duration.',
    banglaDescription: 'বিদেশে বা ক্লিনিকে গিয়ে শরীরের কষ্ট, ব্যথার তীব্রতা ও সময়কাল স্পষ্টভাবে জানানোর উপায়।',
    iconName: 'Stethoscope',
    turns: [
      {
        speaker: 'agent',
        name: 'Dr. Watson',
        avatarText: '👨‍⚕️',
        englishPrompt: "Hello! What brings you in to see me today? What symptoms have you been experiencing?",
        banglaMeaning: "নমস্কার! আজ আপনার কী কারণে আসা হলো? কী ধরনের শারীরিক লক্ষণ দেখা দিচ্ছে?",
        sampleResponses: [
          "Doctor, I have had a persistent sore throat and a mild fever for the past three days.",
          "I have been suffering from severe migraines and feeling dizzy since yesterday morning.",
          "I have a sharp pain in my lower back, especially when I try to bend forward."
        ],
        banglaClue: "সময় বোঝাতে 'for the past 3 days' (গত ৩ দিন ধরে) ব্যবহার করুন। 'Since 3 days' বলা ব্যাকরণগত ভুল।",
        vocabularyFocus: ["persistent", "sore throat", "mild fever", "migraine", "dizzy"]
      },
      {
        speaker: 'agent',
        name: 'Dr. Watson',
        avatarText: '👨‍⚕️',
        englishPrompt: "I see. On a scale of 1 to 10, how intense is the pain, and are you allergic to any medications?",
        banglaMeaning: "বুঝলাম। ১ থেকে ১০ এর মধ্যে ব্যথার তীব্রতা কেমন, এবং আপনার কি কোনো ওষুধে অ্যালার্জি আছে?",
        sampleResponses: [
          "I would rate the pain around a 6. Fortunately, I don't have any known drug allergies.",
          "The pain is around a 7, especially at night. As far as I know, I am allergic to penicillin."
        ],
        banglaClue: "অ্যালার্জি না থাকলে বলুন: 'I have no known drug allergies' বা থাকলে স্পষ্ট করে নাম বলুন।",
        vocabularyFocus: ["scale of 1 to 10", "intense", "known drug allergies", "penicillin"]
      }
    ]
  },
  {
    id: 'restaurant-ordering',
    title: 'Restaurant & Café Dining Etiquette',
    banglaTitle: 'রেস্তোরাঁ ও ক্যাফেতে খাবার অর্ডার ও বিল চাওয়া',
    category: 'Daily Life',
    description: 'Order food politely, ask about ingredients or spicy levels, and request the bill.',
    banglaDescription: 'ভদ্রভাবে খাবার চাওয়া, ঝাল বা অ্যালার্জি আছে কিনা জানা এবং বিল পরিশোধের মার্জিত বাক্য।',
    iconName: 'Coffee',
    turns: [
      {
        speaker: 'agent',
        name: 'Waiter (Leo)',
        avatarText: '🤵',
        englishPrompt: "Good evening! Welcome to Bistro Bella. Are you ready to order, or would you like a few more minutes with the menu?",
        banglaMeaning: "শুভ সন্ধ্যা! বিস্ট্রো বেলা-তে স্বাগতম। আপনি কি অর্ডার করতে প্রস্তুত, নাকি মেনু দেখার জন্য আর কিছুক্ষণ সময় চান?",
        sampleResponses: [
          "Good evening! We are ready. Could you recommend your most popular grilled chicken dish?",
          "We need about two more minutes, please. But could we start with some sparkling water?"
        ],
        banglaClue: "'Give me chicken' না বলে ভদ্রভাবে বলুন: 'Could I please have...' বা 'I would like...'",
        vocabularyFocus: ["Could you recommend", "sparkling water", "I would like"]
      },
      {
        speaker: 'agent',
        name: 'Waiter (Leo)',
        avatarText: '🤵',
        englishPrompt: "Certainly! The rosemary grilled chicken is fantastic. How spicy would you prefer it, and any dietary restrictions?",
        banglaMeaning: "অবশ্যই! রোজমেরি গ্রিলড চিকেন অসাধারণ। ঝাল কেমন পছন্দ করবেন এবং কোনো খাবারে নিষেধাজ্ঞা আছে কি?",
        sampleResponses: [
          "Medium spice would be wonderful, please. And could you ensure it is completely gluten-free?",
          "I prefer mild spice, please. Also, please make sure there are no peanuts as I have a nut allergy."
        ],
        banglaClue: "ঝালের পরিমাণ বোঝাতে mild, medium, নাকি extra spicy তা জানান।",
        vocabularyFocus: ["dietary restrictions", "medium spice", "gluten-free", "nut allergy"]
      }
    ]
  }
];

export const MASCOTS = {
  noor:  { emoji: '🌟', en: 'Noor',       ur: 'نور' },
  zappy: { emoji: '⚡', en: 'Zappy',      ur: 'زپی' },
  fikri: { emoji: '🧠', en: 'Fikri',      ur: 'فکری' },
  ullu:  { emoji: '🦉', en: 'Ullu Bhai',  ur: 'اُلّو بھائی' },
};

export const WORLDS = {
  light:   { id: 'light',   color: 'gold',  guide: 'noor',  en: 'The Light of Allah',   ur: 'اللہ کا نور' },
  compute: { id: 'compute', color: 'teal',  guide: 'zappy', en: 'How Computers Think',   ur: 'کمپیوٹر کیسے سوچتا ہے' },
  ai:      { id: 'ai',      color: 'coral', guide: 'fikri', en: 'Meet AI',               ur: 'اے آئی سے ملیں' },
  data:    { id: 'data',    color: 'lime',  guide: 'ullu',  en: 'Data Detective',         ur: 'ڈیٹا جاسوس' },
  neuro:   { id: 'neuro',  color: 'pink',  guide: 'fikri', en: 'Robot Brains',            ur: 'روبوٹ کا دماغ' },
};

// ─── Re-usable content blocks ─────────────────────────────────────────────

const PILLARS = [
  { key: 'shahada', num: 1, icon: '🕋', en: 'Shahada — Declaration of Faith', ur: 'شہادت — ایمان کا اعلان' },
  { key: 'salah',   num: 2, icon: '🙏', en: 'Salah — Prayer 5x a day',        ur: 'نماز — دن میں 5 بار' },
  { key: 'zakat',   num: 3, icon: '💛', en: 'Zakat — Giving to the poor',     ur: 'زکوٰۃ — غریبوں کو دینا' },
  { key: 'sawm',    num: 4, icon: '🌙', en: 'Sawm — Fasting in Ramadan',      ur: 'روزہ — رمضان میں' },
  { key: 'hajj',    num: 5, icon: '🕌', en: 'Hajj — Pilgrimage to Makkah',    ur: 'حج — مکہ کا سفر' },
];

export const DAYS = [
  // ── DAY 1 · FREE · A bright beginning ───────────────────────────────────
  {
    title: { en: 'A bright beginning', ur: 'روشن آغاز' },
    games: [
      {
        type: 'quranStar', world: 'light',
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        en: 'In the name of Allah, the Most Gracious, the Most Merciful.',
        ur: 'اللہ کے نام سے جو بہت مہربان نہایت رحم والا ہے۔',
        label: { en: 'Say Bismillah before everything', ur: 'ہر کام سے پہلے بسم اللہ' },
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'What does "Bismillah" mean?', ur: '"بسم اللہ" کا مطلب کیا ہے؟' },
        options: [
          { en: 'In the name of Allah 🤲', ur: 'اللہ کے نام سے 🤲', correct: true },
          { en: 'Goodbye 👋', ur: 'الوداع 👋' },
          { en: 'Good morning ☀️', ur: 'صبح بخیر ☀️' },
        ],
      },
      {
        type: 'quranStar', world: 'light',
        arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        en: 'All praise is for Allah, Lord of all worlds.',
        ur: 'سب تعریف اللہ کے لیے ہے جو سارے جہانوں کا رب ہے۔',
        label: { en: 'Al-Fatihah Verse 2 — Alhamdulillah', ur: 'الفاتحہ آیت ۲ — الحمد للہ' },
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الرَّحْمَٰن', en: 'The Most Gracious', ur: 'بہت مہربان' },
          { ar: 'الرَّحِيم',   en: 'The Most Merciful', ur: 'نہایت رحم والا' },
          { ar: 'الْمَلِك',    en: 'The King',           ur: 'بادشاہ' },
        ],
      },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ',
        en: 'Actions are judged by intentions. Make a good niyyah before you start!',
        ur: 'اعمال کا دارومدار نیت پر ہے۔ شروع کرنے سے پہلے اچھی نیت کریں!',
        label: { en: 'Hadith on Intentions (Niyyah)', ur: 'نیت کی حدیث' },
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'How many times do Muslims pray every day?', ur: 'مسلمان ہر روز کتنی بار نماز پڑھتے ہیں؟' },
        options: [
          { en: '5 times 🙏', ur: '5 بار 🙏', correct: true },
          { en: '3 times', ur: '3 بار' },
          { en: '7 times', ur: '7 بار' },
        ],
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'السَّمِيع', en: 'The All-Hearing', ur: 'سب سننے والا' },
          { ar: 'الْبَصِير', en: 'The All-Seeing',  ur: 'سب دیکھنے والا' },
          { ar: 'الْعَلِيم', en: 'The All-Knowing', ur: 'سب جاننے والا' },
        ],
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'What do we say when something good happens?', ur: 'جب اچھی بات ہو تو کیا کہتے ہیں؟' },
        options: [
          { en: 'Alhamdulillah 🌟', ur: 'الحمد للہ 🌟', correct: true },
          { en: 'Uh oh 😮', ur: 'اوہ! 😮' },
          { en: 'OK fine 😐', ur: 'ٹھیک ہے 😐' },
        ],
      },
      {
        type: 'mannersSort', world: 'light',
        items: [
          { icon: '🤝', en: 'Greet everyone with Salaam',  ur: 'سب کو سلام کریں',        good: true  },
          { icon: '🍽️', en: 'Eat with the right hand',     ur: 'دائیں ہاتھ سے کھانا',   good: true  },
          { icon: '👊', en: 'Hit your friend',              ur: 'دوست کو مارنا',           good: false },
          { icon: '🚿', en: 'Keep yourself clean daily',   ur: 'روزانہ صاف رہنا',         good: true  },
          { icon: '📢', en: 'Shout at elders',             ur: 'بزرگوں پر چلانا',         good: false },
        ],
      },
      {
        type: 'quiz', world: 'compute',
        question: { en: 'What does a computer use to "see"?', ur: 'کمپیوٹر "دیکھنے" کے لیے کیا استعمال کرتا ہے؟' },
        options: [
          { en: 'A camera 📷', ur: 'کیمرہ 📷', correct: true },
          { en: 'A spoon 🥄',  ur: 'چمچ 🥄' },
          { en: 'A shoe 👟',   ur: 'جوتا 👟' },
        ],
      },
      {
        type: 'quiz', world: 'compute',
        question: { en: 'What is the brain of a computer called?', ur: 'کمپیوٹر کے دماغ کو کیا کہتے ہیں؟' },
        options: [
          { en: 'CPU 🧠', ur: 'سی پی یو 🧠', correct: true },
          { en: 'Screen 🖥️', ur: 'سکرین 🖥️' },
          { en: 'Keyboard ⌨️', ur: 'کی بورڈ ⌨️' },
        ],
      },
      { type: 'binary', world: 'compute', target: 3 },
      { type: 'binary', world: 'compute', target: 6 },
      {
        type: 'inputOutput', world: 'compute',
        items: [
          { icon: '⌨️', en: 'Keyboard',  ur: 'کی بورڈ', isInput: true  },
          { icon: '🖥️', en: 'Monitor',   ur: 'مانیٹر',  isInput: false },
          { icon: '🖱️', en: 'Mouse',     ur: 'ماؤس',    isInput: true  },
          { icon: '🔊', en: 'Speakers',  ur: 'اسپیکر',  isInput: false },
          { icon: '📷', en: 'Webcam',    ur: 'ویب کیم', isInput: true  },
          { icon: '🖨️', en: 'Printer',   ur: 'پرنٹر',   isInput: false },
        ],
      },
      {
        type: 'patternFinder', world: 'data',
        pattern: ['🌙', '⭐', '🌙', '⭐', '🌙', '?'],
        options: [
          { icon: '⭐', correct: true  },
          { icon: '☁️', correct: false },
          { icon: '🌈', correct: false },
        ],
      },
    ],
  },

  // ── DAY 2 · FREE · Kindness counts ──────────────────────────────────────
  {
    title: { en: 'Kindness counts', ur: 'مہربانی کی قیمت' },
    games: [
      {
        type: 'quranStar', world: 'light',
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        en: 'Say, He is Allah, the One.',
        ur: 'کہہ دو کہ اللہ ایک ہے۔',
        label: { en: 'Surah Al-Ikhlas — verse 1', ur: 'سورۃ الاخلاص — آیت ۱' },
      },
      {
        type: 'quranStar', world: 'light',
        arabic: 'اللَّهُ الصَّمَدُ',
        en: 'Allah is the Eternal, Absolute.',
        ur: 'اللہ بے نیاز ہے۔',
        label: { en: 'Surah Al-Ikhlas — verse 2', ur: 'سورۃ الاخلاص — آیت ۲' },
      },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ',
        en: 'Your smile in the face of your brother is a charity.',
        ur: 'اپنے بھائی کے چہرے پر تمہاری مسکراہٹ صدقہ ہے۔',
        label: { en: 'Hadith on Smiling', ur: 'مسکرانے کی حدیث' },
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'What is the meaning of "Sadaqah"?', ur: '"صدقہ" کا مطلب کیا ہے؟' },
        options: [
          { en: 'Giving charity to others 💛', ur: 'دوسروں کو کچھ دینا 💛', correct: true },
          { en: 'Eating food 🍽️', ur: 'کھانا کھانا 🍽️' },
          { en: 'Running fast 🏃', ur: 'تیز دوڑنا 🏃' },
        ],
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الْكَرِيم', en: 'The Most Generous', ur: 'سب سے سخی'        },
          { ar: 'اللَّطِيف', en: 'The Most Kind',     ur: 'بہت مہربان'        },
          { ar: 'الرَّءُوف', en: 'The Most Compassionate', ur: 'بہت شفیق'   },
        ],
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'How do we greet other Muslims?', ur: 'ہم دوسرے مسلمانوں کو کیسے سلام کرتے ہیں؟' },
        options: [
          { en: 'Assalamu Alaikum 🤝', ur: 'السلام علیکم 🤝', correct: true },
          { en: 'Hi there! 👋', ur: 'ہائے! 👋' },
          { en: 'Good day 🌤️', ur: 'شب بخیر 🌤️' },
        ],
      },
      {
        type: 'mannersSort', world: 'light',
        items: [
          { icon: '🎁', en: 'Share your toys with friends',     ur: 'دوستوں کے ساتھ کھلونے بانٹیں', good: true  },
          { icon: '😢', en: 'Laugh at someone who is crying',  ur: 'رونے والے پر ہنسیں',           good: false },
          { icon: '🌹', en: 'Give a gift to make someone happy', ur: 'خوش کرنے کے لیے تحفہ دیں',   good: true  },
          { icon: '🙈', en: 'Ignore a friend who needs help',  ur: 'ضرورتمند دوست کو نظرانداز کریں', good: false },
          { icon: '🤲', en: 'Make dua for your family',        ur: 'اپنے خاندان کے لیے دعا کریں',  good: true  },
        ],
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'What is the best way to be kind to animals?', ur: 'جانوروں سے مہربانی کا بہترین طریقہ کیا ہے؟' },
        options: [
          { en: 'Feed them and be gentle 🐾', ur: 'کھانا دیں اور نرمی سے پیش آئیں 🐾', correct: true },
          { en: 'Chase them away 😤', ur: 'انہیں بھگا دیں 😤' },
          { en: 'Ignore them 😐', ur: 'نظرانداز کریں 😐' },
        ],
      },
      { type: 'binary', world: 'compute', target: 5 },
      { type: 'binary', world: 'compute', target: 2 },
      {
        type: 'dataSort', world: 'data',
        label: { en: 'Sort kind acts from fewest to most smiles!', ur: 'مسکراہٹوں کو کم سے زیادہ کریں!' },
        items: [
          { val: 3, icon: '😊', en: '3 smiles', ur: '3 مسکراہٹیں' },
          { val: 1, icon: '😊', en: '1 smile',  ur: '1 مسکراہٹ'   },
          { val: 5, icon: '😊', en: '5 smiles', ur: '5 مسکراہٹیں' },
          { val: 2, icon: '😊', en: '2 smiles', ur: '2 مسکراہٹیں' },
        ],
      },
      {
        type: 'robotChef', world: 'compute',
        task: { en: 'Help Zappy ⚡ make a sandwich!', ur: 'زپی ⚡ کو سینڈوچ بنانے میں مدد کریں!' },
        steps: [
          { order: 1, icon: '🍞', en: 'Take bread',     ur: 'روٹی لیں'       },
          { order: 2, icon: '🧈', en: 'Spread butter',  ur: 'مکھن لگائیں'   },
          { order: 3, icon: '🥗', en: 'Add filling',    ur: 'بھرنا ڈالیں'   },
          { order: 4, icon: '🍞', en: 'Close sandwich', ur: 'سینڈوچ بند کریں' },
        ],
      },
      {
        type: 'patternFinder', world: 'data',
        pattern: ['🌹', '💛', '🌹', '💛', '🌹', '?'],
        options: [
          { icon: '💛', correct: true  },
          { icon: '🌙', correct: false },
          { icon: '⭐', correct: false },
        ],
      },
      {
        type: 'quiz', world: 'compute',
        question: { en: 'What does a computer do with data?', ur: 'کمپیوٹر ڈیٹا کے ساتھ کیا کرتا ہے؟' },
        options: [
          { en: 'Stores and processes it ⚙️', ur: 'محفوظ اور پروسیس کرتا ہے ⚙️', correct: true },
          { en: 'Eats it 😋', ur: 'کھا لیتا ہے 😋' },
          { en: 'Throws it away 🗑️', ur: 'پھینک دیتا ہے 🗑️' },
        ],
      },
    ],
  },

  // ── DAY 3 · FREE · Smart helpers ────────────────────────────────────────
  {
    title: { en: 'Smart helpers', ur: 'ہوشیار مددگار' },
    games: [
      {
        type: 'quranStar', world: 'light',
        arabic: 'وَالضُّحَىٰ ۝ وَاللَّيْلِ إِذَا سَجَىٰ',
        en: 'By the morning brightness — and the night when it grows still.',
        ur: 'قسم ہے چاشت کی — اور رات کی جب وہ چھا جائے۔',
        label: { en: 'Surah Ad-Duha — verses 1-2', ur: 'سورۃ الضحیٰ — آیت ۱-۲' },
      },
      {
        type: 'quranStar', world: 'light',
        arabic: 'مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ',
        en: 'Your Lord has not abandoned you, nor has He hated you.',
        ur: 'تمہارے رب نے تمہیں نہیں چھوڑا اور نہ ہی ناراض ہوا۔',
        label: { en: 'Surah Ad-Duha — verse 3', ur: 'سورۃ الضحیٰ — آیت ۳' },
      },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ',
        en: 'Seeking knowledge is an obligation upon every Muslim.',
        ur: 'علم حاصل کرنا ہر مسلمان پر فرض ہے۔',
        label: { en: 'Hadith on Knowledge', ur: 'علم کی حدیث' },
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الْحَكِيم', en: 'The All-Wise',     ur: 'بہت حکمت والا' },
          { ar: 'الْعَدْل',  en: 'The Just',          ur: 'انصاف کرنے والا' },
          { ar: 'الْغَفُور', en: 'The Most Forgiving', ur: 'بہت بخشنے والا' },
        ],
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'What do we say before sleeping?', ur: 'سونے سے پہلے کیا کہتے ہیں؟' },
        options: [
          { en: 'Bismillah & dua for sleep 🌙', ur: 'بسم اللہ اور سونے کی دعا 🌙', correct: true },
          { en: 'See you later! 👋', ur: 'بعد میں ملیں! 👋' },
          { en: 'Good morning ☀️', ur: 'صبح بخیر ☀️' },
        ],
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'Which prophet was known as the "Father of Prophets"?', ur: 'کون سے نبی کو "ابو الانبیاء" کہتے ہیں؟' },
        options: [
          { en: 'Ibrahim ﷺ 🕋', ur: 'ابراہیم ﷺ 🕋', correct: true },
          { en: 'Nuh ﷺ ⛵', ur: 'نوح ﷺ ⛵' },
          { en: 'Musa ﷺ 📜', ur: 'موسیٰ ﷺ 📜' },
        ],
      },
      {
        type: 'fivePillars', world: 'light', pillars: PILLARS,
      },
      {
        type: 'quiz', world: 'ai',
        question: { en: 'How does AI learn?', ur: 'اے آئی کیسے سیکھتی ہے؟' },
        options: [
          { en: 'By seeing many examples 👀', ur: 'بہت سی مثالیں دیکھ کر 👀', correct: true },
          { en: 'By sleeping 😴', ur: 'سو کر 😴' },
          { en: 'By magic ✨', ur: 'جادو سے ✨' },
        ],
      },
      {
        type: 'quiz', world: 'ai',
        question: { en: 'What can AI NOT do?', ur: 'اے آئی کیا نہیں کر سکتی؟' },
        options: [
          { en: 'Make dua from the heart 🤲', ur: 'دل سے دعا کرنا 🤲', correct: true },
          { en: 'Answer questions 💬', ur: 'سوالوں کے جواب دینا 💬' },
          { en: 'Sort photos 🖼️', ur: 'تصویریں ترتیب دینا 🖼️' },
        ],
      },
      {
        type: 'aiOrHuman', world: 'ai',
        items: [
          { icon: '📝', en: 'Translate text to another language', ur: 'متن کا ترجمہ کرنا',           isAI: true  },
          { icon: '😢', en: 'Cry when sad',                       ur: 'اداس ہونے پر رونا',           isAI: false },
          { icon: '🔊', en: 'Turn speech into text in seconds',   ur: 'آواز کو فوری متن میں بدلنا', isAI: true  },
          { icon: '🤲', en: 'Make sincere dua to Allah',          ur: 'اللہ سے سچی دعا کرنا',       isAI: false },
          { icon: '📧', en: 'Filter spam from your email',        ur: 'سپیم ای میل فلٹر کرنا',      isAI: true  },
        ],
      },
      { type: 'binary', world: 'compute', target: 4 },
      {
        type: 'inputOutput', world: 'compute',
        items: [
          { icon: '🎤', en: 'Microphone', ur: 'مائکروفون', isInput: true  },
          { icon: '🖨️', en: 'Printer',   ur: 'پرنٹر',    isInput: false },
          { icon: '📷', en: 'Camera',    ur: 'کیمرہ',     isInput: true  },
          { icon: '🎧', en: 'Headphones', ur: 'ہیڈفون',   isInput: false },
          { icon: '🖱️', en: 'Mouse',     ur: 'ماؤس',     isInput: true  },
          { icon: '🖥️', en: 'Monitor',   ur: 'مانیٹر',   isInput: false },
        ],
      },
      {
        type: 'patternFinder', world: 'data',
        pattern: ['📖', '📿', '📖', '📿', '📖', '?'],
        options: [
          { icon: '📿', correct: true  },
          { icon: '⭐', correct: false },
          { icon: '🌙', correct: false },
        ],
      },
      {
        type: 'quiz', world: 'compute',
        question: { en: 'What is a computer program?', ur: 'کمپیوٹر پروگرام کیا ہوتا ہے؟' },
        options: [
          { en: 'Instructions that tell the computer what to do 📋', ur: 'ہدایات جو کمپیوٹر کو بتاتی ہیں کیا کرنا ہے 📋', correct: true },
          { en: 'A type of food 🍕', ur: 'ایک قسم کا کھانا 🍕' },
          { en: 'A TV show 📺', ur: 'ایک ٹی وی شو 📺' },
        ],
      },
    ],
  },

  // ── DAY 4 · PAID · The Prophet's kindness ───────────────────────────────
  {
    title: { en: "The Prophet's kindness", ur: 'نبی ﷺ کی مہربانی' },
    games: [
      {
        type: 'hadithStory', world: 'light',
        arabic: 'إِنَّمَا بُعِثْتُ لِأُتَمِّمَ مَكَارِمَ الْأَخْلَاقِ',
        en: 'I was sent to perfect good character.',
        ur: 'مجھے اچھے اخلاق کو مکمل کرنے کے لیے بھیجا گیا ہے۔',
        label: { en: 'Hadith on Character', ur: 'اخلاق کی حدیث' },
      },
      {
        type: 'quranStar', world: 'light',
        arabic: 'وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ',
        en: 'And indeed, you are of a great moral character.',
        ur: 'اور بے شک آپ بہت عمدہ اخلاق پر ہیں۔',
        label: { en: 'Al-Qalam: Verse 4 — about the Prophet ﷺ', ur: 'القلم: آیت ۴ — نبی ﷺ کے بارے میں' },
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الْكَرِيم',  en: 'The Most Generous', ur: 'سب سے سخی'     },
          { ar: 'السَّمِيع',  en: 'The All-Hearing',   ur: 'سب کی سننے والا' },
          { ar: 'الْبَصِير',  en: 'The All-Seeing',    ur: 'سب دیکھنے والا' },
        ],
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'What name did the people of Makkah give the Prophet ﷺ?', ur: 'مکہ والوں نے نبی ﷺ کو کیا نام دیا؟' },
        options: [
          { en: 'Al-Amin (The Trustworthy) 🤝', ur: 'الامین (امانتدار) 🤝', correct: true },
          { en: 'Al-Qawiyy (The Strong) 💪', ur: 'القوی (طاقتور) 💪' },
          { en: 'Al-Jaleel (The Majestic) 👑', ur: 'الجلیل (عظیم) 👑' },
        ],
      },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'خَيْرُكُمْ خَيْرُكُمْ لِأَهْلِهِ',
        en: 'The best of you is the one who is best to his family.',
        ur: 'تم میں سے بہترین وہ ہے جو اپنے گھر والوں کے لیے بہترین ہو۔',
        label: { en: 'Hadith on Family', ur: 'گھر والوں کی حدیث' },
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'The Prophet ﷺ was kind to whom?', ur: 'نبی ﷺ کس کے ساتھ مہربان تھے؟' },
        options: [
          { en: 'Everyone — humans and animals 🌍', ur: 'سب سے — انسان اور جانور 🌍', correct: true },
          { en: 'Only rich people 💰', ur: 'صرف امیر لوگوں سے 💰' },
          { en: 'Only his family 👨‍👩‍👧', ur: 'صرف اپنے خاندان سے 👨‍👩‍👧' },
        ],
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الرَّزَّاق', en: 'The Provider',   ur: 'رزق دینے والا'   },
          { ar: 'الْفَتَّاح', en: 'The Opener',     ur: 'کھولنے والا'      },
          { ar: 'الشَّكُور',  en: 'The Appreciative', ur: 'قدردان'         },
        ],
      },
      {
        type: 'mannersSort', world: 'light',
        items: [
          { icon: '🙏', en: 'Say JazakAllah Khair after receiving help', ur: 'مدد ملنے کے بعد جزاک اللہ کہیں', good: true  },
          { icon: '😠', en: 'Stay angry for days',                        ur: 'دنوں تک غصے میں رہیں',           good: false },
          { icon: '🤝', en: 'Forgive someone quickly',                    ur: 'کسی کو جلدی معاف کریں',          good: true  },
          { icon: '🗣️', en: 'Backbite about friends',                     ur: 'دوستوں کی غیبت کریں',            good: false },
          { icon: '💧', en: 'Give water to someone thirsty',              ur: 'پیاسے کو پانی دیں',              good: true  },
        ],
      },
      {
        type: 'robotChef', world: 'compute',
        task: { en: 'Help Zappy ⚡ make tea!', ur: 'زپی ⚡ کو چائے بنانے میں مدد کریں!' },
        steps: [
          { order: 1, icon: '🫖', en: 'Boil water', ur: 'پانی ابالیں'  },
          { order: 2, icon: '🍃', en: 'Add tea',    ur: 'چائے ڈالیں'  },
          { order: 3, icon: '🥛', en: 'Add milk',   ur: 'دودھ ڈالیں'  },
          { order: 4, icon: '🍬', en: 'Add sugar',  ur: 'چینی ڈالیں'  },
        ],
      },
      { type: 'binary', world: 'compute', target: 5 },
      { type: 'binary', world: 'compute', target: 8 },
      {
        type: 'dataSort', world: 'data',
        label: { en: 'Sort from fewest to most kind acts!', ur: 'کم سے زیادہ نیک کام ترتیب دیں!' },
        items: [
          { val: 5, icon: '💛', en: '5 acts', ur: '5 نیک کام' },
          { val: 2, icon: '💛', en: '2 acts', ur: '2 نیک کام' },
          { val: 8, icon: '💛', en: '8 acts', ur: '8 نیک کام' },
          { val: 3, icon: '💛', en: '3 acts', ur: '3 نیک کام' },
        ],
      },
      {
        type: 'patternFinder', world: 'data',
        pattern: ['🕌', '🌙', '🕌', '🌙', '🕌', '?'],
        options: [
          { icon: '🌙', correct: true  },
          { icon: '⭐', correct: false },
          { icon: '🌹', correct: false },
        ],
      },
      {
        type: 'quiz', world: 'compute',
        question: { en: 'What does a computer use to store information?', ur: 'کمپیوٹر معلومات ذخیرہ کرنے کے لیے کیا استعمال کرتا ہے؟' },
        options: [
          { en: 'Memory / Hard drive 💾', ur: 'میموری / ہارڈ ڈرائیو 💾', correct: true },
          { en: 'A notebook 📓', ur: 'نوٹ بک 📓' },
          { en: 'A microwave 🔥', ur: 'مائکرو ویو 🔥' },
        ],
      },
    ],
  },

  // ── DAY 5 · PAID · Five pillars strong ──────────────────────────────────
  {
    title: { en: 'Five pillars strong', ur: 'پانچ ستون مضبوط' },
    games: [
      { type: 'fivePillars', world: 'light', pillars: PILLARS },
      {
        type: 'quranStar', world: 'light',
        arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
        en: 'Say, I seek refuge with the Lord of the daybreak.',
        ur: 'کہو کہ میں صبح کے رب کی پناہ مانگتا ہوں۔',
        label: { en: 'Surah Al-Falaq — verse 1', ur: 'سورۃ الفلق — آیت ۱' },
      },
      {
        type: 'quranStar', world: 'light',
        arabic: 'مِنْ شَرِّ مَا خَلَقَ',
        en: 'From the evil of what He has created.',
        ur: 'اس کے پیدا کیے ہوئے کی برائی سے۔',
        label: { en: 'Surah Al-Falaq — verse 2', ur: 'سورۃ الفلق — آیت ۲' },
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'What is the 1st pillar of Islam?', ur: 'اسلام کا پہلا ستون کیا ہے؟' },
        options: [
          { en: 'Shahada — Declaration of Faith 🕋', ur: 'شہادت — ایمان کا اعلان 🕋', correct: true },
          { en: 'Fasting 🌙', ur: 'روزہ 🌙' },
          { en: 'Hajj 🕌', ur: 'حج 🕌' },
        ],
      },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ',
        en: 'Islam is built on five pillars: Shahada, Salah, Zakat, Sawm, and Hajj.',
        ur: 'اسلام پانچ ستونوں پر بنا ہے: شہادت، نماز، زکوٰۃ، روزہ اور حج۔',
        label: { en: 'Hadith on the Five Pillars', ur: 'پانچ ارکان کی حدیث' },
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'How many times a day do Muslims pray (Salah)?', ur: 'مسلمان روزانہ کتنی بار نماز پڑھتے ہیں؟' },
        options: [
          { en: '5 times 🙏', ur: '5 بار 🙏', correct: true },
          { en: '2 times', ur: '2 بار' },
          { en: '10 times', ur: '10 بار' },
        ],
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الْقُدُّوس', en: 'The Holy',           ur: 'پاک'               },
          { ar: 'السَّلَام',  en: 'The Source of Peace', ur: 'سلامتی دینے والا' },
          { ar: 'الْمُؤْمِن', en: 'The Granter of Faith', ur: 'امن دینے والا'   },
        ],
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'Which pillar of Islam involves fasting in Ramadan?', ur: 'رمضان میں روزہ رکھنا اسلام کا کون سا ستون ہے؟' },
        options: [
          { en: 'Sawm (Fasting) 🌙', ur: 'صوم (روزہ) 🌙', correct: true },
          { en: 'Zakat (Charity) 💛', ur: 'زکوٰۃ 💛' },
          { en: 'Hajj (Pilgrimage) 🕌', ur: 'حج 🕌' },
        ],
      },
      {
        type: 'mannersSort', world: 'light',
        items: [
          { icon: '🌙', en: 'Fast in Ramadan with your family', ur: 'خاندان کے ساتھ رمضان کا روزہ رکھیں', good: true  },
          { icon: '💛', en: 'Give a portion of wealth to the poor', ur: 'غریبوں کو مال کا حصہ دیں',      good: true  },
          { icon: '🤥', en: 'Make excuses to skip prayers',         ur: 'نماز چھوڑنے کے بہانے بنائیں',   good: false },
          { icon: '🕋', en: 'Learn and repeat the Shahada',         ur: 'شہادت یاد کریں اور دہرائیں',    good: true  },
          { icon: '😴', en: 'Sleep during prayer time',             ur: 'نماز کے وقت سوئیں',             good: false },
        ],
      },
      { type: 'binary', world: 'compute', target: 3  },
      { type: 'binary', world: 'compute', target: 10 },
      {
        type: 'inputOutput', world: 'compute',
        items: [
          { icon: '⌨️', en: 'Keyboard',   ur: 'کی بورڈ',  isInput: true  },
          { icon: '🖥️', en: 'Monitor',    ur: 'مانیٹر',   isInput: false },
          { icon: '🎤', en: 'Microphone', ur: 'مائکروفون', isInput: true  },
          { icon: '🔊', en: 'Speakers',   ur: 'اسپیکر',   isInput: false },
        ],
      },
      {
        type: 'robotChef', world: 'compute',
        task: { en: 'Help the robot pray in order!', ur: 'روبوٹ کو ترتیب سے نماز پڑھنے میں مدد کریں!' },
        steps: [
          { order: 1, icon: '💧', en: 'Make wudu',        ur: 'وضو کریں'        },
          { order: 2, icon: '🧎', en: 'Face the Qibla',   ur: 'قبلہ رخ ہوں'    },
          { order: 3, icon: '🙌', en: 'Say Allahu Akbar', ur: 'اللہ اکبر کہیں' },
          { order: 4, icon: '🙇', en: 'Make ruku',        ur: 'رکوع کریں'       },
          { order: 5, icon: '🤲', en: 'Make sujood',      ur: 'سجدہ کریں'       },
        ],
      },
      {
        type: 'patternFinder', world: 'data',
        pattern: ['🕋', '⭐', '🕋', '⭐', '🕋', '?'],
        options: [
          { icon: '⭐', correct: true  },
          { icon: '🌙', correct: false },
          { icon: '🌹', correct: false },
        ],
      },
    ],
  },

  // ── DAY 6 · PAID · Clean inside and out ─────────────────────────────────
  {
    title: { en: 'Clean inside and out', ur: 'اندر اور باہر سے پاک' },
    games: [
      {
        type: 'quranStar', world: 'light',
        arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
        en: 'Say, I seek refuge with the Lord of mankind.',
        ur: 'کہو کہ میں لوگوں کے رب کی پناہ مانگتا ہوں۔',
        label: { en: 'Surah An-Nas — verse 1', ur: 'سورۃ الناس — آیت ۱' },
      },
      {
        type: 'quranStar', world: 'light',
        arabic: 'مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ',
        en: 'The King of mankind — the God of mankind.',
        ur: 'لوگوں کے بادشاہ — لوگوں کے معبود۔',
        label: { en: 'Surah An-Nas — verses 2-3', ur: 'سورۃ الناس — آیت ۲-۳' },
      },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'الطَّهُورُ شَطْرُ الْإِيمَانِ',
        en: 'Cleanliness is half of faith.',
        ur: 'پاکی آدھا ایمان ہے۔',
        label: { en: 'Hadith on Cleanliness', ur: 'صفائی کی حدیث' },
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'What is the Islamic ritual washing called before prayer?', ur: 'نماز سے پہلے اسلامی پاکیزگی کو کیا کہتے ہیں؟' },
        options: [
          { en: 'Wudu 💧', ur: 'وضو 💧', correct: true },
          { en: 'Ghusl 🚿', ur: 'غسل 🚿' },
          { en: 'Siwak 🪥', ur: 'سواک 🪥' },
        ],
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الطَّيِّب', en: 'The Good and Pure', ur: 'پاک اور اچھا'    },
          { ar: 'الْجَمِيل', en: 'The Beautiful',     ur: 'خوبصورت'          },
          { ar: 'الْحَيِيّ', en: 'The Modest',         ur: 'حیادار'           },
        ],
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'What do we use to clean our teeth following the Sunnah?', ur: 'سنت کے مطابق دانت صاف کرنے کے لیے کیا استعمال کرتے ہیں؟' },
        options: [
          { en: 'Siwak (miswak) 🪥', ur: 'مسواک 🪥', correct: true },
          { en: 'A stone 🪨', ur: 'پتھر 🪨' },
          { en: 'Sand 🏖️', ur: 'ریت 🏖️' },
        ],
      },
      {
        type: 'robotChef', world: 'compute',
        task: { en: 'Do Wudu in the right order!', ur: 'صحیح ترتیب سے وضو کریں!' },
        steps: [
          { order: 1, icon: '🙏', en: 'Make intention (Niyyah)', ur: 'نیت کریں'             },
          { order: 2, icon: '🤲', en: 'Wash both hands 3 times', ur: 'دونوں ہاتھ ۳ بار دھوئیں' },
          { order: 3, icon: '💧', en: 'Rinse mouth 3 times',     ur: 'کلی ۳ بار کریں'      },
          { order: 4, icon: '😊', en: 'Wash face 3 times',       ur: 'چہرہ ۳ بار دھوئیں'   },
          { order: 5, icon: '💪', en: 'Wash arms to elbows',     ur: 'کہنیوں تک بازو دھوئیں' },
        ],
      },
      {
        type: 'mannersSort', world: 'light',
        items: [
          { icon: '🪥', en: 'Brush teeth every morning',     ur: 'ہر صبح دانت صاف کریں',       good: true  },
          { icon: '🗑️', en: 'Drop litter on the street',    ur: 'سڑک پر کچرا پھینکیں',         good: false },
          { icon: '🚿', en: 'Wash hands before eating',      ur: 'کھانے سے پہلے ہاتھ دھوئیں',  good: true  },
          { icon: '😤', en: 'Sneeze without covering mouth', ur: 'منہ ڈھانپے بغیر چھینکیں',    good: false },
          { icon: '🧹', en: 'Keep your room tidy',           ur: 'اپنا کمرہ صاف رکھیں',         good: true  },
        ],
      },
      {
        type: 'dataSort', world: 'data',
        label: { en: 'Sort from smallest to largest!', ur: 'چھوٹے سے بڑے کی طرف ترتیب دیں!' },
        items: [
          { val: 2, icon: '🌟', en: '2 stars', ur: '2 ستارے' },
          { val: 7, icon: '🌟', en: '7 stars', ur: '7 ستارے' },
          { val: 4, icon: '🌟', en: '4 stars', ur: '4 ستارے' },
          { val: 1, icon: '🌟', en: '1 star',  ur: '1 ستارہ'  },
        ],
      },
      { type: 'binary', world: 'compute', target: 7 },
      { type: 'binary', world: 'compute', target: 4 },
      {
        type: 'inputOutput', world: 'compute',
        items: [
          { icon: '⌨️', en: 'Keyboard', ur: 'کی بورڈ', isInput: true  },
          { icon: '🖥️', en: 'Monitor',  ur: 'مانیٹر',  isInput: false },
          { icon: '🖱️', en: 'Mouse',    ur: 'ماؤس',    isInput: true  },
          { icon: '🔊', en: 'Speaker',  ur: 'اسپیکر',  isInput: false },
          { icon: '📷', en: 'Camera',   ur: 'کیمرہ',   isInput: true  },
          { icon: '🖨️', en: 'Printer',  ur: 'پرنٹر',   isInput: false },
        ],
      },
      {
        type: 'patternFinder', world: 'data',
        pattern: ['💧', '🌿', '💧', '🌿', '💧', '?'],
        options: [
          { icon: '🌿', correct: true  },
          { icon: '⭐', correct: false },
          { icon: '🌙', correct: false },
        ],
      },
      {
        type: 'quiz', world: 'compute',
        question: { en: 'How do computers communicate with each other?', ur: 'کمپیوٹر ایک دوسرے سے کیسے بات کرتے ہیں؟' },
        options: [
          { en: 'Through the internet 🌐', ur: 'انٹرنیٹ کے ذریعے 🌐', correct: true },
          { en: 'By shouting 📢', ur: 'چلا کر 📢' },
          { en: 'By magic spells ✨', ur: 'جادو سے ✨' },
        ],
      },
    ],
  },

  // ── DAY 7 · PAID · Good habits are a superpower ─────────────────────────
  {
    title: { en: 'Good habits are a superpower', ur: 'اچھی عادت سپر پاور ہے' },
    games: [
      {
        type: 'quranStar', world: 'light',
        arabic: 'وَالْعَصْرِ ۝ إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ',
        en: 'By time — Indeed, mankind is in loss.',
        ur: 'زمانے کی قسم — بے شک انسان خسارے میں ہے۔',
        label: { en: 'Surah Al-Asr — verses 1-2', ur: 'سورۃ العصر — آیت ۱-۲' },
      },
      {
        type: 'quranStar', world: 'light',
        arabic: 'إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ',
        en: 'Except those who believe and do righteous deeds.',
        ur: 'سوائے ان لوگوں کے جو ایمان لائے اور نیک کام کیے۔',
        label: { en: 'Surah Al-Asr — verse 3', ur: 'سورۃ العصر — آیت ۳' },
      },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ',
        en: 'The most beloved deeds to Allah are the most consistent ones, even if they are small.',
        ur: 'اللہ کو سب سے زیادہ پسند وہ عمل ہے جو مستقل ہو، چاہے تھوڑا ہو۔',
        label: { en: 'Hadith on Consistency', ur: 'مستقل مزاجی کی حدیث' },
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'What do we say before eating?', ur: 'کھانے سے پہلے کیا کہتے ہیں؟' },
        options: [
          { en: 'Bismillah 🍽️', ur: 'بسم اللہ 🍽️', correct: true },
          { en: 'Goodbye 👋',    ur: 'الوداع 👋'       },
          { en: 'Sorry 😔',      ur: 'معاف کریں 😔'    },
        ],
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الْغَفُور',  en: 'The Most Forgiving', ur: 'بہت بخشنے والا' },
          { ar: 'الرَّزَّاق', en: 'The Provider',        ur: 'رزق دینے والا'  },
          { ar: 'الْحَكِيم',  en: 'The All-Wise',        ur: 'بہت حکمت والا'  },
        ],
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'Which daily habit did the Prophet ﷺ love most?', ur: 'نبی ﷺ کو کون سی روزانہ کی عادت سب سے زیادہ پسند تھی؟' },
        options: [
          { en: 'Consistent small good deeds 🌟', ur: 'مستقل چھوٹی نیکیاں 🌟', correct: true },
          { en: 'Only big grand acts 🏆', ur: 'صرف بڑے کام 🏆' },
          { en: 'Doing nothing 😴', ur: 'کچھ نہ کرنا 😴' },
        ],
      },
      {
        type: 'mannersSort', world: 'light',
        items: [
          { icon: '📖', en: 'Read Quran every day',           ur: 'ہر روز قرآن پڑھیں',             good: true  },
          { icon: '🌙', en: 'Make dua before sleeping',       ur: 'سونے سے پہلے دعا کریں',         good: true  },
          { icon: '🎮', en: 'Play games all night',           ur: 'ساری رات گیم کھیلیں',            good: false },
          { icon: '🤝', en: 'Help your parents at home',      ur: 'گھر میں والدین کی مدد کریں',    good: true  },
          { icon: '🗑️', en: 'Never clean your room',         ur: 'کمرہ کبھی صاف نہ کریں',         good: false },
        ],
      },
      {
        type: 'patternFinder', world: 'data',
        pattern: ['🌙', '⭐', '🌙', '⭐', '🌙', '?'],
        options: [
          { icon: '⭐', correct: true  },
          { icon: '☁️', correct: false },
          { icon: '🌈', correct: false },
        ],
      },
      {
        type: 'quiz', world: 'ai',
        question: { en: 'Where do you see AI every day?', ur: 'آپ ہر روز AI کہاں دیکھتے ہیں؟' },
        options: [
          { en: 'YouTube suggestions 📱', ur: 'یوٹیوب کی تجاویز 📱', correct: true },
          { en: 'A pencil ✏️',             ur: 'پنسل ✏️'              },
          { en: 'A chair 🪑',              ur: 'کرسی 🪑'               },
        ],
      },
      {
        type: 'aiOrHuman', world: 'ai',
        items: [
          { icon: '📱', en: 'Suggest the next video to watch', ur: 'اگلی ویڈیو تجویز کرنا',      isAI: true  },
          { icon: '😊', en: 'Feel happy when praised',         ur: 'تعریف پر خوش ہونا',           isAI: false },
          { icon: '🚗', en: 'Drive a self-driving car',        ur: 'خود چلنے والی گاڑی چلانا',   isAI: true  },
          { icon: '🤲', en: 'Pray for forgiveness',            ur: 'بخشش کے لیے دعا کرنا',        isAI: false },
          { icon: '📸', en: 'Tag friends in photos automatically', ur: 'تصاویر میں دوستوں کو خودکار ٹیگ کرنا', isAI: true },
        ],
      },
      { type: 'binary', world: 'compute', target: 9  },
      { type: 'binary', world: 'compute', target: 12 },
      {
        type: 'dataSort', world: 'data',
        label: { en: 'Sort good habits from fewest to most days done!', ur: 'کم سے زیادہ دنوں میں اچھی عادتیں ترتیب دیں!' },
        items: [
          { val: 3, icon: '📖', en: '3 days reading', ur: '3 دن پڑھنا'   },
          { val: 7, icon: '📖', en: '7 days reading', ur: '7 دن پڑھنا'   },
          { val: 1, icon: '📖', en: '1 day reading',  ur: '1 دن پڑھنا'   },
          { val: 5, icon: '📖', en: '5 days reading', ur: '5 دن پڑھنا'   },
        ],
      },
      {
        type: 'quiz', world: 'compute',
        question: { en: 'What do we call step-by-step instructions for a computer?', ur: 'کمپیوٹر کے لیے قدم بہ قدم ہدایات کو کیا کہتے ہیں؟' },
        options: [
          { en: 'An algorithm ⚙️', ur: 'الگورتھم ⚙️', correct: true },
          { en: 'A sandwich 🥪', ur: 'سینڈوچ 🥪' },
          { en: 'A song 🎵', ur: 'گانا 🎵' },
        ],
      },
    ],
  },

  // ── DAY 8 · PAID · The Prophet's birth ──────────────────────────────────
  {
    title: { en: "The Prophet's birth", ur: 'نبی ﷺ کی پیدائش' },
    games: [
      {
        type: 'prophetJourney',
        panels: [
          {
            icon: '🕋',
            title: { en: 'Born in Makkah', ur: 'مکہ میں پیدائش' },
            text: {
              en: 'Muhammad ﷺ was born in Makkah in 570 CE — the Year of the Elephant. His father Abdullah had passed away before his birth, and his mother was Aminah. Allah chose this blessed land for the most beloved of all people!',
              ur: 'محمد ﷺ ۵۷۰ عیسوی میں مکہ مکرمہ میں پیدا ہوئے — ہاتھی کا سال۔ آپ کے والد عبداللہ آپ کی پیدائش سے پہلے وفات پا گئے تھے اور والدہ آمنہ تھیں۔ اللہ نے تمام لوگوں میں سب سے پیارے کے لیے یہ مبارک سرزمین چنی!',
            },
          },
          {
            icon: '🌟',
            title: { en: 'A Gentle Childhood', ur: 'پیاری بچپن' },
            text: {
              en: 'Muhammad ﷺ grew up with Halimah Sa\'diyyah in the desert. He was kind to everyone and never told a lie. He helped people in need and loved animals. Everyone in Makkah noticed his gentle, beautiful character.',
              ur: 'محمد ﷺ حلیمہ سعدیہ کے ساتھ صحرا میں پلے بڑھے۔ آپ سب کے ساتھ مہربان تھے اور کبھی جھوٹ نہیں بولتے تھے۔ آپ ضرورتمندوں کی مدد کرتے اور جانوروں سے محبت کرتے تھے۔',
            },
          },
          {
            icon: '🤝',
            title: { en: 'Al-Amin: The Trustworthy', ur: 'الامین: امانتدار' },
            text: {
              en: 'People called Muhammad ﷺ "Al-Amin" — The Trustworthy — because he always kept his promises and told the truth. Even people who later disagreed with him trusted him with their most precious belongings!',
              ur: 'لوگ محمد ﷺ کو "الامین" یعنی "امانتدار" کہتے تھے کیونکہ آپ ہمیشہ وعدہ پورا کرتے اور سچ بولتے تھے۔ بعد میں مخالفین بھی اپنی قیمتی چیزیں آپ کے پاس امانت رکھتے تھے!',
            },
          },
        ],
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'Which city was the Prophet Muhammad ﷺ born in?', ur: 'نبی محمد ﷺ کس شہر میں پیدا ہوئے؟' },
        options: [
          { en: 'Makkah 🕋',    ur: 'مکہ 🕋',    correct: true },
          { en: 'Jerusalem 🌙', ur: 'بیت المقدس 🌙' },
          { en: 'Madinah 🌴',   ur: 'مدینہ 🌴' },
        ],
      },
      { type: 'binary', world: 'compute', target: 6 },
    ],
  },

  // ── DAY 9 · PAID · Good habits ──────────────────────────────────────────
  {
    title: { en: 'Good habits', ur: 'اچھی عادتیں' },
    games: [
      {
        type: 'mannersSort',
        items: [
          { icon: '👋', en: 'Say Salaam to everyone',         ur: 'سب کو سلام کریں',            good: true },
          { icon: '🍽️', en: 'Share your food',                ur: 'کھانا بانٹیں',               good: true },
          { icon: '😤', en: 'Push someone out of the way',    ur: 'کسی کو دھکا دیں',            good: false },
          { icon: '🙏', en: 'Say Alhamdulillah',              ur: 'الحمد للہ کہیں',             good: true },
          { icon: '💥', en: 'Break someone\'s things',        ur: 'کسی کی چیزیں توڑیں',         good: false },
        ],
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الْقُدُّوس', en: 'The Holy',              ur: 'پاک' },
          { ar: 'السَّلَام',  en: 'The Source of Peace',   ur: 'سلامتی دینے والا' },
          { ar: 'الْمُؤْمِن', en: 'The Granter of Faith',  ur: 'امن دینے والا' },
        ],
      },
      {
        type: 'dataSort', world: 'data',
        label: { en: 'Sort from smallest to largest!', ur: 'چھوٹے سے بڑے کی طرف ترتیب دیں!' },
        items: [
          { val: 4, icon: '📿', en: '4 beads',  ur: '4 تسبیح' },
          { val: 1, icon: '📿', en: '1 bead',   ur: '1 تسبیح' },
          { val: 7, icon: '📿', en: '7 beads',  ur: '7 تسبیح' },
          { val: 2, icon: '📿', en: '2 beads',  ur: '2 تسبیح' },
        ],
      },
    ],
  },

  // ── DAY 10 · PAID · Computers need senses ───────────────────────────────
  {
    title: { en: 'Computers need senses', ur: 'کمپیوٹر کو حواس چاہئیں' },
    games: [
      {
        type: 'inputOutput',
        items: [
          { icon: '⌨️', en: 'Keyboard',        ur: 'کی بورڈ',   isInput: true },
          { icon: '🖱️', en: 'Mouse',           ur: 'ماؤس',       isInput: true },
          { icon: '🖥️', en: 'Screen / Monitor', ur: 'اسکرین',    isInput: false },
          { icon: '🔊', en: 'Speaker',          ur: 'اسپیکر',    isInput: false },
        ],
      },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'مَنْ لَا يَشْكُرِ النَّاسَ لَا يَشْكُرِ اللَّهَ',
        en: 'Whoever does not thank people does not thank Allah.',
        ur: 'جو لوگوں کا شکریہ ادا نہیں کرتا وہ اللہ کا شکریہ ادا نہیں کرتا۔',
        label: { en: 'Hadith on Gratitude', ur: 'شکر کی حدیث' },
      },
      {
        type: 'quiz', world: 'compute',
        question: { en: 'What does CPU stand for?', ur: 'CPU کا مطلب کیا ہے؟' },
        options: [
          { en: 'Central Processing Unit ⚙️', ur: 'مرکزی پروسیسنگ یونٹ ⚙️', correct: true },
          { en: 'Computer Power Upgrade 🔋',  ur: 'کمپیوٹر پاور اپ گریڈ 🔋' },
          { en: 'Color Print Upload 🖨️',      ur: 'رنگ پرنٹ اپلوڈ 🖨️' },
        ],
      },
    ],
  },

  // ── DAY 11 · PAID · Write your first program ────────────────────────────
  {
    title: { en: 'Write your first program', ur: 'اپنا پہلا پروگرام لکھیں' },
    games: [
      { type: 'commandRobot', world: 'compute', size: 4, start: [0, 0], end: [1, 2], maxCommands: 6 },
      {
        type: 'quranStar', world: 'light',
        arabic: 'وَالْعَصْرِ ۝ إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ',
        en: 'By time — Indeed, mankind is in loss.',
        ur: 'زمانے کی قسم — بے شک انسان خسارے میں ہے۔',
        label: { en: 'Surah Al-Asr', ur: 'سورۃ العصر' },
      },
      {
        type: 'patternFinder', world: 'data',
        pattern: ['🕋', '🕌', '🕋', '🕌', '🕋', '?'],
        options: [
          { icon: '🕌', correct: true },
          { icon: '⭐', correct: false },
          { icon: '🌙', correct: false },
        ],
      },
    ],
  },

  // ── DAY 12 · PAID · AI detectives ───────────────────────────────────────
  {
    title: { en: 'AI detectives', ur: 'AI کے جاسوس' },
    games: [
      {
        type: 'aiOrHuman',
        items: [
          { icon: '📝', en: 'Translate text to another language', ur: 'متن دوسری زبان میں ترجمہ کرنا',    isAI: true },
          { icon: '😢', en: 'Cry when a pet is lost',            ur: 'پالتو جانور کھونے پر رونا',         isAI: false },
          { icon: '📸', en: 'Recognize faces in 1,000 photos',   ur: '۱۰۰۰ تصاویر میں چہرے پہچاننا',    isAI: true },
          { icon: '🍕', en: 'Taste and enjoy pizza',             ur: 'پیزا چکھنا اور مزہ لینا',          isAI: false },
          { icon: '📧', en: 'Sort a million emails in 1 second', ur: '1 سیکنڈ میں دس لاکھ ای میل ترتیب دینا', isAI: true },
        ],
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الْخَالِق',   en: 'The Creator',          ur: 'پیدا کرنے والا' },
          { ar: 'الْبَارِئ',   en: 'The Originator',       ur: 'بنانے والا' },
          { ar: 'الْمُصَوِّر', en: 'The Fashioner of Form', ur: 'صورت بنانے والا' },
        ],
      },
      { type: 'binary', world: 'compute', target: 9 },
    ],
  },

  // ── DAY 13 · PAID · Wise technology ─────────────────────────────────────
  {
    title: { en: 'Wise technology', ur: 'عقلمند ٹیکنالوجی' },
    games: [
      {
        type: 'goodBadAI',
        items: [
          {
            icon: '🏥', en: 'AI helps doctors spot disease early', ur: 'AI ڈاکٹروں کو بیماری جلدی پکڑنے میں مدد کرتی ہے',
            isGood: true, reason: { en: 'It saves lives by catching illness faster than humans alone.', ur: 'یہ انسانوں سے تیز بیماری پکڑ کر جانیں بچاتی ہے۔' },
          },
          {
            icon: '📝', en: 'AI writes your homework for you', ur: 'AI آپ کا ہوم ورک لکھ دیتی ہے',
            isGood: false, reason: { en: 'If AI learns for you, YOUR brain stays empty. You must struggle to grow!', ur: 'اگر AI آپ کے لیے سیکھے تو آپ کا دماغ خالی رہے گا۔ بڑھنے کے لیے محنت ضروری ہے!' },
          },
          {
            icon: '📖', en: 'AI translates Quran to many languages', ur: 'AI قرآن کو کئی زبانوں میں ترجمہ کرتی ہے',
            isGood: true, reason: { en: 'More people can understand Allah\'s message — how beautiful!', ur: 'زیادہ لوگ اللہ کا پیغام سمجھ سکتے ہیں — کتنی خوبصورت بات ہے!' },
          },
          {
            icon: '🎭', en: 'AI makes fake videos to trick people', ur: 'AI جھوٹی ویڈیوز بنا کر لوگوں کو دھوکہ دیتی ہے',
            isGood: false, reason: { en: 'Spreading lies is haram. The Prophet ﷺ said the truthful are guided to Paradise.', ur: 'جھوٹ پھیلانا حرام ہے۔ نبی ﷺ نے فرمایا سچے لوگ جنت کی طرف رہنمائی پاتے ہیں۔' },
          },
        ],
      },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'الْمُؤْمِنُ لِلْمُؤْمِنِ كَالْبُنْيَانِ يَشُدُّ بَعْضُهُ بَعْضًا',
        en: 'The believer to the believer is like a building — each part strengthens the other.',
        ur: 'مؤمن مؤمن کے لیے عمارت کی مانند ہے — ہر حصہ دوسرے کو مضبوط کرتا ہے۔',
        label: { en: 'Hadith on Brotherhood', ur: 'بھائی چارے کی حدیث' },
      },
      {
        type: 'quiz', world: 'ai',
        question: { en: 'Before using the internet, what is wisest?', ur: 'انٹرنیٹ استعمال کرنے سے پہلے، سب سے عقلمندی کیا ہے؟' },
        options: [
          { en: 'Ask a trusted adult 🙋', ur: 'کسی بڑے پر اعتماد سے پوچھیں 🙋', correct: true },
          { en: 'Click every link 🖱️',    ur: 'ہر لنک پر کلک کریں 🖱️' },
          { en: 'Share your password 🔑', ur: 'اپنا پاس ورڈ بتائیں 🔑' },
        ],
      },
    ],
  },

  // ── DAY 14 · PAID · Reading charts ──────────────────────────────────────
  {
    title: { en: 'Reading charts', ur: 'چارٹ پڑھنا' },
    games: [
      {
        type: 'makeChart',
        title: { en: 'Books Read This Week 📚', ur: 'اس ہفتے پڑھی گئی کتابیں 📚' },
        bars: [
          { label: { en: 'Quran',   ur: 'قرآن'   }, val: 7, color: 'var(--grad-gold)' },
          { label: { en: 'Stories', ur: 'کہانیاں' }, val: 4, color: 'var(--grad-coral)' },
          { label: { en: 'Science', ur: 'سائنس'   }, val: 3, color: 'var(--grad-teal)' },
        ],
        question: { en: 'Which type of book was read MOST?', ur: 'کون سی کتاب سب سے زیادہ پڑھی گئی؟' },
        answerKey: 0,
      },
      { type: 'fivePillars', world: 'light', pillars: PILLARS },
      {
        type: 'quranStar', world: 'light',
        arabic: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
        en: 'Indeed, We have granted you Al-Kawthar (abundance).',
        ur: 'بے شک ہم نے تمہیں کوثر (کثرت) عطا کی۔',
        label: { en: 'Surah Al-Kawthar', ur: 'سورۃ الکوثر' },
      },
    ],
  },

  // ── DAY 15 · PAID · The first revelation ────────────────────────────────
  {
    title: { en: 'The first revelation', ur: 'پہلی وحی' },
    games: [
      {
        type: 'prophetJourney',
        panels: [
          {
            icon: '🏔️',
            title: { en: 'The Cave of Hira', ur: 'غار حرا' },
            text: {
              en: 'When Muhammad ﷺ was 40 years old, he would go to Cave Hira on a mountain near Makkah to think about Allah. He loved peace and truth. Then one night, something miraculous happened that changed the world forever...',
              ur: 'جب محمد ﷺ کی عمر ۴۰ سال تھی، وہ مکہ کے قریب پہاڑ پر غار حرا جاتے۔ آپ سکون اور سچ کو پسند کرتے تھے۔ پھر ایک رات، کچھ ایسا ہوا جس نے ہمیشہ کے لیے دنیا بدل دی...',
            },
          },
          {
            icon: '✨',
            title: { en: 'Angel Jibreel came!', ur: 'جبریل ؑ آئے!' },
            text: {
              en: 'The Angel Jibreel appeared and said: "Read!" (Iqra!). The Prophet ﷺ said he could not read. But Jibreel embraced him three times — and the words of Allah entered his heart. This was the very first revelation of the Holy Quran!',
              ur: 'فرشتہ جبریل ؑ آئے اور کہا: "پڑھو!" (اقرأ!)۔ نبی ﷺ نے کہا کہ وہ نہیں پڑھ سکتے۔ لیکن جبریل ؑ نے انہیں تین بار لپٹایا — اور اللہ کے الفاظ ان کے دل میں اتر گئے۔ یہ قرآن مجید کی پہلی وحی تھی!',
            },
          },
          {
            icon: '📖',
            title: { en: 'The First Verse', ur: 'پہلی آیت' },
            text: {
              en: 'The first words Allah revealed were: "Read! In the name of your Lord who created." These words mean: Learn! Understand! Seek knowledge! That is why Muslims love learning — it is a command from Allah Himself.',
              ur: 'اللہ نے پہلے یہ الفاظ نازل فرمائے: "پڑھو! اپنے رب کے نام سے جس نے پیدا کیا۔" ان الفاظ کا مطلب: سیکھو! سمجھو! علم حاصل کرو! اسی لیے مسلمان علم سے محبت کرتے ہیں — یہ خود اللہ کا حکم ہے۔',
            },
          },
        ],
      },
      { type: 'binary', world: 'compute', target: 11 },
      {
        type: 'quiz', world: 'light',
        question: { en: 'What was the first word of the Quran revealed to the Prophet ﷺ?', ur: 'قرآن کا پہلا لفظ نبی ﷺ پر کیا نازل ہوا؟' },
        options: [
          { en: 'Iqra (Read!) 📖', ur: 'اقرأ (پڑھو!) 📖', correct: true },
          { en: 'Salaam 👋',        ur: 'سلام 👋' },
          { en: 'SubhanAllah ✨',   ur: 'سبحان اللہ ✨' },
        ],
      },
    ],
  },

  // ── DAY 16 · PAID · Time is a trust ─────────────────────────────────────
  {
    title: { en: 'Time is a trust', ur: 'وقت ایک امانت ہے' },
    games: [
      {
        type: 'quranStar', world: 'light',
        arabic: 'إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ',
        en: 'Except those who believe and do righteous deeds.',
        ur: 'سوائے ان لوگوں کے جو ایمان لائے اور نیک کام کیے۔',
        label: { en: 'Surah Al-Asr verse 3', ur: 'سورۃ العصر آیت ۳' },
      },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
        en: 'The best among you are those who learn the Quran and teach it.',
        ur: 'تم میں سے بہترین وہ ہے جو قرآن سیکھے اور سکھائے۔',
        label: { en: 'Hadith on Quran', ur: 'قرآن کی حدیث' },
      },
      {
        type: 'mannersSort',
        items: [
          { icon: '🤝', en: 'Help someone who is struggling',    ur: 'مشکل میں کسی کی مدد کریں',            good: true },
          { icon: '🤥', en: 'Tell a lie to avoid trouble',       ur: 'مصیبت سے بچنے کو جھوٹ بولیں',        good: false },
          { icon: '😊', en: 'Say JazakAllah Khair',              ur: 'جزاک اللہ خیر کہیں',                 good: true },
          { icon: '🗑️', en: 'Drop litter on the floor',          ur: 'فرش پر کچرا پھینکیں',               good: false },
          { icon: '👂', en: 'Listen when someone is speaking',   ur: 'جب کوئی بات کرے تو توجہ سے سنیں',   good: true },
        ],
      },
    ],
  },

  // ── DAY 17 · PAID · Data goes in and out ────────────────────────────────
  {
    title: { en: 'Data goes in and out', ur: 'ڈیٹا آتا جاتا ہے' },
    games: [
      {
        type: 'inputOutput',
        items: [
          { icon: '🎤', en: 'Microphone', ur: 'مائکروفون', isInput: true },
          { icon: '🖨️', en: 'Printer',   ur: 'پرنٹر',    isInput: false },
          { icon: '📷', en: 'Camera',    ur: 'کیمرہ',     isInput: true },
          { icon: '🎧', en: 'Headphones', ur: 'ہیڈفون',   isInput: false },
        ],
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الْفَتَّاح', en: 'The Opener',        ur: 'کھولنے والا' },
          { ar: 'الْعَلِيم',  en: 'The All-Knowing',   ur: 'سب جاننے والا' },
          { ar: 'اللَّطِيف',  en: 'The Subtle One',    ur: 'باریک بین' },
        ],
      },
      {
        type: 'patternFinder', world: 'data',
        pattern: ['📖', '📿', '📖', '📿', '📖', '?'],
        options: [
          { icon: '📿', correct: true },
          { icon: '⭐', correct: false },
          { icon: '🌙', correct: false },
        ],
      },
    ],
  },

  // ── DAY 18 · PAID · Longer programs ─────────────────────────────────────
  {
    title: { en: 'Longer programs', ur: 'لمبے پروگرام' },
    games: [
      { type: 'commandRobot', world: 'compute', size: 4, start: [0, 0], end: [2, 3], maxCommands: 8 },
      {
        type: 'quranStar', world: 'light',
        arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
        en: 'Allah — there is no deity except Him, the Ever-Living, the Sustainer.',
        ur: 'اللہ — اس کے سوا کوئی معبود نہیں، ہمیشہ زندہ، قائم رہنے والا۔',
        label: { en: 'Ayat ul Kursi opening', ur: 'آیت الکرسی کا آغاز' },
      },
      {
        type: 'dataSort', world: 'data',
        label: { en: 'Sort Surahs by number of ayat (smallest first)!', ur: 'سورتوں کو آیات کی تعداد سے ترتیب دیں (چھوٹے سے بڑے)!' },
        items: [
          { val: 3, icon: '📖', en: 'Al-Kawthar (3 ayat)',  ur: 'الکوثر (۳ آیات)' },
          { val: 7, icon: '📖', en: 'Al-Fatiha (7 ayat)',   ur: 'الفاتحہ (۷ آیات)' },
          { val: 4, icon: '📖', en: 'Al-Ikhlas (4 ayat)',   ur: 'الاخلاص (۴ آیات)' },
          { val: 6, icon: '📖', en: 'An-Nas (6 ayat)',      ur: 'الناس (۶ آیات)' },
        ],
      },
    ],
  },

  // ── DAY 19 · PAID · AI in our world ─────────────────────────────────────
  {
    title: { en: 'AI in our world', ur: 'AI ہماری دنیا میں' },
    games: [
      {
        type: 'aiOrHuman',
        items: [
          { icon: '♟️', en: 'Play chess better than any human',  ur: 'کسی بھی انسان سے بہتر شطرنج کھیلنا', isAI: true },
          { icon: '😭', en: 'Feel sad when a friend moves away', ur: 'دوست کے جانے پر اداس ہونا',          isAI: false },
          { icon: '🌤️', en: 'Predict tomorrow\'s weather',       ur: 'کل کا موسم بتانا',                  isAI: true },
          { icon: '💭', en: 'Choose what to dream about',        ur: 'خواب میں کیا دیکھنا ہے چننا',       isAI: false },
          { icon: '🎨', en: 'Generate a painting from words',    ur: 'الفاظ سے پینٹنگ بنانا',             isAI: true },
        ],
      },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ',
        en: 'Fear Allah wherever you are.',
        ur: 'جہاں بھی ہو اللہ سے ڈرو۔',
        label: { en: 'Hadith on Taqwa', ur: 'تقوٰی کی حدیث' },
      },
      { type: 'binary', world: 'compute', target: 13 },
    ],
  },

  // ── DAY 20 · PAID · Animals in the zoo ──────────────────────────────────
  {
    title: { en: 'Animals in the zoo', ur: 'چڑیا گھر کے جانور' },
    games: [
      {
        type: 'makeChart',
        title: { en: 'Animals at the Zoo 🦁', ur: 'چڑیا گھر کے جانور 🦁' },
        bars: [
          { label: { en: 'Lions',    ur: 'شیر'    }, val: 2, color: 'var(--grad-gold)' },
          { label: { en: 'Monkeys',  ur: 'بندر'  }, val: 8, color: 'var(--grad-lime)' },
          { label: { en: 'Elephants', ur: 'ہاتھی' }, val: 3, color: 'var(--grad-teal)' },
        ],
        question: { en: 'Which animal was there MOST of?', ur: 'کون سا جانور سب سے زیادہ تھا؟' },
        answerKey: 1,
      },
      {
        type: 'quiz', world: 'compute',
        question: { en: 'What is a computer\'s main job?', ur: 'کمپیوٹر کا بنیادی کام کیا ہے؟' },
        options: [
          { en: 'Process information quickly ⚡', ur: 'جلدی معلومات پروسیس کرنا ⚡', correct: true },
          { en: 'Cook delicious food 🍳',          ur: 'مزیدار کھانا پکانا 🍳' },
          { en: 'Grow plants 🌱',                  ur: 'پودے اگانا 🌱' },
        ],
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الْوَهَّاب', en: 'The Bestower',     ur: 'بے حد عطا کرنے والا' },
          { ar: 'الشَّهِيد',  en: 'The Witness',       ur: 'گواہ' },
          { ar: 'الْحَقّ',    en: 'The Absolute Truth', ur: 'حق' },
        ],
      },
    ],
  },

  // ── DAY 21 · PAID · Kindness every day ──────────────────────────────────
  {
    title: { en: 'Kindness every day', ur: 'ہر روز مہربانی' },
    games: [
      {
        type: 'hadithStory', world: 'light',
        arabic: 'الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ',
        en: 'A Muslim is one from whose tongue and hand all Muslims are safe.',
        ur: 'مسلمان وہ ہے جس کی زبان اور ہاتھ سے دوسرے مسلمان محفوظ رہیں۔',
        label: { en: 'Hadith on Safety', ur: 'حفاظت کی حدیث' },
      },
      {
        type: 'mannersSort',
        items: [
          { icon: '🧹', en: 'Clean up after yourself',   ur: 'اپنے بعد صفائی کریں',          good: true },
          { icon: '😡', en: 'Say unkind words in anger', ur: 'غصے میں بری باتیں کہیں',        good: false },
          { icon: '🤗', en: 'Thank your mother or father', ur: 'اماں یا ابو کا شکریہ ادا کریں', good: true },
          { icon: '🗣️', en: 'Interrupt when others speak', ur: 'دوسروں کی بات کاٹیں',         good: false },
          { icon: '🌙', en: 'Make dua before sleeping',   ur: 'سونے سے پہلے دعا کریں',        good: true },
        ],
      },
      {
        type: 'robotChef', world: 'compute',
        task: { en: 'Make wudu in the right order!', ur: 'صحیح ترتیب سے وضو کریں!' },
        steps: [
          { order: 1, icon: '🙏', en: 'Make intention (Niyyah)', ur: 'نیت کریں' },
          { order: 2, icon: '🤲', en: 'Wash both hands',         ur: 'دونوں ہاتھ دھوئیں' },
          { order: 3, icon: '💧', en: 'Rinse mouth 3 times',     ur: 'کلی ۳ بار کریں' },
          { order: 4, icon: '😊', en: 'Wash face 3 times',       ur: 'چہرہ ۳ بار دھوئیں' },
          { order: 5, icon: '💪', en: 'Wash arms to elbows',     ur: 'کہنیوں تک بازو دھوئیں' },
        ],
      },
    ],
  },

  // ── DAY 22 · PAID · The Night Journey ───────────────────────────────────
  {
    title: { en: 'The Night Journey', ur: 'رات کا سفر' },
    games: [
      {
        type: 'prophetJourney',
        panels: [
          {
            icon: '🌙',
            title: { en: 'The Night Journey (Isra)', ur: 'اسراء — رات کا سفر' },
            text: {
              en: 'One miraculous night, Allah took the Prophet ﷺ from Makkah to Jerusalem on a creature called Al-Buraq — faster than lightning! In Jerusalem, he led all the prophets in prayer, showing he was the greatest of all messengers.',
              ur: 'ایک معجزاتی رات، اللہ نے نبی ﷺ کو مکہ سے بیت المقدس، براق پر لے گئے — بجلی سے بھی تیز! وہاں آپ نے تمام انبیاء کی امامت کی — یہ ثابت ہوا کہ آپ سب سے عظیم رسول ہیں۔',
            },
          },
          {
            icon: '🚀',
            title: { en: 'Ascending the Heavens (Mi\'raj)', ur: 'آسمانوں تک (معراج)' },
            text: {
              en: 'Then the Prophet ﷺ was taken through all seven heavens! He met Adam, Yahya, Isa, Idris, Harun, Musa, and Ibrahim ﷺ. He reached the closest point to Allah. There, Allah gave the Muslims a precious gift: the 5 daily prayers.',
              ur: 'پھر نبی ﷺ سات آسمانوں سے گزرے! آپ نے آدم، یحییٰ، عیسیٰ، ادریس، ہارون، موسیٰ اور ابراہیم ؑ سے ملاقات کی۔ اللہ کے قریب ترین مقام پر آپ کو ۵ نمازوں کا قیمتی تحفہ ملا۔',
            },
          },
          {
            icon: '🏙️',
            title: { en: 'Migration to Madinah', ur: 'مدینہ ہجرت' },
            text: {
              en: 'After years of hardship in Makkah, Allah commanded the Prophet ﷺ to migrate to Madinah. The people of Madinah welcomed them with joy and songs! This migration — the Hijrah — was so important Muslims mark their calendar from this moment.',
              ur: 'مکہ میں سالوں کی مشکلات کے بعد اللہ نے نبی ﷺ کو مدینہ ہجرت کا حکم دیا۔ مدینہ والوں نے خوشی اور نغموں سے استقبال کیا! یہ ہجرت اتنی اہم ہے کہ مسلمان اپنا کیلنڈر اسی لمحے سے شمار کرتے ہیں۔',
            },
          },
        ],
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'What precious gift did Allah give on the Night of Mi\'raj?', ur: 'معراج کی رات اللہ نے کون سا قیمتی تحفہ دیا؟' },
        options: [
          { en: '5 daily prayers 🙏', ur: '۵ نمازیں 🙏', correct: true },
          { en: 'A golden treasure 💛', ur: 'سونے کا خزانہ 💛' },
          { en: 'A magical book 📖',    ur: 'جادوئی کتاب 📖' },
        ],
      },
      { type: 'binary', world: 'compute', target: 7 },
    ],
  },

  // ── DAY 23 · PAID · Big binary numbers ──────────────────────────────────
  {
    title: { en: 'Big binary numbers', ur: 'بڑے بائنری نمبر' },
    games: [
      { type: 'binary', world: 'compute', target: 15 },
      {
        type: 'dataSort', world: 'data',
        label: { en: 'Sort stars from fewest to most!', ur: 'ستاروں کو کم سے زیادہ کریں!' },
        items: [
          { val: 6, icon: '⭐', en: '6 stars',  ur: '6 ستارے' },
          { val: 2, icon: '⭐', en: '2 stars',  ur: '2 ستارے' },
          { val: 9, icon: '⭐', en: '9 stars',  ur: '9 ستارے' },
          { val: 4, icon: '⭐', en: '4 stars',  ur: '4 ستارے' },
        ],
      },
      {
        type: 'patternFinder', world: 'data',
        pattern: ['🌟', '💫', '🌟', '💫', '🌟', '?'],
        options: [
          { icon: '💫', correct: true },
          { icon: '⭐', correct: false },
          { icon: '🌙', correct: false },
        ],
      },
    ],
  },

  // ── DAY 24 · PAID · AI learns like you ──────────────────────────────────
  {
    title: { en: 'AI learns like you', ur: 'AI بھی سیکھتی ہے' },
    games: [
      {
        type: 'aiOrHuman',
        items: [
          { icon: '🤗', en: 'Give a warm hug to a friend',     ur: 'دوست کو گرمجوشی سے گلے لگانا',       isAI: false },
          { icon: '✍️', en: 'Autocorrect spelling mistakes',    ur: 'ہجے کی غلطیاں خودبخود درست کرنا',   isAI: true },
          { icon: '🌟', en: 'Be kind for the sake of Allah',   ur: 'اللہ کی خاطر مہربان ہونا',           isAI: false },
          { icon: '🚫', en: 'Detect and block spam emails',    ur: 'سپیم ای میل پکڑنا اور بلاک کرنا',   isAI: true },
          { icon: '🤲', en: 'Pray to Allah from the heart',    ur: 'دل سے اللہ کو یاد کرنا',             isAI: false },
        ],
      },
      {
        type: 'quiz', world: 'ai',
        question: { en: 'What is machine learning?', ur: 'مشین لرننگ کیا ہے؟' },
        options: [
          { en: 'Teaching computers by showing examples 🎓', ur: 'مثالیں دکھا کر کمپیوٹر کو سکھانا 🎓', correct: true },
          { en: 'Teaching computers to walk 🚶',             ur: 'کمپیوٹر کو چلنا سکھانا 🚶' },
          { en: 'A type of washing machine 🧺',              ur: 'واشنگ مشین کی ایک قسم 🧺' },
        ],
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الْأَوَّل', en: 'The First', ur: 'پہلا' },
          { ar: 'الْآخِر',   en: 'The Last',  ur: 'آخری' },
          { ar: 'الظَّاهِر', en: 'The Manifest', ur: 'ظاہر' },
        ],
      },
    ],
  },

  // ── DAY 25 · PAID · Responsible AI ──────────────────────────────────────
  {
    title: { en: 'Responsible AI', ur: 'ذمہ دار AI' },
    games: [
      {
        type: 'goodBadAI',
        items: [
          {
            icon: '⏰', en: 'AI app reminds you to pray Salah', ur: 'AI ایپ آپ کو نماز یاد دلاتی ہے',
            isGood: true, reason: { en: 'Any tool that helps you remember Allah is a blessing!', ur: 'جو چیز اللہ کو یاد رکھنے میں مدد کرے وہ نعمت ہے!' },
          },
          {
            icon: '🎮', en: 'AI plays your video games so you do nothing', ur: 'AI آپ کے گیم کھیلتی ہے آپ کچھ نہیں کرتے',
            isGood: false, reason: { en: 'What\'s the point of playing if AI plays for you? You miss all the fun!', ur: 'اگر AI کھیلے تو کھیل کا کیا فائدہ؟ آپ سارا مزہ کھو دیتے ہیں!' },
          },
          {
            icon: '🌾', en: 'AI helps farmers water crops at the right time', ur: 'AI کسانوں کو صحیح وقت پر پانی دینے میں مدد کرتی ہے',
            isGood: true, reason: { en: 'Less water wasted, more food — AI helps care for Allah\'s earth.', ur: 'کم پانی ضائع، زیادہ کھانا — AI اللہ کی زمین کی دیکھ بھال کرتی ہے۔' },
          },
          {
            icon: '😢', en: 'AI sends mean messages to make you feel bad', ur: 'AI آپ کو برا محسوس کروانے کے لیے تکلیف دہ پیغام بھیجتی ہے',
            isGood: false, reason: { en: 'The Prophet ﷺ said a Muslim does not harm others. AI that hurts must be stopped.', ur: 'نبی ﷺ نے فرمایا مسلمان دوسروں کو تکلیف نہیں دیتا۔ نقصاندہ AI کو روکنا ضروری ہے۔' },
          },
        ],
      },
      {
        type: 'quranStar', world: 'light',
        arabic: 'إِنَّ اللَّهَ يُحِبُّ الْمُقْسِطِينَ',
        en: 'Indeed, Allah loves those who act justly.',
        ur: 'بے شک اللہ انصاف کرنے والوں سے محبت کرتا ہے۔',
        label: { en: 'Surah Al-Ma\'idah 5:42', ur: 'سورۃ المائدہ ۵:۴۲' },
      },
      { type: 'binary', world: 'compute', target: 4 },
    ],
  },

  // ── DAY 26 · PAID · Sending and receiving ───────────────────────────────
  {
    title: { en: 'Sending and receiving', ur: 'بھیجنا اور پانا' },
    games: [
      {
        type: 'inputOutput',
        items: [
          { icon: '📱', en: 'Touchscreen',     ur: 'ٹچ اسکرین',    isInput: true },
          { icon: '📽️', en: 'Projector',       ur: 'پروجیکٹر',    isInput: false },
          { icon: '🔍', en: 'Scanner',          ur: 'اسکینر',       isInput: true },
          { icon: '🕹️', en: 'Game Controller', ur: 'گیم کنٹرولر',  isInput: true },
        ],
      },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ',
        en: 'Actions are judged by their intentions.',
        ur: 'اعمال کا دارومدار نیتوں پر ہے۔',
        label: { en: 'Hadith on Intentions', ur: 'نیت کی حدیث' },
      },
      {
        type: 'makeChart',
        title: { en: 'Weather This Week ☀️', ur: 'اس ہفتے موسم ☀️' },
        bars: [
          { label: { en: 'Sunny',  ur: 'دھوپ'  }, val: 4, color: 'var(--grad-gold)' },
          { label: { en: 'Cloudy', ur: 'بادل'  }, val: 2, color: 'linear-gradient(135deg,#8FBDCC,#6BA3B8)' },
          { label: { en: 'Rainy',  ur: 'بارش'  }, val: 1, color: 'var(--grad-teal)' },
        ],
        question: { en: 'Which weather type happened MOST?', ur: 'کون سا موسم سب سے زیادہ رہا؟' },
        answerKey: 0,
      },
    ],
  },

  // ── DAY 27 · PAID · Robot maze master ───────────────────────────────────
  {
    title: { en: 'Robot maze master', ur: 'روبوٹ بھول بھلیاں ماہر' },
    games: [
      { type: 'commandRobot', world: 'compute', size: 4, start: [0, 3], end: [3, 0], maxCommands: 8 },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الْعَزِيز', en: 'The Mighty',  ur: 'عزت والا' },
          { ar: 'الْحَكَم',  en: 'The Judge',   ur: 'فیصلہ کرنے والا' },
          { ar: 'الْعَدْل',  en: 'The Just',    ur: 'انصاف کرنے والا' },
        ],
      },
      {
        type: 'quiz', world: 'compute',
        question: { en: 'How does GPS know exactly where you are?', ur: 'GPS کو آپ کی جگہ کیسے پتہ چلتی ہے؟' },
        options: [
          { en: 'Signals from satellites in space 🛰️', ur: 'خلا میں سیٹلائٹ سے سگنل 🛰️', correct: true },
          { en: 'It reads your mind 🧠',                ur: 'یہ آپ کا ذہن پڑھتا ہے 🧠' },
          { en: 'Magic 🪄',                             ur: 'جادو 🪄' },
        ],
      },
    ],
  },

  // ── DAY 28 · PAID · Fruits of learning ──────────────────────────────────
  {
    title: { en: 'Fruits of learning', ur: 'علم کے پھل' },
    games: [
      {
        type: 'makeChart',
        title: { en: 'Fruits in the Basket 🍎', ur: 'ٹوکری میں پھل 🍎' },
        bars: [
          { label: { en: 'Apples',  ur: 'سیب'  }, val: 5, color: 'var(--grad-coral)' },
          { label: { en: 'Bananas', ur: 'کیلے' }, val: 3, color: 'var(--grad-gold)' },
          { label: { en: 'Mangoes', ur: 'آم'   }, val: 7, color: 'linear-gradient(135deg,#FFB347,#FFCC02)' },
        ],
        question: { en: 'Which fruit had the MOST in the basket?', ur: 'ٹوکری میں کون سا پھل سب سے زیادہ تھا؟' },
        answerKey: 2,
      },
      {
        type: 'quranStar', world: 'light',
        arabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
        en: 'Read in the name of your Lord who created!',
        ur: 'پڑھو! اپنے رب کے نام سے جس نے پیدا کیا!',
        label: { en: 'Surah Al-Alaq (first verse)', ur: 'سورۃ العلق (پہلی آیت)' },
      },
      {
        type: 'mannersSort',
        items: [
          { icon: '⏳', en: 'Wait your turn patiently',        ur: 'صبر سے اپنی باری کا انتظار کریں',  good: true },
          { icon: '😶', en: 'Take something without asking',   ur: 'بنا پوچھے کچھ لے لیں',             good: false },
          { icon: '🍽️', en: 'Say BismIllah before eating',    ur: 'کھانے سے پہلے بسم اللہ کہیں',      good: true },
          { icon: '👊', en: 'Hit a friend when they tease you', ur: 'چھیڑنے پر دوست کو مارنا',          good: false },
          { icon: '😄', en: 'Smile and greet warmly',          ur: 'مسکرا کر گرمجوشی سے ملنا',         good: true },
        ],
      },
    ],
  },

  // ── DAY 29 · PAID · The conquest ────────────────────────────────────────
  {
    title: { en: 'The conquest of Makkah', ur: 'فتح مکہ' },
    games: [
      {
        type: 'prophetJourney',
        panels: [
          {
            icon: '🌅',
            title: { en: 'Return to Makkah', ur: 'مکہ واپسی' },
            text: {
              en: 'After years in Madinah, the Prophet ﷺ returned to Makkah with 10,000 companions. The city that once drove him out — he entered peacefully, with his head bowed in gratitude to Allah. There was no anger, no revenge.',
              ur: 'مدینہ میں سالوں کے بعد، نبی ﷺ ۱۰,۰۰۰ صحابہ کے ساتھ مکہ واپس آئے۔ وہ شہر جس نے انہیں نکالا تھا — آپ نے اللہ کا شکر ادا کرتے ہوئے پُرامن طریقے سے داخل ہوئے۔ کوئی غصہ نہیں، کوئی انتقام نہیں۔',
            },
          },
          {
            icon: '💛',
            title: { en: 'Forgiveness for all', ur: 'سب کی معافی' },
            text: {
              en: 'The Prophet ﷺ gathered everyone — even his worst enemies — and asked: "What do you think I will do with you?" They said: "A noble brother." He said: "Go — you are ALL free." The greatest act of forgiveness in history.',
              ur: 'نبی ﷺ نے سب کو جمع کیا — حتیٰ کہ بدترین دشمنوں کو — اور پوچھا: "تمہارا کیا خیال ہے میں کیا کروں گا؟" انہوں نے کہا: "نیک بھائی۔" آپ نے فرمایا: "جاؤ — تم سب آزاد ہو۔" تاریخ کا عظیم ترین معافی کا عمل۔',
            },
          },
          {
            icon: '🕌',
            title: { en: 'The final message', ur: 'آخری پیغام' },
            text: {
              en: 'On his last Hajj, the Prophet ﷺ spoke to 100,000 people: "All people are equal. An Arab is not better than a non-Arab except in good deeds. Be kind to each other. I leave you the Quran and my Sunnah." These words live forever.',
              ur: 'آخری حج پر نبی ﷺ نے ۱ لاکھ لوگوں سے فرمایا: "سب لوگ برابر ہیں۔ عرب غیر عرب سے صرف اچھے اعمال میں بہتر ہے۔ ایک دوسرے سے مہربان رہو۔ میں تمہیں قرآن اور سنت چھوڑ رہا ہوں۔" یہ الفاظ ہمیشہ زندہ ہیں۔',
            },
          },
        ],
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'What did the Prophet ﷺ do when he conquered Makkah?', ur: 'فتح مکہ پر نبی ﷺ نے کیا کیا؟' },
        options: [
          { en: 'Forgave everyone 💛',            ur: 'سب کو معاف کر دیا 💛',          correct: true },
          { en: 'Started a big fight ⚔️',         ur: 'بڑی لڑائی شروع کی ⚔️' },
          { en: 'Went back to Madinah 🌴',        ur: 'فوری مدینہ واپس گئے 🌴' },
        ],
      },
      { type: 'binary', world: 'compute', target: 10 },
    ],
  },

  // ── DAY 30 · PAID · Thirty days of wisdom ───────────────────────────────
  {
    title: { en: 'Thirty days of wisdom', ur: 'تیس دن کی حکمت' },
    games: [
      {
        type: 'hadithStory', world: 'light',
        arabic: 'خَيْرُكُمْ خَيْرُكُمْ لِأَهْلِهِ',
        en: 'The best of you is the one who is best to his family.',
        ur: 'تم میں سے بہترین وہ ہے جو اپنے گھر والوں کے ساتھ بہترین ہے۔',
        label: { en: 'Hadith on Family', ur: 'خاندان کی حدیث' },
      },
      {
        type: 'goodBadAI',
        items: [
          {
            icon: '📚', en: 'AI reads books aloud for those who cannot see', ur: 'AI نابینا افراد کے لیے کتابیں پڑھ کر سناتی ہے',
            isGood: true, reason: { en: 'Helping those with disabilities access knowledge is sadaqah!', ur: 'معذور افراد تک علم پہنچانا صدقہ ہے!' },
          },
          {
            icon: '📍', en: 'AI tells strangers where you live without asking', ur: 'AI بنا پوچھے اجنبیوں کو آپ کا گھر بتا دیتی ہے',
            isGood: false, reason: { en: 'Privacy is important! Never share your location with strangers.', ur: 'پرائیویسی ضروری ہے! اجنبیوں کو کبھی اپنی جگہ نہ بتائیں۔' },
          },
          {
            icon: '🔍', en: 'AI finds patterns in Quran text for research', ur: 'AI تحقیق کے لیے قرآن میں نمونے تلاش کرتی ہے',
            isGood: true, reason: { en: 'Using technology to study Allah\'s book and discover its miracles is wonderful!', ur: 'اللہ کی کتاب کے معجزات دریافت کرنے کے لیے ٹیکنالوجی استعمال کرنا عمدہ ہے!' },
          },
          {
            icon: '🗣️', en: 'AI spreads unkind rumours about people', ur: 'AI لوگوں کے بارے میں بری افواہیں پھیلاتی ہے',
            isGood: false, reason: { en: 'Backbiting is haram. Allah says it is like eating your dead brother\'s flesh (49:12).', ur: 'غیبت حرام ہے۔ اللہ فرماتے ہیں یہ مردہ بھائی کا گوشت کھانے جیسا ہے (۴۹:۱۲)۔' },
          },
        ],
      },
      {
        type: 'patternFinder', world: 'data',
        pattern: ['🤲', '🙏', '🤲', '🙏', '🤲', '?'],
        options: [
          { icon: '🙏', correct: true },
          { icon: '🤝', correct: false },
          { icon: '👋', correct: false },
        ],
      },
    ],
  },

  // ── DAY 31 · PAID · Patterns in creation ────────────────────────────────
  {
    title: { en: 'Patterns in creation', ur: 'تخلیق میں نمونے' },
    games: [
      {
        type: 'patternFinder', world: 'data',
        pattern: ['🌕', '🌓', '🌑', '🌕', '🌓', '?'],
        options: [
          { icon: '🌑', correct: true },
          { icon: '🌕', correct: false },
          { icon: '⭐', correct: false },
        ],
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الصَّبُور', en: 'The Patient',  ur: 'صبر والا' },
          { ar: 'الْغَفُور', en: 'The Forgiving', ur: 'بہت بخشنے والا' },
          { ar: 'الْوَدُود', en: 'The Loving',    ur: 'محبت کرنے والا' },
        ],
      },
      {
        type: 'robotChef', world: 'compute',
        task: { en: 'Make a healthy salad!', ur: 'صحت مند سلاد بنائیں!' },
        steps: [
          { order: 1, icon: '🥗', en: 'Wash vegetables',    ur: 'سبزیاں دھوئیں' },
          { order: 2, icon: '🔪', en: 'Chop vegetables',    ur: 'سبزیاں کاٹیں' },
          { order: 3, icon: '🥬', en: 'Put in a bowl',      ur: 'پیالے میں ڈالیں' },
          { order: 4, icon: '🫒', en: 'Add olive oil',       ur: 'زیتون کا تیل ڈالیں' },
          { order: 5, icon: '🥄', en: 'Mix and serve',       ur: 'ملائیں اور پیش کریں' },
        ],
      },
    ],
  },

  // ── DAY 32 · PAID · Ultimate robot challenge ────────────────────────────
  {
    title: { en: 'Ultimate robot challenge', ur: 'حتمی روبوٹ چیلنج' },
    games: [
      { type: 'commandRobot', world: 'compute', size: 5, start: [0, 0], end: [4, 4], maxCommands: 12 },
      {
        type: 'quranStar', world: 'light',
        arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً',
        en: 'Our Lord, give us good in this world and good in the Hereafter.',
        ur: 'اے ہمارے رب، ہمیں دنیا میں بھی بھلائی دے اور آخرت میں بھی بھلائی دے۔',
        label: { en: 'Rabbana Dua', ur: 'رَبَّنَا دعا' },
      },
      {
        type: 'dataSort', world: 'data',
        label: { en: 'Sort beads from fewest to most!', ur: 'تسبیح کو کم سے زیادہ ترتیب دیں!' },
        items: [
          { val: 3, icon: '📿', en: '3 beads',  ur: '3 تسبیح' },
          { val: 8, icon: '📿', en: '8 beads',  ur: '8 تسبیح' },
          { val: 1, icon: '📿', en: '1 bead',   ur: '1 تسبیح' },
          { val: 5, icon: '📿', en: '5 beads',  ur: '5 تسبیح' },
        ],
      },
    ],
  },

  // ── DAY 33 · PAID · AI for good ─────────────────────────────────────────
  {
    title: { en: 'AI for good', ur: 'AI بھلائی کے لیے' },
    games: [
      {
        type: 'quiz', world: 'ai',
        question: { en: 'Can AI feel emotions like a human?', ur: 'کیا AI انسان کی طرح جذبات محسوس کر سکتی ہے؟' },
        options: [
          { en: 'No — AI processes data, not feelings 🤖', ur: 'نہیں — AI ڈیٹا پروسیس کرتی ہے، جذبات نہیں 🤖', correct: true },
          { en: 'Yes, AI feels everything 😂',              ur: 'ہاں، AI سب کچھ محسوس کرتی ہے 😂' },
          { en: 'Yes, AI cries too 😢',                    ur: 'ہاں، AI بھی روتی ہے 😢' },
        ],
      },
      { type: 'binary', world: 'compute', target: 12 },
      {
        type: 'patternFinder', world: 'data',
        pattern: ['🤖', '💡', '🤖', '💡', '🤖', '?'],
        options: [
          { icon: '💡', correct: true },
          { icon: '🤖', correct: false },
          { icon: '⚡', correct: false },
        ],
      },
    ],
  },

  // ── DAY 34 · PAID · Pillars of a good Muslim ────────────────────────────
  {
    title: { en: 'Pillars of a good Muslim', ur: 'اچھے مسلمان کے ستون' },
    games: [
      { type: 'fivePillars', world: 'light', pillars: PILLARS },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'ارْحَمُوا مَنْ فِي الْأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ',
        en: 'Show mercy to those on earth, and He who is in heaven will show mercy to you.',
        ur: 'زمین والوں پر رحم کرو، آسمان والا تم پر رحم کرے گا۔',
        label: { en: 'Hadith on Mercy', ur: 'رحمت کی حدیث' },
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'What is the meaning of the word "Muslim"?', ur: 'لفظ "مسلمان" کا کیا مطلب ہے؟' },
        options: [
          { en: 'One who submits to Allah 🙏', ur: 'اللہ کا فرمانبردار 🙏', correct: true },
          { en: 'One who prays 5 times 📖',    ur: 'جو ۵ بار نماز پڑھے 📖' },
          { en: 'One who fasts in Ramadan 🌙', ur: 'جو رمضان میں روزہ رکھے 🌙' },
        ],
      },
    ],
  },

  // ── DAY 35 · PAID · Summer champion! ────────────────────────────────────
  {
    title: { en: 'Summer champion!', ur: 'سمر چیمپئن!' },
    games: [
      {
        type: 'quranStar', world: 'light',
        arabic: 'رَبَّنَا آتِنَا مِنْ لَدُنْكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا',
        en: 'Our Lord, grant us mercy from You and prepare for us right guidance.',
        ur: 'اے ہمارے رب! ہمیں اپنی رحمت عطا کر اور ہمارے معاملے میں سیدھا راستہ آسان کر دے۔',
        label: { en: 'Surah Al-Kahf 18:10', ur: 'سورۃ الکہف ۱۸:۱۰' },
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الرَّحْمَٰن', en: 'The Most Gracious', ur: 'بہت مہربان' },
          { ar: 'الْعَلِيم',   en: 'The All-Knowing',   ur: 'سب جاننے والا' },
          { ar: 'الْغَفُور',   en: 'The Most Forgiving', ur: 'بہت بخشنے والا' },
        ],
      },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ',
        en: 'Allah loves that when one of you does an action, he does it excellently.',
        ur: 'اللہ پسند کرتا ہے کہ جب تم میں سے کوئی کام کرے تو اسے بہترین طریقے سے کرے۔',
        label: { en: 'Hadith on Excellence', ur: 'بہترین کام کی حدیث' },
      },
    ],
  },

  // ── DAY 36 · PAID · How AI brains work ──────────────────────────────────────
  {
    title: { en: 'How AI brains work', ur: 'AI کا دماغ کیسے کام کرتا ہے' },
    games: [
      {
        type: 'buildBrain', world: 'neuro',
        inputs: [
          { icon: '👁️', en: 'Eyes', ur: 'آنکھیں' },
          { icon: '👃', en: 'Whiskers', ur: 'مونچھیں' },
          { icon: '🐾', en: 'Paws', ur: 'پنجے' },
        ],
        output: { icon: '🐱', en: "It's a cat!", ur: 'یہ بلی ہے!' },
      },
      {
        type: 'quranStar', world: 'light',
        arabic: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ',
        en: 'When the victory of Allah comes and the conquest.',
        ur: 'جب اللہ کی مدد اور فتح آجائے۔',
        label: { en: 'Surah An-Nasr 110:1', ur: 'سورۃ النصر ۱۱۰:۱' },
      },
      { type: 'binary', world: 'compute', target: 14 },
    ],
  },

  // ── DAY 37 · PAID · Teaching machines ───────────────────────────────────────
  {
    title: { en: 'Teaching machines', ur: 'مشینوں کو پڑھانا' },
    games: [
      {
        type: 'trainNetwork', world: 'neuro',
        examples: [
          { icon: '🍎', label: { en: 'Apple', ur: 'سیب' }, options: [{ en: 'Apple', ur: 'سیب', correct: true }, { en: 'Car', ur: 'گاڑی', correct: false }, { en: 'Book', ur: 'کتاب', correct: false }] },
          { icon: '🍌', label: { en: 'Banana', ur: 'کیلہ' }, options: [{ en: 'Flower', ur: 'پھول', correct: false }, { en: 'Banana', ur: 'کیلہ', correct: true }, { en: 'House', ur: 'گھر', correct: false }] },
          { icon: '🍊', label: { en: 'Orange', ur: 'مالٹا' }, options: [{ en: 'Orange', ur: 'مالٹا', correct: true }, { en: 'Moon', ur: 'چاند', correct: false }, { en: 'Star', ur: 'ستارہ', correct: false }] },
        ],
      },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّىٰ يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
        en: 'None of you truly believes until he loves for his brother what he loves for himself.',
        ur: 'تم میں سے کوئی مومن نہیں ہوتا جب تک اپنے بھائی کے لیے وہی نہ چاہے جو اپنے لیے چاہتا ہے۔',
        label: { en: 'Hadith on Brotherhood', ur: 'بھائی چارے کی حدیث' },
      },
      {
        type: 'patternFinder', world: 'data',
        pattern: ['✨', '⭐', '✨', '⭐', '✨', '?'],
        options: [{ icon: '⭐', correct: true }, { icon: '🌙', correct: false }, { icon: '☀️', correct: false }],
      },
    ],
  },

  // ── DAY 38 · PAID · Sort like AI ─────────────────────────────────────────────
  {
    title: { en: 'Sort like AI', ur: 'AI کی طرح چھانٹو' },
    games: [
      {
        type: 'isThisACat', world: 'neuro',
        category: { en: 'a FRUIT 🍎', ur: 'پھل 🍎' },
        items: [
          { icon: '🍎', en: 'Apple', ur: 'سیب', isMatch: true },
          { icon: '🚗', en: 'Car', ur: 'گاڑی', isMatch: false },
          { icon: '🍌', en: 'Banana', ur: 'کیلہ', isMatch: true },
          { icon: '📚', en: 'Book', ur: 'کتاب', isMatch: false },
          { icon: '🍊', en: 'Orange', ur: 'مالٹا', isMatch: true },
        ],
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الْمُعِزّ',  en: 'The Giver of Honour', ur: 'عزت دینے والا' },
          { ar: 'الْبَاطِن',  en: 'The Hidden One',      ur: 'پوشیدہ' },
          { ar: 'الْوَلِيّ',  en: 'The Protecting Friend', ur: 'مددگار دوست' },
        ],
      },
      {
        type: 'quiz', world: 'compute',
        question: { en: 'What do we call examples used to teach an AI?', ur: 'AI کو سکھانے کے لیے مثالیں کیا کہلاتی ہیں؟' },
        options: [
          { en: 'Training data 📊', ur: 'ٹریننگ ڈیٹا 📊', correct: true },
          { en: 'Magic spells 🪄',  ur: 'جادو 🪄', correct: false },
          { en: 'School marks 📝',  ur: 'اسکول نمبر 📝', correct: false },
        ],
      },
    ],
  },

  // ── DAY 39 · PAID · AI thinking layers ───────────────────────────────────────
  {
    title: { en: "AI's thinking layers", ur: 'AI کی سوچ کی پرتیں' },
    games: [
      {
        type: 'layersGame', world: 'neuro',
        items: [
          { icon: '📸', en: 'A photo enters the AI', ur: 'AI میں تصویر جاتی ہے', layer: 'input' },
          { icon: '🤔', en: 'AI analyses and thinks', ur: 'AI تجزیہ اور سوچ کرتی ہے', layer: 'hidden' },
          { icon: '✅', en: 'AI gives its answer', ur: 'AI اپنا جواب دیتی ہے', layer: 'output' },
        ],
      },
      {
        type: 'quranStar', world: 'light',
        arabic: 'أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ',
        en: 'Did you not see how your Lord dealt with the companions of the elephant?',
        ur: 'کیا تم نے نہیں دیکھا کہ تمہارے رب نے ہاتھی والوں کے ساتھ کیا کیا؟',
        label: { en: 'Surah Al-Fil 105:1', ur: 'سورۃ الفیل ۱۰۵:۱' },
      },
      {
        type: 'dataSort', world: 'data',
        label: { en: 'Sort animals by number of legs!', ur: 'ٹانگوں کی تعداد سے ترتیب دیں!' },
        items: [
          { val: 0, icon: '🐟', en: '0 — Fish',    ur: '0 — مچھلی' },
          { val: 2, icon: '🐦', en: '2 — Bird',    ur: '2 — پرندہ' },
          { val: 4, icon: '🐈', en: '4 — Cat',     ur: '4 — بلی' },
          { val: 8, icon: '🕷️', en: '8 — Spider',  ur: '8 — مکڑی' },
        ],
      },
    ],
  },

  // ── DAY 40 · PAID · AI helps doctors ─────────────────────────────────────────
  {
    title: { en: 'AI helps doctors', ur: 'AI ڈاکٹروں کی مدد کرتی ہے' },
    games: [
      {
        type: 'designAI', world: 'neuro',
        steps: [
          {
            prompt: { en: 'What will your AI help with?', ur: 'آپ کی AI کس چیز میں مدد کرے گی؟' },
            options: [
              { icon: '🏥', en: 'Help find illness', ur: 'بیماری تلاش کرنا' },
              { icon: '🌾', en: 'Help farmers', ur: 'کسانوں کی مدد' },
              { icon: '📚', en: 'Help students learn', ur: 'طلبہ کو سیکھانا' },
              { icon: '🌊', en: 'Predict floods', ur: 'سیلاب کا پتہ لگانا' },
            ],
          },
          {
            prompt: { en: 'What will the AI learn from?', ur: 'AI کس سے سیکھے گی؟' },
            options: [
              { icon: '📸', en: 'Medical images', ur: 'طبی تصاویر' },
              { icon: '🩺', en: 'Doctor notes', ur: 'ڈاکٹر کے نوٹس' },
              { icon: '🔬', en: 'Lab results', ur: 'لیب نتائج' },
              { icon: '📊', en: 'Patient records', ur: 'مریض کا ریکارڈ' },
            ],
          },
          {
            prompt: { en: 'What will it give back?', ur: 'یہ کیا بتائے گی؟' },
            options: [
              { icon: '✅', en: 'Is the patient sick?', ur: 'کیا مریض بیمار ہے؟' },
              { icon: '💊', en: 'Which medicine', ur: 'کون سی دوا' },
              { icon: '⏰', en: 'When to check again', ur: 'کب دوبارہ چیک کریں' },
              { icon: '📋', en: 'A health report', ur: 'صحت کی رپورٹ' },
            ],
          },
        ],
      },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'كُلُّ مَعْرُوفٍ صَدَقَةٌ',
        en: 'Every act of kindness is a charity.',
        ur: 'ہر نیکی صدقہ ہے۔',
        label: { en: 'Hadith on Kindness', ur: 'نیکی کی حدیث' },
      },
      { type: 'binary', world: 'compute', target: 5 },
    ],
  },

  // ── DAY 41 · PAID · Test your AI knowledge ───────────────────────────────────
  {
    title: { en: 'Test your AI knowledge', ur: 'اپنی AI معلومات جانچو' },
    games: [
      {
        type: 'learningRace', world: 'neuro',
        questions: [
          {
            question: { en: 'What is a neural network inspired by?', ur: 'نیورل نیٹ ورک کس سے متاثر ہے؟' },
            options: [{ en: 'The human brain 🧠', ur: 'انسانی دماغ 🧠', correct: true }, { en: 'A keyboard ⌨️', ur: 'کی بورڈ ⌨️', correct: false }, { en: 'A camera 📷', ur: 'کیمرہ 📷', correct: false }],
          },
          {
            question: { en: 'How does AI get smarter?', ur: 'AI کیسے ہوشیار ہوتی ہے؟' },
            options: [{ en: 'By seeing more examples', ur: 'زیادہ مثالیں دیکھ کر', correct: true }, { en: 'By sleeping', ur: 'سو کر', correct: false }, { en: 'By getting bigger', ur: 'بڑی ہو کر', correct: false }],
          },
          {
            question: { en: 'What are the 3 layers of a neural network?', ur: 'نیورل نیٹ ورک کی 3 پرتیں کیا ہیں؟' },
            options: [{ en: 'Input, Hidden, Output', ur: 'انپٹ، ہڈن، آؤٹ پٹ', correct: true }, { en: 'Start, Middle, End', ur: 'شروع، درمیان، آخر', correct: false }, { en: 'Ask, Think, Done', ur: 'پوچھو، سوچو، ختم', correct: false }],
          },
        ],
      },
      {
        type: 'quranStar', world: 'light',
        arabic: 'فَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ',
        en: 'So whoever does an atom\'s weight of good will see it.',
        ur: 'جو ذرہ برابر نیکی کرے گا وہ اسے دیکھے گا۔',
        label: { en: 'Surah Az-Zalzalah 99:7', ur: 'سورۃ الزلزال ۹۹:۷' },
      },
      {
        type: 'mannersSort',
        items: [
          { icon: '📱', en: 'Help an elder use their phone',        ur: 'بزرگ کو فون استعمال کرانا',   good: true },
          { icon: '🤫', en: 'Stay quiet during prayers',            ur: 'نماز میں خاموش رہنا',          good: true },
          { icon: '😤', en: 'Snatch someone\'s toy',               ur: 'کسی کا کھلونا چھیننا',         good: false },
          { icon: '🙏', en: 'Say thank you after eating',           ur: 'کھانے کے بعد شکریہ کہنا',      good: true },
          { icon: '🗑️', en: 'Throw rubbish on the ground',         ur: 'زمین پر کوڑا پھینکنا',         good: false },
        ],
      },
    ],
  },

  // ── DAY 42 · PAID · Sleep and pillars ────────────────────────────────────────
  {
    title: { en: 'Sleep and pillars', ur: 'نیند اور ستون' },
    games: [
      {
        type: 'makeChart', world: 'data',
        title: { en: 'Hours of sleep needed per day', ur: 'روزانہ ضروری نیند کے گھنٹے' },
        bars: [
          { val: 16, label: { en: 'Baby', ur: 'بچہ' },     color: 'var(--grad-teal)' },
          { val: 12, label: { en: 'Toddler', ur: 'چھوٹا' }, color: 'var(--grad-coral)' },
          { val: 10, label: { en: 'Child', ur: 'بڑا بچہ' }, color: 'var(--grad-gold)' },
          { val: 8,  label: { en: 'Adult', ur: 'بالغ' },    color: 'var(--grad-lime)' },
        ],
        question: { en: 'Who needs the MOST sleep?', ur: 'سب سے زیادہ نیند کسے چاہیے؟' },
        answerKey: 0,
      },
      { type: 'fivePillars', world: 'light', pillars: PILLARS },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'مَنْ غَشَّنَا فَلَيْسَ مِنَّا',
        en: 'Whoever cheats us is not one of us.',
        ur: 'جو ہمیں دھوکا دے وہ ہم میں سے نہیں۔',
        label: { en: 'Hadith on Honesty', ur: 'ایمانداری کی حدیث' },
      },
    ],
  },

  // ── DAY 43 · PAID · AI predicts weather ──────────────────────────────────────
  {
    title: { en: 'AI predicts weather', ur: 'AI موسم کی پیشگوئی کرتی ہے' },
    games: [
      {
        type: 'buildBrain', world: 'neuro',
        inputs: [
          { icon: '☁️', en: 'Dark clouds', ur: 'کالے بادل' },
          { icon: '💨', en: 'Strong wind', ur: 'تیز ہوا' },
          { icon: '🌡️', en: 'Cold temperature', ur: 'ٹھنڈا موسم' },
        ],
        output: { icon: '🌧️', en: 'Rain coming!', ur: 'بارش آئے گی!' },
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'التَّوَّاب',  en: 'Accepter of Repentance', ur: 'توبہ قبول کرنے والا' },
          { ar: 'الْعَفُوّ',   en: 'The Pardoner',           ur: 'معاف کرنے والا' },
          { ar: 'الرَّؤُوف',   en: 'The Most Kind',          ur: 'بہت نرم دل' },
        ],
      },
      { type: 'binary', world: 'compute', target: 2 },
    ],
  },

  // ── DAY 44 · PAID · Islam and technology ─────────────────────────────────────
  {
    title: { en: 'Islam and technology', ur: 'اسلام اور ٹیکنالوجی' },
    games: [
      {
        type: 'trainNetwork', world: 'neuro',
        examples: [
          { icon: '🌙', label: { en: 'Crescent Moon', ur: 'ہلال' }, options: [{ en: 'Crescent Moon', ur: 'ہلال', correct: true }, { en: 'Pizza', ur: 'پیزا', correct: false }, { en: 'Ball', ur: 'گیند', correct: false }] },
          { icon: '📖', label: { en: 'Holy Quran', ur: 'قرآن' }, options: [{ en: 'Notebook', ur: 'کاپی', correct: false }, { en: 'Holy Quran', ur: 'قرآن', correct: true }, { en: 'Magazine', ur: 'رسالہ', correct: false }] },
          { icon: '🕌', label: { en: 'Masjid', ur: 'مسجد' }, options: [{ en: 'School', ur: 'اسکول', correct: false }, { en: 'Hospital', ur: 'ہسپتال', correct: false }, { en: 'Masjid', ur: 'مسجد', correct: true }] },
        ],
      },
      {
        type: 'quranStar', world: 'light',
        arabic: 'أَلْهَاكُمُ التَّكَاثُرُ ﴿١﴾ حَتَّىٰ زُرْتُمُ الْمَقَابِرَ',
        en: 'Competition in worldly increase diverts you — until you visit the graveyards.',
        ur: 'دنیا کی زیادتی کی چاہت نے تمہیں غافل کر دیا — یہاں تک کہ تم نے قبریں دیکھیں۔',
        label: { en: 'Surah At-Takathur 102:1-2', ur: 'سورۃ التکاثر ۱۰۲:۱-۲' },
      },
      {
        type: 'patternFinder', world: 'data',
        pattern: ['🕋', '🌙', '🕋', '🌙', '🕋', '?'],
        options: [{ icon: '🌙', correct: true }, { icon: '⭐', correct: false }, { icon: '☀️', correct: false }],
      },
    ],
  },

  // ── DAY 45 · PAID · Life sciences and AI ─────────────────────────────────────
  {
    title: { en: 'Life sciences and AI', ur: 'حیاتیات اور AI' },
    games: [
      {
        type: 'isThisACat', world: 'neuro',
        category: { en: 'a LIVING THING 🌿', ur: 'جاندار 🌿' },
        items: [
          { icon: '🌸', en: 'Flower',  ur: 'پھول',  isMatch: true },
          { icon: '🪨', en: 'Rock',    ur: 'پتھر',   isMatch: false },
          { icon: '🐝', en: 'Bee',     ur: 'مکھی',   isMatch: true },
          { icon: '🪑', en: 'Chair',   ur: 'کرسی',   isMatch: false },
          { icon: '🌊', en: 'Wave',    ur: 'لہر',    isMatch: false },
        ],
      },
      {
        type: 'robotChef', world: 'compute',
        task: { en: 'Help Zappy ⚡ make a fruit smoothie!', ur: 'زپی کو پھلوں کی سموتھی بنانے میں مدد کریں!' },
        steps: [
          { order: 1, icon: '🍌', en: 'Peel the banana',  ur: 'کیلہ چھیلیں' },
          { order: 2, icon: '🍓', en: 'Wash the berries', ur: 'بیریاں دھوئیں' },
          { order: 3, icon: '🥛', en: 'Add milk',          ur: 'دودھ ڈالیں' },
          { order: 4, icon: '🌪️', en: 'Blend it all',     ur: 'سب مکس کریں' },
          { order: 5, icon: '🥤', en: 'Pour and serve',   ur: 'ڈالیں اور پیش کریں' },
        ],
      },
      {
        type: 'quiz', world: 'compute',
        question: { en: 'What is machine learning?', ur: 'مشین لرننگ کیا ہے؟' },
        options: [
          { en: 'AI that learns from data 🤖', ur: 'AI جو ڈیٹا سے سیکھے 🤖', correct: true },
          { en: 'A robot that goes to school 🏫', ur: 'روبوٹ جو اسکول جائے 🏫', correct: false },
          { en: 'A computer that learns maths ➕', ur: 'کمپیوٹر جو ریاضی سیکھے ➕', correct: false },
        ],
      },
    ],
  },

  // ── DAY 46 · PAID · Voice assistants ─────────────────────────────────────────
  {
    title: { en: 'Voice assistants', ur: 'آواز کے مددگار' },
    games: [
      {
        type: 'layersGame', world: 'neuro',
        items: [
          { icon: '🎤', en: 'You speak into the microphone', ur: 'آپ مائکروفون میں بولتے ہیں', layer: 'input' },
          { icon: '⚙️', en: 'AI understands your words', ur: 'AI آپ کے الفاظ سمجھتی ہے', layer: 'hidden' },
          { icon: '🔊', en: 'Siri/Google gives you the answer', ur: 'Siri آپ کو جواب دیتی ہے', layer: 'output' },
        ],
      },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ',
        en: 'Actions are judged by intentions.',
        ur: 'اعمال کا دارومدار نیتوں پر ہے۔',
        label: { en: 'Hadith on Intentions', ur: 'نیت کی حدیث' },
      },
      {
        type: 'quranStar', world: 'light',
        arabic: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
        en: 'Allah does not burden a soul beyond what it can bear.',
        ur: 'اللہ کسی جان پر اس کی طاقت سے زیادہ بوجھ نہیں ڈالتا۔',
        label: { en: 'Surah Al-Baqarah 2:286', ur: 'سورۃ البقرہ ۲:۲۸۶' },
      },
    ],
  },

  // ── DAY 47 · PAID · AI in learning ───────────────────────────────────────────
  {
    title: { en: 'AI in learning', ur: 'تعلیم میں AI' },
    games: [
      {
        type: 'designAI', world: 'neuro',
        steps: [
          {
            prompt: { en: 'What will your AI help teach?', ur: 'آپ کی AI کیا سکھائے گی؟' },
            options: [
              { icon: '📖', en: 'Teach Quran reading', ur: 'قرآن پڑھنا سکھانا' },
              { icon: '🔢', en: 'Help with maths', ur: 'ریاضی میں مدد' },
              { icon: '🌍', en: 'Teach languages', ur: 'زبانیں سکھانا' },
              { icon: '🎨', en: 'Teach art and drawing', ur: 'آرٹ سکھانا' },
            ],
          },
          {
            prompt: { en: 'What will it learn from?', ur: 'یہ کس سے سیکھے گی؟' },
            options: [
              { icon: '🎙️', en: 'Recorded voices', ur: 'ریکارڈ شدہ آوازیں' },
              { icon: '📚', en: 'Books and texts', ur: 'کتابیں اور متون' },
              { icon: '✍️', en: 'Student answers', ur: 'طلبہ کے جوابات' },
              { icon: '🎮', en: 'Learning games', ur: 'تعلیمی کھیل' },
            ],
          },
          {
            prompt: { en: 'What will it give the student?', ur: 'یہ طالب علم کو کیا دے گی؟' },
            options: [
              { icon: '👍', en: 'Feedback on mistakes', ur: 'غلطیوں پر رائے' },
              { icon: '⭐', en: 'Stars and rewards', ur: 'ستارے اور انعام' },
              { icon: '🗺️', en: 'A personal learning path', ur: 'ذاتی سیکھنے کا راستہ' },
              { icon: '📊', en: 'Progress reports', ur: 'ترقی کی رپورٹ' },
            ],
          },
        ],
      },
      {
        type: 'dataSort', world: 'data',
        label: { en: 'Sort planets by size (smallest first)!', ur: 'سیاروں کو چھوٹے سے بڑے ترتیب دیں!' },
        items: [
          { val: 1, icon: '🔴', en: '1 — Mars',    ur: '1 — مریخ' },
          { val: 2, icon: '🌍', en: '2 — Earth',   ur: '2 — زمین' },
          { val: 4, icon: '🟣', en: '4 — Neptune', ur: '4 — نیپچون' },
          { val: 8, icon: '🟠', en: '8 — Saturn',  ur: '8 — زحل' },
        ],
      },
      { type: 'binary', world: 'compute', target: 1 },
    ],
  },

  // ── DAY 48 · PAID · Advanced AI Race ─────────────────────────────────────────
  {
    title: { en: 'Advanced AI Race', ur: 'ایڈوانسڈ AI ریس' },
    games: [
      {
        type: 'learningRace', world: 'neuro',
        questions: [
          {
            question: { en: 'What do we call AI that looks at pictures to understand them?', ur: 'جب AI تصویریں دیکھ کر سمجھتی ہے اسے کیا کہتے ہیں؟' },
            options: [{ en: 'Computer Vision 👁️', ur: 'کمپیوٹر ویژن 👁️', correct: true }, { en: 'Computer Hearing 👂', ur: 'کمپیوٹر سماعت 👂', correct: false }, { en: 'Robot Eyes 🤖', ur: 'روبوٹ آنکھیں 🤖', correct: false }],
          },
          {
            question: { en: 'Can AI make mistakes?', ur: 'کیا AI غلطیاں کر سکتی ہے؟' },
            options: [{ en: 'Yes — it needs more training', ur: 'ہاں — اسے مزید ٹریننگ چاہیے', correct: true }, { en: 'Never! AI is always right', ur: 'کبھی نہیں! AI ہمیشہ درست ہے', correct: false }, { en: 'Only on Fridays', ur: 'صرف جمعے کو', correct: false }],
          },
          {
            question: { en: 'What makes humans different from AI?', ur: 'انسان AI سے مختلف کیوں ہیں؟' },
            options: [{ en: 'Humans have a soul, feelings, and iman', ur: 'انسانوں میں روح، جذبات اور ایمان ہے', correct: true }, { en: 'Humans are slower', ur: 'انسان سست ہیں', correct: false }, { en: 'Humans need electricity', ur: 'انسانوں کو بجلی چاہیے', correct: false }],
          },
        ],
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الْغَنِيّ',  en: 'The Self-Sufficient', ur: 'بے نیاز' },
          { ar: 'النُّور',    en: 'The Light',            ur: 'نور' },
          { ar: 'الْهَادِي',  en: 'The Guide',            ur: 'راہنما' },
        ],
      },
      {
        type: 'quranStar', world: 'light',
        arabic: 'الرَّحْمَٰنُ ﴿١﴾ عَلَّمَ الْقُرْآنَ',
        en: 'The Most Gracious — taught the Quran.',
        ur: 'رحمان — اس نے قرآن سکھایا۔',
        label: { en: 'Surah Ar-Rahman 55:1-2', ur: 'سورۃ الرحمن ۵۵:۱-۲' },
      },
    ],
  },

  // ── DAY 49 · PAID · Robots and humans ────────────────────────────────────────
  {
    title: { en: 'Robots and humans', ur: 'روبوٹ اور انسان' },
    games: [
      {
        type: 'commandRobot', world: 'compute',
        size: 5, start: [0, 2], end: [4, 2], maxCommands: 10,
      },
      {
        type: 'aiOrHuman', world: 'ai',
        items: [
          { icon: '🏏', en: 'Playing cricket with friends', ur: 'دوستوں کے ساتھ کرکٹ کھیلنا', isAI: false },
          { icon: '♟️', en: 'Beating humans at chess', ur: 'شطرنج میں انسانوں کو ہرانا', isAI: true },
          { icon: '🤗', en: 'Comforting a sad friend', ur: 'اداس دوست کو تسلی دینا', isAI: false },
          { icon: '🗺️', en: 'Giving GPS directions instantly', ur: 'فوری GPS راستہ دینا', isAI: true },
          { icon: '🌹', en: 'Feeling love for your family', ur: 'خاندان سے پیار محسوس کرنا', isAI: false },
        ],
      },
      {
        type: 'patternFinder', world: 'data',
        pattern: ['🌙', '☀️', '🌙', '☀️', '🌙', '?'],
        options: [{ icon: '☀️', correct: true }, { icon: '⭐', correct: false }, { icon: '🌈', correct: false }],
      },
    ],
  },

  // ── DAY 50 · PAID · Emotion AI ────────────────────────────────────────────────
  {
    title: { en: 'Emotion AI', ur: 'جذبات AI' },
    games: [
      {
        type: 'buildBrain', world: 'neuro',
        inputs: [
          { icon: '😊', en: 'Smile', ur: 'مسکراہٹ' },
          { icon: '✨', en: 'Bright eyes', ur: 'چمکتی آنکھیں' },
          { icon: '🌈', en: 'Happy colours', ur: 'خوش رنگ' },
        ],
        output: { icon: '😄', en: 'Happy face!', ur: 'خوش چہرہ!' },
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الْبَاقِي',    en: 'The Everlasting',   ur: 'ہمیشہ قائم رہنے والا' },
          { ar: 'الْقَادِر',    en: 'The All-Powerful',  ur: 'قادر' },
          { ar: 'الْمُتَعَالِ', en: 'The Most Exalted',  ur: 'سب سے بلند' },
        ],
      },
      { type: 'binary', world: 'compute', target: 9 },
    ],
  },

  // ── DAY 51 · PAID · Animal kingdom ───────────────────────────────────────────
  {
    title: { en: 'Animal kingdom', ur: 'جانوروں کی دنیا' },
    games: [
      {
        type: 'trainNetwork', world: 'neuro',
        examples: [
          { icon: '🐘', label: { en: 'Elephant', ur: 'ہاتھی' }, options: [{ en: 'Elephant', ur: 'ہاتھی', correct: true }, { en: 'Train', ur: 'ٹرین', correct: false }, { en: 'Cloud', ur: 'بادل', correct: false }] },
          { icon: '🦁', label: { en: 'Lion', ur: 'شیر' }, options: [{ en: 'Dog', ur: 'کتا', correct: false }, { en: 'Lion', ur: 'شیر', correct: true }, { en: 'Fish', ur: 'مچھلی', correct: false }] },
          { icon: '🦋', label: { en: 'Butterfly', ur: 'تتلی' }, options: [{ en: 'Butterfly', ur: 'تتلی', correct: true }, { en: 'Kite', ur: 'پتنگ', correct: false }, { en: 'Leaf', ur: 'پتہ', correct: false }] },
        ],
      },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ',
        en: 'Indeed Allah is beautiful and loves beauty.',
        ur: 'بے شک اللہ خوبصورت ہے اور خوبصورتی کو پسند کرتا ہے۔',
        label: { en: 'Hadith on Beauty', ur: 'حسن کی حدیث' },
      },
      {
        type: 'patternFinder', world: 'data',
        pattern: ['🍎', '🍊', '🍋', '🍎', '🍊', '?'],
        options: [{ icon: '🍋', correct: true }, { icon: '🍇', correct: false }, { icon: '🍓', correct: false }],
      },
    ],
  },

  // ── DAY 52 · PAID · Smart transport ──────────────────────────────────────────
  {
    title: { en: 'Smart transport', ur: 'ذہین ٹرانسپورٹ' },
    games: [
      {
        type: 'isThisACat', world: 'neuro',
        category: { en: 'a VEHICLE 🚗', ur: 'گاڑی 🚗' },
        items: [
          { icon: '🚂', en: 'Train',    ur: 'ٹرین',          isMatch: true },
          { icon: '🍕', en: 'Pizza',    ur: 'پیزا',           isMatch: false },
          { icon: '✈️', en: 'Aeroplane', ur: 'ہوائی جہاز',   isMatch: true },
          { icon: '🌙', en: 'Moon',     ur: 'چاند',           isMatch: false },
          { icon: '🚲', en: 'Bicycle',  ur: 'سائیکل',         isMatch: true },
        ],
      },
      {
        type: 'quranStar', world: 'light',
        arabic: 'هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ',
        en: 'He is Allah — there is no deity except Him.',
        ur: 'وہی اللہ ہے جس کے سوا کوئی معبود نہیں۔',
        label: { en: 'Surah Al-Hashr 59:22', ur: 'سورۃ الحشر ۵۹:۲۲' },
      },
      {
        type: 'quiz', world: 'ai',
        question: { en: 'What does "AI" stand for?', ur: '"AI" کا کیا مطلب ہے؟' },
        options: [
          { en: 'Artificial Intelligence 🤖', ur: 'مصنوعی ذہانت 🤖', correct: true },
          { en: 'Advanced Internet 🌐',       ur: 'ایڈوانسڈ انٹرنیٹ 🌐', correct: false },
          { en: 'Amazing Inventions 💡',      ur: 'حیرت انگیز ایجادات 💡', correct: false },
        ],
      },
    ],
  },

  // ── DAY 53 · PAID · AI in medicine ───────────────────────────────────────────
  {
    title: { en: 'AI in medicine', ur: 'طب میں AI' },
    games: [
      {
        type: 'layersGame', world: 'neuro',
        items: [
          { icon: '🔬', en: 'Doctor scans the patient', ur: 'ڈاکٹر مریض کا اسکین کرتا ہے', layer: 'input' },
          { icon: '🧬', en: 'AI finds patterns in the scan', ur: 'AI اسکین میں نمونے ڈھونڈتی ہے', layer: 'hidden' },
          { icon: '💊', en: 'AI suggests a treatment', ur: 'AI علاج تجویز کرتی ہے', layer: 'output' },
        ],
      },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'مَنْ صَلَّى عَلَيَّ صَلَاةً صَلَّى اللَّهُ عَلَيْهِ عَشْرًا',
        en: 'Whoever sends one blessing upon me, Allah sends ten blessings upon him.',
        ur: 'جو مجھ پر ایک بار درود پڑھے، اللہ اس پر دس رحمتیں بھیجتا ہے۔',
        label: { en: 'Hadith on Durood', ur: 'درود کی حدیث' },
      },
      {
        type: 'dataSort', world: 'data',
        label: { en: 'Sort these surahs by number of verses (fewest first)!', ur: 'سورتوں کو آیات کی تعداد سے ترتیب دیں (کم پہلے)!' },
        items: [
          { val: 3,  icon: '📖', en: '3 — An-Nasr',  ur: '3 — النصر' },
          { val: 4,  icon: '📖', en: '4 — Al-Ikhlas', ur: '4 — الاخلاص' },
          { val: 5,  icon: '📖', en: '5 — Al-Masad',  ur: '5 — المسد' },
          { val: 7,  icon: '📖', en: '7 — Al-Fatiha', ur: '7 — الفاتحہ' },
        ],
      },
    ],
  },

  // ── DAY 54 · PAID · Wise AI user ─────────────────────────────────────────────
  {
    title: { en: 'Wise AI user', ur: 'سمجھدار AI استعمال کنندہ' },
    games: [
      {
        type: 'goodBadAI', world: 'ai',
        items: [
          { icon: '📝', en: 'Using AI to cheat on a test', ur: 'امتحان میں نقل کے لیے AI استعمال کرنا', isGood: false, reason: { en: 'Cheating is haram. Allah sees everything!', ur: 'نقل حرام ہے۔ اللہ سب کچھ دیکھتا ہے!' } },
          { icon: '🦯', en: 'AI that reads text aloud for blind people', ur: 'نابینا لوگوں کے لیے متن پڑھنے والی AI', isGood: true, reason: { en: 'Helping those with disability is a great act of kindness!', ur: 'معذوروں کی مدد کرنا بہت بڑی نیکی ہے!' } },
          { icon: '📰', en: 'Using AI to spread fake news', ur: 'جھوٹی خبریں پھیلانے کے لیے AI استعمال کرنا', isGood: false, reason: { en: 'Spreading lies is forbidden in Islam!', ur: 'جھوٹ پھیلانا اسلام میں منع ہے!' } },
          { icon: '🏥', en: 'AI that helps doctors find disease early', ur: 'AI جو بیماری جلد پکڑنے میں مدد کرے', isGood: true, reason: { en: 'Saving lives is one of the best deeds!', ur: 'جان بچانا بہترین اعمال میں سے ہے!' } },
        ],
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الْبَرّ',    en: 'The Source of All Good', ur: 'خیر کا سرچشمہ' },
          { ar: 'الشَّكُور',  en: 'The Appreciative',       ur: 'قدردان' },
          { ar: 'الْجَلِيل',  en: 'The Majestic',           ur: 'بڑی شان والا' },
        ],
      },
      { type: 'binary', world: 'compute', target: 13 },
    ],
  },

  // ── DAY 55 · PAID · AI Expert! ───────────────────────────────────────────────
  {
    title: { en: 'AI Expert!', ur: 'AI ماہر!' },
    games: [
      {
        type: 'learningRace', world: 'neuro',
        questions: [
          {
            question: { en: 'What is AI that understands human language called?', ur: 'انسانی زبان سمجھنے والی AI کو کیا کہتے ہیں؟' },
            options: [{ en: 'Natural Language Processing', ur: 'نیچرل لینگویج پروسیسنگ', correct: true }, { en: 'Magic Translator', ur: 'جادوئی ترجمان', correct: false }, { en: 'Language Robot', ur: 'زبان روبوٹ', correct: false }],
          },
          {
            question: { en: 'What is "deep learning"?', ur: '"ڈیپ لرننگ" کیا ہے؟' },
            options: [{ en: 'AI with many layers of thinking', ur: 'سوچ کی کئی پرتوں والی AI', correct: true }, { en: 'AI that studies very hard', ur: 'AI جو بہت محنت سے پڑھے', correct: false }, { en: 'Learning in a deep pool', ur: 'گہرے تالاب میں سیکھنا', correct: false }],
          },
          {
            question: { en: 'How should Muslims use AI?', ur: 'مسلمانوں کو AI کیسے استعمال کرنی چاہیے؟' },
            options: [{ en: 'With wisdom and honesty, to help others', ur: 'حکمت، ایمانداری اور دوسروں کی مدد کے لیے', correct: true }, { en: 'Any way they want', ur: 'جیسے چاہیں', correct: false }, { en: 'Never use it', ur: 'کبھی نہ استعمال کریں', correct: false }],
          },
        ],
      },
      {
        type: 'quranStar', world: 'light',
        arabic: 'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي',
        en: 'So remember Me; I will remember you. And be grateful to Me.',
        ur: 'پس مجھے یاد کرو، میں تمہیں یاد کروں گا، اور میرا شکر ادا کرو۔',
        label: { en: 'Surah Al-Baqarah 2:152', ur: 'سورۃ البقرہ ۲:۱۵۲' },
      },
      {
        type: 'makeChart', world: 'data',
        title: { en: 'Weather this month', ur: 'اس مہینے موسم' },
        bars: [
          { val: 12, label: { en: 'Sunny ☀️', ur: 'دھوپ ☀️' },  color: 'var(--grad-gold)' },
          { val: 8,  label: { en: 'Cloudy ☁️', ur: 'بادل ☁️' }, color: 'var(--grad-teal)' },
          { val: 6,  label: { en: 'Rainy 🌧️', ur: 'بارش 🌧️' }, color: 'var(--grad-coral)' },
          { val: 4,  label: { en: 'Windy 💨', ur: 'ہوا 💨' },   color: 'var(--grad-lime)' },
        ],
        question: { en: 'Which weather was most common?', ur: 'کون سا موسم سب سے زیادہ تھا؟' },
        answerKey: 0,
      },
    ],
  },

  // ── DAY 56 · PAID · AI in nature ─────────────────────────────────────────────
  {
    title: { en: 'AI in nature', ur: 'فطرت میں AI' },
    games: [
      {
        type: 'buildBrain', world: 'neuro',
        inputs: [
          { icon: '🌵', en: 'Dry soil', ur: 'خشک مٹی' },
          { icon: '🥀', en: 'Drooping leaves', ur: 'مرجھائے پتے' },
          { icon: '☀️', en: 'Hot & sunny', ur: 'گرم اور دھوپ' },
        ],
        output: { icon: '💧', en: 'Water the plant!', ur: 'پودے کو پانی دیں!' },
      },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ',
        en: 'The most beloved deeds to Allah are the most consistent ones, even if they are small.',
        ur: 'اللہ کو سب سے محبوب عمل وہ ہے جو ہمیشہ کیا جائے، چاہے تھوڑا ہو۔',
        label: { en: 'Hadith on Consistency', ur: 'استقامت کی حدیث' },
      },
      {
        type: 'patternFinder', world: 'data',
        pattern: ['🔵', '🔴', '🔵', '🔴', '🔵', '?'],
        options: [{ icon: '🔴', correct: true }, { icon: '🟡', correct: false }, { icon: '🟢', correct: false }],
      },
    ],
  },

  // ── DAY 57 · PAID · Pattern recognition ──────────────────────────────────────
  {
    title: { en: 'Pattern recognition', ur: 'نمونہ پہچاننا' },
    games: [
      {
        type: 'trainNetwork', world: 'neuro',
        examples: [
          { icon: '⭕', label: { en: 'Circle', ur: 'دائرہ' }, options: [{ en: 'Circle', ur: 'دائرہ', correct: true }, { en: 'Square', ur: 'مربع', correct: false }, { en: 'Triangle', ur: 'مثلث', correct: false }] },
          { icon: '🔷', label: { en: 'Square', ur: 'مربع' }, options: [{ en: 'Circle', ur: 'دائرہ', correct: false }, { en: 'Square', ur: 'مربع', correct: true }, { en: 'Star', ur: 'ستارہ', correct: false }] },
          { icon: '🔺', label: { en: 'Triangle', ur: 'مثلث' }, options: [{ en: 'Triangle', ur: 'مثلث', correct: true }, { en: 'Heart', ur: 'دل', correct: false }, { en: 'Moon', ur: 'چاند', correct: false }] },
        ],
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الْمُهَيْمِن', en: 'The Guardian',   ur: 'نگہبان' },
          { ar: 'الْجَبَّار',   en: 'The Compeller',  ur: 'زبردست' },
          { ar: 'الْعَظِيم',    en: 'The Magnificent', ur: 'عظیم' },
        ],
      },
      {
        type: 'quiz', world: 'compute',
        question: { en: 'What is an "algorithm"?', ur: '"الگورتھم" کیا ہے؟' },
        options: [
          { en: 'Step-by-step instructions 📋', ur: 'قدم بہ قدم ہدایات 📋', correct: true },
          { en: 'A type of robot 🤖',           ur: 'ایک قسم کا روبوٹ 🤖', correct: false },
          { en: 'A computer language 💻',       ur: 'ایک کمپیوٹر زبان 💻', correct: false },
        ],
      },
    ],
  },

  // ── DAY 58 · PAID · Islamic identity ──────────────────────────────────────────
  {
    title: { en: 'Islamic identity', ur: 'اسلامی شناخت' },
    games: [
      {
        type: 'isThisACat', world: 'neuro',
        category: { en: 'something ISLAMIC ☪️', ur: 'اسلامی چیز ☪️' },
        items: [
          { icon: '📿', en: 'Tasbih beads', ur: 'تسبیح',    isMatch: true },
          { icon: '🎸', en: 'Guitar',        ur: 'گٹار',     isMatch: false },
          { icon: '🕌', en: 'Masjid',        ur: 'مسجد',    isMatch: true },
          { icon: '🧸', en: 'Teddy bear',    ur: 'کھلونا',   isMatch: false },
          { icon: '🌙', en: 'Crescent moon', ur: 'ہلال',    isMatch: true },
        ],
      },
      {
        type: 'quranStar', world: 'light',
        arabic: 'إِنَّ أَكْرَمَكُمْ عِنْدَ اللَّهِ أَتْقَاكُمْ',
        en: 'Indeed the most noble of you in the sight of Allah is the most righteous of you.',
        ur: 'بے شک اللہ کے نزدیک تم میں سب سے معزز وہ ہے جو سب سے زیادہ متقی ہے۔',
        label: { en: 'Surah Al-Hujurat 49:13', ur: 'سورۃ الحجرات ۴۹:۱۳' },
      },
      {
        type: 'quiz', world: 'ai',
        question: { en: 'What is "robotics"?', ur: '"روبوٹکس" کیا ہے؟' },
        options: [
          { en: 'The science of building and programming robots 🤖', ur: 'روبوٹ بنانے اور پروگرام کرنے کا علم 🤖', correct: true },
          { en: 'A robot dance class 💃',                           ur: 'روبوٹ ڈانس کلاس 💃', correct: false },
          { en: 'A game where you control robots 🎮',               ur: 'روبوٹ کنٹرول کرنے کا کھیل 🎮', correct: false },
        ],
      },
    ],
  },

  // ── DAY 59 · PAID · Prophet's wisdom ─────────────────────────────────────────
  {
    title: { en: "Prophet's wisdom", ur: 'نبی کریم ﷺ کی حکمت' },
    games: [
      {
        type: 'hadithStory', world: 'light',
        arabic: 'الصِّدْقُ يَهْدِي إِلَى الْبِرِّ وَالْبِرُّ يَهْدِي إِلَى الْجَنَّةِ',
        en: 'Truthfulness leads to righteousness and righteousness leads to Paradise.',
        ur: 'سچائی نیکی کی طرف لے جاتی ہے اور نیکی جنت کی طرف لے جاتی ہے۔',
        label: { en: 'Hadith on Truthfulness', ur: 'سچائی کی حدیث' },
      },
      {
        type: 'dataSort', world: 'data',
        label: { en: 'Sort from coldest to hottest!', ur: 'ٹھنڈے سے گرم ترتیب دیں!' },
        items: [
          { val: 0,  icon: '❄️', en: '0°C — Freezing', ur: '0° — برف جم جائے' },
          { val: 20, icon: '🌤️', en: '20°C — Cool',    ur: '20° — ٹھنڈا' },
          { val: 30, icon: '☀️', en: '30°C — Warm',    ur: '30° — گرم' },
          { val: 40, icon: '🔥', en: '40°C — Hot!',    ur: '40° — بہت گرم!' },
        ],
      },
      { type: 'binary', world: 'compute', target: 6 },
    ],
  },

  // ── DAY 60 · PAID · Numbers of Allah ─────────────────────────────────────────
  {
    title: { en: 'Numbers of Allah', ur: 'اللہ کے عدد' },
    games: [
      {
        type: 'quranStar', world: 'light',
        arabic: 'لَئِنْ شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
        en: 'If you are grateful, I will surely increase you in favour.',
        ur: 'اگر تم شکر ادا کرو تو میں تمہیں اور زیادہ دوں گا۔',
        label: { en: 'Surah Ibrahim 14:7', ur: 'سورۃ ابراہیم ۱۴:۷' },
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الْعَلِيّ',  en: 'The Most High',     ur: 'سب سے اونچا' },
          { ar: 'الْكَبِير',  en: 'The Most Great',    ur: 'سب سے بڑا' },
          { ar: 'الْحَفِيظ',  en: 'The Preserver',     ur: 'حفاظت کرنے والا' },
        ],
      },
      { type: 'binary', world: 'compute', target: 3 },
    ],
  },

  // ── DAY 61 · PAID · Digital Islam ────────────────────────────────────────────
  {
    title: { en: 'Digital Islam', ur: 'ڈیجیٹل اسلام' },
    games: [
      {
        type: 'quiz', world: 'ai',
        question: { en: 'Can AI ever have true feelings or a soul?', ur: 'کیا AI کو کبھی سچے جذبات یا روح ہو سکتی ہے؟' },
        options: [
          { en: 'No — only Allah creates souls 🌟', ur: 'نہیں — روح صرف اللہ دیتا ہے 🌟', correct: true },
          { en: 'Yes, with better code 💻',         ur: 'ہاں، بہتر کوڈ سے 💻', correct: false },
          { en: 'Maybe in the future 🔮',           ur: 'شاید مستقبل میں 🔮', correct: false },
        ],
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الْمُقِيت',  en: 'The Sustainer',   ur: 'روزی دینے والا' },
          { ar: 'الْحَسِيب',  en: 'The Accountant',  ur: 'حساب لینے والا' },
          { ar: 'الْجَامِع',  en: 'The Gatherer',    ur: 'جمع کرنے والا' },
        ],
      },
      {
        type: 'aiOrHuman', world: 'ai',
        items: [
          { icon: '📖', en: 'Memorising the Quran with love', ur: 'محبت سے قرآن حفظ کرنا', isAI: false },
          { icon: '🌐', en: 'Translating 100 languages instantly', ur: 'فوری ۱۰۰ زبانیں ترجمہ کرنا', isAI: true },
          { icon: '😢', en: 'Feeling sad when someone is hurt', ur: 'کسی کو تکلیف پر دل دکھنا', isAI: false },
          { icon: '🧮', en: 'Solving a million sums in a second', ur: 'ایک سیکنڈ میں لاکھ سوال حل', isAI: true },
          { icon: '🤲', en: 'Making dua from the heart', ur: 'دل سے دعا مانگنا', isAI: false },
        ],
      },
    ],
  },

  // ── DAY 62 · PAID · Patterns of faith ────────────────────────────────────────
  {
    title: { en: 'Patterns of faith', ur: 'ایمان کے نمونے' },
    games: [
      {
        type: 'quranStar', world: 'light',
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ',
        en: 'O you who believe! Seek help through patience and prayer.',
        ur: 'اے ایمان والو! صبر اور نماز سے مدد مانگو۔',
        label: { en: 'Surah Al-Baqarah 2:153', ur: 'سورۃ البقرہ ۲:۱۵۳' },
      },
      {
        type: 'patternFinder', world: 'data',
        pattern: ['🏡', '⭐', '🏡', '⭐', '🏡', '?'],
        options: [{ icon: '⭐', correct: true }, { icon: '🌙', correct: false }, { icon: '🌈', correct: false }],
      },
      { type: 'binary', world: 'compute', target: 11 },
    ],
  },

  // ── DAY 63 · PAID · Half-way heroes ──────────────────────────────────────────
  {
    title: { en: 'Half-way heroes!', ur: 'آدھے راستے کے ہیرو!' },
    games: [
      {
        type: 'hadithStory', world: 'light',
        arabic: 'الدِّينُ النَّصِيحَةُ',
        en: 'Religion is sincere counsel (giving good advice).',
        ur: 'دین خیر خواہی کا نام ہے۔',
        label: { en: 'Hadith on Sincerity', ur: 'خیر خواہی کی حدیث' },
      },
      {
        type: 'quiz', world: 'compute',
        question: { en: 'What is a "pixel"?', ur: '"پکسل" کیا ہے؟' },
        options: [
          { en: 'A tiny dot that makes up a picture 🔵', ur: 'چھوٹا نقطہ جو تصویر بناتا ہے 🔵', correct: true },
          { en: 'A small robot 🤖',                     ur: 'ایک چھوٹا روبوٹ 🤖', correct: false },
          { en: 'A type of computer screen 🖥️',        ur: 'کمپیوٹر اسکرین کی قسم 🖥️', correct: false },
        ],
      },
      {
        type: 'patternFinder', world: 'data',
        pattern: ['🌺', '🌻', '🌺', '🌻', '🌺', '?'],
        options: [{ icon: '🌻', correct: true }, { icon: '🌹', correct: false }, { icon: '🌷', correct: false }],
      },
    ],
  },

  // ── DAY 64 · PAID · Tech wisdom ──────────────────────────────────────────────
  {
    title: { en: 'Tech wisdom', ur: 'ٹیک کی حکمت' },
    games: [
      {
        type: 'quranStar', world: 'light',
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ حَقَّ تُقَاتِهِ',
        en: 'O you who believe! Fear Allah as He should be feared.',
        ur: 'اے ایمان والو! اللہ سے اس طرح ڈرو جیسا ڈرنے کا حق ہے۔',
        label: { en: 'Surah Al-Imran 3:102', ur: 'سورۃ آل عمران ۳:۱۰۲' },
      },
      { type: 'binary', world: 'compute', target: 7 },
      {
        type: 'quiz', world: 'ai',
        question: { en: 'What is "cybersecurity"?', ur: '"سائبر سیکیورٹی" کیا ہے؟' },
        options: [
          { en: 'Protecting computers from harm and hackers 🔒', ur: 'کمپیوٹر کو نقصان سے بچانا 🔒', correct: true },
          { en: 'A type of superhero 🦸',                       ur: 'ایک قسم کا سپر ہیرو 🦸', correct: false },
          { en: 'Making computers faster ⚡',                   ur: 'کمپیوٹر کو تیز بنانا ⚡', correct: false },
        ],
      },
    ],
  },

  // ── DAY 65 · PAID · The 99 Names ─────────────────────────────────────────────
  {
    title: { en: 'The 99 Names of Allah', ur: 'اللہ کے 99 نام' },
    games: [
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الْوَارِث',  en: 'The Inheritor',        ur: 'وراثت کا مالک' },
          { ar: 'الرَّشِيد',  en: 'The Guide to the Right', ur: 'سیدھا راستہ دکھانے والا' },
          { ar: 'الصَّبُور',  en: 'The Most Patient',      ur: 'بہت صبر کرنے والا' },
        ],
      },
      {
        type: 'patternFinder', world: 'data',
        pattern: ['🐝', '🦋', '🐝', '🦋', '🐝', '?'],
        options: [{ icon: '🦋', correct: true }, { icon: '🐞', correct: false }, { icon: '🐛', correct: false }],
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'How many names does Allah have that we know about?', ur: 'اللہ کے کتنے نام ہیں جو ہم جانتے ہیں؟' },
        options: [
          { en: '99 beautiful names ✨', ur: '99 خوبصورت نام ✨', correct: true },
          { en: '50 names 🔢',          ur: '50 نام 🔢', correct: false },
          { en: 'Only 5 names 🖐️',     ur: 'صرف 5 نام 🖐️', correct: false },
        ],
      },
    ],
  },

  // ── DAY 66 · PAID · Big data ──────────────────────────────────────────────────
  {
    title: { en: 'Big data', ur: 'بڑا ڈیٹا' },
    games: [
      {
        type: 'hadithStory', world: 'light',
        arabic: 'لَا تَحْقِرَنَّ مِنَ الْمَعْرُوفِ شَيْئًا',
        en: "Don't belittle any act of kindness, even greeting your brother with a cheerful face.",
        ur: 'کسی نیکی کو چھوٹا مت سمجھو، چاہے اپنے بھائی سے خوش چہرے سے ملنا ہو۔',
        label: { en: 'Hadith on Small Kindnesses', ur: 'چھوٹی نیکی کی حدیث' },
      },
      {
        type: 'dataSort', world: 'data',
        label: { en: 'Sort from fewest to most!', ur: 'کم سے زیادہ ترتیب دیں!' },
        items: [
          { val: 4,  icon: '🌺', en: '4 — seasons',        ur: '4 — موسم' },
          { val: 7,  icon: '📅', en: '7 — days in a week', ur: '7 — ہفتے کے دن' },
          { val: 12, icon: '🗓️', en: '12 — months in year', ur: '12 — سال کے مہینے' },
          { val: 24, icon: '🕐', en: '24 — hours in a day', ur: '24 — دن کے گھنٹے' },
        ],
      },
      {
        type: 'quiz', world: 'compute',
        question: { en: 'What does "data" mean in computing?', ur: 'کمپیوٹنگ میں "ڈیٹا" کا کیا مطلب ہے؟' },
        options: [
          { en: 'Information stored for computers to use 💾', ur: 'کمپیوٹر کے استعمال کے لیے محفوظ معلومات 💾', correct: true },
          { en: 'A type of cable 🔌',                        ur: 'تار کی ایک قسم 🔌', correct: false },
          { en: 'A computer program 💻',                     ur: 'کمپیوٹر پروگرام 💻', correct: false },
        ],
      },
    ],
  },

  // ── DAY 67 · PAID · Online safety ────────────────────────────────────────────
  {
    title: { en: 'Online safety', ur: 'آن لائن حفاظت' },
    games: [
      {
        type: 'quranStar', world: 'light',
        arabic: 'وَأْمُرْ بِالْمَعْرُوفِ وَانْهَ عَنِ الْمُنكَرِ',
        en: 'Enjoin what is right and forbid what is wrong.',
        ur: 'نیکی کا حکم دو اور برائی سے منع کرو۔',
        label: { en: 'Surah Luqman 31:17', ur: 'سورۃ لقمان ۳۱:۱۷' },
      },
      {
        type: 'goodBadAI', world: 'ai',
        items: [
          { icon: '🔒', en: 'AI that protects your passwords', ur: 'AI جو پاسورڈ محفوظ رکھے', isGood: true, reason: { en: 'Protecting privacy is important in Islam too!', ur: 'رازداری کی حفاظت اسلام میں بھی ضروری ہے!' } },
          { icon: '👁️', en: 'AI that secretly watches children', ur: 'AI جو بچوں پر خفیہ نظر رکھے', isGood: false, reason: { en: 'Spying without permission is wrong — even Allah gave us privacy!', ur: 'اجازت کے بغیر جاسوسی غلط ہے — اللہ نے بھی ہمیں پرائیویسی دی!' } },
          { icon: '📲', en: 'AI that blocks harmful websites for kids', ur: 'AI جو بچوں کے لیے نقصاندہ ویب سائٹس روکے', isGood: true, reason: { en: 'Protecting children from harm is our Islamic duty!', ur: 'بچوں کو نقصان سے بچانا ہمارا اسلامی فرض ہے!' } },
        ],
      },
      { type: 'binary', world: 'compute', target: 4 },
    ],
  },

  // ── DAY 68 · PAID · Number games ─────────────────────────────────────────────
  {
    title: { en: 'Number games', ur: 'گنتی کے کھیل' },
    games: [
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الْمُغْنِي', en: 'The Enricher',   ur: 'مالدار کرنے والا' },
          { ar: 'الْمَانِع',  en: 'The Withholder', ur: 'روکنے والا' },
          { ar: 'النَّافِع',  en: 'The Benefactor', ur: 'فائدہ دینے والا' },
        ],
      },
      { type: 'binary', world: 'compute', target: 15 },
      {
        type: 'patternFinder', world: 'data',
        pattern: ['⚽', '🏀', '⚽', '🏀', '⚽', '?'],
        options: [{ icon: '🏀', correct: true }, { icon: '🎾', correct: false }, { icon: '🏈', correct: false }],
      },
    ],
  },

  // ── DAY 69 · PAID · Learning together ────────────────────────────────────────
  {
    title: { en: 'Learning together', ur: 'مل کر سیکھنا' },
    games: [
      {
        type: 'hadithStory', world: 'light',
        arabic: 'الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ ارْحَمُوا مَنْ فِي الْأَرْضِ',
        en: 'The merciful will be shown mercy by the Most Merciful. Show mercy to those on earth.',
        ur: 'رحم کرنے والوں پر رحمان رحم کرتا ہے۔ زمین والوں پر رحم کرو۔',
        label: { en: 'Hadith on Mercy', ur: 'رحمت کی حدیث' },
      },
      {
        type: 'quiz', world: 'ai',
        question: { en: 'What is a "chatbot"?', ur: '"چیٹ بوٹ" کیا ہے؟' },
        options: [
          { en: 'AI that can have a conversation with you 💬', ur: 'AI جو آپ سے بات کر سکے 💬', correct: true },
          { en: 'A robot that makes tea 🤖',                  ur: 'چائے بنانے والا روبوٹ 🤖', correct: false },
          { en: 'A chat room for kids 🧒',                    ur: 'بچوں کے لیے چیٹ روم 🧒', correct: false },
        ],
      },
      {
        type: 'dataSort', world: 'data',
        label: { en: 'Sort these creatures by speed (slowest first)!', ur: 'مخلوقات کو رفتار سے ترتیب دیں (سست پہلے)!' },
        items: [
          { val: 0,  icon: '🐌', en: '0 — Snail',   ur: '0 — گھونگا' },
          { val: 5,  icon: '🐢', en: '5 — Tortoise', ur: '5 — کچھوا' },
          { val: 30, icon: '🐕', en: '30 — Dog',     ur: '30 — کتا' },
          { val: 70, icon: '🐆', en: '70 — Cheetah', ur: '70 — چیتا' },
        ],
      },
    ],
  },

  // ── DAY 70 · PAID · Data and Deen ────────────────────────────────────────────
  {
    title: { en: 'Data and Deen', ur: 'ڈیٹا اور دین' },
    games: [
      {
        type: 'quranStar', world: 'light',
        arabic: 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنْفُسِهِمْ لَا تَقْنَطُوا مِنْ رَحْمَةِ اللَّهِ',
        en: 'Say: O My servants who have transgressed against themselves — do not despair of Allah\'s mercy.',
        ur: 'کہہ دو: اے میرے وہ بندو جنہوں نے اپنے آپ پر زیادتی کی — اللہ کی رحمت سے مایوس نہ ہو۔',
        label: { en: 'Surah Az-Zumar 39:53', ur: 'سورۃ الزمر ۳۹:۵۳' },
      },
      {
        type: 'makeChart', world: 'data',
        title: { en: 'Fruits sold at the market today', ur: 'آج بازار میں بکنے والے پھل' },
        bars: [
          { val: 30, label: { en: 'Mango 🥭', ur: 'آم 🥭' },    color: 'var(--grad-gold)' },
          { val: 20, label: { en: 'Apple 🍎', ur: 'سیب 🍎' },   color: 'var(--grad-coral)' },
          { val: 25, label: { en: 'Banana 🍌', ur: 'کیلہ 🍌' }, color: 'var(--grad-lime)' },
          { val: 15, label: { en: 'Guava 🍏', ur: 'امرود 🍏' }, color: 'var(--grad-teal)' },
        ],
        question: { en: 'Which fruit sold the MOST?', ur: 'کون سا پھل سب سے زیادہ بکا؟' },
        answerKey: 0,
      },
      {
        type: 'quiz', world: 'compute',
        question: { en: 'How many bits are in a byte?', ur: 'ایک بائٹ میں کتنے بِٹس ہوتے ہیں؟' },
        options: [
          { en: '8 bits 💡', ur: '8 بِٹس 💡', correct: true },
          { en: '4 bits 💡', ur: '4 بِٹس 💡', correct: false },
          { en: '16 bits 💡', ur: '16 بِٹس 💡', correct: false },
        ],
      },
    ],
  },

  // ── DAY 71 · PAID · Expert round ──────────────────────────────────────────────
  {
    title: { en: 'Expert round!', ur: 'ماہر مرحلہ!' },
    games: [
      {
        type: 'learningRace', world: 'neuro',
        questions: [
          {
            question: { en: 'What does AI use to "see" and recognise faces?', ur: 'AI چہرے پہچاننے کے لیے کیا استعمال کرتی ہے؟' },
            options: [{ en: 'Computer Vision cameras 📷', ur: 'کمپیوٹر ویژن کیمرے 📷', correct: true }, { en: 'Magic sensors ✨', ur: 'جادوئی سینسر ✨', correct: false }, { en: 'Human helpers 👫', ur: 'انسانی مددگار 👫', correct: false }],
          },
          {
            question: { en: 'What is "training" an AI?', ur: 'AI کو "ٹریننگ" دینا کیا ہے؟' },
            options: [{ en: 'Showing it thousands of examples', ur: 'ہزاروں مثالیں دکھانا', correct: true }, { en: 'Teaching it at a school 🏫', ur: 'اسکول میں پڑھانا 🏫', correct: false }, { en: 'Making it run on a track 🏃', ur: 'پٹری پر دوڑانا 🏃', correct: false }],
          },
          {
            question: { en: 'What is the most important thing about AI for a Muslim?', ur: 'مسلمان کے لیے AI کی سب سے اہم بات کیا ہے؟' },
            options: [{ en: 'Use it for good — avoid harm and deception', ur: 'اسے بھلائی کے لیے استعمال کریں — نقصان اور دھوکے سے بچیں', correct: true }, { en: 'Use it as much as possible', ur: 'جتنا ہو سکے استعمال کریں', correct: false }, { en: 'Never use AI', ur: 'AI کبھی نہ استعمال کریں', correct: false }],
          },
        ],
      },
      {
        type: 'quranStar', world: 'light',
        arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ﴿٥﴾ إِنَّ مَعَ الْعُسْرِ يُسْرًا',
        en: 'For indeed, with hardship will be ease. Indeed, with hardship will be ease.',
        ur: 'بے شک مشکل کے ساتھ آسانی ہے۔ بے شک مشکل کے ساتھ آسانی ہے۔',
        label: { en: 'Surah Ash-Sharh 94:5-6', ur: 'سورۃ الشرح ۹۴:۵-۶' },
      },
      { type: 'binary', world: 'compute', target: 12 },
    ],
  },

  // ── DAY 72 · PAID · Heart of Islam ───────────────────────────────────────────
  {
    title: { en: 'Heart of Islam', ur: 'اسلام کا دل' },
    games: [
      {
        type: 'quranStar', world: 'light',
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        en: 'In the name of Allah, the Most Gracious, the Most Merciful. All praise is for Allah, Lord of all worlds.',
        ur: 'اللہ کے نام سے جو بہت مہربان نہایت رحم والا ہے۔ تمام تعریفیں اللہ کے لیے ہیں جو سارے جہانوں کا پروردگار ہے۔',
        label: { en: 'Surah Al-Fatihah 1:1-2', ur: 'سورۃ الفاتحہ ۱:۱-۲' },
      },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
        en: 'The best of you is the one who learns the Quran and teaches it.',
        ur: 'تم میں سے بہترین وہ ہے جو قرآن سیکھے اور سکھائے۔',
        label: { en: 'Hadith on Quran', ur: 'قرآن کی حدیث' },
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الرَّحْمَٰن', en: 'The Most Gracious', ur: 'بہت مہربان' },
          { ar: 'الرَّحِيم',   en: 'The Most Merciful', ur: 'نہایت رحم والا' },
          { ar: 'الْقُدُّوس',  en: 'The Most Holy',     ur: 'پاک' },
        ],
      },
    ],
  },

  // ── DAY 73 · PAID · Computer games ───────────────────────────────────────────
  {
    title: { en: 'Computer games', ur: 'کمپیوٹر کے کھیل' },
    games: [
      { type: 'binary', world: 'compute', target: 10 },
      {
        type: 'quiz', world: 'compute',
        question: { en: 'What does a "GPU" help with?', ur: '"GPU" کس چیز میں مدد کرتا ہے؟' },
        options: [
          { en: 'Making pictures and videos on screen 🖼️', ur: 'اسکرین پر تصاویر اور ویڈیو بنانا 🖼️', correct: true },
          { en: 'Storing files 💾',                       ur: 'فائلیں محفوظ کرنا 💾', correct: false },
          { en: 'Connecting to the internet 🌐',          ur: 'انٹرنیٹ سے جوڑنا 🌐', correct: false },
        ],
      },
      {
        type: 'patternFinder', world: 'data',
        pattern: ['🌟', '💫', '🌟', '💫', '🌟', '?'],
        options: [{ icon: '💫', correct: true }, { icon: '⭐', correct: false }, { icon: '✨', correct: false }],
      },
    ],
  },

  // ── DAY 74 · PAID · AI in society ────────────────────────────────────────────
  {
    title: { en: 'AI in society', ur: 'معاشرے میں AI' },
    games: [
      {
        type: 'hadithStory', world: 'light',
        arabic: 'خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ',
        en: 'The best of people are those who are most beneficial to people.',
        ur: 'لوگوں میں سب سے بہتر وہ ہے جو لوگوں کے لیے سب سے زیادہ فائدہ مند ہو۔',
        label: { en: 'Hadith on Being Useful', ur: 'مفید ہونے کی حدیث' },
      },
      {
        type: 'makeChart', world: 'data',
        title: { en: 'Stars earned this week', ur: 'اس ہفتے کمائے گئے ستارے' },
        bars: [
          { val: 5,  label: { en: 'Mon', ur: 'پیر' },   color: 'var(--grad-gold)' },
          { val: 8,  label: { en: 'Tue', ur: 'منگل' },  color: 'var(--grad-teal)' },
          { val: 3,  label: { en: 'Wed', ur: 'بدھ' },   color: 'var(--grad-coral)' },
          { val: 10, label: { en: 'Thu', ur: 'جمعرات' }, color: 'var(--grad-lime)' },
        ],
        question: { en: 'Which day had the most stars?', ur: 'کس دن سب سے زیادہ ستارے ملے؟' },
        answerKey: 3,
      },
      {
        type: 'aiOrHuman', world: 'ai',
        items: [
          { icon: '🎨', en: 'Creating art with real emotions', ur: 'سچے جذبات سے آرٹ بنانا', isAI: false },
          { icon: '🚗', en: 'Driving a car without a human', ur: 'انسان کے بغیر گاڑی چلانا', isAI: true },
          { icon: '🤲', en: 'Giving charity to help others', ur: 'دوسروں کی مدد کے لیے صدقہ دینا', isAI: false },
          { icon: '🌡️', en: 'Measuring temperature instantly', ur: 'فوری درجہ حرارت ناپنا', isAI: true },
          { icon: '💤', en: 'Feeling sleepy after a long day', ur: 'لمبے دن کے بعد نیند محسوس کرنا', isAI: false },
        ],
      },
    ],
  },

  // ── DAY 75 · PAID · Names and verses ─────────────────────────────────────────
  {
    title: { en: 'Names and verses', ur: 'نام اور آیات' },
    games: [
      {
        type: 'quranStar', world: 'light',
        arabic: 'وَهُوَ مَعَكُمْ أَيْنَمَا كُنتُمْ',
        en: 'And He is with you wherever you are.',
        ur: 'اور وہ تمہارے ساتھ ہے جہاں بھی تم ہو۔',
        label: { en: 'Surah Al-Hadid 57:4', ur: 'سورۃ الحدید ۵۷:۴' },
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الْأَوَّل', en: 'The First',  ur: 'سب سے پہلے' },
          { ar: 'الْآخِر',  en: 'The Last',   ur: 'سب سے بعد' },
          { ar: 'الظَّاهِر', en: 'The Manifest', ur: 'ظاہر' },
        ],
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'How many chapters (surahs) are in the Quran?', ur: 'قرآن میں کتنے پارے (سورتیں) ہیں؟' },
        options: [
          { en: '114 surahs 📖', ur: '114 سورتیں 📖', correct: true },
          { en: '99 surahs 📖',  ur: '99 سورتیں 📖', correct: false },
          { en: '30 surahs 📖',  ur: '30 سورتیں 📖', correct: false },
        ],
      },
    ],
  },

  // ── DAY 76 · PAID · Organising data ──────────────────────────────────────────
  {
    title: { en: 'Organising data', ur: 'ڈیٹا ترتیب دینا' },
    games: [
      { type: 'binary', world: 'compute', target: 8 },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ',
        en: 'Allah loves that when one of you does an action, he does it with excellence.',
        ur: 'اللہ پسند کرتا ہے کہ جب تم میں سے کوئی کام کرے تو اسے بہترین طریقے سے کرے۔',
        label: { en: 'Hadith on Excellence', ur: 'اتقان کی حدیث' },
      },
      {
        type: 'dataSort', world: 'data',
        label: { en: 'Sort stars by brightness (dimmest first)!', ur: 'ستاروں کو چمک سے ترتیب دیں (کم چمکیلے پہلے)!' },
        items: [
          { val: 1, icon: '✦', en: '1 — Dim star',   ur: '1 — مدھم ستارہ' },
          { val: 3, icon: '✧', en: '3 — Medium star', ur: '3 — درمیانہ ستارہ' },
          { val: 5, icon: '⭐', en: '5 — Bright star', ur: '5 — روشن ستارہ' },
          { val: 7, icon: '🌟', en: '7 — Super star',  ur: '7 — سپر ستارہ' },
        ],
      },
    ],
  },

  // ── DAY 77 · PAID · Responsible AI ───────────────────────────────────────────
  {
    title: { en: 'Responsible AI', ur: 'ذمہ دار AI' },
    games: [
      {
        type: 'goodBadAI', world: 'ai',
        items: [
          { icon: '🌾', en: 'AI helping farmers know when to water crops', ur: 'AI کسانوں کو فصل سینچنے کا وقت بتائے', isGood: true, reason: { en: 'Using AI to feed people is a great good deed!', ur: 'لوگوں کو کھانا دینے کے لیے AI بہت اچھا کام ہے!' } },
          { icon: '🎭', en: 'AI creating deepfake videos to deceive people', ur: 'AI لوگوں کو دھوکا دینے کے لیے جھوٹی ویڈیو بنائے', isGood: false, reason: { en: 'Deception (ghash) is forbidden in Islam!', ur: 'دھوکہ (غش) اسلام میں حرام ہے!' } },
          { icon: '♻️', en: 'AI that helps sort recycling waste', ur: 'AI جو کوڑا چھانٹنے میں مدد کرے', isGood: true, reason: { en: 'Protecting the earth (amanah) is our duty!', ur: 'زمین کی حفاظت (امانت) ہمارا فرض ہے!' } },
        ],
      },
      {
        type: 'quranStar', world: 'light',
        arabic: 'وَلَا تَقْفُ مَا لَيْسَ لَكَ بِهِ عِلْمٌ',
        en: 'Do not follow that of which you have no knowledge.',
        ur: 'اس چیز کے پیچھے مت پڑو جس کا تمہیں علم نہ ہو۔',
        label: { en: 'Surah Al-Isra 17:36', ur: 'سورۃ الاسراء ۱۷:۳۶' },
      },
      { type: 'binary', world: 'compute', target: 16 },
    ],
  },

  // ── DAY 78 · PAID · Human vs machine ─────────────────────────────────────────
  {
    title: { en: 'Human vs machine', ur: 'انسان بمقابلہ مشین' },
    games: [
      {
        type: 'aiOrHuman', world: 'ai',
        items: [
          { icon: '📸', en: 'Scanning 1,000 faces per second', ur: 'ایک سیکنڈ میں 1000 چہرے اسکین کرنا', isAI: true },
          { icon: '🌹', en: 'Writing a poem with true feelings', ur: 'سچے جذبات سے نظم لکھنا', isAI: false },
          { icon: '🔑', en: 'Breaking a password in seconds', ur: 'سیکنڈوں میں پاسورڈ توڑنا', isAI: true },
          { icon: '😇', en: 'Making a moral choice with a good heart', ur: 'اچھے دل سے اخلاقی فیصلہ کرنا', isAI: false },
          { icon: '📡', en: 'Tracking satellites across the sky', ur: 'آسمان میں سیارچوں کو ٹریک کرنا', isAI: true },
        ],
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الْخَالِق',  en: 'The Creator',    ur: 'پیدا کرنے والا' },
          { ar: 'الْبَارِئ',  en: 'The Originator', ur: 'تخلیق کرنے والا' },
          { ar: 'الْمُصَوِّر', en: 'The Fashioner', ur: 'صورت بنانے والا' },
        ],
      },
      {
        type: 'patternFinder', world: 'data',
        pattern: ['🦁', '🐯', '🦁', '🐯', '🦁', '?'],
        options: [{ icon: '🐯', correct: true }, { icon: '🐻', correct: false }, { icon: '🐺', correct: false }],
      },
    ],
  },

  // ── DAY 79 · PAID · Science of robots ────────────────────────────────────────
  {
    title: { en: 'Science of robots', ur: 'روبوٹ کی سائنس' },
    games: [
      {
        type: 'quranStar', world: 'light',
        arabic: 'وَعَلَّمَ آدَمَ الْأَسْمَاءَ كُلَّهَا',
        en: 'And He taught Adam the names of all things.',
        ur: 'اور اللہ نے آدم کو تمام چیزوں کے نام سکھائے۔',
        label: { en: 'Surah Al-Baqarah 2:31', ur: 'سورۃ البقرہ ۲:۳۱' },
      },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ',
        en: 'Whoever takes a path in search of knowledge, Allah will make the path to Paradise easy for him.',
        ur: 'جو علم کی تلاش میں راستہ اپنائے، اللہ اس کے لیے جنت کا راستہ آسان کر دیتا ہے۔',
        label: { en: 'Hadith on Seeking Knowledge', ur: 'علم کی تلاش کی حدیث' },
      },
      {
        type: 'quiz', world: 'compute',
        question: { en: 'What does a robot need to move and work?', ur: 'روبوٹ کو چلنے اور کام کرنے کے لیے کیا چاہیے؟' },
        options: [
          { en: 'Sensors, motors, and a program 🤖', ur: 'سینسر، موٹر اور پروگرام 🤖', correct: true },
          { en: 'Food and water 🍔',                 ur: 'کھانا اور پانی 🍔', correct: false },
          { en: 'Sleep and rest 😴',                 ur: 'نیند اور آرام 😴', correct: false },
        ],
      },
    ],
  },

  // ── DAY 80 · PAID · Robot kitchen ────────────────────────────────────────────
  {
    title: { en: 'Robot kitchen', ur: 'روبوٹ کی باورچی خانہ' },
    games: [
      {
        type: 'robotChef', world: 'compute',
        task: { en: 'Help Zappy ⚡ make a sandwich!', ur: 'زپی ⚡ کو سینڈوچ بنانے میں مدد کریں!' },
        steps: [
          { order: 1, icon: '🍞', en: 'Get two slices of bread', ur: 'روٹی کے دو ٹکڑے لیں' },
          { order: 2, icon: '🧈', en: 'Spread butter on one slice', ur: 'ایک ٹکڑے پر مکھن لگائیں' },
          { order: 3, icon: '🥬', en: 'Add a lettuce leaf',         ur: 'لیٹس کا پتہ رکھیں' },
          { order: 4, icon: '🍅', en: 'Add sliced tomato',          ur: 'ٹماٹر کے ٹکڑے رکھیں' },
          { order: 5, icon: '🥪', en: 'Close and serve',            ur: 'بند کریں اور پیش کریں' },
        ],
      },
      {
        type: 'quranStar', world: 'light',
        arabic: 'وَكُلُوا وَاشْرَبُوا وَلَا تُسْرِفُوا',
        en: 'Eat and drink, but do not be excessive.',
        ur: 'کھاؤ اور پیو، لیکن حد سے مت بڑھو۔',
        label: { en: 'Surah Al-A\'raf 7:31', ur: 'سورۃ الاعراف ۷:۳۱' },
      },
      { type: 'binary', world: 'compute', target: 5 },
    ],
  },

  // ── DAY 81 · PAID · Names challenge ──────────────────────────────────────────
  {
    title: { en: 'Names challenge!', ur: 'ناموں کا چیلنج!' },
    games: [
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'اللَّطِيف',   en: 'The Subtle, The Kind', ur: 'مہربان' },
          { ar: 'الْخَبِير',   en: 'The Aware',            ur: 'باخبر' },
          { ar: 'الْحَلِيم',   en: 'The Forbearing',      ur: 'بردبار' },
        ],
      },
      { type: 'binary', world: 'compute', target: 14 },
      {
        type: 'quiz', world: 'light',
        question: { en: 'What does "Subhanallah" mean?', ur: '"سبحان اللہ" کا کیا مطلب ہے؟' },
        options: [
          { en: 'Glory be to Allah ✨', ur: 'اللہ پاک ہے ✨', correct: true },
          { en: 'Thank you Allah 🙏',  ur: 'اللہ کا شکر 🙏', correct: false },
          { en: 'Allah is great 🕌',   ur: 'اللہ بڑا ہے 🕌', correct: false },
        ],
      },
    ],
  },

  // ── DAY 82 · PAID · Patterns of faith ────────────────────────────────────────
  {
    title: { en: 'Patterns of faith', ur: 'ایمان کے نمونے' },
    games: [
      {
        type: 'hadithStory', world: 'light',
        arabic: 'إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ',
        en: 'The believers are brothers.',
        ur: 'تمام مومن آپس میں بھائی ہیں۔',
        label: { en: 'Surah Al-Hujurat 49:10', ur: 'سورۃ الحجرات ۴۹:۱۰' },
      },
      {
        type: 'patternFinder', world: 'data',
        pattern: ['🌴', '🌵', '🌲', '🌴', '🌵', '?'],
        options: [{ icon: '🌲', correct: true }, { icon: '🌿', correct: false }, { icon: '🍀', correct: false }],
      },
      {
        type: 'quranStar', world: 'light',
        arabic: 'وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ',
        en: 'And they advised each other to the truth, and advised each other to patience.',
        ur: 'اور ایک دوسرے کو حق کی اور صبر کی وصیت کی۔',
        label: { en: 'Surah Al-Asr 103:3', ur: 'سورۃ العصر ۱۰۳:۳' },
      },
    ],
  },

  // ── DAY 83 · PAID · Data master ───────────────────────────────────────────────
  {
    title: { en: 'Data master!', ur: 'ڈیٹا ماہر!' },
    games: [
      {
        type: 'makeChart', world: 'data',
        title: { en: 'Books read this summer', ur: 'اس گرمیوں میں پڑھی کتابیں' },
        bars: [
          { val: 4, label: { en: 'Ahmed', ur: 'احمد' },  color: 'var(--grad-teal)' },
          { val: 7, label: { en: 'Sara', ur: 'سارہ' },   color: 'var(--grad-coral)' },
          { val: 2, label: { en: 'Zaid', ur: 'زید' },    color: 'var(--grad-gold)' },
          { val: 5, label: { en: 'Hana', ur: 'حنا' },    color: 'var(--grad-lime)' },
        ],
        question: { en: 'Who read the MOST books?', ur: 'کس نے سب سے زیادہ کتابیں پڑھیں؟' },
        answerKey: 1,
      },
      {
        type: 'quiz', world: 'compute',
        question: { en: 'What is the internet?', ur: 'انٹرنیٹ کیا ہے؟' },
        options: [
          { en: 'A global network of connected computers 🌐', ur: 'جڑے ہوئے کمپیوٹروں کا عالمی جال 🌐', correct: true },
          { en: 'A very fast calculator ➕',                  ur: 'بہت تیز کیلکولیٹر ➕', correct: false },
          { en: 'A type of satellite 🛰️',                    ur: 'سیارچے کی ایک قسم 🛰️', correct: false },
        ],
      },
      { type: 'binary', world: 'compute', target: 13 },
    ],
  },

  // ── DAY 84 · PAID · Pillars review ───────────────────────────────────────────
  {
    title: { en: 'Pillars review', ur: 'ستونوں کا جائزہ' },
    games: [
      { type: 'fivePillars', world: 'light', pillars: PILLARS },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ',
        en: 'Islam is built on five pillars: Shahada, Salah, Zakat, Sawm, and Hajj.',
        ur: 'اسلام پانچ چیزوں پر قائم ہے: شہادت، نماز، زکوٰۃ، روزہ، اور حج۔',
        label: { en: 'Hadith on Five Pillars', ur: 'پانچ ستونوں کی حدیث' },
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الْقَوِيّ',   en: 'The All-Strong',   ur: 'سب سے طاقتور' },
          { ar: 'الْمَتِين',   en: 'The Firm',          ur: 'مضبوط' },
          { ar: 'الْوَلِيّ',   en: 'The Protecting Friend', ur: 'مددگار دوست' },
        ],
      },
    ],
  },

  // ── DAY 85 · PAID · Heart of Quran ───────────────────────────────────────────
  {
    title: { en: 'Heart of Quran', ur: 'قرآن کا دل' },
    games: [
      {
        type: 'quranStar', world: 'light',
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ الرَّحْمَٰنِ الرَّحِيمِ',
        en: 'In the name of Allah, the Most Gracious, the Most Merciful. Praise be to Allah, Lord of all worlds. The Most Gracious, the Most Merciful.',
        ur: 'اللہ کے نام سے۔ تمام تعریفیں اللہ کے لیے ہیں۔ وہ بہت مہربان نہایت رحم والا ہے۔',
        label: { en: 'Surah Al-Fatihah 1:1-3', ur: 'سورۃ الفاتحہ ۱:۱-۳' },
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'What is Surah Al-Fatihah also called?', ur: 'سورۃ الفاتحہ کو اور کیا کہتے ہیں؟' },
        options: [
          { en: 'Mother of the Quran (Umm Al-Quran) 📖', ur: 'ام القرآن 📖', correct: true },
          { en: 'The First Chapter only 📄',             ur: 'صرف پہلا باب 📄', correct: false },
          { en: 'The Opening Prayer only 🙏',            ur: 'صرف افتتاحی دعا 🙏', correct: false },
        ],
      },
      { type: 'binary', world: 'compute', target: 6 },
    ],
  },

  // ── DAY 86 · PAID · AI master ─────────────────────────────────────────────────
  {
    title: { en: 'AI master!', ur: 'AI ماہر!' },
    games: [
      {
        type: 'isThisACat', world: 'neuro',
        category: { en: 'something that NEEDS ELECTRICITY ⚡', ur: 'بجلی والی چیز ⚡' },
        items: [
          { icon: '💻', en: 'Laptop',     ur: 'لیپ ٹاپ',    isMatch: true },
          { icon: '🌳', en: 'Tree',       ur: 'درخت',         isMatch: false },
          { icon: '📱', en: 'Mobile phone', ur: 'موبائل',     isMatch: true },
          { icon: '🌺', en: 'Flower',     ur: 'پھول',         isMatch: false },
          { icon: '🤖', en: 'Robot',      ur: 'روبوٹ',        isMatch: true },
        ],
      },
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الشَّهِيد',  en: 'The Witness',      ur: 'گواہ' },
          { ar: 'الْحَقّ',   en: 'The Truth',         ur: 'سچ' },
          { ar: 'الْوَكِيل',  en: 'The Trustee',      ur: 'وکیل' },
        ],
      },
      {
        type: 'quiz', world: 'ai',
        question: { en: 'What makes a Muslim\'s use of AI special?', ur: 'مسلمان کا AI استعمال خاص کیوں ہے؟' },
        options: [
          { en: 'They use it with niyyah (intention) to serve Allah', ur: 'وہ اللہ کی رضا کے لیے نیت کے ساتھ استعمال کرتے ہیں', correct: true },
          { en: 'They use the latest models only', ur: 'صرف نئے ماڈل استعمال کرتے ہیں', correct: false },
          { en: 'They do not use AI at all', ur: 'وہ AI بالکل نہیں استعمال کرتے', correct: false },
        ],
      },
    ],
  },

  // ── DAY 87 · PAID · Wisdom and patterns ──────────────────────────────────────
  {
    title: { en: 'Wisdom and patterns', ur: 'حکمت اور نمونے' },
    games: [
      {
        type: 'hadithStory', world: 'light',
        arabic: 'اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ',
        en: 'Fear Allah wherever you are.',
        ur: 'جہاں بھی ہو اللہ سے ڈرو۔',
        label: { en: 'Hadith on Taqwa', ur: 'تقوی کی حدیث' },
      },
      { type: 'binary', world: 'compute', target: 9 },
      {
        type: 'patternFinder', world: 'data',
        pattern: ['🌙', '⭐', '🌙', '⭐', '🌙', '?'],
        options: [{ icon: '⭐', correct: true }, { icon: '☀️', correct: false }, { icon: '🌟', correct: false }],
      },
    ],
  },

  // ── DAY 88 · PAID · Tawhid — Oneness of Allah ────────────────────────────────
  {
    title: { en: 'Tawhid — Oneness of Allah', ur: 'توحید — اللہ کی وحدانیت' },
    games: [
      {
        type: 'quranStar', world: 'light',
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ',
        en: 'Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor was born. Nor is there to Him any equivalent.',
        ur: 'کہو: وہ اللہ ایک ہے۔ اللہ بے نیاز ہے۔ نہ اس کی اولاد ہے نہ وہ کسی کی اولاد۔ اور نہ کوئی اس کے برابر ہے۔',
        label: { en: 'Surah Al-Ikhlas 112:1-4', ur: 'سورۃ الاخلاص ۱۱۲:۱-۴' },
      },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
        en: 'There is no god but Allah alone, with no partner.',
        ur: 'اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں۔',
        label: { en: 'The Greatest Dhikr', ur: 'سب سے بڑا ذکر' },
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'What is Tawhid?', ur: 'توحید کیا ہے؟' },
        options: [
          { en: 'Believing in the Oneness of Allah 🌟', ur: 'اللہ کی وحدانیت پر ایمان 🌟', correct: true },
          { en: 'Praying five times a day 🙏',          ur: 'دن میں پانچ بار نماز 🙏', correct: false },
          { en: 'Fasting in Ramadan 🌙',                ur: 'رمضان میں روزہ 🌙', correct: false },
        ],
      },
    ],
  },

  // ── DAY 89 · PAID · Almost there! ────────────────────────────────────────────
  {
    title: { en: 'Almost there!', ur: 'بس پہنچنے والے ہیں!' },
    games: [
      {
        type: 'namesMatch', world: 'light',
        pairs: [
          { ar: 'الرَّحْمَٰن', en: 'The Most Gracious', ur: 'بہت مہربان' },
          { ar: 'الرَّحِيم',   en: 'The Most Merciful', ur: 'نہایت رحم والا' },
          { ar: 'الْعَلِيم',   en: 'The All-Knowing',   ur: 'سب جاننے والا' },
        ],
      },
      {
        type: 'makeChart', world: 'data',
        title: { en: 'Days completed in each world', ur: 'ہر دنیا میں مکمل دن' },
        bars: [
          { val: 14, label: { en: 'World 1 🌟', ur: 'دنیا 1 🌟' }, color: 'var(--grad-gold)' },
          { val: 14, label: { en: 'World 2 ⚡', ur: 'دنیا 2 ⚡' }, color: 'var(--grad-teal)' },
          { val: 14, label: { en: 'World 3 🧠', ur: 'دنیا 3 🧠' }, color: 'var(--grad-coral)' },
          { val: 14, label: { en: 'World 4 🔍', ur: 'دنیا 4 🔍' }, color: 'var(--grad-lime)' },
        ],
        question: { en: 'Which worlds are tied for most days?', ur: 'کن دنیاؤں میں سب سے زیادہ دن برابر ہیں؟' },
        answerKey: 0,
      },
      { type: 'binary', world: 'compute', target: 7 },
    ],
  },

  // ── DAY 90 · PAID · 90-Day champion! 🏆 ──────────────────────────────────────
  {
    title: { en: '90-Day Champion! 🏆', ur: '90 دن کا چیمپئن! 🏆' },
    games: [
      {
        type: 'quranStar', world: 'light',
        arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
        en: 'Our Lord, give us good in this world and good in the Hereafter, and save us from the punishment of the Fire.',
        ur: 'اے ہمارے رب! ہمیں دنیا میں بھی بھلائی دے اور آخرت میں بھی بھلائی دے، اور ہمیں آگ کے عذاب سے بچا۔',
        label: { en: 'Surah Al-Baqarah 2:201', ur: 'سورۃ البقرہ ۲:۲۰۱' },
      },
      {
        type: 'hadithStory', world: 'light',
        arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا',
        en: 'O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds.',
        ur: 'اے اللہ! میں تجھ سے نافع علم، پاکیزہ رزق اور قبول ہونے والے عمل کا سوال کرتا ہوں۔',
        label: { en: 'Morning Dua of the Prophet ﷺ', ur: 'نبی کریم ﷺ کی صبح کی دعا' },
      },
      {
        type: 'quiz', world: 'light',
        question: { en: 'You completed 90 days of Islamic + STEM learning! What does Allah love most?', ur: 'تم نے 90 دن مکمل کیے! اللہ کو سب سے زیادہ کیا پسند ہے؟' },
        options: [
          { en: 'Good deeds done consistently with sincerity ❤️', ur: 'ہمیشہ اخلاص کے ساتھ کیے جانے والے اعمال ❤️', correct: true },
          { en: 'Only big deeds done once 🏆',                    ur: 'صرف ایک بار کیے گئے بڑے کام 🏆', correct: false },
          { en: 'Deeds done very quickly ⚡',                     ur: 'بہت تیزی سے کیے گئے اعمال ⚡', correct: false },
        ],
      },
    ],
  },
];

export const FREE_DAYS = 3;

import prisma from '../config/prisma.js';

const PUZZLES = [
  // ── Islamic ──────────────────────────────────────────────────────────────
  {
    topic: 'Islam', order: 1,
    title: { en: '5 Pillars of Islam 🕌', ur: 'اسلام کے پانچ ستون' },
    pieces: [
      { icon: '🕋', en: 'Shahada', ur: 'شہادت' },
      { icon: '🙏', en: 'Salah',   ur: 'نماز'  },
      { icon: '💛', en: 'Zakat',   ur: 'زکوٰۃ' },
      { icon: '🌙', en: 'Sawm',    ur: 'روزہ'  },
      { icon: '🕌', en: 'Hajj',    ur: 'حج'    },
    ],
    learnFact: 'The 5 Pillars are the foundation of every Muslim\'s life — like pillars holding up a beautiful masjid! 🕌',
  },
  {
    topic: 'Islam', order: 2,
    title: { en: 'Names of Allah 💫', ur: 'اللہ کے نام' },
    pieces: [
      { icon: '❤️',  en: 'Ar-Rahman', ur: 'الرحمٰن' },
      { icon: '🌟',  en: 'Ar-Rahim',  ur: 'الرحیم'  },
      { icon: '👑',  en: 'Al-Malik',  ur: 'الملک'   },
      { icon: '☮️',  en: 'As-Salam',  ur: 'السلام'  },
    ],
    learnFact: 'Allah has 99 beautiful names! Al-Rahman means "The Most Merciful" — Allah loves us more than our own mothers! 💛',
  },
  {
    topic: 'Islam', order: 3,
    title: { en: 'Steps of Wudu 💧', ur: 'وضو کے مراحل' },
    pieces: [
      { icon: '🤲', en: 'Intention', ur: 'نیت'     },
      { icon: '💧', en: 'Hands',     ur: 'ہاتھ'    },
      { icon: '👄', en: 'Mouth',     ur: 'منہ'     },
      { icon: '👃', en: 'Nose',      ur: 'ناک'     },
      { icon: '😊', en: 'Face',      ur: 'چہرہ'    },
    ],
    learnFact: 'Wudu cleans your body AND earns you rewards from Allah! The Prophet ﷺ said sins fall off with every drop of water. 💧',
  },
  {
    topic: 'Islam', order: 4,
    title: { en: 'Prophets of Allah 🌟', ur: 'اللہ کے نبی' },
    pieces: [
      { icon: '🌊', en: 'Nuh (Noah)',       ur: 'نوح علیہ السلام'   },
      { icon: '🔥', en: 'Ibrahim (Abraham)', ur: 'ابراہیم علیہ السلام'},
      { icon: '💪', en: 'Musa (Moses)',      ur: 'موسیٰ علیہ السلام' },
      { icon: '⭐', en: 'Isa (Jesus)',       ur: 'عیسیٰ علیہ السلام' },
      { icon: '🕋', en: 'Muhammad ﷺ',       ur: 'محمد ﷺ'           },
    ],
    learnFact: 'Allah sent over 124,000 prophets to guide people! Prophet Muhammad ﷺ is the last and final messenger. 🌟',
  },
  {
    topic: 'Islam', order: 5,
    title: { en: 'Islamic Months 📅', ur: 'اسلامی مہینے' },
    pieces: [
      { icon: '🌙', en: 'Muharram',  ur: 'محرم'  },
      { icon: '✨', en: 'Ramadan',   ur: 'رمضان' },
      { icon: '🕌', en: 'Dhul Hijjah',ur:'ذوالحجہ'},
      { icon: '🌟', en: 'Rabi ul Awwal',ur:'ربیع الاول'},
    ],
    learnFact: 'Muslims follow the Hijri (lunar) calendar — it has 12 months and moves about 11 days earlier each year! 📅',
  },
  {
    topic: 'Islam', order: 6,
    title: { en: 'Parts of Salah 🙏', ur: 'نماز کے ارکان' },
    pieces: [
      { icon: '🧍', en: 'Qiyam',  ur: 'قیام'  },
      { icon: '🙇', en: 'Ruku',   ur: 'رکوع'  },
      { icon: '🧎', en: 'Sajdah', ur: 'سجدہ'  },
      { icon: '🪑', en: 'Qada',   ur: 'قعدہ'  },
    ],
    learnFact: 'When you do Sajdah, you are at your closest point to Allah! Make dua there — He is listening! 🤲',
  },
  {
    topic: 'Islam', order: 7,
    title: { en: 'Islamic Manners 😊', ur: 'اسلامی آداب' },
    pieces: [
      { icon: '🤝', en: 'Salaam',    ur: 'سلام'      },
      { icon: '🍽️', en: 'Bismillah', ur: 'بسم اللہ'  },
      { icon: '🙏', en: 'Alhamdulillah',ur:'الحمداللہ'},
      { icon: '😊', en: 'Smile',     ur: 'مسکراہٹ'  },
    ],
    learnFact: 'The Prophet ﷺ said: "Smiling at your brother is an act of charity!" Smiling is sunnah! 😊',
  },
  // ── Technology ────────────────────────────────────────────────────────────
  {
    topic: 'Technology', order: 8,
    title: { en: 'Parts of a Computer 💻', ur: 'کمپیوٹر کے حصے' },
    pieces: [
      { icon: '🧠', en: 'CPU (Brain)',  ur: 'سی پی یو' },
      { icon: '🖥️', en: 'Screen',      ur: 'اسکرین'   },
      { icon: '⌨️', en: 'Keyboard',    ur: 'کی بورڈ'  },
      { icon: '🖱️', en: 'Mouse',       ur: 'ماؤس'     },
      { icon: '🔊', en: 'Speakers',    ur: 'اسپیکر'   },
    ],
    learnFact: 'The CPU does billions of calculations every second — faster than any human brain can think! 🧠',
  },
  {
    topic: 'Technology', order: 9,
    title: { en: 'How AI Learns 🤖', ur: 'اے آئی کیسے سیکھتا ہے' },
    pieces: [
      { icon: '📊', en: 'Data',      ur: 'ڈیٹا'       },
      { icon: '🏋️', en: 'Training',  ur: 'تربیت'      },
      { icon: '🧮', en: 'Algorithm', ur: 'الگورتھم'    },
      { icon: '✅', en: 'Testing',   ur: 'جانچ'        },
    ],
    learnFact: 'AI learns exactly like you! It looks at thousands of examples and practises until it gets it right. 🤖',
  },
  {
    topic: 'Technology', order: 10,
    title: { en: 'How the Internet Works 🌐', ur: 'انٹرنیٹ کیسے کام کرتا ہے' },
    pieces: [
      { icon: '💻', en: 'Device',  ur: 'ڈیوائس'  },
      { icon: '📡', en: 'Router',  ur: 'راؤٹر'   },
      { icon: '🌐', en: 'Server',  ur: 'سرور'    },
      { icon: '📨', en: 'Data',    ur: 'ڈیٹا'    },
    ],
    learnFact: 'When you open a website, your request travels thousands of kilometres in less than 1 second! ⚡',
  },
  {
    topic: 'Technology', order: 11,
    title: { en: 'Steps to Code 👨‍💻', ur: 'کوڈنگ کے مراحل' },
    pieces: [
      { icon: '💡', en: 'Idea',   ur: 'خیال'   },
      { icon: '✏️', en: 'Plan',   ur: 'منصوبہ' },
      { icon: '💻', en: 'Code',   ur: 'کوڈ'    },
      { icon: '🐛', en: 'Debug',  ur: 'غلطی ٹھیک' },
      { icon: '🚀', en: 'Launch', ur: 'لانچ'   },
    ],
    learnFact: 'Every app on your phone was made by someone who started with one small idea — just like you! 🚀',
  },
  {
    topic: 'Technology', order: 12,
    title: { en: 'Types of Smart Devices 📱', ur: 'سمارٹ ڈیوائسز' },
    pieces: [
      { icon: '📱', en: 'Phone',   ur: 'فون'    },
      { icon: '💻', en: 'Laptop',  ur: 'لیپ ٹاپ'},
      { icon: '⌚', en: 'Smartwatch',ur:'سمارٹ واچ'},
      { icon: '📺', en: 'Smart TV', ur: 'سمارٹ ٹی وی'},
    ],
    learnFact: 'There are more smart devices on Earth than people! By 2030 there will be 50 billion connected devices. 🌍',
  },
  {
    topic: 'Technology', order: 13,
    title: { en: 'How Robots Work 🦾', ur: 'روبوٹ کیسے کام کرتا ہے' },
    pieces: [
      { icon: '👁️', en: 'Sensors',   ur: 'سینسر'  },
      { icon: '🧠', en: 'Brain (AI)',ur: 'دماغ'    },
      { icon: '🦾', en: 'Arms',      ur: 'بازو'   },
      { icon: '⚡', en: 'Power',     ur: 'طاقت'   },
    ],
    learnFact: 'Robots are now building cars, performing surgery, and even delivering food! The future is amazing. 🦾',
  },
  // ── Science ───────────────────────────────────────────────────────────────
  {
    topic: 'Science', order: 14,
    title: { en: 'Our Solar System ☀️', ur: 'ہمارا نظام شمسی' },
    pieces: [
      { icon: '☀️', en: 'Sun',    ur: 'سورج' },
      { icon: '🌍', en: 'Earth',  ur: 'زمین' },
      { icon: '🌕', en: 'Moon',   ur: 'چاند' },
      { icon: '🔴', en: 'Mars',   ur: 'مریخ' },
      { icon: '💫', en: 'Stars',  ur: 'ستارے'},
    ],
    learnFact: 'Allah created over 200 billion stars in our galaxy alone! SubhanAllah — and our Sun is just one of them! 🌌',
  },
  {
    topic: 'Science', order: 15,
    title: { en: 'Human Body Parts 🫀', ur: 'جسم کے حصے' },
    pieces: [
      { icon: '🧠', en: 'Brain',  ur: 'دماغ'  },
      { icon: '🫀', en: 'Heart',  ur: 'دل'    },
      { icon: '🫁', en: 'Lungs',  ur: 'پھیپھڑے'},
      { icon: '🦴', en: 'Bones',  ur: 'ہڈیاں' },
    ],
    learnFact: 'Your heart beats about 100,000 times every day without stopping! Allah created the most amazing machine — your body! 🫀',
  },
  {
    topic: 'Science', order: 16,
    title: { en: 'Types of Animals 🐾', ur: 'جانوروں کی اقسام' },
    pieces: [
      { icon: '🐟', en: 'Fish',   ur: 'مچھلی'  },
      { icon: '🐦', en: 'Bird',   ur: 'پرندہ'  },
      { icon: '🐸', en: 'Reptile',ur: 'رینگنے والا'},
      { icon: '🦁', en: 'Mammal', ur: 'ممالیہ' },
    ],
    learnFact: 'There are over 8.7 million types of animals on Earth! The Quran mentions many of them — like bees, ants, and elephants! 🐝',
  },
  // ── Life Skills ───────────────────────────────────────────────────────────
  {
    topic: 'Life Skills', order: 17,
    title: { en: 'Healthy Habits 🥦', ur: 'صحت مند عادات' },
    pieces: [
      { icon: '🥦', en: 'Eat Healthy', ur: 'صحت مند کھانا' },
      { icon: '💧', en: 'Drink Water', ur: 'پانی پینا'      },
      { icon: '😴', en: 'Sleep Well',  ur: 'اچھی نیند'      },
      { icon: '🏃', en: 'Exercise',    ur: 'ورزش'           },
    ],
    learnFact: 'The Prophet ﷺ said: "Your body has a right over you." Taking care of your body is an act of worship! 💪',
  },
  {
    topic: 'Life Skills', order: 18,
    title: { en: 'Being a Good Friend 🤝', ur: 'اچھا دوست بننا' },
    pieces: [
      { icon: '😊', en: 'Be Kind',   ur: 'مہربان ہونا' },
      { icon: '👂', en: 'Listen',    ur: 'سننا'         },
      { icon: '🤝', en: 'Share',     ur: 'بانٹنا'       },
      { icon: '💪', en: 'Help',      ur: 'مدد کرنا'    },
    ],
    learnFact: 'The Prophet ﷺ said the best of people are those who are most beneficial to others. Be that friend! 😊',
  },
  {
    topic: 'Life Skills', order: 19,
    title: { en: 'Helping at Home 🏠', ur: 'گھر میں مدد' },
    pieces: [
      { icon: '🧹', en: 'Clean Up',  ur: 'صفائی'       },
      { icon: '🍽️', en: 'Help Cook', ur: 'کھانا بنانا'  },
      { icon: '🌿', en: 'Water Plants',ur:'پودوں کو پانی'},
      { icon: '🛏️', en: 'Make Bed',  ur: 'بستر بنانا'  },
    ],
    learnFact: 'The Prophet ﷺ used to help with housework at home. Helping your family makes you more like the Prophet! 🏠',
  },
  {
    topic: 'General Knowledge', order: 20,
    title: { en: 'Colours of the Rainbow 🌈', ur: 'قوس قزح کے رنگ' },
    pieces: [
      { icon: '🔴', en: 'Red',    ur: 'لال'   },
      { icon: '🟠', en: 'Orange', ur: 'نارنجی' },
      { icon: '🟡', en: 'Yellow', ur: 'پیلا'  },
      { icon: '🟢', en: 'Green',  ur: 'سبز'   },
      { icon: '🔵', en: 'Blue',   ur: 'نیلا'  },
    ],
    learnFact: 'A rainbow appears when sunlight bends through raindrops — each drop acts like a tiny prism! Allah\'s creation is beautiful! 🌈',
  },
];

export async function seedPuzzlesIfEmpty() {
  const count = await prisma.puzzle.count();
  if (count > 0) {
    console.log(`  ✓ Puzzles already seeded (${count} puzzles)`);
    return;
  }
  await prisma.puzzle.createMany({ data: PUZZLES });
  console.log(`  ✓ Seeded ${PUZZLES.length} puzzles into database`);
}

// 10 challenges per day. Each challenge = 1 game + 1 question.
// Games rotate: goalrush, starblast, bubblepop, memflip, goalrush, starblast, bubblepop, memflip, goalrush, starblast
// ~5-6 minutes per challenge × 10 = ~60 minutes per day.

export const GAME_ROTATION = [
  'goalrush', 'starblast', 'bubblepop', 'memflip',
  'goalrush', 'starblast', 'bubblepop', 'memflip',
  'goalrush', 'starblast',
];

// ── Question banks per topic ──────────────────────────────────────────────────
// Each topic has 20+ questions. For each day we pick 10 based on dayNumber.

const ISLAM_QUESTIONS = [
  {
    q: { en: 'How many pillars does Islam have?', ur: 'اسلام کے کتنے ستون ہیں؟' },
    options: ['3 🟢', '5 🕌', '7 🌟', '10 🔟'],
    correct: 1,
    fact: { en: 'Islam has 5 pillars — Shahada, Salah, Zakat, Sawm and Hajj! 🕌', ur: 'اسلام کے 5 ستون ہیں' },
  },
  {
    q: { en: 'What is the FIRST pillar of Islam?', ur: 'اسلام کا پہلا ستون کیا ہے؟' },
    options: ['Salah 🙏', 'Zakat 💛', 'Shahada 🕋', 'Hajj 🌙'],
    correct: 2,
    fact: { en: 'Shahada is "There is no God but Allah, and Muhammad ﷺ is His messenger." 🕋', ur: 'شہادت — اللہ کے سوا کوئی معبود نہیں' },
  },
  {
    q: { en: 'How many times do Muslims pray each day?', ur: 'مسلمان روزانہ کتنی بار نماز پڑھتے ہیں؟' },
    options: ['2 times', '3 times', '5 times 🙏', '7 times'],
    correct: 2,
    fact: { en: 'Muslims pray 5 times a day: Fajr, Dhuhr, Asr, Maghrib, Isha! 🌅', ur: 'مسلمان دن میں 5 بار نماز پڑھتے ہیں' },
  },
  {
    q: { en: 'What is the holy book of Islam?', ur: 'اسلام کی مقدس کتاب کیا ہے؟' },
    options: ['Bible 📖', 'Torah 📜', 'Quran 📗', 'Injeel 📕'],
    correct: 2,
    fact: { en: 'The Holy Quran is the word of Allah, revealed to Prophet Muhammad ﷺ! 📗', ur: 'قرآن کریم اللہ کا کلام ہے' },
  },
  {
    q: { en: 'What do we say before we eat or start anything?', ur: 'کھانے سے پہلے کیا کہتے ہیں؟' },
    options: ['Alhamdulillah', 'Bismillah 🤲', 'MashaAllah', 'Inshallah'],
    correct: 1,
    fact: { en: 'We say "Bismillah" — In the name of Allah — before everything! 🤲', ur: 'بسم اللہ سے شروع کریں' },
  },
  {
    q: { en: "What is the name of our beloved Prophet?", ur: 'ہمارے پیارے نبی کا نام کیا ہے؟' },
    options: ['Musa ﷺ', 'Isa ﷺ', 'Ibrahim ﷺ', 'Muhammad ﷺ'],
    correct: 3,
    fact: { en: 'Prophet Muhammad ﷺ is the last and final messenger of Allah! ❤️', ur: 'محمد ﷺ آخری نبی ہیں' },
  },
  {
    q: { en: 'Which city has the Kaaba (House of Allah)?', ur: 'خانہ کعبہ کس شہر میں ہے؟' },
    options: ['Madinah 🌴', 'Makkah 🕋', 'Jerusalem 🌙', 'Istanbul 🌉'],
    correct: 1,
    fact: { en: 'The Kaaba is in Makkah, Saudi Arabia — Muslims face it when they pray! 🕋', ur: 'خانہ کعبہ مکہ مکرمہ میں ہے' },
  },
  {
    q: { en: 'In which month do Muslims fast?', ur: 'مسلمان کس مہینے میں روزے رکھتے ہیں؟' },
    options: ['Muharram 🌙', 'Shaban ⭐', 'Ramadan 🌙✨', 'Dhul Hijjah 🕌'],
    correct: 2,
    fact: { en: 'Ramadan is the blessed month of fasting, prayer, and the Quran! 🌙', ur: 'رمضان روزوں کا مہینہ ہے' },
  },
  {
    q: { en: 'What do we say when greeting another Muslim?', ur: 'مسلمان کو ملتے وقت کیا کہتے ہیں؟' },
    options: ['Hello 👋', 'Assalamu Alaikum 🌟', 'Good Morning ☀️', 'Hi there 😊'],
    correct: 1,
    fact: { en: '"Assalamu Alaikum" means "Peace be upon you!" — a beautiful Islamic greeting! 🌟', ur: 'السلام علیکم — آپ پر سلامتی ہو' },
  },
  {
    q: { en: 'How many beautiful names does Allah have?', ur: 'اللہ کے کتنے خوبصورت نام ہیں؟' },
    options: ['9 names', '19 names', '99 names 💫', '999 names'],
    correct: 2,
    fact: { en: 'Allah has 99 beautiful names! Al-Rahman means The Most Merciful 💛', ur: 'اللہ کے 99 خوبصورت نام ہیں' },
  },
  {
    q: { en: 'What does "Alhamdulillah" mean?', ur: 'الحمدللہ کا مطلب کیا ہے؟' },
    options: ['Allah is great', 'All praise is for Allah 🌟', 'In the name of Allah', 'Thank you'],
    correct: 1,
    fact: { en: '"Alhamdulillah" = All praise and thanks belong to Allah! Say it every day! 🌟', ur: 'الحمد للہ — تمام تعریف اللہ کے لیے' },
  },
  {
    q: { en: 'What is the 4th pillar of Islam?', ur: 'اسلام کا چوتھا ستون کیا ہے؟' },
    options: ['Salah 🙏', 'Zakat 💛', 'Hajj 🕌', 'Sawm (Fasting) 🌙'],
    correct: 3,
    fact: { en: 'Sawm means fasting in Ramadan — no eating or drinking from dawn to sunset! 🌙', ur: 'صوم — رمضان میں روزہ رکھنا' },
  },
  {
    q: { en: 'What is Zakat?', ur: 'زکوٰۃ کیا ہے؟' },
    options: ['A type of prayer', 'Giving money to help the poor 💛', 'Going to Makkah', 'Fasting in Ramadan'],
    correct: 1,
    fact: { en: 'Zakat means giving 2.5% of your savings to help people in need! 💛', ur: 'زکوٰۃ — غریبوں کی مدد کرنا' },
  },
  {
    q: { en: 'What is Hajj?', ur: 'حج کیا ہے؟' },
    options: ['Daily prayer', 'Fasting', 'Pilgrimage to Makkah 🕌', 'Giving charity'],
    correct: 2,
    fact: { en: 'Hajj is the pilgrimage to Makkah — Muslims from all over the world go together! 🕌', ur: 'حج — مکہ کی زیارت' },
  },
  {
    q: { en: 'What do Muslims use to clean themselves before prayer?', ur: 'نماز سے پہلے کیا کرتے ہیں؟' },
    options: ['Shower 🚿', 'Wudu (ablution) 💧', 'Soap only 🧼', 'Just water'],
    correct: 1,
    fact: { en: 'Wudu purifies us before prayer — we wash hands, face, arms and feet! 💧', ur: 'وضو — نماز سے پہلے پاکیزگی' },
  },
  {
    q: { en: 'Which Prophet built the Kaaba with his son?', ur: 'کس نبی نے اپنے بیٹے کے ساتھ خانہ کعبہ بنایا؟' },
    options: ['Nuh ﷺ 🌊', 'Ibrahim ﷺ 🔥', 'Musa ﷺ ⚡', 'Isa ﷺ ⭐'],
    correct: 1,
    fact: { en: 'Prophet Ibrahim ﷺ and his son Ismail ﷺ built the Kaaba together! 🕋', ur: 'ابراہیم ﷺ اور اسماعیل ﷺ نے خانہ کعبہ بنایا' },
  },
  {
    q: { en: 'What is the first prayer of the day called?', ur: 'دن کی پہلی نماز کا نام کیا ہے؟' },
    options: ['Dhuhr ☀️', 'Asr 🌤️', 'Fajr 🌅', 'Maghrib 🌇'],
    correct: 2,
    fact: { en: 'Fajr is the dawn prayer — prayed before sunrise! Starting the day with Allah 🌅', ur: 'فجر — طلوع آفتاب سے پہلے کی نماز' },
  },
  {
    q: { en: 'Where do Muslims go to pray together on Fridays?', ur: 'جمعہ کو مسلمان اکٹھے نماز کہاں پڑھتے ہیں؟' },
    options: ['School 🏫', 'Market 🛒', 'Masjid (Mosque) 🕌', 'Park 🌳'],
    correct: 2,
    fact: { en: 'The Masjid is the house of Allah — a beautiful place to pray together on Fridays! 🕌', ur: 'مسجد — جمعہ کی نماز کا مقام' },
  },
];

const TECH_QUESTIONS = [
  {
    q: { en: 'What is the "brain" of a computer called?', ur: 'کمپیوٹر کا دماغ کیا کہلاتا ہے؟' },
    options: ['RAM 💾', 'Screen 🖥️', 'CPU 🧠', 'Mouse 🖱️'],
    correct: 2,
    fact: { en: 'The CPU (Central Processing Unit) is the brain — it does billions of calculations per second! 🧠', ur: 'CPU کمپیوٹر کا دماغ ہے' },
  },
  {
    q: { en: 'What do you use to type letters on a computer?', ur: 'کمپیوٹر پر حروف ٹائپ کرنے کے لیے کیا استعمال ہوتا ہے؟' },
    options: ['Mouse 🖱️', 'Keyboard ⌨️', 'Screen 🖥️', 'Speaker 🔊'],
    correct: 1,
    fact: { en: 'A keyboard has all the letters and numbers you need to type! ⌨️', ur: 'کی بورڈ سے ٹائپ کرتے ہیں' },
  },
  {
    q: { en: 'What does "AI" stand for?', ur: 'AI کا مطلب کیا ہے؟' },
    options: ['Amazing Internet', 'Artificial Intelligence 🤖', 'Animal Instinct', 'Auto Input'],
    correct: 1,
    fact: { en: 'AI = Artificial Intelligence — computers that can learn and think like humans! 🤖', ur: 'AI — مصنوعی ذہانت' },
  },
  {
    q: { en: 'How do computers count and store information?', ur: 'کمپیوٹر کیسے گنتے ہیں؟' },
    options: ['With letters A-Z', 'With 0s and 1s 💡', 'With colours 🌈', 'With sounds 🎵'],
    correct: 1,
    fact: { en: 'Computers use only 0 and 1 (binary)! Every photo, video and word is made of 0s and 1s! 💡', ur: 'کمپیوٹر 0 اور 1 سے کام کرتے ہیں' },
  },
  {
    q: { en: 'What is the internet?', ur: 'انٹرنیٹ کیا ہے؟' },
    options: ['A big book 📚', 'A type of TV 📺', 'Billions of computers connected together 🌐', 'A game 🎮'],
    correct: 2,
    fact: { en: 'The internet connects billions of computers worldwide — like a giant web! 🌐', ur: 'انٹرنیٹ — کمپیوٹرز کا جال' },
  },
  {
    q: { en: 'What is an "app"?', ur: 'ایپ کیا ہوتی ہے؟' },
    options: ['A type of apple 🍎', 'A program on your phone or tablet 📱', 'A computer game only', 'A type of food'],
    correct: 1,
    fact: { en: 'An app is a program — like this learning app! Apps help us do all kinds of things 📱', ur: 'ایپ — فون پر چلنے والا پروگرام' },
  },
  {
    q: { en: 'What is coding?', ur: 'کوڈنگ کیا ہے؟' },
    options: ['A type of dance', 'Writing instructions for computers 💻', 'Reading books', 'Drawing pictures'],
    correct: 1,
    fact: { en: 'Coding is writing step-by-step instructions that tell a computer what to do! 💻', ur: 'کوڈنگ — کمپیوٹر کو ہدایات دینا' },
  },
  {
    q: { en: 'What is a robot?', ur: 'روبوٹ کیا ہے؟' },
    options: ['A toy car 🚗', 'A machine that follows instructions 🤖', 'A type of animal', 'A computer game'],
    correct: 1,
    fact: { en: 'A robot is a machine that follows coded instructions to do tasks — even in factories! 🤖', ur: 'روبوٹ — ہدایات پر چلنے والی مشین' },
  },
  {
    q: { en: 'What does "save" mean on a computer?', ur: 'کمپیوٹر پر "سیو" کا کیا مطلب ہے؟' },
    options: ['Delete your work ❌', 'Store your work so you don\'t lose it 💾', 'Print it 🖨️', 'Share it online'],
    correct: 1,
    fact: { en: 'Saving stores your work in the computer\'s memory so you can open it later! 💾', ur: 'سیو — کام محفوظ کرنا' },
  },
  {
    q: { en: 'What is Wi-Fi?', ur: 'وائی فائی کیا ہے؟' },
    options: ['A type of food', 'Wireless internet connection 📶', 'A computer game', 'A TV channel'],
    correct: 1,
    fact: { en: 'Wi-Fi lets devices connect to the internet without wires — like magic! 📶', ur: 'وائی فائی — بغیر تار کا انٹرنیٹ' },
  },
  {
    q: { en: 'What is "data"?', ur: 'ڈیٹا کیا ہے؟' },
    options: ['A date fruit 🌴', 'A type of food', 'Information stored on computers 📊', 'A game level'],
    correct: 2,
    fact: { en: 'Data is information — numbers, words, photos, videos — all stored as 0s and 1s! 📊', ur: 'ڈیٹا — کمپیوٹر میں محفوظ معلومات' },
  },
  {
    q: { en: 'What does a screen do?', ur: 'سکرین کیا کرتی ہے؟' },
    options: ['Plays music 🎵', 'Shows you pictures and information 🖥️', 'Stores files 💾', 'Connects to internet'],
    correct: 1,
    fact: { en: 'A screen (monitor) displays everything you need to see — text, photos, videos! 🖥️', ur: 'سکرین — تصاویر اور معلومات دکھاتی ہے' },
  },
  {
    q: { en: 'Who creates computer programs and apps?', ur: 'کمپیوٹر پروگرام اور ایپ کون بناتا ہے؟' },
    options: ['Teachers 👩‍🏫', 'Programmers / Coders 👨‍💻', 'Doctors 👨‍⚕️', 'Farmers 👨‍🌾'],
    correct: 1,
    fact: { en: 'Programmers write code to build apps! You can become one too — start learning now! 👨‍💻', ur: 'پروگرامر ایپ بناتے ہیں' },
  },
  {
    q: { en: 'What is a password used for?', ur: 'پاس ورڈ کس لیے استعمال ہوتا ہے؟' },
    options: ['To make computers faster', 'To keep your account safe and private 🔒', 'To connect to internet', 'To save files'],
    correct: 1,
    fact: { en: 'A password keeps your account safe — never share it with anyone except your parents! 🔒', ur: 'پاس ورڈ — آپ کی حفاظت کرتا ہے' },
  },
];

const SCIENCE_QUESTIONS = [
  {
    q: { en: 'What do plants need to grow?', ur: 'پودوں کو بڑھنے کے لیے کیا چاہیے؟' },
    options: ['Only water 💧', 'Sun, water and soil 🌱', 'Only sunlight ☀️', 'Just air 💨'],
    correct: 1,
    fact: { en: 'Plants need sunlight, water and soil to make their own food — amazing! 🌱', ur: 'پودوں کو سورج، پانی اور مٹی چاہیے' },
  },
  {
    q: { en: 'What gives us light during the day?', ur: 'دن میں روشنی کہاں سے آتی ہے؟' },
    options: ['Moon 🌙', 'Stars ⭐', 'The Sun ☀️', 'Clouds ☁️'],
    correct: 2,
    fact: { en: 'The Sun is a giant star 150 million km away that gives us light and heat! ☀️', ur: 'سورج ہمیں روشنی اور گرمی دیتا ہے' },
  },
  {
    q: { en: 'How many planets are in our solar system?', ur: 'ہمارے نظام شمسی میں کتنے سیارے ہیں؟' },
    options: ['6 planets', '8 planets 🪐', '10 planets', '12 planets'],
    correct: 1,
    fact: { en: '8 planets orbit our Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune! 🪐', ur: 'ہمارے نظام شمسی میں 8 سیارے ہیں' },
  },
  {
    q: { en: 'What gas do we breathe in to stay alive?', ur: 'ہم زندہ رہنے کے لیے کونسی گیس سانس لیتے ہیں؟' },
    options: ['Carbon dioxide 💨', 'Nitrogen', 'Oxygen 🌬️', 'Hydrogen'],
    correct: 2,
    fact: { en: 'We breathe oxygen — trees and plants make oxygen for us. Alhamdulillah! 🌬️', ur: 'آکسیجن — جو پودے ہمارے لیے بناتے ہیں' },
  },
  {
    q: { en: 'Why do we have day and night?', ur: 'دن اور رات کیوں ہوتے ہیں؟' },
    options: ['Sun moves around Earth 🌞', 'Earth spins around itself 🌍', 'Moon blocks the sun', 'Clouds cover the sun'],
    correct: 1,
    fact: { en: 'Earth spins once every 24 hours — the side facing the sun has day, the other side has night! 🌍', ur: 'زمین 24 گھنٹے میں ایک چکر لگاتی ہے' },
  },
  {
    q: { en: 'What is the largest planet in our solar system?', ur: 'ہمارے نظام شمسی کا سب سے بڑا سیارہ کونسا ہے؟' },
    options: ['Earth 🌍', 'Saturn 🪐', 'Jupiter 🪐', 'Mars 🔴'],
    correct: 2,
    fact: { en: 'Jupiter is so huge that 1,300 Earths could fit inside it! 🪐', ur: 'مشتری سب سے بڑا سیارہ ہے' },
  },
  {
    q: { en: 'What creates a rainbow?', ur: 'قوس قزح کیسے بنتی ہے؟' },
    options: ['Paint in the sky 🎨', 'Sunlight through water drops 🌈', 'Coloured clouds', 'Stars at sunset'],
    correct: 1,
    fact: { en: 'Sunlight splits into 7 colours when it passes through raindrops — red, orange, yellow, green, blue, indigo, violet! 🌈', ur: 'دھوپ اور بارش سے قوس قزح بنتی ہے' },
  },
  {
    q: { en: 'What is gravity?', ur: 'کشش ثقل کیا ہے؟' },
    options: ['A type of food', 'The invisible force that pulls things downward ⬇️', 'A cloud type', 'The speed of light'],
    correct: 1,
    fact: { en: 'Gravity is what keeps us on the ground and makes things fall! Without it we\'d float away! ⬇️', ur: 'کشش ثقل — وہ قوت جو چیزوں کو نیچے کھینچتی ہے' },
  },
  {
    q: { en: 'What is the heart\'s main job?', ur: 'دل کا کام کیا ہے؟' },
    options: ['Breathe air 🫁', 'Digest food 🍎', 'Pump blood around the body ❤️', 'Think and remember 🧠'],
    correct: 2,
    fact: { en: 'Your heart beats about 100,000 times every day pumping blood — Subhanallah! ❤️', ur: 'دل خون پمپ کرتا ہے' },
  },
  {
    q: { en: 'What do bees make that is sweet and healthy?', ur: 'مکھیاں کیا بناتی ہیں؟' },
    options: ['Milk 🥛', 'Honey 🍯', 'Sugar 🍬', 'Juice 🧃'],
    correct: 1,
    fact: { en: 'Bees make honey — Allah mentions honey in the Quran as a healing! 🍯', ur: 'شہد — قرآن میں بھی ذکر ہے' },
  },
  {
    q: { en: 'Which part of the body controls everything?', ur: 'جسم کا کونسا حصہ سب کو کنٹرول کرتا ہے؟' },
    options: ['Heart ❤️', 'Lungs 🫁', 'Brain 🧠', 'Stomach 🫃'],
    correct: 2,
    fact: { en: 'The brain controls everything — thinking, moving, breathing and feeling! 🧠', ur: 'دماغ سب کچھ کنٹرول کرتا ہے' },
  },
  {
    q: { en: 'What does the Sun give us besides light?', ur: 'سورج روشنی کے علاوہ کیا دیتا ہے؟' },
    options: ['Rain 🌧️', 'Wind 💨', 'Heat and energy 🔥', 'Snow ❄️'],
    correct: 2,
    fact: { en: 'The Sun gives light, heat, and energy — solar panels use sunlight to make electricity! ☀️', ur: 'سورج روشنی اور حرارت دیتا ہے' },
  },
];

const LIFE_QUESTIONS = [
  {
    q: { en: 'What do you say when someone gives you something?', ur: 'جب کوئی آپ کو کچھ دے تو کیا کہتے ہیں؟' },
    options: ['Give me more! 😤', 'Thank you / JazakAllah 💛', 'I don\'t want it 😒', 'OK'],
    correct: 1,
    fact: { en: 'Saying "Thank you" or "JazakAllah Khayran" shows gratitude — it makes everyone happy! 💛', ur: 'شکریہ — JazakAllah خیران' },
  },
  {
    q: { en: 'How many times should you brush your teeth each day?', ur: 'دن میں کتنی بار دانت صاف کرنے چاہئیں؟' },
    options: ['Once a week', 'Once a day', 'Twice a day 🪥', 'Never'],
    correct: 2,
    fact: { en: 'Brush twice daily — morning and night! The Prophet ﷺ loved cleanliness. 🪥', ur: 'دن میں دو بار دانت صاف کریں' },
  },
  {
    q: { en: 'What should you do BEFORE eating food?', ur: 'کھانے سے پہلے کیا کرنا چاہیے؟' },
    options: ['Run around 🏃', 'Wash your hands 🤲', 'Watch TV 📺', 'Nothing'],
    correct: 1,
    fact: { en: 'Always wash hands before eating — it removes germs and keeps you healthy! 🤲', ur: 'کھانے سے پہلے ہاتھ دھوئیں' },
  },
  {
    q: { en: 'What do you do when a friend is sad?', ur: 'جب دوست اداس ہو تو کیا کریں؟' },
    options: ['Laugh at them 😂', 'Ignore them 😐', 'Be kind and comfort them 🤗', 'Walk away'],
    correct: 2,
    fact: { en: 'Being kind to someone sad is a beautiful deed — the Prophet ﷺ always showed kindness! 🤗', ur: 'اداس دوست کی مدد کریں' },
  },
  {
    q: { en: 'Why is sleep important for children?', ur: 'بچوں کے لیے نیند کیوں ضروری ہے؟' },
    options: ['It isn\'t important', 'So we can dream 💭', 'Body rests, grows and repairs itself 😴', 'To pass time'],
    correct: 2,
    fact: { en: 'Sleep helps your brain learn, body grow and muscles repair — kids need 10-12 hours! 😴', ur: 'نیند جسم کو آرام اور نشوونما دیتی ہے' },
  },
  {
    q: { en: 'How do you cross the road safely?', ur: 'سڑک محفوظ طریقے سے کیسے پار کریں؟' },
    options: ['Run fast! 🏃', 'Look left, right, left then walk 👀', 'Cross anywhere', 'With eyes closed'],
    correct: 1,
    fact: { en: 'Always stop, look both ways, then cross safely — your life is precious! 👀', ur: 'دائیں بائیں دیکھ کر سڑک پار کریں' },
  },
  {
    q: { en: 'What is honesty?', ur: 'ایمانداری کیا ہے؟' },
    options: ['Telling lies to help friends', 'Always telling the truth 💯', 'Keeping secrets always', 'Doing whatever you want'],
    correct: 1,
    fact: { en: 'Honesty means always telling the truth — the Prophet ﷺ was called "Al-Amin" (the honest)! 💯', ur: 'ہمیشہ سچ بولنا ایمانداری ہے' },
  },
  {
    q: { en: 'Why should we save water?', ur: 'پانی کیوں بچانا چاہیے؟' },
    options: ['Water is free so no need', 'Water is precious and many people don\'t have enough 💧', 'It makes no difference', 'Tap is always on'],
    correct: 1,
    fact: { en: 'Clean water is a blessing from Allah — millions don\'t have enough. Never waste it! 💧', ur: 'پانی اللہ کی نعمت ہے — ضائع مت کریں' },
  },
  {
    q: { en: 'What is recycling?', ur: 'ری سائیکلنگ کیا ہے؟' },
    options: ['Throwing things away 🗑️', 'Turning old things into new things ♻️', 'Buying new things', 'Burning rubbish'],
    correct: 1,
    fact: { en: 'Recycling turns old plastic, paper and glass into new things — it saves our planet! ♻️', ur: 'پرانی چیزوں کو نئی چیزوں میں بدلنا' },
  },
  {
    q: { en: 'How do you make a new friend?', ur: 'نئے دوست کیسے بناتے ہیں؟' },
    options: ['Take their things 😤', 'Ignore them 😐', 'Smile, say Assalamu Alaikum and be kind 😊', 'Be mean to them'],
    correct: 2,
    fact: { en: 'A smile is charity! Smile, say hello and be kind — that\'s how beautiful friendships start! 😊', ur: 'مسکراہٹ صدقہ ہے — اس سے دوستی ہوتی ہے' },
  },
  {
    q: { en: 'What should you do if you make a mistake?', ur: 'غلطی ہو جائے تو کیا کریں؟' },
    options: ['Blame someone else 😤', 'Hide it 🙈', 'Admit it, say sorry and try to fix it 💛', 'Run away'],
    correct: 2,
    fact: { en: 'Everyone makes mistakes! Admitting them and saying sorry shows bravery and good character! 💛', ur: 'غلطی مانیں، معافی مانگیں اور ٹھیک کریں' },
  },
];

const MASTER_QUESTIONS = [
  ...ISLAM_QUESTIONS.slice(0, 5),
  ...TECH_QUESTIONS.slice(0, 3),
  ...SCIENCE_QUESTIONS.slice(0, 2),
];

// ── Get 10 challenges for a given day ────────────────────────────────────────
export function getChallenges(dayNumber) {
  let pool;
  if (dayNumber <= 18)  pool = ISLAM_QUESTIONS;
  else if (dayNumber <= 36) pool = TECH_QUESTIONS;
  else if (dayNumber <= 54) pool = SCIENCE_QUESTIONS;
  else if (dayNumber <= 72) pool = LIFE_QUESTIONS;
  else pool = MASTER_QUESTIONS;

  // Deterministic shuffle based on dayNumber so same day always gets same 10 questions
  const seed   = dayNumber * 137;
  const sorted = [...pool].sort((a, b) => {
    const ha = ((pool.indexOf(a) + 1) * seed) % 997;
    const hb = ((pool.indexOf(b) + 1) * seed) % 997;
    return ha - hb;
  });

  // Pick 10 (or all if less than 10)
  return sorted.slice(0, 10);
}

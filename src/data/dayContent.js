// 18 Islam World days × 4 topics each
// gameType rotates: GoalRush → StarBlast → BubblePop → MemoryFlip (topics 0-3)

export const DAY_CONTENT = [
  // ─────────────────────────────── DAY 1 ────────────────────────────────────
  {
    dayNumber: 1,
    title: { en: '5 Pillars of Islam', ur: 'اسلام کے پانچ ستون' },
    warmupFact: { en: 'Islam is built on 5 pillars — like a house needs 5 strong walls to stand!', ur: 'اسلام پانچ ستونوں پر قائم ہے — جیسے گھر کو پانچ مضبوط دیواروں کی ضرورت ہوتی ہے!' },
    topics: [
      {
        icon: '☝️', gameType: 'GoalRush',
        title: { en: 'Shahada — Declaration', ur: 'شہادت — اعلان' },
        intro: { en: 'Shahada means saying: "There is no god but Allah, and Muhammad ﷺ is His messenger." It is the FIRST and most important pillar!', ur: 'شہادت کا مطلب ہے: "اللہ کے سوا کوئی معبود نہیں، اور محمد ﷺ اس کے رسول ہیں۔" یہ سب سے پہلا اور اہم ستون ہے!' },
        questions: [
          { q: { en: 'What does Shahada mean?', ur: 'شہادت کا کیا مطلب ہے؟' }, options: ['Saying prayers 5 times', 'Declaring faith in Allah & Muhammad ﷺ', 'Fasting in Ramadan', 'Giving charity'], correct: 1, fact: { en: 'Shahada is the FIRST pillar of Islam. By saying it sincerely, a person becomes Muslim!', ur: 'شہادت اسلام کا پہلا ستون ہے۔ اسے سچے دل سے کہنے سے انسان مسلمان بن جاتا ہے!' } },
          { q: { en: 'How many pillars does Islam have?', ur: 'اسلام کے کتنے ستون ہیں؟' }, options: ['3', '4', '5', '6'], correct: 2, fact: { en: 'Islam has 5 pillars: Shahada, Salah, Zakat, Sawm, and Hajj. They keep our faith strong!', ur: 'اسلام کے پانچ ستون ہیں: شہادت، صلاۃ، زکاۃ، صوم، اور حج۔ یہ ہمارے ایمان کو مضبوط رکھتے ہیں!' } },
        ],
      },
      {
        icon: '🙏', gameType: 'StarBlast',
        title: { en: 'Salah — Daily Prayer', ur: 'صلاۃ — روزانہ نماز' },
        intro: { en: 'Salah means praying 5 times every day — Fajr (morning), Zuhr (afternoon), Asr (evening), Maghrib (sunset), Isha (night). We talk to Allah!', ur: 'صلاۃ کا مطلب ہے ہر روز پانچ بار نماز پڑھنا — فجر، ظہر، عصر، مغرب، عشاء۔ ہم اللہ سے بات کرتے ہیں!' },
        questions: [
          { q: { en: 'How many times do Muslims pray each day?', ur: 'مسلمان ہر روز کتنی بار نماز پڑھتے ہیں؟' }, options: ['3 times', '4 times', '5 times', '6 times'], correct: 2, fact: { en: 'Muslims pray 5 times a day. Prayer is like a direct phone call to Allah!', ur: 'مسلمان ہر روز 5 بار نماز پڑھتے ہیں۔ نماز اللہ سے براہ راست بات کرنے جیسی ہے!' } },
          { q: { en: 'What is the morning prayer called?', ur: 'صبح کی نماز کا نام کیا ہے؟' }, options: ['Zuhr', 'Fajr', 'Maghrib', 'Isha'], correct: 1, fact: { en: 'Fajr is the morning prayer prayed before sunrise. It starts the day with Allah\'s remembrance!', ur: 'فجر طلوع آفتاب سے پہلے پڑھی جانے والی صبح کی نماز ہے۔ یہ اللہ کی یاد کے ساتھ دن کا آغاز کرتی ہے!' } },
        ],
      },
      {
        icon: '💛', gameType: 'BubblePop',
        title: { en: 'Zakat — Giving Charity', ur: 'زکاۃ — صدقہ دینا' },
        intro: { en: 'Zakat means giving a little of your money to people who need help. When we share, Allah loves us more! Rich people give 2.5% of their savings.', ur: 'زکاۃ کا مطلب ہے اپنے پیسوں میں سے تھوڑا سا ضرورتمند لوگوں کو دینا۔ جب ہم بانٹتے ہیں، اللہ ہم سے زیادہ محبت کرتا ہے!' },
        questions: [
          { q: { en: 'What is Zakat?', ur: 'زکاۃ کیا ہے؟' }, options: ['Eating food', 'Giving money to the poor', 'Going to Mecca', 'Reading Quran'], correct: 1, fact: { en: 'Zakat means giving 2.5% of saved money to help poor people. It cleans our wealth!', ur: 'زکاۃ کا مطلب ہے بچت کا 2.5% غریب لوگوں کی مدد کے لیے دینا۔ یہ ہمارے مال کو پاک کرتی ہے!' } },
          { q: { en: 'Which pillar is Zakat?', ur: 'زکاۃ کونسا ستون ہے؟' }, options: ['1st', '2nd', '3rd', '4th'], correct: 2, fact: { en: 'Zakat is the 3rd pillar of Islam. It helps create a caring community where everyone is looked after!', ur: 'زکاۃ اسلام کا تیسرا ستون ہے۔ یہ ایک ایسا معاشرہ بناتی ہے جہاں سب کا خیال رکھا جاتا ہے!' } },
        ],
      },
      {
        icon: '🌙', gameType: 'MemoryFlip',
        title: { en: 'Sawm & Hajj', ur: 'صوم اور حج' },
        intro: { en: 'Sawm means fasting in Ramadan — no eating or drinking from sunrise to sunset to feel closer to Allah. Hajj means visiting Mecca at least once in your life!', ur: 'صوم کا مطلب ہے رمضان میں روزہ رکھنا — طلوع سے غروب تک کچھ نہ کھانا پینا تاکہ اللہ کے قریب ہوں۔ حج کا مطلب ہے زندگی میں ایک بار مکہ جانا!' },
        questions: [
          { q: { en: 'In which month do Muslims fast?', ur: 'مسلمان کس مہینے میں روزہ رکھتے ہیں؟' }, options: ['Shaban', 'Muharram', 'Ramadan', 'Rajab'], correct: 2, fact: { en: 'Muslims fast the entire month of Ramadan. This is when the Quran was first sent down!', ur: 'مسلمان پورے رمضان میں روزہ رکھتے ہیں۔ یہ وہ مہینہ ہے جب قرآن پہلی بار نازل ہوا!' } },
          { q: { en: 'Where do Muslims go for Hajj?', ur: 'مسلمان حج کے لیے کہاں جاتے ہیں؟' }, options: ['Madinah', 'Jerusalem', 'Mecca', 'Cairo'], correct: 2, fact: { en: 'Hajj is the pilgrimage to Mecca in Saudi Arabia. Muslims from all over the world go there!', ur: 'حج سعودی عرب میں مکہ کا سفر ہے۔ دنیا بھر کے مسلمان وہاں جاتے ہیں!' } },
        ],
      },
    ],
    finalQuiz: [
      { q: { en: 'Which pillar is reciting the declaration of faith?', ur: 'ایمان کا اعلان کونسا ستون ہے؟' }, options: ['Zakat', 'Shahada', 'Sawm', 'Hajj'], correct: 1, fact: { en: 'Shahada is the 1st pillar and the key to entering Islam!', ur: 'شہادت پہلا ستون ہے اور اسلام میں داخل ہونے کی چابی ہے!' } },
      { q: { en: 'Which prayer comes at sunset?', ur: 'غروب آفتاب کے وقت کونسی نماز ہوتی ہے؟' }, options: ['Fajr', 'Asr', 'Maghrib', 'Isha'], correct: 2, fact: { en: 'Maghrib is prayed just after sunset. It is one of the shorter prayers!', ur: 'مغرب غروب آفتاب کے فوراً بعد پڑھی جاتی ہے۔ یہ چھوٹی نمازوں میں سے ایک ہے!' } },
      { q: { en: 'Zakat helps which people?', ur: 'زکاۃ کن لوگوں کی مدد کرتی ہے؟' }, options: ['Rich people', 'Poor people', 'Kings', 'Soldiers'], correct: 1, fact: { en: 'Zakat goes to poor, needy, and people in debt. It spreads wealth fairly!', ur: 'زکاۃ غریبوں، ضرورتمندوں اور مقروضوں کو ملتی ہے۔ یہ دولت کو منصفانہ طریقے سے تقسیم کرتی ہے!' } },
      { q: { en: 'Hajj is the 5th pillar. Which is the 4th?', ur: 'حج پانچواں ستون ہے۔ چوتھا کونسا ہے؟' }, options: ['Salah', 'Zakat', 'Sawm', 'Shahada'], correct: 2, fact: { en: 'Sawm (fasting) is the 4th pillar of Islam. The five pillars together make a complete Muslim life!', ur: 'صوم (روزہ) اسلام کا چوتھا ستون ہے۔ پانچوں ستون مل کر مکمل مسلمان زندگی بناتے ہیں!' } },
    ],
  },

  // ─────────────────────────────── DAY 2 ────────────────────────────────────
  {
    dayNumber: 2,
    title: { en: 'Allah — Our Creator', ur: 'اللہ — ہمارا خالق' },
    warmupFact: { en: 'Allah has 99 beautiful names, each telling us something amazing about Him!', ur: 'اللہ کے 99 خوبصورت نام ہیں، ہر نام ہمیں اس کے بارے میں کچھ놀라운 بتاتا ہے!' },
    topics: [
      {
        icon: '☝️', gameType: 'GoalRush',
        title: { en: 'Allah is One (Tawheed)', ur: 'اللہ ایک ہے (توحید)' },
        intro: { en: 'Tawheed means believing that Allah is ONE. He has no partners, no parents, no children. He always was and always will be. Nothing is like Him!', ur: 'توحید کا مطلب ہے یہ ماننا کہ اللہ ایک ہے۔ اس کا کوئی شریک، والدین یا اولاد نہیں۔ وہ ہمیشہ سے ہے اور ہمیشہ رہے گا!' },
        questions: [
          { q: { en: 'How many gods do Muslims believe in?', ur: 'مسلمان کتنے خداؤں پر ایمان رکھتے ہیں؟' }, options: ['2', '3', '1', '100'], correct: 2, fact: { en: 'Muslims believe in ONE God — Allah. This belief is called Tawheed!', ur: 'مسلمان ایک خدا — اللہ پر ایمان رکھتے ہیں۔ اس عقیدے کو توحید کہتے ہیں!' } },
          { q: { en: 'What is Tawheed?', ur: 'توحید کیا ہے؟' }, options: ['Belief that Allah is one', 'Praying 5 times', 'Going to Mecca', 'Fasting'], correct: 0, fact: { en: 'Tawheed is the most important belief in Islam — that Allah alone deserves worship!', ur: 'توحید اسلام کا سب سے اہم عقیدہ ہے — کہ صرف اللہ ہی عبادت کا مستحق ہے!' } },
        ],
      },
      {
        icon: '💚', gameType: 'StarBlast',
        title: { en: 'Al-Rahman — Most Merciful', ur: 'الرحمان — بہت مہربان' },
        intro: { en: 'Al-Rahman means "The Most Merciful." Allah loves us more than a mother loves her baby! Every time we say "Bismillah ir-Rahman ir-Raheem" we remember His mercy.', ur: 'الرحمان کا مطلب ہے "بہت مہربان"۔ اللہ ہم سے ماں سے بھی زیادہ محبت کرتا ہے! ہر بار جب ہم بسم اللہ پڑھتے ہیں ہم اس کی رحمت یاد کرتے ہیں۔' },
        questions: [
          { q: { en: 'What does "Al-Rahman" mean?', ur: '"الرحمان" کا کیا مطلب ہے؟' }, options: ['The Creator', 'The Most Merciful', 'The All-Knowing', 'The Powerful'], correct: 1, fact: { en: 'Al-Rahman is one of Allah\'s most beautiful names meaning The Most Merciful. He forgives us when we make mistakes!', ur: 'الرحمان اللہ کے خوبصورت ناموں میں سے ایک ہے جس کا مطلب ہے بہت مہربان۔ وہ ہماری غلطیاں معاف کرتا ہے!' } },
          { q: { en: 'We say "Bismillah" before starting what?', ur: 'ہم شروع کرنے سے پہلے "بسم اللہ" کیوں کہتے ہیں؟' }, options: ['Any good action', 'Only eating', 'Only praying', 'Only sleeping'], correct: 0, fact: { en: 'We say Bismillah before every good action — eating, studying, sleeping — to get Allah\'s blessing!', ur: 'ہم ہر اچھے کام سے پہلے بسم اللہ کہتے ہیں — کھانا، پڑھنا، سونا — اللہ کی برکت کے لیے!' } },
        ],
      },
      {
        icon: '👁️', gameType: 'BubblePop',
        title: { en: 'Al-Aleem — All-Knowing', ur: 'العلیم — سب جاننے والا' },
        intro: { en: 'Al-Aleem means Allah knows EVERYTHING — what you eat, what you think, and even things nobody else knows! He knows every leaf that falls from every tree.', ur: 'العلیم کا مطلب ہے اللہ سب کچھ جانتا ہے — تم کیا کھاتے ہو، کیا سوچتے ہو، اور وہ باتیں جو کوئی نہیں جانتا! وہ ہر درخت کا ہر پتہ جانتا ہے۔' },
        questions: [
          { q: { en: 'What does "Al-Aleem" mean?', ur: '"العلیم" کا کیا مطلب ہے؟' }, options: ['The Kind', 'The All-Knowing', 'The Creator', 'The Forgiving'], correct: 1, fact: { en: 'Allah is Al-Aleem — He knows everything, including our secret thoughts and feelings!', ur: 'اللہ العلیم ہے — وہ ہر چیز جانتا ہے، حتیٰ کہ ہمارے خفیہ خیالات اور احساسات بھی!' } },
          { q: { en: 'Can we hide anything from Allah?', ur: 'کیا ہم اللہ سے کچھ چھپا سکتے ہیں؟' }, options: ['Yes, if we whisper', 'Yes, in the dark', 'No, He knows everything', 'Yes, at night'], correct: 2, fact: { en: 'No! Allah sees and knows everything, everywhere, at all times. So we should always be honest!', ur: 'نہیں! اللہ ہر جگہ، ہر وقت سب کچھ دیکھتا اور جانتا ہے۔ اس لیے ہمیں ہمیشہ سچا ہونا چاہیے!' } },
        ],
      },
      {
        icon: '✨', gameType: 'MemoryFlip',
        title: { en: 'Allah\'s Beautiful Names (99)', ur: 'اللہ کے خوبصورت نام (99)' },
        intro: { en: 'Allah has 99 names — like Al-Kareem (Most Generous), Al-Hafiz (The Protector), Al-Wadood (The Loving). Each name tells us how amazing Allah is!', ur: 'اللہ کے 99 نام ہیں — جیسے الکریم (سب سے سخی)، الحفیظ (محافظ)، الودود (محبت کرنے والا)۔ ہر نام ہمیں بتاتا ہے کہ اللہ کتنا عظیم ہے!' },
        questions: [
          { q: { en: 'How many beautiful names does Allah have?', ur: 'اللہ کے کتنے خوبصورت نام ہیں؟' }, options: ['9', '19', '99', '999'], correct: 2, fact: { en: 'Allah has 99 beautiful names! Learning them helps us understand Allah better and love Him more!', ur: 'اللہ کے 99 خوبصورت نام ہیں! انہیں سیکھنے سے ہم اللہ کو بہتر سمجھتے اور اس سے زیادہ محبت کرتے ہیں!' } },
          { q: { en: 'What does "Al-Wadood" mean?', ur: '"الودود" کا کیا مطلب ہے؟' }, options: ['The Powerful', 'The Loving', 'The Creator', 'The Judge'], correct: 1, fact: { en: 'Al-Wadood means The Loving. Allah loves all of us and wants the best for us!', ur: 'الودود کا مطلب ہے محبت کرنے والا۔ اللہ ہم سب سے پیار کرتا ہے اور ہمارے لیے بہترین چاہتا ہے!' } },
        ],
      },
    ],
    finalQuiz: [
      { q: { en: 'How many gods do Muslims worship?', ur: 'مسلمان کتنے خداؤں کی عبادت کرتے ہیں؟' }, options: ['3', '2', '1', '5'], correct: 2, fact: { en: 'Muslims worship only ONE Allah. This is the most important belief in Islam!', ur: 'مسلمان صرف ایک اللہ کی عبادت کرتے ہیں۔ یہ اسلام کا سب سے اہم عقیدہ ہے!' } },
      { q: { en: '"Al-Rahman" is which of Allah\'s qualities?', ur: '"الرحمان" اللہ کی کونسی صفت ہے؟' }, options: ['Anger', 'Mercy', 'Strength', 'Speed'], correct: 1, fact: { en: 'Al-Rahman means Most Merciful. Allah\'s mercy is greater than any punishment!', ur: 'الرحمان کا مطلب ہے بہت مہربان۔ اللہ کی رحمت کسی بھی سزا سے بڑی ہے!' } },
      { q: { en: 'What does Al-Aleem mean?', ur: 'العلیم کا کیا مطلب ہے؟' }, options: ['All-Seeing', 'All-Knowing', 'All-Powerful', 'All-Hearing'], correct: 1, fact: { en: 'Al-Aleem means All-Knowing. Allah knows every thought in our heart!', ur: 'العلیم کا مطلب ہے سب جاننے والا۔ اللہ ہمارے دل کی ہر بات جانتا ہے!' } },
      { q: { en: 'How many names does Allah have?', ur: 'اللہ کے کتنے نام ہیں؟' }, options: ['9', '50', '99', '100'], correct: 2, fact: { en: 'Allah has 99 beautiful names. The Prophet ﷺ said whoever memorises them will enter Paradise!', ur: 'اللہ کے 99 خوبصورت نام ہیں۔ نبی ﷺ نے فرمایا جو انہیں یاد کرے گا جنت میں جائے گا!' } },
    ],
  },

  // ─────────────────────────────── DAY 3 ────────────────────────────────────
  {
    dayNumber: 3,
    title: { en: 'Prophet Muhammad ﷺ', ur: 'نبی محمد ﷺ' },
    warmupFact: { en: 'Prophet Muhammad ﷺ was the kindest person who ever lived. Even animals loved him!', ur: 'نبی محمد ﷺ سب سے مہربان انسان تھے جو کبھی زندہ رہے۔ جانور بھی ان سے محبت کرتے تھے!' },
    topics: [
      {
        icon: '🌅', gameType: 'GoalRush',
        title: { en: 'His Birth in Mecca', ur: 'مکہ میں پیدائش' },
        intro: { en: 'Prophet Muhammad ﷺ was born in Mecca in the Year of the Elephant (570 CE). His father Abdullah passed away before he was born. He was raised by his grandfather and uncle.', ur: 'نبی محمد ﷺ ہاتھی کے سال (570 عیسوی) میں مکہ میں پیدا ہوئے۔ ان کے والد عبداللہ پیدائش سے پہلے وفات پا گئے تھے۔ ان کی پرورش دادا اور چچا نے کی۔' },
        questions: [
          { q: { en: 'Where was Prophet Muhammad ﷺ born?', ur: 'نبی محمد ﷺ کہاں پیدا ہوئے؟' }, options: ['Madinah', 'Jerusalem', 'Mecca', 'Egypt'], correct: 2, fact: { en: 'Prophet Muhammad ﷺ was born in Mecca in Saudi Arabia — the holiest city in Islam!', ur: 'نبی محمد ﷺ سعودی عرب میں مکہ میں پیدا ہوئے — اسلام کا مقدس ترین شہر!' } },
          { q: { en: 'What was the Prophet\'s father\'s name?', ur: 'نبی ﷺ کے والد کا نام کیا تھا؟' }, options: ['Umar', 'Abu Talib', 'Abdullah', 'Ibrahim'], correct: 2, fact: { en: 'The Prophet\'s ﷺ father was Abdullah and mother was Aminah. His grandfather Abdul Muttalib raised him!', ur: 'نبی ﷺ کے والد عبداللہ اور والدہ آمنہ تھیں۔ ان کے دادا عبدالمطلب نے ان کی پرورش کی!' } },
        ],
      },
      {
        icon: '💝', gameType: 'StarBlast',
        title: { en: 'His Kind Character', ur: 'ان کا مہربان کردار' },
        intro: { en: 'The Prophet ﷺ was called "Al-Ameen" (The Trustworthy) before he became a prophet! He was always honest, kind to children, gentle with animals, and patient with everyone.', ur: 'نبی ﷺ کو نبوت سے پہلے "الامین" (قابل اعتماد) کہا جاتا تھا! وہ ہمیشہ سچے، بچوں سے مہربان، جانوروں سے نرم اور سب کے ساتھ صابر تھے۔' },
        questions: [
          { q: { en: 'What nickname did people give the Prophet ﷺ?', ur: 'لوگ نبی ﷺ کو کیا لقب دیتے تھے؟' }, options: ['Al-Kareem', 'Al-Ameen', 'Al-Hakim', 'Al-Kabeer'], correct: 1, fact: { en: 'People called Muhammad ﷺ "Al-Ameen" (The Trustworthy) because he never lied and always kept his promises!', ur: 'لوگ محمد ﷺ کو "الامین" کہتے تھے کیونکہ وہ کبھی جھوٹ نہیں بولتے تھے اور ہمیشہ وعدہ پورا کرتے تھے!' } },
          { q: { en: 'The Prophet ﷺ was especially kind to?', ur: 'نبی ﷺ خاص طور پر کس کے ساتھ مہربان تھے؟' }, options: ['Only rich people', 'Children and animals', 'Only adults', 'Only family'], correct: 1, fact: { en: 'The Prophet ﷺ loved children and was gentle with all animals. He said "Mercy to all living things"!', ur: 'نبی ﷺ بچوں سے محبت کرتے تھے اور تمام جانوروں کے ساتھ نرم تھے۔ آپ ﷺ نے فرمایا "تمام جانداروں پر رحم کرو"!' } },
        ],
      },
      {
        icon: '📖', gameType: 'BubblePop',
        title: { en: 'First Revelation of Quran', ur: 'قرآن کی پہلی وحی' },
        intro: { en: 'When the Prophet ﷺ was 40 years old, Angel Jibreel came to him in the Cave of Hira and said "Iqra!" (Read!). This was the first verse of the Quran!', ur: 'جب نبی ﷺ کی عمر 40 سال تھی، حضرت جبریل غار حرا میں آئے اور کہا "اقرا!" (پڑھو!)۔ یہ قرآن کی پہلی آیت تھی!' },
        questions: [
          { q: { en: 'In which cave did the Prophet ﷺ receive the first revelation?', ur: 'نبی ﷺ کو کس غار میں پہلی وحی ملی؟' }, options: ['Cave of Thawr', 'Cave of Hira', 'Cave of Ali', 'Cave of Nur'], correct: 1, fact: { en: 'Cave Hira is on a mountain near Mecca. The Prophet ﷺ used to go there to think and worship!', ur: 'غار حرا مکہ کے قریب ایک پہاڑ پر ہے۔ نبی ﷺ وہاں سوچنے اور عبادت کرنے جاتے تھے!' } },
          { q: { en: 'What was the first word revealed of the Quran?', ur: 'قرآن کا پہلا نازل ہونے والا لفظ کیا تھا؟' }, options: ['Bismillah', 'Alhamdulillah', 'Iqra', 'Subhanallah'], correct: 2, fact: { en: '"Iqra" means "Read!" — showing that learning and knowledge are very important in Islam!', ur: '"اقرا" کا مطلب ہے "پڑھو!" — یہ بتاتا ہے کہ اسلام میں سیکھنا اور علم بہت اہم ہیں!' } },
        ],
      },
      {
        icon: '🤲', gameType: 'MemoryFlip',
        title: { en: 'His Love for Children', ur: 'بچوں سے محبت' },
        intro: { en: 'The Prophet ﷺ loved children SO much! He would play with them, carry them on his back, and let children sit with him during prayer. He said "Children are gifts from Allah!"', ur: 'نبی ﷺ بچوں سے بہت زیادہ محبت کرتے تھے! وہ ان کے ساتھ کھیلتے، انہیں کندھوں پر اٹھاتے، اور نماز کے دوران بچوں کو اپنے ساتھ بٹھاتے تھے۔' },
        questions: [
          { q: { en: 'How did the Prophet ﷺ feel about children?', ur: 'نبی ﷺ کا بچوں کے بارے میں کیا خیال تھا؟' }, options: ['He ignored them', 'He loved them dearly', 'He was strict with them', 'He avoided them'], correct: 1, fact: { en: 'The Prophet ﷺ loved children so much he would even pray with his grandchildren on his back!', ur: 'نبی ﷺ بچوں سے اتنی محبت کرتے تھے کہ پوتوں کو کندھوں پر اٹھا کر نماز پڑھتے تھے!' } },
          { q: { en: 'What did the Prophet ﷺ say about children?', ur: 'نبی ﷺ نے بچوں کے بارے میں کیا فرمایا؟' }, options: ['Children are trouble', 'Children are gifts from Allah', 'Children must be silent', 'Children should only work'], correct: 1, fact: { en: 'The Prophet ﷺ said children are gifts and blessings from Allah. Be kind and playful with them!', ur: 'نبی ﷺ نے فرمایا بچے اللہ کی طرف سے تحفے اور نعمتیں ہیں۔ ان کے ساتھ مہربان اور کھیلنے والے بنو!' } },
        ],
      },
    ],
    finalQuiz: [
      { q: { en: 'In which city was Prophet Muhammad ﷺ born?', ur: 'نبی محمد ﷺ کس شہر میں پیدا ہوئے؟' }, options: ['Madinah', 'Cairo', 'Mecca', 'Baghdad'], correct: 2, fact: { en: 'The Prophet ﷺ was born in Mecca — the holiest city on earth for Muslims!', ur: 'نبی ﷺ مکہ میں پیدا ہوئے — مسلمانوں کے لیے زمین پر سب سے مقدس شہر!' } },
      { q: { en: 'What did "Al-Ameen" mean?', ur: '"الامین" کا کیا مطلب تھا؟' }, options: ['The Brave', 'The Trustworthy', 'The Wise', 'The Strong'], correct: 1, fact: { en: 'Al-Ameen means The Trustworthy. The Prophet ﷺ was given this name because he never lied!', ur: 'الامین کا مطلب ہے قابل اعتماد۔ نبی ﷺ کو یہ نام دیا گیا کیونکہ وہ کبھی جھوٹ نہیں بولتے تھے!' } },
      { q: { en: 'Who brought the first revelation to the Prophet ﷺ?', ur: 'نبی ﷺ کے پاس پہلی وحی کون لایا؟' }, options: ['Angel Mikail', 'Angel Jibreel', 'Angel Izraeel', 'Angel Israfeel'], correct: 1, fact: { en: 'Angel Jibreel (Gabriel) brought Allah\'s message to the Prophet ﷺ. He came many times over 23 years!', ur: 'فرشتہ جبریل اللہ کا پیغام نبی ﷺ کے پاس لاتا تھا۔ وہ 23 سال میں کئی بار آیا!' } },
      { q: { en: 'How old was the Prophet ﷺ when he received the first revelation?', ur: 'پہلی وحی کے وقت نبی ﷺ کی عمر کتنی تھی؟' }, options: ['25', '30', '40', '50'], correct: 2, fact: { en: 'The Prophet ﷺ was 40 years old when he received the first revelation in Cave Hira!', ur: 'نبی ﷺ کی عمر 40 سال تھی جب انہیں غار حرا میں پہلی وحی ملی!' } },
    ],
  },

  // ─────────────────────────────── DAY 4 ────────────────────────────────────
  {
    dayNumber: 4,
    title: { en: 'The Holy Quran', ur: 'قرآن پاک' },
    warmupFact: { en: 'The Quran has 114 Surahs (chapters) and over 6,000 verses. Millions of children have memorised the whole Quran!', ur: 'قرآن میں 114 سورتیں اور 6000 سے زیادہ آیات ہیں۔ لاکھوں بچوں نے پورا قرآن حفظ کیا ہے!' },
    topics: [
      {
        icon: '📖', gameType: 'GoalRush',
        title: { en: 'What is the Quran?', ur: 'قرآن کیا ہے؟' },
        intro: { en: 'The Quran is the word of Allah — the most special book in the world! It was revealed to Prophet Muhammad ﷺ over 23 years. It guides us how to live a good life.', ur: 'قرآن اللہ کا کلام ہے — دنیا کی سب سے خاص کتاب! یہ 23 سالوں میں نبی محمد ﷺ پر نازل ہوئی۔ یہ ہمیں اچھی زندگی گزارنا سکھاتی ہے۔' },
        questions: [
          { q: { en: 'Who is the Quran the word of?', ur: 'قرآن کس کا کلام ہے؟' }, options: ['Prophet Muhammad ﷺ', 'Angels', 'Allah', 'Humans'], correct: 2, fact: { en: 'The Quran is the direct word of Allah — not written by humans! It has been perfectly preserved for 1400+ years!', ur: 'قرآن اللہ کا براہ راست کلام ہے — انسانوں کا لکھا ہوا نہیں! یہ 1400+ سال سے بالکل محفوظ ہے!' } },
          { q: { en: 'How many Surahs (chapters) are in the Quran?', ur: 'قرآن میں کتنی سورتیں ہیں؟' }, options: ['100', '110', '114', '120'], correct: 2, fact: { en: 'The Quran has 114 Surahs. The first is Al-Fatiha and the last is An-Nas!', ur: 'قرآن میں 114 سورتیں ہیں۔ پہلی الفاتحہ اور آخری الناس ہے!' } },
        ],
      },
      {
        icon: '🌙', gameType: 'StarBlast',
        title: { en: 'Surah Al-Fatiha', ur: 'سورۃ الفاتحہ' },
        intro: { en: 'Surah Al-Fatiha is the OPENING chapter of the Quran — the most important Surah! We read it in EVERY rakah of every prayer. It means "The Opening."', ur: 'سورۃ الفاتحہ قرآن کا پہلا باب ہے — سب سے اہم سورت! ہم ہر نماز کی ہر رکعت میں اسے پڑھتے ہیں۔ اس کا مطلب ہے "کھولنا"۔' },
        questions: [
          { q: { en: 'What does "Al-Fatiha" mean?', ur: '"الفاتحہ" کا کیا مطلب ہے؟' }, options: ['The Closing', 'The Opening', 'The Middle', 'The Short'], correct: 1, fact: { en: 'Al-Fatiha means The Opening — it opens every prayer and the Quran itself! It has 7 beautiful verses!', ur: 'الفاتحہ کا مطلب ہے کھولنا — یہ ہر نماز اور قرآن کو کھولتی ہے! اس میں 7 خوبصورت آیات ہیں!' } },
          { q: { en: 'In how many prayer positions (rakahs) is Al-Fatiha read?', ur: 'الفاتحہ نماز کی کتنی رکعتوں میں پڑھی جاتی ہے؟' }, options: ['Only first', 'Only last', 'Every rakah', 'Never'], correct: 2, fact: { en: 'Al-Fatiha is read in every single rakah of prayer — it is the most recited verses in the world!', ur: 'الفاتحہ نماز کی ہر رکعت میں پڑھی جاتی ہے — یہ دنیا میں سب سے زیادہ پڑھی جانے والی آیات ہیں!' } },
        ],
      },
      {
        icon: '⭐', gameType: 'BubblePop',
        title: { en: 'How Was the Quran Revealed?', ur: 'قرآن کیسے نازل ہوا؟' },
        intro: { en: 'The Quran came down from Allah through Angel Jibreel to Prophet Muhammad ﷺ. It was not all at once — it came in parts over 23 years, with the right guidance for every situation!', ur: 'قرآن اللہ کی طرف سے فرشتہ جبریل کے ذریعے نبی محمد ﷺ پر نازل ہوا۔ یہ ایک ساتھ نہیں آئی — 23 سال میں حصوں میں آئی!' },
        questions: [
          { q: { en: 'Who brought the Quran from Allah to the Prophet ﷺ?', ur: 'قرآن اللہ سے نبی ﷺ کے پاس کون لایا؟' }, options: ['Angel Mikail', 'Angel Jibreel', 'Angel Izraeel', 'Humans'], correct: 1, fact: { en: 'Angel Jibreel (Gabriel) is the angel of revelation. He brought Allah\'s words to many prophets!', ur: 'فرشتہ جبریل وحی کا فرشتہ ہے۔ وہ اللہ کا کلام کئی نبیوں کے پاس لایا!' } },
          { q: { en: 'Over how many years was the Quran revealed?', ur: 'قرآن کتنے سالوں میں نازل ہوا؟' }, options: ['10 years', '15 years', '23 years', '30 years'], correct: 2, fact: { en: 'The Quran was revealed over 23 years — from age 40 to 63 of the Prophet ﷺ!', ur: 'قرآن 23 سال میں نازل ہوا — نبی ﷺ کی عمر 40 سے 63 سال تک!' } },
        ],
      },
      {
        icon: '🏅', gameType: 'MemoryFlip',
        title: { en: 'Importance of Reciting Quran', ur: 'قرآن تلاوت کی اہمیت' },
        intro: { en: 'Every letter you read from the Quran gives you 10 good deeds (hasanat)! The best Muslim is one who learns the Quran and teaches it to others. Kids who memorise it are called "Hafiz"!', ur: 'قرآن کا ہر حرف پڑھنے سے 10 نیکیاں ملتی ہیں! سب سے اچھا مسلمان وہ ہے جو قرآن سیکھے اور دوسروں کو سکھائے۔' },
        questions: [
          { q: { en: 'How many good deeds do you get per letter of Quran?', ur: 'قرآن کے ہر حرف پر کتنی نیکیاں ملتی ہیں؟' }, options: ['1', '5', '10', '100'], correct: 2, fact: { en: 'The Prophet ﷺ said each letter gives 10 rewards. "Alif Lam Meem" is 3 letters = 30 rewards!', ur: 'نبی ﷺ نے فرمایا ہر حرف 10 ثواب دیتا ہے۔ "الف لام میم" 3 حروف = 30 ثواب!' } },
          { q: { en: 'What is a person called who has memorised the whole Quran?', ur: 'جو شخص پورا قرآن حفظ کرے اسے کیا کہتے ہیں؟' }, options: ['Aalim', 'Hafiz', 'Sheikh', 'Qari'], correct: 1, fact: { en: 'A person who memorises all 114 Surahs of the Quran is called a Hafiz. It is a great honour!', ur: 'جو شخص قرآن کی تمام 114 سورتیں حفظ کرے اسے حافظ کہتے ہیں۔ یہ بہت بڑا اعزاز ہے!' } },
        ],
      },
    ],
    finalQuiz: [
      { q: { en: 'The Quran is the word of?', ur: 'قرآن کس کا کلام ہے؟' }, options: ['Muhammad ﷺ', 'Angels', 'Allah', 'Scholars'], correct: 2, fact: { en: 'The Quran is 100% the word of Allah — perfectly preserved since it was revealed!', ur: 'قرآن مکمل طور پر اللہ کا کلام ہے — نازل ہونے کے بعد سے بالکل محفوظ!' } },
      { q: { en: 'Al-Fatiha is which Surah?', ur: 'الفاتحہ کونسی سورت ہے؟' }, options: ['Last Surah', 'Middle Surah', 'First Surah', '50th Surah'], correct: 2, fact: { en: 'Al-Fatiha is the 1st Surah of the Quran. Without it, prayer is not complete!', ur: 'الفاتحہ قرآن کی پہلی سورت ہے۔ اس کے بغیر نماز مکمل نہیں ہوتی!' } },
      { q: { en: 'Who revealed the Quran to the Prophet ﷺ?', ur: 'نبی ﷺ پر قرآن کس نے نازل کیا؟' }, options: ['Angel Mikail', 'Angel Jibreel', 'The Sahaba', 'Allah directly'], correct: 1, fact: { en: 'Angel Jibreel was the messenger between Allah and the Prophet ﷺ, bringing the Quran!', ur: 'فرشتہ جبریل اللہ اور نبی ﷺ کے درمیان قاصد تھا، قرآن لاتا تھا!' } },
      { q: { en: 'How many rewards per letter of Quran?', ur: 'قرآن کے ہر حرف پر کتنے انعام ہیں؟' }, options: ['1', '3', '5', '10'], correct: 3, fact: { en: 'Every single letter of the Quran gives 10 rewards. Reading Quran daily is very important!', ur: 'قرآن کا ہر حرف 10 ثواب دیتا ہے۔ روزانہ قرآن پڑھنا بہت ضروری ہے!' } },
    ],
  },

  // ─────────────────────────────── DAY 5 ────────────────────────────────────
  {
    dayNumber: 5,
    title: { en: 'Salah — Our Daily Prayer', ur: 'صلاۃ — ہماری روزانہ نماز' },
    warmupFact: { en: 'A Muslim prays 17 rakahs (prayer positions) every single day across the 5 prayers!', ur: 'ایک مسلمان ہر روز 5 نمازوں میں 17 رکعتیں پڑھتا ہے!' },
    topics: [
      {
        icon: '🕌', gameType: 'GoalRush',
        title: { en: 'The 5 Daily Prayers', ur: 'پانچ روزانہ نمازیں' },
        intro: { en: 'The 5 prayers are: Fajr (dawn, 2 rakahs), Zuhr (midday, 4), Asr (afternoon, 4), Maghrib (sunset, 3), Isha (night, 4). Prayer is the direct connection between us and Allah!', ur: 'پانچ نمازیں: فجر (صبح، 2 رکعت)، ظہر (دوپہر، 4)، عصر (سہ پہر، 4)، مغرب (غروب، 3)، عشاء (رات، 4)۔' },
        questions: [
          { q: { en: 'Which prayer has only 2 rakahs?', ur: 'کس نماز میں صرف 2 رکعتیں ہیں؟' }, options: ['Zuhr', 'Asr', 'Fajr', 'Maghrib'], correct: 2, fact: { en: 'Fajr (dawn prayer) has 2 rakahs. It is prayed before sunrise to start the day with Allah!', ur: 'فجر (صبح کی نماز) میں 2 رکعتیں ہیں۔ طلوع آفتاب سے پہلے اللہ کے ساتھ دن شروع کرنے کے لیے پڑھی جاتی ہے!' } },
          { q: { en: 'Which prayer is prayed at night?', ur: 'کونسی نماز رات کو پڑھی جاتی ہے؟' }, options: ['Fajr', 'Zuhr', 'Asr', 'Isha'], correct: 3, fact: { en: 'Isha is the night prayer with 4 rakahs. It ends the day with remembrance of Allah!', ur: 'عشاء 4 رکعتوں کی رات کی نماز ہے۔ یہ اللہ کی یاد کے ساتھ دن ختم کرتی ہے!' } },
        ],
      },
      {
        icon: '💧', gameType: 'StarBlast',
        title: { en: 'Wudu — Purification', ur: 'وضو — پاکیزگی' },
        intro: { en: 'Before praying, we must do Wudu (wash with clean water). We wash our hands, mouth, nose, face, arms, head, ears, and feet. Wudu removes sins as the water falls!', ur: 'نماز سے پہلے وضو کرنا ضروری ہے (صاف پانی سے دھونا)۔ ہم ہاتھ، منہ، ناک، چہرہ، بازو، سر، کان اور پاؤں دھوتے ہیں۔' },
        questions: [
          { q: { en: 'What do we do before praying?', ur: 'نماز سے پہلے ہم کیا کرتے ہیں؟' }, options: ['Eat food', 'Do Wudu (wash)', 'Put on shoes', 'Read a book'], correct: 1, fact: { en: 'Wudu is washing parts of the body with clean water. It purifies us before standing before Allah!', ur: 'وضو جسم کے حصوں کو صاف پانی سے دھونا ہے۔ یہ ہمیں اللہ کے سامنے کھڑے ہونے سے پہلے پاک کرتا ہے!' } },
          { q: { en: 'How many times do we wash each part in Wudu?', ur: 'وضو میں ہر حصہ کتنی بار دھوتے ہیں؟' }, options: ['1 time only', '3 times each', '5 times', '10 times'], correct: 1, fact: { en: 'In Wudu we wash each part 3 times. This is the Sunnah of the Prophet ﷺ!', ur: 'وضو میں ہر حصہ 3 بار دھوتے ہیں۔ یہ نبی ﷺ کی سنت ہے!' } },
        ],
      },
      {
        icon: '📣', gameType: 'BubblePop',
        title: { en: 'The Adhan (Call to Prayer)', ur: 'اذان (نماز کی پکار)' },
        intro: { en: 'The Adhan is the beautiful call that announces prayer time! It starts with "Allahu Akbar" (Allah is Greatest). When you hear it, you stop what you\'re doing and go to pray!', ur: 'اذان خوبصورت پکار ہے جو نماز کا وقت بتاتی ہے! یہ "اللہ اکبر" سے شروع ہوتی ہے۔ جب آپ سنیں، کام چھوڑ کر نماز کے لیے جائیں!' },
        questions: [
          { q: { en: 'What is the Adhan?', ur: 'اذان کیا ہے؟' }, options: ['A type of prayer', 'The call to prayer', 'A Surah of Quran', 'A dua'], correct: 1, fact: { en: 'The Adhan is called 5 times a day from mosques around the world. It is a beautiful reminder!', ur: 'اذان دنیا بھر کی مساجد سے روزانہ 5 بار دی جاتی ہے۔ یہ ایک خوبصورت یاد دہانی ہے!' } },
          { q: { en: 'What is the first phrase of the Adhan?', ur: 'اذان کا پہلا جملہ کیا ہے؟' }, options: ['Bismillah', 'Allahu Akbar', 'Subhanallah', 'Alhamdulillah'], correct: 1, fact: { en: '"Allahu Akbar" means "Allah is the Greatest!" It opens the Adhan and reminds us Allah is above everything!', ur: '"اللہ اکبر" کا مطلب ہے "اللہ سب سے بڑا ہے!" یہ اذان کھولتا ہے اور یاد دلاتا ہے کہ اللہ سب سے بڑھ کر ہے!' } },
        ],
      },
      {
        icon: '🤲', gameType: 'MemoryFlip',
        title: { en: 'Facing Qibla & Standing in Prayer', ur: 'قبلہ کی طرف کھڑے ہونا' },
        intro: { en: 'When we pray, we face the Qibla — which is the direction of the Kaaba in Mecca. All Muslims around the world face the same direction, all at the same time!', ur: 'جب ہم نماز پڑھتے ہیں، ہم قبلہ کی طرف منہ کرتے ہیں — جو مکہ میں کعبہ کی سمت ہے۔ دنیا بھر کے سب مسلمان ایک ہی سمت، ایک ہی وقت منہ کرتے ہیں!' },
        questions: [
          { q: { en: 'Which direction do Muslims face when praying?', ur: 'مسلمان نماز پڑھتے وقت کس سمت منہ کرتے ہیں؟' }, options: ['Towards the sun', 'Towards the Qibla (Kaaba)', 'Towards north always', 'Towards east always'], correct: 1, fact: { en: 'Muslims face the Kaaba in Mecca — called the Qibla. This unites all Muslims worldwide in prayer!', ur: 'مسلمان مکہ میں کعبہ کی طرف منہ کرتے ہیں — اسے قبلہ کہتے ہیں۔ یہ نماز میں دنیا بھر کے مسلمانوں کو متحد کرتا ہے!' } },
          { q: { en: 'Where is the Kaaba located?', ur: 'کعبہ کہاں واقع ہے؟' }, options: ['Madinah', 'Jerusalem', 'Mecca', 'Turkey'], correct: 2, fact: { en: 'The Kaaba is in Masjid al-Haram in Mecca, Saudi Arabia. It is the most sacred place on earth!', ur: 'کعبہ سعودی عرب کے مکہ میں مسجد الحرام میں ہے۔ یہ زمین پر سب سے مقدس جگہ ہے!' } },
        ],
      },
    ],
    finalQuiz: [
      { q: { en: 'Which prayer is prayed at dawn?', ur: 'کونسی نماز فجر میں پڑھی جاتی ہے؟' }, options: ['Isha', 'Zuhr', 'Fajr', 'Asr'], correct: 2, fact: { en: 'Fajr prayer is before sunrise. The Prophet ﷺ said the Fajr prayer is witnessed by the angels!', ur: 'فجر کی نماز طلوع آفتاب سے پہلے ہے۔ نبی ﷺ نے فرمایا فجر کی نماز کے فرشتے گواہ ہوتے ہیں!' } },
      { q: { en: 'What is Wudu?', ur: 'وضو کیا ہے؟' }, options: ['A type of food', 'Washing before prayer', 'A dua after prayer', 'A hat'], correct: 1, fact: { en: 'Wudu is ritual purification with water before prayer. It washes away minor sins!', ur: 'وضو نماز سے پہلے پانی سے طہارت ہے۔ یہ چھوٹے گناہوں کو دھو دیتی ہے!' } },
      { q: { en: 'What is the call to prayer called?', ur: 'نماز کی پکار کو کیا کہتے ہیں؟' }, options: ['Dua', 'Adhan', 'Takbir', 'Surah'], correct: 1, fact: { en: 'The Adhan is the beautiful call announcing prayer time. It is heard 5 times a day worldwide!', ur: 'اذان خوبصورت پکار ہے جو نماز کا وقت بتاتی ہے۔ یہ دنیا بھر میں روزانہ 5 بار سنی جاتی ہے!' } },
      { q: { en: 'The Qibla direction points towards?', ur: 'قبلہ کی سمت کس طرف ہے؟' }, options: ['Madinah', 'Jerusalem', 'Mecca (Kaaba)', 'Baghdad'], correct: 2, fact: { en: 'The Qibla is towards the Kaaba in Mecca. All 1.8 billion Muslims face the same spot when praying!', ur: 'قبلہ مکہ میں کعبہ کی طرف ہے۔ 1.8 ارب مسلمان نماز پڑھتے وقت ایک ہی جگہ منہ کرتے ہیں!' } },
    ],
  },

  // ─────────────────────────────── DAY 6 ────────────────────────────────────
  {
    dayNumber: 6,
    title: { en: 'Angels in Islam', ur: 'اسلام میں فرشتے' },
    warmupFact: { en: 'Angels are made of light and never disobey Allah! They are always doing what Allah commands them to do.', ur: 'فرشتے نور سے بنے ہیں اور کبھی اللہ کی نافرمانی نہیں کرتے! وہ ہمیشہ اللہ کا حکم مانتے ہیں۔' },
    topics: [
      {
        icon: '👼', gameType: 'GoalRush',
        title: { en: 'What are Angels?', ur: 'فرشتے کیا ہیں؟' },
        intro: { en: 'Angels are amazing beings created by Allah from light (Nur). They never eat, drink or sleep. They cannot be seen by normal people and they NEVER disobey Allah!', ur: 'فرشتے اللہ کی بنائی ہوئی نور سے بنی مخلوق ہیں۔ وہ کھاتے، پیتے یا سوتے نہیں۔ عام لوگ انہیں نہیں دیکھ سکتے اور وہ اللہ کی کبھی نافرمانی نہیں کرتے!' },
        questions: [
          { q: { en: 'Angels are created from?', ur: 'فرشتے کس سے بنے ہیں؟' }, options: ['Fire', 'Earth', 'Light (Nur)', 'Water'], correct: 2, fact: { en: 'Angels are made from Nur (light). Humans are from clay and Jinn from smokeless fire!', ur: 'فرشتے نور سے بنے ہیں۔ انسان مٹی سے اور جن آگ کے دھویں سے!' } },
          { q: { en: 'Do angels ever disobey Allah?', ur: 'کیا فرشتے کبھی اللہ کی نافرمانی کرتے ہیں؟' }, options: ['Yes, sometimes', 'Never — they always obey', 'Only if they want', 'Yes, always'], correct: 1, fact: { en: 'Angels never disobey Allah — not even for a moment! They were created to worship and serve!', ur: 'فرشتے کبھی اللہ کی نافرمانی نہیں کرتے — ایک لمحے کے لیے بھی نہیں! وہ عبادت اور خدمت کے لیے بنائے گئے ہیں!' } },
        ],
      },
      {
        icon: '🌊', gameType: 'StarBlast',
        title: { en: 'Angel Jibreel (Gabriel)', ur: 'فرشتہ جبریل' },
        intro: { en: 'Angel Jibreel is the greatest angel! He is the angel of revelation who brought Allah\'s messages to ALL the prophets — Ibrahim, Musa, Isa, and Muhammad ﷺ. He has 600 wings!', ur: 'فرشتہ جبریل سب سے بڑا فرشتہ ہے! وہ وحی کا فرشتہ ہے جو تمام انبیاء کو اللہ کے پیغامات لاتا تھا — ابراہیم، موسیٰ، عیسیٰ، اور محمد ﷺ۔ اس کے 600 پر ہیں!' },
        questions: [
          { q: { en: 'What is Angel Jibreel known as?', ur: 'فرشتہ جبریل کو کیا کہا جاتا ہے؟' }, options: ['Angel of death', 'Angel of revelation', 'Angel of rain', 'Angel of sleep'], correct: 1, fact: { en: 'Jibreel is the angel of revelation. He brought the Quran to Prophet Muhammad ﷺ over 23 years!', ur: 'جبریل وحی کا فرشتہ ہے۔ وہ 23 سال میں نبی محمد ﷺ کے پاس قرآن لایا!' } },
          { q: { en: 'How many wings does Angel Jibreel have?', ur: 'فرشتہ جبریل کے کتنے پر ہیں؟' }, options: ['2', '10', '100', '600'], correct: 3, fact: { en: 'Jibreel has 600 wings! He is so large that when he spread his wings, they fill the entire horizon!', ur: 'جبریل کے 600 پر ہیں! وہ اتنا بڑا ہے کہ جب پر پھیلائے تو پورا افق بھر جاتا ہے!' } },
        ],
      },
      {
        icon: '📝', gameType: 'BubblePop',
        title: { en: 'Our Recording Angels', ur: 'ہمارے لکھنے والے فرشتے' },
        intro: { en: 'Every person has 2 angels with them always! Kiraman Katibin — one on the right writes good deeds, one on the left writes bad deeds. They record EVERYTHING we do!', ur: 'ہر انسان کے ساتھ ہر وقت 2 فرشتے ہوتے ہیں! کراماً کاتبین — دائیں طرف والا نیکیاں لکھتا ہے، بائیں طرف والا برائیاں لکھتا ہے۔' },
        questions: [
          { q: { en: 'How many angels record our deeds?', ur: 'کتنے فرشتے ہمارے اعمال لکھتے ہیں؟' }, options: ['1', '2', '3', '4'], correct: 1, fact: { en: 'Two angels sit on our shoulders — one records good deeds, one records bad deeds. They never leave us!', ur: 'دو فرشتے ہمارے کندھوں پر ہوتے ہیں — ایک نیکیاں لکھتا ہے، ایک برائیاں۔ وہ ہمیں کبھی نہیں چھوڑتے!' } },
          { q: { en: 'Where do these recording angels sit?', ur: 'یہ لکھنے والے فرشتے کہاں بیٹھتے ہیں؟' }, options: ['On our heads', 'On our shoulders', 'Behind us', 'In front of us'], correct: 1, fact: { en: 'The Kiraman Katibin sit on our right and left shoulders. So think before every action!', ur: 'کراماً کاتبین ہمارے دائیں اور بائیں کندھوں پر بیٹھتے ہیں۔ اس لیے ہر عمل سے پہلے سوچو!' } },
        ],
      },
      {
        icon: '🌧️', gameType: 'MemoryFlip',
        title: { en: 'Other Important Angels', ur: 'دیگر اہم فرشتے' },
        intro: { en: 'Angel Mikail controls rain and plants. Angel Izraeel is the Angel of Death. Angel Israfeel will blow the trumpet on the Day of Judgement. Each has a special job from Allah!', ur: 'فرشتہ میکائیل بارش اور پودوں کا ذمہ دار ہے۔ فرشتہ عزرائیل موت کا فرشتہ ہے۔ فرشتہ اسرافیل قیامت کے دن صور پھونکے گا۔' },
        questions: [
          { q: { en: 'Which angel controls rain and food?', ur: 'کونسا فرشتہ بارش اور رزق کا ذمہ دار ہے؟' }, options: ['Jibreel', 'Mikail', 'Izraeel', 'Israfeel'], correct: 1, fact: { en: 'Angel Mikail is in charge of rain, winds, and providing food for all creation by Allah\'s command!', ur: 'فرشتہ میکائیل اللہ کے حکم سے بارش، ہوا اور تمام مخلوق کا رزق مہیا کرتا ہے!' } },
          { q: { en: 'Which angel will blow the trumpet on Judgement Day?', ur: 'کونسا فرشتہ قیامت کے دن صور پھونکے گا؟' }, options: ['Jibreel', 'Mikail', 'Izraeel', 'Israfeel'], correct: 3, fact: { en: 'Angel Israfeel will blow the trumpet (Sur) to signal the Day of Judgement. Everyone will wake up!', ur: 'فرشتہ اسرافیل قیامت کا اشارہ دینے کے لیے صور پھونکے گا۔ سب جاگ جائیں گے!' } },
        ],
      },
    ],
    finalQuiz: [
      { q: { en: 'Angels are made from?', ur: 'فرشتے کس چیز سے بنے ہیں؟' }, options: ['Clay', 'Light', 'Water', 'Air'], correct: 1, fact: { en: 'Angels are created from Nur (divine light). They are invisible to most humans!', ur: 'فرشتے نور سے بنے ہیں۔ وہ زیادہ تر انسانوں کو نظر نہیں آتے!' } },
      { q: { en: 'Which angel brought the Quran to the Prophet ﷺ?', ur: 'کونسا فرشتہ نبی ﷺ کے پاس قرآن لایا؟' }, options: ['Mikail', 'Izraeel', 'Jibreel', 'Israfeel'], correct: 2, fact: { en: 'Jibreel (Gabriel) is the angel of revelation who brought Allah\'s message to all prophets!', ur: 'جبریل وحی کا فرشتہ ہے جو تمام انبیاء کے پاس اللہ کا پیغام لایا!' } },
      { q: { en: 'The angel on our right shoulder records?', ur: 'دائیں کندھے کا فرشتہ کیا لکھتا ہے؟' }, options: ['Bad deeds', 'Good deeds', 'Neutral deeds', 'Nothing'], correct: 1, fact: { en: 'The angel on the right records good deeds, and the one on the left records bad deeds!', ur: 'دائیں کندھے کا فرشتہ نیکیاں لکھتا ہے، اور بائیں کندھے کا برائیاں!' } },
      { q: { en: 'Which angel is responsible for rain?', ur: 'کونسا فرشتہ بارش کا ذمہ دار ہے؟' }, options: ['Jibreel', 'Mikail', 'Izraeel', 'Israfeel'], correct: 1, fact: { en: 'Mikail is responsible for rain and rizq (provision). All food ultimately comes through his work!', ur: 'میکائیل بارش اور رزق کا ذمہ دار ہے۔ تمام کھانا بالآخر اس کے کام سے آتا ہے!' } },
    ],
  },

  // ─────────────────────────────── DAYS 7-18: abbreviated structure ─────────
  {
    dayNumber: 7,
    title: { en: 'Prophet Ibrahim (AS)', ur: 'حضرت ابراہیم علیہ السلام' },
    warmupFact: { en: 'Ibrahim (AS) is called "Khalilullah" — the Friend of Allah! He was thrown into fire but was not burned.', ur: 'ابراہیم (ع) کو "خلیل اللہ" کہا جاتا ہے — اللہ کا دوست! انہیں آگ میں پھینکا گیا لیکن جلے نہیں۔' },
    topics: [
      {
        icon: '🌟', gameType: 'GoalRush',
        title: { en: 'Ibrahim\'s Search for Allah', ur: 'ابراہیم کی اللہ کی تلاش' },
        intro: { en: 'As a child, Ibrahim (AS) looked at the stars, moon and sun and asked "Is this my Lord?" Then he realised only Allah — the One who created them all — deserves worship!', ur: 'بچپن میں ابراہیم (ع) نے ستاروں، چاند اور سورج کو دیکھا اور پوچھا "کیا یہ میرا رب ہے؟" پھر انہیں احساس ہوا کہ صرف اللہ عبادت کا مستحق ہے!' },
        questions: [
          { q: { en: 'What is Prophet Ibrahim (AS) called?', ur: 'حضرت ابراہیم (ع) کو کیا کہا جاتا ہے؟' }, options: ['Habibullah', 'Khalilullah', 'Kaleemullah', 'Rasulullah'], correct: 1, fact: { en: 'Ibrahim (AS) is called Khalilullah — Friend of Allah. Allah chose him as a very special friend!', ur: 'ابراہیم (ع) کو خلیل اللہ کہا جاتا ہے — اللہ کا دوست۔ اللہ نے انہیں بہت خاص دوست چنا!' } },
          { q: { en: 'Who built the Kaaba?', ur: 'کعبہ کس نے بنایا؟' }, options: ['Prophet Musa', 'Prophet Adam', 'Prophet Ibrahim & Ismail', 'Prophet Nuh'], correct: 2, fact: { en: 'Prophet Ibrahim (AS) and his son Ismail (AS) built the Kaaba in Mecca together!', ur: 'نبی ابراہیم (ع) اور ان کے بیٹے اسماعیل (ع) نے مکہ میں کعبہ مل کر بنایا!' } },
        ],
      },
      {
        icon: '🔥', gameType: 'StarBlast',
        title: { en: 'Test of Fire', ur: 'آگ کا امتحان' },
        intro: { en: 'When Ibrahim (AS) smashed the idols of his people, King Nimrod ordered him to be thrown into a huge fire. But Allah said "Be cool and safe for Ibrahim!" and the fire did not burn him!', ur: 'جب ابراہیم (ع) نے اپنی قوم کے بتوں کو توڑا تو بادشاہ نمرود نے انہیں بڑی آگ میں پھینکنے کا حکم دیا۔ لیکن اللہ نے کہا "ابراہیم کے لیے ٹھنڈی اور سلامت ہو جا!" اور آگ نے انہیں جلایا نہیں!' },
        questions: [
          { q: { en: 'Why was Ibrahim (AS) thrown into fire?', ur: 'ابراہیم (ع) کو آگ میں کیوں پھینکا گیا؟' }, options: ['He stole food', 'He broke the idols', 'He left the city', 'He prayed loudly'], correct: 1, fact: { en: 'Ibrahim (AS) broke the idols because he knew only Allah deserves worship. He was very brave!', ur: 'ابراہیم (ع) نے بت توڑے کیونکہ وہ جانتے تھے صرف اللہ عبادت کا مستحق ہے۔ وہ بہت بہادر تھے!' } },
          { q: { en: 'What happened when Ibrahim (AS) was put in the fire?', ur: 'جب ابراہیم (ع) کو آگ میں ڈالا گیا تو کیا ہوا؟' }, options: ['He burned up', 'The fire went out', 'Allah made it cool and safe', 'He escaped quickly'], correct: 2, fact: { en: 'Allah told the fire: "Be cool and safe for Ibrahim!" The fire obeyed Allah and did not harm him!', ur: 'اللہ نے آگ کو کہا: "ابراہیم کے لیے ٹھنڈی اور سلامت ہو جا!" آگ نے اللہ کا حکم مانا اور انہیں تکلیف نہیں دی!' } },
        ],
      },
      {
        icon: '🕋', gameType: 'BubblePop',
        title: { en: 'Building the Kaaba', ur: 'کعبہ کی تعمیر' },
        intro: { en: 'Allah told Ibrahim (AS) to build a house for worship. Together with his son Ismail (AS), they built the Kaaba — the first house of worship on earth! They prayed "Our Lord, accept from us!"', ur: 'اللہ نے ابراہیم (ع) کو عبادت کا گھر بنانے کا حکم دیا۔ اپنے بیٹے اسماعیل (ع) کے ساتھ انہوں نے کعبہ بنایا — زمین پر عبادت کا پہلا گھر!' },
        questions: [
          { q: { en: 'Who helped Ibrahim (AS) build the Kaaba?', ur: 'کعبہ بنانے میں ابراہیم (ع) کی مدد کس نے کی؟' }, options: ['His wife Hajar', 'His son Ismail (AS)', 'His brother', 'His uncle'], correct: 1, fact: { en: 'Prophet Ismail (AS), the son of Ibrahim (AS), helped his father build the Kaaba together!', ur: 'نبی اسماعیل (ع)، ابراہیم (ع) کے بیٹے، نے اپنے باپ کے ساتھ مل کر کعبہ بنایا!' } },
          { q: { en: 'The Kaaba is the first house of?', ur: 'کعبہ پہلا گھر ہے؟' }, options: ['Kings', 'Worship', 'Markets', 'Schools'], correct: 1, fact: { en: 'The Kaaba is the first house built for the worship of Allah on earth. Every Muslim prays towards it!', ur: 'کعبہ زمین پر اللہ کی عبادت کے لیے بنایا گیا پہلا گھر ہے۔ ہر مسلمان اس کی طرف نماز پڑھتا ہے!' } },
        ],
      },
      {
        icon: '🐏', gameType: 'MemoryFlip',
        title: { en: 'The Great Sacrifice (Qurbani)', ur: 'عظیم قربانی' },
        intro: { en: 'Allah tested Ibrahim (AS) by asking him to sacrifice his beloved son Ismail (AS). Ibrahim obeyed! Just as he was about to do it, Allah sent a ram (sheep) from heaven to be sacrificed instead. This is why we celebrate Eid al-Adha!', ur: 'اللہ نے ابراہیم (ع) کو اپنے پیارے بیٹے اسماعیل (ع) کی قربانی دینے کا حکم دے کر آزمایا۔ اللہ نے جنت سے مینڈھا بھیجا۔ اسی لیے ہم عید الاضحیٰ مناتے ہیں!' },
        questions: [
          { q: { en: 'What did Allah ask Ibrahim (AS) to sacrifice?', ur: 'اللہ نے ابراہیم (ع) سے کیا قربان کرنے کو کہا؟' }, options: ['A camel', 'His house', 'His son Ismail (AS)', 'A cow'], correct: 2, fact: { en: 'Allah asked Ibrahim (AS) to sacrifice his son as a test of faith. Ibrahim obeyed without question!', ur: 'اللہ نے ایمان کے امتحان کے طور پر ابراہیم (ع) سے بیٹے کی قربانی مانگی۔ ابراہیم نے بلا سوال اطاعت کی!' } },
          { q: { en: 'Which Eid celebrates Ibrahim\'s sacrifice?', ur: 'کونسی عید ابراہیم کی قربانی مناتی ہے؟' }, options: ['Eid al-Fitr', 'Eid al-Adha', 'Eid Milad', 'Eid al-Quds'], correct: 1, fact: { en: 'Eid al-Adha is the festival of sacrifice, celebrating Ibrahim\'s obedience. We sacrifice animals and share meat!', ur: 'عید الاضحیٰ قربانی کا تہوار ہے، ابراہیم کی اطاعت کا جشن۔ ہم جانور ذبح کرتے اور گوشت بانٹتے ہیں!' } },
        ],
      },
    ],
    finalQuiz: [
      { q: { en: 'Ibrahim (AS) is called "Khalilullah" — what does it mean?', ur: '"خلیل اللہ" کا کیا مطلب ہے؟' }, options: ['Slave of Allah', 'Friend of Allah', 'Prophet of Allah', 'King of Allah'], correct: 1, fact: { en: 'Khalilullah means Friend of Allah. Ibrahim\'s strong faith made Allah choose him as a special friend!', ur: 'خلیل اللہ کا مطلب ہے اللہ کا دوست۔ ابراہیم کے مضبوط ایمان نے اللہ کو انہیں خاص دوست چننے پر آمادہ کیا!' } },
      { q: { en: 'Why did Ibrahim (AS) break the idols?', ur: 'ابراہیم (ع) نے بت کیوں توڑے؟' }, options: ['He was angry', 'Only Allah deserves worship', 'He was bored', 'To make room'], correct: 1, fact: { en: 'Ibrahim (AS) broke the idols to show people that statues cannot help them — only Allah can!', ur: 'ابراہیم (ع) نے بت توڑے لوگوں کو دکھانے کے لیے کہ مجسمے ان کی مدد نہیں کر سکتے — صرف اللہ کر سکتا ہے!' } },
      { q: { en: 'Who built the Kaaba in Mecca?', ur: 'مکہ میں کعبہ کس نے بنایا؟' }, options: ['Prophet Nuh', 'Prophet Musa', 'Ibrahim & Ismail (AS)', 'Prophet Adam'], correct: 2, fact: { en: 'Ibrahim and Ismail (AS) built the Kaaba together. It is the most sacred structure on earth!', ur: 'ابراہیم اور اسماعیل (ع) نے مل کر کعبہ بنایا۔ یہ زمین پر سب سے مقدس عمارت ہے!' } },
      { q: { en: 'Which festival commemorates Ibrahim\'s sacrifice?', ur: 'کونسا تہوار ابراہیم کی قربانی یاد کرتا ہے؟' }, options: ['Eid al-Fitr', 'Eid al-Adha', 'Ramadan', 'Ashura'], correct: 1, fact: { en: 'Eid al-Adha marks Ibrahim\'s sacrifice. Muslims worldwide sacrifice animals and share meat with the poor!', ur: 'عید الاضحیٰ ابراہیم کی قربانی کی یاد ہے۔ دنیا بھر کے مسلمان جانور قربان کرتے اور غریبوں میں گوشت بانٹتے ہیں!' } },
    ],
  },
];

// Helper to get content for a specific day (with fallback)
export function getDayContent(dayNumber) {
  const found = DAY_CONTENT.find(d => d.dayNumber === dayNumber);
  if (found) return found;
  // Fallback for days not yet authored
  return DAY_CONTENT[0];
}

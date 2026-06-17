# Little Muslim Genius — Complete App Documentation
**As of June 2026 | For the owner/admin**

---

## 1. What Is This App?

Little Muslim Genius is a mobile-first web app for Muslim children ages 3–7. Children play mini-games, earn puzzle pieces, and discover Islamic + STEM knowledge — one day at a time, for 90 days.

**Parents** create an account and up to 4 child profiles. Each child has their own progress, streak, and star count. The first 3 days are FREE. After that, parents pay a one-time fee of **Rs. 1,000** (~$3.50 USD) to unlock all 90 days.

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite (runs in browser) |
| Backend | Node.js + Express REST API |
| Database | PostgreSQL (Neon cloud) via Prisma ORM |
| Auth | JWT tokens (7-day expiry) |
| Payments | Stripe (card) + JazzCash + EasyPaisa |
| Hosting | Not yet deployed — runs locally |

---

## 3. How to Run (Local Development)

### One-time setup (already done)
```
backend/   npm install
frontend/  npm install
backend/   npx prisma generate
```

### Start the backend (Terminal 1)
```
cd backend
node server.js
```
Runs on **http://localhost:5000**
Auto-seeds database with days + puzzles on first run.

### Start the frontend (Terminal 2)
```
cd little-muslim-genius   (root folder)
npm run dev
```
Runs on **http://localhost:5173** (or 5174 if port taken)

Open your browser and go to that URL.

---

## 4. Environment Variables (backend/.env)

```
PORT=5000
DATABASE_URL=postgresql://...neon.tech/neondb...   ← Neon PostgreSQL cloud
JWT_SECRET=LittleMuslimGenius2026SecretKey!
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=usamazid222@hotmail.com                ← This email gets admin access
```

**To give someone admin access:** Either add their email as `ADMIN_EMAIL` or set `isAdmin=true` on their user row in the database.

---

## 5. Complete User Journey

### Step 1 — Parent Signs Up / Logs In
- Screen: **Login**
- Parent enters email + password (min 6 chars)
- "Sign Up" creates account → JWT token saved to browser localStorage
- "Log In" for returning parents
- "Forgot password?" sends a reset link email

### Step 2 — Pick / Create Child Profile
- Screen: **Profile Picker**
- Parent sees all child profiles
- Can create up to 4 profiles (name + age + emoji avatar)
- Each profile shows: age tier icon, current day, login streak
- Tap a profile → enters the Day Map for that child

### Step 3 — The Day Map
- Screen: **Day Map**
- Shows 90 days as a zigzag adventure path
- Each day card shows: Day number, title, mini-game icons
- Day states:
  - **⭐ READY (today)** — gold glow, tap to play
  - **✅ DONE** — green, tap to replay
  - **🔒 LOCKED** — calendar locked (not yet reached)
  - **💳 PAY** — needs payment to unlock (after Day 3)
- Header shows: child name/avatar, stars ⭐, prayer beads 📿, badges 🏅, streak 🔥

### Step 4 — Adventure Session (the game)

When a child taps a day, they enter the **Adventure Session**. This is where learning happens.

The screen background changes colour based on which world the child is in:

| Days | World | Background colour |
|------|-------|------------------|
| 1–18 | 🕌 Islam World | Deep emerald green |
| 19–36 | 💻 Tech World | Deep navy blue |
| 37–54 | 🔬 Science World | Deep purple |
| 55–72 | 🌍 Life Skills World | Deep orange |
| 73–90 | 🌟 Master World | Cosmic blue |

**Inside each session:**

1. **Puzzle Board** at the top — shows the puzzle being built (e.g. "5 Pillars of Islam 🕌")
   - Each slot shows a coloured piece (orange, purple, blue, green, amber)
   - Empty slots show a grey ❓
   - Progress bar fills as pieces are earned
   - Puzzle comes from the database, filtered by the current world's topic

2. **Challenge Cards** below — one card per puzzle piece
   - Green = already won ✅
   - Active = current challenge (glows, shows PLAY button)
   - Dark = locked (win previous challenge first)

3. **Tap PLAY** → full-screen mini-game launches

4. **Win the game** → piece flies into the puzzle board
   - Next challenge unlocks automatically

5. **Collect all pieces** → Celebrate screen!
   - Shows all pieces assembled
   - Displays a fun fact (e.g. "Allah has 99 beautiful names!")
   - Button: "Next Puzzle Adventure!" → new puzzle from same world

### Step 5 — The 4 Mini-Games

Each challenge uses one of 4 mini-games (cycles in order):

| # | Game | How to Win |
|---|------|-----------|
| 1 | ⚽ Goal Rush | Press KICK at the right moment — score a goal |
| 2 | 💫 Star Blast | Tap falling stars before they reach the bottom |
| 3 | 🃏 Memory Flip | Match all pairs of emoji cards |
| 4 | 🫧 Bubble Pop | Tap GOOD bubbles (gold/purple/green), avoid BAD ones (red/orange/grey) |

Each game runs on a canvas and works with both touch (mobile) and mouse (desktop).

### Step 6 — Payment (after Day 3)
- Screen: **Payment**
- Price: **Rs. 1,000 one-time** (not a subscription)
- Payment methods: JazzCash 📱, EasyPaisa 📲, Stripe (card) 💳
- After payment: all 90 days unlock instantly
- Stripe: redirects to Stripe checkout → returns to app → verified by webhook
- JazzCash/EasyPaisa: form POST to gateway → callback to backend → unlocks

### Step 7 — Rewards Screen
- Screen: **Rewards**
- Shows stars, badges, and progress summary

---

## 6. Parent Dashboard

Accessible from the Profile Picker via "📊 Dashboard" button.

Shows for **each child profile**:
- Days completed / total
- Stars earned
- Login streak (🔥)
- Progress bar per world

---

## 7. Admin Panel

**Who can access:** Any account with `ADMIN_EMAIL` matching in `.env`, or `isAdmin=true` in the database.

**How to open:** Log in with the admin email (`usamazid222@hotmail.com`) → Profile Picker → tap 🛡️ button (top right).

### Admin Tabs:

#### Tab 1: 📊 Overview
- Total users, paid users, free users, total profiles
- Revenue summary

#### Tab 2: 👥 Users
- List all registered parents
- Search by email
- Block/unblock accounts
- Manually set payment status (mark paid/unpaid)
- Delete accounts

#### Tab 3: 📅 Content (Days)
- See all 90 day entries from the database
- Edit any day: change title (English + Urdu), world, game types
- Add new days
- Delete days

#### Tab 4: 🧩 Puzzles
- See all puzzles in the database
- **Add new puzzle:**
  1. Choose topic: Islam / Technology / Science / Life Skills / General Knowledge
  2. Enter title in English and Urdu
  3. Write a fun fact (shown after completing the puzzle)
  4. Add 2–5 pieces (each piece has an emoji + English name + Urdu name)
  5. Save → goes live immediately for ALL children
- Delete puzzles
- This is how you **add monthly new content** — no code changes needed!

---

## 8. Database Tables (Prisma Schema)

| Table | Purpose |
|-------|---------|
| `User` | Parent accounts (email, password hash, isAdmin, blocked) |
| `Profile` | Child profiles (name, age, avatar, linked to User) |
| `Progress` | Per-child progress (completedDays, stars, beads, badges, streak, day) |
| `Payment` | Payment records (status, method, gateway transaction ID) |
| `Day` | The 90-day adventure path (title EN/UR, world, games JSON) |
| `Puzzle` | Puzzle content (topic, title, pieces JSON, fun fact, order, active) |

---

## 9. Content System

### How puzzles work:
- 20 puzzles are seeded into the database on first run
- Puzzle topics: Islam (7), Technology (5), Science (3), Life Skills (3), General Knowledge (1) + more
- Each puzzle has 2–5 pieces (emoji + name)
- When a child plays Day 1–18, the app fetches puzzles where `topic = 'Islam'`
- Tech world fetches `topic = 'Technology'`, etc.
- Puzzles are shuffled randomly, so each session feels different
- Master World (Days 73–90) gets ALL topics mixed together

### Adding content monthly (no code needed):
1. Log in as admin
2. Open Admin Panel → 🧩 Puzzles tab
3. Click "＋ Add Puzzle"
4. Fill in the form → Save
5. Done! All children will see the new puzzle the next time they play

---

## 10. What Is 100% Working

| Feature | Status |
|---------|--------|
| Parent signup + login | ✅ Working |
| Forgot password email | ✅ Working |
| JWT authentication | ✅ Working |
| Up to 4 child profiles | ✅ Working |
| 90-day map (zigzag path) | ✅ Working |
| Free first 3 days | ✅ Working |
| Calendar locking (one day per day) | ✅ Working |
| Adventure Session (world-themed) | ✅ Working |
| Goal Rush mini-game | ✅ Working |
| Star Blast mini-game (mobile tap fixed) | ✅ Working |
| Memory Flip mini-game | ✅ Working |
| Bubble Pop mini-game | ✅ Working |
| Puzzle board (collect pieces) | ✅ Working |
| Puzzle celebration + fun fact | ✅ Working |
| "Next Puzzle" cycling | ✅ Working |
| 5 worlds (colour changes per day range) | ✅ Working |
| Database-driven puzzles | ✅ Working |
| Admin: view users | ✅ Working |
| Admin: block/unblock users | ✅ Working |
| Admin: set payment status | ✅ Working |
| Admin: add/delete puzzles | ✅ Working |
| Admin: add/edit/delete days | ✅ Working |
| Payment: Stripe | ✅ Wired (needs live Stripe keys for prod) |
| Payment: JazzCash | ✅ Wired (needs live merchant keys for prod) |
| Payment: EasyPaisa | ✅ Wired (needs live merchant keys for prod) |
| Bilingual EN + Urdu | ✅ Working |
| RTL layout for Urdu | ✅ Working |
| Stars / beads / badges / streak | ✅ Tracked in DB |
| Parent dashboard | ✅ Working |
| Solid non-transparent world UI | ✅ Working |
| Mobile touch support | ✅ Working |

---

## 11. What Needs To Be Done Before Launch

| Item | Details |
|------|---------|
| **Deploy to server** | Host backend on Railway / Render / VPS. Host frontend on Vercel / Netlify. |
| **Update FRONTEND_URL in .env** | Change from `localhost:5173` to your real domain |
| **Stripe live keys** | Get live `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` from stripe.com |
| **JazzCash live keys** | Get `JAZZCASH_MERCHANT_ID`, `JAZZCASH_PASSWORD`, `JAZZCASH_INTEGRITY_SALT` from JazzCash merchant portal |
| **EasyPaisa live keys** | Get credentials from Telenor/EasyPaisa merchant portal |
| **Email service** | Add `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` to .env for forgot-password emails |
| **Domain name** | Point your domain DNS to the deployed frontend |
| **SSL certificate** | HTTPS required for payments (auto-provided by Vercel/Netlify) |
| **Test payment flow** | Test all 3 payment methods in staging before going live |

---

## 12. API Endpoints Summary

All routes are at `http://localhost:5000/api/`

### Public (no login needed)
```
POST /api/auth/signup          — Create account
POST /api/auth/login           — Log in
POST /api/auth/forgot-password — Send reset email
POST /api/auth/reset-password  — Reset password with token
GET  /api/health               — Server health check
```

### Authenticated (need Bearer token)
```
GET  /api/profiles             — List child profiles
POST /api/profiles             — Create child profile
PUT  /api/profiles/:id         — Update profile
DELETE /api/profiles/:id       — Delete profile

GET  /api/progress             — All progress records
POST /api/progress/complete    — Mark day complete
POST /api/progress/star        — Award stars

GET  /api/content/days         — Get all 90 days
GET  /api/puzzles              — Get all active puzzles

POST /api/payments/create-checkout  — Start Stripe checkout
POST /api/payments/jazzcash         — Start JazzCash payment
POST /api/payments/easypaisa        — Start EasyPaisa payment
POST /api/payments/webhook          — Stripe webhook (Stripe calls this)
```

### Admin only (ADMIN_EMAIL account)
```
GET    /api/admin/stats               — Total users / revenue stats
GET    /api/admin/users               — List all users
PUT    /api/admin/users/:id/block     — Block/unblock user
PUT    /api/admin/users/:id/payment   — Manually set payment status
DELETE /api/admin/users/:id           — Delete user

GET    /api/admin/content/days        — List all days
POST   /api/admin/content/days        — Add new day
PUT    /api/admin/content/days/:id    — Update day
DELETE /api/admin/content/days/:id    — Delete day

GET    /api/admin/puzzles             — List all puzzles
POST   /api/admin/puzzles             — Add new puzzle
PUT    /api/admin/puzzles/:id         — Update puzzle
DELETE /api/admin/puzzles/:id         — Delete puzzle
```

---

## 13. Folder Structure

```
little-muslim-genius/              ← Frontend (React + Vite)
  src/
    App.jsx                        ← Root app, screen router
    index.css                      ← Global styles + animations
    adventure/
      AdventureSession.jsx         ← Main game orchestrator (worlds, puzzles)
      PuzzleBoard.jsx              ← Puzzle piece slots display
      games/
        GoalRush.jsx               ← Football timing game
        StarBlast.jsx              ← Tap stars game
        MemoryFlip.jsx             ← Card matching game
        BubblePop.jsx              ← Bubble pop game
    screens/
      Login.jsx                    ← Sign up / log in
      ProfilePicker.jsx            ← Choose child
      DayMap.jsx                   ← 90-day adventure path
      Dashboard.jsx                ← Parent progress summary
      ManageProfiles.jsx           ← Add/edit/delete child profiles
      Payment.jsx                  ← JazzCash / EasyPaisa / Stripe
      Rewards.jsx                  ← Stars and badges
      Settings.jsx                 ← Language, sound
      Admin.jsx                    ← Full admin panel
    context/
      AppContext.jsx               ← Global state (auth, profiles, progress)
    services/
      api.js                       ← Axios instance with auth headers
    data/
      content.js                   ← World definitions, mascots, i18n strings
    components/
      ui.jsx                       ← Shared UI: Sky, Mascot, Screen, etc.

backend/                           ← Backend (Node.js + Express)
  server.js                        ← Entry point, routes, CORS, rate limit
  .env                             ← Secrets (never commit this)
  prisma/
    schema.prisma                  ← Database models
  src/
    config/
      prisma.js                    ← Prisma client singleton
      db.js                        ← DB connection
    controllers/
      authController.js            ← Signup, login, password reset
      profileController.js         ← Child profile CRUD
      progressController.js        ← Complete day, award stars
      contentController.js         ← Day content management
      puzzleController.js          ← Puzzle CRUD
      adminController.js           ← User management, stats
      paymentController.js         ← Stripe, JazzCash, EasyPaisa
    routes/
      auth.js / profiles.js / progress.js / content.js
      puzzles.js / admin.js / payments.js / user.js
    middleware/
      auth.js                      ← JWT protect, adminProtect
      errorHandler.js              ← 404 + global error handler
    seeds/
      contentSeed.js               ← Seeds 90 days on first run
      puzzleSeed.js                ← Seeds 20 puzzles on first run
```

---

## 14. Admin Quick-Start Guide

**First time setup:**
1. Run both servers (see Section 3)
2. Go to `http://localhost:5174`
3. Sign up with email: `usamazid222@hotmail.com`
4. You are automatically the admin
5. After signing in, tap 🛡️ in top right → Admin Panel

**Add a new puzzle every month:**
1. Admin Panel → 🧩 Puzzles tab
2. Click "＋ Add Puzzle"
3. Topic: Islam (for Days 1–18) or Technology (19–36) etc.
4. Fill in title, fun fact, pieces (2–5 emojis with names)
5. Save → live instantly

**Mark a user as paid manually (e.g. cash payment):**
1. Admin Panel → 👥 Users tab
2. Find the user by email
3. Tap "Set Paid" → done

---

## 15. The 5 Learning Worlds

| Days | World | Colour | Topics Covered |
|------|-------|--------|---------------|
| 1–18 | 🕌 Islam World | Emerald green | 5 Pillars, Names of Allah, Wudu, Prophets, Islamic months, Salah, Manners |
| 19–36 | 💻 Tech World | Navy blue | Computer parts, AI, Internet, Coding, Smart devices, Robots |
| 37–54 | 🔬 Science World | Purple | Solar system, Human body, Animals, Plants, Weather |
| 55–72 | 🌍 Life Skills | Orange | Healthy habits, Good friendship, Helping at home, Emotions |
| 73–90 | 🌟 Master World | Cosmic blue | All topics mixed, harder puzzles |

Each world has its own solid background colour — no transparent elements. The screen fully changes when entering a new world, making it feel like a real adventure.

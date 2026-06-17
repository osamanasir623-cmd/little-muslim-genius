# Little Muslim Genius — MVP (React + Vite)

A bright, animated, **bilingual (English / اردو)** summer-learning web app for kids 3–7.
Every day mixes a Quran/Islamic activity with a computers/AI/data mini-game — all as play.

> This is a **front-end MVP**. It runs with no backend by saving progress to the
> browser. See **Scope** below for what's built and what the full master prompt
> still needs (cloud database, real payments, 90 days of content).

---

## Run it locally

You need [Node.js](https://nodejs.org) 18+.

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
```

Build and preview the production bundle:

```bash
npm run build    # outputs to /dist
npm run preview  # serve /dist locally
```

**Try it:** Sign up with any email + a 4-character password → pick a child →
tap the glowing **Day 1** → **Begin today** → play the mixed games → finish for a
confetti reward. Toggle 🇬🇧/🇵🇰 to switch language (Urdu flips to right-to-left),
and tap 🔊 to hear lines read aloud.

> The session timer is set to 60 minutes in `src/screens/Session.jsx`
> (`SESSION_MINUTES`). Lower it (e.g. to `1`) to test the full day-completion flow
> quickly. The day completes once every activity is done.

---

## Deploy

The repo includes config for both platforms; the build output is `/dist`.

**Vercel** — import the repo (or `vercel` CLI). `vercel.json` is already set:
build `npm run build`, output `dist`, with SPA rewrites.

**Netlify** — drag-and-drop the `dist` folder, or connect the repo.
`netlify.toml` sets build `npm run build`, publish `dist`, with SPA redirects.

`vite.config.js` uses `base: './'` so the build also works from a plain file path
or any sub-path.

---

## What's inside

```
src/
  data/        strings.js (EN/UR)  content.js (worlds + days)  storage.js
  context/     AppContext.jsx  — profiles, progress, rewards, language
  hooks/       useSpeech.js    — Web Speech listen-aloud (en-US / ur-PK)
  components/  ui.jsx          — Sky, Mascot, Confetti, ProgressRing, sounds
  games/       index.jsx       — Quran Star, Names match, Binary lights, Quiz
  screens/     Login, ProfilePicker, DayMap, Session, Rewards
```

Built from the master prompt:

- Bright magical-night UI with candy gradients, mascots (🌟⚡🧠🦉), twinkling
  stars, drifting clouds, glowing moon, confetti, sound effects (with mute).
- Netflix-style profile picker; age sets the tier (Little Star / Moon Explorer /
  Space Scholar).
- Illustrated adventure day-map with locked / today / done states.
- Daily session with a visible animated timer ring and a mixed set of games.
- Quran shown in Arabic (Amiri Quran) + Urdu (Noto Nastaliq, RTL) + English.
- Rewards: stars ⭐, tasbih beads 📿, badges 🏅.
- Fully bilingual with listen-aloud in both languages.

---

## Scope — built vs. still needed

**Built (this MVP):** the full child experience and UI, bilingual + audio,
profiles, day-map, timer, four working games, rewards, and a storage layer.

**Not yet built (needs a backend + more time):**

- **Cloud database** — progress currently saves to `localStorage` on one device.
  The master prompt requires server storage so progress follows the child across
  devices. `src/data/storage.js` is the single swap point: replace `load()`/`save()`
  with `fetch()` calls to a REST API (Node/Express + PostgreSQL or MongoDB) and
  nothing else changes.
- **Real authentication** — signup/login here is a demo (no password check, no
  JWT). Production needs bcrypt, JWT sessions, and password reset email.
- **Payments** — JazzCash / EasyPaisa / Stripe and the Rs. 1,000 unlock + free-trial
  gating are not wired; they need server-side webhooks.
- **Full content** — 3 sample days are included to prove the "mixed every day"
  loop. The full 90 days across all 5 worlds would come from a CMS/API.
- **Parent analytics dashboard** and calendar-based daily unlock.

If you'd like, the natural next step is the backend: an Express API with the
schema from the prompt (users / profiles / progress / rewards / payments) that
this front-end can talk to with almost no changes.

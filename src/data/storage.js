/* Storage abstraction.
 *
 * Swap each function body with fetch() to your REST API when adding backend:
 *   GET /api/state  → load()   PUT /api/state  → save()
 * The rest of the app does not change.
 */

const KEY = 'lmg_state_v2';

export const PROGRESS_DEFAULTS = {
  day: 1,
  completedDays: [],
  stars: 0,
  beads: 0,
  badges: 0,
  stickers: 0,
  loginStreak: 0,
  lastLoginDate: null,      // YYYY-MM-DD  – for streak calculation
  lastCompletedDate: null,  // YYYY-MM-DD  – for calendar day-unlock
};

const seed = {
  account: null,       // { email }
  language: 'en',
  muted: false,
  currentProfileId: null,
  profiles: [],        // [{ id, name, avatar, age }]
  progress: {},        // keyed by profileId: PROGRESS_DEFAULTS shape
  payment: {
    status: 'trial',   // 'trial' | 'paid'
    paidAt: null,
    method: null,      // 'jazzcash' | 'easypaisa' | 'stripe'
  },
  timerState: {},      // { [`${profileId}_${dayNum}`]: secondsLeft }
};

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...seed, ...JSON.parse(raw) } : { ...seed };
  } catch {
    return { ...seed };
  }
}

export function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore quota / private-mode errors */
  }
}

export function clear() {
  try { localStorage.removeItem(KEY); } catch {}
}

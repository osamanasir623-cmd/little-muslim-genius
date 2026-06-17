import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { STRINGS } from '../data/strings.js';
import * as storage from '../data/storage.js';
import api from '../services/api.js';

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

export const AVATARS = ['🐣', '🌙', '🚀', '🦊', '🐬', '🦄', '🐻', '🐝', '🐯', '🦁', '🐸', '🌺'];

function today() {
  return new Date().toISOString().slice(0, 10);
}

function yesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

// Map backend /user/me response → frontend state shape
// Backend sends camelCase keys in profileData; payment is a separate top-level key
function serverToState({ user, profiles = [], profileData = {}, payment }) {
  const progress = {};
  const timerState = {};

  for (const [pid, pd] of Object.entries(profileData)) {
    progress[pid] = {
      day:               pd.currentDay          ?? 1,
      completedDays:     pd.completedDays       ?? [],
      stars:             pd.stars               ?? 0,
      beads:             pd.beads               ?? 0,
      badges:            pd.badges              ?? 0,
      stickers:          pd.stickers            ?? 0,
      loginStreak:       pd.loginStreak         ?? 0,
      lastLoginDate:     pd.lastLoginDate       ?? null,
      lastCompletedDate: pd.lastCompletedDate   ?? null,
    };
    for (const [dayNum, secs] of Object.entries(pd.timerState ?? {})) {
      timerState[`${pid}_${dayNum}`] = secs;
    }
  }

  return {
    account:  { email: user.email, isAdmin: user.isAdmin ?? false },
    language: user.language ?? 'en',
    muted:    user.muted    ?? false,
    profiles: profiles.map((p) => ({ id: p.id, name: p.name, avatar: p.avatar, age: p.age })),
    progress,
    timerState,
    payment: {
      status: payment?.status ?? 'trial',
      paidAt: payment?.paidAt ?? null,
      method: payment?.method ?? null,
    },
  };
}

export function AppProvider({ children }) {
  const [state, setState]       = useState(storage.load);
  const [bootstrapped, setBootstrapped] = useState(false);
  const [days, setDays]         = useState([]);
  const [daysLoaded, setDaysLoaded] = useState(false);

  // Persist every state change to localStorage (offline cache)
  useEffect(() => { storage.save(state); }, [state]);

  // On mount: load days from API (public endpoint) + validate JWT
  useEffect(() => {
    // Fetch content regardless of auth state
    api.get('/content/days')
      .then(({ data }) => setDays(data))
      .catch(() => {}) // fall back to empty — DayMap shows loading state
      .finally(() => setDaysLoaded(true));

    const token = localStorage.getItem('lmg_token');
    if (!token) { setBootstrapped(true); return; }

    api.get('/user/me')
      .then(({ data }) => {
        setState((s) => ({
          ...s,
          ...serverToState(data),
          currentProfileId: s.currentProfileId,
        }));
      })
      .catch(() => {})
      .finally(() => setBootstrapped(true));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const lang = state.language;
  const t = useCallback((k) => STRINGS[lang]?.[k] ?? STRINGS.en[k] ?? k, [lang]);

  const update = useCallback((patch) => {
    setState((s) => (typeof patch === 'function' ? patch(s) : { ...s, ...patch }));
  }, []);

  // ── auth ──────────────────────────────────────────────────────────
  const signup = useCallback(async (email, password) => {
    const { data } = await api.post('/auth/signup', { email, password });
    localStorage.setItem('lmg_token', data.token);
    setState((s) => ({ ...s, ...serverToState(data), currentProfileId: null }));
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('lmg_token', data.token);
    setState((s) => ({ ...s, ...serverToState(data), currentProfileId: s.currentProfileId }));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('lmg_token');
    storage.clear();
    setState(storage.load()); // returns seed with account: null
  }, []);

  const forgotPassword = useCallback(async (email) => {
    await api.post('/auth/forgot-password', { email });
  }, []);

  // ── profiles ──────────────────────────────────────────────────────
  const selectProfile = useCallback((id) => {
    if (!id) { update({ currentProfileId: null }); return; }
    update((s) => {
      const p = { ...storage.PROGRESS_DEFAULTS, ...(s.progress[id] ?? {}) };
      const td = today();
      const newStreak =
        p.lastLoginDate === td       ? p.loginStreak :
        p.lastLoginDate === yesterday() ? (p.loginStreak || 0) + 1 : 1;
      const newStickers = newStreak > (p.loginStreak || 0)
        ? (p.stickers || 0) + 1
        : (p.stickers || 0);
      return {
        ...s,
        currentProfileId: id,
        progress: {
          ...s.progress,
          [id]: { ...p, loginStreak: newStreak, lastLoginDate: td, stickers: newStickers },
        },
      };
    });
    api.put(`/profiles/${id}/login`).catch(() => {});
  }, [update]);

  const progressFor = useCallback((id) => {
    return { ...storage.PROGRESS_DEFAULTS, ...(state.progress[id] ?? {}) };
  }, [state.progress]);

  const createProfile = useCallback(async ({ name, age, avatar }) => {
    const { data } = await api.post('/profiles', { name, age, avatar });
    update((s) => ({
      ...s,
      profiles: [...s.profiles, { id: data.id, name: data.name, avatar: data.avatar, age: data.age, language_preference: data.languagePreference ?? 'en' }],
      progress: { ...s.progress, [data.id]: { ...storage.PROGRESS_DEFAULTS } },
    }));
    return data;
  }, [update]);

  const updateProfile = useCallback((id, patch) => {
    update((s) => ({
      ...s,
      profiles: s.profiles.map((p) => p.id === id ? { ...p, ...patch } : p),
    }));
    api.put(`/profiles/${id}`, patch).catch(() => {});
  }, [update]);

  // ── day availability ──────────────────────────────────────────────
  const isDayAvailable = useCallback((profileId, dayNum) => {
    const pr = { ...storage.PROGRESS_DEFAULTS, ...(state.progress[profileId] ?? {}) };
    if (pr.completedDays.includes(dayNum)) return true;
    if (dayNum === 1) return true;
    if (!pr.completedDays.includes(dayNum - 1)) return false;
    if (dayNum <= 3) return true;
    if (!pr.lastCompletedDate) return true;
    return pr.lastCompletedDate < today();
  }, [state.progress]);

  // ── rewards / completion ──────────────────────────────────────────
  const addRewards = useCallback((id, { stars = 0, beads = 0 }) => {
    update((s) => {
      const p = { ...storage.PROGRESS_DEFAULTS, ...(s.progress[id] ?? {}) };
      return {
        ...s,
        progress: { ...s.progress, [id]: { ...p, stars: p.stars + stars, beads: p.beads + beads } },
      };
    });
    api.post(`/progress/${id}/rewards`, { stars, beads }).catch(() => {});
  }, [update]);

  const completeDay = useCallback((id, dayNumber) => {
    update((s) => {
      const p = { ...storage.PROGRESS_DEFAULTS, ...(s.progress[id] ?? {}) };
      if (p.completedDays.includes(dayNumber)) return s;
      const completedDays = [...p.completedDays, dayNumber];
      return {
        ...s,
        progress: {
          ...s.progress,
          [id]: { ...p, completedDays, day: dayNumber + 1, badges: (p.badges || 0) + 1, lastCompletedDate: today() },
        },
      };
    });
    api.post(`/progress/${id}/complete`, { dayNumber, completedDate: today() }).catch(() => {});
  }, [update]);

  // ── payment ───────────────────────────────────────────────────────
  // Optimistic local update (used after JazzCash callback redirect)
  const markPaid = useCallback((method) => {
    update((s) => ({
      ...s,
      payment: { status: 'paid', paidAt: new Date().toISOString(), method },
    }));
  }, [update]);

  // Called after Stripe redirects back with ?payment=success&session_id=xxx
  const verifyStripePayment = useCallback(async (sessionId) => {
    await api.get(`/payments/verify?session_id=${sessionId}`);
    update((s) => ({
      ...s,
      payment: { status: 'paid', paidAt: new Date().toISOString(), method: 'stripe' },
    }));
  }, [update]);

  // ── timer state (for mid-session resume) ─────────────────────────
  const saveTimerState = useCallback((profileId, dayNum, secondsLeft) => {
    update((s) => ({
      ...s,
      timerState: { ...s.timerState, [`${profileId}_${dayNum}`]: secondsLeft },
    }));
    api.put(`/progress/${profileId}/timer`, { dayNumber: dayNum, secondsLeft }).catch(() => {});
  }, [update]);

  const getTimerState = useCallback((profileId, dayNum) => {
    return state.timerState?.[`${profileId}_${dayNum}`] ?? null;
  }, [state.timerState]);

  const clearTimerState = useCallback((profileId, dayNum) => {
    update((s) => {
      const ts = { ...s.timerState };
      delete ts[`${profileId}_${dayNum}`];
      return { ...s, timerState: ts };
    });
    api.delete(`/progress/${profileId}/timer/${dayNum}`).catch(() => {});
  }, [update]);

  // ── settings ──────────────────────────────────────────────────────
  const setLanguage = useCallback((l) => {
    update({ language: l });
    api.put('/user/settings', { language: l }).catch(() => {});
  }, [update]);

  const toggleMute = useCallback(() => {
    update((s) => {
      api.put('/user/settings', { muted: !s.muted }).catch(() => {});
      return { ...s, muted: !s.muted };
    });
  }, [update]);

  const value = useMemo(() => ({
    state, update, t, lang, bootstrapped,
    days, daysLoaded,
    setLanguage, toggleMute,
    signup, login, logout, forgotPassword,
    selectProfile, progressFor, addRewards, completeDay,
    markPaid, verifyStripePayment,
    saveTimerState, getTimerState, clearTimerState,
    isDayAvailable, createProfile, updateProfile,
    currentProfile: state.profiles.find((p) => p.id === state.currentProfileId) || null,
    payment: state.payment,
    AVATARS,
  }), [state, update, t, lang, bootstrapped,
      days, daysLoaded,
      setLanguage, toggleMute,
      signup, login, logout, forgotPassword,
      selectProfile, progressFor, addRewards, completeDay,
      markPaid, verifyStripePayment,
      saveTimerState, getTimerState, clearTimerState,
      isDayAvailable, createProfile, updateProfile]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

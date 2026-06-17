import { useCallback } from 'react';
import { useApp } from '../context/AppContext.jsx';

// Reads text aloud using the browser's Web Speech API.
// English → en-US, Urdu → ur-PK (falls back to default voice if unavailable).
export function useSpeech() {
  const { state } = useApp();

  const speak = useCallback((text, lang = 'en') => {
    if (state.muted) return;
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === 'ur' ? 'ur-PK' : 'en-US';
      u.rate = lang === 'ur' ? 0.85 : 0.95;
      u.pitch = 1.05;
      const voices = window.speechSynthesis.getVoices();
      const match = voices.find((v) => v.lang === u.lang) || voices.find((v) => v.lang.startsWith(lang === 'ur' ? 'ur' : 'en'));
      if (match) u.voice = match;
      window.speechSynthesis.speak(u);
    } catch {
      /* speech not supported */
    }
  }, [state.muted]);

  return speak;
}

import { useState, useEffect, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  type WormState,
  type WormStage,
  MOOD_DECAY_PER_MS,
  HUNGER_DECAY_PER_MS,
  SICK_THRESHOLD_MS,
  ADULT_XP_THRESHOLD,
  ELDER_XP_THRESHOLD,
  ADULT_AGE_MS,
  ELDER_AGE_MS,
} from '../types';

const STORAGE_KEY = 'worm_state_v1';
const TICK_INTERVAL_MS = 5000; // run decay tick every 5s client-side

// ── Stage computation ─────────────────────────────────────────────

function computeStage(xp: number, createdAt: number): WormStage {
  const age = Date.now() - createdAt;
  if (xp >= ELDER_XP_THRESHOLD && age >= ELDER_AGE_MS) return 'elder';
  if (xp >= ADULT_XP_THRESHOLD && age >= ADULT_AGE_MS) return 'adult';
  return 'baby';
}

// ── Accumulated decay since lastChecked ───────────────────────────

function applyDecay(state: WormState, now: number): WormState {
  const elapsed = now - state.lastChecked;
  if (elapsed <= 0) return state;

  const hungerDrop = elapsed * HUNGER_DECAY_PER_MS;
  const newHunger  = Math.max(0, state.hunger - hungerDrop);

  // Double mood decay when hunger < 30
  const moodMultiplier = newHunger < 30 ? 2 : 1;
  const moodDrop       = elapsed * MOOD_DECAY_PER_MS * moodMultiplier;
  const newMood        = Math.max(0, state.mood - moodDrop);

  // Sickness: if mood < 20 for 4+ consecutive hours
  let lowMoodSince = state.lowMoodSince;
  if (newMood < 20) {
    if (lowMoodSince === null) lowMoodSince = state.lastChecked;
  } else {
    lowMoodSince = null;
  }
  const isSick =
    state.isSick ||
    (lowMoodSince !== null && now - lowMoodSince >= SICK_THRESHOLD_MS);

  const newStage = computeStage(state.xp, state.createdAt);

  // Auto-equip top hat at elder stage
  let hat = state.hat;
  if (newStage === 'elder' && hat === 'none') hat = 'tophat';

  return { ...state, mood: newMood, hunger: newHunger, isSick, lowMoodSince, stage: newStage, hat, lastChecked: now };
}

// ── Streak tracking ───────────────────────────────────────────────

function updateStreak(state: WormState): WormState {
  const today = new Date().toISOString().slice(0, 10);
  if (state.lastLoginDay === today) return state;

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const newStreak = state.lastLoginDay === yesterday ? state.loginStreak + 1 : 1;

  return { ...state, lastLoginDay: today, loginStreak: newStreak };
}

// ── Fresh worm factory ────────────────────────────────────────────

function makeFreshWorm(token: string): WormState {
  const now = Date.now();
  return {
    id: uuidv4(),
    token,
    name: 'mystery worm',
    color: 'blue',
    hat: 'none',
    shades: 'none',
    trait: 'chill',
    stage: 'baby',
    mood: 80,
    hunger: 75,
    isSick: false,
    xp: 0,
    createdAt: now,
    lastChecked: now,
    lowMoodSince: null,
    feedCount: 0,
    gameCount: 0,
    loginStreak: 1,
    lastLoginDay: new Date().toISOString().slice(0, 10),
  };
}

// ── Hook ──────────────────────────────────────────────────────────

export function useWorm(token: string | null) {
  const [worm, setWorm] = useState<WormState | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load or create worm on mount / token change
  useEffect(() => {
    if (!token) { setWorm(null); return; }

    const raw = localStorage.getItem(STORAGE_KEY);
    let state: WormState | null = null;

    if (raw) {
      try {
        const parsed: WormState = JSON.parse(raw);
        if (parsed.token === token) state = parsed;
      } catch { /* corrupt storage */ }
    }

    if (!state) state = makeFreshWorm(token);

    // Apply accumulated offline decay + streak
    const now = Date.now();
    state = applyDecay(state, now);
    state = updateStreak(state);

    setWorm(state);
  }, [token]);

  // Persist whenever worm changes
  useEffect(() => {
    if (worm) localStorage.setItem(STORAGE_KEY, JSON.stringify(worm));
  }, [worm]);

  // Periodic live decay tick
  useEffect(() => {
    if (!worm) return;
    tickRef.current = setInterval(() => {
      setWorm((prev) => prev ? applyDecay(prev, Date.now()) : prev);
    }, TICK_INTERVAL_MS);
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [!!worm]); // only restart when worm presence changes

  // ── Actions ─────────────────────────────────────────────────────

  const clamp = (n: number) => Math.min(100, Math.max(0, n));

  const feed = useCallback(() => {
    setWorm((prev) => {
      if (!prev) return prev;
      const updated: WormState = {
        ...prev,
        hunger: clamp(prev.hunger + 30),
        mood:   clamp(prev.mood   + 5),
        xp:     prev.xp + 2,
        feedCount: prev.feedCount + 1,
      };
      // Newsboy milestone: feed 50 times
      if (updated.feedCount >= 50 && updated.hat === 'none') updated.hat = 'newsboy';
      return updated;
    });
  }, []);

  const cuddle = useCallback(() => {
    setWorm((prev) => {
      if (!prev) return prev;
      return { ...prev, mood: clamp(prev.mood + 20), xp: prev.xp + 3 };
    });
  }, []);

  const completeGame = useCallback((xpGained: number, moodBoost: number) => {
    setWorm((prev) => {
      if (!prev) return prev;
      const updated: WormState = {
        ...prev,
        mood:      clamp(prev.mood + moodBoost),
        xp:        prev.xp + xpGained,
        gameCount: prev.gameCount + 1,
        stage:     computeStage(prev.xp + xpGained, prev.createdAt),
      };
      if (updated.gameCount >= 10 && updated.shades === 'none') updated.shades = 'sunglasses2';
      if (updated.stage === 'elder' && updated.hat === 'none') updated.hat = 'tophat';
      return updated;
    });
  }, []);

  const heal = useCallback(() => {
    setWorm((prev) => {
      if (!prev || !prev.isSick) return prev;
      return { ...prev, isSick: false, mood: clamp(prev.mood + 30), lowMoodSince: null };
    });
  }, []);

  return { worm, feed, cuddle, completeGame, heal };
}

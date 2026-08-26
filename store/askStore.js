'use client'

import { create } from 'zustand'

/**
 * State for the hero "Ask Veloce" widget. Held in Zustand so the current
 * question and a short in-session history survive across component renders
 * and any future page moves.
 *
 * Kept small on purpose: this is UI state, not server state. Answers
 * themselves are cached by TanStack Query.
 */
export const useAskStore = create((set) => ({
  question: '',
  lastAnswer: null,
  history: [],

  setQuestion: (q) => set({ question: q }),

  setAnswer: (q, a) =>
    set((state) => ({
      lastAnswer: { q, a },
      history: [{ q, a }, ...state.history.filter((h) => h.q !== q)].slice(0, 5),
    })),

  reset: () => set({ question: '', lastAnswer: null }),
}))

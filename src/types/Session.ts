import type { CounterCombo, QuestionResult, Sentence } from '@/types/Sentence'

export type QuizMode = 'free-input' | 'multiple-choice' | 'counter-choice' | 'burst'

export interface SessionConfig {
  mode: QuizMode
  selectedCounterIds: string[]
  numberRange: [number, number]   // ex: [1, 10]
  includeNan: boolean
}

export interface QuizSession extends SessionConfig {
  sentences: Sentence[]
  currentIndex: number
  results: QuestionResult[]
}

// État dédié au mode rafale (timer + score en temps réel)
export interface BurstSession {
  mode: 'burst'
  selectedCounterIds: string[]
  numberRange: [number, number]
  includeNan: boolean
  combos: CounterCombo[]        // file de combos pré-générés
  currentIndex: number
  correctCount: number
  errorCount: number          // erreurs + skips
  durationSeconds: number       // toujours 30
  timeRemaining: number         // décompte en secondes
  isRunning: boolean
}

export interface UserSettings {
  locale: 'fr' | 'en' | 'ja'
  showHiragana: boolean
  hintsEnabled: boolean
  autoPlayAudio: boolean      // lecture auto à l'apparition de chaque question
}

import type { Counter, CounterNumber, Noun } from '@/types/Counter'

// Résultat intermédiaire d'une saisie (état en cours de question)
export type AnswerResult = 'correct' | 'soft-error' | 'incorrect'

// Résultat final d'une question (stocké dans QuizSession.results)
export interface QuestionResult {
  answeredCorrectly: boolean
  hintUsed: boolean
  softErrorCount: number    // 0, 1, ou 2+ (≥2 → score nul même si correct)
  score: number             // 0 | 0.25 | 0.5 | 1
}
// Règles de scoring :
//   answeredCorrectly=false OU softErrorCount > 1  → 0
//   hintUsed && softErrorCount === 1               → 0.25
//   hintUsed XOR softErrorCount === 1              → 0.5
//   ni hint, ni soft error                         → 1

export interface Sentence {
  display: string             // phrase complète : '猫が3匹います'
  counterDisplay: string      // fragment mis en évidence : '3匹' ou 'とお'
  number: CounterNumber
  counter: Counter
  noun: Noun
  correctAnswers: string[]    // hiragana acceptés, ex: ['さんびき']
  softErrors: string[]        // hiragana déclenchant le hint doux
  softErrorHint?: string      // clé i18n
}

// Utilisé en mode rafale uniquement : pas de phrase, pas de nom
export interface CounterCombo {
  counterDisplay: string      // '3匹', 'とお'
  number: CounterNumber
  counter: Counter
  correctAnswers: string[]    // hiragana acceptés
}

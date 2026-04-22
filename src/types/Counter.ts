export type CounterNumber = number | 'nan'

export interface Reading {
  pronunciations: string[]    // réponses correctes en hiragana
  softErrors: string[]        // réponses proches en hiragana
  softErrorHint?: string      // clé i18n du message d'aide
  writing?: string            // écriture spéciale si ≠ concaténation standard (ex: 'とお')
}

export type CounterReadings = Partial<Record<CounterNumber, Reading>>

export interface Noun {
  writing: string             // kanji ou kana : '猫', 'りんご'
  reading: string             // hiragana : 'ねこ'
  translations: {
    fr: string
    en: string
    ja: string
  }
}

export interface SentencePattern {
  template: string            // ex: '{noun}が{counter}います'
  // {noun}    → noun.writing
  // {counter} → counterDisplay (bloc nombre+compteur résolu)
}

export interface Counter {
  id: string
  writing: string
  defaultReading: string
  nouns: Noun[]
  sentencePatterns: SentencePattern[]
  particularReadings: CounterReadings
}

export type CountersData = Record<string, Counter>

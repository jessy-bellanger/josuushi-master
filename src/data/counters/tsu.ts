import type { Counter } from '@/types/Counter'

// つ — compteur wa-go pour les objets généraux (1 à 10 seulement)
// 7つ = ななつ est régulier (なな + つ) et n'a pas de particularReading
const tsu: Counter = {
  id: 'tsu',
  writing: 'つ',
  defaultReading: 'つ',
  nouns: [
    {
      writing: 'りんご',
      reading: 'りんご',
      translations: { fr: 'pomme', en: 'apple', ja: 'りんご' },
    },
    {
      writing: 'みかん',
      reading: 'みかん',
      translations: { fr: 'mandarine', en: 'mandarin', ja: 'みかん' },
    },
    {
      writing: 'たまご',
      reading: 'たまご',
      translations: { fr: 'œuf', en: 'egg', ja: 'たまご' },
    },
    {
      writing: 'おにぎり',
      reading: 'おにぎり',
      translations: { fr: 'boulette de riz', en: 'rice ball', ja: 'おにぎり' },
    },
    {
      writing: 'いちご',
      reading: 'いちご',
      translations: { fr: 'fraise', en: 'strawberry', ja: 'いちご' },
    },
    {
      writing: 'クッキー',
      reading: 'くっきー',
      translations: { fr: 'biscuit', en: 'cookie', ja: 'クッキー' },
    },
    {
      writing: 'バナナ',
      reading: 'ばなな',
      translations: { fr: 'banane', en: 'banana', ja: 'バナナ' },
    },
  ],
  sentencePatterns: [
    { template: '{noun}が{counter}あります' },
    { template: '{counter}の{noun}を食べました' },
    { template: '{noun}を{counter}ください' },
    { template: 'テーブルの上に{noun}が{counter}あります' },
  ],
  particularReadings: {
    1:   { pronunciations: ['ひとつ'],   softErrors: ['いちつ'] },
    2:   { pronunciations: ['ふたつ'],   softErrors: ['につ'] },
    3:   { pronunciations: ['みっつ'],   softErrors: ['さんつ', 'みつ'] },
    4:   { pronunciations: ['よっつ'],   softErrors: ['よんつ', 'よつ'] },
    5:   { pronunciations: ['いつつ'],   softErrors: ['ごつ'] },
    6:   { pronunciations: ['むっつ'],   softErrors: ['ろくつ', 'むつ'] },
    8:   { pronunciations: ['やっつ'],   softErrors: ['はちつ', 'やつ'] },
    9:   { pronunciations: ['ここのつ'], softErrors: ['きゅうつ'] },
    10:  { pronunciations: ['とお'],     softErrors: ['じゅうつ', 'とう', 'とー'], writing: 'とお' },
    nan: { pronunciations: ['いくつ'],   softErrors: ['なんつ'],                  writing: 'いくつ' },
  },
}

export default tsu

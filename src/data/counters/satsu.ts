import type { Counter } from '@/types/Counter'

// 冊 (さつ) — livres, cahiers, magazines
const satsu: Counter = {
  id: 'satsu',
  writing: '冊',
  roleKey: 'counter.role.satsu',
  defaultReading: 'さつ',
  nouns: [
    {
      writing: '本',
      reading: 'ほん',
      translations: { fr: 'livre', en: 'book', ja: 'ほん' },
    },
    {
      writing: 'ノート',
      reading: 'のーと',
      translations: { fr: 'cahier', en: 'notebook', ja: 'ノート' },
    },
    {
      writing: '雑誌',
      reading: 'ざっし',
      translations: { fr: 'magazine', en: 'magazine', ja: 'ざっし' },
    },
    {
      writing: '漫画',
      reading: 'まんが',
      translations: { fr: 'manga', en: 'manga', ja: 'まんが' },
    },
    {
      writing: '辞書',
      reading: 'じしょ',
      translations: { fr: 'dictionnaire', en: 'dictionary', ja: 'じしょ' },
    },
    {
      writing: '教科書',
      reading: 'きょうかしょ',
      translations: { fr: 'manuel scolaire', en: 'textbook', ja: 'きょうかしょ' },
    },
  ],
  sentencePatterns: [
    { template: '{noun}を{counter}読みました' },
    { template: '本棚に{noun}が{counter}あります' },
    { template: '{noun}を{counter}買いました' },
    { template: '{noun}を{counter}持っています' },
  ],
  particularReadings: {
    1: { pronunciations: ['いっさつ'], softErrors: ['いちさつ'] },
    8: { pronunciations: ['はっさつ'], softErrors: ['はちさつ'] },
    10: { pronunciations: ['じゅっさつ'], softErrors: ['じゅうさつ'] },
  },
}

export default satsu

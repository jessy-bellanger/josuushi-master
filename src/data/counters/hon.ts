import type { Counter } from '@/types/Counter'

// 本 (ほん) — objets longs et fins (crayons, bouteilles, arbres…)
const hon: Counter = {
  id: 'hon',
  writing: '本',
  roleKey: 'counter.role.hon',
  defaultReading: 'ほん',
  nouns: [
    {
      writing: 'えんぴつ',
      reading: 'えんぴつ',
      translations: { fr: 'crayon', en: 'pencil', ja: 'えんぴつ' },
    },
    {
      writing: 'ボールペン',
      reading: 'ぼーるぺん',
      translations: { fr: 'stylo bille', en: 'ballpoint pen', ja: 'ボールペン' },
    },
    {
      writing: 'ビール',
      reading: 'びーる',
      translations: { fr: 'bière', en: 'beer', ja: 'ビール' },
    },
    {
      writing: '傘',
      reading: 'かさ',
      translations: { fr: 'parapluie', en: 'umbrella', ja: 'かさ' },
    },
    {
      writing: 'ロウソク',
      reading: 'ろうそく',
      translations: { fr: 'bougie', en: 'candle', ja: 'ろうそく' },
    },
    {
      writing: 'ストロー',
      reading: 'すとろー',
      translations: { fr: 'paille', en: 'straw', ja: 'ストロー' },
    },
    {
      writing: 'バット',
      reading: 'ばっと',
      translations: { fr: 'batte de baseball', en: 'baseball bat', ja: 'バット' },
    },
  ],
  sentencePatterns: [
    { template: '{noun}が{counter}あります' },
    { template: '{noun}を{counter}買いました' },
    { template: '{noun}を{counter}持っています' },
    { template: '机の上に{noun}が{counter}あります' },
  ],
  particularReadings: {
    1: { pronunciations: ['いっぽん'], softErrors: ['いちほん'] },
    3: { pronunciations: ['さんぼん'], softErrors: ['さんほん'] },
    6: { pronunciations: ['ろっぽん'], softErrors: ['ろくほん', 'ろくぽん'] },
    8: { pronunciations: ['はっぽん'], softErrors: ['はちほん', 'はちぽん'] },
    10: { pronunciations: ['じゅっぽん'], softErrors: ['じゅうほん', 'じゅうぽん'] },
    nan: { pronunciations: ['なんぼん'], softErrors: ['なんほん'] },
  },
}

export default hon

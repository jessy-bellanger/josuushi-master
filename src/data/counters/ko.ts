import type { Counter } from '@/types/Counter'

// 個 (こ) — petits objets compacts
const ko: Counter = {
  id: 'ko',
  writing: '個',
  defaultReading: 'こ',
  nouns: [
    {
      writing: 'みかん',
      reading: 'みかん',
      translations: { fr: 'mandarine', en: 'mandarin', ja: 'みかん' },
    },
    {
      writing: 'チョコレート',
      reading: 'ちょこれーと',
      translations: { fr: 'chocolat', en: 'chocolate', ja: 'チョコレート' },
    },
    {
      writing: 'コイン',
      reading: 'こいん',
      translations: { fr: 'pièce de monnaie', en: 'coin', ja: 'コイン' },
    },
    {
      writing: 'ボタン',
      reading: 'ぼたん',
      translations: { fr: 'bouton', en: 'button', ja: 'ボタン' },
    },
    {
      writing: '石',
      reading: 'いし',
      translations: { fr: 'pierre', en: 'stone', ja: 'いし' },
    },
    {
      writing: 'じゃがいも',
      reading: 'じゃがいも',
      translations: { fr: 'pomme de terre', en: 'potato', ja: 'じゃがいも' },
    },
    {
      writing: 'サイコロ',
      reading: 'さいころ',
      translations: { fr: 'dé à jouer', en: 'die', ja: 'さいころ' },
    },
    {
      writing: '飴',
      reading: 'あめ',
      translations: { fr: 'bonbon', en: 'candy', ja: 'あめ' },
    },
  ],
  sentencePatterns: [
    { template: '{noun}が{counter}あります' },
    { template: '{noun}を{counter}買いました' },
    { template: '袋の中に{noun}が{counter}入っています' },
    { template: '{noun}を{counter}食べました' },
  ],
  particularReadings: {
    1:  { pronunciations: ['いっこ'],   softErrors: ['いちこ'] },
    6:  { pronunciations: ['ろっこ'],   softErrors: ['ろくこ'] },
    8:  { pronunciations: ['はっこ'],   softErrors: ['はちこ'] },
    10: { pronunciations: ['じゅっこ'], softErrors: ['じゅうこ'] },
  },
}

export default ko

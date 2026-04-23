import type { Counter } from '@/types/Counter'

// 匹 (ひき) — petits animaux (mammifères, poissons, insectes…)
const hiki: Counter = {
  id: 'hiki',
  writing: '匹',
  roleKey: 'counter.role.hiki',
  defaultReading: 'ひき',
  nouns: [
    {
      writing: '猫',
      reading: 'ねこ',
      translations: { fr: 'chat', en: 'cat', ja: 'ねこ' },
    },
    {
      writing: '犬',
      reading: 'いぬ',
      translations: { fr: 'chien', en: 'dog', ja: 'いぬ' },
    },
    {
      writing: '魚',
      reading: 'さかな',
      translations: { fr: 'poisson', en: 'fish', ja: 'さかな' },
    },
    {
      writing: '金魚',
      reading: 'きんぎょ',
      translations: { fr: 'poisson rouge', en: 'goldfish', ja: 'きんぎょ' },
    },
    {
      writing: 'ウサギ',
      reading: 'うさぎ',
      translations: { fr: 'lapin', en: 'rabbit', ja: 'うさぎ' },
    },
    {
      writing: 'カエル',
      reading: 'かえる',
      translations: { fr: 'grenouille', en: 'frog', ja: 'かえる' },
    },
    {
      writing: '虫',
      reading: 'むし',
      translations: { fr: 'insecte', en: 'insect', ja: 'むし' },
    },
    {
      writing: 'ハムスター',
      reading: 'はむすたー',
      translations: { fr: 'hamster', en: 'hamster', ja: 'ハムスター' },
    },
  ],
  sentencePatterns: [
    { template: '{noun}が{counter}います' },
    { template: '{counter}の{noun}を飼っています' },
    { template: '庭で{noun}を{counter}見ました' },
    { template: '池に{noun}が{counter}います' },
  ],
  particularReadings: {
    1: { pronunciations: ['いっぴき'], softErrors: ['いちひき'] },
    3: { pronunciations: ['さんびき'], softErrors: ['さんひき', 'さんぴき'] },
    6: { pronunciations: ['ろっぴき'], softErrors: ['ろくひき', 'ろくぴき'] },
    8: { pronunciations: ['はっぴき'], softErrors: ['はちひき', 'はちぴき'] },
    10: { pronunciations: ['じゅっぴき'], softErrors: ['じゅうひき', 'じゅうぴき'] },
    nan: { pronunciations: ['なんびき'], softErrors: ['なんひき', 'なんぴき'] },
  },
}

export default hiki

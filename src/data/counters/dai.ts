import type { Counter } from '@/types/Counter'

// 台 (だい) — machines, appareils, véhicules
// Entièrement régulier : aucun particularReading nécessaire
const dai: Counter = {
  id: 'dai',
  writing: '台',
  roleKey: 'counter.role.dai',
  defaultReading: 'だい',
  nouns: [
    {
      writing: '車',
      reading: 'くるま',
      translations: { fr: 'voiture', en: 'car', ja: 'くるま' },
    },
    {
      writing: 'テレビ',
      reading: 'てれび',
      translations: { fr: 'télévision', en: 'TV', ja: 'テレビ' },
    },
    {
      writing: '洗濯機',
      reading: 'せんたくき',
      translations: { fr: 'machine à laver', en: 'washing machine', ja: 'せんたくき' },
    },
    {
      writing: '冷蔵庫',
      reading: 'れいぞうこ',
      translations: { fr: 'réfrigérateur', en: 'refrigerator', ja: 'れいぞうこ' },
    },
    {
      writing: 'パソコン',
      reading: 'ぱそこん',
      translations: { fr: 'ordinateur', en: 'computer', ja: 'パソコン' },
    },
    {
      writing: '自転車',
      reading: 'じてんしゃ',
      translations: { fr: 'vélo', en: 'bicycle', ja: 'じてんしゃ' },
    },
    {
      writing: 'バイク',
      reading: 'ばいく',
      translations: { fr: 'moto', en: 'motorcycle', ja: 'バイク' },
    },
  ],
  sentencePatterns: [
    { template: '{noun}が{counter}あります' },
    { template: '{noun}を{counter}買いました' },
    { template: '{noun}を{counter}持っています' },
    { template: '会社に{noun}が{counter}あります' },
  ],
  particularReadings: {},
}

export default dai

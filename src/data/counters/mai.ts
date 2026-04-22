import type { Counter } from '@/types/Counter'

// 枚 (まい) — objets plats (feuilles, vêtements, assiettes…)
// Entièrement régulier : aucun particularReading nécessaire
const mai: Counter = {
  id: 'mai',
  writing: '枚',
  defaultReading: 'まい',
  nouns: [
    {
      writing: '紙',
      reading: 'かみ',
      translations: { fr: 'feuille de papier', en: 'sheet of paper', ja: 'かみ' },
    },
    {
      writing: '皿',
      reading: 'さら',
      translations: { fr: 'assiette', en: 'plate', ja: 'さら' },
    },
    {
      writing: 'シャツ',
      reading: 'しゃつ',
      translations: { fr: 'chemise', en: 'shirt', ja: 'シャツ' },
    },
    {
      writing: '切手',
      reading: 'きって',
      translations: { fr: 'timbre', en: 'stamp', ja: 'きって' },
    },
    {
      writing: '写真',
      reading: 'しゃしん',
      translations: { fr: 'photo', en: 'photo', ja: 'しゃしん' },
    },
    {
      writing: 'タオル',
      reading: 'たおる',
      translations: { fr: 'serviette', en: 'towel', ja: 'タオル' },
    },
    {
      writing: 'チケット',
      reading: 'ちけっと',
      translations: { fr: 'billet', en: 'ticket', ja: 'チケット' },
    },
  ],
  sentencePatterns: [
    { template: '{noun}が{counter}あります' },
    { template: '{noun}を{counter}買いました' },
    { template: '{noun}を{counter}洗いました' },
    { template: '引き出しの中に{noun}が{counter}あります' },
  ],
  particularReadings: {},
}

export default mai

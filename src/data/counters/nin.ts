import type { Counter } from '@/types/Counter'

// 人 (にん/り) — personnes
// Irréguliers : 1→ひとり, 2→ふたり (wa-go), 4→よにん (よ et non よん)
// 7人 : ななにん ET しちにん sont tous deux acceptés
const nin: Counter = {
  id: 'nin',
  writing: '人',
  roleKey: 'counter.role.nin',
  defaultReading: 'にん',
  nouns: [
    {
      writing: '学生',
      reading: 'がくせい',
      translations: { fr: 'étudiant(e)', en: 'student', ja: 'がくせい' },
    },
    {
      writing: '先生',
      reading: 'せんせい',
      translations: { fr: 'professeur', en: 'teacher', ja: 'せんせい' },
    },
    {
      writing: '子供',
      reading: 'こども',
      translations: { fr: 'enfant', en: 'child', ja: 'こども' },
    },
    {
      writing: '友達',
      reading: 'ともだち',
      translations: { fr: 'ami(e)', en: 'friend', ja: 'ともだち' },
    },
    {
      writing: '客',
      reading: 'きゃく',
      translations: { fr: 'client / invité', en: 'customer / guest', ja: 'きゃく' },
    },
    {
      writing: '外国人',
      reading: 'がいこくじん',
      translations: { fr: 'étranger(e)', en: 'foreigner', ja: 'がいこくじん' },
    },
  ],
  sentencePatterns: [
    { template: '{noun}が{counter}います' },
    { template: '教室に{noun}が{counter}います' },
    { template: 'パーティーに{noun}が{counter}来ました' },
    { template: '{counter}の{noun}がいます' },
  ],
  particularReadings: {
    1: { pronunciations: ['ひとり'], softErrors: ['いちにん'] },
    2: { pronunciations: ['ふたり'], softErrors: ['ににん'] },
    4: { pronunciations: ['よにん'], softErrors: ['よんにん', 'しにん'] },
    7: { pronunciations: ['ななにん', 'しちにん'], softErrors: [] },
  },
}

export default nin

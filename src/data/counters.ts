import type { CountersData } from '../types/Counter.ts';

const counters: CountersData = {
  つ: {
    writing: 'つ',
    defaultReading: 'つ',
    hasHint: true,
    particularReadings: {
      1: {
        pronunciations: ['ひとつ'],
        softErrors: ['いちつ'],
      },
      2: {
        pronunciations: ['ふたつ'],
        softErrors: ['にいつ', 'につ'],
      },
      3: {
        pronunciations: ['みっつ'],
        softErrors: ['さんつ'],
      },
      4: {
        pronunciations: ['よっつ'],
        softErrors: ['よんつ', 'しつ'],
      },
      5: {
        pronunciations: ['いつつ'],
        softErrors: ['ごつ'],
      },
      6: {
        pronunciations: ['むっつ'],
        softErrors: ['ろくつ'],
      },
      7: {
        pronunciations: ['ななつ'],
        softErrors: ['しちつ'],
      },
      8: {
        pronunciations: ['やっつ'],
        softErrors: ['はちつ'],
      },
      9: {
        pronunciations: ['ここのつ'],
        softErrors: ['きゅうつ', 'くうつ'],
      },
      10: {
        writing: '十',
        pronunciations: ['とう'],
        softErrors: ['じゅっつ', 'じゅつ'],
      },
      nan: {
        pronunciations: ['いくつ'],
        softErrors: ['なんつ', 'なにつ'],
      },
    },
  },
  匹: {
    writing: '匹',
    defaultReading: 'ひき',
    hasHint: true,
    particularReadings: {
      1: {
        pronunciations: ['いっぴき'],
        softErrors: ['いちひき', 'ひとひき'],
      },
      2: {
        pronunciations: ['にひき'],
        softErrors: ['ふたたひき'],
      },
      3: {
        pronunciations: ['さんびき'],
        softErrors: ['さんひき'],
      },
      4: {
        pronunciations: ['よんひき'],
        softErrors: ['しひき'],
      },
      5: {
        pronunciations: ['ごひき'],
        softErrors: ['いつひき'],
      },
      6: {
        pronunciations: ['ろっぴき', 'ろくひき'],
        softErrors: [],
      },
      7: {
        pronunciations: ['ななひき', 'しちひき'],
        softErrors: [],
      },
      8: {
        pronunciations: ['はっぴき', 'はちひき'],
        softErrors: [],
      },
      9: {
        pronunciations: ['きゅうひき'],
        softErrors: ['くひき'],
      },
      10: {
        pronunciations: ['じっぴき', 'じゅっぴき'],
        softErrors: ['じゅうひき'],
      },
      100: {
        pronunciations: ['ひゃっぴき'],
        softErrors: ['ひゃくひき'],
      },
      1000: {
        pronunciations: ['せんびき'],
        softErrors: ['せんひき'],
      },
      10000: {
        pronunciations: ['いちまんびき'],
        softErrors: ['いちまんひき'],
      },
      nan: {
        pronunciations: ['なんびき'],
        softErrors: [],
      },
    },
  },
}

export default counters;

import type { CounterNumber } from '@/types/Counter'

export interface NumberEntry {
  reading: string     // hiragana : 'さん'
  display?: string    // affiché dans la phrase si ≠ chiffre arabe (ex: '何' pour nan)
}

export type NumberData = Partial<Record<CounterNumber, NumberEntry>>

const numbers: NumberData = {
  1:   { reading: 'いち' },
  2:   { reading: 'に' },
  3:   { reading: 'さん' },
  4:   { reading: 'よん' },
  5:   { reading: 'ご' },
  6:   { reading: 'ろく' },
  7:   { reading: 'なな' },
  8:   { reading: 'はち' },
  9:   { reading: 'きゅう' },
  10:  { reading: 'じゅう' },
  nan: { reading: 'なん', display: '何' },
}

export default numbers

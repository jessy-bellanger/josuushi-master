import type { CounterNumber } from '@/types/Counter.ts'

export interface Number {
  reading: string
}

export type NumberData = Partial<Record<CounterNumber, Number>>;


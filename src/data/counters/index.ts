import type { Counter } from '@/types/Counter'
import tsu from './tsu'
import ko from './ko'
import hiki from './hiki'
import hon from './hon'
import mai from './mai'
import satsu from './satsu'
import dai from './dai'
import nin from './nin'

const counters: Record<string, Counter> = {
  tsu,
  ko,
  hiki,
  hon,
  mai,
  satsu,
  dai,
  nin,
}

export default counters

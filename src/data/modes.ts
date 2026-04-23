import type { Mode } from '@/types/Mode.ts'

export default [
  {
    id: 'free-input',
    labelKey: 'mode.label.free-input',
    descriptionKey: 'mode.description.free-input',
  },
  {
    id: 'multiple-choice',
    labelKey: 'mode.label.multiple-choice',
    descriptionKey: 'mode.description.multiple-choice',
  },
  {
    id: 'counter-choice',
    labelKey: 'mode.label.counter-choice',
    descriptionKey: 'mode.description.counter-choice',
  },
  {
    id: 'burst',
    labelKey: 'mode.label.burst',
    descriptionKey: 'mode.description.burst',
  },
] as Mode[]

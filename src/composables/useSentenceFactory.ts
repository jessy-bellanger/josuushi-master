import counters from '@/data/counters.ts'
import { SingleWordSentence } from '@/models/SingleWordSentence.ts'
import type { Counter, CounterNumber } from '@/types/Counter.ts'

export function useSentenceFactory() {
  return {
    makeSingleWordSentence(number: CounterNumber, counter: string) {
      const foundCounter = counters[counter];

      if (!foundCounter) {
        throw new Error();
      }

      return new SingleWordSentence(counters[counter] as Counter, number);
    },
  }
}

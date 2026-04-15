import type { Counter, CounterKey } from '@/types/Counter.ts'
import numbers from '@/data/numbers.ts'


export class SingleWordSentence {
  public sentence: string;
  public hint: string;
  public correctAnswers: string[];
  public softErrors: string[];
  public softErrorHint: string | undefined;

  public constructor(counterData: Counter, number: CounterKey) {
    this.sentence = counterData.particularReadings[number]?.writing ?? (number + counterData.writing);
    this.hint = counterData.writing + ".hint";
    this.correctAnswers = counterData.particularReadings[number]?.pronunciations || [numbers[number]?.reading + counterData.defaultReading];
    this.softErrors = counterData.particularReadings[number]?.softErrors || [];
    this.softErrorHint = counterData.particularReadings[number]?.softErrorHint;
  }
}

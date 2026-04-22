export interface Reading {
  pronunciations: string[];
  softErrors: string[];
  softErrorHint?: string;
  writing?: string;
}

export type CounterReadings = Partial<Record<CounterNumber, Reading>>;

export type CounterNumber = number | 'nan';

export interface Counter {
  writing: string;
  defaultReading: string;
  hasHint: boolean;
  particularReadings: CounterReadings;
}

export type CountersData = Record<string, Counter>;

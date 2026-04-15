export interface Reading {
  pronunciations: string[];
  softErrors: string[];
  softErrorHint?: string;
  writing?: string;
}

export type CounterKey = number | 'nan';

export interface Counter {
  writing: string;
  defaultReading: string;
  hasHint: boolean;
  particularReadings: Partial<Record<CounterKey, Reading>>;
}

export type CountersData = Record<string, Counter>;

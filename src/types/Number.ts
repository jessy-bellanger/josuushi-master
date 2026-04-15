export interface Number {
  reading: string
}
export type NumberData = Partial<Record<number | 'nan', Number>>;


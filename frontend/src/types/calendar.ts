export type DateSelectMode = 'single' | 'range';

export type MonthStatus = 'prev' | 'current' | 'next';

export interface DateInfo {
  key: string;
  value: Date;
  status: MonthStatus;
}

export type MonthlyDays = {
  key: number;
  value: DateInfo[];
}[];

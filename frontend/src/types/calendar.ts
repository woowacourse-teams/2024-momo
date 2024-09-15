export type DateSelectMode = 'single' | 'range';

export type MonthStatus = 'prevMonth' | 'currentMonth' | 'nextMonth';

export interface DateInfo {
  key: string;
  value: Date;
  status: MonthStatus;
}

export type MonthlyDays = {
  key: number;
  value: DateInfo[];
}[];

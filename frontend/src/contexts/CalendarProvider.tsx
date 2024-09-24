import type { PropsWithChildren } from 'react';
import { createContext } from 'react';

import useCalendar from '@hooks/useCalendar/useCalendar';

type CalendarContextType = ReturnType<typeof useCalendar>;

export const CalendarContext = createContext<CalendarContextType | null>(null);

export default function CalendarProvider({ children }: PropsWithChildren) {
  const calendarData = useCalendar();

  return (
    <CalendarContext.Provider value={{ ...calendarData }}>{children}</CalendarContext.Provider>
  );
}

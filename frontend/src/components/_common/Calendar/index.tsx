import type { PropsWithChildren } from 'react';

import CalendarProvider from '@contexts/CalendarProvider';

import Body from './Body';
import { s_calendarContainer } from './Calendar.styles';
import { Header } from './Header';
import WeekDays from './Weekdays';

function CalendarMain({ children }: PropsWithChildren) {
  return (
    <CalendarProvider>
      <div css={s_calendarContainer}>{children}</div>
    </CalendarProvider>
  );
}

const Calendar = Object.assign(CalendarMain, { Header, WeekDays, Body });

export default Calendar;

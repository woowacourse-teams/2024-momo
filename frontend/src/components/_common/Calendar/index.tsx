import type { PropsWithChildren } from 'react';
// import 하지 않으면 스토리북에서 캘린더 컴포넌트가 렌더링 되지 않아 일단 추가(@해리)
import React from 'react';

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

const Calender = Object.assign(CalendarMain, { Header, WeekDays, Body });

export default Calender;

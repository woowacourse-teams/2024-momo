import { getHolidayNames } from '@hyunbinseo/holidays-kr';

import { getDate, getDay, getFullDate } from '@utils/date';

import CALENDAR_PROPERTIES from '@constants/calendar';
import { DAY_OF_WEEK_KR } from '@constants/date';

export const getDateInfo = (targetDate: Date, today: Date) => {
  const targetDateNumber = getDate(targetDate);
  const targetDayOfWeek = getDay(targetDate);
  const targetFullDate = getFullDate(targetDate);

  const todayFullDate = getFullDate(today);

  const holidayNames = getHolidayNames(targetDate);
  /*
  현재 사용하고 있는 라이브러리는 하루에 공휴일이 겹칠 수 있는 경우를 대비하기 위해서 string[] 형태로 공휴일들을 관리하고 있다.
  -> 그래서, 공휴일이 있는 경우 첫 번째 공휴일을 반환하도록 했다. 
  -> 네이버나 다른 서비스의 달력들을 참고했을 때 하루에 공휴일이 겹치는 경우 하나만 보여주는 것을 확인했다. 
  -> 여러개를 모두 보여주는 경우, 레이아웃이 달라질 수 있기 때문에 하나만 보여주는 것으로 결정. (@해리)
  */
  const formattedHolidayName = holidayNames ? holidayNames[0] : null;
  const isHoliday = formattedHolidayName !== null;
  const isSaturday = targetDayOfWeek === CALENDAR_PROPERTIES.saturdayNumber;
  const isSunday = targetDayOfWeek === CALENDAR_PROPERTIES.sundayNumber;
  const isPrevDate = targetFullDate < todayFullDate;
  const isToday = targetFullDate === todayFullDate;

  return {
    date: targetDateNumber,
    targetFullDate,
    targetDayOfWeekKR: DAY_OF_WEEK_KR[targetDayOfWeek],
    isHoliday,
    isToday,
    isSunday,
    isSaturday,
    isPrevDate,
    holidayName: formattedHolidayName,
  } as const;
};

import { getHolidayNames } from '@hyunbinseo/holidays-kr';

import { getDate, getDay, getFullDate } from '@utils/date';

import CALENDAR_PROPERTIES from '@constants/calendar';

export const getDateInfo = (date: Date, today: Date) => {
  const currentDate = getDate(date);
  const currentDay = getDay(date);

  const currentFullDate = getFullDate(date);
  const todayFullDate = getFullDate(today);

  const holidayName = getHolidayNames(date);
  /*
  현재 사용하고 있는 라이브러리는 하루에 공휴일이 겹칠 수 있는 경우를 대비하기 위해서 string[] 형태로 공휴일들을 관리하고 있다.
  -> 그래서, 공휴일이 있는 경우 첫 번째 공휴일을 반환하도록 했다. 
  -> 네이버나 다른 서비스의 달력들을 참고했을 때 하루에 공휴일이 겹치는 경우 하나만 보여주는 것을 확인했다. 
  -> 여러개를 모두 보여주는 경우, 레이아웃이 달라질 수 있기 때문에 하나만 보여주는 것으로 결정. (@해리)
  */
  const formattedHolidayName = holidayName ? holidayName[0] : null;
  const isHoliday = formattedHolidayName !== null;

  const isSaturday = currentDay === CALENDAR_PROPERTIES.saturdayNumber;
  const isSunday = currentDay === CALENDAR_PROPERTIES.sundayNumber;
  const isPrevDate = currentFullDate < todayFullDate;

  const isToday = currentFullDate === todayFullDate;

  return {
    date: currentDate,
    currentFullDate,
    isHoliday,
    isToday,
    isSunday,
    isSaturday,
    isPrevDate,
    holidayName: formattedHolidayName,
  } as const;
};

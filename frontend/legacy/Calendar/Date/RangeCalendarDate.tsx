import type { DateInfo } from '@hooks/useCalendarInfo/useCalendar.type';
import { getDateInfo2 } from '@hooks/useCalendarInfo/useCalendarInfo.utils';

import {
  s_baseDateButton,
  s_baseDaySlotText,
  s_dateContainer,
  s_daySlotText,
  s_holidayText,
  s_rangeDateButton,
  s_rangeEnd,
  s_rangeStart,
} from '../CalendarDate.styles';

interface RangeCalendarDateProps {
  dateInfo: DateInfo;
  hasDate: (date: string) => boolean;
  onDateClick: (date: string) => void;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isAllRangeSelected: boolean;
}

export default function RangeCalendarDate({
  dateInfo,
  hasDate,
  onDateClick,
  isRangeStart,
  isRangeEnd,
  isAllRangeSelected,
}: RangeCalendarDateProps) {
  const { key, value, status } = dateInfo;
  const {
    date,
    currentFullDate,
    isHoliday,
    isToday,
    isSaturday,
    isSunday,
    isPrevDate,
    holidayName,
  } = getDateInfo2(value, new Date());
  const isSelectedFullDate = hasDate(currentFullDate);

  return status === 'currentMonth' ? (
    <button
      key={key}
      onClick={() => onDateClick(currentFullDate)}
      disabled={isPrevDate}
      css={[
        s_dateContainer,
        s_baseDateButton,
        s_rangeDateButton(isSelectedFullDate),
        isRangeStart && s_rangeStart(isAllRangeSelected),
        isRangeEnd && s_rangeEnd(isAllRangeSelected),
        s_daySlotText({
          isSelectedFullDate,
          isPrevDate,
          isSunday,
          isSaturday,
          isHoliday,
          isToday,
        }),
      ]}
    >
      <span css={[s_baseDaySlotText]}>{date}</span>
      {isRangeStart && <span css={s_holidayText}>시작</span>}
      {isRangeEnd && <span css={s_holidayText}>끝</span>}
      {!isRangeStart && !isRangeEnd && <span css={s_holidayText}>{holidayName || '\u00A0'}</span>}
    </button>
  ) : (
    <div key={key} css={s_dateContainer}></div>
  );
}

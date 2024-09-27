import type { DateInfo } from '@hooks/useCalendarInfo/useCalendar.type';
import { getDateInfo2 } from '@hooks/useCalendarInfo/useCalendarInfo.utils';

import {
  s_baseDateButton,
  s_baseDaySlotText,
  s_dateContainer,
  s_daySlotText,
  s_holidayText,
  s_singleDateButton,
} from '../CalendarDate.styles';

interface SingleCalendarDateProps {
  dateInfo: DateInfo;
  hasDate: (date: string) => boolean;
  onDateClick: (date: string) => void;
}

export default function SingleCalendarDate({
  dateInfo,
  hasDate,
  onDateClick,
}: SingleCalendarDateProps) {
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
        s_singleDateButton(isSelectedFullDate),
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
      <span css={s_holidayText}>{holidayName || '\u00A0'}</span>
    </button>
  ) : (
    <div key={key} css={s_dateContainer}></div>
  );
}

import type { DateInfo } from 'types/calendar';

import {
  s_baseDateButton,
  s_baseDateText,
  s_dateContainer,
  s_dateText,
  s_singleDateButton,
} from './Date.styles';
import { getDateInfo } from './Date.utils';
import DateExtraInfo from './DateExtraInfo';

interface SingleCalendarDateProps {
  dateInfo: DateInfo;
  today: Date;
  hasDate: (date: string) => boolean;
  onDateClick: (date: string) => void;
}

export default function SingleDate({
  dateInfo,
  today,
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
  } = getDateInfo(value, today);
  const isSelectedDate = hasDate(currentFullDate);

  return status === 'currentMonth' ? (
    <button
      key={key}
      onClick={() => onDateClick(currentFullDate)}
      disabled={isPrevDate}
      css={[
        s_dateContainer,
        s_baseDateButton,
        s_singleDateButton(isSelectedDate),
        s_dateText({
          isSelectedDate,
          isPrevDate,
          isSunday,
          isSaturday,
          isHoliday,
          isToday,
        }),
      ]}
    >
      <span css={[s_baseDateText]}>{date}</span>
      <DateExtraInfo isToday={isToday} holidayName={holidayName} />
    </button>
  ) : (
    <div key={key} css={s_dateContainer}></div>
  );
}

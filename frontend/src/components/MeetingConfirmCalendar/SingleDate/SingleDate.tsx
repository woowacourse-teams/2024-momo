import type { DateInfo } from 'types/calendar';

import {
  s_baseDateButton,
  s_baseDateText,
  s_dateContainer,
  s_dateText,
  s_singleDateButton,
} from '@components/MeetingCalendar/Date/Date.styles';
import { getDateInfo } from '@components/MeetingCalendar/Date/Date.utils';

import Check from '@assets/images/attendeeCheck.svg';

import { s_additionalText } from './SingleDate.styles';

interface DateProps {
  dateInfo: DateInfo;
  today: Date;
  isAvailable: boolean;
  hasDate: (date: string) => boolean;
  onDateClick: (date: string) => void;
}

export default function SingleDate({
  dateInfo,
  today,
  isAvailable,
  hasDate,
  onDateClick,
}: DateProps) {
  const { value, status } = dateInfo;
  const { date, targetFullDate, isHoliday, isToday, isSaturday, isSunday, isPrevDate } =
    getDateInfo(value, today);

  const isSelectedDate = hasDate(targetFullDate);

  return status === 'current' ? (
    <button
      onClick={() => onDateClick(targetFullDate)}
      disabled={!isAvailable || isPrevDate}
      css={[
        s_dateContainer,
        s_baseDateButton,
        s_singleDateButton(isSelectedDate),
        s_dateText({
          isDisabledDate: !isAvailable || isPrevDate,
          isSelectedDate,
          isToday,
          isHoliday,
          isSunday,
          isSaturday,
        }),
      ]}
    >
      <span css={s_baseDateText}>{date}</span>
      <span css={s_additionalText}>
        {isSelectedDate ? <Check width={12} height={12} /> : '\u00A0'}
      </span>
    </button>
  ) : (
    <div css={s_dateContainer}></div>
  );
}

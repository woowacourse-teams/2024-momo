import type { DateInfo } from 'types/calendar';
import type { MeetingAllSchedulesItem } from 'types/schedule';

import AttendeeTooltip from '@components/AttendeeTooltip';
import {
  s_baseDateButton,
  s_baseDateText,
  s_dateContainer,
  s_dateText,
} from '@components/MeetingCalendar/Date/Date.styles';
import { getDateInfo } from '@components/MeetingCalendar/Date/Date.utils';

import { s_additionalText, s_viewer } from './SingleDate.styles';

interface DateProps {
  dateInfo: DateInfo;
  today: Date;
  availableDateInfo: MeetingAllSchedulesItem | undefined;
  hasDate: (date: string) => boolean;
}

export default function SingleDateViewer({ dateInfo, today, availableDateInfo }: DateProps) {
  const { value, status } = dateInfo;
  const { date, isHoliday, isToday, isSaturday, isSunday, isPrevDate } = getDateInfo(value, today);

  return status === 'current' ? (
    <button
      disabled={!availableDateInfo || isPrevDate}
      css={[
        s_dateContainer,
        s_baseDateButton,
        s_viewer,
        s_dateText({
          isDisabledDate: !availableDateInfo || isPrevDate,
          isSelectedDate: false,
          isToday,
          isHoliday,
          isSunday,
          isSaturday,
        }),
      ]}
    >
      <span css={s_baseDateText}>{date}</span>
      <span css={s_additionalText}>
        {!availableDateInfo ? '\u00A0' : `+${availableDateInfo.attendeeNames.length}`}
      </span>
      {availableDateInfo && (
        <AttendeeTooltip attendeeNames={availableDateInfo.attendeeNames} position="top" />
      )}
    </button>
  ) : (
    <div css={s_dateContainer}></div>
  );
}

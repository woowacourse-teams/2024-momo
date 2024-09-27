import type { DateInfo } from 'types/calendar';

import AttendeeTooltip from '@components/AttendeeTooltip';
import {
  s_baseDateButton,
  s_baseDateText,
  s_dateContainer,
  s_dateText,
} from '@components/MeetingCalendar/Date/Date.styles';
import { getDateInfo } from '@components/MeetingCalendar/Date/Date.utils';

import Check from '@assets/images/attendeeCheck.svg';

import { s_additionalText, s_viewer } from './SingleDate.styles';

interface DateProps {
  dateInfo: DateInfo;
  today: Date;
  isAvailable: boolean;
  selectAttendee: string;
  availableAttendees: string[] | undefined;
  key: string;
}

export default function SingleDateViewer({
  dateInfo,
  today,
  isAvailable,
  selectAttendee,
  availableAttendees,
}: DateProps) {
  const { value, status } = dateInfo;
  const { date, isHoliday, isToday, isSaturday, isSunday, isPrevDate } = getDateInfo(value, today);

  const additionalText = () => {
    if (!availableAttendees) return '\u00A0';
    if (selectAttendee === '' && availableAttendees) return `+${availableAttendees.length}`;
    if (selectAttendee !== '' && availableAttendees) return <Check width={12} height={12} />;
  };

  const renderTooltip = () =>
    selectAttendee === '' &&
    availableAttendees && <AttendeeTooltip attendeeNames={availableAttendees} position="top" />;

  return status === 'current' ? (
    <button
      disabled={!isAvailable || isPrevDate}
      css={[
        s_dateContainer,
        s_baseDateButton,
        s_viewer,
        s_dateText({
          isDisabledDate: !isAvailable || isPrevDate,
          isSelectedDate: false,
          isToday,
          isHoliday,
          isSunday,
          isSaturday,
        }),
      ]}
    >
      <span css={s_baseDateText}>{date}</span>
      <span css={s_additionalText}>{additionalText()}</span>
      {renderTooltip()}
    </button>
  ) : (
    <div css={s_dateContainer}></div>
  );
}

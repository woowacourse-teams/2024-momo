import { formatFullDate } from '@utils/date';

import {
  s_attendeeInfo,
  s_baseContainer,
  s_checkboxContainer,
  s_checkboxInput,
  s_dateInfo,
  s_getSelectedStyle,
  s_optionContainer,
  s_recommendContainer,
} from './MeetingTimeCard.styles';

export interface DateInfo {
  fullDate: string;
  time: string;
  dayOfWeek: string;
}

interface MeetingTimeOptionCardProps {
  isSelected: boolean;
  onSelect: () => void;
  attendeeCount: number;
  schedule: {
    startDate: string;
    startDayOfWeek: string;
    startTime: string;
    endDate: string;
    endDayOfWeek: string;
    endTime: string;
    attendeeNames: string[];
  };
}

export default function MeetingTimeOptionCardDaysOnly({
  isSelected,
  onSelect,
  attendeeCount,
  schedule,
}: MeetingTimeOptionCardProps) {
  const { startDate, startDayOfWeek, attendeeNames } = schedule;

  const meetingDateWithDay = formatFullDate({
    fullDate: startDate,
    dayOfWeek: startDayOfWeek,
    format: 'korean',
  });

  const currentAttendeeCount = attendeeNames.length;

  return (
    <button
      css={[s_baseContainer, s_optionContainer, s_getSelectedStyle(isSelected)]}
      onClick={onSelect}
    >
      <div css={s_recommendContainer}>
        <span css={s_attendeeInfo}>{`${attendeeCount}명 중 ${currentAttendeeCount}명`}</span>
        <span css={s_dateInfo}>{meetingDateWithDay}</span>
      </div>
      <div css={s_checkboxContainer}>
        <input type="checkbox" checked={isSelected} onChange={onSelect} css={s_checkboxInput} />
      </div>
    </button>
  );
}

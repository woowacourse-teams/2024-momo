import { formatFullDate } from '@utils/date';

import {
  s_attendeeInfo,
  s_baseContainer,
  s_dateInfo,
  s_recommendContainer,
} from './MeetingTimeCard.styles';

interface MeetingRecommendCardProps extends React.HTMLAttributes<HTMLDivElement> {
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

export default function MeetingTimeRecommendCardDaysOnly({
  schedule,
  attendeeCount,
}: MeetingRecommendCardProps) {
  const { startDate, startDayOfWeek, endDate, endDayOfWeek, attendeeNames } = schedule;

  const currentAttendeeCount = attendeeNames.length;

  const startRecommendDate = formatFullDate({
    fullDate: startDate,
    dayOfWeek: startDayOfWeek,
  });

  const endRecommendDate = formatFullDate({
    fullDate: endDate,
    dayOfWeek: endDayOfWeek,
  });

  return (
    <div css={[s_baseContainer, s_recommendContainer]}>
      <span css={s_attendeeInfo}>{`${attendeeCount}명 중 ${currentAttendeeCount}명`}</span>
      <span css={s_dateInfo}>{startRecommendDate}부터</span>
      <span css={s_dateInfo}>{endRecommendDate}까지</span>
    </div>
  );
}

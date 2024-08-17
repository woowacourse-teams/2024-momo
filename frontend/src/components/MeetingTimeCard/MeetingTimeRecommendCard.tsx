import { formatFullDate, formatTime } from '@utils/date';

import {
  s_attendeeInfo,
  s_baseContainer,
  s_dateInfo,
  s_recommendContainer,
} from './MeetingTimeCard.styles';
import type { DateInfo } from './MeetingTimeOptionCard';

const createRecommendDateInfo = ({ fullDate, time, dayOfWeek }: DateInfo) => {
  const meetingDateWithDay = formatFullDate({ fullDate, dayOfWeek, format: 'korean' });
  const meetingTime = formatTime(time);

  return `${meetingDateWithDay} ${meetingTime}`;
};

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

export default function MeetingRecommendCard({
  schedule,
  attendeeCount,
}: MeetingRecommendCardProps) {
  const { startDate, startTime, startDayOfWeek, endDate, endTime, endDayOfWeek, attendeeNames } =
    schedule;

  const currentAttendeeCount = attendeeNames.length;

  const startRecommendDateInfo = createRecommendDateInfo({
    fullDate: startDate,
    time: startTime,
    dayOfWeek: startDayOfWeek,
  });

  const endRecommendDateInfo = createRecommendDateInfo({
    fullDate: endDate,
    time: endTime,
    dayOfWeek: endDayOfWeek,
  });

  return (
    <div css={[s_baseContainer, s_recommendContainer]}>
      <span css={s_attendeeInfo}>{`${attendeeCount}명 중 ${currentAttendeeCount}명`}</span>
      <span css={s_dateInfo}>{startRecommendDateInfo}부터</span>
      <span css={s_dateInfo}>{endRecommendDateInfo}까지</span>
    </div>
  );
}

import { formatFullDate } from '@utils/date';

import type { RecommendCardProps } from '../MeetingRecommendCard';
import { s_attendeeInfo, s_dateInfo, s_recommendContainer } from './RecommendSchedule.style';

export default function RecommendCardDaysOnly({
  schedule,
  totalAttendeeCount,
}: Omit<RecommendCardProps, 'type'>) {
  const { startDate, startDayOfWeek, endDate, endDayOfWeek, attendeeNames } = schedule;

  const currentAttendeeCount = attendeeNames.length;
  const startRecommendDate = formatFullDate({
    fullDate: startDate,
    dayOfWeek: startDayOfWeek,
    format: 'korean',
  });

  const endRecommendDate = formatFullDate({
    fullDate: endDate,
    dayOfWeek: endDayOfWeek,
    format: 'korean',
  });

  return (
    <div css={s_recommendContainer}>
      <span css={s_attendeeInfo}>{`${totalAttendeeCount}명 중 ${currentAttendeeCount}명`}</span>
      <span css={s_dateInfo}>{startRecommendDate}부터</span>
      <span css={s_dateInfo}>{endRecommendDate}까지</span>
    </div>
  );
}

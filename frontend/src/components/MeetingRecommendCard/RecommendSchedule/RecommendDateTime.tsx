import type { MeetingRecommend } from '@apis/meetings/recommends';

import { formatFullDate, formatTime } from '@utils/date';

import { s_dateInfo, s_recommendContainer } from './RecommendSchedule.style';

interface RecommendDateTimeProps {
  schedule: MeetingRecommend;
}

export default function RecommendDateTime({ schedule }: RecommendDateTimeProps) {
  const { startDate, startDayOfWeek, startTime, endDate, endDayOfWeek, endTime } = schedule;

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
      <span css={s_dateInfo}>{`${startRecommendDate} ${formatTime(startTime)}`}부터</span>
      <span css={s_dateInfo}>{`${endRecommendDate} ${formatTime(endTime)}`}까지</span>
    </div>
  );
}

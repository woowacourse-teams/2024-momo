import type { MeetingType } from '@apis/meetings/meetings';
import type { MeetingRecommend } from '@apis/meetings/recommends';

import { s_baseContainer } from './MeetingRecommendCard.styles';
import RecommendCardDateTime from './RecommendSchedule/RecommendDateTime';
import RecommendCardDaysOnly from './RecommendSchedule/RecommendDaysOnly';

export interface DateInfo {
  fullDate: string;
  time: string;
  dayOfWeek: string;
}

export interface RecommendCardProps {
  type: MeetingType;
  totalAttendeeCount: number;
  schedule: MeetingRecommend;
}

export default function MeetingRecommendCard({
  type,
  schedule,
  totalAttendeeCount,
}: RecommendCardProps) {
  const renderRecommendCard = (type: MeetingType) => {
    switch (type) {
      case 'DATETIME':
        return (
          <RecommendCardDateTime schedule={schedule} totalAttendeeCount={totalAttendeeCount} />
        );
      case 'DAYSONLY':
        return (
          <RecommendCardDaysOnly schedule={schedule} totalAttendeeCount={totalAttendeeCount} />
        );
    }
  };

  return <div css={s_baseContainer}>{renderRecommendCard(type)}</div>;
}

import type { MeetingType } from '@apis/meetings/meetings';
import type { MeetingRecommend } from '@apis/meetings/recommends';

import { s_baseContainer, s_scheduleContainer } from './MeetingRecommendCard.styles';
import RecommendAttendees from './RecommendAttendees';
import RecommendDateTime from './RecommendSchedule/RecommendDateTime';
import RecommendDaysOnly from './RecommendSchedule/RecommendDaysOnly';

export interface DateInfo {
  fullDate: string;
  time: string;
  dayOfWeek: string;
}

export interface RecommendCardProps {
  type: MeetingType;
  totalAttendees: string[];
  schedule: MeetingRecommend;
}

export default function MeetingRecommendCard({
  type,
  schedule,
  totalAttendees,
}: RecommendCardProps) {
  const renderRecommendCard = (type: MeetingType) => {
    switch (type) {
      case 'DATETIME':
        return <RecommendDateTime schedule={schedule} />;
      case 'DAYSONLY':
        return <RecommendDaysOnly schedule={schedule} />;
    }
  };

  return (
    <div css={s_baseContainer}>
      <div css={s_scheduleContainer}>
        <RecommendAttendees
          totalAttendees={totalAttendees}
          recommendAttendees={schedule.attendeeNames}
        />
        {renderRecommendCard(type)}
      </div>
    </div>
  );
}

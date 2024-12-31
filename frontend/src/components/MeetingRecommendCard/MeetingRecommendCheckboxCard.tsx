import type { MeetingType } from '@apis/meetings/meetings';

import type { RecommendCardProps } from './MeetingRecommendCard';
import {
  s_baseContainer,
  s_checkboxContainer,
  s_checkboxInput,
  s_getSelectedStyle,
  s_optionContainer,
  s_scheduleContainer,
} from './MeetingRecommendCard.styles';
import RecommendAttendees from './RecommendAttendees';
import RecommendCardDateTime from './RecommendSchedule/RecommendDateTime';
import RecommendCardDaysOnly from './RecommendSchedule/RecommendDaysOnly';

export interface MeetingRecommendCheckboxProps extends RecommendCardProps {
  isSelected: boolean;
  onSelect: () => void;
}

export default function MeetingRecommendCheckboxCard({
  type,
  isSelected,
  schedule,
  totalAttendees,
  onSelect,
}: MeetingRecommendCheckboxProps) {
  const renderRecommendCard = (type: MeetingType) => {
    switch (type) {
      case 'DATETIME':
        return <RecommendCardDateTime schedule={schedule} />;
      case 'DAYSONLY':
        return <RecommendCardDaysOnly schedule={schedule} />;
    }
  };

  return (
    <button
      css={[s_baseContainer, s_optionContainer, s_getSelectedStyle(isSelected)]}
      onClick={onSelect}
    >
      <div css={s_scheduleContainer}>
        <RecommendAttendees
          totalAttendees={totalAttendees}
          recommendAttendees={schedule.attendeeNames}
        />
        {renderRecommendCard(type)}
      </div>
      <div css={s_checkboxContainer}>
        <input type="checkbox" checked={isSelected} onChange={onSelect} css={s_checkboxInput} />
      </div>
    </button>
  );
}

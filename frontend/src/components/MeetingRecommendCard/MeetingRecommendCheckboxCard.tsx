import type { MeetingType } from '@apis/meetings/meetings';

import type { RecommendCardProps } from './MeetingRecommendCard';
import {
  s_baseContainer,
  s_checkboxContainer,
  s_checkboxInput,
  s_getSelectedStyle,
  s_optionContainer,
} from './MeetingRecommendCard.styles';
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
  totalAttendeeCount,
  onSelect,
}: MeetingRecommendCheckboxProps) {
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

  return (
    <button
      css={[s_baseContainer, s_optionContainer, s_getSelectedStyle(isSelected)]}
      onClick={onSelect}
    >
      {renderRecommendCard(type)}
      <div css={s_checkboxContainer}>
        <input type="checkbox" checked={isSelected} onChange={onSelect} css={s_checkboxInput} />
      </div>
    </button>
  );
}

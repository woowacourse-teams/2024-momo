import type { DateSelectMode } from 'types/calendar';

import TabButton from '@components/_common/Buttons/TabButton';

import { s_monthNavigation } from './MeetingCalendarHeader.styles';
import {
  s_dateSelectModeTabButtonContainer,
  s_monthHeader,
  s_monthNavigationContainer,
  s_yearMonthText,
} from './MeetingCalendarHeader.styles';

interface MeetingCalendarHeaderProps {
  currentYear: number;
  currentMonth: number;
  moveToNextMonth: () => void;
  moveToPrevMonth: () => void;
  isCurrentMonth?: boolean;
  dateSelectMode: DateSelectMode;
  toggleDateSelectMode: (mode: DateSelectMode) => void;
}

export default function MeetingCalendarHeader({
  currentYear,
  currentMonth,
  moveToNextMonth,
  moveToPrevMonth,
  isCurrentMonth,
  dateSelectMode,
  toggleDateSelectMode,
}: MeetingCalendarHeaderProps) {
  return (
    <header css={s_monthHeader}>
      <div css={s_monthNavigationContainer}>
        <button
          css={s_monthNavigation}
          onClick={moveToPrevMonth}
          aria-label="지난 달"
          disabled={isCurrentMonth}
        >
          {'<'}
        </button>
        <span css={s_yearMonthText}>
          {currentYear}년 {currentMonth + 1}월
        </span>
        <button css={s_monthNavigation} onClick={moveToNextMonth} aria-label="다음 달">
          {'>'}
        </button>
      </div>
      <div css={s_dateSelectModeTabButtonContainer}>
        <TabButton
          isActive={dateSelectMode === 'single'}
          onClick={() => toggleDateSelectMode('single')}
        >
          하나씩
        </TabButton>
        <p>/</p>
        <TabButton
          isActive={dateSelectMode === 'range'}
          onClick={() => toggleDateSelectMode('range')}
        >
          기간
        </TabButton>
      </div>
    </header>
  );
}

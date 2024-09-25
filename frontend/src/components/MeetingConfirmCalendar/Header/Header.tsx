import {
  s_monthNavigation,
  s_monthNavigationContainer,
  s_yearMonthText,
} from '@components/MeetingCalendar/Header/MeetingCalendarHeader.styles';

import { s_container } from './Header.styles';

// 해당 인터페이스 기본 CalendarHeader에서도 사용되는데 통합되는 것이 좋아보입니다.(@낙타)
interface HeaderProps {
  currentYear: number;
  currentMonth: number;
  moveToNextMonth: () => void;
  moveToPrevMonth: () => void;
  isCurrentMonth?: boolean;
}

// CSS는 대부분 MeetingCalendar를 이용했습니다.
// 추후 리팩터링을 진행할 때, '<'버튼과 '>' 버튼을 없앨지 고민중인데, 로직 분기 고민 + 일관된 사용성을 위해서 유지하기로 결정했습니다.(@낙타)
export default function Header({
  currentYear,
  currentMonth,
  moveToNextMonth,
  moveToPrevMonth,
  isCurrentMonth,
}: HeaderProps) {
  return (
    <header css={s_container}>
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
    </header>
  );
}

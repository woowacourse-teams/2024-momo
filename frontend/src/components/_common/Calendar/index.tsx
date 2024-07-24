import useCalendarInfo from '@hooks/useCalendarInfo/useCalendarInfo';

import {
  s_calendarContainer,
  s_calendarContent,
  s_dayOfWeek,
  s_dayOfWeekContainer,
  s_daySlot,
  s_daySlotButton,
  s_monthHeader,
  s_monthNavigation,
  s_selectedDaySlot,
} from './Calendar.styles';

const DAY_OF_WEEK = ['월', '화', '수', '목', '금', '토', '일'] as const;

// TODO : 선택된 날짜에 대한 강조 색을 외부에서 주입받을 수 있도록 props 수정 예정 (@해리)
interface CalendarProps {
  hasDate: (date: string) => boolean;
  onDateClick: (date: string) => void;
}

export default function Calendar({ hasDate, onDateClick }: CalendarProps) {
  const { yearMonthInfo, handleGetDayInfo, handlePrevMonth, handleNextMonth } = useCalendarInfo();
  const { year, month, daySlotCount } = yearMonthInfo;

  return (
    <div css={s_calendarContainer} aria-label={`${year}년 ${month}월 달력`}>
      <header css={s_monthHeader}>
        {/* TODO : 캘린더 헤더 버튼 스타일 수정 예정 (@해리) */}
        <button css={s_monthNavigation} onClick={handlePrevMonth}>
          {'<'}
        </button>
        <span>
          {year}년 {month}월
        </span>
        <button css={s_monthNavigation} onClick={handleNextMonth}>
          {'>'}
        </button>
      </header>
      <section css={[s_calendarContent, s_dayOfWeekContainer]}>
        {DAY_OF_WEEK.map((day) => (
          <div key={day} css={s_dayOfWeek}>
            {day}
          </div>
        ))}
      </section>
      <section css={s_calendarContent}>
        {Array.from({ length: daySlotCount }, (_, index) => {
          // TODO : isToday 변수를 활용한 스타일 변경 논의 필요 (@해리)
          const { date, dateString, isDate, isToday, isHoliday } = handleGetDayInfo(index);
          const isSelectedDate = hasDate(dateString);

          return (
            <button key={dateString} onClick={() => onDateClick(dateString)} css={s_daySlotButton}>
              <span css={[s_daySlot(isHoliday), s_selectedDaySlot(isSelectedDate)]}>
                {isDate ? date : ''}
              </span>
            </button>
          );
        })}
      </section>
    </div>
  );
}

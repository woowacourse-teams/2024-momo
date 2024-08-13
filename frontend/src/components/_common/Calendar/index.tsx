import useCalendarInfo from '@hooks/useCalendarInfo/useCalendarInfo';

import {
  s_baseDayOfWeek,
  s_baseDaySlot,
  s_baseDaySlotText,
  s_calendarContainer,
  s_calendarContent,
  s_dayOfWeek,
  s_dayOfWeekContainer,
  s_daySlotButton,
  s_daySlotText,
  s_monthHeader,
  s_monthNavigation,
} from './Calendar.styles';

const DAY_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'] as const;

interface CalendarProps {
  hasDate: (date: string) => boolean;
  onDateClick: (date: string) => void;
}

export default function Calendar({ hasDate, onDateClick }: CalendarProps) {
  const { yearMonthInfo, handleGetDayInfo, handlePrevMonth, handleNextMonth, isCurrentDate } =
    useCalendarInfo();
  const { year, month, daySlotCount } = yearMonthInfo;

  return (
    <div css={s_calendarContainer} aria-label={`${year}년 ${month}월 달력`}>
      <header css={s_monthHeader}>
        {/* TODO : 캘린더 헤더 버튼 스타일 수정 예정(@해리) */}
        <button
          css={s_monthNavigation}
          onClick={handlePrevMonth}
          aria-label="지난 달"
          disabled={isCurrentDate}
        >
          {'<'}
        </button>
        <span>
          {year}년 {month}월
        </span>
        <button css={s_monthNavigation} onClick={handleNextMonth} aria-label="다음 달">
          {'>'}
        </button>
      </header>
      <section css={[s_calendarContent, s_dayOfWeekContainer]}>
        {DAY_OF_WEEK.map((day, index) => (
          <div key={day} css={[s_baseDayOfWeek, s_dayOfWeek(index)]}>
            {day}
          </div>
        ))}
      </section>
      <section css={s_calendarContent}>
        {Array.from({ length: daySlotCount }, (_, index) => {
          const { date, dateString, isDate, isToday, isHoliday, isSaturday, isPrevDay } =
            handleGetDayInfo(index);
          const isSelectedDate = hasDate(dateString);

          return isDate ? (
            <button
              key={dateString}
              onClick={() => onDateClick(dateString)}
              disabled={isPrevDay}
              css={[s_baseDaySlot, s_daySlotButton]}
            >
              <span
                css={[
                  s_baseDaySlotText,
                  s_daySlotText(isHoliday, isSelectedDate, isToday, isSaturday, isPrevDay),
                ]}
              >
                {date}
              </span>
            </button>
          ) : (
            <div key={dateString} css={s_baseDaySlot}></div>
          );
        })}
      </section>
    </div>
  );
}

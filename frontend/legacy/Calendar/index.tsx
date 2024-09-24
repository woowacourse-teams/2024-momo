import useCalendar from '@hooks/useCalendarInfo/useCalendar';
import useDateSelect from '@hooks/useDateSelect/useDateSelect';

import TabButton from '../Buttons/TabButton';
import {
  s_baseDayOfWeek,
  s_calendarContainer,
  s_calendarContent,
  s_dayOfWeek,
  s_dayOfWeekContainer,
  s_monthHeader,
  s_monthNavigation,
} from './Calendar.styles';
import RangeCalendarDate from './Date/RangeCalendarDate';
import SingleCalendarDate from './Date/SingleCalendarDate';

interface CalendarProps {
  onDateClick: (date: string) => void;
}

export default function Calendar({ onDateClick }: CalendarProps) {
  const { headers, body, view, isCurrentMonth } = useCalendar();
  const { currentYear, currentMonth, weekDays } = headers;
  const { moveToNextMonth, moveToPrevMonth } = view;
  const {
    dateSelectMode,
    toggleDateSelectMode,
    handleSelectedDates,
    hasDate,
    checkIsRangeStartDate,
    checkIsRangeEndDate,
    isAllRangeSelected,
  } = useDateSelect();

  return (
    <div css={s_calendarContainer} aria-label={`${currentYear}년 ${currentMonth + 1}월 달력`}>
      <header css={s_monthHeader}>
        <button
          css={s_monthNavigation}
          onClick={moveToPrevMonth}
          aria-label="지난 달"
          disabled={isCurrentMonth}
        >
          {'<'}
        </button>
        <span>
          {currentYear}년 {currentMonth + 1}월
        </span>
        <button css={s_monthNavigation} onClick={moveToNextMonth} aria-label="다음 달">
          {'>'}
        </button>
        <TabButton
          isActive={dateSelectMode === 'single'}
          onClick={() => toggleDateSelectMode('single')}
        >
          하나씩
        </TabButton>
        <TabButton
          isActive={dateSelectMode === 'range'}
          onClick={() => toggleDateSelectMode('range')}
        >
          기간
        </TabButton>
      </header>
      <section css={[s_calendarContent, s_dayOfWeekContainer]}>
        {weekDays.map((day, index) => (
          <div key={day} css={[s_baseDayOfWeek, s_dayOfWeek(index)]}>
            {day}
          </div>
        ))}
      </section>
      <section css={s_calendarContent}>
        {body.value.map(({ key, value: onWeekDays }) =>
          onWeekDays.map((dateInfo) => {
            return dateSelectMode === 'single' ? (
              <SingleCalendarDate
                key={dateInfo.key}
                dateInfo={dateInfo}
                onDateClick={handleSelectedDates}
                hasDate={hasDate}
              />
            ) : (
              <RangeCalendarDate
                key={dateInfo.key}
                dateInfo={dateInfo}
                hasDate={hasDate}
                onDateClick={handleSelectedDates}
                isRangeStart={checkIsRangeStartDate(dateInfo.value)}
                isRangeEnd={checkIsRangeEndDate(dateInfo.value)}
                isAllRangeSelected={isAllRangeSelected}
              />
            );
          }),
        )}
      </section>
    </div>
  );
}

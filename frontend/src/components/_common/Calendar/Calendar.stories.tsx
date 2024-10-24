import type { Meta, StoryObj } from '@storybook/react';
import type { DateInfo } from 'types/calendar';

import { CalendarContext } from '@contexts/CalendarProvider';

import RangeDate from '@components/MeetingCalendar/Date/RangeDate';
import SingleDate from '@components/MeetingCalendar/Date/SingleDate';
import MeetingCalendarHeader from '@components/MeetingCalendar/Header';
import MeetingCalendarWeekdays from '@components/MeetingCalendar/Weekdays';

import useCalendar from '@hooks/useCalendar/useCalendar';
import useDateSelect from '@hooks/useDateSelect/useDateSelect';

import Calendar from '.';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      const calendarData = useCalendar();

      return (
        <CalendarContext.Provider value={calendarData}>
          <Story />
        </CalendarContext.Provider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => {
    const {
      handleSelectedDates,
      hasDate,
      dateSelectMode,
      checkIsRangeStartDate,
      checkIsRangeEndDate,
      isAllRangeSelected,
      toggleDateSelectMode,
    } = useDateSelect();

    const renderDate = (dateInfo: DateInfo, today: Date) =>
      dateSelectMode === 'single' ? (
        <SingleDate
          key={dateInfo.key}
          dateInfo={dateInfo}
          today={today}
          hasDate={hasDate}
          onDateClick={handleSelectedDates}
        />
      ) : (
        <RangeDate
          key={dateInfo.key}
          dateInfo={dateInfo}
          today={today}
          hasDate={hasDate}
          onDateClick={handleSelectedDates}
          isRangeStart={checkIsRangeStartDate(dateInfo.value)}
          isRangeEnd={checkIsRangeEndDate(dateInfo.value)}
          isAllRangeSelected={isAllRangeSelected}
        />
      );

    return (
      <Calendar>
        <Calendar.Header
          render={({
            currentYear,
            currentMonth,
            moveToNextMonth,
            moveToPrevMonth,
            isCurrentMonth,
          }) => (
            <MeetingCalendarHeader
              currentYear={currentYear}
              currentMonth={currentMonth}
              moveToNextMonth={moveToNextMonth}
              moveToPrevMonth={moveToPrevMonth}
              isCurrentMonth={isCurrentMonth}
              dateSelectMode={dateSelectMode}
              toggleDateSelectMode={toggleDateSelectMode}
            />
          )}
        />
        <Calendar.WeekDays render={(weekdays) => <MeetingCalendarWeekdays weekdays={weekdays} />} />
        <Calendar.Body renderDate={renderDate} />
      </Calendar>
    );
  },
};

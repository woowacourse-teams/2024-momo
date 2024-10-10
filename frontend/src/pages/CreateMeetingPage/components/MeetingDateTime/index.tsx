import type { DateInfo } from 'types/calendar';

import RangeDate from '@components/MeetingCalendar/Date/RangeDate';
import SingleDate from '@components/MeetingCalendar/Date/SingleDate';
import MeetingCalendarHeader from '@components/MeetingCalendar/Header';
import MeetingCalendarWeekdays from '@components/MeetingCalendar/Weekdays';
import TimeRangeSelector from '@components/TimeRangeSelector';
import BottomFixedButton from '@components/_common/Buttons/BottomFixedButton';
import Calendar from '@components/_common/Calendar';
import Checkbox from '@components/_common/Checkbox';
import Field from '@components/_common/Field';

import type useDateSelect from '@hooks/useDateSelect/useDateSelect';
import type useMeetingType from '@hooks/useMeetingType/useMeetingType';
import type { UseTimeRangeDropdownReturn } from '@hooks/useTimeRangeDropdown/useTimeRangeDropdown';

import { FIELD_DESCRIPTIONS } from '@constants/inputFields';

interface MeetingDateTimeProps {
  meetingDateInput: ReturnType<typeof useDateSelect>;
  meetingTimeInput: UseTimeRangeDropdownReturn;
  meetingTypeInput: ReturnType<typeof useMeetingType>;
  isCreateMeetingFormInvalid: boolean;
  onMeetingCreateButtonClick: () => void;
}

export default function MeetingDateTime({
  meetingDateInput,
  meetingTimeInput,
  meetingTypeInput,
  isCreateMeetingFormInvalid,
  onMeetingCreateButtonClick,
}: MeetingDateTimeProps) {
  const {
    handleSelectedDates,
    hasDate,
    dateSelectMode,
    checkIsRangeStartDate,
    checkIsRangeEndDate,
    isAllRangeSelected,
    toggleDateSelectMode,
  } = meetingDateInput;

  const { startTime, endTime, handleStartTimeChange, handleEndTimeChange } = meetingTimeInput;

  const { isChecked, handleToggleIsChecked } = meetingTypeInput;

  const renderDate = (dateInfo: DateInfo, today: Date) => {
    return dateSelectMode === 'single' ? (
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
  };

  return (
    <>
      <Field>
        <Field>
          <Field.Label id="날짜선택" labelText="약속 후보 날짜 선택" />
          <Field.Description description={FIELD_DESCRIPTIONS.date} />
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
            <Calendar.WeekDays
              render={(weekdays) => <MeetingCalendarWeekdays weekdays={weekdays} />}
            />
            <Calendar.Body renderDate={renderDate} />
          </Calendar>
        </Field>
      </Field>

      <Checkbox
        onChange={handleToggleIsChecked}
        id="meetingType"
        isChecked={isChecked}
        labelText="날짜만 선택할래요"
      />
      {!isChecked && (
        <Field>
          <Field.Label id="약속시간범위선택" labelText="약속 시간 범위 선택" />
          <TimeRangeSelector
            startTime={startTime}
            endTime={endTime}
            handleStartTimeChange={handleStartTimeChange}
            handleEndTimeChange={handleEndTimeChange}
          />
        </Field>
      )}

      <BottomFixedButton onClick={onMeetingCreateButtonClick} disabled={isCreateMeetingFormInvalid}>
        약속 생성하기
      </BottomFixedButton>
    </>
  );
}

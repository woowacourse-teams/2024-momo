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

import { MEETING_BUTTON_TEXTS } from '@constants/button';
import { FIELD_DESCRIPTIONS, FIELD_LABELS, FIELD_TITLES } from '@constants/inputFields';

import { s_container, s_dateCandidateSelector } from './MeetingDateTime.styles';

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
    <div css={s_container}>
      <div css={s_dateCandidateSelector}>
        <Field>
          <Field.Title title={FIELD_TITLES.meetingDateTime} />
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

        <Checkbox
          onChange={handleToggleIsChecked}
          id="meetingType"
          isChecked={isChecked}
          labelText={FIELD_LABELS.onlyDate}
        />
      </div>

      {!isChecked && (
        <Field>
          <Field.Title title={FIELD_TITLES.meetingTimeRange} />
          <TimeRangeSelector
            startTime={startTime}
            endTime={endTime}
            handleStartTimeChange={handleStartTimeChange}
            handleEndTimeChange={handleEndTimeChange}
          />
        </Field>
      )}

      <BottomFixedButton onClick={onMeetingCreateButtonClick} disabled={isCreateMeetingFormInvalid}>
        {MEETING_BUTTON_TEXTS.create}
      </BottomFixedButton>
    </div>
  );
}

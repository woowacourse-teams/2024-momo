import TimeRangeSelector from '@components/TimeRangeSelector';
import BottomFixedButton from '@components/_common/Buttons/BottomFixedButton';
import Calendar from '@components/_common/Calendar';
import Field from '@components/_common/Field';

import type { UseTimeRangeDropdownResult } from '@hooks/useTimeRangeDropdown/useTimeRangeDropdown.type';

interface MeetingDateInput {
  hasDate: (date: string) => boolean;
  onDateClick: (date: string) => void;
}

interface MeetingDateTimeProps {
  meetingDateInput: MeetingDateInput;
  meetingTimeInput: UseTimeRangeDropdownResult;
  isCreateMeetingFormInValid: boolean;
}

export default function MeetingDateTime({
  meetingDateInput,
  meetingTimeInput,
  isCreateMeetingFormInValid,
}: MeetingDateTimeProps) {
  const { hasDate, onDateClick } = meetingDateInput;
  const { startTime, endTime, handleStartTimeChange, handleEndTimeChange } = meetingTimeInput;

  return (
    <>
      <Field>
        <Field.Label id="날짜선택" labelText="약속 날짜 선택" />
        <Calendar hasDate={hasDate} onDateClick={onDateClick} />
      </Field>

      <Field>
        <Field.Label id="약속시간범위선택" labelText="약속 시간 범위 선택" />
        <TimeRangeSelector
          startTime={startTime}
          endTime={endTime}
          handleStartTimeChange={handleStartTimeChange}
          handleEndTimeChange={handleEndTimeChange}
        />
      </Field>
      <BottomFixedButton onClick={() => console.log('hi')} disabled={isCreateMeetingFormInValid}>
        약속 생성하기
      </BottomFixedButton>
    </>
  );
}

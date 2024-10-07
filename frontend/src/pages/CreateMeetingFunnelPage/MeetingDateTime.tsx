import TimeRangeSelector from '@components/TimeRangeSelector';
import BottomFixedButton from '@components/_common/Buttons/BottomFixedButton';
import Calendar from '@components/_common/Calendar';
import Field from '@components/_common/Field';

import type { UseTimeRangeDropdownReturn } from '@hooks/useTimeRangeDropdown/useTimeRangeDropdown';

// 시작, 끝이 추가된 달력이랑 합쳐진 후, interface 수정예정(@해리)
interface MeetingDateInput {
  hasDate: (date: string) => boolean;
  onDateClick: (date: string) => void;
}

interface MeetingDateTimeProps {
  meetingDateInput: MeetingDateInput;
  meetingTimeInput: UseTimeRangeDropdownReturn;
  isCreateMeetingFormInvalid: boolean;
  onMeetingCreateButtonClick: () => void;
}

export default function MeetingDateTime({
  meetingDateInput,
  meetingTimeInput,
  isCreateMeetingFormInvalid,
  onMeetingCreateButtonClick,
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
      <BottomFixedButton onClick={onMeetingCreateButtonClick} disabled={isCreateMeetingFormInvalid}>
        약속 생성하기
      </BottomFixedButton>
    </>
  );
}

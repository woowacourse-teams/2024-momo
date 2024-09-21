import { useState } from 'react';

import useInput from '@hooks/useInput/useInput';
import useTimeRangeDropdown from '@hooks/useTimeRangeDropdown/useTimeRangeDropdown';

import { FIELD_DESCRIPTIONS, INPUT_FIELD_PATTERN } from '@constants/inputFields';

const useCreateMeeting = () => {
  const meetingNameInput = useInput({
    pattern: INPUT_FIELD_PATTERN.meetingName,
    errorMessage: FIELD_DESCRIPTIONS.meetingName,
  });
  const isMeetingNameInvalid =
    meetingNameInput.errorMessage !== null || meetingNameInput.value.length < 1;

  const hostNickNameInput = useInput({
    pattern: INPUT_FIELD_PATTERN.nickname,
    errorMessage: FIELD_DESCRIPTIONS.nickname,
  });

  const hostPasswordInput = useInput({
    pattern: INPUT_FIELD_PATTERN.password,
    errorMessage: FIELD_DESCRIPTIONS.password,
  });
  const isHostInfoInValid =
    hostNickNameInput.value.length < 1 ||
    hostPasswordInput.value.length < 1 ||
    hostNickNameInput.errorMessage !== null ||
    hostPasswordInput.errorMessage !== null;

  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const areDatesUnselected = selectedDates.length < 1;
  const hasDate = (date: string) => selectedDates.includes(date);

  const handleDateClick = (date: string) => {
    setSelectedDates((prevDates) =>
      hasDate(date) ? prevDates.filter((d) => d !== date) : [...prevDates, date],
    );
  };

  const { startTime, endTime, handleStartTimeChange, handleEndTimeChange } = useTimeRangeDropdown();

  const isCreateMeetingFormInValid =
    isMeetingNameInvalid || (isHostInfoInValid && areDatesUnselected);

  return {
    meetingNameInput,
    isMeetingNameInvalid,
    hostNickNameInput,
    hostPasswordInput,
    isHostInfoInValid,
    hasDate,
    handleDateClick,
    meetingTimeInput: {
      startTime,
      endTime,
      handleEndTimeChange,
      handleStartTimeChange,
    },
    isCreateMeetingFormInValid,
  };
};

export default useCreateMeeting;

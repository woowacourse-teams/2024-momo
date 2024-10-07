import { useState } from 'react';

import useInput from '@hooks/useInput/useInput';
import { INITIAL_END_TIME, INITIAL_START_TIME } from '@hooks/useTimeRangeDropdown/constants';
import useTimeRangeDropdown from '@hooks/useTimeRangeDropdown/useTimeRangeDropdown';

import { usePostMeetingMutation } from '@stores/servers/meeting/mutation';

import { FIELD_DESCRIPTIONS, INPUT_FIELD_PATTERN, INPUT_RULES } from '@constants/inputFields';

const checkInputInvalid = (value: string, errorMessage: string | null) =>
  value.length < INPUT_RULES.minimumLength || errorMessage !== null;

const useCreateMeeting = () => {
  const meetingNameInput = useInput({
    pattern: INPUT_FIELD_PATTERN.meetingName,
    errorMessage: FIELD_DESCRIPTIONS.meetingName,
  });
  const isMeetingNameInvalid = checkInputInvalid(
    meetingNameInput.value,
    meetingNameInput.errorMessage,
  );

  const hostNickNameInput = useInput({
    pattern: INPUT_FIELD_PATTERN.nickname,
    errorMessage: FIELD_DESCRIPTIONS.nickname,
  });
  const hostPasswordInput = useInput({
    pattern: INPUT_FIELD_PATTERN.password,
    errorMessage: FIELD_DESCRIPTIONS.password,
  });
  const isHostInfoInValid =
    checkInputInvalid(hostNickNameInput.value, hostNickNameInput.errorMessage) ||
    checkInputInvalid(hostPasswordInput.value, hostPasswordInput.errorMessage);

  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const areDatesUnselected = selectedDates.length < 1;
  const hasDate = (date: string) => selectedDates.includes(date);
  const handleDateClick = (date: string) => {
    setSelectedDates((prevDates) =>
      hasDate(date) ? prevDates.filter((d) => d !== date) : [...prevDates, date],
    );
  };

  const meetingTimeInput = useTimeRangeDropdown();

  const isCreateMeetingFormInvalid =
    isMeetingNameInvalid || (isHostInfoInValid && areDatesUnselected);

  const { mutation: postMeetingMutation } = usePostMeetingMutation();

  const handleMeetingCreateButtonClick = () => {
    postMeetingMutation.mutate({
      meetingName: meetingNameInput.value,
      hostName: hostNickNameInput.value,
      hostPassword: hostPasswordInput.value,
      availableMeetingDates: selectedDates,
      meetingStartTime: meetingTimeInput.startTime.value,
      // 시간상 24시는 존재하지 않기 때문에 백엔드에서 오류가 발생. 따라서 오전 12:00으로 표현하지만, 서버에 00:00으로 전송(@낙타)
      meetingEndTime:
        meetingTimeInput.endTime.value === INITIAL_END_TIME
          ? INITIAL_START_TIME
          : meetingTimeInput.endTime.value,
    });
  };

  return {
    meetingNameInput,
    isMeetingNameInvalid,
    hostNickNameInput,
    hostPasswordInput,
    isHostInfoInValid,
    hasDate,
    handleDateClick,
    meetingTimeInput,
    isCreateMeetingFormInvalid,
    handleMeetingCreateButtonClick,
  };
};

export default useCreateMeeting;

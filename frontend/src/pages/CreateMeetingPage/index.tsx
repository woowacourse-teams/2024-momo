import { useState } from 'react';

import PasswordInput from '@components/PasswordInput';
import TimeRangeSelector from '@components/TimeRangeSelector';
import { Button } from '@components/_common/Buttons/Button';
import Calendar from '@components/_common/Calendar';
import Field from '@components/_common/Field';
import Input from '@components/_common/Input';

import useInput from '@hooks/useInput/useInput';
import { INITIAL_END_TIME, INITIAL_START_TIME } from '@hooks/useTimeRangeDropdown/constants';
import useTimeRangeDropdown from '@hooks/useTimeRangeDropdown/useTimeRangeDropdown';

import { usePostMeetingMutation } from '@stores/servers/meeting/mutation';

import { FIELD_DESCRIPTIONS, INPUT_FIELD_RULES } from '@constants/inputFields';

import { s_confirmContainer, s_formContainer } from './CreateMeetingPage.styles';

export default function CreateMeetingPage() {
  const { mutation: postMeetingMutation } = usePostMeetingMutation();

  const {
    value: meetingName,
    onValueChange: handleMeetingNameChange,
    errorMessage: meetingNameErrorMessage,
  } = useInput({
    minLength: INPUT_FIELD_RULES.meetingName.minLength,
    maxLength: INPUT_FIELD_RULES.meetingName.maxLength,
  });

  const {
    value: hostName,
    onValueChange: handleHostNameChange,
    errorMessage: hostNameErrorMessage,
  } = useInput({
    minLength: INPUT_FIELD_RULES.nickname.minLength,
    maxLength: INPUT_FIELD_RULES.nickname.maxLength,
  });

  const {
    value: hostPassword,
    onValueChange: handleHostPasswordChange,
    errorMessage: hostPasswordError,
  } = useInput({
    minLength: INPUT_FIELD_RULES.password.minLength,
    maxLength: INPUT_FIELD_RULES.password.maxLength,
    pattern: INPUT_FIELD_RULES.password.pattern,
  });

  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const { startTime, endTime, handleStartTimeChange, handleEndTimeChange } = useTimeRangeDropdown();

  const hasDate = (date: string) => selectedDates.includes(date);

  const handleDateClick = (date: string) => {
    setSelectedDates((prevDates) =>
      hasDate(date) ? prevDates.filter((d) => d !== date) : [...prevDates, date],
    );
  };

  const isFormValid = () => {
    const errorMessages = [meetingNameErrorMessage, hostNameErrorMessage, hostPasswordError];
    const hasErrors = errorMessages.some((errorMessage) => errorMessage !== null);

    if (hasErrors) {
      return false;
    }

    const requiredFields = [meetingName, hostName, hostPassword];
    const areRequiredFieldsFilled = requiredFields.every((field) => field !== '');
    const areDatesSelected = selectedDates.length > 0;
    const isAllFieldsFilled = areRequiredFieldsFilled && areDatesSelected;

    return isAllFieldsFilled;
  };

  const handleMeetingCreateButtonClick = () => {
    postMeetingMutation.mutate({
      hostName: hostName,
      hostPassword: hostPassword,
      meetingName: meetingName,
      availableMeetingDates: selectedDates,
      meetingStartTime: startTime.value,
      // 시간상 24시는 존재하지 않기 때문에 백엔드에서 오류가 발생. 따라서 오전 12:00으로 표현하지만, 서버에 00:00으로 전송(@낙타)
      meetingEndTime: endTime.value === INITIAL_END_TIME ? INITIAL_START_TIME : endTime.value,
    });
  };

  return (
    <div>
      {/* 추후 form 태그로 수정 예정 (@Largopie) */}
      <div css={s_formContainer}>
        <Field>
          <Field.Label id="약속이름" labelText="약속 이름" />
          <Field.Description description={FIELD_DESCRIPTIONS.meetingName} />
          <Input id="약속이름" value={meetingName} onChange={handleMeetingNameChange} />
          <Field.ErrorMessage errorMessage={meetingNameErrorMessage} />
        </Field>

        <Field>
          <Field.Label id="닉네임" labelText="닉네임" />
          <Field.Description description={FIELD_DESCRIPTIONS.nickname} />
          <Input id="닉네임" value={hostName} onChange={handleHostNameChange} />
          <Field.ErrorMessage errorMessage={hostNameErrorMessage} />
        </Field>

        <Field>
          <Field.Label id="비밀번호" labelText="비밀번호" />
          <Field.Description description={FIELD_DESCRIPTIONS.password} />
          <PasswordInput id="비밀번호" value={hostPassword} onChange={handleHostPasswordChange} />
          <Field.ErrorMessage errorMessage={hostPasswordError} />
        </Field>

        <Field>
          <Field.Label id="날짜선택" labelText="약속 날짜 선택" />
          <Calendar hasDate={hasDate} onDateClick={handleDateClick} />
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

        <div css={s_confirmContainer}>
          <Button
            variant="primary"
            size="m"
            onClick={handleMeetingCreateButtonClick}
            disabled={!isFormValid()}
          >
            약속 생성하기
          </Button>
        </div>
      </div>
    </div>
  );
}

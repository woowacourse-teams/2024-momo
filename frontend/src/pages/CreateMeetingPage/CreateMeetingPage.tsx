import { useState } from 'react';

import PasswordInput from '@components/PasswordInput';
import TimeRangeSelector from '@components/TimeRangeSelector';
import Calendar from '@components/_common/Calendar';
import Field from '@components/_common/Field';
import Input from '@components/_common/Input';

import useInput from '@hooks/useInput/useInput';
import { INITIAL_END_TIME, INITIAL_START_TIME } from '@hooks/useTimeRangeDropdown/constants';
import useTimeRangeDropdown from '@hooks/useTimeRangeDropdown/useTimeRangeDropdown';

import { usePostMeetingMutation } from '@stores/servers/meeting/mutation';

import { s_confirm, s_confirmContainer, s_formContainer } from './CreateMeetingPage.styles';

export default function CreateMeetingPage() {
  const { mutation: postMeetingMutation } = usePostMeetingMutation();

  const {
    value: meetingName,
    onValueChange: handleMeetingNameChange,
    errorMessage: meetingNameErrorMessage,
  } = useInput({
    minLength: 1,
    maxLength: 10,
  });

  const {
    value: hostName,
    onValueChange: handleHostNameChange,
    errorMessage: hostNameErrorMessage,
  } = useInput({ minLength: 1, maxLength: 5 });

  const {
    value: hostPassword,
    onValueChange: handleHostPasswordChange,
    errorMessage: hostPasswordError,
  } = useInput({
    minLength: 1,
    maxLength: 10,
    pattern: /^[a-zA-Z0-9!@#$%]+$/,
  });

  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const { startTime, endTime, handleStartTimeChange, handleEndTimeChange } = useTimeRangeDropdown();

  const hasDate = (date: string) => selectedDates.includes(date);

  const handleDateClick = (date: string) => {
    setSelectedDates((prevDates) =>
      hasDate(date) ? prevDates.filter((d) => d !== date) : [...prevDates, date],
    );
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
          <Field.Description description="약속 이름은 1~10자 사이로 입력해 주세요." />
          <Input id="약속이름" value={meetingName} onChange={handleMeetingNameChange} />
          <Field.ErrorMessage errorMessage={meetingNameErrorMessage} />
        </Field>

        <Field>
          <Field.Label id="닉네임" labelText="닉네임" />
          <Field.Description description="닉네임을 1~5자 사이로 입력해 주세요." />
          <Input id="닉네임" value={hostName} onChange={handleHostNameChange} />
          <Field.ErrorMessage errorMessage={hostNameErrorMessage} />
        </Field>

        <Field>
          <Field.Label id="비밀번호" labelText="비밀번호" />
          <Field.Description description="비밀번호를 1~10자 사이로 입력해 주세요. 사용 가능한 문자는 알파벳, 숫자, 특수문자(!@#$%)입니다." />
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
          <button css={s_confirm} onClick={handleMeetingCreateButtonClick}>
            약속 생성하기
          </button>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Calendar from '@components/_common/Calendar';
import Dropdown from '@components/_common/Dropdown';
import Field from '@components/_common/Field';
import Input from '@components/_common/Input';

import useInput from '@hooks/useInput/useInput';
import useTimeRangeDropdown from '@hooks/useTimeRangeDropdown/useTimeRangeDropdown';
import {
  generateEndTimeOptions,
  generateStartTimeOptions,
} from '@hooks/useTimeRangeDropdown/useTimeRangeDropdown.utils';

import { usePostMeetingMutation } from '@stores/servers/meeting/mutation';

import {
  s_confirm,
  s_confirmContainer,
  s_dropdownContainer,
  s_formContainer,
} from './CreateMeetingPage.styles';

export default function CreateMeetingPage() {
  const { mutation: postMeetingMutation } = usePostMeetingMutation();

  const { value: meetingName, onValueChange: handleMeetingNameChange } = useInput('');
  const { value: hostName, onValueChange: handleHostNameChange } = useInput('');
  const { value: hostPassword, onValueChange: handleHostPasswordChange } = useInput('');
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const {
    startTime,
    endTime,
    onStartTimeChange: handleStartTimeChange,
    onEndTimeChange: handleEndTimeChange,
  } = useTimeRangeDropdown();

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
      meetingAvailableDates: selectedDates,
      meetingStartTime: startTime,
      meetingEndTime: endTime,
    });
  };

  return (
    <div>
      {/* 추후 form 태그로 수정 예정 (@Largopie) */}
      <div css={s_formContainer}>
        <Field
          id="약속이름"
          labelText="약속 이름"
          description="약속 이름은 20자 이내로 입력해 주세요."
        >
          <Input
            id="약속이름"
            maxLength={20}
            value={meetingName}
            onChange={handleMeetingNameChange}
          />
        </Field>

        <Field
          id="닉네임"
          labelText="닉네임"
          description="약속에서 사용할 닉네임을 5자 이내로 입력해 주세요."
        >
          <Input id="닉네임" maxLength={5} value={hostName} onChange={handleHostNameChange} />
        </Field>

        <Field
          id="비밀번호"
          labelText="비밀번호"
          description="약속에서 사용할 비밀번호를 4자 이내로 입력해 주세요."
        >
          <Input
            id="비밀번호"
            type="password"
            maxLength={4}
            value={hostPassword}
            onChange={handleHostPasswordChange}
          />
        </Field>

        <Field id="날짜선택" labelText="약속 날짜 선택">
          <Calendar hasDate={hasDate} onDateClick={handleDateClick} />
        </Field>

        <Field id="약속시간범위선택" labelText="약속 시간 범위 선택">
          <div css={s_dropdownContainer}>
            <Dropdown
              value={startTime}
              onChange={(e) => handleStartTimeChange(e.target.value)}
              options={generateStartTimeOptions(endTime)}
            />
            ~
            <Dropdown
              value={endTime}
              onChange={(e) => handleEndTimeChange(e.target.value)}
              options={generateEndTimeOptions(startTime)}
            />
          </div>
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

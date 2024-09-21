import BottomFixedButton from '@components/_common/Buttons/BottomFixedButton';
import Field from '@components/_common/Field';
import Input from '@components/_common/Input';

import useButtonOnKeyboard from '@hooks/useButtonOnKeyboard/useButtonOnKeyboard';
import type { UseInputResult } from '@hooks/useInput/useInput.type';

import { FIELD_DESCRIPTIONS } from '@constants/inputFields';

interface MeetingNameProps {
  meetingNameInput: UseInputResult;
  isMeetingNameInvalid: boolean;
  onNextStep: () => void;
}

export default function MeetingName({
  meetingNameInput,
  isMeetingNameInvalid,
  onNextStep,
}: MeetingNameProps) {
  const {
    value: meetingName,
    onValueChange: handleMeetingNameChange,
    errorMessage: meetingNameErrorMessage,
  } = meetingNameInput;

  const resizedButtonHeight = useButtonOnKeyboard();

  return (
    <>
      <Field>
        <Field.Label id="약속이름" labelText="약속 이름" />
        <Field.Description description={FIELD_DESCRIPTIONS.meetingName} />
        <Input
          id="약속이름"
          value={meetingName}
          onChange={handleMeetingNameChange}
          autoComplete="off"
          autoFocus
        />
        <Field.ErrorMessage errorMessage={meetingNameErrorMessage} />
      </Field>
      <BottomFixedButton
        onClick={onNextStep}
        disabled={isMeetingNameInvalid}
        height={resizedButtonHeight}
      >
        다음
      </BottomFixedButton>
    </>
  );
}

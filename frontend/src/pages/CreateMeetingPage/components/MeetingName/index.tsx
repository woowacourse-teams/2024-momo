import ScrollBlock from '@components/ScrollBlock';
import BottomFixedButton from '@components/_common/Buttons/BottomFixedButton';
import Field from '@components/_common/Field';

import useButtonOnKeyboard from '@hooks/useButtonOnKeyboard/useButtonOnKeyboard';
import type { UseInputReturn } from '@hooks/useInput/useInput';

import { MEETING_BUTTON_TEXTS } from '@constants/buttons';
import { FIELD_LABELS, FIELD_PLACEHOLDERS, FIELD_TITLES } from '@constants/inputFields';

interface MeetingNameProps {
  meetingNameInput: UseInputReturn;
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

  const isTextError = meetingNameErrorMessage !== null;
  const resizedButtonHeight = useButtonOnKeyboard();

  return (
    <ScrollBlock>
      <Field>
        <Field.Title title={FIELD_TITLES.meetingName} />
        <Field.FloatingLabelInput
          label={FIELD_LABELS.meetingName}
          placeholder={FIELD_PLACEHOLDERS.nickname}
          value={meetingName}
          onChange={handleMeetingNameChange}
          autoComplete="off"
          isError={isTextError}
          autoFocus
        />
        <Field.ErrorMessage errorMessage={meetingNameErrorMessage} />
      </Field>
      <BottomFixedButton
        onClick={onNextStep}
        disabled={isMeetingNameInvalid}
        height={resizedButtonHeight}
      >
        {MEETING_BUTTON_TEXTS.next}
      </BottomFixedButton>
    </ScrollBlock>
  );
}

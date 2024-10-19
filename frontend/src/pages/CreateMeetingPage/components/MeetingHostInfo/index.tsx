import ScrollBlock from '@components/ScrollBlock';
import BottomFixedButton from '@components/_common/Buttons/BottomFixedButton';
import Field from '@components/_common/Field';
import Text from '@components/_common/Text';

import useButtonOnKeyboard from '@hooks/useButtonOnKeyboard/useButtonOnKeyboard';
import type { UseInputReturn } from '@hooks/useInput/useInput';

import { MEETING_BUTTON_TEXTS } from '@constants/button';
import { FIELD_LABELS, FIELD_PLACEHOLDERS, FIELD_TITLES } from '@constants/inputFields';

interface MeetingHostInfoProps {
  hostNickNameInput: UseInputReturn;
  hostPasswordInput: UseInputReturn;
  isHostInfoInvalid: boolean;
  onNextStep: () => void;
}

export default function MeetingHostInfo({
  hostNickNameInput,
  hostPasswordInput,
  isHostInfoInvalid,
  onNextStep,
}: MeetingHostInfoProps) {
  const {
    value: hostNickName,
    onValueChange: handleHostNickNameChange,
    errorMessage: hostNickNameErrorMessage,
  } = hostNickNameInput;
  const {
    value: hostPassword,
    onValueChange: handleHostPasswordChange,
    errorMessage: hostPasswordErrorMessage,
  } = hostPasswordInput;

  const resizedButtonHeight = useButtonOnKeyboard();
  const isHostNickNameError = hostNickNameErrorMessage !== null;
  const isHostPasswordError = hostPasswordErrorMessage !== null;

  return (
    <ScrollBlock>
      <Field>
        <Field.Title title={FIELD_TITLES.meetingHostInfo} />
        <Text typo="captionBold" variant="caption">
          약속을 생성하면
          <Text.Accent text=" 자동으로 로그인"></Text.Accent>
          돼요
        </Text>
        <Field.FloatingInput
          label={FIELD_LABELS.nickname}
          placeholder={FIELD_PLACEHOLDERS.nickname}
          value={hostNickName}
          onChange={handleHostNickNameChange}
          autoComplete="off"
          isError={isHostNickNameError}
          autoFocus
        />
        <Field.FloatingInput
          label={FIELD_LABELS.password}
          placeholder={FIELD_PLACEHOLDERS.password}
          value={hostPassword}
          onChange={handleHostPasswordChange}
          autoComplete="off"
          isError={isHostPasswordError}
          inputMode="numeric"
        />
        <Field.ErrorMessage errorMessage={hostNickNameErrorMessage || hostPasswordErrorMessage} />
      </Field>
      <BottomFixedButton
        onClick={onNextStep}
        disabled={isHostInfoInvalid}
        height={resizedButtonHeight}
      >
        {MEETING_BUTTON_TEXTS.next}
      </BottomFixedButton>
    </ScrollBlock>
  );
}

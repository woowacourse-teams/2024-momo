import FloatingLabelInput from '@components/FloatingInput';
import ScrollBlock from '@components/ScrollBlock';
import { Button } from '@components/_common/Buttons/Button';
import Field from '@components/_common/Field';
import Text from '@components/_common/Text';

import useAttendeeLogin from '@hooks/useAttendeeLogin/useAttendeeLogin';

import { MEETING_BUTTON_TEXTS } from '@constants/button';
import { FIELD_LABELS, FIELD_PLACEHOLDERS, FIELD_TITLES } from '@constants/inputFields';

import { s_container, s_inputContainer } from './AttendeeLoginPage.styles';

export default function AttendeeLoginPage() {
  const { attendeeNameField, attendeePasswordField, handleLoginButtonClick, isFormValid } =
    useAttendeeLogin();

  const {
    value: attendeeName,
    onValueChange: handleAttendeeNameChange,
    errorMessage: attendeeNameErrorMessage,
    isError: isAttendeeNameError,
  } = attendeeNameField;

  const {
    value: attendeePassword,
    onValueChange: handleAttendeePasswordChange,
    errorMessage: attendeePasswordErrorMessage,
    isError: isAttendeePasswordError,
  } = attendeePasswordField;

  return (
    <ScrollBlock>
      <div css={s_container}>
        <div css={s_inputContainer}>
          <Field>
            <Field.Title title={FIELD_TITLES.attendeeLogin} />

            <Text typo="captionBold" variant="caption">
              약속에서 사용할 <Text.Accent text="닉네임과 비밀번호" />를 입력해 주세요
            </Text>
            <FloatingLabelInput
              label={FIELD_LABELS.nickname}
              placeholder={FIELD_PLACEHOLDERS.nickname}
              value={attendeeName}
              onChange={handleAttendeeNameChange}
              autoComplete="off"
              isError={isAttendeeNameError}
              autoFocus
            />
            <FloatingLabelInput
              label={FIELD_LABELS.password}
              placeholder={FIELD_PLACEHOLDERS.password}
              value={attendeePassword}
              onChange={handleAttendeePasswordChange}
              inputMode="numeric"
              autoComplete="off"
              isError={isAttendeePasswordError}
            />
            <Field.ErrorMessage
              errorMessage={attendeeNameErrorMessage || attendeePasswordErrorMessage}
            />
          </Field>
        </div>
        <Button
          variant="primary"
          size="full"
          onClick={handleLoginButtonClick}
          disabled={!isFormValid()}
        >
          {MEETING_BUTTON_TEXTS.register}
        </Button>
      </div>
    </ScrollBlock>
  );
}

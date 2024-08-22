import { useParams } from 'react-router-dom';

import PasswordInput from '@components/PasswordInput';
import { Button } from '@components/_common/Buttons/Button';
import Field from '@components/_common/Field';
import Input from '@components/_common/Input';

import useInput from '@hooks/useInput/useInput';

import { usePostLoginMutation } from '@stores/servers/user/mutations';

import { FIELD_DESCRIPTIONS, INPUT_FIELD_RULES } from '@constants/inputFields';

import { s_container, s_inputContainer } from './AttendeeLoginPage.styles';

export default function AttendeeLoginPage() {
  const { uuid } = useParams<{ uuid: string }>();
  const { mutate: postLoginMutate } = usePostLoginMutation();

  const {
    value: attendeeName,
    onValueChange: handleAttendeeNameChange,
    errorMessage: attendeeNameErrorMessage,
  } = useInput({
    minLength: INPUT_FIELD_RULES.nickname.minLength,
    maxLength: INPUT_FIELD_RULES.nickname.maxLength,
  });

  const {
    value: attendeePassword,
    onValueChange: handleAttendeePasswordChange,
    errorMessage: attendeePasswordErrorMessage,
  } = useInput({
    minLength: INPUT_FIELD_RULES.password.minLength,
    maxLength: INPUT_FIELD_RULES.password.maxLength,
    pattern: INPUT_FIELD_RULES.password.pattern,
  });

  const isFormValid = () => {
    const errorMessages = [attendeeNameErrorMessage, attendeePasswordErrorMessage];
    const hasErrors = errorMessages.some((errorMessage) => errorMessage !== null);

    if (hasErrors) {
      return false;
    }

    const requiredFields = [attendeeName, attendeePassword];
    const isAllFieldsFilled = requiredFields.every((field) => field !== '');

    return isAllFieldsFilled;
  };

  const handleLoginButtonClick = async () => {
    if (!uuid) {
      console.error('UUID is missing');
      return;
    }

    postLoginMutate({
      uuid,
      request: { attendeeName, password: attendeePassword },
    });
  };

  return (
    <div css={s_container}>
      <div css={s_inputContainer}>
        <Field>
          <Field.Label id="닉네임" labelText="닉네임" />
          <Field.Description description={FIELD_DESCRIPTIONS.nickname} />
          <Input
            placeholder="닉네임을 입력하세요."
            value={attendeeName}
            onChange={handleAttendeeNameChange}
          />
          <Field.ErrorMessage errorMessage={attendeeNameErrorMessage} />
        </Field>

        <Field>
          <Field.Label id="비밀번호" labelText="비밀번호" />
          <Field.Description description={FIELD_DESCRIPTIONS.password} />
          <PasswordInput
            placeholder="비밀번호를 입력하세요."
            value={attendeePassword}
            onChange={handleAttendeePasswordChange}
          />
          <Field.ErrorMessage errorMessage={attendeePasswordErrorMessage} />
        </Field>
      </div>
      <Button
        variant="primary"
        size="full"
        onClick={handleLoginButtonClick}
        disabled={!isFormValid()}
      >
        로그인
      </Button>
    </div>
  );
}

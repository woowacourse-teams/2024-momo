import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '@contexts/AuthProvider';

import PasswordInput from '@components/PasswordInput';
import Field from '@components/_common/Field';
import Input from '@components/_common/Input';

import useInput from '@hooks/useInput/useInput';

import { postUserLogin } from '@apis/users';

import { FIELD_DESCRIPTIONS, INPUT_FIELD_RULES } from '@constants/inputFields';

import { s_button, s_container, s_inputContainer } from './AttendeeLoginPage.styles';

export default function AttendeeLoginPage() {
  const authContext = useContext(AuthContext);
  const { setIsLoggedIn, setUserName } = authContext.actions;

  const navigate = useNavigate();
  const { uuid } = useParams<{ uuid: string }>();

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

    const { userName } = await postUserLogin({
      uuid,
      request: { attendeeName, password: attendeePassword },
    });

    setIsLoggedIn(true);
    setUserName(userName);
    navigate(`/meeting/${uuid}`);
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
      <button css={s_button} onClick={handleLoginButtonClick}>
        로그인
      </button>
    </div>
  );
}

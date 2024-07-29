import { useNavigate, useParams } from 'react-router-dom';

import Field from '@components/_common/Field';
import Input from '@components/_common/Input';

import useInput from '@hooks/useInput/useInput';

import postAttendeeLogin from '@apis/attendee';

import { setCookie } from '@utils/cookies';

import { s_button, s_container, s_inputContainer } from './AttendeeLoginPage.styles';

export default function AttendeeLoginPage() {
  const { value: name, onValueChange: onNameChange } = useInput();
  const { value: password, onValueChange: onPasswordChange } = useInput();

  const navigate = useNavigate();
  const { uuid } = useParams<{ uuid: string }>();

  const handleLoginButtonClick = async () => {
    if (!uuid) {
      console.error('UUID is missing');
      return;
    }

    try {
      const response = await postAttendeeLogin({
        uuid,
        request: { name, password },
      });

      setCookie('token', response.data.token, { path: '/', maxAge: 604800 });
      setCookie('attendeeName', name);

      navigate(`/meeting/${uuid}`);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div css={s_container}>
      <div css={s_inputContainer}>
        <Field labelText="이름" id="name">
          <Input placeholder="이름을 입력하세요." value={name} onChange={onNameChange} />
        </Field>
        <Field labelText="비밀번호" id="password">
          <Input
            placeholder="비밀번호를 입력하세요."
            type="password"
            value={password}
            onChange={onPasswordChange}
          />
        </Field>
      </div>
      <button css={s_button} onClick={handleLoginButtonClick}>
        로그인
      </button>
    </div>
  );
}

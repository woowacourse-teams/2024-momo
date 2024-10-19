import { useContext } from 'react';

import ContentLayout from '@layouts/ContentLayout';

import { UuidContext } from '@contexts/UuidProvider';

import { Button } from '@components/_common/Buttons/Button';
import Field from '@components/_common/Field';
import Header from '@components/_common/Header';
import { s_backButton } from '@components/_common/Header/Header.styles';
import Input from '@components/_common/Input';

import useInput from '@hooks/useInput/useInput';
import useRouter from '@hooks/useRouter/useRouter';

import { usePostLoginMutation } from '@stores/servers/user/mutations';

import BackSVG from '@assets/images/back.svg';

import { FIELD_DESCRIPTIONS, INPUT_FIELD_PATTERN } from '@constants/inputFields';

import { s_container, s_inputContainer } from './AttendeeLoginPage.styles';

export default function AttendeeLoginPage() {
  const { routeTo } = useRouter();
  const { uuid } = useContext(UuidContext);

  const { mutate: postLoginMutate } = usePostLoginMutation();

  const {
    value: attendeeName,
    onValueChange: handleAttendeeNameChange,
    errorMessage: attendeeNameErrorMessage,
  } = useInput({
    pattern: INPUT_FIELD_PATTERN.nickname,
    errorMessage: FIELD_DESCRIPTIONS.nickname,
  });

  const {
    value: attendeePassword,
    onValueChange: handleAttendeePasswordChange,
    errorMessage: attendeePasswordErrorMessage,
  } = useInput({
    pattern: INPUT_FIELD_PATTERN.password,
    errorMessage: FIELD_DESCRIPTIONS.password,
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
    postLoginMutate({
      uuid,
      request: { attendeeName, password: attendeePassword },
    });
  };

  return (
    <>
      <Header title="로그인">
        {/* 현재 로그인 페이지는 빙봉이 구현한 로직 상 약속 입장 페이지에서만 사용됩니다. 따라서 뒤로가기 시, 입장 페이지로 이동하도록 구현했습니다. (@낙타) */}
        <button css={s_backButton} onClick={() => routeTo(`/meeting/${uuid}`)}>
          <BackSVG width="24" height="24" />
        </button>
      </Header>
      <ContentLayout>
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
              <Input
                type="number"
                id="비밀번호"
                inputMode="numeric"
                pattern="[0-9]*"
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
      </ContentLayout>
    </>
  );
}

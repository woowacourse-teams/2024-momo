import ContentLayout from '@layouts/ContentLayout';

import FloatingLabelInput from '@components/FloatingInput';
import ScrollBlock from '@components/ScrollBlock';
import BackButton from '@components/_common/Buttons/BackButton';
import { Button } from '@components/_common/Buttons/Button';
import Field from '@components/_common/Field';
import Header from '@components/_common/Header';
import Text from '@components/_common/Text';

import useAttendeeLogin from '@hooks/useAttendeeLogin/useAttendeeLogin';

import { MEETING_BUTTON_TEXTS } from '@constants/button';
import { FIELD_LABELS, FIELD_PLACEHOLDERS, FIELD_TITLES } from '@constants/inputFields';

import { s_container, s_inputContainer } from './AttendeeLoginPage.styles';

export default function AttendeeLoginPage() {
  const { attendeeNameField, attendeePasswordField, handleLoginButtonClick, isFormValid, uuid } =
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
    <>
      <Header title="로그인">
        {/* 현재 로그인 페이지는 빙봉이 구현한 로직 상 약속 입장 페이지에서만 사용됩니다. 따라서 뒤로가기 시, 입장 페이지로 이동하도록 구현했습니다. (@낙타) */}
        <BackButton path={`/meeting/${uuid}`} />
      </Header>
      <ContentLayout>
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
      </ContentLayout>
    </>
  );
}

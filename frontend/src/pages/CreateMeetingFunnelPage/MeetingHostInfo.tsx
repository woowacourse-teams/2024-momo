import { css } from '@emotion/react';
import { useEffect, useRef } from 'react';

import BottomFixedButton from '@components/_common/Buttons/BottomFixedButton';
import Field from '@components/_common/Field';
import Input from '@components/_common/Input';

import useButtonOnKeyboard from '@hooks/useButtonOnKeyboard/useButtonOnKeyboard';
import type { UseInputResult } from '@hooks/useInput/useInput.type';

import { FIELD_DESCRIPTIONS } from '@constants/inputFields';

interface MeetingHostInfoProps {
  hostNickNameInput: UseInputResult;
  hostPasswordInput: UseInputResult;
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

  return (
    <section
      css={css`
        position: relative;
        height: 100%;
      `}
    >
      <Field>
        <Field.Label id="닉네임" labelText="닉네임" />
        <Field.Description description={FIELD_DESCRIPTIONS.nickname} />
        <Input id="닉네임" value={hostNickName} onChange={handleHostNickNameChange} autoFocus />
        <Field.ErrorMessage errorMessage={hostNickNameErrorMessage} />
      </Field>

      <Field>
        <Field.Label id="비밀번호" labelText="비밀번호" />
        <Field.Description description={FIELD_DESCRIPTIONS.password} />
        <Input
          type="number"
          id="비밀번호"
          inputMode="numeric"
          pattern="[0-9]*"
          value={hostPassword}
          onChange={handleHostPasswordChange}
        />
        <Field.ErrorMessage errorMessage={hostPasswordErrorMessage} />
      </Field>
      <BottomFixedButton
        onClick={onNextStep}
        disabled={isHostInfoInvalid}
        height={resizedButtonHeight}
      >
        다음
      </BottomFixedButton>
    </section>
  );
}

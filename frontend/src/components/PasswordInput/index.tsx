import { useState } from 'react';

import { Button } from '@components/_common/Buttons/Button';

import PasswordHide from '@assets/images/passwordHide.svg';
import PasswordShow from '@assets/images/passwordShow.svg';

import type { InputProps } from '../_common/Input';
import Input from '../_common/Input';
import { s_inputContainer } from './PasswordInput.styles';

export default function PasswordInput({ value, onChange, placeholder = '' }: InputProps) {
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const toggleShowPassword = () => {
    setIsPasswordShow(!isPasswordShow);
  };

  return (
    <div css={s_inputContainer}>
      <Input
        variant="transparent"
        type={isPasswordShow ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <Button variant="transparent" size="m" type="button" onClick={toggleShowPassword}>
        {isPasswordShow ? <PasswordHide /> : <PasswordShow />}
      </Button>
    </div>
  );
}

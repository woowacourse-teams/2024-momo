import { useState } from 'react';

import type { InputProps } from '@components/_common/Input';
import Input from '@components/_common/Input';

import {
  s_floatingLabel,
  s_floatingLabelContainer,
  s_floatingLabelInput,
} from './FloatingInput.styles';

interface FloatingInputProps extends InputProps {
  label: string;
  isError: boolean;
}
export default function FloatingInput({
  label,
  placeholder,
  isError,
  ...props
}: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const focus = () => setIsFocused(true);
  const blur = () => setIsFocused(false);

  return (
    <div css={s_floatingLabelContainer}>
      <label css={s_floatingLabel(isFocused, isError)} htmlFor={label}>
        {label}
      </label>
      <Input
        variant="floating"
        css={s_floatingLabelInput(isError)}
        placeholder={placeholder}
        id={label}
        onFocus={focus}
        onBlur={blur}
        {...props}
      />
    </div>
  );
}

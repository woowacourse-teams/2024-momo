import type { InputProps } from '@components/_common/Input';
import Input from '@components/_common/Input';

import {
  s_floatingLabel,
  s_floatingLabelContainer,
  s_floatingLabelInput,
} from './FloatingLabelInput.styles';

interface FloatingLabelInputProps extends InputProps {
  label: string;
  isError: boolean;
}
export default function FloatingLabelInput({
  label,
  placeholder,
  isError,
  ...props
}: FloatingLabelInputProps) {
  return (
    <div css={s_floatingLabelContainer(isError)}>
      <label css={s_floatingLabel} htmlFor={label}>
        {label}
      </label>
      <Input
        variant="floating"
        css={s_floatingLabelInput(isError)}
        placeholder={placeholder}
        id={label}
        {...props}
      />
    </div>
  );
}

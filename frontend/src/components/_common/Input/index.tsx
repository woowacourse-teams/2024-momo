import type { InputHTMLAttributes } from 'react';

import { s_input } from './Input.styles';

export type InputVariant = 'default' | 'transparent';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
}

export default function Input({
  variant = 'default',
  type = 'text',
  placeholder = '',
  ...props
}: InputProps) {
  return <input css={s_input[variant]} type={type} placeholder={placeholder} {...props} />;
}

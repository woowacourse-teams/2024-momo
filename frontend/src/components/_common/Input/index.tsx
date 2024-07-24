import type { InputHTMLAttributes } from 'react';

import { s_input } from './Input.styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ type = 'text', placeholder = '', ...props }: InputProps) {
  return <input css={s_input} type={type} placeholder={placeholder} {...props} />;
}

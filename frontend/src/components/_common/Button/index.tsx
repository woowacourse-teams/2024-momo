import type { ButtonHTMLAttributes } from 'react';

import { s_button } from './Button.styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function Button({ text, type = 'button', ...props }: ButtonProps) {
  return (
    <button css={s_button} type={type} {...props}>
      {text}
    </button>
  );
}

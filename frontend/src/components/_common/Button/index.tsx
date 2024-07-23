import type { ButtonHTMLAttributes } from 'react';

import { buttonStyle } from './Button.styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function Button({ text, type = 'button', ...props }: ButtonProps) {
  return (
    <button css={buttonStyle} type={type} {...props}>
      {text}
    </button>
  );
}

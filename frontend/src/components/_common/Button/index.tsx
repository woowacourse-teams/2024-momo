import type { ButtonHTMLAttributes } from 'react';
import { styledButton } from './Button.styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function Button({ text, type = 'button', ...props }: ButtonProps) {
  return (
    <button css={styledButton} type={type} {...props}>
      {text}
    </button>
  );
}

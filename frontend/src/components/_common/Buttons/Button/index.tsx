import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { s_baseButton, s_size, s_variant } from './Button.styles';

export type ButtonSize = 'xs' | 's' | 'm' | 'full';
export type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size: ButtonSize;
  borderRadius?: number | string;
  variant?: ButtonVariant;
}

export function Button({
  variant,
  borderRadius = '0.8rem',
  children,
  size,
  type = 'button',
  onClick,
}: ButtonProps) {
  const cssProps = [s_baseButton(borderRadius), s_size(size)];

  if (variant) cssProps.push(s_variant[variant]);

  return (
    <button css={cssProps} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

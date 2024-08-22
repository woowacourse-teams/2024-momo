import type { SerializedStyles } from '@emotion/react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import Spinner from '@components/_common/Spinner';

import { s_baseButton, s_size, s_variant } from './Button.styles';

export type ButtonSize = 'xs' | 's' | 'm' | 'full';
export type ButtonVariant = 'primary' | 'secondary' | 'transparent' | 'kakao';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size: ButtonSize;
  borderRadius?: number | string;
  variant?: ButtonVariant;
  isLoading?: boolean;
  customCss?: SerializedStyles;
}

export function Button({
  children,
  size,
  borderRadius = '0.8rem',
  variant,
  disabled,
  isLoading = false,
  customCss,
  type = 'button',
  onClick,
}: ButtonProps) {
  const cssProps = [s_baseButton(borderRadius), s_size(size)];

  if (variant) cssProps.push(s_variant[variant]);

  return (
    <button disabled={disabled} css={[cssProps, customCss]} type={type} onClick={onClick}>
      {isLoading && <Spinner backgroundColor={'#f4f4f5'} />}
      {!isLoading && children}
    </button>
  );
}

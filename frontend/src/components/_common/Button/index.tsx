import type { SerializedStyles } from '@emotion/react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { s_baseButton, s_primary, s_secondary, s_size } from './Button.styles';

export type ButtonSize = 'xs' | 's' | 'm' | 'full';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size: ButtonSize;
  borderRadius?: number | string;
  buttonStyle?: SerializedStyles | SerializedStyles[];
}

export function BaseButton({
  buttonStyle,
  borderRadius = '0.8rem',
  children,
  size,
  type = 'button',
  onClick,
}: ButtonProps) {
  const cssProps = [s_baseButton(borderRadius), s_size(size)];

  if (buttonStyle) {
    if (Array.isArray(buttonStyle)) cssProps.push(...buttonStyle);
    else cssProps.push(buttonStyle);
  }

  return (
    <button css={cssProps} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export function PrimaryButton({
  children,
  borderRadius = '0.8rem',
  size,
  type = 'button',
  onClick,
}: ButtonProps) {
  return (
    <BaseButton
      buttonStyle={s_primary}
      borderRadius={borderRadius}
      size={size}
      type={type}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  );
}

export function SecondaryButton({
  children,
  borderRadius = '0.8rem',
  size,
  type = 'button',
  onClick,
}: ButtonProps) {
  return (
    <BaseButton
      borderRadius={borderRadius}
      buttonStyle={s_secondary}
      size={size}
      type={type}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  );
}

import type { SerializedStyles } from '@emotion/react';
import { css, keyframes } from '@emotion/react';

import theme from '@styles/theme';

import type { ToastType } from './Toast.type';

const toastSlideIn = keyframes`
  from{
    opacity: 0;
  }to{
    opacity: 1;
  }
`;

const toastSlideOut = keyframes`
  from{
    opacity: 1;
  }to{
    opacity: 0;
  }
`;

export const s_toastContainer = (isOpen: boolean) => css`
  display: flex;
  gap: 1.2rem;
  align-items: center;

  width: 100%;
  height: 4.8rem;
  padding: 1.2rem;

  background-color: #a1a1aa;
  border-radius: 1.6rem;
  box-shadow: 0 0.4rem 0.4rem rgb(0 0 0 / 20%);

  animation: ${isOpen ? toastSlideIn : toastSlideOut} 0.5s ease-in-out forwards;
`;

export const s_toastText = css`
  ${theme.typography.captionBold}
  color: ${theme.colors.white};
`;

const ICON_BACKGROUND_COLORS: Record<Exclude<ToastType, 'default'>, SerializedStyles> = {
  warning: css`
    background-color: #ef4545;
  `,
  success: css`
    background-color: ${theme.colors.green.mediumDark};
  `,
};

export const s_iconBackgroundColor = (type: Exclude<ToastType, 'default'>) => {
  return ICON_BACKGROUND_COLORS[type];
};

export const s_iconContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2.4rem;
  height: 2.4rem;

  border-radius: 50%;
`;

import { css } from '@emotion/react';

import theme from '@styles/theme';

export const s_container = css`
  ${theme.typography.bodyBold}
  display: flex;
  gap: 0.4rem;
  align-items: center;
  height: 2.4rem;
`;

export const s_input = css`
  position: absolute;
  left: -1000%;
`;

export const s_buttonContainer = (isToggled: boolean) => css`
  cursor: pointer;

  position: relative;

  display: flex;
  align-items: center;

  width: 4.8rem;
  height: 2.4rem;
  padding: 0.4rem;

  background-color: ${isToggled ? theme.colors.primary : theme.colors.grey.primary};
  border: none;
  border-radius: 1.2rem;

  &::after {
    content: '';

    position: absolute;
    transform: ${isToggled ? 'translateX(2.4rem)' : 'translateX(0)'};

    width: 1.6rem;
    height: 1.6rem;

    background-color: ${theme.colors.white};
    border-radius: 50%;
    box-shadow: 1px 3px 4px rgb(0 0 0 / 10%);

    transition: all 0.2s;
  }
`;

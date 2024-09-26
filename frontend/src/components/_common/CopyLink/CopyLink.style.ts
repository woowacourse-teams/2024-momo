import { css, keyframes } from '@emotion/react';

import theme from '@styles/theme';

export const s_copyContainer = css`
  display: flex;
  align-items: center;

  width: 100%;
  height: 3.6rem;

  background-color: ${theme.colors.white};
  border-radius: 0.8rem;
`;

export const s_copyButtonContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 3.6rem;
  height: 3.6rem;
`;

export const s_urlText = css`
  overflow: hidden;
  display: block;

  width: calc(100% - 3.6rem);
  height: 100%;
  padding: 0.8rem 0 0.8rem 0.8rem;

  color: ${theme.colors.grey.dark};
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;

  border-radius: 0.8rem;
`;

export const s_copyButton = css`
  width: 100%;
  height: 100%;
  background-color: inherit;
  border-radius: 0.8rem;

  &:hover {
    opacity: 0.3;
  }
`;

const drawCheck = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

export const s_check = css`
  path {
    fill: none;
    stroke: ${theme.colors.green.deepDark};
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 8;

    animation: ${drawCheck} 0.8s ease-in-out forwards;
  }
`;

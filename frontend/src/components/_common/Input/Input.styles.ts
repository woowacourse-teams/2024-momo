import { css } from '@emotion/react';

import theme from '@styles/theme';

const baseInputStyle = css`
  width: 100%;
  height: 4.8rem;
  outline: none;
  ${theme.typography.bodyMedium}
`;

export const s_input = {
  default: css`
    ${baseInputStyle}
  `,
  transparent: css`
    ${baseInputStyle}
    border: none;
    outline: none;
  `,
  floating: css`
    padding-top: 1.6rem; /* 텍스트를 아래로 내리기 위해 top padding을 더 줌 (@해리) */
    padding-left: 1.2rem;
    border: none;
    ${baseInputStyle}
    border-radius: 1.2rem;
  `,
};

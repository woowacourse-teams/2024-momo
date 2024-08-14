import { css } from '@emotion/react';

import theme from '@styles/theme';

const baseInputStyle = css`
  width: 100%;
  height: 4.4rem;
  padding: 0.8rem;
  outline-color: ${theme.colors.primary};
`;

export const s_input = {
  default: css`
    ${baseInputStyle}
    border: 1px solid ${theme.colors.grey.dark};
  `,
  transparent: css`
    ${baseInputStyle}
    border: none;
    outline: none;
  `,
};

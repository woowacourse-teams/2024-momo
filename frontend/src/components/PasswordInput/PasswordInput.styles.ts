import { css } from '@emotion/react';

import theme from '@styles/theme';

export const s_inputContainer = css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.grey.dark};
  border-radius: 0.3rem;

  :focus-within {
    border: 1px solid ${theme.colors.primary};
    outline: 1px solid ${theme.colors.primary};
  }
`;

import { css } from '@emotion/react';

import theme from '@styles/theme';

export const s_inputContainer = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.white};

  :focus-within {
    outline: 1px solid ${theme.colors.primary};
  }
`;

import { css } from '@emotion/react';

import theme from '@styles/theme';

export const s_button = css`
  ${theme.typography.bodyMedium}
  flex: 1;
  padding: 1.2rem;
  border-radius: 1.2rem;

  &:hover {
    opacity: 0.8;
  }
`;
export const s_primary = css`
  color: ${theme.colors.white};
  background-color: ${theme.colors.primary};
`;

export const s_secondary = css`
  color: ${theme.colors.grey.dark};
  background-color: ${theme.colors.grey.primary};
`;

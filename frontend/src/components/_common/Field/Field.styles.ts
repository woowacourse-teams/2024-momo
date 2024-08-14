import { css } from '@emotion/react';

import theme from '@styles/theme';

export const s_field = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const s_label = css`
  ${theme.typography.subTitleBold}
`;

export const s_description = css`
  ${theme.typography.captionMedium}
  color: ${theme.colors.grey.dark};
`;

import { css } from '@emotion/react';

import theme from '@styles/theme';

export const s_recommendContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const s_attendeeInfo = css`
  color: #6cd929;
  text-align: start;
  ${theme.typography.captionBold}
`;

export const s_dateInfo = css`
  ${theme.typography.bodyBold}
`;

import { css } from '@emotion/react';

import theme from '@styles/theme';

export const s_timeColumn = css`
  display: flex;
  flex-direction: column;
  gap: 3.24rem;

  margin-top: 3.6rem;
  margin-right: 0.8rem;
`;

export const s_timeText = css`
  ${theme.typography.captionBold}
  color: #3f3f46;
  text-align: center;
`;

export const s_tableHeaderRow = css`
  display: flex;
  align-items: center;
  height: 3.2rem;
  margin-bottom: 1.2rem;
`;

export const s_tableHeaderCell = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 6.4rem;

  ${theme.typography.captionBold}
`;

export const s_dateText = css`
  color: #52525b;
`;

export const s_dayText = css`
  color: #a1a1aa;
`;

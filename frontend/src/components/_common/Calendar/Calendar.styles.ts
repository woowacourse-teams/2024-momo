import { css } from '@emotion/react';

export const s_calendarContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const s_calendarContent = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
`;

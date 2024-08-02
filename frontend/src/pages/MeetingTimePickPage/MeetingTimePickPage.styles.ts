import { css } from '@emotion/react';

import theme from '@styles/theme';

export const s_container = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const s_pageHeader = css`
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
  margin-bottom: 2.4rem;
`;

export const s_title = css`
  margin-bottom: 1rem;

  font-size: 2rem;
  font-weight: bold;
  line-height: 4rem;
  color: #000;
  white-space: pre-line;

  background-clip: text;
`;

export const s_tipInfo = css`
  font-size: 12px;
  font-weight: lighter;
  line-height: 12px;
`;

export const s_attendeesContainer = css`
  display: grid;
  grid-auto-rows: 4rem;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
`;

export const s_tabButton = (isSelected: boolean) => css`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  width: fit-content;
  min-width: 4rem;
  height: 3.6rem;
  padding: 0.4rem 1.2rem;

  border-radius: 0.4rem;

  ${isSelected
    ? css`
        color: #fff;
        background-color: ${theme.colors.primary};
      `
    : css`
        color: #6d7580;
        background-color: #ebeef2;
      `}
`;

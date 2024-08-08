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
  display: flex;
  flex-wrap: wrap; /* 한 줄 이상 넘어가면 다음 줄로 넘어가도록 스타일 속성 추가(@해리) */
  gap: 0.8rem 0.8rem; /* 버튼들 간의 수직 간격 */ /* 버튼들 간의 수평 간격 */

  width: 100%;
`;

export const s_tabButton = (isSelected: boolean) => css`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  width: fit-content;
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

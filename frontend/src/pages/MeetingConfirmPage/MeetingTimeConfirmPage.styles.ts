import { css } from '@emotion/react';

export const s_container = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1.6rem;
`;

export const s_pageHeader = css`
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
  margin-bottom: 2.4rem;
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

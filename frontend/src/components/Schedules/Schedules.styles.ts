import { css } from '@emotion/react';
import type { CSSProperties } from 'react';

const COLOR_VARIANTS = {
  1: '#FFEBE8',
  2: '#FFD4D1',
  3: '#FFBABC',
  4: '#FFA9B4',
  5: '#FF8DA6',
  6: '#DB678B',
  7: '#B74775',
  8: '#932C61',
  9: '#7A1B54',
} as Record<number, CSSProperties['color']>;

export const s_container = css`
  overflow-x: auto;
  width: 100%;
  max-width: 39.3rem; /* 최대 너비 설정 */
`;

export const s_scheduleTable = css`
  position: relative;

  table-layout: fixed;
  border-spacing: 0;
  border-collapse: collapse;

  width: 100%; /* 테이블 전체 너비를 자동으로 조정 */
`;

export const s_tableTimeHeaderCell = css`
  width: 6rem; /* 셀의 고정 너비 설정 */
  max-width: 6rem;
`;

export const s_tableHeaderCell = css`
  width: 10rem; /* 셀의 고정 너비 설정 */
  max-width: 10rem;
  padding: 10px;

  font-weight: normal;
  color: #666;
  text-align: center;
`;

// overflow: hidden; /* 셀 내용이 넘칠 경우 숨기기 */
export const s_td = (variants: number) => css`
  width: 10rem; /* 셀의 고정 너비 설정 */
  max-width: 10rem;
  height: 4rem;

  text-overflow: ellipsis; /* 넘치는 텍스트 생략 표시 */
  white-space: nowrap; /* 텍스트 줄 바꿈 방지 */

  background-color: ${COLOR_VARIANTS[variants]};
  border: 1px solid #eee;
`;

export const s_timeColumn = css`
  position: relative;
  width: 6rem;
  max-width: 6rem;
`;

export const s_timeText = css`
  position: absolute;
  top: -0.7rem;

  padding: 0 2px;

  font-size: 12px;
  color: #888;
  text-align: start;

  background-color: white;
`;

export const s_buttonContainer = css`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 1rem;
`;

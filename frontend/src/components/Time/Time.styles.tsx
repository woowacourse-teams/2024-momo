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

export const s_table = css`
  border-spacing: 0;
  border-collapse: separate;
  width: 100%;
`;

export const s_th = css`
  padding: 10px;
  font-weight: normal;
  color: #666;
  text-align: center;
`;

export const s_td = (variants: number) => css`
  width: 100px;
  height: 40px;
  background-color: ${COLOR_VARIANTS[variants]};
  border: 1px solid #eee;
`;

export const s_timeColumn = css`
  position: relative;
  width: 60px;
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

import { css } from '@emotion/react';
import type { CSSProperties } from 'react';

import theme from '@styles/theme';

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
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

export const s_scheduleTable = css`
  position: relative;

  table-layout: fixed;
  border-spacing: 0;
  border-collapse: separate;

  width: auto;
`;

export const s_tableHeaderCell = css`
  width: 10rem;
  max-width: 10rem;
  padding: 10px;

  font-size: 1.2rem;
  font-weight: normal;
  color: #666;
  text-align: center;
`;

export const s_tableTimeHeaderCell = css`
  width: 6rem;
  max-width: 6rem;
`;

export const s_td = (variants: number) => css`
  width: 10rem;
  max-width: 10rem;
  height: 4rem;

  background-color: ${COLOR_VARIANTS[variants]};
  border: 0.1rem solid #eee;
`;

export const s_timeColumn = css`
  position: relative;
  width: 6rem;
  max-width: 6rem;
`;

export const s_timeText = css`
  position: absolute;
  top: -0.7rem;

  padding: 0 0.2rem;

  font-size: 1.2rem;
  color: #888;
  text-align: start;

  background-color: white;
`;

export const s_datesControlButtonContainer = css`
  position: absolute;
  z-index: 2;
  top: 0.5rem;

  display: flex;
  justify-content: space-between;

  width: 100%;

  -webkit-box-pack: justify;
`;

export const s_datesControlButton = css`
  cursor: pointer;

  width: 3.2rem;
  height: 3.2rem;

  font-weight: bold;
  color: ${theme.colors.primary};

  background-color: ${theme.colors.white};
  border: 0.1rem solid ${theme.colors.primary};
  border-radius: 50%;
  box-shadow: 0 0.4rem 0.4rem rgb(0 0 0 / 10%);

  :disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  &:first-of-type {
    margin-left: 5rem;
  }
`;

export const s_buttonContainer = css`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 1rem;
`;

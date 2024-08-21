import { css } from '@emotion/react';

import theme from '@styles/theme';

export const s_container = css`
  display: flex;
  flex-direction: column;
`;

export const s_relativeContainer = css`
  position: relative;
`;

export const s_scheduleTableContainer = css`
  display: flex;
  width: 90%;
  min-height: fit-content;

  span::selection {
    user-select: none;
  }
`;

export const s_scheduleTable = css`
  position: relative;

  table-layout: fixed;
  border-spacing: 0;
  border-collapse: separate;

  width: 100%;
`;

export const s_scheduleTableBody = css`
  display: flex;
  flex-direction: column;
`;

export const s_scheduleTableRow = css`
  display: flex;
  border-left: 0.1rem solid #d4d4d8;
`;

const getColorByRatio = (ratio: number) => {
  const pinkShades = theme.colors.pink;

  if (ratio <= 0.1) return pinkShades.lightest;
  if (ratio <= 0.2) return pinkShades.light;
  if (ratio <= 0.3) return pinkShades.mediumLight;
  if (ratio <= 0.4) return pinkShades.medium;
  if (ratio <= 0.5) return pinkShades.mediumDark;
  if (ratio <= 0.6) return pinkShades.dark;
  if (ratio <= 0.7) return pinkShades.darker;
  if (ratio <= 0.8) return pinkShades.darkest;
  if (ratio <= 0.9) return pinkShades.deep;

  return pinkShades.deepDark;
};

export const s_cellColorByRatio = (ratio: number) => css`
  background-color: ${ratio > 0 ? getColorByRatio(ratio) : '#f4f4f5'};
`;

export const s_cellColorBySelected = (isSelected: number) => css`
  background-color: ${isSelected ? theme.colors.primary : '#f4f4f5'};
`;

export const s_baseTimeCell = (isHalfHour: boolean, isLastRow: boolean) => css`
  flex: 1;

  max-width: 6.4rem;
  height: 2.4rem;

  border-top: 0.1rem ${isHalfHour ? 'dashed' : 'solid'} #d4d4d8;
  border-right: 0.1rem solid #d4d4d8;
  ${isLastRow &&
  css`
    border-bottom: 0.1rem ${isHalfHour ? 'solid' : 'dashed'} #d4d4d8;
  `}
`;

export const s_datesControlButtonContainer = css`
  position: absolute;
  z-index: 2;
  top: 4.2rem;

  display: flex;
  justify-content: space-between;

  width: 100%;

  -webkit-box-pack: justify;
`;

export const s_datesControlButton = css`
  cursor: pointer;

  width: 2.8rem;
  height: 2.8rem;

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

  &:last-of-type {
    margin-right: 5rem;
  }
`;

export const s_buttonContainer = css`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 1rem;
`;

export const s_pinkProgressiveBar = css`
  width: 100%;
  height: 1.2rem;

  background-image: repeating-linear-gradient(
      to right,
      transparent,
      transparent 9%,
      rgb(255 255 255 / 50%) 10%,
      rgb(255 255 255 / 50%) 10%
    ),
    linear-gradient(
      to right,
      ${theme.colors.pink.lightest} 0%,
      ${theme.colors.pink.light} 10%,
      ${theme.colors.pink.mediumLight} 20%,
      ${theme.colors.pink.medium} 30%,
      ${theme.colors.pink.mediumDark} 40%,
      ${theme.colors.pink.dark} 50%,
      ${theme.colors.pink.darker} 60%,
      ${theme.colors.pink.darkest} 70%,
      ${theme.colors.pink.deep} 80%,
      ${theme.colors.pink.deepDark} 100%
    );
  background-size:
    100% 100%,
    100% 100%;
  border-radius: 10px;
`;

export const s_percentageContainer = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1.2rem;
`;

export const s_percentage = css`
  ${theme.typography.captionMedium}
  color: #d4d4d8
`;

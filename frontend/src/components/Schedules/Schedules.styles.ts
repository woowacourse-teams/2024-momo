import { css } from '@emotion/react';

import theme from '@styles/theme';

export const s_container = css`
  display: flex;
  flex-direction: column;
`;

export const s_relativeContainer = css`
  position: relative;
  flex: 1;
  max-height: fit-content;
`;

export const s_selectModeButtonsContainer = css`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  margin-bottom: 1.2rem;
`;

export const s_scheduleTableContainer = css`
  display: flex;
  width: 90%;
  min-height: fit-content;

  span::selection {
    user-select: none;
  }
`;

export const s_attendeesContainer = css`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem 1.2rem;

  width: 100%;
  margin-bottom: 1.2rem;
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

export const s_singleCellColor = (isSelected: number) => css`
  background-color: ${isSelected ? theme.colors.primary : '#f4f4f5'};
`;

export const s_cellColorBySelected = (isSelected: number, unavailableMode = false) => css`
  background-color: ${unavailableMode
    ? isSelected
      ? theme.colors.pink.deepDark
      : '#f4f4f5'
    : isSelected
      ? theme.colors.green.deep
      : '#f4f4f5'};
`;

export const s_baseTimeCell = (isHalfHour: boolean, isLastRow: boolean) => css`
  position: relative;

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

export const s_bottomFixedButtonContainer = css`
  position: sticky; /* 절대 위치로 부모 컨테이너 내에서 배치 */
  bottom: 0;
  left: 0;

  display: flex;
  gap: 1.6rem;
  align-items: center;
  justify-content: space-between;

  /* 
  position : sticky는 문서의 흐름에 영향을 받기 때문에 부모 태그의 padding 스타일 속성을 상속받게 됨
  따라서, 부모의 padding인 0 1.6rem을 무시하는 스타일 속성 추가 (@해리) 
  */
  width: calc(100% + 1.6rem * 2);
  height: 6rem;
  margin: 1.6rem 0 0 -1.6rem;
  padding: 0 1.6rem;

  background-color: #fff;
  box-shadow: 0 -4px 4px rgb(0 0 0 / 25%);
`;

export const s_fullButtonContainer = css`
  display: flex;
  flex: 1;
  gap: 0.4rem;
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
  margin-top: 0.2rem;
`;

export const s_percentage = css`
  ${theme.typography.captionMedium}
  color: #d4d4d8
`;

export const s_circleButton = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 4.8rem;
  height: 4.8rem;

  color: ${theme.colors.primary};

  background-color: transparent;
  border: 1px solid ${theme.colors.primary};
  border-radius: 50%;
  box-shadow: 0 4px 4px rgb(0 0 0 / 25%);

  &:disabled {
    opacity: 0.3;
  }
`;

import { css } from '@emotion/react';

import theme from '@styles/theme';

export const s_monthHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 3.6rem;
  margin-bottom: 1rem;
`;

export const s_monthNavigationContainer = css`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  height: 100%;

  ${theme.typography.bodyMedium}
`;

export const s_monthNavigation = css`
  cursor: pointer;
  background-color: transparent;
  border: none;

  ${theme.typography.titleMedium}

  &:disabled {
    color: ${theme.colors.grey.primary};
  }
`;

export const s_dateSelectModeTabButtonContainer = css`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

// 2024 1월, 2024 12월을 그릴 때 텍스트의 너비가 달라져서 양 옆 버튼의 위치가 변경되는 문제를 해결하기 위해 고정 너비 적용. (@해리)
export const s_yearMonthText = css`
  display: inline-block;
  min-width: 12rem;
  text-align: center;
`;

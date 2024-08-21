import { css } from '@emotion/react';

import theme from '@styles/theme';

export const s_container = css`
  display: flex;
  flex-wrap: wrap;
  gap: 3.2rem;
  align-items: center;
  justify-content: center;
`;

const baseCircleButton = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;

  width: 7.6rem;
  height: 7.6rem;
  padding: 0.4rem;

  border: none;
  border-radius: 50%;
`;

export const s_cancelCircleButton = css`
  ${baseCircleButton};
  color: ${theme.colors.white};
  background-color: #ff6347;

  &:hover {
    background-color: #ff4d3d;
  }
`;

export const s_kakaoCircleButton = css`
  ${baseCircleButton};
  color: ${theme.colors.black};
  background-color: #f9e000;

  &:hover {
    background-color: #f9e555;
  }
`;

export const s_buttonText = css`
  ${theme.typography.bodyMedium}
`;

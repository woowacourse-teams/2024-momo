import { css } from '@emotion/react';

import theme from '@styles/theme';

export const s_table = css`
  cursor: pointer;
  user-select: none;

  border-spacing: 0.4rem 0.4rem;
  border-collapse: collapse;
  border-collapse: separate;

  width: 100%;
`;

export const s_td = css`
  cursor: pointer;
  padding: 8px;
  text-align: center;
  border-radius: 0.4rem;
`;

export const s_selected = css`
  color: white;
  background: ${theme.linear.selectedTime};
`;

export const s_th = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const s_cell = css`
  cursor: default;
  width: 4rem;
  height: 4rem;
`;

export const s_buttonContainer = css`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 1rem;
`;

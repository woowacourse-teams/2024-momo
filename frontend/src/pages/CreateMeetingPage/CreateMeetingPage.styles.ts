import { css } from '@emotion/react';

import theme from '@styles/theme';

export const s_formContainer = css`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

export const s_dropdownContainer = css`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-start;
`;

export const s_confirmContainer = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 1.6rem;
`;

export const s_confirm = css`
  width: 20rem;
  height: 4.8rem;

  font-size: 2rem;
  font-weight: 800;
  color: #fff;

  background: ${theme.colors.primary};
  border: none;
  border-radius: 8px;

  &:hover {
    color: ${theme.colors.primary};
    background: #fff;
    border: 1px solid ${theme.colors.primary};
  }
`;

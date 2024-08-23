import { css } from '@emotion/react';

import theme from '@styles/theme';

export const s_datesControlButtonContainer = css`
  position: absolute;
  top: 0;

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
    margin-right: 1rem;
  }
`;

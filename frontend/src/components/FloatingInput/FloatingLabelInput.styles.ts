import { css } from '@emotion/react';

import theme from '@styles/theme';

export const s_floatingLabelContainer = (isError: boolean) => css`
  position: relative;
  display: inline-block;
  width: 100%;
  color: ${isError ? '#EB1E1E' : '#71717a'};

  &:focus-within label {
    color: ${isError ? '#EB1E1E' : theme.colors.pink.medium};
  }
`;

export const s_floatingLabelInput = (isError: boolean) => css`
  appearance: none;
  box-shadow: ${isError ? `0 0 0 0.1rem #EB1E1E` : `0 0 0 0.1rem #71717a`};
  transition: box-shadow 0.3s;

  &::placeholder {
    color: #71717a;
  }

  &:focus {
    box-shadow: ${isError
      ? `0 0 0 0.1rem #EB1E1E`
      : `0 0 0 0.1rem ${theme.colors.pink.mediumLight}`};
  }
`;

export const s_floatingLabel = () => css`
  position: absolute;
  top: 0.4rem;
  left: 1em;

  ${theme.typography.captionMedium};

  background: transparent;

  transition: color 0.3s;
`;

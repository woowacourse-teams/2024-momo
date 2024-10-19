import { css } from '@emotion/react';

import theme from '@styles/theme';

export const s_floatingLabelContainer = css`
  position: relative;
  display: inline-block;
  width: 100%;
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

const getLabelTextColor = (isFocused: boolean, isError: boolean): string => {
  if (isError) return '#EB1E1E';

  if (isFocused) return theme.colors.pink.medium;

  return '#71717a';
};

export const s_floatingLabel = (isFocused: boolean, isError: boolean) => css`
  position: absolute;
  top: 0.4rem;
  left: 1em;

  ${theme.typography.captionMedium};

  color: ${getLabelTextColor(isFocused, isError)};

  background: transparent;

  transition: color 0.3s;
`;

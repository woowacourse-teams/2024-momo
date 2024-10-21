import type { CSSObject } from '@emotion/react';
import { css } from '@emotion/react';
import type { CSSProperties } from 'react';

import theme from '@styles/theme';

import type { ButtonSize } from '.';

interface Typography extends CSSObject {
  fontSize: string;
  fontWeight: CSSProperties['fontWeight'];
}

interface Size {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  padding: CSSProperties['padding'];
  typography: Typography;
}

const buttonSize: Record<ButtonSize, Size> = {
  xs: { height: '2rem', padding: '0.4rem', typography: theme.typography.captionBold },
  s: { padding: '0.8rem 1.2rem', typography: theme.typography.captionBold },
  m: { height: '3.6rem', padding: '0.8rem', typography: theme.typography.bodyBold },
  full: {
    width: '100%',
    padding: '0.8rem',
    height: '3.6rem',
    typography: theme.typography.bodyBold,
  },
};

export const s_baseButton = (borderRadius: number | string) => css`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;

  border-radius: ${borderRadius};

  :disabled {
    cursor: not-allowed;
    color: ${theme.colors.white};
    background: ${theme.colors.grey.primary};
    border: none;

    &:hover {
      color: ${theme.colors.white};
      background: ${theme.colors.grey.primary};
      border: none;
    }
  }
`;

export const s_variant = {
  primary: css`
    color: ${theme.colors.white};
    background-color: ${theme.colors.primary};
    border: none;

    &:hover {
      color: ${theme.colors.primary};
      background-color: ${theme.colors.white};
      border: 1px solid ${theme.colors.primary};
    }
  `,
  secondary: css`
    color: ${theme.colors.primary};
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.primary};

    &:hover {
      color: ${theme.colors.white};
      background-color: ${theme.colors.primary};
      border: none;
    }
  `,
  transparent: css`
    background-color: transparent;
    border: none;
  `,
  kakao: css`
    background-color: #f9e000;
    border: none;
  `,
};

export const s_size = (size: ButtonSize) => css`
  ${buttonSize[size].typography}
  width: ${buttonSize[size].width};
  height: ${buttonSize[size].height};
  padding: ${buttonSize[size].padding};
`;

export const s_headerIconButton = css`
  width: 2.4rem;
  height: 2.4rem;
  background-color: inherit;
`;

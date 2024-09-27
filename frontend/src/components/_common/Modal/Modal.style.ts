import { css } from '@emotion/react';
import type { CSSProperties } from 'react';

import theme from '@styles/theme';

import type { ModalPositionType, ModalSizeType } from './ModalContainer';

const sizeSelector: Record<ModalSizeType, CSSProperties['width']> = {
  small: '320px',
  almostFull: '90%',
  full: '100%',
};

export const s_container = css`
  position: fixed;
  z-index: 99;
  inset: 0;
`;

export const s_position = (position: ModalPositionType) => css`
  display: flex;
  align-items: ${position === 'bottom' ? 'flex-end' : 'center'};
  justify-content: center;
`;

export const s_backdrop = css`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 30%);
`;

export const s_content = css`
  position: absolute;

  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  padding: 2rem 1.6rem 1.6rem;

  background-color: ${theme.colors.white};
  border-radius: 1rem;
`;

export const s_size = (size: ModalSizeType) => css`
  width: ${sizeSelector[size]};
`;

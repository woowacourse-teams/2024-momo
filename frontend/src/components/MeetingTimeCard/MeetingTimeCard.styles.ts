import { css } from '@emotion/react';

import theme from '@styles/theme';

export const s_baseContainer = css`
  width: 100%;
  height: 100%;
  padding: 0.8rem 1.2rem;

  opacity: 0.7;
  background-color: ${theme.colors.timeTable.selected.light};
  border-radius: 0.8rem;
`;

export const s_recommendContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const s_optionContainer = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
`;

export const s_getSelectedStyle = (isSelected: boolean) => css`
  transition:
    transform 0.2s ease-in-out,
    opacity 0.2s ease-in-out;

  ${isSelected &&
  css`
    z-index: 1;
    transform: scale(1.02);
    opacity: 0.9;
    border: 1px solid ${theme.colors.primary};
  `};
`;

export const s_attendeeInfo = css`
  color: #6cd929;
  text-align: start;
  ${theme.typography.captionBold}
`;

export const s_dateInfo = css`
  ${theme.typography.bodyBold}
`;

export const s_checkboxContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const s_checkboxInput = css`
  cursor: pointer;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 2rem;
  height: 2rem;

  appearance: none;
  background-color: transparent;
  border: 2px solid ${theme.colors.grey.dark};
  border-radius: 0.4rem;

  transition: all 0.2s ease-in-out;

  &:checked {
    background-color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
  }

  &:checked::after {
    content: '';

    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);

    width: 0.6rem;
    height: 1rem;

    border: solid white;
    border-width: 0 2px 2px 0;
  }
`;

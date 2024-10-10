import { css } from '@emotion/react';

import theme from '@styles/theme';
import { PRIMITIVE_COLORS } from '@styles/tokens/colors';

export const s_container = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4.8rem;

  width: 100%;
  height: 100%;
`;

export const s_infoContainer = css`
  display: flex;
  flex: 2;
  flex-direction: column;
  gap: 4.8rem;
  align-items: center;
  justify-content: center;
`;

export const s_textContainer = css`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  justify-content: center;

  text-align: center;
  white-space: pre-line;
`;

export const s_titleText = css`
  ${theme.typography.titleBold}
`;

export const s_explanationText = css`
  ${theme.typography.bodyMedium}
`;

export const s_buttonContainer = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.8rem;
  ${theme.typography.bodyBold};

  width: 100%;
`;

export const s_pinkButton = css`
  width: 100%;
  height: 4.4rem;
  padding: 0.8rem;

  color: ${theme.colors.white};

  background-color: ${theme.colors.primary};
`;

export const s_lightPinkButton = css`
  width: 100%;
  height: 4.4rem;
  padding: 0.8rem;

  color: ${PRIMITIVE_COLORS.grey[500]};

  background-color: ${theme.colors.pink.light};
`;

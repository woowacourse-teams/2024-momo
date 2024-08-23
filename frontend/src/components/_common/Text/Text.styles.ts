import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { CSSProperties } from 'react';

import theme from '@styles/theme';
import type TYPOGRAPHY from '@styles/tokens/typography';

import type { TextVariant } from './Text.types';

const TEXT_COLOR_STYLES: Record<TextVariant, CSSProperties['color']> = {
  default: theme.colors.black,
  warning: '#EF4545',
  caption: '#71717a',
};

const TEXT_TYPOGRAPHIES: Record<keyof typeof TYPOGRAPHY, SerializedStyles> = {
  titleBold: css(theme.typography.titleBold),
  titleMedium: css(theme.typography.titleMedium),
  subTitleBold: css(theme.typography.subTitleBold),
  subTitleMedium: css(theme.typography.subTitleMedium),
  subTitleLight: css(theme.typography.subTitleLight),
  bodyBold: css(theme.typography.bodyBold),
  bodyMedium: css(theme.typography.bodyMedium),
  bodyLight: css(theme.typography.bodyLight),
  captionBold: css(theme.typography.captionBold),
  captionMedium: css(theme.typography.captionMedium),
  captionLight: css(theme.typography.captionLight),
};

export const s_textStyles = ({
  variant,
  typo,
}: {
  variant: TextVariant;
  typo: keyof typeof TYPOGRAPHY;
}) => {
  return css`
    color: ${TEXT_COLOR_STYLES[variant]};
    white-space: pre-line;
    vertical-align: middle;
    ${TEXT_TYPOGRAPHIES[typo]}
  `;
};

import type TYPOGRAPHY from '@styles/tokens/typography';

export type TextVariant = 'default' | 'caption' | 'warning' | 'accent';
export type TextTypo = keyof typeof TYPOGRAPHY;

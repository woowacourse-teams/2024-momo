import type { CSSProperties } from 'react';

type FontWeightKey = 'bold' | 'medium' | 'regular' | 'light';

const FontWeight: Record<FontWeightKey, CSSProperties['fontWeight']> = {
  bold: 700,
  medium: 500,
  regular: 400,
  light: 300,
};

const TYPOGRAPHY = {
  // title -> subtitle -> body -> caption
  titleBold: {
    fontSize: '2.4rem',
    fontWeight: FontWeight['bold'],
  },
  titleMedium: {
    fontSize: '2.4rem',
    fontWeight: FontWeight['medium'],
  },
  subTitleBold: {
    fontSize: '2.0rem',
    fontWeight: FontWeight['bold'],
  },
  subTitleMedium: {
    fontSize: '2.0rem',
    fontWeight: FontWeight['medium'],
  },
  subTitleLight: {
    fontSize: '2.0rem',
    fontWeight: FontWeight['light'],
  },
  bodyBold: {
    fontSize: '1.6rem',
    fontWeight: FontWeight['bold'],
  },
  bodyMedium: {
    fontSize: '1.6rem',
    fontWeight: FontWeight['medium'],
  },
  bodyLight: {
    fontSize: '1.6rem',
    fontWeight: FontWeight['light'],
  },
  captionBold: {
    fontSize: '1.2rem',
    fontWeight: FontWeight['bold'],
  },
  captionMedium: {
    fontSize: '1.2rem',
    fontWeight: FontWeight['medium'],
  },
  captionLight: {
    fontSize: '1.2rem',
    fontWeight: FontWeight['light'],
  },
};

export default TYPOGRAPHY;

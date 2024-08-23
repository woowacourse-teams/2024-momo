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
    lineHeight: '1.5',
  },
  titleMedium: {
    fontSize: '2.4rem',
    fontWeight: FontWeight['medium'],
    lineHeight: '1.5',
  },
  subTitleBold: {
    fontSize: '2.0rem',
    fontWeight: FontWeight['bold'],
    lineHeight: '1.5',
  },
  subTitleMedium: {
    fontSize: '2.0rem',
    fontWeight: FontWeight['medium'],
    lineHeight: '1.5',
  },
  subTitleLight: {
    fontSize: '2.0rem',
    fontWeight: FontWeight['light'],
    lineHeight: '1.5',
  },
  bodyBold: {
    fontSize: '1.6rem',
    fontWeight: FontWeight['bold'],
    lineHeight: '1.5',
  },
  bodyMedium: {
    fontSize: '1.6rem',
    fontWeight: FontWeight['medium'],
    lineHeight: '1.5',
  },
  bodyLight: {
    fontSize: '1.6rem',
    fontWeight: FontWeight['light'],
    lineHeight: '1.5',
  },
  captionBold: {
    fontSize: '1.2rem',
    fontWeight: FontWeight['bold'],
    lineHeight: '1.3',
  },
  captionMedium: {
    fontSize: '1.2rem',
    fontWeight: FontWeight['medium'],
    lineHeight: '1.3',
  },
  captionLight: {
    fontSize: '1.2rem',
    fontWeight: FontWeight['light'],
    lineHeight: '1.3',
  },
} as const; // 공통 Text 컴포넌트에서 size props의 타입을 정의하기 위해서 as const 사용하는 것으로 수정(@해리)

export default TYPOGRAPHY;

import { css } from '@emotion/react';

export const fontFaces = css`
  @font-face {
    font-family: Pretendard;
    font-weight: 300;
    src: url(${require('../assets/fonts/Pretendard-Light.subset.woff2')}) format('woff2');
  }

  @font-face {
    font-family: Pretendard;
    font-weight: 400;
    src: url(${require('../assets/fonts/Pretendard-Regular.subset.woff2')}) format('woff2');
  }

  @font-face {
    font-family: Pretendard;
    font-weight: 500;
    src: url(${require('../assets/fonts/Pretendard-Medium.subset.woff2')}) format('woff2');
  }

  @font-face {
    font-family: Pretendard;
    font-weight: 700;
    src: url(${require('../assets/fonts/Pretendard-Bold.subset.woff2')}) format('woff2');
  }
`;

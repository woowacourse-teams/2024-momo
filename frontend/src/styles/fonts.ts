import { css } from '@emotion/react';

export const fontFaces = css`
  @font-face {
    font-family: Pretendard;
    font-weight: 100;
    src: url(${require('../assets/fonts/Pretendard-Thin.woff2')}) format('woff2');
  }

  @font-face {
    font-family: Pretendard;
    font-weight: 200;
    src: url(${require('../assets/fonts/Pretendard-ExtraLight.woff2')}) format('woff2');
  }

  @font-face {
    font-family: Pretendard;
    font-weight: 300;
    src: url(${require('../assets/fonts/Pretendard-Light.woff2')}) format('woff2');
  }

  @font-face {
    font-family: Pretendard;
    font-weight: 400;
    src: url(${require('../assets/fonts/Pretendard-Regular.woff2')}) format('woff2');
  }

  @font-face {
    font-family: Pretendard;
    font-weight: 500;
    src: url(${require('../assets/fonts/Pretendard-Medium.woff2')}) format('woff2');
  }

  @font-face {
    font-family: Pretendard;
    font-weight: 600;
    src: url(${require('../assets/fonts/Pretendard-SemiBold.woff2')}) format('woff2');
  }

  @font-face {
    font-family: Pretendard;
    font-weight: 700;
    src: url(${require('../assets/fonts/Pretendard-Bold.woff2')}) format('woff2');
  }

  @font-face {
    font-family: Pretendard;
    font-weight: 800;
    src: url(${require('../assets/fonts/Pretendard-ExtraBold.woff2')}) format('woff2');
  }

  @font-face {
    font-family: Pretendard;
    font-weight: 900;
    src: url(${require('../assets/fonts/Pretendard-Black.woff2')}) format('woff2');
  }
`;

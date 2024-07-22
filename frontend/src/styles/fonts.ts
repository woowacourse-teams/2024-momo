import { css } from '@emotion/react';

export const fontFaces = css`
  @font-face {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 100;
    src: url(${require('../assets/fonts/SpoqaHanSansNeo-Thin.woff2')}) format('woff2');
  }

  @font-face {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 300;
    src: url(${require('../assets/fonts/SpoqaHanSansNeo-Light.woff2')}) format('woff2');
  }

  @font-face {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 400;
    src: url(${require('../assets/fonts/SpoqaHanSansNeo-Regular.woff2')}) format('woff2');
  }

  @font-face {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 500;
    src: url(${require('../assets/fonts/SpoqaHanSansNeo-Medium.woff2')}) format('woff2');
  }

  @font-face {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 700;
    src: url(${require('../assets/fonts/SpoqaHanSansNeo-Bold.woff2')}) format('woff2');
  }
`;

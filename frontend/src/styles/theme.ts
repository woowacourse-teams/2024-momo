import type { Theme } from '@emotion/react';

const theme: Theme = {
  color: {
    primary: '#ff8da6',
    holiday: '#ff0000',
    primaryUnselected: '#f0f0f0',
  },
  linear: {
    selectedTime: 'linear-gradient(180deg, rgba(248, 170, 130, 0.3) 0%, #FFADBF 100%)',
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    bold: 700,
    extraBold: 800,
  },
  fontSize: {
    xs: '1.2rem',
    small: '1.4rem',
    medium: '1.6rem',
    large: '2rem',
    xl: '2.4rem',
  },
};

export default theme;

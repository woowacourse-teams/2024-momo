import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      primary: string;
      holiday: string;
      primaryUnselected: string;
    };
    linear: {
      selectedTime: string;
    };
    fontWeight: {
      light: number;
      normal: number;
      medium: number;
      bold: number;
      extraBold: number;
    };
    fontSize: {
      xs: string;
      small: string;
      medium: string;
      large: string;
      xl: string;
    };
  }
}

const PRIMITIVE_COLORS = {
  black: '#000000',
  white: '#ffffff',
  // 현재 달력에서 공휴일 색을 표시하기 위해서 빨간색을 사용하고 있는데, 빨간색도 palette를 사용해야 할지는 미정(@해리)
  red: '#ff0000',

  pink: {
    100: '#FFEBE8',
    200: '#FFD4D1',
    300: '#FFBABC',
    400: '#FFA9B4',
    500: '#FF8DA6',
    600: '#DB678B',
    700: '#B74775',
    800: '#932C61',
    900: '#7A1B54',
  },
  grey: {
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
} as const;

export const SEMANTIC_COLORS = {
  white: PRIMITIVE_COLORS.white,
  black: PRIMITIVE_COLORS.black,
  primary: PRIMITIVE_COLORS.pink['500'],
  calendar: {
    color: {
      saturday: '#8c9eff',
      holiday: '#fa665b',
      today: '#4dc561',
      selected: '#f50057',
    },
    backgroundColor: {
      today: '#cff0da',
      selected: PRIMITIVE_COLORS.pink['200'],
    },
  },
  holiday: PRIMITIVE_COLORS.red,
  grey: {
    primary: PRIMITIVE_COLORS.grey['200'],
    dark: PRIMITIVE_COLORS.grey['500'],
  },
  timeTable: {
    unselected: {
      light: PRIMITIVE_COLORS.grey['200'],
      dark: PRIMITIVE_COLORS.grey['500'],
    },
    selected: {
      light: PRIMITIVE_COLORS.pink['100'],
      mediumLight: PRIMITIVE_COLORS.pink['200'],
      medium: PRIMITIVE_COLORS.pink['300'],
      mediumDark: PRIMITIVE_COLORS.pink['400'],
      dark: PRIMITIVE_COLORS.pink['500'],
      darker: PRIMITIVE_COLORS.pink['600'],
      darkest: PRIMITIVE_COLORS.pink['700'],
      deep: PRIMITIVE_COLORS.pink['800'],
      deepDark: PRIMITIVE_COLORS.pink['900'],
    },
  },
} as const;

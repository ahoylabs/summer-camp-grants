export const colors = {
  bg: {
    black: '#1A1A1A',
    blue: '#F1F9FF',
    fancy: 'linear-gradient(0.25turn, #AC12E2, #5161F6)',
    gray: '#F8F8F8',
    green: '#E8FFFA',
    lightBlue: '#F2F7FF',
    purple: '#FCF2FF',
    red: '#fff4f3',
    white: '#FFFFFF',
  },
  brand: {
    phantomPurple: '#4D44CE',
    twitterBlue: '#1DA1F2',
  },
  hover: {
    black: '#000000',
    blue: '#424fc7',
    fancy: '#343f9e',
    green: '#009483',
  },
  line: {
    black: '#0000001F',
    white: '#FFFFFF1F',
  },
  shadow: {
    button: '#00000021',
    hover: '#00000040',
    thicc: '#00000024',
    thin: '#00000014',
  },
  spot: {
    blue: '#5161F6',
    darkPurple: '#5512E2',
    /** you need to use `background` with this - not `background-color` */
    fancy: 'linear-gradient(0.25turn, #E21239, #5161F6)',
    green: '#00B29D',
    lightBlue: '#5991FF',
    purple: '#AC12E2',
    red: '#E21239',
  },
  text: {
    blackPrimary: '#1A1A1A',
    blackSecondary: '#707070',
    blackTertiary: '#a6a6a6',
    whitePrimary: '#FFFFFF',
    whiteSecondary: '#FFFFFFA8',
  },
} as const

import type { PaletteColorOptions } from '@mui/material/styles';

export const primary = {
  50: '#EAEBF0',
  100: '#C5C8D2',
  200: '#9CA1B1',
  300: '#737A91',
  400: '#545C7A',
  500: '#363F62',
  600: '#2C354F',
  700: '#202742',
  800: '#1B1F3A',
  900: '#0E1124',
  main: '#1B1F3A',
  light: '#363F62',
  dark: '#0E1124',
  contrastText: '#FFFFFF',
} as const satisfies PaletteColorOptions;

export const secondary = {
  50: '#FBF4EC',
  100: '#F5E1CD',
  200: '#ECCBAB',
  300: '#E2B58A',
  400: '#D9A77D',
  500: '#C2895C',
  600: '#A06D45',
  700: '#7D5333',
  800: '#5A3A22',
  900: '#382212',
  main: '#D9A77D',
  light: '#E2B58A',
  dark: '#C2895C',
  contrastText: '#FFFFFF',
} as const satisfies PaletteColorOptions;

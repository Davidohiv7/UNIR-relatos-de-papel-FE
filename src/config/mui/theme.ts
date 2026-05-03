import { createTheme } from '@mui/material/styles';
import { primary, secondary } from './palette';
import { typography } from './typography';

declare module '@mui/material/styles' {
  interface PaletteColor {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
  }

  interface SimplePaletteColorOptions {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
  }
}

export const theme = createTheme({
  palette: {
    primary,
    secondary,
    background: {
      default: secondary[50],
      paper: primary.contrastText,
    },
    text: {
      primary: primary.main,
      secondary: primary[400],
    },
  },
  typography,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

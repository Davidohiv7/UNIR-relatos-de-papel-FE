import type { ThemeOptions } from '@mui/material/styles';

const SANS_FALLBACK = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
].join(', ');

const HEADING_FONT = `"Caveat Variable", Caveat, "Brush Script MT", cursive`;
const BODY_FONT = `"Inter Variable", Inter, ${SANS_FALLBACK}`;

export const typography: ThemeOptions['typography'] = {
  fontFamily: BODY_FONT,
  h1: { fontFamily: HEADING_FONT, fontWeight: 600 },
  h2: { fontFamily: HEADING_FONT, fontWeight: 600 },
  h3: { fontFamily: HEADING_FONT, fontWeight: 600 },
  h4: { fontFamily: HEADING_FONT, fontWeight: 600 },
  h5: { fontFamily: HEADING_FONT, fontWeight: 600 },
  h6: { fontFamily: HEADING_FONT, fontWeight: 600 },
};

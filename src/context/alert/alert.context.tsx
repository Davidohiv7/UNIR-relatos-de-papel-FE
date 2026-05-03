import { createContext } from 'react';
import type { AlertColor } from '@mui/material';

export type AlertState = {
  open: boolean;
  message: string;
  severity: AlertColor;
};

export type AlertContextValue = {
  alert: AlertState;
  showAlert: (message: string, severity?: AlertColor) => void;
  hideAlert: () => void;
};

export const AlertContext = createContext<AlertContextValue | null>(null);

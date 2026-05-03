import { type FC, type ReactNode, useState, useCallback, useMemo } from 'react';
import { Snackbar, Alert } from '@mui/material';
import type { AlertColor } from '@mui/material';
import { AlertContext, type AlertState } from './alert.context';

type Props = {
  children: ReactNode;
};

const DEFAULT_STATE: AlertState = { open: false, message: '', severity: 'success' };

export const AlertProvider: FC<Props> = ({ children }) => {
  const [alert, setAlert] = useState<AlertState>(DEFAULT_STATE);

  const showAlert = useCallback((message: string, severity: AlertColor = 'success') => {
    setAlert({ open: true, message, severity });
  }, []);

  const hideAlert = useCallback(() => {
    setAlert(prev => ({ ...prev, open: false }));
  }, []);

  const value = useMemo(() => ({ alert, showAlert, hideAlert }), [alert, showAlert, hideAlert]);

  return (
    <AlertContext.Provider value={value}>
      {children}
      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={hideAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={hideAlert}
          severity={alert.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

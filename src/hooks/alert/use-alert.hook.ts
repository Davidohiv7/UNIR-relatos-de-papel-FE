import { useContext } from 'react';
import { AlertContext } from '../../context/alert/alert.context';

export const useAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlert must be used within AlertProvider');
  return ctx;
};

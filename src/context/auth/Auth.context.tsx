import { createContext } from 'react';
import { type SafeCustomer } from '../../services';

export type AuthContextValue = {
  customer: SafeCustomer | null;
  isInitializing: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: (redirectTo?: string) => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

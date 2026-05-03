import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { mockUsers } from '../../mocks/customer.mock';
import { useCustomerState } from '../../hooks';
import { getPostLoginRedirect } from '../../utils/auth.utils';
import { AuthContext, type AuthContextValue } from './Auth.context';

type Props = {
  children: ReactNode;
};

function AuthProvider({ children }: Props) {
  const [customer, setCustomer] = useCustomerState();
  const [isInitializing] = useState(false);
  const navigate = useNavigate();

  const login: AuthContextValue['login'] = async (email, password) => {
    const foundCustomer = mockUsers.find(
      candidate => candidate.email === email && candidate.password === password
    );

    if (!foundCustomer) {
      throw new Error('Credenciales incorrectas');
    }

    const { password: _, ...safeCustomer } = foundCustomer;
    setCustomer(safeCustomer);
    navigate(getPostLoginRedirect(window.location.search));
  };

  const logout: AuthContextValue['logout'] = redirectTo => {
    setCustomer(null);
    if (redirectTo) {
      navigate(redirectTo);
    }
  };

  return (
    <AuthContext.Provider value={{ customer, isInitializing, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

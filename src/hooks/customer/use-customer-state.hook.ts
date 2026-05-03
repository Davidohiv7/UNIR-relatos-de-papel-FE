import { useCallback, useState } from 'react';
import type { SafeCustomer } from '../../services';
import {
  clearStoredCustomer,
  readStoredCustomer,
  writeStoredCustomer,
} from '../../utils/customer-storage.utils';

type SetCustomer = (customer: SafeCustomer | null) => void;

const useCustomerState = (): [SafeCustomer | null, SetCustomer] => {
  const [customer, setCustomerState] = useState<SafeCustomer | null>(() => readStoredCustomer());

  const setCustomer = useCallback<SetCustomer>(next => {
    setCustomerState(next);
    if (next === null) {
      clearStoredCustomer();
    } else {
      writeStoredCustomer(next);
    }
  }, []);

  return [customer, setCustomer];
};

export { useCustomerState };

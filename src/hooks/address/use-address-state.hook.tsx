import { useState } from 'react';
import { mockAddresses } from '../../mocks/addresses.mock';
import type { Address } from '../../types';
import type { AddressInput } from '../../types/address.types';

const useAddressState = (customerId: number) => {
  const [addresses, setAddresses] = useState<Address[]>(() => mockAddresses.get(customerId) ?? []);

  const addAddress = (address: AddressInput) => {
    const nextId = Math.max(0, ...addresses.map(addr => addr.id)) + 1;
    setAddresses([...addresses, { ...address, id: nextId }]);
  };

  return { addresses, addAddress };
};

export { useAddressState };

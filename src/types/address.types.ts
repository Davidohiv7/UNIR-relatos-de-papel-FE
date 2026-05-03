export type Address = {
  id: number;
  line1: string;
  line2?: string;
  city: string;
};

export type AddressInput = Omit<Address, 'id'>;

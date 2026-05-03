export enum ProfileSection {
  PROFILE = 'profile',
  ORDERS = 'orders',
  ADDRESSES = 'addresses',
  LOGOUT = 'logout',
}

export type ProfileItem = {
  id: ProfileSection;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle?: string;
};

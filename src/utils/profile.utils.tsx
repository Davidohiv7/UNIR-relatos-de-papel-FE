import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import { PersonOutlineOutlined } from '@mui/icons-material';
import { ProfileSection, type ProfileItem } from '../types/profile.types';

import ProfileFormSection from '../components/profile/sections/profile-form-section';
import ProfileOrdersSection from '../components/profile/sections/profile-orders-section';

import { SafeCustomer } from '../services';
import ProfileAddressesSection from '../components/profile/sections/profile-address-section';

export const getProfileMenuItems = ({
  totalOrders,
  savedAddresses,
}: {
  totalOrders: number;
  savedAddresses: number;
}): ProfileItem[] => [
  {
    id: ProfileSection.PROFILE,
    title: 'Mi Perfil',
    subtitle: 'Datos personales',
    icon: <PersonOutlineOutlined sx={{ color: 'white' }} />,
    iconBg: 'primary.main',
  },
  {
    id: ProfileSection.ORDERS,
    title: 'Mis Pedidos',
    subtitle: `${totalOrders} pedidos`,
    icon: <Inventory2OutlinedIcon sx={{ color: 'white' }} />,
    iconBg: 'secondary.main',
  },

  {
    id: ProfileSection.ADDRESSES,
    title: 'Direcciones',
    subtitle: `${savedAddresses} guardadas`,
    icon: <LocationOnOutlinedIcon sx={{ color: 'white' }} />,
    iconBg: 'success.main',
  },
];

export const renderProfileSection = (section: ProfileSection, customer: SafeCustomer) => {
  switch (section) {
    case ProfileSection.PROFILE:
      return <ProfileFormSection customer={customer} />;
    case ProfileSection.ORDERS:
      return <ProfileOrdersSection customer={customer} />;
    case ProfileSection.ADDRESSES:
      return <ProfileAddressesSection customer={customer} />;

    default:
      return <ProfileFormSection customer={customer} />;
  }
};

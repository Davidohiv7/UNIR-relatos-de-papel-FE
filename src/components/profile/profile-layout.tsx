import { Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { getProfileMenuItems } from '../../utils/profile.utils';

import { ProfileSection } from '../../types/profile.types';
import ProfileItemCard from './profile-item-card';

interface ProfileProps {
  activeSection: string;
  onChangeSection: (section: string) => void;
  onLogout?: () => void;
}

export default function ProfileLayout({ activeSection, onChangeSection, onLogout }: ProfileProps) {
  const items = getProfileMenuItems({
    totalOrders: 3,
    savedAddresses: 2,
  });

  return (
    <Stack spacing={2}>
      {items.map(item => {
        const isActive = activeSection === item.id;
        return (
          <ProfileItemCard
            key={item.id}
            item={item}
            isActive={isActive}
            onClick={() => onChangeSection(item.id)}
          />
        );
      })}

      <ProfileItemCard
        item={{
          id: ProfileSection.LOGOUT,
          icon: <LogoutIcon sx={{ color: 'white' }} />,
          iconBg: 'error.main',
          title: 'Cerrar Sesión',
        }}
        isActive={false}
        onClick={onLogout}
        color="error"
        textColor="error.main"
        sx={{ borderColor: 'error.main' }}
      />
    </Stack>
  );
}

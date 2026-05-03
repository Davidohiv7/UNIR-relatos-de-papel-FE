import { Box } from '@mui/material';
import { ProfileSection } from '../../types/profile.types';
import type { FC } from 'react';
import ProfileLayout from './profile-layout';
import { SafeCustomer } from '../../services';
import { renderProfileSection } from '../../utils/profile.utils';

type ProfileProps = {
  activeSection: ProfileSection;
  onChangeSection: (section: ProfileSection) => void;
  onLogout?: () => void;
  customer: SafeCustomer;
};

const Profile: FC<ProfileProps> = ({
  activeSection,
  onChangeSection,
  onLogout,
  customer,
}: ProfileProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4,
        alignItems: 'flex-start',
      }}
    >
      <Box sx={{ width: { xs: '100%', md: '300px' }, flexShrink: 0 }}>
        <ProfileLayout
          activeSection={activeSection}
          onChangeSection={onChangeSection}
          onLogout={onLogout}
        />
      </Box>

      <Box sx={{ flexGrow: 1, width: '100%' }}>{renderProfileSection(activeSection, customer)}</Box>
    </Box>
  );
};

export default Profile;

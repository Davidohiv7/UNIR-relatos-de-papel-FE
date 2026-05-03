import { useState } from 'react';
import { Container, Stack } from '@mui/material';
import { useAuth } from '../../hooks';
import { ProfileSection } from '../../types/profile.types';
import ProfileHeader from '../../components/profile/profile-header';
import { Profile } from '../../components/profile';

function ProfilePage() {
  const { customer, logout } = useAuth();

  const [activeSection, setActiveSection] = useState<ProfileSection>(ProfileSection.PROFILE);

  if (!customer) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <ProfileHeader customer={customer} />

        <Profile
          activeSection={activeSection}
          onChangeSection={setActiveSection}
          onLogout={logout}
          customer={customer}
        />
      </Stack>
    </Container>
  );
}

export default ProfilePage;

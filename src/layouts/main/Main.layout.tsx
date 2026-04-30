import { Outlet } from 'react-router';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

function MainLayout() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default MainLayout;

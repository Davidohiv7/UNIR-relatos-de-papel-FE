import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../hooks';
import { getProtectedRouteRedirect } from '../../utils/auth.utils';
import { useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';

function ProtectedRoute() {
  const { customer, isInitializing } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isInitializing) {
      return;
    }
    if (!customer) {
      navigate(getProtectedRouteRedirect(location));
    }
  }, [isInitializing, customer, location]);

  if (isInitializing) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;

import { Box } from '@mui/material';
import { MenuBook } from '@mui/icons-material';

type Props = {
  variant?: 'primary' | 'secondary';
};

function BrandIcon({ variant = 'primary' }: Props) {
  return (
    <Box
      sx={{
        bgcolor: `${variant}.main`,
        color: `${variant}.contrastText`,
        width: 40,
        height: 40,
        borderRadius: 2,
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <MenuBook fontSize="small" />
    </Box>
  );
}

export default BrandIcon;

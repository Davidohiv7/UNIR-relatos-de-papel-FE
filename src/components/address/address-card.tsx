import {
  Card,
  CardContent,
  Stack,
  Typography,
  CardActionArea,
  alpha,
  useTheme,
} from '@mui/material';
import type { Address } from '../../types';

type Props = {
  address: Address;
  isSelected?: boolean;
  onSelect?: (id: number) => void;
};

const AddressCardContent: React.FC<{ address: Address; isSelected?: boolean }> = ({
  address,
  isSelected,
}) => {
  return (
    <CardContent>
      <Stack spacing={0.5}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: isSelected ? 'secondary.800' : 'text.primary' }}
        >
          {address.line1}
        </Typography>
        {address.line2 && (
          <Typography
            variant="body2"
            sx={{ color: isSelected ? 'secondary.700' : 'text.secondary' }}
          >
            {address.line2}
          </Typography>
        )}
        <Typography variant="body2" sx={{ color: isSelected ? 'secondary.700' : 'text.secondary' }}>
          {address.city}
        </Typography>
      </Stack>
    </CardContent>
  );
};

function AddressCard({ address, isSelected, onSelect }: Props) {
  const { palette } = useTheme();

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: isSelected ? 'secondary.main' : 'divider',
        borderWidth: isSelected ? 2 : 1,
        bgcolor: isSelected ? alpha(palette.secondary.main, 0.3) : 'background.paper',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: isSelected ? 'secondary.main' : 'divider',
        },
      }}
    >
      {onSelect ? (
        <CardActionArea onClick={() => onSelect(address.id)}>
          <AddressCardContent address={address} isSelected={isSelected} />
        </CardActionArea>
      ) : (
        <AddressCardContent address={address} />
      )}
    </Card>
  );
}

export default AddressCard;

import { Avatar } from '@mui/material';

type Size = 'small' | 'medium' | 'large';

const SIZE_MAP: Record<Size, number> = {
  small: 28,
  medium: 36,
  large: 56,
};

type Props = {
  firstName: string;
  lastName: string;
  size?: Size;
};

const getInitials = (firstName: string, lastName: string): string => {
  const first = firstName.trim()[0] ?? '';
  const last = lastName.trim()[0] ?? '';
  return `${first}${last}`.toUpperCase();
};

function CustomerAvatar({ firstName, lastName, size = 'medium' }: Props) {
  const dimension = SIZE_MAP[size];

  return (
    <Avatar
      sx={{
        width: dimension,
        height: dimension,
        bgcolor: 'secondary.main',
        color: 'secondary.contrastText',
        fontSize: dimension * 0.38,
        fontWeight: 600,
      }}
    >
      {getInitials(firstName, lastName)}
    </Avatar>
  );
}

export default CustomerAvatar;

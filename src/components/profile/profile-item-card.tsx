import { alpha, Box, ButtonBase, Typography, useTheme, type SxProps } from '@mui/material';
import { ProfileItem } from '../../types/profile.types';

type ProfileItemProps = {
  item: ProfileItem;
  isActive: boolean;
  onClick: () => void;
  color?: 'secondary' | 'error';
  textColor?: 'text.secondary' | 'error.main';
  sx?: SxProps;
};

function ProfileItemCard({
  item,
  isActive,
  onClick = () => {},
  color = 'secondary',
  textColor = 'text.secondary',
  sx,
}: ProfileItemProps) {
  const theme = useTheme();
  return (
    <ButtonBase
      key={item.id}
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        p: 2,
        width: '100%',
        bgcolor: isActive ? alpha(theme.palette[color].main, 0.2) : 'common.white',
        borderRadius: 4,
        border: '1px solid',
        borderColor: isActive ? `${color}.main` : 'common.white',
        textAlign: 'left',
        transition: 'all 0.2s ease-in-out',

        '&:hover': {
          borderColor: `${color}.dark`,
          bgcolor: alpha(theme.palette[color].main, 0.5),
        },
        ...sx,
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          bgcolor: item.iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mr: 2,
          flexShrink: 0,
        }}
      >
        {item.icon}
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: isActive ? 700 : 600 }}>
          {item.title}
        </Typography>
        {item.subtitle && (
          <Typography variant="body2" color={textColor}>
            {item.subtitle}
          </Typography>
        )}
      </Box>
    </ButtonBase>
  );
}

export default ProfileItemCard;

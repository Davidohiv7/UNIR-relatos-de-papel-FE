import { useMemo, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { MenuBook } from '@mui/icons-material';
import { seedIndex, getInitials } from '../../utils/color.utils';

type Props = {
  src: string;
  alt: string;
  size: number;
};

function BookFallback({ alt, size }: { alt: string; size: number }) {
  const theme = useTheme();

  const fallbackColors = useMemo(
    () => [
      theme.palette.primary.main,
      theme.palette.primary.light,
      theme.palette.primary.dark,
      theme.palette.secondary.main,
      theme.palette.secondary.light,
      theme.palette.secondary.dark,
    ],
    [theme]
  );

  const bg = fallbackColors[seedIndex(alt, fallbackColors.length)];
  const initials = getInitials(alt);

  return (
    <Box
      sx={{
        width: size,
        height: size * 1.5,
        minWidth: size,
        borderRadius: 1.5,
        bgcolor: bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.5,
        color: 'common.white',
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      <MenuBook sx={{ fontSize: size * 0.3, opacity: 0.9 }} />
      {initials && (
        <Typography
          sx={{
            fontSize: size * 0.16,
            fontWeight: 700,
            opacity: 0.85,
            lineHeight: 1,
            letterSpacing: 1,
          }}
        >
          {initials}
        </Typography>
      )}
    </Box>
  );
}

function BookImage({ src, alt, size }: Props) {
  const [errorSrc, setErrorSrc] = useState<string | null>(null);
  const hasError = Boolean(errorSrc && errorSrc === src);

  if (!src || hasError) {
    return <BookFallback alt={alt} size={size} />;
  }

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setErrorSrc(src)}
      sx={{
        width: size,
        height: size * 1.5,
        minWidth: size,
        objectFit: 'cover',
        borderRadius: 1.5,
        bgcolor: 'grey.100',
        flexShrink: 0,
        display: 'block',
      }}
    />
  );
}

export default BookImage;

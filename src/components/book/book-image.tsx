import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { MenuBook } from '@mui/icons-material';

const FALLBACK_COLORS = [
  '#5C6BC0',
  '#42A5F5',
  '#26A69A',
  '#66BB6A',
  '#FFA726',
  '#EC407A',
  '#AB47BC',
  '#EF5350',
];

function seedColor(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  return FALLBACK_COLORS[Math.abs(hash) % FALLBACK_COLORS.length];
}

function getInitials(title: string): string {
  return title
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('');
}

type Props = {
  src: string;
  alt: string;
  size: number;
};

function BookFallback({ alt, size }: { alt: string; size: number }) {
  const bg = seedColor(alt);
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

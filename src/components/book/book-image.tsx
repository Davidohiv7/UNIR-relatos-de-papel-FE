import { Box } from '@mui/material';
import { FC } from 'react';

type Props = {
  src: string;
  alt: string;
  size: number;
};

const BookImage: FC<Props> = ({ src, alt, size }) => {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      sx={{
        width: size,
        height: size * 1.5,
        objectFit: 'cover',
        borderRadius: 1,
        bgcolor: 'grey.100',
      }}
    />
  );
};

export default BookImage;

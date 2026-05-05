import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router';

import type { Book } from '../../types';
import { ROUTES } from '../../config/navigation/navigation.config';
import { formatPrice } from '../../utils/price.utils';
import { FORMAT_LABELS } from '../../constants/book.constants';
import BookImage from './book-image';
import { InfoOutlined } from '@mui/icons-material';

type Props = {
  book: Book;
};

function BookCard({ book }: Props) {
  const cover = book.pictures[0]?.url ?? '';
  const route = ROUTES.book.replace(':id', String(book.id));
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(route);
  };

  return (
    <Card
      variant="outlined"
      onClick={handleCardClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-2px)',
        },
        animation: 'fadeInUp 0.3s ease both',
        '@keyframes fadeInUp': {
          from: { opacity: 0, transform: 'translateY(8px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 2.5, pb: 2 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ position: 'relative', flexShrink: 0 }}>
            <BookImage src={cover} alt={book.title} size={88} />
            <Chip
              label={book.year}
              size="small"
              color="secondary"
              sx={{
                position: 'absolute',
                right: 6,
                bottom: 6,
                height: 20,
                fontSize: '0.68rem',
                fontWeight: 600,
              }}
            />
          </Box>
          <Stack spacing={1} sx={{ minWidth: 0, flexGrow: 1 }}>
            <Tooltip title={book.title} placement="top" enterDelay={700}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, lineHeight: 1.3, cursor: 'default' }}
                noWrap
              >
                {book.title}
              </Typography>
            </Tooltip>
            <Typography variant="body2" color="text.secondary" noWrap>
              {book.author}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              <Chip
                size="small"
                label={FORMAT_LABELS[book.format]}
                variant="outlined"
                sx={{ fontSize: '0.68rem', height: 20 }}
              />
              {book.tag?.name && (
                <Chip
                  size="small"
                  color="secondary"
                  label={book.tag.name}
                  sx={{ fontSize: '0.68rem', height: 20 }}
                />
              )}
            </Box>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
              <Rating value={book.rating} precision={0.1} readOnly size="small" />
              <Typography variant="caption" color="text.secondary">
                ({book.reviewsCount})
              </Typography>
            </Stack>
            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: 700, lineHeight: 1.2, pt: 0.5 }}
            >
              {formatPrice(book.price)}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
        <Button
          component={Link}
          to={route}
          variant="outlined"
          size="small"
          startIcon={<InfoOutlined />}
          sx={{ borderRadius: 1.5, flexShrink: 0 }}
        >
          Detalle
        </Button>
      </CardActions>
    </Card>
  );
}

export default BookCard;

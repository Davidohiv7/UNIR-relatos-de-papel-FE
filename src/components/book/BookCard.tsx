import { useState } from 'react';
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
import { ShoppingBagOutlined, CheckCircleOutlined, InfoOutlined } from '@mui/icons-material';
import { Link } from 'react-router';

import type { Book } from '../../types';
import { BookFormat } from '../../types';
import { ROUTES } from '../../config/navigation/navigation.config';
import { useShoppingCart } from '../../hooks';
import { formatPrice } from '../../utils/price.utils';
import BookImage from './book-image';

type Props = {
  book: Book;
};

const formatLabel = (format: BookFormat): string =>
  format === BookFormat.PHYSICAL ? 'Físico' : 'Digital';

function BookCard({ book }: Props) {
  const cover = book.pictures[0]?.url ?? '';
  const route = ROUTES.book.replace(':id', String(book.id));
  const { addItem, cart } = useShoppingCart();
  const [added, setAdded] = useState(false);

  const inCart = Boolean(cart[book.id]);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(book, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
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
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
          <BookImage src={cover} alt={book.title} size={88} />
          <Stack spacing={0.75} sx={{ minWidth: 0, flexGrow: 1 }}>
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
                label={formatLabel(book.format)}
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
            <Typography variant="h6" color="primary" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              {formatPrice(book.price)}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0.5, gap: 1 }}>
        <Button
          component={Link}
          to={route}
          variant="outlined"
          size="small"
          startIcon={<InfoOutlined />}
          sx={{ borderRadius: 2, flexShrink: 0 }}
        >
          Detalle
        </Button>
        <Button
          variant="contained"
          size="small"
          disableElevation
          onClick={handleAdd}
          startIcon={added ? <CheckCircleOutlined /> : <ShoppingBagOutlined />}
          color={added ? 'success' : inCart ? 'secondary' : 'primary'}
          sx={{ borderRadius: 2, flexGrow: 1, transition: 'background-color 0.2s' }}
        >
          {added ? '¡Añadido!' : inCart ? 'Añadir más' : 'Al carrito'}
        </Button>
      </CardActions>
    </Card>
  );
}

export default BookCard;

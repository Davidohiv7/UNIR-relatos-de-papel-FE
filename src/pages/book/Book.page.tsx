import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Rating,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import {
  ArrowBack,
  ShoppingBagOutlined,
  CheckCircleOutlined,
  MenuBook,
  CalendarMonth,
  Language,
  Inventory2Outlined,
} from '@mui/icons-material';

import { booksService } from '../../services';
import { useShoppingCart } from '../../hooks';
import { QuantityInput } from '../../components/inputs/quantity-input';
import BookImage from '../../components/book/book-image';
import { BookCard } from '../../components/book';
import type { Book } from '../../types';
import { BookFormat } from '../../types';
import { ROUTES, buildCatalogUrl } from '../../config/navigation/navigation.config';
import { formatPrice } from '../../utils/price.utils';

function BookDetailSkeleton() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Skeleton width={120} height={36} sx={{ mb: 3 }} />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '300px 1fr' },
          gap: { xs: 3, md: 5 },
        }}
      >
        <Skeleton variant="rounded" sx={{ width: '100%', aspectRatio: '2/3', borderRadius: 2 }} />
        <Stack spacing={2}>
          <Skeleton width="70%" height={48} />
          <Skeleton width="40%" height={28} />
          <Skeleton width={120} height={28} />
          <Skeleton width="90%" height={20} />
          <Skeleton width="80%" height={20} />
          <Skeleton width="60%" height={20} />
        </Stack>
      </Box>
    </Container>
  );
}

type MetaItemProps = { icon: React.ReactNode; label: string; value: string };
function MetaItem({ icon, label, value }: MetaItemProps) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      <Box sx={{ color: 'text.secondary', display: 'flex' }}>{icon}</Box>
      <Typography variant="body2" color="text.secondary">
        {label}:
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {value}
      </Typography>
    </Stack>
  );
}

function BookPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cart, addItem } = useShoppingCart();

  const [book, setBook] = useState<Book | null>(null);
  const [related, setRelated] = useState<Book[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [addedFeedbackId, setAddedFeedbackId] = useState<number | null>(null);

  const bookId = Number(id);
  const isInvalidId = !bookId || Number.isNaN(bookId);
  const activeBook = useMemo(() => {
    if (!bookId || Number.isNaN(bookId)) return null;
    return book?.id === bookId ? book : null;
  }, [book, bookId]);
  const activeRelated = useMemo(() => {
    if (!bookId || Number.isNaN(bookId)) return [];
    return book?.id === bookId ? related : [];
  }, [book, bookId, related]);
  const quantity = quantities[bookId] ?? 1;
  const addedFeedback = addedFeedbackId === bookId;
  const cartItem = activeBook ? cart[activeBook.id] : undefined;
  const inCart = Boolean(cartItem);
  const isLoading = !isInvalidId && !activeBook && !notFound;

  useEffect(() => {
    if (isInvalidId) return;

    const controller = new AbortController();

    booksService
      .getBookById(bookId, controller.signal)
      .then(result => {
        if (!result) {
          setNotFound(true);
          return;
        }
        setBook(result);
        return booksService.getRelatedBooks(result.id, 4, controller.signal);
      })
      .then(rel => {
        if (rel) setRelated(rel);
      })
      .catch(() => {
        if (!controller.signal.aborted) setNotFound(true);
      });

    return () => controller.abort();
  }, [bookId, isInvalidId]);

  const handleQuantityChange = (value: number) => {
    if (isInvalidId) return;
    setQuantities(current => ({ ...current, [bookId]: value }));
  };

  const handleAddToCart = () => {
    if (!activeBook) return;
    addItem(activeBook, quantity);
    setAddedFeedbackId(activeBook.id);
    setTimeout(() => setAddedFeedbackId(null), 2000);
  };

  if (isLoading) return <BookDetailSkeleton />;

  if (isInvalidId || (!activeBook && notFound)) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Libro no encontrado
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Este libro no existe o fue removido del catálogo.
        </Typography>
        <Button variant="contained" onClick={() => navigate(ROUTES.catalog)}>
          Volver al catálogo
        </Button>
      </Container>
    );
  }

  const cover = activeBook.pictures[0]?.url ?? '';
  const stockWarning = activeBook.stock > 0 && activeBook.stock <= 5;
  const outOfStock = activeBook.stock === 0;

  return (
    <Box sx={{ py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">
        {/* Back to catalog */}
        <Button
          component={Link}
          to={ROUTES.catalog}
          startIcon={<ArrowBack />}
          sx={{ mb: 3, color: 'text.secondary' }}
        >
          Catálogo
        </Button>

        {/* Main grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '300px 1fr' },
            gap: { xs: 3, md: 5 },
            alignItems: 'flex-start',
          }}
        >
          {/* Cover — sticky on desktop */}
          <Box
            sx={{
              position: { md: 'sticky' },
              top: { md: 88 },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <BookImage src={cover} alt={activeBook.title} size={280} />
          </Box>

          {/* Info column */}
          <Stack spacing={2.5}>
            {/* Category chips → navigate to catalog with filter */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {activeBook.categories.map(cat => (
                <Chip
                  key={cat.id}
                  label={cat.name}
                  size="small"
                  variant="outlined"
                  clickable
                  component={Link}
                  to={buildCatalogUrl({ category: cat.id })}
                />
              ))}
              {activeBook.tag?.name && (
                <Chip label={activeBook.tag.name} size="small" color="secondary" />
              )}
            </Box>

            <Box>
              <Typography variant="h3" sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}>
                {activeBook.title}
              </Typography>
              {/* Author → search catalog by author */}
              <Typography
                variant="h6"
                color="text.secondary"
                component={Link}
                to={buildCatalogUrl({ search: activeBook.author })}
                sx={{
                  fontWeight: 400,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline', color: 'primary.main' },
                  transition: 'color 0.15s',
                }}
              >
                {activeBook.author}
              </Typography>
            </Box>

            {/* Rating */}
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Rating value={activeBook.rating} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary">
                {activeBook.rating.toFixed(1)} ({activeBook.reviewsCount} valoraciones)
              </Typography>
            </Stack>

            <Divider />

            {/* Meta */}
            <Box
              sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1 }}
            >
              <MetaItem
                icon={<MenuBook fontSize="small" />}
                label="Formato"
                value={activeBook.format === BookFormat.PHYSICAL ? 'Físico' : 'Digital'}
              />
              <MetaItem
                icon={<CalendarMonth fontSize="small" />}
                label="Año"
                value={String(activeBook.year)}
              />
              <MetaItem
                icon={<Language fontSize="small" />}
                label="Idioma"
                value={activeBook.language}
              />
              <MetaItem
                icon={<MenuBook fontSize="small" />}
                label="Páginas"
                value={String(activeBook.pages)}
              />
              {activeBook.isbn && (
                <MetaItem
                  icon={<Inventory2Outlined fontSize="small" />}
                  label="ISBN"
                  value={activeBook.isbn}
                />
              )}
            </Box>

            <Divider />

            {/* Price + cart actions */}
            <Stack spacing={1.5}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                {formatPrice(activeBook.price)}
              </Typography>

              {outOfStock ? (
                <Typography variant="body2" color="error" sx={{ fontWeight: 500 }}>
                  Sin stock disponible
                </Typography>
              ) : stockWarning ? (
                <Typography variant="body2" color="warning.main" sx={{ fontWeight: 500 }}>
                  ¡Solo quedan {activeBook.stock} unidades!
                </Typography>
              ) : (
                <Typography variant="body2" color="success.main" sx={{ fontWeight: 500 }}>
                  En stock ({activeBook.stock} unidades)
                </Typography>
              )}

              {!outOfStock && (
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                  <QuantityInput
                    quantity={quantity}
                    onQuantityChange={handleQuantityChange}
                    maxQuantity={Math.min(activeBook.stock, 10)}
                  />
                  <Button
                    variant="contained"
                    size="large"
                    disableElevation
                    onClick={handleAddToCart}
                    startIcon={addedFeedback ? <CheckCircleOutlined /> : <ShoppingBagOutlined />}
                    color={addedFeedback ? 'success' : 'primary'}
                    sx={{ borderRadius: 2, minWidth: 200, transition: 'background-color 0.2s' }}
                  >
                    {addedFeedback ? '¡Añadido!' : inCart ? 'Añadir más' : 'Añadir al carrito'}
                  </Button>
                </Stack>
              )}

              {inCart && (
                <Typography variant="body2" color="text.secondary">
                  Ya tienes {cartItem!.quantity} {cartItem!.quantity === 1 ? 'unidad' : 'unidades'}{' '}
                  en el carrito.
                </Typography>
              )}
            </Stack>

            <Divider />

            {/* Description */}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Descripción
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                {activeBook.description}
              </Typography>
            </Box>

            {/* Format/Language quick links */}
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              <Button
                size="small"
                variant="text"
                component={Link}
                to={buildCatalogUrl({ format: activeBook.format })}
                sx={{ color: 'text.secondary', fontSize: '0.78rem' }}
              >
                Más libros {activeBook.format === BookFormat.PHYSICAL ? 'físicos' : 'digitales'}
              </Button>
              <Button
                size="small"
                variant="text"
                component={Link}
                to={buildCatalogUrl({ language: activeBook.language })}
                sx={{ color: 'text.secondary', fontSize: '0.78rem' }}
              >
                Más en {activeBook.language}
              </Button>
            </Stack>
          </Stack>
        </Box>

        {/* Related books */}
        {activeRelated.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Stack
              direction="row"
              sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 3 }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                También te puede gustar
              </Typography>
              {activeBook.categories[0] && (
                <Button
                  component={Link}
                  to={buildCatalogUrl({ category: activeBook.categories[0].id })}
                  size="small"
                  variant="outlined"
                >
                  Ver más de {activeBook.categories[0].name}
                </Button>
              )}
            </Stack>
            <Box
              sx={{
                display: 'grid',
                gap: 2,
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              }}
            >
              {activeRelated.map(rel => (
                <BookCard key={rel.id} book={rel} />
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default BookPage;

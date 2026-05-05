import { Box, Container, Stack, Skeleton } from '@mui/material';

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

export default BookDetailSkeleton;

import { Box } from '@mui/material';

import { BookCardSkeleton } from '../book';

function CatalogLoadingSkeleton({ pageSize }: { pageSize: number }) {
  return (
    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: '1fr' }}>
      {Array.from({ length: pageSize }).map((_, i) => (
        <BookCardSkeleton key={`catalog-skeleton-${i}`} />
      ))}
    </Box>
  );
}

export default CatalogLoadingSkeleton;

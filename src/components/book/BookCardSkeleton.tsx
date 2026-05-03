import { Card, CardContent, CardActions, Skeleton, Stack } from '@mui/material';

function BookCardSkeleton() {
  return (
    <Card
      variant="outlined"
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3 }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
          <Skeleton
            variant="rounded"
            width={96}
            height={144}
            sx={{ borderRadius: 1, flexShrink: 0 }}
          />
          <Stack spacing={1} sx={{ flexGrow: 1, minWidth: 0 }}>
            <Skeleton variant="text" width="85%" height={24} />
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="rounded" width={64} height={22} sx={{ borderRadius: 4 }} />
            <Skeleton variant="text" width="50%" height={20} />
            <Skeleton variant="text" width="40%" height={28} />
          </Stack>
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Skeleton variant="rounded" width={90} height={30} sx={{ borderRadius: 1 }} />
      </CardActions>
    </Card>
  );
}

export default BookCardSkeleton;

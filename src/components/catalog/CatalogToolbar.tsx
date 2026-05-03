import type { MouseEvent } from 'react';
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  type SelectChangeEvent,
} from '@mui/material';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

export type CatalogSortBy = 'title' | 'price' | 'rating' | 'year';

export type CatalogSortOrder = 'asc' | 'desc';

type Props = {
  totalResults: number;
  sortBy: CatalogSortBy;
  sortOrder: CatalogSortOrder;
  onSortByChange: (value: CatalogSortBy) => void;
  onSortOrderChange: (value: CatalogSortOrder) => void;
};

const sortLabels: Record<CatalogSortBy, string> = {
  title: 'Título',
  price: 'Precio',
  rating: 'Valoración',
  year: 'Año',
};

function CatalogToolbar({
  totalResults,
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
}: Props) {
  const handleSortChange = (event: SelectChangeEvent<string>): void => {
    onSortByChange(event.target.value as CatalogSortBy);
  };

  const handleOrderChange = (_: MouseEvent<HTMLElement>, value: CatalogSortOrder | null) => {
    if (value) onSortOrderChange(value);
  };

  const resultLabel = totalResults === 1 ? 'resultado' : 'resultados';

  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardContent>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
          }}
          spacing={2}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {totalResults} {resultLabel}
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{ alignItems: 'center' }}
          >
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel id="catalog-sort-label">Ordenar por</InputLabel>
              <Select
                labelId="catalog-sort-label"
                value={sortBy}
                label="Ordenar por"
                onChange={handleSortChange}
              >
                {Object.entries(sortLabels).map(([key, label]) => (
                  <MenuItem key={key} value={key}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <ToggleButtonGroup
              size="small"
              value={sortOrder}
              exclusive
              onChange={handleOrderChange}
              aria-label="orden"
            >
              <ToggleButton value="asc" aria-label="ascendente">
                <ArrowUpward fontSize="small" />
              </ToggleButton>
              <ToggleButton value="desc" aria-label="descendente">
                <ArrowDownward fontSize="small" />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CatalogToolbar;

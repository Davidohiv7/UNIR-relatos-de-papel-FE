import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
  type SelectChangeEvent,
} from '@mui/material';
import { Search } from '@mui/icons-material';

import type { Category } from '../../types';
import { BookFormat } from '../../types';

export type CatalogFiltersValues = {
  search: string;
  categoryId: number | 'all';
  format: BookFormat | 'all';
  language: string | 'all';
  priceRange: [number, number];
};

type Props = {
  values: CatalogFiltersValues;
  categories: Category[];
  languages: string[];
  priceLimits: { min: number; max: number };
  activeFiltersCount: number;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: number | 'all') => void;
  onFormatChange: (value: BookFormat | 'all') => void;
  onLanguageChange: (value: string | 'all') => void;
  onPriceRangeChange: (value: [number, number]) => void;
  onClearFilters: () => void;
};

const formatLabel = (format: BookFormat): string => {
  return format === BookFormat.PHYSICAL ? 'Físico' : 'Digital';
};

function CatalogFilters({
  values,
  categories,
  languages,
  priceLimits,
  activeFiltersCount,
  onSearchChange,
  onCategoryChange,
  onFormatChange,
  onLanguageChange,
  onPriceRangeChange,
  onClearFilters,
}: Props) {
  const handleCategoryChange = (event: SelectChangeEvent<string>): void => {
    const value = event.target.value;
    onCategoryChange(value === 'all' ? 'all' : Number(value));
  };

  const handleFormatChange = (event: SelectChangeEvent<string>): void => {
    const value = event.target.value as BookFormat | 'all';
    onFormatChange(value);
  };

  const handleLanguageChange = (event: SelectChangeEvent<string>): void => {
    const value = event.target.value;
    onLanguageChange(value === 'all' ? 'all' : value);
  };

  const handlePriceChange = (_: Event, value: number | number[]): void => {
    if (Array.isArray(value) && value.length === 2) {
      onPriceRangeChange([value[0], value[1]]);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: 3, position: 'sticky', top: 80, height: 'fit-content' }}
    >
      <CardContent>
        <Stack spacing={2.5}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Filtros</Typography>
            {activeFiltersCount > 0 && (
              <Chip size="small" label={`${activeFiltersCount} activos`} color="secondary" />
            )}
          </Stack>

          <TextField
            label="Buscar por título o autor"
            value={values.search}
            onChange={event => onSearchChange(event.target.value)}
            placeholder="Ej: El nombre del viento"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
            size="small"
            fullWidth
          />

          <FormControl size="small" fullWidth>
            <InputLabel id="catalog-category-label">Categoría</InputLabel>
            <Select
              labelId="catalog-category-label"
              label="Categoría"
              value={String(values.categoryId)}
              onChange={handleCategoryChange}
            >
              <MenuItem value="all">Todas</MenuItem>
              {categories.map(category => (
                <MenuItem key={category.id} value={String(category.id)}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" fullWidth>
            <InputLabel id="catalog-format-label">Formato</InputLabel>
            <Select
              labelId="catalog-format-label"
              label="Formato"
              value={values.format}
              onChange={handleFormatChange}
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value={BookFormat.PHYSICAL}>{formatLabel(BookFormat.PHYSICAL)}</MenuItem>
              <MenuItem value={BookFormat.DIGITAL}>{formatLabel(BookFormat.DIGITAL)}</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" fullWidth>
            <InputLabel id="catalog-language-label">Idioma</InputLabel>
            <Select
              labelId="catalog-language-label"
              label="Idioma"
              value={values.language}
              onChange={handleLanguageChange}
            >
              <MenuItem value="all">Todos</MenuItem>
              {languages.map(language => (
                <MenuItem key={language} value={language}>
                  {language}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Rango de precio
            </Typography>
            <Slider
              value={values.priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={priceLimits.min}
              max={priceLimits.max}
              disableSwap
            />
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                {priceLimits.min.toFixed(2)} $
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {priceLimits.max.toFixed(2)} $
              </Typography>
            </Stack>
          </Box>

          <Divider />

          <Button variant="outlined" onClick={onClearFilters} fullWidth>
            Limpiar filtros
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CatalogFilters;

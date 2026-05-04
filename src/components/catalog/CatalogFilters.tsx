import {
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
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Search } from '@mui/icons-material';

import type { Category, CatalogFilterValues } from '../../types';
import { BookFormat } from '../../types';
import { useCatalogFilters } from '../../hooks';
import { CURRENCY_SYMBOL } from '../../utils/price.utils';
import { FORMAT_LABELS } from '../../constants/book.constants';

type Props = {
  values: CatalogFilterValues;
  categories: Category[];
  languages: string[];
  activeFiltersCount: number;
  onApplyFilters: (value: CatalogFilterValues) => void;
  onClearFilters: () => void;
};

function CatalogFilters({
  values,
  categories,
  languages,
  activeFiltersCount,
  onApplyFilters,
  onClearFilters,
}: Props) {
  const {
    searchInput,
    setSearchInput,
    categoryInput,
    formatInput,
    languageInput,
    minInput,
    maxInput,
    priceRangeError,
    handleCategoryChange,
    handleFormatChange,
    handleLanguageChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleApplyFilters,
  } = useCatalogFilters(values, onApplyFilters, onClearFilters);

  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: 2, position: 'sticky', top: 80, height: 'fit-content' }}
    >
      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
        <Stack spacing={2.5}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Filtros</Typography>
            {activeFiltersCount > 0 && (
              <Chip size="small" label={`${activeFiltersCount} activos`} color="secondary" />
            )}
          </Stack>

          <TextField
            label="Buscar por título o autor"
            value={searchInput}
            onChange={event => setSearchInput(event.target.value)}
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
              value={String(categoryInput)}
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
              value={formatInput}
              onChange={handleFormatChange}
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value={BookFormat.PHYSICAL}>{FORMAT_LABELS[BookFormat.PHYSICAL]}</MenuItem>
              <MenuItem value={BookFormat.DIGITAL}>{FORMAT_LABELS[BookFormat.DIGITAL]}</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" fullWidth>
            <InputLabel id="catalog-language-label">Idioma</InputLabel>
            <Select
              labelId="catalog-language-label"
              label="Idioma"
              value={languageInput}
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

          <Stack spacing={2.5}>
            <Typography variant="subtitle2">Rango de precios</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <TextField
                label="Mínimo"
                type="number"
                value={minInput}
                placeholder="0"
                onChange={handleMinPriceChange}
                size="small"
                fullWidth
                error={!!priceRangeError}
                slotProps={{
                  htmlInput: { min: 0, step: 0.1 },
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">{CURRENCY_SYMBOL}</InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                label="Máximo"
                type="number"
                value={maxInput}
                placeholder="0"
                onChange={handleMaxPriceChange}
                size="small"
                fullWidth
                error={!!priceRangeError}
                slotProps={{
                  htmlInput: { min: 0, step: 0.1 },
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">{CURRENCY_SYMBOL}</InputAdornment>
                    ),
                  },
                }}
              />
            </Stack>
            {priceRangeError && (
              <Typography variant="caption" color="error">
                {priceRangeError}
              </Typography>
            )}
          </Stack>

          <Divider />

          <Button variant="contained" onClick={handleApplyFilters} fullWidth>
            Aplicar filtros
          </Button>

          <Button variant="outlined" onClick={onClearFilters} fullWidth>
            Limpiar filtros
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CatalogFilters;

import { useState, type ChangeEvent } from 'react';
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
  type SelectChangeEvent,
} from '@mui/material';
import { Search } from '@mui/icons-material';

import type { Category } from '../../types';
import { BookFormat, type CatalogFilterValues } from '../../types';
import {
  isPriceRangeActive,
  normalizePriceRange,
  parsePriceInput,
} from '../../utils/catalog-filter.utils';
import { CURRENCY_SYMBOL } from '../../utils/price.utils';

export type CatalogFiltersValues = CatalogFilterValues;

type Props = {
  values: CatalogFiltersValues;
  categories: Category[];
  languages: string[];
  activeFiltersCount: number;
  onApplyFilters: (value: CatalogFiltersValues) => void;
  onClearFilters: () => void;
};

const formatLabel = (format: BookFormat): string => {
  return format === BookFormat.PHYSICAL ? 'Físico' : 'Digital';
};

const getInitialPriceInput = (
  value: number,
  priceRange: CatalogFilterValues['priceRange']
): string => {
  return isPriceRangeActive(priceRange) ? String(value === Infinity ? '' : value) : '';
};

function CatalogFilters({
  values,
  categories,
  languages,
  activeFiltersCount,
  onApplyFilters,
  onClearFilters,
}: Props) {
  const [searchInput, setSearchInput] = useState(values.search);
  const [categoryInput, setCategoryInput] = useState<number | 'all'>(values.categoryId);
  const [formatInput, setFormatInput] = useState<BookFormat | 'all'>(values.format);
  const [languageInput, setLanguageInput] = useState<string | 'all'>(values.language);
  const [minInput, setMinInput] = useState(
    getInitialPriceInput(values.priceRange[0], values.priceRange)
  );
  const [maxInput, setMaxInput] = useState(
    getInitialPriceInput(values.priceRange[1], values.priceRange)
  );

  const handleCategoryChange = (event: SelectChangeEvent<string>): void => {
    const value = event.target.value;
    setCategoryInput(value === 'all' ? 'all' : Number(value));
  };

  const handleFormatChange = (event: SelectChangeEvent<string>): void => {
    const value = event.target.value as BookFormat | 'all';
    setFormatInput(value);
  };

  const handleLanguageChange = (event: SelectChangeEvent<string>): void => {
    const value = event.target.value;
    setLanguageInput(value === 'all' ? 'all' : value);
  };

  const handleMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextMin = event.target.value;
    setMinInput(nextMin);
  };

  const handleMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextMax = event.target.value;
    setMaxInput(nextMax);
  };

  const handleApplyFilters = () => {
    const priceRange = normalizePriceRange(parsePriceInput(minInput), parsePriceInput(maxInput));

    onApplyFilters({
      search: searchInput,
      categoryId: categoryInput,
      format: formatInput,
      language: languageInput,
      priceRange,
    });
  };

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
              <MenuItem value={BookFormat.PHYSICAL}>{formatLabel(BookFormat.PHYSICAL)}</MenuItem>
              <MenuItem value={BookFormat.DIGITAL}>{formatLabel(BookFormat.DIGITAL)}</MenuItem>
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

          <Stack spacing={1.5}>
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

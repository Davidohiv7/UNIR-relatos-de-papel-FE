import { useState, type ChangeEvent } from 'react';
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
  roundPrice,
} from '../../utils/catalog-filter.utils';
import { CURRENCY_SYMBOL, formatPrice } from '../../utils/price.utils';

export type CatalogFiltersValues = CatalogFilterValues;

type Props = {
  values: CatalogFiltersValues;
  categories: Category[];
  languages: string[];
  priceLimits: { min: number; max: number };
  activeFiltersCount: number;
  onApplyFilters: (value: CatalogFiltersValues) => void;
  onClearFilters: () => void;
};

const formatLabel = (format: BookFormat): string => {
  return format === BookFormat.PHYSICAL ? 'Físico' : 'Digital';
};

const getInitialPriceInput = (
  value: number,
  priceRange: CatalogFilterValues['priceRange'],
  priceLimits: { min: number; max: number }
): string => {
  return isPriceRangeActive(priceRange, priceLimits) ? String(value) : '';
};

function CatalogFilters({
  values,
  categories,
  languages,
  priceLimits,
  activeFiltersCount,
  onApplyFilters,
  onClearFilters,
}: Props) {
  // Local input state so typing feels instant (filters apply on demand)
  const [searchInput, setSearchInput] = useState(values.search);
  const [categoryInput, setCategoryInput] = useState<number | 'all'>(values.categoryId);
  const [formatInput, setFormatInput] = useState<BookFormat | 'all'>(values.format);
  const [languageInput, setLanguageInput] = useState<string | 'all'>(values.language);
  const [minInput, setMinInput] = useState(
    getInitialPriceInput(values.priceRange[0], values.priceRange, priceLimits)
  );
  const [maxInput, setMaxInput] = useState(
    getInitialPriceInput(values.priceRange[1], values.priceRange, priceLimits)
  );

  const priceReady = priceLimits.max > priceLimits.min;
  const pricePresets = priceReady
    ? (() => {
        const span = priceLimits.max - priceLimits.min;
        const step = span / 5;

        return Array.from({ length: 5 }, (_, index) => {
          const minValue =
            index === 0 ? priceLimits.min : roundPrice(priceLimits.min + step * index);
          const maxValue =
            index === 4 ? priceLimits.max : roundPrice(priceLimits.min + step * (index + 1));

          return {
            label:
              index === 0
                ? `Hasta ${formatPrice(maxValue)}`
                : index === 4
                  ? `Desde ${formatPrice(minValue)}`
                  : `${formatPrice(minValue)} - ${formatPrice(maxValue)}`,
            range: [minValue, maxValue] as const,
          };
        });
      })()
    : [];

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
    const priceRange = normalizePriceRange(
      parsePriceInput(minInput),
      parsePriceInput(maxInput),
      priceLimits
    );

    onApplyFilters({
      search: searchInput,
      categoryId: categoryInput,
      format: formatInput,
      language: languageInput,
      priceRange,
    });
  };

  const handlePresetClick = (range: readonly [number, number]) => {
    setMinInput(String(range[0]));
    setMaxInput(String(range[1]));
    onApplyFilters({
      search: searchInput,
      categoryId: categoryInput,
      format: formatInput,
      language: languageInput,
      priceRange: normalizePriceRange(range[0], range[1], priceLimits),
    });
  };

  const isPresetActive = (range: readonly [number, number]): boolean => {
    return Number(minInput) === range[0] && Number(maxInput) === range[1];
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
                placeholder={priceReady ? String(priceLimits.min) : '0'}
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
                placeholder={priceReady ? String(priceLimits.max) : '0'}
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
            {pricePresets.length > 0 && (
              <Box
                sx={{
                  display: 'grid',
                  gap: 1,
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
                  '& > :last-of-type': {
                    gridColumn: { sm: '1 / -1' },
                  },
                }}
              >
                {pricePresets.map(preset => (
                  <Button
                    key={preset.label}
                    size="small"
                    variant="outlined"
                    color={isPresetActive(preset.range) ? 'primary' : 'inherit'}
                    onClick={() => handlePresetClick(preset.range)}
                    sx={{
                      justifyContent: 'flex-start',
                      minHeight: 42,
                      px: 1.25,
                      py: 1,
                      borderRadius: 1.5,
                      borderColor: isPresetActive(preset.range) ? 'primary.main' : 'divider',
                      bgcolor: isPresetActive(preset.range) ? 'primary.50' : 'background.paper',
                      color: isPresetActive(preset.range) ? 'primary.main' : 'text.primary',
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    <Typography
                      component="span"
                      variant="caption"
                      sx={{ fontWeight: 700, lineHeight: 1.2, textAlign: 'left' }}
                    >
                      {preset.label}
                    </Typography>
                  </Button>
                ))}
              </Box>
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

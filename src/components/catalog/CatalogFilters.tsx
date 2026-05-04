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
  onApplyFilters: (value: CatalogFiltersValues) => void;
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
  onApplyFilters,
  onClearFilters,
}: Props) {
  // Local input state so typing feels instant (filters apply on demand)
  const [searchInput, setSearchInput] = useState(values.search);
  const [categoryInput, setCategoryInput] = useState<number | 'all'>(values.categoryId);
  const [formatInput, setFormatInput] = useState<BookFormat | 'all'>(values.format);
  const [languageInput, setLanguageInput] = useState<string | 'all'>(values.language);
  const [minInput, setMinInput] = useState(String(values.priceRange[0]));
  const [maxInput, setMaxInput] = useState(String(values.priceRange[1]));

  const priceReady = priceLimits.max > priceLimits.min;
  const roundPrice = (value: number) => Math.round(value * 100) / 100;
  const priceLabel = (value: number) => `$${value.toFixed(2)}`;

  const normalizeRange = (minValue: number, maxValue: number): [number, number] => {
    const minRounded = roundPrice(minValue);
    const maxRounded = roundPrice(maxValue);
    const normalized: [number, number] =
      minRounded <= maxRounded ? [minRounded, maxRounded] : [maxRounded, minRounded];
    return normalized;
  };

  const parseNumber = (value: string): number | null => {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  };

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

  const quickRanges = priceReady
    ? (() => {
        const span = priceLimits.max - priceLimits.min;
        const step = span / 4;
        const firstMax = roundPrice(priceLimits.min + step);
        const secondMax = roundPrice(priceLimits.min + step * 2);
        const thirdMax = roundPrice(priceLimits.min + step * 3);
        return [
          { label: `Hasta ${priceLabel(firstMax)}`, range: [priceLimits.min, firstMax] as const },
          {
            label: `${priceLabel(firstMax)} – ${priceLabel(secondMax)}`,
            range: [firstMax, secondMax] as const,
          },
          {
            label: `${priceLabel(secondMax)} – ${priceLabel(thirdMax)}`,
            range: [secondMax, thirdMax] as const,
          },
          { label: `Más de ${priceLabel(thirdMax)}`, range: [thirdMax, priceLimits.max] as const },
        ];
      })()
    : [];

  const parsedMin = parseNumber(minInput);
  const parsedMax = parseNumber(maxInput);
  const summaryLabel = (() => {
    if (parsedMin !== null && parsedMax !== null) {
      const [minValue, maxValue] = normalizeRange(parsedMin, parsedMax);
      return `${priceLabel(minValue)} – ${priceLabel(maxValue)}`;
    }
    if (parsedMin !== null) {
      return `Desde ${priceLabel(roundPrice(parsedMin))}`;
    }
    if (parsedMax !== null) {
      return `Hasta ${priceLabel(roundPrice(parsedMax))}`;
    }
    return `${priceLabel(values.priceRange[0])} – ${priceLabel(values.priceRange[1])}`;
  })();

  const handleApplyFilters = () => {
    const minValue = parseNumber(minInput);
    const maxValue = parseNumber(maxInput);
    let priceRange: [number, number];

    if (minValue !== null && maxValue !== null) {
      priceRange = normalizeRange(minValue, maxValue);
    } else if (minValue !== null) {
      priceRange = normalizeRange(minValue, priceLimits.max);
    } else if (maxValue !== null) {
      priceRange = normalizeRange(priceLimits.min, maxValue);
    } else {
      priceRange = [priceLimits.min, priceLimits.max];
    }

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

          <Box>
            <Stack
              direction="row"
              sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 1 }}
            >
              <Typography variant="subtitle2">Rango de precio</Typography>
              {priceReady && (
                <Typography variant="caption" color="text.secondary">
                  {summaryLabel}
                </Typography>
              )}
            </Stack>
            <Stack spacing={1.5}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <TextField
                  label="Mínimo"
                  type="number"
                  value={minInput}
                  onChange={handleMinPriceChange}
                  size="small"
                  fullWidth
                  slotProps={{
                    htmlInput: { step: 0.1 },
                    input: {
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    },
                  }}
                />
                <TextField
                  label="Máximo"
                  type="number"
                  value={maxInput}
                  onChange={handleMaxPriceChange}
                  size="small"
                  fullWidth
                  slotProps={{
                    htmlInput: { step: 0.1 },
                    input: {
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    },
                  }}
                />
              </Stack>
              {priceReady && (
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                  {quickRanges.map(range => (
                    <Chip
                      key={range.label}
                      label={range.label}
                      size="small"
                      onClick={() => {
                        const [minValue, maxValue] = range.range;
                        setMinInput(String(minValue));
                        setMaxInput(String(maxValue));
                      }}
                    />
                  ))}
                </Stack>
              )}
            </Stack>
          </Box>

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

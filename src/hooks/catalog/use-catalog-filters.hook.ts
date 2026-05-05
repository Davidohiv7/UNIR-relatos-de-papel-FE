import { useCallback, useState, type ChangeEvent } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import { BookFormat, type CatalogFilterValues } from '../../types';
import {
  isPriceRangeActive,
  normalizePriceRange,
  parsePriceInput,
} from '../../utils/catalog-filter.utils';

function getInitialPriceInput(
  value: number | null,
  priceRange: CatalogFilterValues['priceRange']
): string {
  if (!isPriceRangeActive(priceRange)) return '';
  return value !== null ? String(value) : '';
}

export function useCatalogFilters(
  initialValues: CatalogFilterValues,
  onApplyFilters: (value: CatalogFilterValues) => void
) {
  // ── Estado Borrador (Solo se inicializa al montarse el componente) ──
  const [searchInput, setSearchInput] = useState(initialValues.search);
  const [categoryInput, setCategoryInput] = useState<number | 'all'>(initialValues.categoryId);
  const [formatInput, setFormatInput] = useState<BookFormat | 'all'>(initialValues.format);
  const [languageInput, setLanguageInput] = useState<string | 'all'>(initialValues.language);
  const [minInput, setMinInput] = useState(
    getInitialPriceInput(initialValues.priceRange[0], initialValues.priceRange)
  );
  const [maxInput, setMaxInput] = useState(
    getInitialPriceInput(initialValues.priceRange[1], initialValues.priceRange)
  );

  // ── Handlers ──
  const handleCategoryChange = useCallback((event: SelectChangeEvent<string>): void => {
    const value = event.target.value;
    setCategoryInput(value === 'all' ? 'all' : Number(value));
  }, []);

  const handleFormatChange = useCallback((event: SelectChangeEvent<string>): void => {
    setFormatInput(event.target.value as BookFormat | 'all');
  }, []);

  const handleLanguageChange = useCallback((event: SelectChangeEvent<string>): void => {
    const value = event.target.value;
    setLanguageInput(value === 'all' ? 'all' : value);
  }, []);

  const handleMinPriceChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setMinInput(event.target.value);
  }, []);

  const handleMaxPriceChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setMaxInput(event.target.value);
  }, []);

  // ── Validaciones locales ──
  const parsedMin = parsePriceInput(minInput);
  const parsedMax = parsePriceInput(maxInput);
  const priceRangeError =
    parsedMin !== null && parsedMax !== null && parsedMin >= parsedMax
      ? 'El mínimo debe ser menor que el máximo'
      : null;

  // ── Acción de commit (Hacia afuera) ──
  const handleApplyFilters = useCallback(() => {
    if (priceRangeError) return;

    onApplyFilters({
      search: searchInput,
      categoryId: categoryInput,
      format: formatInput,
      language: languageInput,
      priceRange: normalizePriceRange(parsedMin, parsedMax),
    });
  }, [
    priceRangeError,
    onApplyFilters,
    searchInput,
    categoryInput,
    formatInput,
    languageInput,
    parsedMin,
    parsedMax,
  ]);

  return {
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
  };
}

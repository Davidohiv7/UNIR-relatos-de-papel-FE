/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
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
  values: CatalogFilterValues,
  onApplyFilters: (value: CatalogFilterValues) => void,
  _onClearFilters: () => void
) {
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

  // ── Sync local state when external values change (e.g. back button, clear) ──
  useEffect(() => {
    setSearchInput(values.search);
  }, [values.search]);

  useEffect(() => {
    setCategoryInput(values.categoryId);
  }, [values.categoryId]);

  useEffect(() => {
    setFormatInput(values.format);
  }, [values.format]);

  useEffect(() => {
    setLanguageInput(values.language);
  }, [values.language]);

  useEffect(() => {
    setMinInput(getInitialPriceInput(values.priceRange[0], values.priceRange));
    setMaxInput(getInitialPriceInput(values.priceRange[1], values.priceRange));
  }, [values.priceRange]);

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

  const parsedMin = parsePriceInput(minInput);
  const parsedMax = parsePriceInput(maxInput);
  const priceRangeError =
    parsedMin !== null && parsedMax !== null && parsedMin >= parsedMax
      ? 'El mínimo debe ser menor que el máximo'
      : null;

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

import { BookFormat } from '../types';

/**
 * Human-readable labels for book formats.
 * Shared across catalog filters, book cards, and any UI that displays format info.
 */
export const FORMAT_LABELS: Record<BookFormat, string> = {
  [BookFormat.PHYSICAL]: 'Físico',
  [BookFormat.DIGITAL]: 'Digital',
};

/**
 * Generates a deterministic index from a text string.
 * Useful for consistently assigning colors, avatars, or placeholders based on a string key.
 */
export function seedIndex(text: string, length: number): number {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % length;
}

/**
 * Extracts up to two initials from a title string.
 * Example: "El nombre del viento" → "EN"
 */
export function getInitials(title: string): string {
  return title
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('');
}

export const CURRENCY_CODE = 'USD';
export const CURRENCY_SYMBOL = '$';

export const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: CURRENCY_CODE,
});

export const formatPrice = (amount: number): string => priceFormatter.format(amount);

export const formatPrice = (value: number): string => `$${value.toFixed(2)}`;

export const formatCardNumber = (value: string): string =>
  value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();

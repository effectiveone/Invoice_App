export interface TaxRate {
  value: number;
  label: string;
}

export const TAX_RATES: TaxRate[] = [
  { value: 0, label: '0%' },
  { value: 5, label: '5%' },
  { value: 8, label: '8%' },
  { value: 23, label: '23%' },
  { value: -1, label: 'zw.' }, // zwolniony z VAT
];

// Calculate VAT amount from net price
export const calculateVAT = (netPrice: number, vatRate: number): number => {
  if (vatRate === -1) return 0; // exempt from VAT
  return (netPrice * vatRate) / 100;
};

// Calculate gross price from net price and VAT rate
export const calculateGrossPrice = (
  netPrice: number,
  vatRate: number,
): number => {
  return netPrice + calculateVAT(netPrice, vatRate);
};

// Calculate net price from gross price and VAT rate
export const calculateNetPrice = (
  grossPrice: number,
  vatRate: number,
): number => {
  if (vatRate === -1) return grossPrice; // exempt from VAT
  return grossPrice / (1 + vatRate / 100);
};

// Format currency value
export const formatCurrency = (amount: number, currency = 'PLN'): string => {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Round to 2 decimal places
export const roundToTwoDecimals = (value: number): number => {
  return Math.round(value * 100) / 100;
};

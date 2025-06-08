import type { LegalForm } from '../../types/common';

export const legalForms: LegalForm[] = [
  { value: 'sp_z_o_o', label: 'Sp. z o.o.' },
  { value: 'sa', label: 'S.A.' },
  {
    value: 'jednoosobowa_dzialalnosc_gospodarcza',
    label: 'Jednoosobowa działalność gospodarcza',
  },
  { value: 'spolka_cywilna', label: 'Spółka cywilna' },
  { value: 'spolka_jawna', label: 'Spółka jawna' },
  { value: 'spolka_partnerska', label: 'Spółka partnerska' },
  { value: 'spolka_komandytowa', label: 'Spółka komandytowa' },
  { value: 'spolka_komandytowo_akcyjna', label: 'Spółka komandytowo-akcyjna' },
  { value: 'spoldzielnia', label: 'Spółdzielnia' },
  { value: 'fundacja', label: 'Fundacja' },
  { value: 'stowarzyszenie', label: 'Stowarzyszenie' },
  { value: 'osoba_fizyczna', label: 'Osoba fizyczna' },
  { value: 'inna', label: 'Inna' },
];

// VAT rates used in Poland
export const vatRates: Array<{ value: number, label: string }> = [
  { value: 0, label: '0%' },
  { value: 5, label: '5%' },
  { value: 8, label: '8%' },
  { value: 23, label: '23%' },
  { value: -1, label: 'zw.' }, // zwolniony z VAT
];

// Currency options
export const currencies: Array<{ value: string, label: string }> = [
  { value: 'PLN', label: 'PLN' },
  { value: 'EUR', label: 'EUR' },
  { value: 'USD', label: 'USD' },
  { value: 'GBP', label: 'GBP' },
];

// Units for products
export const units: Array<{ value: string, label: string }> = [
  { value: 'szt', label: 'szt.' },
  { value: 'kg', label: 'kg' },
  { value: 'g', label: 'g' },
  { value: 'm', label: 'm' },
  { value: 'm2', label: 'm²' },
  { value: 'm3', label: 'm³' },
  { value: 'godz', label: 'godz.' },
  { value: 'dni', label: 'dni' },
  { value: 'l', label: 'l' },
  { value: 'ml', label: 'ml' },
];

export type InvoiceType =
  | 'koregujaca'
  | 'sprzedazowa'
  | 'zakupowa'
  | 'zaliczkowa'
  | 'proformaSprzedazowa'
  | 'proformaZakupowa';

export interface InvoiceItem {
  name: string;
  quantity: number;
  unit: string;
  vat: number;
  netPrice: number;
  netValue: number;
  grossValue: number;
}

export interface Kontrahent {
  _id: string;
  companyName: string;
  legalForm: string;
  nip: string;
  regon: string;
  street: string;
  city: string;
  zipCode: string;
}

export interface SelectedKontrahent {
  [key: string]: any;
}

export interface Invoice {
  _id?: string;
  invoiceNumber: string;
  invoiceType: InvoiceType;
  invoiceDate: string;
  invoiceSaleDate: string;
  invoicePaymentDate: string;
  selectedKontrahent: SelectedKontrahent;
  items: InvoiceItem[];
  totalNetValue: number;
  totalGrossValue: number;
  notes: string;
  userEmail: string;
  companyData?: any;
}

export interface CurrentInvoiceNumber {
  korygujaca?: string;
  sprzedazowa?: string;
  zakupowa?: string;
  zaliczkowa?: string;
  proformaSprzedazowa?: string;
  proformaZakupowa?: string;
}

export interface InvoiceState {
  faktury: Invoice[];
  currentInvoiceNumber: CurrentInvoiceNumber;
}

export interface RootState {
  faktura: InvoiceState;
}

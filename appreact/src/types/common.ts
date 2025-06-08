/**
 * Common types used across the application
 */

import { ChangeEvent, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  mail?: string;
  name?: string;
  username?: string;
  companyId?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface Company {
  id: string;
  companyName: string;
  legalForm: string;
  nip: string;
  regon?: string;
  street: string;
  city: string;
  zipCode: string;
  bankName?: string;
  bankAccount?: string;
  logo?: string;
  [key: string]: any;
}

export interface Product {
  id: string;
  name: string;
  code: string;
  netPrice: number;
  vat: number;
  grossPrice?: number;
  currency?: string;
  description?: string;
  tags?: string;
  quantity?: number;
  service?: string | boolean;
  purchaseNetPrice?: number;
  purchaseVat?: number;
  purchaseGrossPrice?: number;
  unit?: string;
  defaultQuantity?: number;
  pkwiu?: string;
  supplierCode?: string;
  accountingCode?: string;
  [key: string]: any;
}

export interface Kontrahent {
  id: string;
  _id?: string;
  companyName: string;
  legalForm?: string;
  nip?: string;
  regon?: string;
  street?: string;
  city?: string;
  zipCode?: string;
  email?: string;
  phone?: string;
  [key: string]: any;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  invoicePaymentDate: string;
  seller: Company;
  buyer: Kontrahent;
  products: InvoiceProduct[];
  totalNet: number;
  totalVat: number;
  totalGross: number;
  notes?: string;
  template?: string;
  [key: string]: any;
}

export interface InvoiceProduct {
  id: string;
  name: string;
  quantity: number;
  netPrice: number;
  vat: number;
  netValue: number;
  vatValue: number;
  grossValue: number;
  [key: string]: any;
}

// Form types
export interface LegalForm {
  value: string;
  label: string;
}

export type WhichInputs = 'company' | 'kontrahent' | 'product';

// Event handlers for different Material-UI components
export type TextFieldChangeHandler = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => void;
export type SelectChangeHandler = (
  event: ChangeEvent<{ name?: string; value: unknown }>,
  child: ReactNode,
) => void;

// Common utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type ID = string;

// Error handling
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

// State types for async operations
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

// Form validation
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormErrors {
  [key: string]: string;
}

// Redux state type dla migracji
export interface RootState {
  auth?: any;
  settings?: any;
  products?: any;
  stats?: any;
  [key: string]: any;
}

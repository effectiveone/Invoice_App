# Zaawansowane komponenty tabel danych

Zestaw zaawansowanych komponentów tabel opartych na wzorcu **Render Props** i zasadach **Domain-Driven Design (DDD)**.

## Architektura

### DataTableProvider

Główny komponent wykorzystujący wzorzec Render Props do zarządzania stanem tabeli:

- **Paginacja** - automatyczna obsługa stronnicowania
- **Sortowanie** - sortowanie po wszystkich kolumnach
- **Filtrowanie** - zaawansowane filtrowanie z interfejsem chip-ów
- **Wyszukiwanie** - globalne wyszukiwanie po wszystkich polach
- **Eksport** - możliwość eksportu danych
- **Operacje CRUD** - pełne wsparcie dla operacji dodawania, edycji, podglądu i usuwania

### Domain-Driven Design

Każdy komponent zawiera własne modele domenowe:

- **InvoiceStatus** - stany faktur
- **ContrahentType** - typy kontrahentów
- **ProductCategory** - kategorie produktów
- **StockStatus** - stany magazynowe

## Komponenty

### 1. EnhancedInvoicesTable

Zaawansowana tabela faktur z funkcjami:

- Statusy faktur z kolorowym oznaczeniem
- Automatyczne obliczanie terminów płatności
- Generowanie PDF i wysyłanie email
- Szczegółowy podgląd faktury

```jsx
import { EnhancedInvoicesTable } from './DataTable';

<EnhancedInvoicesTable invoices={invoicesData} />;
```

### 2. EnhancedContrahentsTable

Tabela kontrahentów z funkcjami:

- Rozpoznawanie typu kontrahenta (firma/osoba fizyczna)
- Formatowanie NIP-u
- Obsługa form prawnych
- Eksport do CSV
- Szczegółowe profile kontrahentów

```jsx
import { EnhancedContrahentsTable } from './DataTable';

<EnhancedContrahentsTable contrahents={contrahentsData} />;
```

### 3. EnhancedInventoryTable

Tabela magazynowa z funkcjami:

- Monitoring stanów magazynowych
- Kategorie produktów
- Wskaźniki niskiego stanu
- Obliczanie cen brutto
- Różne jednostki miary

```jsx
import { EnhancedInventoryTable } from './DataTable';

<EnhancedInventoryTable products={productsData} />;
```

## Wzorzec Render Props

Każdy komponent może być używany z custom render function:

```jsx
<DataTableProvider data={data} columns={columns} title='Custom Table'>
  {(tableState, tableActions) => (
    // Własna implementacja interfejsu
    <CustomTableComponent {...tableState} {...tableActions} />
  )}
</DataTableProvider>
```

## Struktura danych

### Faktury

```javascript
{
  id: string,
  invoiceNumber: string,
  invoiceSaleDate: string,
  selectedKontrahent: {
    companyName: string,
    nip: string
  },
  totalNetValue: number,
  totalGrossValue: number,
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled',
  dueDate: string
}
```

### Kontrahenci

```javascript
{
  id: string,
  companyName: string,
  legalForm: string,
  nip: string,
  city: string,
  postalCode: string,
  email: string,
  phone: string,
  type: 'individual' | 'company' | 'government' | 'non_profit'
}
```

### Produkty

```javascript
{
  id: string,
  name: string,
  sku: string,
  category: 'goods' | 'services' | 'materials' | 'digital' | 'other',
  netPrice: number,
  vat: number,
  quantity: number,
  unit: string,
  minStock: number,
  unlimited: boolean
}
```

## Funkcje zaawansowane

### 1. Automatyczne określanie statusów

- Status faktury na podstawie terminów
- Typ kontrahenta na podstawie formy prawnej
- Stan magazynowy na podstawie ilości

### 2. Formatowanie danych

- Formatowanie dat w polskim formacie
- Formatowanie NIP-u z kreskami
- Formatowanie walut z dokładnością do 2 miejsc

### 3. Inteligentne filtrowanie

- Filtrowanie zagnieżdżonych obiektów
- Filtrowanie po typach danych
- Zachowanie stanu filtrów

### 4. Eksport danych

- Automatyczne generowanie CSV
- Mapowanie etykiet na polskie nazwy
- Obsługa różnych formatów danych

## Ikony Material UI

Komponenty używają wyłącznie dostępnych ikon z @mui/icons-material v5.15.16:

- `Receipt` - faktury
- `Business` - kontrahenci
- `Inventory` - magazyn
- `Search` - wyszukiwanie
- `FilterList` - filtry
- `Edit`, `Delete`, `Visibility` - akcje

## Styling

Komponenty używają systemu styled() z @mui/system i gradient-ów:

- Nowoczesny design z zaokrąglonymi rogami
- Gradient-y dla przycisków i nagłówków
- Hover effects i animacje
- Responsywny design

## Integracja z istniejącym kodem

Komponenty są kompatybilne z istniejącymi hook-ami:

- `useModal()` - obsługa modali
- `useInvoiceContext()` - kontekst faktur
- `useKontrahentContext()` - kontekst kontrahentów
- `useProductContext()` - kontekst produktów

## Przykład użycia

Zobacz `ExampleUsage.js` dla pełnego przykładu implementacji z zakładkami i przykładowymi danymi.

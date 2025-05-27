# Dokumentacja Testów - Aplikacja Fakturowa

## Przegląd Testów

Aplikacja fakturowa została pokryta kompleksowymi testami jednostkowymi i integracyjnymi, które sprawdzają kluczowe funkcjonalności:

### 🧪 Rodzaje Testów

1. **Testy Jednostkowe** - sprawdzają pojedyncze komponenty
2. **Testy Integracyjne** - sprawdzają współpracę między komponentami
3. **Testy End-to-End** - sprawdzają pełne przepływy użytkownika

### 📋 Pokrycie Funkcjonalne

#### ✅ Tworzenie Faktur

- [x] Renderowanie formularza faktury
- [x] Dodawanie pozycji do faktury
- [x] Obliczenia VAT (23%, 8%, 5%, 0%)
- [x] Wybór kontrahenta
- [x] Ustawianie dat (sprzedaży, płatności)
- [x] Dodawanie uwag
- [x] Podgląd faktury
- [x] Zapisywanie faktury
- [x] Walidacja wymaganych pól

#### ✅ Zarządzanie Kontrahentami

- [x] Wyświetlanie listy kontrahentów
- [x] Dodawanie nowego kontrahenta
- [x] Edycja kontrahenta
- [x] Usuwanie kontrahenta
- [x] Wyszukiwanie kontrahentów
- [x] Sortowanie listy
- [x] Walidacja formularza

#### ✅ Zarządzanie Produktami

- [x] Wyświetlanie listy produktów
- [x] Dodawanie nowego produktu
- [x] Edycja produktu
- [x] Usuwanie produktu
- [x] Wyszukiwanie produktów
- [x] Filtrowanie według kategorii
- [x] Obliczanie wartości magazynu
- [x] Ostrzeżenia o niskim stanie
- [x] Walidacja formularza

## 🚀 Uruchamianie Testów

### Wszystkie Testy

```bash
cd appreact
npm test
```

### Testy w Trybie Watch

```bash
npm test -- --watch
```

### Testy z Pokryciem Kodu

```bash
npm test -- --coverage --watchAll=false
```

### Konkretne Pliki Testowe

```bash
# Testy tworzenia faktur
npm test NewInvoice.integration.test.js

# Testy formularza faktury
npm test InvoiceForm.integration.test.js

# Testy kontrahentów
npm test KontrahentContent.integration.test.js

# Testy produktów
npm test Inventory.integration.test.js

# Test end-to-end
npm test InvoiceCreation.e2e.test.js
```

### Testy w Trybie Verbose

```bash
npm test -- --verbose --watchAll=false
```

## 📁 Struktura Testów

```
appreact/src/
├── __tests__/
│   └── InvoiceCreation.e2e.test.js          # Test end-to-end
├── Shared/Components/
│   ├── NewInvoice/
│   │   ├── NewInvoice.integration.test.js    # Testy komponentu faktury
│   │   └── InvoiceForm.integration.test.js   # Testy formularza faktury
│   ├── Kontrahent/
│   │   └── KontrahentContent.integration.test.js  # Testy kontrahentów
│   └── Inventory/
│       └── Inventory.integration.test.js     # Testy produktów
└── setupTests.js                            # Konfiguracja testów
```

## 🔧 Konfiguracja Testów

### Jest Configuration (package.json)

```json
{
  "jest": {
    "transformIgnorePatterns": ["node_modules/(?!(axios|@babel|uuid)/)"],
    "moduleNameMapper": {
      "^axios$": "axios/dist/node/axios.cjs"
    },
    "setupFilesAfterEnv": ["<rootDir>/src/setupTests.js"],
    "testEnvironment": "jsdom"
  }
}
```

### Setup Tests (setupTests.js)

- Konfiguracja @testing-library/jest-dom
- Polyfille dla TextEncoder/TextDecoder
- Mock dla window.matchMedia
- Mock dla ResizeObserver

## 📊 Scenariusze Testowe

### 1. Test End-to-End: Pełny Przepływ Tworzenia Faktury

**Scenariusz:** Użytkownik tworzy fakturę od początku do końca

1. Dodaje nowego kontrahenta
2. Dodaje nowy produkt do magazynu
3. Tworzy fakturę z tym kontrahentom i produktem
4. Sprawdza podgląd faktury
5. Zapisuje fakturę

**Sprawdzane elementy:**

- Nawigacja między stronami
- Wypełnianie formularzy
- Obliczenia VAT
- Walidacja danych
- Komunikaty sukcesu/błędu

### 2. Testy Integracyjne: Tworzenie Faktury

**Scenariusze:**

- Renderowanie formularza faktury
- Przełączanie między edycją a podglądem
- Dodawanie/usuwanie pozycji faktury
- Obliczenia wartości netto/brutto
- Wybór kontrahenta z listy
- Ustawianie dat faktury
- Dodawanie uwag

### 3. Testy Integracyjne: Zarządzanie Kontrahentami

**Scenariusze:**

- Wyświetlanie listy kontrahentów
- Otwieranie modala dodawania/edycji
- Wypełnianie formularza kontrahenta
- Zapisywanie/anulowanie zmian
- Usuwanie kontrahenta
- Wyszukiwanie i filtrowanie

### 4. Testy Integracyjne: Zarządzanie Produktami

**Scenariusze:**

- Wyświetlanie listy produktów
- Dodawanie nowego produktu
- Edycja istniejącego produktu
- Wyszukiwanie produktów
- Filtrowanie według kategorii
- Obliczanie wartości magazynu

## 🎯 Przykłady Testów

### Test Obliczenia VAT

```javascript
test('powinien poprawnie obliczać VAT 23%', () => {
  // Dane wejściowe
  const netPrice = 100;
  const quantity = 2;
  const vatRate = 0.23;

  // Oczekiwane wyniki
  const expectedNetValue = 200; // 100 * 2
  const expectedGrossValue = 246; // 200 * 1.23

  // Test obliczenia
  expect(calculateNetValue(netPrice, quantity)).toBe(expectedNetValue);
  expect(calculateGrossValue(expectedNetValue, vatRate)).toBe(
    expectedGrossValue,
  );
});
```

### Test Walidacji Formularza

```javascript
test('powinien wyświetlać błędy walidacji dla pustego formularza', async () => {
  render(<KontrahentForm />);

  // Spróbuj zapisać pusty formularz
  const saveButton = screen.getByText('Zapisz');
  await user.click(saveButton);

  // Sprawdź błędy walidacji
  expect(screen.getByText('Nazwa firmy jest wymagana')).toBeInTheDocument();
  expect(screen.getByText('NIP jest wymagany')).toBeInTheDocument();
});
```

## 🐛 Debugowanie Testów

### Wyświetlanie DOM podczas testów

```javascript
import { screen } from '@testing-library/react';

test('debug test', () => {
  render(<Component />);
  screen.debug(); // Wyświetla aktualny DOM
});
```

### Logowanie w testach

```javascript
test('test with logging', () => {
  console.log('Test rozpoczęty');
  // ... kod testu
  console.log('Test zakończony');
});
```

## 📈 Metryki Pokrycia

Docelowe pokrycie kodu:

- **Linie kodu:** > 80%
- **Funkcje:** > 85%
- **Gałęzie:** > 75%
- **Instrukcje:** > 80%

### Sprawdzanie Pokrycia

```bash
npm test -- --coverage --watchAll=false
```

## 🔍 Najlepsze Praktyki

### 1. Nazewnictwo Testów

- Używaj opisowych nazw: `powinien renderować formularz faktury`
- Grupuj testy w describe blocks
- Używaj polskich nazw dla lepszej czytelności

### 2. Struktura Testów

- **Arrange** - przygotuj dane testowe
- **Act** - wykonaj akcję
- **Assert** - sprawdź wynik

### 3. Mock'owanie

- Mock'uj zewnętrzne zależności (API, biblioteki)
- Używaj realnych danych testowych
- Sprawdzaj wywołania funkcji mock'owanych

### 4. Asynchroniczne Testy

- Używaj `waitFor` dla asynchronicznych operacji
- Używaj `user.click()` zamiast `fireEvent.click()`
- Sprawdzaj loading states

## 🚨 Rozwiązywanie Problemów

### Problem: Testy nie znajdują elementów

**Rozwiązanie:** Sprawdź czy element jest renderowany i użyj odpowiednich selektorów

### Problem: Błędy z axios/ES6 modules

**Rozwiązanie:** Sprawdź konfigurację Jest w package.json

### Problem: Testy są niestabilne

**Rozwiązanie:** Użyj `waitFor` dla asynchronicznych operacji

### Problem: Mock'i nie działają

**Rozwiązanie:** Sprawdź czy mock'i są zdefiniowane przed importami

## 📚 Dodatkowe Zasoby

- [Testing Library Documentation](https://testing-library.com/)
- [Jest Documentation](https://jestjs.io/)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Uwaga:** Przed uruchomieniem testów upewnij się, że wszystkie zależności są zainstalowane (`npm install`) i konfiguracja Jest jest poprawna.

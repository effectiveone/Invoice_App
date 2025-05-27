# Feature-Sliced Design (FSD) Architecture

Ta aplikacja została zrefaktoryzowana zgodnie z architekturą **Feature-Sliced Design (FSD)**, która jest nowoczesnym wzorcem architektonicznym dla aplikacji frontendowych.

## Struktura katalogów

```
src/
├── app/          # Konfiguracja aplikacji (routing, store, providers)
├── pages/        # Strony aplikacji (mapowanie na routing)
├── features/     # Funkcjonalności biznesowe
├── entities/     # Encje biznesowe
└── shared/       # Współdzielone zasoby
```

## Warstwy FSD

### 🔧 App Layer (`app/`)

Zawiera konfigurację całej aplikacji:

- **providers/** - Providery React (Redux, Router, i18n)
- **routing/** - Konfiguracja routingu
- **store/** - Konfiguracja Redux store

### 📄 Pages Layer (`pages/`)

Strony aplikacji mapowane na routing:

- `DashboardPage.js`
- `EnhancedInventoryPage.js`
- `EnhancedIssuedInvoicePage.js`
- `NewInvoicePage.js`
- `EnhancedKontrahentPage.js`
- `SettingsPage.js`
- `MyCompanyPage.js`

### ⚡ Features Layer (`features/`)

Funkcjonalności biznesowe aplikacji:

- **auth/** - Autoryzacja i uwierzytelnianie
- **dashboard/** - Panel główny i statystyki
- **inventory/** - Zarządzanie magazynem
- **invoice/** - Zarządzanie fakturami
- **kontrahent/** - Zarządzanie kontrahentami
- **settings/** - Ustawienia aplikacji
- **company/** - Zarządzanie danymi firmy

Każda feature zawiera:

- `ui/` - Komponenty interfejsu użytkownika
- `model/` - Logika biznesowa i stany
- `api/` - Wywołania API specyficzne dla feature

### 🏗️ Entities Layer (`entities/`)

Encje biznesowe aplikacji:

- **user/** - Encja użytkownika
- **invoice/** - Encja faktury
- **product/** - Encja produktu
- **kontrahent/** - Encja kontrahenta

Każda entity zawiera:

- `ui/` - Komponenty związane z encją
- `model/` - Model danych i konteksty
- `api/` - API calls dla encji

### 🔄 Shared Layer (`shared/`)

Współdzielone zasoby używane przez wszystkie warstwy:

- **ui/** - Komponenty UI (przyciski, inputy, layout)
- **lib/** - Hooki i biblioteki pomocnicze
- **api/** - Główna konfiguracja API
- **utils/** - Funkcje pomocnicze
- **config/** - Konfiguracja (i18n, stałe)

## Zasady FSD

### 1. **Jednokierunkowe zależności**

```
app → pages → features → entities → shared
```

### 2. **Izolacja warstw**

- Każda warstwa może importować tylko z warstw niższych
- Shared może być używane przez wszystkie warstwy
- Features nie mogą importować z innych features

### 3. **Segmentacja**

Każdy slice (feature/entity) zawiera segmenty:

- `ui/` - Komponenty React
- `model/` - Logika biznesowa, stany, konteksty
- `api/` - Wywołania API

### 4. **Public API**

Każdy folder zawiera plik `index.js` eksportujący publiczne API:

```javascript
// features/auth/index.js
export { LoginPage } from './ui/LoginPage';
export { RegisterPage } from './ui/RegisterPage';
```

## Korzyści z FSD

1. **Skalowalność** - Łatwe dodawanie nowych funkcjonalności
2. **Maintainability** - Jasna struktura i odpowiedzialności
3. **Reusability** - Współdzielone komponenty w shared
4. **Team collaboration** - Różne zespoły mogą pracować nad różnymi features
5. **Testing** - Łatwiejsze testowanie izolowanych części

## Migracja z poprzedniej struktury

Główne zmiany:

- `Shared/Components/` → `shared/ui/`
- `Shared/Hook/` → `shared/lib/`
- `Shared/Utils/` → `shared/utils/`
- `Store/` → `app/store/`
- `Auth/` → `features/auth/ui/`
- Konteksty przeniesione do odpowiednich entities/features

## Przykład użycia

```javascript
// Importowanie z różnych warstw
import { LoginPage } from '../features/auth';
import { ProductProvider } from '../entities/product';
import { CustomButton } from '../shared/ui';
import { useApi } from '../shared/lib';
```

Ta architektura zapewnia lepszą organizację kodu, ułatwia rozwój aplikacji i zwiększa jej maintainability.

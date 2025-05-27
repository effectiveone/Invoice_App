# 🧾 Enterprise Invoice Management System

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-green.svg)](https://mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-blue.svg)](https://docker.com/)
[![Redux Toolkit](https://img.shields.io/badge/State-Redux_Toolkit-purple.svg)](https://redux-toolkit.js.org/)
[![Material-UI](https://img.shields.io/badge/UI-Material_UI-blue.svg)](https://mui.com/)

> **A comprehensive, enterprise-grade invoice management system built with modern React architecture patterns, demonstrating advanced software engineering principles and scalable design patterns.**

## 🏗️ Architecture Overview

This application showcases **Feature-Sliced Design (FSD)** architecture - a modern, scalable approach to frontend application structure that promotes maintainability, testability, and team collaboration.

### 📁 Project Structure

```
src/
├── app/                    # Application Layer - Configuration & Setup
│   ├── providers/          # React Providers (Redux, Router, i18n)
│   ├── routing/           # Route configuration and guards
│   └── store/             # Redux store configuration
├── pages/                 # Pages Layer - Route-level components
├── features/              # Features Layer - Business logic modules
│   ├── auth/              # Authentication & authorization
│   ├── dashboard/         # Analytics and reporting
│   ├── invoice/           # Invoice management
│   ├── inventory/         # Product catalog management
│   ├── kontrahent/        # Client/contractor management
│   └── settings/          # Application configuration
├── entities/              # Entities Layer - Business domain models
│   ├── user/              # User entity and contexts
│   ├── invoice/           # Invoice entity and business logic
│   ├── product/           # Product entity management
│   └── kontrahent/        # Contractor entity management
└── shared/                # Shared Layer - Reusable components & utilities
    ├── ui/                # UI components library
    ├── lib/               # Custom hooks and utilities
    ├── api/               # API configuration and services
    └── utils/             # Helper functions and constants
```

### 🎯 FSD Architecture Benefits

- **🔄 Unidirectional Dependencies**: `app → pages → features → entities → shared`
- **🏗️ Layer Isolation**: Each layer can only import from lower layers
- **🧩 Feature Isolation**: Features are self-contained and don't depend on each other
- **📦 Public API**: Each module exposes a clean public interface
- **🔧 Scalability**: Easy to add new features without affecting existing code

## 🎨 Design Patterns Implementation

### 1. **Factory Pattern**

_Location: `features/invoice/ui/InvoicesTemplates/factoryInvoicePrinter.js`_

```javascript
const FactoryInvoicePrinter = () => {
  const selectedOption = useSelector(
    (state) => state?.settings.settings?.templateInvoice,
  );

  const renderConfigurableTemplate = (templateId) => {
    const config = currentTemplateConfig || {};
    const templateProps = { layout, colors, logo, customSettings };

    switch (templateId) {
      case 'modern':
        return <ModernTemplate {...templateProps} />;
      case 'corporate':
        return <CorporateTemplate {...templateProps} />;
      case 'creative':
        return <CreativeTemplate {...templateProps} />;
      case 'minimal':
        return <MinimalTemplate {...templateProps} />;
      default:
        return <ModernTemplate {...templateProps} />;
    }
  };
};
```

**Benefits:**

- ✅ Encapsulates template creation logic
- ✅ Easy to add new invoice templates
- ✅ Maintains consistent interface across templates
- ✅ Supports dynamic template switching

### 2. **Provider Pattern (Context API)**

_Location: `entities/_/model/use*Context.js`*

```javascript
// Invoice Context Provider
export const InvoiceProvider = ({ children }) => {
  const invoice = useInvoice();
  return (
    <InvoiceContext.Provider value={invoice}>
      {children}
    </InvoiceContext.Provider>
  );
};

// Usage with multiple providers
<InvoiceProvider>
  <ProductProvider>
    <KontrahentProvider>
      <CompanyProvider>
        <NewInvoice />
      </CompanyProvider>
    </KontrahentProvider>
  </ProductProvider>
</InvoiceProvider>;
```

**Benefits:**

- ✅ Dependency injection for React components
- ✅ Centralized state management per domain
- ✅ Testable and mockable contexts
- ✅ Clean separation of concerns

### 3. **Render Props Pattern**

_Location: `shared/ui/DataTable/DataTableProvider.js`_

```javascript
const DataTableProvider = ({ children, data, columns, ...config }) => {
  const tableState = { data: paginatedData, totalCount, searchTerm, filters };
  const tableActions = {
    handleSearchChange,
    handleFilterChange,
    handleSortRequest,
  };

  return children ? children(tableState, tableActions) : defaultRender();
};

// Usage
<DataTableProvider data={invoices} columns={columns}>
  {(tableState, tableActions) => (
    <CustomTable
      {...tableState}
      {...tableActions}
      onCustomAction={handleCustomAction}
    />
  )}
</DataTableProvider>;
```

**Benefits:**

- ✅ Maximum component flexibility
- ✅ Reusable data management logic
- ✅ Customizable rendering
- ✅ Separation of data logic from presentation

### 4. **Observer Pattern (Redux)**

_Location: `app/store/`_

```javascript
// Redux store with multiple reducers observing actions
const store = configureStore({
  reducer: {
    auth: authReducer,
    invoices: fakturaReducer,
    products: productReducer,
    settings: settingsReducer,
    // ... other reducers
  },
});

// Components subscribe to state changes
const InvoiceList = () => {
  const invoices = useSelector((state) => state.faktura.faktury);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readFaktury(currentUser));
  }, [currentUser, dispatch]);
};
```

**Benefits:**

- ✅ Predictable state management
- ✅ Time-travel debugging
- ✅ Centralized application state
- ✅ Reactive UI updates

### 5. **Higher-Order Component (HOC) Pattern**

_Location: `shared/ui/AlertNotification.js`_

```javascript
const withReduxConnection = (Component) => {
  return connect(mapStoreStateToProps, mapActionsToProps)(Component);
};

export default withReduxConnection(AlertNotification);
```

### 6. **Custom Hooks Pattern**

_Location: `shared/lib/`_

```javascript
// Reusable business logic in custom hooks
export const useInvoice = () => {
  const [items, setItems] = useState([]);
  const [totalNetValue, setTotalNetValue] = useState(0);

  const calculateTotals = useCallback(() => {
    // Complex calculation logic
  }, [items]);

  return {
    items,
    setItems,
    totalNetValue,
    calculateTotals,
    handleSubmit,
    // ... other invoice operations
  };
};
```

## 🧹 Clean Code Principles

### 1. **Single Responsibility Principle**

Each component and hook has a single, well-defined purpose:

```javascript
// ✅ Good: Single responsibility
const InvoiceCalculator = ({ items }) => {
  const total = calculateInvoiceTotal(items);
  return <div>Total: {total}</div>;
};

// ✅ Good: Separated concerns
const useInvoiceCalculations = (items) => {
  return useMemo(() => calculateInvoiceTotal(items), [items]);
};
```

### 2. **Dependency Inversion**

High-level modules don't depend on low-level modules:

```javascript
// ✅ Abstract API interface
const useApiService = () => {
  return {
    get: (url) => api.get(url),
    post: (url, data) => api.post(url, data),
    // ... other methods
  };
};

// ✅ Business logic depends on abstraction
const useInvoices = () => {
  const apiService = useApiService();

  const loadInvoices = async () => {
    const response = await apiService.get('/invoices');
    return response.data;
  };
};
```

### 3. **Open/Closed Principle**

Components are open for extension, closed for modification:

```javascript
// ✅ Extensible template system
const InvoiceTemplate = ({ template, ...props }) => {
  const TemplateComponent = templateRegistry[template];
  return <TemplateComponent {...props} />;
};

// ✅ Easy to add new templates without modifying existing code
templateRegistry.register('newTemplate', NewTemplateComponent);
```

### 4. **Consistent Naming Conventions**

```javascript
// ✅ Clear, descriptive names
const useInvoiceCalculations = () => {
  /* ... */
};
const InvoiceFormValidator = () => {
  /* ... */
};
const calculateInvoiceTotalWithTax = (items, taxRate) => {
  /* ... */
};

// ✅ Consistent file naming
// useInvoiceContext.js
// InvoiceProvider.js
// invoiceActions.js
```

## 🏛️ Enterprise Architecture Features

### 1. **Modular State Management**

```javascript
// Centralized store with domain-specific reducers
const store = configureStore({
  reducer: {
    auth: authReducer, // Authentication state
    invoices: fakturaReducer, // Invoice management
    products: productReducer, // Inventory management
    settings: settingsReducer, // Application configuration
    alerts: alertReducer, // User notifications
  },
});
```

### 2. **API Layer Abstraction**

```javascript
// Centralized API configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

// Domain-specific API services
export const invoiceAPI = {
  getAll: () => api.get('/invoices'),
  create: (data) => api.post('/invoices', data),
  update: (id, data) => api.put(`/invoices/${id}`, data),
  delete: (id) => api.delete(`/invoices/${id}`),
};
```

### 3. **Internationalization (i18n)**

```javascript
// Multi-language support
import { useTranslation } from 'react-i18next';

const InvoiceForm = () => {
  const { t } = useTranslation();

  return (
    <form>
      <label>{t('invoice.customerName')}</label>
      <button>{t('invoice.save')}</button>
    </form>
  );
};
```

### 4. **Theme System**

```javascript
// Dynamic theme switching
const useTheme = () => {
  const designSettings = useSelector((state) => state.settings.settings);
  const currentDesign = designSystems.find(
    (design) => design.name === designSettings?.designName,
  );

  return {
    primary: currentDesign.primaryColor,
    secondary: currentDesign.secondaryColor,
    // ... other theme properties
  };
};
```

## 🛠️ Technology Stack

### **Frontend**

- **React 18.3.1** - Latest React with Concurrent Features
- **Redux Toolkit** - Modern Redux with RTK Query
- **Material-UI v5** - Enterprise-grade component library
- **React Router v6** - Declarative routing
- **React Hook Form** - Performant form management
- **i18next** - Internationalization framework
- **Styled Components** - CSS-in-JS styling

### **Backend**

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Helmet** - Security middleware
- **Swagger** - API documentation

### **DevOps & Tools**

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Webpack** - Module bundler
- **Babel** - JavaScript compiler
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- Docker & Docker Compose
- MongoDB (or use Docker)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd InvoiceApp
```

2. **Start with Docker (Recommended)**

```bash
docker-compose up -d --build
```

3. **Manual Setup**

```bash
# Backend
cd appnode
npm install
npm start

# Frontend
cd appreact
npm install
npm start
```

### Environment Configuration

```bash
# Backend (.env)
MONGO_URI=mongodb://localhost:27017/invoiceapp
JWT_SECRET=your-secret-key
PORT=5002

# Frontend
REACT_APP_API_URL=http://localhost:5002/api
```

## 📊 Application Features

### **Invoice Management**

- ✅ Create, edit, and delete invoices
- ✅ Multiple invoice templates (Basic, Modern, Corporate, Creative)
- ✅ Dynamic VAT calculations (23%, 8%, 5%, 0%)
- ✅ PDF generation and printing
- ✅ Invoice numbering system
- ✅ Multi-currency support

### **Client Management**

- ✅ Contractor/client database
- ✅ Company information management
- ✅ Search and filtering capabilities
- ✅ Import/export functionality

### **Product Catalog**

- ✅ Product inventory management
- ✅ Category-based organization
- ✅ Stock level tracking
- ✅ Pricing management

### **Analytics & Reporting**

- ✅ Sales statistics and charts
- ✅ Revenue tracking
- ✅ Tax reporting (JPK integration)
- ✅ Dashboard with key metrics

### **System Features**

- ✅ Multi-language support (EN/PL)
- ✅ Dark/Light theme switching
- ✅ Responsive design
- ✅ User authentication & authorization
- ✅ Data export capabilities

## 🧪 Testing Strategy

### **Testing Pyramid**

```
    /\     E2E Tests (Cypress)
   /  \
  /____\   Integration Tests (React Testing Library)
 /______\  Unit Tests (Jest)
```

### **Test Coverage Areas**

- ✅ Component rendering and interactions
- ✅ Custom hooks functionality
- ✅ Redux state management
- ✅ API integration
- ✅ Business logic validation
- ✅ User workflows (E2E)

### **Testing Tools**

- **Jest** - Unit testing framework
- **React Testing Library** - Component testing
- **Redux Mock Store** - State testing
- **MSW** - API mocking

## 📈 Performance Optimizations

### **React Optimizations**

```javascript
// Memoization for expensive calculations
const expensiveValue = useMemo(() => calculateComplexValue(data), [data]);

// Component memoization
const OptimizedComponent = React.memo(({ data }) => {
  return <ExpensiveComponent data={data} />;
});

// Callback memoization
const handleClick = useCallback(() => {
  onItemClick(item.id);
}, [item.id, onItemClick]);
```

### **Bundle Optimization**

- ✅ Code splitting with React.lazy()
- ✅ Tree shaking for unused code elimination
- ✅ Webpack optimization
- ✅ Image optimization and lazy loading

### **State Management Optimization**

- ✅ Normalized state structure
- ✅ Selective component subscriptions
- ✅ Memoized selectors
- ✅ Optimistic updates

## 🔒 Security Implementation

### **Frontend Security**

- ✅ XSS protection with input sanitization
- ✅ CSRF protection
- ✅ Secure authentication flow
- ✅ Input validation with Yup

### **Backend Security**

- ✅ Helmet.js security headers
- ✅ JWT token authentication
- ✅ Input sanitization
- ✅ Rate limiting
- ✅ CORS configuration

## 🌐 API Documentation

The application includes comprehensive API documentation using Swagger UI, available at:

```
http://localhost:5002/api-docs
```

### **API Endpoints**

```
Authentication:
POST /api/auth/login
POST /api/auth/register

Invoices:
GET    /api/invoices
POST   /api/invoices
PUT    /api/invoices/:id
DELETE /api/invoices/:id

Products:
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id

Contractors:
GET    /api/kontrahent
POST   /api/kontrahent
PUT    /api/kontrahent/:id
DELETE /api/kontrahent/:id
```

## 🚀 Deployment

### **Docker Production Build**

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy to production
docker-compose -f docker-compose.prod.yml up -d
```

### **Environment-Specific Configurations**

- ✅ Development environment
- ✅ Staging environment
- ✅ Production environment
- ✅ Environment variable management

## 🤝 Contributing

### **Development Workflow**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Code Standards**

- ✅ ESLint configuration
- ✅ Prettier formatting
- ✅ Conventional commits
- ✅ Code review process

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Konrad Tytus Gruca**

- Senior Full-Stack Developer
- Specialized in React, Node.js, and Enterprise Architecture
- Expert in Modern JavaScript, TypeScript, and Cloud Technologies

---

_This application demonstrates enterprise-level software development practices, modern architecture patterns, and scalable design principles suitable for production environments._

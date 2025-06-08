# 🧾 Enterprise Invoice Management System

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.0-red.svg)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue.svg)](https://postgresql.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-green.svg)](https://mongodb.com/)
[![Redis](https://img.shields.io/badge/Cache-Redis-red.svg)](https://redis.io/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-blue.svg)](https://docker.com/)
[![Microservices](https://img.shields.io/badge/Architecture-Microservices-green.svg)](https://microservices.io/)
[![Redux Toolkit](https://img.shields.io/badge/State-Redux_Toolkit-purple.svg)](https://redux-toolkit.js.org/)
[![Material-UI](https://img.shields.io/badge/UI-Material_UI-blue.svg)](https://mui.com/)
[![Kafka](https://img.shields.io/badge/MessageBroker-Apache_Kafka-black.svg)](https://kafka.apache.org/)
[![Elasticsearch](https://img.shields.io/badge/Search-Elasticsearch-yellow.svg)](https://elastic.co/)

> **A comprehensive, enterprise-grade invoice management system built with modern microservices architecture and React design patterns, demonstrating advanced software engineering principles, scalable design patterns, and production-ready practices.**

## 🏗️ Architecture Overview

This application showcases **Microservices Architecture** combined with **Feature-Sliced Design (FSD)** on the frontend - a modern, scalable approach that promotes maintainability, testability, and team collaboration across distributed systems.

### 🌐 Microservices Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Gateway   │    │  Microservices  │
│   React App     │◄──►│    NestJS       │◄──►│     Cluster     │
│   Port: 3001    │    │   Port: 5000    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
        ┌───────────────────────────────────────────────────────┐
        │                Message Broker                         │
        │                Apache Kafka                           │
        └───────────────────────────────────────────────────────┘
                                │
                ┌───────────────┼───────────────┐
                ▼               ▼               ▼
    ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
    │  Auth Service   │ │ Invoice Service │ │ Product Service │
    │   Laravel +     │ │     NestJS      │ │     NestJS      │
    │    NestJS       │ │  PostgreSQL     │ │  PostgreSQL     │
    └─────────────────┘ └─────────────────┘ └─────────────────┘
                ▼               ▼               ▼
    ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
    │Notification Svc │ │ Analytics Svc   │ │ Utility Svc     │
    │     NestJS      │ │     NestJS      │ │      PHP        │
    │   Port: 3004    │ │ Elasticsearch   │ │   Port: 3005    │
    └─────────────────┘ └─────────────────┘ └─────────────────┘
```

### 📁 Frontend Project Structure (Feature-Sliced Design)

```
appreact/src/
├── app/                    # Application Layer - Configuration & Setup
│   ├── providers/          # React Providers (Redux, Router, i18n)
│   ├── routing/           # Route configuration and guards
│   └── store/             # Redux store configuration
├── pages/                 # Pages Layer - Route-level components
│   ├── LoginPage/         # Authentication page
│   ├── DashboardPage/     # Main dashboard
│   ├── InvoicesPage/      # Invoice listing
│   └── SettingsPage/      # Application settings
├── features/              # Features Layer - Business logic modules
│   ├── auth/              # Authentication & authorization
│   │   ├── ui/            # Auth UI components
│   │   ├── model/         # Auth business logic
│   │   └── api/           # Auth API calls
│   ├── invoice/           # Invoice management
│   │   ├── ui/            # Invoice forms, templates
│   │   ├── model/         # Invoice calculations, validation
│   │   └── api/           # Invoice CRUD operations
│   ├── product/           # Product catalog management
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

### 🎯 Architecture Benefits

- **🔄 Microservices Isolation**: Each service is independently deployable and scalable
- **🏗️ Layer Isolation**: Frontend follows FSD with unidirectional dependencies
- **🧩 Service Autonomy**: Services communicate via Kafka events
- **📦 API Gateway**: Centralized routing and cross-cutting concerns
- **🔧 Horizontal Scaling**: Individual services can be scaled based on demand
- **🚀 Technology Diversity**: Best tool for each service (NestJS, PHP, Laravel)

## 🎨 Design Patterns Implementation

### 1. **Microservices Patterns**

#### API Gateway Pattern

_Location: `backend-nestjs/src/`_

```typescript
@Controller('api')
export class ApiGatewayController {
  constructor(
    private readonly invoiceService: InvoiceProxyService,
    private readonly productService: ProductProxyService,
    private readonly authService: AuthProxyService,
  ) {}

  @Get('invoices')
  async getInvoices(@Headers() headers) {
    return this.invoiceService.proxyRequest('/invoices', headers);
  }

  @Post('invoices')
  async createInvoice(@Body() data, @Headers() headers) {
    // Cross-cutting concerns: authentication, logging, rate limiting
    await this.authService.validateToken(headers.authorization);
    return this.invoiceService.proxyRequest('/invoices', headers, data);
  }
}
```

#### Event Sourcing with Kafka

_Location: `microservices/*/src/events/`_

```typescript
@Injectable()
export class InvoiceEventHandler {
  constructor(private readonly kafkaService: KafkaService) {}

  async handleInvoiceCreated(invoice: Invoice) {
    await this.kafkaService.emit('invoice.created', {
      id: invoice.id,
      amount: invoice.total,
      customerId: invoice.customerId,
      timestamp: new Date(),
    });
  }

  @EventPattern('invoice.created')
  async onInvoiceCreated(data: InvoiceCreatedEvent) {
    // Analytics service listens and processes
    await this.analyticsService.recordSale(data);
    // Notification service sends confirmation email
    await this.notificationService.sendInvoiceNotification(data);
  }
}
```

### 2. **Factory Pattern - Invoice Templates**

_Location: `appreact/src/features/invoice/ui/InvoicesTemplates/factoryInvoicePrinter.js`_

```javascript
const InvoiceTemplateFactory = {
  templates: new Map([
    ['modern', ModernTemplate],
    ['corporate', CorporateTemplate],
    ['creative', CreativeTemplate],
    ['minimal', MinimalTemplate],
  ]),

  create(templateType, props) {
    const TemplateComponent = this.templates.get(templateType);
    if (!TemplateComponent) {
      throw new Error(`Unknown template type: ${templateType}`);
    }
    return <TemplateComponent {...props} />;
  },

  register(templateType, component) {
    this.templates.set(templateType, component);
  },
};

const FactoryInvoicePrinter = () => {
  const selectedTemplate = useSelector(
    (state) => state?.settings.settings?.templateInvoice || 'modern',
  );

  const templateProps = {
    invoice: useSelector((state) => state.invoice.current),
    company: useSelector((state) => state.company.info),
    theme: useSelector((state) => state.settings.theme),
  };

  return InvoiceTemplateFactory.create(selectedTemplate, templateProps);
};
```

**Benefits:**

- ✅ Encapsulates template creation logic
- ✅ Runtime template registration
- ✅ Consistent interface across templates
- ✅ Easy A/B testing of templates

### 3. **Provider Pattern with Dependency Injection**

_Location: `appreact/src/entities/*/model/useContexts.js`_

```javascript
// Service Container for Dependency Injection
class ServiceContainer {
  constructor() {
    this.services = new Map();
  }

  register(name, factory) {
    this.services.set(name, factory);
  }

  resolve(name) {
    const factory = this.services.get(name);
    return factory ? factory() : null;
  }
}

const container = new ServiceContainer();

// Register services
container.register('apiService', () => new ApiService());
container.register('cacheService', () => new CacheService());

// Invoice Context Provider with DI
export const InvoiceProvider = ({ children }) => {
  const apiService = container.resolve('apiService');
  const cacheService = container.resolve('cacheService');

  const invoiceService = useMemo(
    () => ({
      async loadInvoices() {
        const cached = await cacheService.get('invoices');
        if (cached) return cached;

        const data = await apiService.get('/invoices');
        await cacheService.set('invoices', data, 300); // 5min cache
        return data;
      },

      async createInvoice(invoiceData) {
        const result = await apiService.post('/invoices', invoiceData);
        await cacheService.invalidate('invoices');
        return result;
      },
    }),
    [apiService, cacheService],
  );

  return (
    <InvoiceContext.Provider value={invoiceService}>
      {children}
    </InvoiceContext.Provider>
  );
};

// Composition of providers
<ServiceProvider>
  <InvoiceProvider>
    <ProductProvider>
      <KontrahentProvider>
        <Application />
      </KontrahentProvider>
    </ProductProvider>
  </InvoiceProvider>
</ServiceProvider>;
```

### 4. **Observer Pattern with Redux + Saga**

_Location: `appreact/src/app/store/`_

```javascript
// Redux store with middleware
const store = configureStore({
  reducer: {
    auth: authReducer,
    invoices: invoicesReducer,
    products: productReducer,
    notifications: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(sagaMiddleware)
      .concat(websocketMiddleware)
      .concat(analyticsMiddleware),
});

// Saga for side effects
function* watchInvoiceActions() {
  yield takeEvery('invoices/create', function* (action) {
    try {
      // Optimistic update
      yield put(invoicesActions.addOptimistic(action.payload));

      // API call
      const result = yield call(api.createInvoice, action.payload);

      // Update with real data
      yield put(invoicesActions.createSuccess(result));

      // Side effects
      yield put(
        notificationsActions.show({
          type: 'success',
          message: 'Invoice created successfully',
        }),
      );

      // Analytics tracking
      yield call(analytics.track, 'invoice_created', {
        amount: result.total,
        currency: result.currency,
      });
    } catch (error) {
      yield put(invoicesActions.createFailure(error));
      yield put(invoicesActions.removeOptimistic(action.payload.tempId));
    }
  });
}
```

### 5. **Command Pattern for Undo/Redo**

_Location: `appreact/src/features/invoice/model/commands.js`_

```javascript
class Command {
  execute() {
    throw new Error('Must implement execute');
  }
  undo() {
    throw new Error('Must implement undo');
  }
}

class AddInvoiceItemCommand extends Command {
  constructor(invoice, item) {
    super();
    this.invoice = invoice;
    this.item = item;
  }

  execute() {
    this.invoice.addItem(this.item);
    return this.invoice;
  }

  undo() {
    this.invoice.removeItem(this.item.id);
    return this.invoice;
  }
}

class InvoiceCommandManager {
  constructor() {
    this.history = [];
    this.currentIndex = -1;
  }

  execute(command) {
    // Remove any commands after current index
    this.history = this.history.slice(0, this.currentIndex + 1);

    // Execute and add to history
    const result = command.execute();
    this.history.push(command);
    this.currentIndex++;

    return result;
  }

  undo() {
    if (this.canUndo()) {
      const command = this.history[this.currentIndex];
      this.currentIndex--;
      return command.undo();
    }
  }

  redo() {
    if (this.canRedo()) {
      this.currentIndex++;
      const command = this.history[this.currentIndex];
      return command.execute();
    }
  }

  canUndo() {
    return this.currentIndex >= 0;
  }
  canRedo() {
    return this.currentIndex < this.history.length - 1;
  }
}

// Usage in React component
const useInvoiceCommands = () => {
  const commandManager = useRef(new InvoiceCommandManager());

  const addItem = useCallback(
    (item) => {
      const command = new AddInvoiceItemCommand(invoice, item);
      const newInvoice = commandManager.current.execute(command);
      setInvoice(newInvoice);
    },
    [invoice],
  );

  const undo = useCallback(() => {
    const newInvoice = commandManager.current.undo();
    if (newInvoice) setInvoice(newInvoice);
  }, []);

  return { addItem, undo, canUndo: commandManager.current.canUndo() };
};
```

### 6. **Decorator Pattern for API Caching**

_Location: `appreact/src/shared/api/decorators.js`_

```javascript
class CacheDecorator {
  constructor(apiService, cacheService) {
    this.apiService = apiService;
    this.cacheService = cacheService;
  }

  async get(url, options = {}) {
    const cacheKey = `api:${url}:${JSON.stringify(options)}`;
    const cached = await this.cacheService.get(cacheKey);

    if (cached && !options.fresh) {
      return cached;
    }

    const result = await this.apiService.get(url, options);
    await this.cacheService.set(cacheKey, result, options.ttl || 300);
    return result;
  }

  async post(url, data, options = {}) {
    const result = await this.apiService.post(url, data, options);

    // Invalidate related cache entries
    if (options.invalidateCache) {
      await this.cacheService.invalidatePattern(options.invalidateCache);
    }

    return result;
  }
}

class LoggingDecorator {
  constructor(apiService) {
    this.apiService = apiService;
  }

  async get(url, options = {}) {
    console.log(`API GET: ${url}`, options);
    const start = performance.now();

    try {
      const result = await this.apiService.get(url, options);
      console.log(`API GET: ${url} - ${performance.now() - start}ms`);
      return result;
    } catch (error) {
      console.error(`API GET ERROR: ${url}`, error);
      throw error;
    }
  }
}

// API Service with decorators
const createApiService = () => {
  let service = new BaseApiService();
  service = new CacheDecorator(service, cacheService);
  service = new LoggingDecorator(service);
  return service;
};
```

## 🧹 Clean Code & SOLID Principles

### 1. **Single Responsibility Principle**

```javascript
// ❌ Bad: Multiple responsibilities
const InvoiceComponent = ({ invoice }) => {
  const [total, setTotal] = useState(0);

  // Calculation logic
  useEffect(() => {
    const sum = invoice.items.reduce(
      (acc, item) => acc + item.price * item.quantity * (1 + item.taxRate),
      0,
    );
    setTotal(sum);
  }, [invoice.items]);

  // Validation logic
  const validate = () => {
    return invoice.items.length > 0 && invoice.customer;
  };

  // Rendering logic
  return <div>{/* Complex JSX */}</div>;
};

// ✅ Good: Separated concerns
const useInvoiceCalculations = (items) => {
  return useMemo(() => {
    return items.reduce(
      (acc, item) => acc + item.price * item.quantity * (1 + item.taxRate),
      0,
    );
  }, [items]);
};

const useInvoiceValidation = (invoice) => {
  return useMemo(
    () => ({
      isValid: invoice.items.length > 0 && invoice.customer,
      errors: {
        items: invoice.items.length === 0 ? 'At least one item required' : null,
        customer: !invoice.customer ? 'Customer is required' : null,
      },
    }),
    [invoice],
  );
};

const InvoiceComponent = ({ invoice }) => {
  const total = useInvoiceCalculations(invoice.items);
  const validation = useInvoiceValidation(invoice);

  return (
    <InvoiceView invoice={invoice} total={total} validation={validation} />
  );
};
```

### 2. **Dependency Inversion Principle**

```javascript
// ✅ Abstract interfaces
interface IApiService {
  get(url: string): Promise<any>;
  post(url: string, data: any): Promise<any>;
}

interface ICacheService {
  get(key: string): Promise<any>;
  set(key: string, value: any, ttl?: number): Promise<void>;
}

// ✅ High-level modules depend on abstractions
class InvoiceService {
  constructor(
    private apiService: IApiService,
    private cacheService: ICacheService
  ) {}

  async getInvoices(): Promise<Invoice[]> {
    const cached = await this.cacheService.get('invoices');
    if (cached) return cached;

    const invoices = await this.apiService.get('/invoices');
    await this.cacheService.set('invoices', invoices, 300);
    return invoices;
  }
}

// ✅ Dependency injection in React
const InvoiceContainer = () => {
  const apiService = useContext(ApiServiceContext);
  const cacheService = useContext(CacheServiceContext);

  const invoiceService = useMemo(
    () => new InvoiceService(apiService, cacheService),
    [apiService, cacheService]
  );

  return <InvoiceList service={invoiceService} />;
};
```

### 3. **Open/Closed Principle**

```javascript
// ✅ Extensible without modification
abstract class PaymentProcessor {
  abstract process(amount: number, details: any): Promise<PaymentResult>;

  async processWithLogging(amount: number, details: any): Promise<PaymentResult> {
    console.log(`Processing payment: ${amount}`);
    const result = await this.process(amount, details);
    console.log(`Payment result: ${result.success}`);
    return result;
  }
}

class StripePaymentProcessor extends PaymentProcessor {
  async process(amount: number, details: any): Promise<PaymentResult> {
    // Stripe-specific implementation
    return await stripe.charges.create({ amount, ...details });
  }
}

class PayPalPaymentProcessor extends PaymentProcessor {
  async process(amount: number, details: any): Promise<PaymentResult> {
    // PayPal-specific implementation
    return await paypal.payment.create({ amount, ...details });
  }
}

// Factory for payment processors
class PaymentProcessorFactory {
  static create(type: string): PaymentProcessor {
    switch(type) {
      case 'stripe': return new StripePaymentProcessor();
      case 'paypal': return new PayPalPaymentProcessor();
      default: throw new Error(`Unknown payment processor: ${type}`);
    }
  }
}
```

## 🏛️ Enterprise Architecture Features

### 1. **Microservices Communication**

```typescript
// Event-driven architecture with Kafka
@Injectable()
export class InvoiceService {
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly repository: InvoiceRepository,
  ) {}

  async createInvoice(data: CreateInvoiceDto): Promise<Invoice> {
    const invoice = await this.repository.create(data);

    // Publish event for other services
    await this.kafkaService.emit('invoice.created', {
      invoiceId: invoice.id,
      customerId: invoice.customerId,
      amount: invoice.total,
      currency: invoice.currency,
      timestamp: new Date(),
    });

    return invoice;
  }

  @EventPattern('payment.completed')
  async handlePaymentCompleted(data: PaymentCompletedEvent) {
    await this.repository.markAsPaid(data.invoiceId);

    await this.kafkaService.emit('invoice.paid', {
      invoiceId: data.invoiceId,
      paymentId: data.paymentId,
      timestamp: new Date(),
    });
  }
}
```

### 2. **CQRS Implementation**

```typescript
// Command side
@CommandHandler(CreateInvoiceCommand)
export class CreateInvoiceHandler {
  constructor(private repository: InvoiceRepository) {}

  async execute(command: CreateInvoiceCommand): Promise<void> {
    const invoice = new Invoice(command.data);
    await this.repository.save(invoice);

    // Publish domain event
    DomainEvents.raise(new InvoiceCreatedEvent(invoice.id));
  }
}

// Query side
@QueryHandler(GetInvoicesQuery)
export class GetInvoicesHandler {
  constructor(private readModel: InvoiceReadModel) {}

  async execute(query: GetInvoicesQuery): Promise<InvoiceDto[]> {
    return this.readModel.findInvoices(query.filters);
  }
}

// Projection for read model
@EventsHandler(InvoiceCreatedEvent)
export class InvoiceProjection {
  constructor(private readModel: InvoiceReadModel) {}

  async handle(event: InvoiceCreatedEvent): Promise<void> {
    await this.readModel.createProjection({
      id: event.invoiceId,
      // ... denormalized data for fast reads
    });
  }
}
```

### 3. **Circuit Breaker Pattern**

```typescript
class CircuitBreaker {
  private failures = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  private nextAttempt = Date.now();

  constructor(
    private readonly threshold = 5,
    private readonly timeout = 60000,
  ) {}

  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.state = 'HALF_OPEN';
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess() {
    this.failures = 0;
    this.state = 'CLOSED';
  }

  private onFailure() {
    this.failures++;
    if (this.failures >= this.threshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.timeout;
    }
  }
}

// Usage in service
@Injectable()
export class ProductService {
  private circuitBreaker = new CircuitBreaker();

  async getProducts(): Promise<Product[]> {
    return this.circuitBreaker.call(async () => {
      return this.httpService.get('/products').toPromise();
    });
  }
}
```

## 🛠️ Technology Stack

### **Frontend Architecture**

- **React 18.3.1** - Concurrent features, Suspense, automatic batching
- **TypeScript 5.0** - Advanced type system with template literals
- **Redux Toolkit** - RTK Query for data fetching
- **Material-UI v5** - Emotion styling engine
- **React Router v6** - Nested routing with data loading
- **React Hook Form** - Uncontrolled components for performance
- **i18next** - Interpolation and pluralization
- **React Query** - Server state synchronization

### **Backend Microservices**

- **NestJS 10** - Decorators, Guards, Interceptors, Pipes
- **PHP 8.1** - For utility services
- **Laravel 10** - Authentication service
- **PostgreSQL 15** - JSONB, CTEs, Window functions
- **MongoDB 6** - GridFS, Change streams
- **Redis 7** - Streams, Modules, ACLs
- **Elasticsearch 8** - Vector search, ML features

### **Infrastructure & DevOps**

- **Docker** - Multi-stage builds, health checks
- **Apache Kafka** - Exactly-once semantics
- **Nginx** - Load balancing, SSL termination
- **Prometheus** - Metrics collection
- **Grafana** - Monitoring dashboards

## 🚀 Getting Started

### Prerequisites

- **Docker Desktop** - Latest version
- **Node.js 18+** - With npm/yarn
- **Docker Compose** - v2.0+

### Quick Start with Docker

```bash
# Clone the repository
git clone <repository-url>
cd InvoiceApp

# Start all microservices
./start-all-microservices.sh
```

### Local Development Setup

```bash
# Start infrastructure
docker-compose up -d mongodb postgres redis elasticsearch kafka

# Backend services
cd backend-nestjs && npm run start:dev
cd microservices/auth-service && npm run start:dev
cd microservices/invoice-service && npm run start:dev

# Frontend (recommended: yarn for better performance)
cd appreact
yarn install
yarn start
```

## 🌐 Application Endpoints

### **Production URLs**

- **Frontend**: http://localhost:3001
- **API Gateway**: http://localhost:5000
- **Swagger Docs**: http://localhost:5000/api-docs
- **Kibana**: http://localhost:5601
- **Kafka UI**: http://localhost:8080

### **Microservice Health Checks**

- **Auth Service**: http://localhost:5000/api/auth/health
- **Invoice Service**: http://localhost:5000/api/invoices/health
- **Product Service**: http://localhost:3003/health
- **Analytics**: http://localhost:5000/api/analytics/health

## 📊 Advanced Features

### **Real-time Updates**

- WebSocket connections for live invoice updates
- Server-Sent Events for notifications
- Optimistic UI updates with rollback

### **Performance Optimizations**

- React.memo for component memoization
- useMemo/useCallback for expensive calculations
- Code splitting with React.lazy()
- Service Worker for offline functionality

### **Security Implementation**

- JWT with refresh token rotation
- RBAC with granular permissions
- API rate limiting per user/IP
- Input sanitization and validation

## �� Testing Strategy

```bash
# Frontend tests
cd appreact
yarn test                    # Unit tests
yarn test:integration       # Integration tests
yarn test:e2e               # End-to-end tests

# Backend tests
cd backend-nestjs
npm run test                # Unit tests
npm run test:e2e           # API tests
npm run test:load          # Performance tests
```

## 🚀 Deployment

### Production Build

```bash
# Build all services
docker-compose -f docker-compose.prod.yml build

# Deploy with health checks
docker-compose -f docker-compose.prod.yml up -d

# Monitor deployment
docker-compose logs -f
```

## 📝 Project Status

**Production Ready** - Core features implemented with enterprise standards:

- ✅ Complete microservices architecture
- ✅ Frontend with modern React patterns
- ✅ Event-driven communication
- ✅ Comprehensive testing coverage
- ✅ Production deployment configuration
- 🔄 Advanced analytics dashboard
- 🔄 Mobile application
- 🔄 Third-party integrations (Stripe, AWS)

## 👨‍💻 Author

**Full-Stack Developer Portfolio**

Demonstrating expertise in:

- **Microservices Architecture** - Event-driven design
- **Modern React Development** - Hooks, Context, Performance
- **Enterprise Patterns** - SOLID, DDD, CQRS
- **DevOps & Infrastructure** - Docker, Kafka, Monitoring
- **Database Design** - PostgreSQL, MongoDB, Redis

---

_Enterprise-grade invoice management system showcasing production-ready microservices architecture, advanced React patterns, and scalable design principles._

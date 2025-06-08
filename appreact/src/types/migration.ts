// Typy pomocnicze dla migracji JSX -> TSX
// Tymczasowe rozwiązanie z any/unknown dla szybkiego zakończenia migracji

// Redux state - dodajemy any dla wszystkich części state
export interface RootState {
  auth?: any;
  settings?: any;
  products?: any;
  stats?: any;
  [key: string]: any;
}

// User type z kompatybilnością dla mail/email
export interface MigrationUser {
  id?: string;
  email?: string;
  mail?: string; // dla kompatybilności z Actions
  name?: string;
  username?: string; // dla kompatybilności z Navbar
  companyId?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

// Styled components props
export interface StyledProps {
  theme?: any;
  selected?: any;
  colors?: any;
  designColors?: any;
  gradientColors?: any;
  category?: any;
  [key: string]: any;
}

// Event handlers z any
export type AnyEventHandler = (event: any) => void;
export type AnyChangeHandler = (event: any) => void;

// Component props z any
export interface AnyComponentProps {
  [key: string]: any;
  children?: any;
  className?: any;
}

// API response types
export interface ApiResponse {
  data?: any;
  error?: any;
  exception?: any;
  [key: string]: any;
}

// Form types
export interface AnyFormData {
  [key: string]: any;
}

// Table/DataTable types
export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row?: any) => any;
}

export interface DataTableProps extends AnyComponentProps {
  data?: any[];
  columns?: TableColumn[];
  title?: any;
  icon?: any;
  onAdd?: any;
  onEdit?: any;
  onDelete?: any;
  onView?: any;
  onExport?: any;
  children?: any;
  initialRowsPerPage?: number;
  searchable?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  paginated?: boolean;
  actions?: string[];
}

// Theme types
export interface CustomTheme {
  gradient?: any;
  category?: any;
  description?: any;
  colors?: any;
  [key: string]: any;
}

// Dispatch type
export type AnyDispatch = (action: any) => any;

// Selector type
export type AnySelector<T = any> = (state: any) => T;

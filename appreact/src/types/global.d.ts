// Global type definitions for more liberal TypeScript

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

// User type compatibility - support both email and mail properties
declare global {
  interface User {
    id?: string;
    email?: string;
    mail?: string;
    name?: string;
    username?: string;
    companyId?: string;
    createdAt?: string;
    updatedAt?: string;
    [key: string]: any;
  }

  interface Kontrahent {
    id?: string;
    _id?: string;
    companyName?: string;
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
}

// Extend theme interface for custom properties
declare module '@mui/material/styles' {
  interface Theme {
    customTheme?: {
      gradient?: string;
      category?: string;
      description?: string;
      colors?: {
        primary?: string;
        secondary?: string;
        background?: string;
        text?: string;
        gradients?: string[];
      };
    };
  }
}

// Extend styled components props
declare module '@mui/material/Paper' {
  interface PaperOwnProps {
    selected?: boolean;
  }
}

declare module '@mui/material/Card' {
  interface CardOwnProps {
    selected?: boolean;
  }
}

declare module '@mui/material/ListItem' {
  interface ListItemOwnProps {
    active?: boolean;
    component?: any;
    to?: string;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyOwnProps {
    component?: any;
    to?: string;
  }
}

declare module '@mui/material/Box' {
  interface BoxOwnProps {
    selected?: boolean;
    colors?: any;
  }
}

declare module '@mui/material/TableContainer' {
  interface TableContainerOwnProps {
    component?: any;
  }
}

declare module '@mui/material/Chip' {
  interface ChipOwnProps {
    color?:
      | 'default'
      | 'primary'
      | 'secondary'
      | 'error'
      | 'info'
      | 'success'
      | 'warning'
      | string;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonOwnProps {
    isSelected?: boolean;
  }
}

// Global interfaces
interface Window {
  matchMedia: any;
}

// Make all properties optional for easier migration
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Generic any type for problematic imports
declare const __DEV__: boolean;

// Jest globals
declare namespace jest {
  function fn(): any;
}

declare const jest: {
  fn: () => any;
};

// Global ResizeObserver
declare class ResizeObserver {
  constructor(callback: any);
  observe(target: Element): void;
  unobserve(target: Element): void;
  disconnect(): void;
}

declare global {
  interface Window {
    ResizeObserver: typeof ResizeObserver;
  }

  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Redux state types - make them more flexible
declare module 'react-redux' {
  interface DefaultRootState {
    auth?: any;
    settings?: any;
    products?: any;
    stats?: any;
    [key: string]: any;
  }

  // Override dispatch type to be more liberal
  interface Dispatch<A = any> {
    <T extends A>(action: T): T;
    <R>(asyncAction: any): R;
  }
}

// Redux Toolkit types
declare module '@reduxjs/toolkit' {
  interface UnknownAction {
    type: string;
    [extraProps: string]: any;
  }
}

export {};

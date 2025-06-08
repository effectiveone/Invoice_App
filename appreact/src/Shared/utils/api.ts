import type { ApiError } from '../../types/common';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiRequestConfig {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: string | FormData;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

interface UserWithToken {
  id: string;
  email: string;
  name: string;
  companyId?: string;
  token: string;
}

// Base API URL
const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get auth token from storage
export const getAuthToken = (): string | null => {
  const user: UserWithToken | null = JSON.parse(
    localStorage.getItem('user') || 'null',
  );
  return user?.token || localStorage.getItem('token');
};

// Create request headers with auth
export const createAuthHeaders = (): Record<string, string> => {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

// Generic API request function
export const apiRequest = async <T = any>(
  endpoint: string,
  config: Partial<ApiRequestConfig> = {},
): Promise<ApiResponse<T>> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultConfig: ApiRequestConfig = {
    method: 'GET',
    headers: createAuthHeaders(),
  };

  const finalConfig = { ...defaultConfig, ...config };

  try {
    const response = await fetch(url, finalConfig);

    let data: T;
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = (await response.text()) as unknown as T;
    }

    if (!response.ok) {
      const error: ApiError = {
        message:
          (data as any)?.message ||
          `HTTP ${response.status}: ${response.statusText}`,
        code: response.status.toString(),
        details: data as Record<string, unknown>,
      };
      throw error;
    }

    return {
      data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    if (error instanceof Error) {
      const apiError: ApiError = {
        message: error.message,
        code: 'NETWORK_ERROR',
      };
      throw apiError;
    }
    throw error;
  }
};

// Convenience methods
export const apiGet = <T = any>(endpoint: string): Promise<ApiResponse<T>> =>
  apiRequest<T>(endpoint, { method: 'GET' });

export const apiPost = <T = any>(
  endpoint: string,
  data: any,
): Promise<ApiResponse<T>> =>
  apiRequest<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const apiPut = <T = any>(
  endpoint: string,
  data: any,
): Promise<ApiResponse<T>> =>
  apiRequest<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const apiDelete = <T = any>(endpoint: string): Promise<ApiResponse<T>> =>
  apiRequest<T>(endpoint, { method: 'DELETE' });

// URL paths for routing
export const sanitizedUrl = {
  MainPage: '/',
  Dashboard: '/dashboard',
  AllInvoices: '/faktury',
  NewInvoice: '/nowa-faktura',
  Inventory: '/produkty',
  Kontrahent: '/kontrahenci',
  MyCompany: '/moja-firma',
  Settings: '/ustawienia',
};

// Handle API errors
export const handleApiError = (error: ApiError): string => {
  console.error('API Error:', error);

  switch (error.code) {
    case '401':
      return 'Nie jesteś zalogowany. Zaloguj się ponownie.';
    case '403':
      return 'Nie masz uprawnień do wykonania tej operacji.';
    case '404':
      return 'Zasób nie został znaleziony.';
    case '500':
      return 'Wystąpił błąd serwera. Spróbuj ponownie później.';
    case 'NETWORK_ERROR':
      return 'Błąd połączenia z serwerem. Sprawdź połączenie internetowe.';
    default:
      return error.message || 'Wystąpił nieoczekiwany błąd.';
  }
};

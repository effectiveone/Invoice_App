import type { User } from '../../types/common';

// Token utilities
export const getTokenFromStorage = (): string | null => {
  return localStorage.getItem('token');
};

export const setTokenToStorage = (token: string): void => {
  localStorage.setItem('token', token);
};

export const removeTokenFromStorage = (): void => {
  localStorage.removeItem('token');
};

// User utilities
export const getUserFromStorage = (): User | null => {
  const userString = localStorage.getItem('user');
  if (!userString) return null;
  
  try {
    return JSON.parse(userString) as User;
  } catch {
    return null;
  }
};

export const setUserToStorage = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromStorage = (): void => {
  localStorage.removeItem('user');
};

// Auth status check
export const isAuthenticated = (): boolean => {
  const token = getTokenFromStorage();
  const user = getUserFromStorage();
  return !!(token && user);
};

// Clear all auth data
export const clearAuthData = (): void => {
  removeTokenFromStorage();
  removeUserFromStorage();
};

// Check if token is expired (basic check)
export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch {
    return true;
  }
};

export const logout = () => {
  localStorage.clear();
  window.location.pathname = "/login";
};

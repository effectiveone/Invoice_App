import type { FormErrors } from '../../types/common';

export interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// NIP validation (Polish tax number)
export const validateNIP = (nip: string): boolean => {
  if (!nip || nip.length !== 10) return false;

  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  const digits = nip.split('').map(Number);

  const sum = weights.reduce((acc, weight, index) => {
    return acc + weight * digits[index];
  }, 0);

  const checksum = sum % 11;
  return checksum === digits[9];
};

// REGON validation (Polish business registry number)
export const validateREGON = (regon: string): boolean => {
  if (!regon || (regon.length !== 9 && regon.length !== 14)) return false;

  const weights9 = [8, 9, 2, 3, 4, 5, 6, 7];
  const weights14 = [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8];

  const digits = regon.split('').map(Number);
  const weights = regon.length === 9 ? weights9 : weights14;
  const lastDigitIndex = regon.length - 1;

  const sum = weights.reduce((acc, weight, index) => {
    return acc + weight * digits[index];
  }, 0);

  const checksum = sum % 11;
  const expectedChecksum = checksum === 10 ? 0 : checksum;

  return expectedChecksum === digits[lastDigitIndex];
};

// Required field validation
export const validateRequired = (
  value: string | number | undefined | null,
): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  if (typeof value === 'number') {
    return !isNaN(value);
  }
  return value !== null && value !== undefined;
};

// Numeric validation
export const validateNumeric = (value: string): boolean => {
  return !isNaN(Number(value)) && !isNaN(parseFloat(value));
};

// Form validation helper
export const validateForm = (
  data: Record<string, any>,
  rules: Record<string, Array<(value: any) => boolean | string>>,
): ValidationResult => {
  const errors: FormErrors = {};
  let isValid = true;

  Object.keys(rules).forEach((field) => {
    const value = data[field];
    const fieldRules = rules[field];

    for (const rule of fieldRules) {
      const result = rule(value);
      if (result !== true) {
        errors[field] =
          typeof result === 'string' ? result : `Invalid ${field}`;
        isValid = false;
        break;
      }
    }
  });

  return { isValid, errors };
};

export const validateLoginForm = ({ mail, password }) => {
  const isMailValid = validateMail(mail);
  const isPasswordValid = validatePassword(password);

  return isMailValid && isPasswordValid;
};

export const validateRegisterForm = ({ mail, password, username }) => {
  return (
    validateMail(mail) &&
    validatePassword(password) &&
    validateUsername(username)
  );
};

const validatePassword = (password) => {
  return password.length > 5 && password.length < 13;
};

const validateMail = (mail) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(mail);
};

const validateUsername = (username) => {
  return username.length > 2 && username.length < 13;
};

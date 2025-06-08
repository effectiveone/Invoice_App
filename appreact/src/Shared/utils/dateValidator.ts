import { format, isValid, parseISO } from 'date-fns';

export type DateFormat =
  | 'YYYY-MM-DD'
  | 'DD-MM-YYYY'
  | 'DD/MM/YYYY'
  | 'MM/DD/YYYY';

// Convert date to YYYY-MM-DD format for inputs
export const convertDate = (dateString: string | Date): string => {
  if (!dateString) return '';

  const date =
    typeof dateString === 'string' ? new Date(dateString) : dateString;

  if (isNaN(date.getTime())) return '';

  return date.toISOString().slice(0, 10);
};

// Validate date format
export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

// Format date for display
export const formatDate = (
  dateString: string | Date,
  format: DateFormat = 'DD-MM-YYYY',
): string => {
  if (!dateString) return '';

  const date =
    typeof dateString === 'string' ? new Date(dateString) : dateString;

  if (isNaN(date.getTime())) return '';

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  switch (format) {
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'DD-MM-YYYY':
      return `${day}-${month}-${year}`;
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    default:
      return `${day}-${month}-${year}`;
  }
};

// Get date difference in days
export const getDateDifference = (
  startDate: string | Date,
  endDate: string | Date,
): number => {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Check if date is in the past
export const isDateInPast = (dateString: string | Date): boolean => {
  const date =
    typeof dateString === 'string' ? new Date(dateString) : dateString;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date < today;
};

// Check if date is in the future
export const isDateInFuture = (dateString: string | Date): boolean => {
  const date =
    typeof dateString === 'string' ? new Date(dateString) : dateString;
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  return date > today;
};

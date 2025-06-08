import { useState } from 'react';

interface UsePaginationReturn {
  startIndex: number;
  endIndex: number;
  currentPage: number;
  pageSize: number;
  handleChangePage: (event: unknown, newPage: number) => void;
}

export const usePagination = (page: number): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize: number = page;

  const handleChangePage = (event: unknown, newPage: number): void => {
    setCurrentPage(newPage);
  };

  const startIndex: number = (currentPage - 1) * pageSize;
  const endIndex: number = startIndex + pageSize;

  return {
    startIndex,
    endIndex,
    currentPage,
    pageSize,
    handleChangePage,
  };
};

export default usePagination;

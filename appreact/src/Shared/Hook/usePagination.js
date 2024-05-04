import { useState } from "react";

export const usePagination = (page) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = page;
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    startIndex,
    endIndex,
    currentPage,
    pageSize,
    handleChangePage,
  };
};

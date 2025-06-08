import { useState, useCallback, useMemo } from 'react';
import { Invoice, Kontrahent } from '../../types/invoice';

interface Product {
  _id: string;
  name: string;
  netPrice: number;
  vat: number;
  unit: string;
}

interface UseInvoiceTableProps {
  invoiceDate?: Invoice[];
  kontrahent?: Kontrahent[];
  productList?: Product[];
}

type OrderBy =
  | 'number'
  | 'issueDate'
  | 'customer'
  | 'netAmount'
  | 'grossAmount'
  | 'name'
  | 'netPrice'
  | 'vat'
  | 'unit'
  | 'companyName'
  | 'legalForm'
  | 'nip'
  | 'city';
type Order = 'asc' | 'desc';

export const useInvoiceTable = ({
  invoiceDate,
  kontrahent,
  productList,
}: UseInvoiceTableProps) => {
  const [filterValue, setFilterValue] = useState<string>('');
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<OrderBy>('issueDate');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleSortRequest = (property: OrderBy): void => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedInvoices = useMemo(() => {
    let filteredArray = invoiceDate || [];

    if (filterValue) {
      filteredArray = filteredArray?.filter((obj) =>
        obj.selectedKontrahent?.kontrahent_companyName
          ?.toLowerCase()
          .includes(filterValue.toLowerCase()),
      );
    }

    const sortedArray =
      filteredArray &&
      filteredArray.length > 0 &&
      filteredArray?.sort((a, b) => {
        if (orderBy === 'number') {
          if (order === 'asc') {
            return a.invoiceNumber.localeCompare(b.invoiceNumber);
          } else {
            return b.invoiceNumber.localeCompare(a.invoiceNumber);
          }
        } else if (orderBy === 'issueDate') {
          if (order === 'asc') {
            return a.invoiceSaleDate.localeCompare(b.invoiceSaleDate);
          } else {
            return b.invoiceSaleDate.localeCompare(a.invoiceSaleDate);
          }
        } else if (orderBy === 'customer') {
          if (order === 'asc') {
            return (
              a.selectedKontrahent?.kontrahent_companyName || ''
            ).localeCompare(b.selectedKontrahent?.kontrahent_companyName || '');
          } else {
            return (
              b.selectedKontrahent?.kontrahent_companyName || ''
            ).localeCompare(a.selectedKontrahent?.kontrahent_companyName || '');
          }
        } else if (orderBy === 'netAmount') {
          if (order === 'asc') {
            return a.totalNetValue - b.totalNetValue;
          } else {
            return b.totalNetValue - a.totalNetValue;
          }
        } else if (orderBy === 'grossAmount') {
          if (order === 'asc') {
            return a.totalGrossValue - b.totalGrossValue;
          } else {
            return b.totalGrossValue - a.totalGrossValue;
          }
        }
        return 0;
      });

    return sortedArray;
  }, [invoiceDate, orderBy, order, filterValue]);

  const sortedProducts = useMemo(() => {
    let filteredArray = productList || [];

    if (filterValue) {
      filteredArray = filteredArray?.filter((obj) =>
        obj.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    const sortedArray =
      filteredArray &&
      filteredArray.length > 0 &&
      filteredArray?.sort((a, b) => {
        if (orderBy === 'name') {
          if (order === 'asc') {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        } else if (orderBy === 'netPrice') {
          if (order === 'asc') {
            return a.netPrice - b.netPrice;
          } else {
            return b.netPrice - a.netPrice;
          }
        } else if (orderBy === 'vat') {
          if (order === 'asc') {
            return a.vat - b.vat;
          } else {
            return b.vat - a.vat;
          }
        } else if (orderBy === 'unit') {
          if (order === 'asc') {
            return a.unit.localeCompare(b.unit);
          } else {
            return b.unit.localeCompare(a.unit);
          }
        }
        return 0;
      });
    return sortedArray;
  }, [productList, orderBy, order, filterValue]);

  const sortedKontrahents = useMemo(() => {
    let filteredArray = kontrahent || [];

    if (filterValue) {
      filteredArray = filteredArray?.filter((obj) =>
        obj.companyName.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    const sortedArray =
      filteredArray &&
      filteredArray.length > 0 &&
      filteredArray?.sort((a, b) => {
        if (orderBy === 'companyName') {
          if (order === 'asc') {
            return a.companyName.localeCompare(b.companyName);
          } else {
            return b.companyName.localeCompare(a.companyName);
          }
        } else if (orderBy === 'legalForm') {
          if (order === 'asc') {
            return a.legalForm.localeCompare(b.legalForm);
          } else {
            return b.legalForm.localeCompare(a.legalForm);
          }
        } else if (orderBy === 'nip') {
          if (order === 'asc') {
            return a.nip.localeCompare(b.nip);
          } else {
            return b.nip.localeCompare(a.nip);
          }
        } else if (orderBy === 'city') {
          if (order === 'asc') {
            return a.city.localeCompare(b.city);
          } else {
            return b.city.localeCompare(a.city);
          }
        }
        return 0;
      });
    return sortedArray;
  }, [kontrahent, orderBy, order, filterValue]);

  const emptyRows =
    rowsPerPage -
    Math.min(
      rowsPerPage,
      (sortedInvoices && Array.isArray(sortedInvoices)
        ? sortedInvoices.length
        : 0) -
        page * rowsPerPage,
    );

  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = useCallback((e: string): void => {
    setFilterValue(e);
  }, []);

  return {
    emptyRows,
    handleChangePage,
    handleSortRequest,
    handleChangeRowsPerPage,
    handleFilterChange,
    sortedKontrahents,
    sortedProducts,
    order,
    orderBy,
    page,
    rowsPerPage,
    sortedInvoices,
  };
};

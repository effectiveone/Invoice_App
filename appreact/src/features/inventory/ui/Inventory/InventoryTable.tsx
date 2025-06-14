import React, { useEffect } from 'react';
import { useProductContext } from '../../../../entities/product/model/useProductContext';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TableSortLabel,
  TablePagination,
} from '@material-ui/core';
import FilterWrapper from '../../../../shared/ui/FilterWrapper';
import { useInvoiceTable } from '../../../../shared/lib/useInvoiceTable';
import { useModal } from '../../../../shared/lib/useModal';
import { t } from 'i18next';

const useStyles = makeStyles((theme) => ({
  gridFlex: {
    display: 'flex',
    flexDirection: 'row',
    gap: '150px',
    marginLeft: '50px',
    paddingBottom: '50px',
  },
  boxFlex: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    justifyContent: 'space-between',
  },
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const productsName = [
  {
    value: 'name',
    name: 'Nazwa Produktu',
  },
  {
    value: 'netPrice',
    name: 'cena netto',
  },
  {
    value: 'vat',
    name: 'vat',
  },
  {
    value: 'unit',
    name: 'ilość',
  },
];

const ContrahentTable = () => {
  const { handleOpen } = useModal();

  const { handleDelete, handleEdit, setButtonText, productList, loadProducts } =
    useProductContext();

  const {
    order,
    orderBy,
    page,
    rowsPerPage,
    handleChangePage,
    handleSortRequest,
    handleChangeRowsPerPage,
    handleFilterChange,
    sortedProducts,
  } = useInvoiceTable({ productList: productList });
  const classes = useStyles();

  // Załadowanie danych produktów przy pierwszym renderze
  useEffect(() => {
    loadProducts();
  }, []);

  const handleEditChange = (id) => {
    handleEdit(id);
    setButtonText('Zapisz zmiany');
  };

  return (
    <>
      <FilterWrapper
        handleFilterChange={handleFilterChange}
        // selected={selected}
      />

      <TableContainer component={Paper} data-testid='inventory-table'>
        <Table className={classes.table} aria-label='invoices table'>
          <TableHead>
            <TableRow>
              {productsName?.map((k) => (
                <React.Fragment key={uuidv4()}>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === k.value}
                      direction={order}
                      onClick={() => handleSortRequest(k.value as any)}
                    >
                      {k.name}
                    </TableSortLabel>
                  </TableCell>
                </React.Fragment>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedProducts &&
              Array.isArray(sortedProducts) &&
              (rowsPerPage > 0
                ? sortedProducts?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                  )
                : sortedProducts
              )?.map((invoice, index) => (
                <React.Fragment key={index}>
                  <InvoiceComponent
                    {...invoice}
                    changeInvoiceNumber=''
                    handleOpen={handleOpen}
                    handleEditChange={handleEditChange}
                    handleDelete={handleDelete}
                  />
                </React.Fragment>
              ))}
          </TableBody>
          {sortedProducts.length > 10 && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component='div'
              count={sortedProducts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export default ContrahentTable;

const InvoiceComponent = ({
  _id,
  name,
  vat,
  netPrice,
  unit,
  changeInvoiceNumber,
  handleOpen,
  handleEditChange,
  handleDelete,
}) => {
  const classes = useStyles();

  return (
    <TableRow key={uuidv4()}>
      <TableCell component='th' scope='row'>
        {name}
      </TableCell>
      <TableCell>{netPrice}</TableCell>
      <TableCell>{vat}</TableCell>
      <TableCell>{unit}</TableCell>
      <TableCell>
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          onClick={() => handleEditChange(_id)}
        >
          {t('edit')}
        </Button>
      </TableCell>

      <TableCell>
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
          onClick={() => handleDelete(_id)}
        >
          {t('delete')}
        </Button>
      </TableCell>
    </TableRow>
  );
};

import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { styled } from '@mui/material/styles';
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
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Chip,
  Box,
  Typography,
} from '@mui/material';
import { useKontrahentContext } from '../../../../entities/kontrahent/model/useKontrahentContext';
import { useInvoiceTable } from '../../../../shared/lib/useInvoiceTable';
import { useModal } from '../../../../shared/lib/useModal';
import { t } from 'i18next';
import FilterWrapper from '../../../../shared/ui/FilterWrapper';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

const useStyles = (): any => ({
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
    margin: '8px',
  },
});

const kontrahentsDate = [
  {
    value: 'companyName',
    name: 'Nazwa fromy',
  },
  {
    value: 'legalForm',
    name: 'Forma prawna',
  },
  {
    value: 'nip',
    name: 'NIP',
  },
  {
    value: 'city',
    name: 'Miasto',
  },
];

function ContrahentTable(contractor) {
  const { handleOpen } = useModal();

  const {
    handleEdit,
    handleDelete,
    setButtonText,
    kontrahent,
    loadKontrahents,
  } = useKontrahentContext();

  // Załadowanie danych kontrahentów przy pierwszym renderze
  useEffect(() => {
    loadKontrahents();
  }, []);

  const {
    order,
    orderBy,
    page,
    rowsPerPage,
    handleChangePage,
    handleSortRequest,
    handleChangeRowsPerPage,
    handleFilterChange,
    sortedKontrahents,
  } = useInvoiceTable({ kontrahent: kontrahent });
  const classes = useStyles();
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

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='invoices table'>
          <TableHead>
            <TableRow>
              {kontrahentsDate?.map((k) => (
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
            {sortedKontrahents &&
              Array.isArray(sortedKontrahents) &&
              (rowsPerPage > 0
                ? sortedKontrahents?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                  )
                : sortedKontrahents
              )?.map((invoice, index) => (
                <React.Fragment key={index}>
                  <InvoiceComponent
                    {...invoice}
                    changeInvoiceNumber={() => {}}
                    handleOpen={handleOpen}
                    handleEditChange={handleEditChange}
                    handleDelete={handleDelete}
                  />
                </React.Fragment>
              ))}
          </TableBody>
          {sortedKontrahents.length > 10 && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component='div'
              count={sortedKontrahents.length}
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
}

export default ContrahentTable;

const InvoiceComponent = ({
  _id,
  companyName,
  legalForm,
  nip,
  city,
  changeInvoiceNumber,
  handleOpen,
  handleEditChange,
  handleDelete,
}) => {
  const classes = useStyles();

  return (
    <TableRow key={uuidv4()}>
      <TableCell component='th' scope='row'>
        {companyName}
      </TableCell>
      <TableCell>{legalForm}</TableCell>
      <TableCell>{nip}</TableCell>
      <TableCell>{city}</TableCell>
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

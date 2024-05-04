import React from "react";
import { useKontrahentContext } from "../../Context/useKontrahentContext";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
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
} from "@material-ui/core";
import FilterWrapper from "../FilterWrapper";
import { useInvoiceTable } from "../../Hook/useInvoiceTable";
import { useModal } from "../../Hook/useModal";
import { t } from "i18next";

const useStyles = makeStyles((theme) => ({
  gridFlex: {
    display: "flex",
    flexDirection: "row",
    gap: "150px",
    marginLeft: "50px",
    paddingBottom: "50px",
  },
  boxFlex: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    justifyContent: "space-between",
  },
}));

const kontrahentsDate = [
  {
    value: "companyName",
    name: "Nazwa fromy",
  },
  {
    value: "legalForm",
    name: "Forma prawna",
  },
  {
    value: "nip",
    name: "NIP",
  },
  {
    value: "city",
    name: "Miasto",
  },
];

function ContrahentTable(contractor) {
  const { handleOpen } = useModal();

  const { handleEdit, handleDelete, setButtonText, kontrahent } =
    useKontrahentContext();

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
    setButtonText("Zapisz zmiany");
  };

  return (
    <>
      <FilterWrapper
        handleFilterChange={handleFilterChange}
        // selected={selected}
      />

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="invoices table">
          <TableHead>
            <TableRow>
              {kontrahentsDate?.map((k) => (
                <React.Fragment key={uuidv4()}>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === k.value}
                      direction={order}
                      onClick={() => handleSortRequest(k.value)}
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
                    page * rowsPerPage + rowsPerPage
                  )
                : sortedKontrahents
              )?.map((invoice, index) => (
                <React.Fragment key={index}>
                  <InvoiceComponent
                    {...invoice}
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
              component="div"
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
      <TableCell component="th" scope="row">
        {companyName}
      </TableCell>
      <TableCell>{legalForm}</TableCell>
      <TableCell>{nip}</TableCell>
      <TableCell>{city}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => handleEditChange(_id)}
        >
          {t("edit")}
        </Button>
      </TableCell>

      <TableCell>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => handleDelete(_id)}
        >
          {t("delete")}
        </Button>
      </TableCell>
    </TableRow>
  );
};

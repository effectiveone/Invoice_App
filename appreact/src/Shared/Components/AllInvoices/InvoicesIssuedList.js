import React from "react";
import { useModal } from "../../Hook/useModal";
import { useInvoiceContext } from "../../Context/useInvoiceContext";
import { useInvoiceTable } from "../../Hook/useInvoiceTable";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  TableSortLabel,
  TablePagination,
} from "@material-ui/core";
import InvoiceForm from "../NewInvoice/InvoiceForm";
import FilterWrapper from "../FilterWrapper";
import { InvoiceComponent } from "./invoiceComponent";
import { t } from "i18next";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: "80%",
    margin: "auto",
  },
}));

const InvoicesIssuedList = () => {
  const { open, handleOpen, handleClose } = useModal();
  const { invoiceDate, handleEditInvoice, setLocalInvoiceNumber } =
    useInvoiceContext();
  const {
    order,
    orderBy,
    page,
    rowsPerPage,
    handleChangePage,
    handleSortRequest,
    handleChangeRowsPerPage,
    handleFilterChange,
    sortedInvoices,
  } = useInvoiceTable({ invoiceDate: invoiceDate });
  const classes = useStyles();

  const changeInvoiceNumber = (inv) => {
    setLocalInvoiceNumber(inv);
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
              <TableCell>
                <TableSortLabel
                  active={orderBy === "number"}
                  direction={order}
                  onClick={() => handleSortRequest("number")}
                >
                  {t("numberInvoice")}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "issueDate"}
                  direction={order}
                  onClick={() => handleSortRequest("issueDate")}
                >
                  {t("issueDate")}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "customer"}
                  direction={order}
                  onClick={() => handleSortRequest("customer")}
                >
                  {t("customer")}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "netAmount"}
                  direction={order}
                  onClick={() => handleSortRequest("netAmount")}
                >
                  {t("netAmount")}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "grossAmount"}
                  direction={order}
                  onClick={() => handleSortRequest("grossAmount")}
                >
                  {t("grossAmount")}
                </TableSortLabel>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedInvoices &&
              Array.isArray(sortedInvoices) &&
              (rowsPerPage > 0
                ? sortedInvoices.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : sortedInvoices
              )?.map((invoice, index) => (
                <React.Fragment key={index}>
                  <InvoiceComponent
                    {...invoice}
                    handleOpen={handleOpen}
                    changeInvoiceNumber={changeInvoiceNumber}
                  />
                </React.Fragment>
              ))}
          </TableBody>
          {sortedInvoices.length > 10 && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={sortedInvoices.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose} className={classes.modal}>
        <div className={classes.paper}>
          <InvoiceForm />
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditInvoice}
          >
            {t("saveChanges")}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default InvoicesIssuedList;

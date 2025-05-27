import { TableCell, TableRow, Button } from "@material-ui/core";

export const InvoiceComponent = ({
  invoiceNumber,
  selectedKontrahent,
  totalNetValue,
  totalGrossValue,
  invoiceSaleDate,
  changeInvoiceNumber,
  handleOpen,
}) => {
  const { companyName } = selectedKontrahent;
  const handleClick = () => {
    changeInvoiceNumber(invoiceNumber);
    handleOpen();
  };
  return (
    <TableRow key={invoiceNumber}>
      <TableCell component="th" scope="row">
        {invoiceNumber}
      </TableCell>
      <TableCell>{invoiceSaleDate}</TableCell>
      <TableCell>{companyName}</TableCell>
      <TableCell>{totalNetValue}</TableCell>
      <TableCell>{totalGrossValue}</TableCell>
      <TableCell>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Edytuj
        </Button>
      </TableCell>
    </TableRow>
  );
};

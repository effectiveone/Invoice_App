import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Typography,
} from "@material-ui/core";
import { useInvoiceContext } from "../../../Context/useInvoiceContext";
import { makeStyles } from "@material-ui/core/styles";
import { t } from "i18next";

const useStyles = makeStyles({
  tableRowOdd: {
    background: "#F5F5F5",
  },
  name: {
    color: "#FFFFFF",
    fontSize: "1.6em",
    background: "#AAAAAA",
  },
  unit: {
    background: "#DDDDDD",
  },
  total: {
    background: "#57B223",
    color: "#FFFFFF",
  },
});
export default function InvoiceTable() {
  const { items, totalGrossValue } = useInvoiceContext();
  const classes = useStyles();

  return (
    <>
      <Grid container>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                <TableCell
                  className={classes.total}
                  colSpan={6}
                  style={{ width: "50%" }}
                >
                  <Typography variant="h6" component="h3">
                    {t("description")}
                  </Typography>
                </TableCell>
                <TableCell className={classes.unit} colSpan={1}>
                  <Typography variant="h6" component="h3">
                    {t("quantity")}
                  </Typography>
                </TableCell>
                <TableCell className={classes.name} colSpan={1}>
                  <Typography variant="h6" component="h3">
                    {t("unit")}
                  </Typography>
                </TableCell>
                <TableCell className={classes.unit} colSpan={1}>
                  <Typography variant="h6" component="h3">
                    VAT
                  </Typography>
                </TableCell>
                <TableCell className={classes.name}>
                  <Typography variant="h6" component="h3">
                    {t("netPrice")}
                  </Typography>
                </TableCell>
                <TableCell className={classes.unit}>
                  <Typography variant="h6" component="h3">
                    {t("netValue")}
                  </Typography>
                </TableCell>
                <TableCell className={classes.total}>
                  <Typography variant="h6" component="h3">
                    {t("grossValue")}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => {
                const {
                  name,
                  quantity,
                  unit,
                  vat,
                  netPrice,
                  netValue,
                  grossValue,
                } = item;

                return (
                  <TableRow key={index}>
                    <TableCell
                      className={classes.total}
                      colSpan={6}
                      style={{ width: "50%" }}
                    >
                      {name}
                    </TableCell>
                    <TableCell className={classes.unit}>{quantity}</TableCell>
                    <TableCell className={classes.name}>{unit}</TableCell>
                    <TableCell className={classes.unit}>{vat}</TableCell>
                    <TableCell className={classes.name}>{netPrice}</TableCell>
                    <TableCell className={classes.unit}>{netValue}</TableCell>
                    <TableCell className={classes.total}>
                      {grossValue}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <div style={{ textAlign: "end" }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: "bold", color: "#333333" }}
        >
          PLN. {totalGrossValue.toLocaleString()}
        </Typography>
      </div>
    </>
  );
}

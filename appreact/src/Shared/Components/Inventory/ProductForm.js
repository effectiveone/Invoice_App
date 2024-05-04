import React from "react";
import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import { useProductContext } from "../../Context/useProductContext";
import { t } from "i18next";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  submitButton: {
    margin: theme.spacing(2),
  },
}));

const ProductForm = () => {
  const classes = useStyles();
  const { handleChange, handleSubmit, product, errors } = useProductContext();

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label={t("nameProduct")}
            name="name"
            value={product.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label={t("productCode")}
            name="code"
            value={product.code}
            onChange={handleChange}
            error={!!errors.code}
            helperText={errors.code}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label={t("netPrice")}
            name="netPrice"
            value={product.netPrice}
            onChange={handleChange}
            error={!!errors.netPrice}
            helperText={errors.netPrice}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label={t("vat")}
            name="vat"
            value={product.vat}
            onChange={handleChange}
            error={!!errors.vat}
            helperText={errors.vat}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label={t("grossPrice")}
            name="grossPrice"
            value={product.grossPrice}
            onChange={handleChange}
            error={!!errors.grossPrice}
            helperText={errors.grossPrice}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label={t("currency")}
            name="currency"
            value={product.currency}
            onChange={handleChange}
            error={!!errors.currency}
            helperText={errors.currency}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label={t("description")}
            name="description"
            value={product.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label={t("tags")}
            name="tags"
            value={product.tags}
            onChange={handleChange}
            error={!!errors.tags}
            helperText={errors.tags}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label={t("avaibleQuantity")}
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            error={!!errors.quantity}
            helperText={errors.quantity}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl className={classes.formControl}>
            <InputLabel id="service-label">Usługa</InputLabel>
            <Select
              labelId={t("service-label")}
              name="service"
              value={product.service}
              onChange={handleChange}
              error={!!errors.service}
              fullWidth
              helperText={errors.service}
            >
              <MenuItem value="">-- wybierz --</MenuItem>
              <MenuItem value="true">Tak</MenuItem>
              <MenuItem value="false">Nie</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label={t("purchaseNetPrice")}
            name="purchaseNetPrice"
            value={product.purchaseNetPrice}
            onChange={handleChange}
            error={!!errors.purchaseNetPrice}
            helperText={errors.purchaseNetPrice}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label={t("purchaseVat")}
            name="purchaseVat"
            value={product.purchaseVat}
            onChange={handleChange}
            error={!!errors.purchaseVat}
            helperText={errors.purchaseVat}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label={t("purchaseGrossPrice")}
            name="purchaseGrossPrice"
            value={product.purchaseGrossPrice}
            onChange={handleChange}
            error={!!errors.purchaseGrossPrice}
            helperText={errors.purchaseGrossPrice}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label={t("unit")}
            name="unit"
            value={product.unit}
            onChange={handleChange}
            error={!!errors.unit}
            helperText={errors.unit}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label={t("defaultQuantity")}
            name="defaultQuantity"
            value={product.defaultQuantity}
            onChange={handleChange}
            error={!!errors.defaultQuantity}
            helperText={errors.defaultQuantity}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="PKWiU"
            name="pkwiu"
            value={product.pkwiu}
            onChange={handleChange}
            error={!!errors.pkwiu}
            helperText={errors.pkwiu}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label={t("supplierCode")}
            name="supplierCode"
            value={product.supplierCode}
            onChange={handleChange}
            error={!!errors.supplierCode}
            helperText={errors.supplierCode}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label={t("accountingCode")}
            name="accountingCode"
            value={product.accountingCode}
            onChange={handleChange}
            error={!!errors.accountingCode}
            helperText={errors.accountingCode}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;

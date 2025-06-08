import React from 'react';
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@mui/material';
import { Footer } from '../Common/Footer';

// import Dates from "./Dates";
import CompanyDetails from './CompanyDetails';
import InvoiceTable from './InvoiceTable';
// import Notes from "./Notes";
// import Footer from "./Footer";
import HeaderInvoice from './HeaderInvoice';
import { useInvoiceContext } from '../../../../../entities/invoice/model/useInvoiceContext';
import { t } from 'i18next';

const useStyles = makeStyles((theme) => ({
  invoiceContainer: {
    color: (props: any) => props.colors.primary,
    '& .MuiDivider-root': {
      borderColor: (props: any) => props.colors.primary + '40',
    },
  },
}));

const BasicInvoiceTemplate = ({
  colors = { primary: '#5D6975', secondary: '#0087C3' },
  customSettings = {},
  logo = null,
}) => {
  const classes = useStyles({ colors });
  const { componentRef, companyData, selectedKontrahent } = useInvoiceContext();

  return (
    <div ref={componentRef} className={`p-5 ${classes.invoiceContainer}`}>
      <HeaderInvoice colors={colors} logo={logo} />
      <Divider />
      {/* <Dates /> */}
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CompanyDetails
            title={t('seller')}
            companyName={companyData.companyName}
            legalForm={companyData.legalForm}
            zip={companyData.zipCode}
            city={companyData.city}
            street={companyData.street}
            nip={companyData.nip}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CompanyDetails
            title={t('buyer')}
            companyName={selectedKontrahent?.kontrahent_companyName}
            legalForm={selectedKontrahent?.kontrahent_legalForm}
            zip={selectedKontrahent?.kontrahent_zipCode}
            city={selectedKontrahent?.kontrahent_city}
            street={selectedKontrahent?.kontrahent_street}
            nip={selectedKontrahent?.kontrahent_nip}
          />
        </Grid>
      </Grid>
      <Divider />
      <InvoiceTable />
      <Footer />
    </div>
  );
};

export default BasicInvoiceTemplate;

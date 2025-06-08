import React from 'react';
import { Grid, Box } from '@material-ui/core';
import { Divider } from '@mui/material';
import { Footer } from '../Common/Footer';
import Dates from './Dates';
import CompanyDetails from './CompanyDetails';
import InvoiceTable from './InvoiceTable';

import { useInvoiceContext } from '../../../../../entities/invoice/model/useInvoiceContext';
import { makeStyles } from '@material-ui/core/styles';
import { t } from 'i18next';

interface MediumInvoiceTemplateProps {
  colors?: {
    primary: string;
    secondary: string;
  };
  logo?: {
    url: string;
  } | null;
}

const useStyles = makeStyles((theme) => ({
  logowrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',

    width: '50%',
    alignItems: 'center',
  },
  image: {
    width: '90px',
    height: '59px',
  },

  invoiceContainer: {
    display: 'flex',
    flexDirection: 'column',
    color: '#5D6975',
    fontSize: '0.8em',
  },
  invoice: {
    color: '#0087C3',
    fontSize: '2.4em',
    lineHeight: '1.4em',
    fontWeight: 'normal',
  },
  wrapperKontrahent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const MediumInvoiceTemplate: React.FC<MediumInvoiceTemplateProps> = ({
  colors = { primary: '#5D6975', secondary: '#0087C3' },
  logo = null,
}) => {
  const { componentRef, companyData, selectedKontrahent } = useInvoiceContext();
  const classes = useStyles();

  const logoToDisplay = companyData?.logo || logo?.url;

  return (
    <div ref={componentRef} className='p-5'>
      <Grid className={classes.logowrapper}>
        <Box className={classes.logo}>
          {logoToDisplay ? (
            <img
              src={logoToDisplay}
              alt='Logo firmy'
              className={classes.image}
            />
          ) : (
            <Box
              className={classes.image}
              style={{
                border: '1px dashed #ddd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                fontSize: '12px',
              }}
            >
              Brak logo
            </Box>
          )}
        </Box>

        <Box style={{ width: '50%', textAlign: 'right' }}>
          <CompanyDetails
            title=''
            companyName={companyData.companyName}
            legalForm={companyData.legalForm}
            zip={companyData.zipCode}
            city={companyData.city}
            street={companyData.street}
            nip={companyData.nip}
          />
        </Box>
      </Grid>
      <Divider />
      <Divider />
      {/* <Dates /> */}

      <Grid className={classes.wrapperKontrahent}>
        <Box style={{ width: '50%' }}>
          <CompanyDetails
            title={t('invoiceTo')}
            companyName={selectedKontrahent?.kontrahent_companyName}
            legalForm={selectedKontrahent?.kontrahent_legalForm}
            zip={selectedKontrahent?.kontrahent_zipCode}
            city={selectedKontrahent?.kontrahent_city}
            street={selectedKontrahent?.kontrahent_street}
            nip={selectedKontrahent?.kontrahent_nip}
          />
        </Box>
        <Box className={classes.invoiceContainer}>
          <h1 className={classes.invoice} style={{ color: colors.secondary }}>
            INVOICE 3-2-1
          </h1>
          <Dates />
        </Box>
      </Grid>
      <Divider />
      <InvoiceTable />
      {/* <Notes /> */}
      <Footer />
    </div>
  );
};

export default MediumInvoiceTemplate;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';
import { t } from 'i18next';
import { useInvoiceContext } from '../../../../../entities/invoice/model/useInvoiceContext';

const useStyles = makeStyles((theme) => ({
  header: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  logo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  image: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '90px',
    height: '59px',
  },

  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginRight: '10px',
    fontSize: '0.8em',
  },
  invoice: {
    width: '100%',
    fontSize: '2.4em',
    lineHeight: '1.4em',
    fontWeight: 'normal',
    textAlign: 'center',
    margin: '0 0 20px 0',
    background: `url(dimension.png)`,
  },
}));

const HeaderInvoice = ({
  colors = { primary: '#5D6975', secondary: '#0087C3' },
  logo,
}) => {
  const classes = useStyles();
  const { currentInvoiceNumber, companyData } = useInvoiceContext();

  // ✅ LOGIKA WARUNKOWA: Sprawdza logo z companyData, potem props, na końcu brak logo
  const logoToDisplay = companyData?.logo || logo?.url;

  return (
    <header className={classes.header}>
      <Grid>
        <Grid item xs={12}>
          <Box className={classes.logo}>
            {logoToDisplay ? (
              <img
                src={logoToDisplay}
                alt='Logo firmy'
                className={classes.image}
              />
            ) : (
              // ✅ USUNIĘTO prototypowe logo - teraz brak logo gdy nie ma
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
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.title}>
            <h1
              className={classes.invoice}
              style={{
                borderTop: `1px solid ${colors.primary}`,
                borderBottom: `1px solid ${colors.primary}`,
                color: colors.primary,
              }}
            >
              {t('invoice')} {currentInvoiceNumber}
            </h1>
          </Box>
        </Grid>
      </Grid>
    </header>
  );
};

export default HeaderInvoice;

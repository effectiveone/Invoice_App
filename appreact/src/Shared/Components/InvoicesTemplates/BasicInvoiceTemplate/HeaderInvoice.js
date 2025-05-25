import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';
import { t } from 'i18next';
import { useInvoiceContext } from '../../../Context/useInvoiceContext';

const useStyles = makeStyles((theme) => ({
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
  const { currentInvoiceNumber } = useInvoiceContext();

  return (
    <header className={classes.header}>
      <Grid>
        <Grid item xs={12}>
          <Box className={classes.logo}>
            {logo?.url ? (
              <img src={logo.url} alt='Logo firmy' className={classes.image} />
            ) : (
              <img src='logo512.png' alt='Logo' className={classes.image} />
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

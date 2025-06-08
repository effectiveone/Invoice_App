import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';

interface CompanyDetailsProps {
  title?: string;
  legalForm?: string;
  companyName?: string;
  zip?: string;
  city?: string;
  street?: string;
  nip?: string;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({
  title,
  legalForm,
  companyName,
  zip,
  city,
  street,
  nip,
}) => {
  const [state, setState] = useState<any>();
  useEffect(() => {
    if (companyName) {
      setState({
        companyName,
        legalForm,
        zip,
        city,
        street,
        nip,
      });
    }
  }, [companyName, legalForm, zip, city, street, nip]);
  return (
    <Grid
      container
      spacing={3}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {title && (
        <Grid item xs={12}>
          <Typography variant='h4' component='h2'>
            {title}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12} md={6}>
        <Typography
          variant='h6'
          component='h3'
          style={{
            display: 'grid',
            flexDirection: 'row',
          }}
        >
          {state?.companyName}
          {state?.legalForm}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant='h6' component='h3'>
          {`${state?.zip} ${state?.city}`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6' component='h3'>
          {state?.street}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6' component='h3'>
          {`NIP ${state?.nip}`}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CompanyDetails;

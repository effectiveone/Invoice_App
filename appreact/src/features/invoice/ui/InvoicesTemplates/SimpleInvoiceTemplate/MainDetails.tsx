import React from 'react';
import { Box, Typography } from '@material-ui/core';

export default function MainDetails({ name, address }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      }}
      component='section'
    >
      <Typography
        variant='h2'
        component='h2'
        style={{
          fontWeight: 'bold',
          textTransform: 'uppercase',
          fontSize: '2rem',
          marginBottom: '8px',
        }}
      >
        {name}
      </Typography>
      <Typography variant='body1' component='p'>
        {address}
      </Typography>
    </Box>
  );
}

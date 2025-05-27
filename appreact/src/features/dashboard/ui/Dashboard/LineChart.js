import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Grid, Typography, Card, CardContent, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#374151',
  marginBottom: '24px',
  fontSize: '24px',
}));

export const LineChart = ({ chartsToDisplay }) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ mb: 4 }}>
      <SectionTitle variant='h5'>{t('salesByYear')}</SectionTitle>
      <Grid container spacing={3}>
        {chartsToDisplay?.map((date) => (
          <Grid item xs={12} md={6} key={date.year}>
            <StyledCard>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant='h6'
                  sx={{
                    mb: 2,
                    fontWeight: '600',
                    color: '#374151',
                    textAlign: 'center',
                  }}
                >
                  {t('chartByYear')} {date.year}
                </Typography>
                <ReactApexChart
                  options={{
                    chart: {
                      type: 'pie',
                      toolbar: {
                        show: false,
                      },
                    },
                    labels: date.keys,
                    colors: [
                      '#667eea',
                      '#764ba2',
                      '#f093fb',
                      '#f5576c',
                      '#4facfe',
                      '#00f2fe',
                    ],
                    legend: {
                      position: 'bottom',
                      fontSize: '14px',
                    },
                    responsive: [
                      {
                        breakpoint: 480,
                        options: {
                          chart: {
                            width: 300,
                          },
                          legend: {
                            position: 'bottom',
                          },
                        },
                      },
                    ],
                    plotOptions: {
                      pie: {
                        donut: {
                          size: '45%',
                        },
                      },
                    },
                  }}
                  series={date.values}
                  type='donut'
                  height={350}
                />
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

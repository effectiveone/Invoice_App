import React from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/system';
import { Dashboard as DashboardIcon } from '@mui/icons-material';
import { TotalYearsChart } from './TotalYearsChart';
import { MontlyChart } from './MontlyChart';
import { useStatisticContext } from '../../model/useStatisticContext';
import { t } from 'i18next';
import JpkTable from './jpkTable';

const HeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '32px',
  padding: '24px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '16px',
  color: 'white',
}));

const LoadingCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
  textAlign: 'center',
  padding: '40px',
}));

const NoDataCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
  textAlign: 'center',
  padding: '40px',
}));

export const Dashboard = () => {
  const { years } = useStatisticContext();

  if (!years) {
    return (
      <Container maxWidth='lg'>
        <HeaderSection>
          <DashboardIcon sx={{ fontSize: 32, marginRight: 2 }} />
          <Box>
            <Typography
              variant='h4'
              sx={{ fontWeight: 'bold', marginBottom: 1 }}
            >
              Dashboard
            </Typography>
            <Typography variant='body1' sx={{ opacity: 0.9 }}>
              Analizy i statystyki twojego biznesu
            </Typography>
          </Box>
        </HeaderSection>

        <LoadingCard>
          <CardContent>
            <CircularProgress sx={{ mb: 2, color: '#667eea' }} />
            <Typography variant='h6' sx={{ color: '#374151' }}>
              Ładowanie danych...
            </Typography>
          </CardContent>
        </LoadingCard>
      </Container>
    );
  }

  return (
    <Container maxWidth='xl'>
      <HeaderSection>
        <DashboardIcon sx={{ fontSize: 32, marginRight: 2 }} />
        <Box>
          <Typography variant='h4' sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            Dashboard
          </Typography>
          <Typography variant='body1' sx={{ opacity: 0.9 }}>
            Analizy i statystyki twojego biznesu
          </Typography>
        </Box>
      </HeaderSection>

      {years?.length !== 0 ? (
        <Box>
          <TotalYearsChart />
          <MontlyChart />
          <JpkTable />
        </Box>
      ) : (
        <NoDataCard>
          <CardContent>
            <Typography
              variant='h5'
              sx={{ fontWeight: 'bold', color: '#374151', mb: 1 }}
            >
              Brak danych statystycznych
            </Typography>
            <Typography variant='body1' sx={{ color: '#6b7280' }}>
              {t('noStatisticDate')}
            </Typography>
          </CardContent>
        </NoDataCard>
      )}
    </Container>
  );
};

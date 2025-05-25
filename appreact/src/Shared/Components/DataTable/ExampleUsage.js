import React from 'react';
import { Box, Container, Typography, Tabs, Tab } from '@mui/material';
import {
  EnhancedInvoicesTable,
  EnhancedContrahentsTable,
  EnhancedInventoryTable,
} from './index';

// Example usage of the enhanced table components
const ExampleUsage = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Sample data - replace with your actual data
  const sampleInvoices = [
    {
      id: '1',
      invoiceNumber: 'FV/2024/001',
      invoiceSaleDate: '2024-01-15',
      selectedKontrahent: {
        companyName: 'ABC Company',
        nip: '1234567890',
      },
      totalNetValue: 1000.0,
      totalGrossValue: 1230.0,
      status: 'paid',
      dueDate: '2024-02-15',
    },
    {
      id: '2',
      invoiceNumber: 'FV/2024/002',
      invoiceSaleDate: '2024-01-20',
      selectedKontrahent: {
        companyName: 'XYZ Services',
        nip: '0987654321',
      },
      totalNetValue: 2500.0,
      totalGrossValue: 3075.0,
      status: 'sent',
      dueDate: '2024-02-20',
    },
  ];

  const sampleContrahents = [
    {
      id: '1',
      companyName: 'ABC Company Sp. z o.o.',
      legalForm: 'sp_z_oo',
      nip: '1234567890',
      city: 'Warszawa',
      postalCode: '00-001',
      email: 'contact@abc.com',
      phone: '+48 123 456 789',
      type: 'company',
    },
    {
      id: '2',
      companyName: 'Jan Kowalski',
      legalForm: 'osoba_fizyczna',
      nip: '9876543210',
      city: 'Kraków',
      postalCode: '30-001',
      email: 'jan@kowalski.pl',
      phone: '+48 987 654 321',
      type: 'individual',
    },
  ];

  const sampleProducts = [
    {
      id: '1',
      name: 'Laptop Dell XPS 13',
      sku: 'DELL-XPS-13',
      category: 'goods',
      netPrice: 4500.0,
      vat: 23,
      quantity: 5,
      unit: 'szt',
      minStock: 2,
      description: 'Nowoczesny laptop biznesowy',
    },
    {
      id: '2',
      name: 'Konsultacje IT',
      sku: 'CONS-IT-001',
      category: 'services',
      netPrice: 250.0,
      vat: 23,
      quantity: 0,
      unit: 'godz',
      unlimited: true,
      description: 'Profesjonalne doradztwo technologiczne',
    },
  ];

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Container maxWidth='xl'>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h3' gutterBottom fontWeight='bold'>
          Zaawansowane tabele danych
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Przykład użycia nowych komponentów z wzorcem Render Props i
          Domain-Driven Design
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label='Faktury' />
          <Tab label='Kontrahenci' />
          <Tab label='Magazyn' />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <EnhancedInvoicesTable invoices={sampleInvoices} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <EnhancedContrahentsTable contrahents={sampleContrahents} />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <EnhancedInventoryTable products={sampleProducts} />
      </TabPanel>
    </Container>
  );
};

export default ExampleUsage;

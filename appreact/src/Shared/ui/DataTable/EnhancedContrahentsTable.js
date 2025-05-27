import React, { useState } from 'react';
import {
  Typography,
  Chip,
  Box,
  Modal,
  Button,
  Stack,
  Avatar,
  Card,
  CardContent,
} from '@mui/material';
import {
  Business as BusinessIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import DataTableProvider from './DataTableProvider';
import EnhancedContrahentForm from './EnhancedContrahentForm';
import { useKontrahent } from '../../lib/useKontrahent';
import { useModal } from '../../lib/useModal';

// Domain Model for Contrahent Types
const ContrahentType = {
  INDIVIDUAL: 'individual',
  COMPANY: 'company',
  GOVERNMENT: 'government',
  NON_PROFIT: 'non_profit',
};

const getContrahentTypeColor = (type) => {
  switch (type) {
    case ContrahentType.INDIVIDUAL:
      return 'primary';
    case ContrahentType.COMPANY:
      return 'success';
    case ContrahentType.GOVERNMENT:
      return 'warning';
    case ContrahentType.NON_PROFIT:
      return 'info';
    default:
      return 'default';
  }
};

const getContrahentTypeLabel = (type, t) => {
  switch (type) {
    case ContrahentType.INDIVIDUAL:
      return t('contractorIndividual', 'Osoba fizyczna');
    case ContrahentType.COMPANY:
      return t('contractorCompany', 'Firma');
    case ContrahentType.GOVERNMENT:
      return t('contractorGovernment', 'Instytucja');
    case ContrahentType.NON_PROFIT:
      return t('contractorNonProfit', 'Organizacja');
    default:
      return t('unknown');
  }
};

// Legal Form mapping
const getLegalFormLabel = (value, t) => {
  const legalFormLabels = {
    sp_z_oo: 'Sp. z o.o.',
    sa: 'S.A.',
    jednoosobowa: t('contractorSole', 'Jednoosobowa'),
    spolka_jawna: t('contractorPartnership', 'Spółka jawna'),
    spolka_komandytowa: t('contractorLimited', 'Sp. komandytowa'),
    osoba_fizyczna: t('contractorIndividual', 'Osoba fizyczna'),
    fundacja: t('contractorFoundation', 'Fundacja'),
    stowarzyszenie: t('contractorAssociation', 'Stowarzyszenie'),
  };
  return legalFormLabels[value] || value || t('unknown');
};

// Styled Modal Content
const ModalContent = ({ children, onClose, title }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflow: 'auto',
        borderRadius: '16px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography variant='h5' sx={{ mb: 3, fontWeight: 'bold' }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
};

// Enhanced Contrahents Table Component
const EnhancedContrahentsTable = ({ contrahents = [] }) => {
  const { t } = useTranslation();
  const { open, handleOpen, handleClose } = useModal();
  const {
    handleEdit: handleEditContrahent,
    handleDelete: handleDeleteContrahent,
    handleSubmit,
  } = useKontrahent();
  const [selectedContrahent, setSelectedContrahent] = useState(null);
  const [actionType, setActionType] = useState(null);

  // Define table columns with enhanced functionality
  const columns = [
    {
      key: 'avatar',
      label: '',
      sortable: false,
      filterable: false,
      render: (value, row) => (
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          {row.type === ContrahentType.INDIVIDUAL ? (
            <PersonIcon />
          ) : (
            <BusinessIcon />
          )}
        </Avatar>
      ),
    },
    {
      key: 'companyName',
      label: t('contractorName'),
      sortable: true,
      filterable: true,
      render: (value, row) => (
        <Box>
          <Typography variant='body2' fontWeight='600'>
            {value || t('noData')}
          </Typography>
          {row.contactPerson && (
            <Typography variant='caption' color='text.secondary'>
              {t('contact', 'Kontakt')}: {row.contactPerson}
            </Typography>
          )}
        </Box>
      ),
    },
    {
      key: 'legalForm',
      label: t('contractorLegalForm'),
      sortable: true,
      filterable: true,
      render: (value) => (
        <Chip
          label={getLegalFormLabel(value, t)}
          size='small'
          variant='outlined'
          color='primary'
        />
      ),
    },
    {
      key: 'nip',
      label: t('contractorNip'),
      sortable: true,
      filterable: true,
      render: (value) => (
        <Typography variant='body2' fontFamily='monospace' fontWeight='500'>
          {value
            ? value.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1-$2-$3-$4')
            : '-'}
        </Typography>
      ),
    },
    {
      key: 'location',
      label: t('contractorAddress'),
      sortable: true,
      filterable: true,
      render: (value, row) => (
        <Box>
          <Typography variant='body2'>{row.city || t('noData')}</Typography>
          {row.postalCode && (
            <Typography variant='caption' color='text.secondary'>
              {row.postalCode}
            </Typography>
          )}
        </Box>
      ),
    },
    {
      key: 'contact',
      label: t('contact', 'Kontakt'),
      sortable: false,
      filterable: false,
      render: (value, row) => (
        <Stack spacing={0.5}>
          {row.email && (
            <Typography variant='caption' display='flex' alignItems='center'>
              <EmailIcon fontSize='small' sx={{ mr: 0.5 }} />
              {row.email}
            </Typography>
          )}
          {row.phone && (
            <Typography variant='caption' display='flex' alignItems='center'>
              <PhoneIcon fontSize='small' sx={{ mr: 0.5 }} />
              {row.phone}
            </Typography>
          )}
        </Stack>
      ),
    },
    {
      key: 'type',
      label: 'Typ',
      sortable: true,
      filterable: true,
      render: (value) => (
        <Chip
          label={getContrahentTypeLabel(value || ContrahentType.COMPANY, t)}
          color={getContrahentTypeColor(value || ContrahentType.COMPANY)}
          size='small'
          variant='filled'
        />
      ),
    },
  ];

  // Enhanced data processing
  const processedContrahents = (
    contrahents && Array.isArray(contrahents) ? contrahents : []
  ).map((contrahent) => ({
    ...contrahent,
    id: contrahent._id || contrahent.id || Math.random().toString(36),
    type: contrahent.type || determineContrahentType(contrahent),
    location: `${contrahent.city || ''} ${contrahent.postalCode || ''}`.trim(),
  }));

  // Helper function to determine contrahent type
  function determineContrahentType(contrahent) {
    if (contrahent.legalForm === 'osoba_fizyczna') {
      return ContrahentType.INDIVIDUAL;
    }
    if (
      contrahent.legalForm === 'fundacja' ||
      contrahent.legalForm === 'stowarzyszenie'
    ) {
      return ContrahentType.NON_PROFIT;
    }
    return ContrahentType.COMPANY;
  }

  // Event handlers
  const handleAddContrahent = () => {
    setActionType('add');
    setSelectedContrahent(null);
    handleOpen();
  };

  const handleEditContrahentAction = (contrahent) => {
    setActionType('edit');
    setSelectedContrahent(contrahent);
    handleOpen();
  };

  const handleViewContrahent = (contrahent) => {
    setActionType('view');
    setSelectedContrahent(contrahent);
    handleOpen();
  };

  const handleDeleteContrahentAction = (contrahent) => {
    if (
      window.confirm(
        `Czy na pewno chcesz usunąć kontrahenta ${contrahent.companyName}?`,
      )
    ) {
      handleDeleteContrahent(contrahent._id);
    }
  };

  const handleFormSubmit = (formData) => {
    if (actionType === 'edit' && selectedContrahent) {
      handleEditContrahent(selectedContrahent._id, formData);
    } else {
      handleSubmit(formData);
    }
    handleClose();
  };

  const handleExportContrahents = (data) => {
    // Implement export logic here
    const csv = generateCSV(data);
    downloadCSV(csv, 'kontrahenci.csv');
  };

  const generateCSV = (data) => {
    const headers = [
      'Nazwa firmy',
      'NIP',
      'Forma prawna',
      'Miasto',
      'Email',
      'Telefon',
    ];
    const rows = data.map((item) => [
      item.companyName || '',
      item.nip || '',
      getLegalFormLabel(item.legalForm, t),
      item.city || '',
      item.email || '',
      item.phone || '',
    ]);

    return [headers, ...rows].map((row) => row.join(',')).join('\n');
  };

  const downloadCSV = (csv, filename) => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <DataTableProvider
        data={processedContrahents}
        columns={columns}
        title='Kontrahenci'
        icon={<BusinessIcon />}
        onAdd={handleAddContrahent}
        onEdit={handleEditContrahentAction}
        onView={handleViewContrahent}
        onDelete={handleDeleteContrahentAction}
        onExport={handleExportContrahents}
        actions={['view', 'edit', 'delete']}
        initialRowsPerPage={20}
      />

      {/* Enhanced Modal */}
      <Modal open={open} onClose={handleClose}>
        <ModalContent
          onClose={handleClose}
          title={
            actionType === 'add'
              ? 'Nowy kontrahent'
              : actionType === 'edit'
              ? `Edytuj kontrahenta ${selectedContrahent?.companyName}`
              : `Kontrahent ${selectedContrahent?.companyName}`
          }
        >
          {actionType === 'view' && selectedContrahent ? (
            <Box>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Stack direction='row' spacing={3} alignItems='flex-start'>
                    <Avatar
                      sx={{
                        bgcolor: getContrahentTypeColor(
                          selectedContrahent.type,
                        ),
                        width: 80,
                        height: 80,
                      }}
                    >
                      {selectedContrahent.type === ContrahentType.INDIVIDUAL ? (
                        <PersonIcon fontSize='large' />
                      ) : (
                        <BusinessIcon fontSize='large' />
                      )}
                    </Avatar>

                    <Box flex={1}>
                      <Typography variant='h6' gutterBottom>
                        {selectedContrahent.companyName}
                      </Typography>

                      <Stack spacing={1}>
                        <Box>
                          <Typography
                            variant='subtitle2'
                            color='text.secondary'
                          >
                            Forma prawna
                          </Typography>
                          <Chip
                            label={getLegalFormLabel(
                              selectedContrahent.legalForm,
                              t,
                            )}
                            size='small'
                            color='primary'
                          />
                        </Box>

                        <Box>
                          <Typography
                            variant='subtitle2'
                            color='text.secondary'
                          >
                            NIP
                          </Typography>
                          <Typography variant='body1' fontFamily='monospace'>
                            {selectedContrahent.nip}
                          </Typography>
                        </Box>

                        {selectedContrahent.city && (
                          <Box>
                            <Typography
                              variant='subtitle2'
                              color='text.secondary'
                            >
                              Adres
                            </Typography>
                            <Typography
                              variant='body1'
                              display='flex'
                              alignItems='center'
                            >
                              <LocationIcon fontSize='small' sx={{ mr: 1 }} />
                              {selectedContrahent.address &&
                                `${selectedContrahent.address}, `}
                              {selectedContrahent.city}
                              {selectedContrahent.postalCode &&
                                `, ${selectedContrahent.postalCode}`}
                            </Typography>
                          </Box>
                        )}

                        {(selectedContrahent.email ||
                          selectedContrahent.phone) && (
                          <Box>
                            <Typography
                              variant='subtitle2'
                              color='text.secondary'
                            >
                              Kontakt
                            </Typography>
                            <Stack spacing={0.5}>
                              {selectedContrahent.email && (
                                <Typography
                                  variant='body2'
                                  display='flex'
                                  alignItems='center'
                                >
                                  <EmailIcon fontSize='small' sx={{ mr: 1 }} />
                                  {selectedContrahent.email}
                                </Typography>
                              )}
                              {selectedContrahent.phone && (
                                <Typography
                                  variant='body2'
                                  display='flex'
                                  alignItems='center'
                                >
                                  <PhoneIcon fontSize='small' sx={{ mr: 1 }} />
                                  {selectedContrahent.phone}
                                </Typography>
                              )}
                            </Stack>
                          </Box>
                        )}
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant='outlined' onClick={handleClose}>
                  Zamknij
                </Button>
              </Box>
            </Box>
          ) : (
            <EnhancedContrahentForm
              initialData={selectedContrahent}
              onSubmit={handleFormSubmit}
              onCancel={handleClose}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EnhancedContrahentsTable;

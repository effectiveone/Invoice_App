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
  LinearProgress,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  AllInclusive as UnlimitedIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import DataTableProvider from './DataTableProvider';
import EnhancedProductForm from './EnhancedProductForm';
import { useProductContext } from '../../Context/useProductContext';
import { useModal } from '../../Hook/useModal';
import { t } from 'i18next';

// Domain Model for Product Categories
const ProductCategory = {
  GOODS: 'goods',
  SERVICES: 'services',
  MATERIALS: 'materials',
  DIGITAL: 'digital',
  OTHER: 'other',
};

const getCategoryColor = (category) => {
  switch (category) {
    case ProductCategory.GOODS:
      return 'primary';
    case ProductCategory.SERVICES:
      return 'success';
    case ProductCategory.MATERIALS:
      return 'warning';
    case ProductCategory.DIGITAL:
      return 'info';
    case ProductCategory.OTHER:
      return 'default';
    default:
      return 'default';
  }
};

const getCategoryLabel = (category) => {
  switch (category) {
    case ProductCategory.GOODS:
      return 'Towary';
    case ProductCategory.SERVICES:
      return 'Usługi';
    case ProductCategory.MATERIALS:
      return 'Materiały';
    case ProductCategory.DIGITAL:
      return 'Produkty cyfrowe';
    case ProductCategory.OTHER:
      return 'Inne';
    default:
      return 'Nieokreślone';
  }
};

// Product Stock Status
const StockStatus = {
  IN_STOCK: 'in_stock',
  LOW_STOCK: 'low_stock',
  OUT_OF_STOCK: 'out_of_stock',
  UNLIMITED: 'unlimited',
};

const getStockStatusColor = (status) => {
  switch (status) {
    case StockStatus.IN_STOCK:
      return 'success';
    case StockStatus.LOW_STOCK:
      return 'warning';
    case StockStatus.OUT_OF_STOCK:
      return 'error';
    case StockStatus.UNLIMITED:
      return 'info';
    default:
      return 'default';
  }
};

const getStockStatusLabel = (status) => {
  switch (status) {
    case StockStatus.IN_STOCK:
      return 'Na stanie';
    case StockStatus.LOW_STOCK:
      return 'Niski stan';
    case StockStatus.OUT_OF_STOCK:
      return 'Brak na stanie';
    case StockStatus.UNLIMITED:
      return 'Nieograniczony';
    default:
      return 'Nieznany';
  }
};

const getStockStatusIcon = (status) => {
  switch (status) {
    case StockStatus.IN_STOCK:
      return <CheckCircleIcon />;
    case StockStatus.LOW_STOCK:
      return <WarningIcon />;
    case StockStatus.OUT_OF_STOCK:
      return <ErrorIcon />;
    case StockStatus.UNLIMITED:
      return <TrendingUpIcon />;
    default:
      return null;
  }
};

// VAT rates mapping
const vatRates = {
  0: '0%',
  5: '5%',
  8: '8%',
  23: '23%',
};

// Unit types mapping
const unitTypes = {
  szt: 'sztuki',
  kg: 'kilogramy',
  l: 'litry',
  m: 'metry',
  m2: 'metry kwadratowe',
  m3: 'metry sześcienne',
  godz: 'godziny',
  dni: 'dni',
  usł: 'usługi',
};

// Styled Modal Content
const ModalContent = ({ children, onClose, title }) => (
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxWidth: '900px',
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

// Enhanced Inventory Table Component
const EnhancedInventoryTable = ({ products = [] }) => {
  const { open, handleOpen, handleClose } = useModal();
  const {
    handleEdit: handleEditProduct,
    handleDelete: handleDeleteProduct,
    setButtonText,
  } = useProductContext();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [actionType, setActionType] = useState(null);

  // Define table columns with enhanced functionality
  const columns = [
    {
      key: 'productAvatar',
      label: '',
      sortable: false,
      filterable: false,
      render: (value, row) => (
        <Avatar
          sx={{
            bgcolor: getCategoryColor(row.category),
            width: 48,
            height: 48,
          }}
        >
          <CategoryIcon />
        </Avatar>
      ),
    },
    {
      key: 'name',
      label: 'Nazwa produktu',
      sortable: true,
      filterable: true,
      render: (value, row) => (
        <Box>
          <Typography variant='body2' fontWeight='600'>
            {value || 'Brak nazwy'}
          </Typography>
          {row.sku && (
            <Typography variant='caption' color='text.secondary'>
              SKU: {row.sku}
            </Typography>
          )}
          {row.category && (
            <Box sx={{ mt: 0.5 }}>
              <Chip
                label={getCategoryLabel(row.category)}
                size='small'
                color={getCategoryColor(row.category)}
                variant='outlined'
              />
            </Box>
          )}
        </Box>
      ),
    },
    {
      key: 'pricing',
      label: 'Cena',
      sortable: true,
      filterable: false,
      render: (value, row) => (
        <Box>
          <Typography variant='body2' fontWeight='600' color='primary.main'>
            {row.netPrice ? `${Number(row.netPrice).toFixed(2)} zł` : '0.00 zł'}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            netto
          </Typography>
          {row.vat && (
            <Typography
              variant='caption'
              display='block'
              color='text.secondary'
            >
              VAT: {vatRates[row.vat] || `${row.vat}%`}
            </Typography>
          )}
        </Box>
      ),
    },
    {
      key: 'stock',
      label: 'Stan magazynowy',
      sortable: true,
      filterable: false,
      render: (value, row) => {
        const stockStatus = determineStockStatus(row);
        const stockPercentage = calculateStockPercentage(row);

        return (
          <Box sx={{ minWidth: 120 }}>
            <Stack
              direction='row'
              spacing={1}
              alignItems='center'
              sx={{ mb: 1 }}
            >
              <Tooltip title={getStockStatusLabel(stockStatus)}>
                <Box sx={{ color: `${getStockStatusColor(stockStatus)}.main` }}>
                  {getStockStatusIcon(stockStatus)}
                </Box>
              </Tooltip>
              <Typography variant='body2' fontWeight='500'>
                {row.quantity || 0} {unitTypes[row.unit] || row.unit || 'szt'}
              </Typography>
            </Stack>

            {stockStatus !== StockStatus.UNLIMITED && row.minStock && (
              <Box>
                <LinearProgress
                  variant='determinate'
                  value={stockPercentage}
                  color={getStockStatusColor(stockStatus)}
                  sx={{ height: 6, borderRadius: 3 }}
                />
                <Typography variant='caption' color='text.secondary'>
                  Min: {row.minStock}
                </Typography>
              </Box>
            )}

            <Chip
              label={getStockStatusLabel(stockStatus)}
              size='small'
              color={getStockStatusColor(stockStatus)}
              variant='filled'
              sx={{ mt: 0.5 }}
            />
          </Box>
        );
      },
    },
    {
      key: 'unit',
      label: 'Jednostka',
      sortable: true,
      filterable: true,
      render: (value) => (
        <Typography variant='body2'>
          {unitTypes[value] || value || 'szt'}
        </Typography>
      ),
    },
    {
      key: 'lastUpdated',
      label: 'Ostatnia aktualizacja',
      sortable: true,
      filterable: false,
      render: (value, row) => {
        const date = value
          ? new Date(value)
          : new Date(row.createdAt || Date.now());
        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        return (
          <Box>
            <Typography variant='body2'>
              {date.toLocaleDateString('pl-PL')}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {diffDays === 0
                ? 'Dzisiaj'
                : diffDays === 1
                ? 'Wczoraj'
                : `${diffDays} dni temu`}
            </Typography>
          </Box>
        );
      },
    },
  ];

  // Enhanced data processing
  const processedProducts = products.map((product) => ({
    ...product,
    id: product._id || product.id || Math.random().toString(36),
    category: product.category || ProductCategory.OTHER,
    stockStatus: determineStockStatus(product),
    grossPrice: calculateGrossPrice(product.netPrice, product.vat),
    lastUpdated: product.lastUpdated || product.updatedAt || product.createdAt,
  }));

  // Helper functions
  function determineStockStatus(product) {
    if (product.unlimited || product.type === 'service') {
      return StockStatus.UNLIMITED;
    }

    const quantity = product.quantity || 0;
    const minStock = product.minStock || 10;

    if (quantity === 0) {
      return StockStatus.OUT_OF_STOCK;
    } else if (quantity <= minStock) {
      return StockStatus.LOW_STOCK;
    } else {
      return StockStatus.IN_STOCK;
    }
  }

  function calculateStockPercentage(product) {
    if (!product.minStock || product.unlimited) return 100;

    const quantity = product.quantity || 0;
    const minStock = product.minStock;
    const maxStock = product.maxStock || minStock * 3;

    return Math.min(100, (quantity / maxStock) * 100);
  }

  function calculateGrossPrice(netPrice, vat) {
    if (!netPrice || !vat) return 0;
    return netPrice * (1 + vat / 100);
  }

  // Event handlers
  const handleAddProduct = () => {
    setActionType('add');
    setSelectedProduct(null);
    handleOpen();
  };

  const handleEditProductAction = (product) => {
    setActionType('edit');
    setSelectedProduct(product);
    handleEditProduct(product._id);
    setButtonText('Zapisz zmiany');
    handleOpen();
  };

  const handleViewProduct = (product) => {
    setActionType('view');
    setSelectedProduct(product);
    handleOpen();
  };

  const handleDeleteProductAction = (product) => {
    if (window.confirm(`Czy na pewno chcesz usunąć produkt ${product.name}?`)) {
      handleDeleteProduct(product._id);
    }
  };

  const handleExportProducts = (data) => {
    const csv = generateProductCSV(data);
    downloadCSV(csv, 'produkty.csv');
  };

  const generateProductCSV = (data) => {
    const headers = [
      'Nazwa',
      'SKU',
      'Kategoria',
      'Cena netto',
      'VAT',
      'Cena brutto',
      'Ilość',
      'Jednostka',
      'Min. stan',
      'Status',
    ];
    const rows = data.map((item) => [
      item.name || '',
      item.sku || '',
      getCategoryLabel(item.category),
      item.netPrice || '',
      vatRates[item.vat] || `${item.vat}%` || '',
      item.grossPrice ? item.grossPrice.toFixed(2) : '',
      item.quantity || '',
      unitTypes[item.unit] || item.unit || '',
      item.minStock || '',
      getStockStatusLabel(item.stockStatus),
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

  // Product Form Component
  const ProductForm = ({ initialData, onSubmit, onCancel }) => (
    <EnhancedProductForm
      initialData={initialData}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );

  return (
    <>
      <DataTableProvider
        data={processedProducts}
        columns={columns}
        title='Magazyn produktów'
        icon={<InventoryIcon />}
        onAdd={handleAddProduct}
        onEdit={handleEditProductAction}
        onView={handleViewProduct}
        onDelete={handleDeleteProductAction}
        onExport={handleExportProducts}
        actions={['view', 'edit', 'delete']}
        initialRowsPerPage={15}
      />

      {/* Enhanced Modal */}
      <Modal open={open} onClose={handleClose}>
        <ModalContent
          onClose={handleClose}
          title={
            actionType === 'add'
              ? 'Nowy produkt'
              : actionType === 'edit'
              ? `Edytuj produkt ${selectedProduct?.name}`
              : `Produkt ${selectedProduct?.name}`
          }
        >
          {actionType === 'view' && selectedProduct ? (
            <Box>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Stack direction='row' spacing={3} alignItems='flex-start'>
                    <Avatar
                      sx={{
                        bgcolor: getCategoryColor(selectedProduct.category),
                        width: 80,
                        height: 80,
                      }}
                    >
                      <CategoryIcon fontSize='large' />
                    </Avatar>

                    <Box flex={1}>
                      <Typography variant='h6' gutterBottom>
                        {selectedProduct.name}
                      </Typography>

                      <Stack spacing={2}>
                        <Box>
                          <Typography
                            variant='subtitle2'
                            color='text.secondary'
                          >
                            Kategoria
                          </Typography>
                          <Chip
                            label={getCategoryLabel(selectedProduct.category)}
                            color={getCategoryColor(selectedProduct.category)}
                            size='small'
                          />
                        </Box>

                        <Stack direction='row' spacing={4}>
                          <Box>
                            <Typography
                              variant='subtitle2'
                              color='text.secondary'
                            >
                              Cena netto
                            </Typography>
                            <Typography variant='h6' color='primary.main'>
                              {selectedProduct.netPrice
                                ? `${Number(selectedProduct.netPrice).toFixed(
                                    2,
                                  )} zł`
                                : '0.00 zł'}
                            </Typography>
                          </Box>

                          <Box>
                            <Typography
                              variant='subtitle2'
                              color='text.secondary'
                            >
                              VAT
                            </Typography>
                            <Typography variant='body1'>
                              {vatRates[selectedProduct.vat] ||
                                `${selectedProduct.vat}%` ||
                                '0%'}
                            </Typography>
                          </Box>

                          <Box>
                            <Typography
                              variant='subtitle2'
                              color='text.secondary'
                            >
                              Cena brutto
                            </Typography>
                            <Typography variant='h6'>
                              {selectedProduct.grossPrice
                                ? `${selectedProduct.grossPrice.toFixed(2)} zł`
                                : '0.00 zł'}
                            </Typography>
                          </Box>
                        </Stack>

                        <Box>
                          <Typography
                            variant='subtitle2'
                            color='text.secondary'
                          >
                            Stan magazynowy
                          </Typography>
                          <Stack
                            direction='row'
                            spacing={2}
                            alignItems='center'
                          >
                            <Typography variant='h6'>
                              {selectedProduct.quantity || 0}{' '}
                              {unitTypes[selectedProduct.unit] ||
                                selectedProduct.unit ||
                                'szt'}
                            </Typography>
                            <Chip
                              icon={getStockStatusIcon(
                                selectedProduct.stockStatus,
                              )}
                              label={getStockStatusLabel(
                                selectedProduct.stockStatus,
                              )}
                              color={getStockStatusColor(
                                selectedProduct.stockStatus,
                              )}
                              size='small'
                            />
                          </Stack>

                          {selectedProduct.minStock && (
                            <Typography
                              variant='caption'
                              color='text.secondary'
                            >
                              Minimalny stan: {selectedProduct.minStock}
                            </Typography>
                          )}
                        </Box>

                        {selectedProduct.description && (
                          <Box>
                            <Typography
                              variant='subtitle2'
                              color='text.secondary'
                            >
                              Opis
                            </Typography>
                            <Typography variant='body2'>
                              {selectedProduct.description}
                            </Typography>
                          </Box>
                        )}
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          ) : (
            <ProductForm
              initialData={selectedProduct}
              onSubmit={(updatedProduct) => {
                // Implement save logic here
                handleEditProduct(updatedProduct._id, updatedProduct);
                handleClose();
              }}
              onCancel={handleClose}
            />
          )}

          <Stack
            direction='row'
            spacing={2}
            sx={{ mt: 3, justifyContent: 'flex-end' }}
          >
            <Button variant='outlined' onClick={handleClose}>
              {actionType === 'view' ? 'Zamknij' : 'Anuluj'}
            </Button>
            {actionType !== 'view' && (
              <Button
                variant='contained'
                onClick={() => {
                  // Implement save logic here
                  handleClose();
                }}
              >
                {actionType === 'add' ? 'Dodaj produkt' : 'Zapisz zmiany'}
              </Button>
            )}
          </Stack>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EnhancedInventoryTable;

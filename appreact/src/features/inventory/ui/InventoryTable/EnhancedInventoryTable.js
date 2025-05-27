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
} from '@mui/material';
import {
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import {
  DataTableProvider,
  EnhancedProductForm,
} from '../../../../shared/ui/DataTable';
import { useDispatch } from 'react-redux';
import { useUser } from '../../../../shared/lib/useUser';
import { useModal } from '../../../../shared/lib/useModal';
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../../../app/store/Actions/productActions';

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

const getCategoryLabel = (category, t) => {
  switch (category) {
    case ProductCategory.GOODS:
      return t('categoryGoods', 'Towary');
    case ProductCategory.SERVICES:
      return t('categoryServices', 'Usługi');
    case ProductCategory.MATERIALS:
      return t('categoryMaterials', 'Materiały');
    case ProductCategory.DIGITAL:
      return t('categoryDigital', 'Produkty cyfrowe');
    case ProductCategory.OTHER:
      return t('categoryOther', 'Inne');
    default:
      return t('categoryUndefined', 'Nieokreślone');
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

const getStockStatusLabel = (status, t) => {
  switch (status) {
    case StockStatus.IN_STOCK:
      return t('inStock');
    case StockStatus.LOW_STOCK:
      return t('lowStock');
    case StockStatus.OUT_OF_STOCK:
      return t('outOfStock');
    case StockStatus.UNLIMITED:
      return t('stockUnlimited', 'Nieograniczony');
    default:
      return t('unknown');
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
const getVatRateLabel = (rate) => {
  const vatRates = {
    0: '0%',
    5: '5%',
    8: '8%',
    23: '23%',
  };
  return vatRates[rate] || `${rate}%`;
};

// Unit types mapping
const getUnitTypeLabel = (unit, t) => {
  const unitTypes = {
    szt: t('unitPieces', 'sztuki'),
    kg: t('unitKilograms', 'kilogramy'),
    l: t('unitLiters', 'litry'),
    m: t('unitMeters', 'metry'),
    m2: t('unitSquareMeters', 'metry kwadratowe'),
    m3: t('unitCubicMeters', 'metry sześcienne'),
    godz: t('unitHours', 'godziny'),
    dni: t('unitDays', 'dni'),
    usł: t('unitServices', 'usługi'),
  };
  return unitTypes[unit] || unit;
};

// Styled Modal Content
const ModalContent = ({ children, onClose, title }) => {
  return (
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
};

// Enhanced Inventory Table Component
const EnhancedInventoryTable = ({ products = [] }) => {
  const { t } = useTranslation();
  const { open, handleOpen, handleClose } = useModal();
  const dispatch = useDispatch();
  const { currentUser } = useUser();
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
          <InventoryIcon />
        </Avatar>
      ),
    },
    {
      key: 'name',
      label: t('productName'),
      sortable: true,
      filterable: true,
      render: (value, row) => (
        <Box>
          <Typography variant='body2' fontWeight='600'>
            {value || t('noData')}
          </Typography>
          {row.code && (
            <Typography variant='caption' color='text.secondary'>
              {t('productCode')}: {row.code}
            </Typography>
          )}
        </Box>
      ),
    },
    {
      key: 'category',
      label: t('productCategory'),
      sortable: true,
      filterable: true,
      render: (value) => (
        <Chip
          label={getCategoryLabel(value, t)}
          size='small'
          variant='outlined'
          color={getCategoryColor(value)}
          icon={<CategoryIcon />}
        />
      ),
    },
    {
      key: 'netPrice',
      label: t('productNetPrice'),
      sortable: true,
      filterable: false,
      render: (value, row) => (
        <Box>
          <Typography variant='body2' fontWeight='600'>
            {value ? `${Number(value).toFixed(2)} PLN` : '0.00 PLN'}
          </Typography>
          {row.vat && (
            <Typography variant='caption' color='text.secondary'>
              VAT: {getVatRateLabel(row.vat)}
            </Typography>
          )}
        </Box>
      ),
    },
    {
      key: 'grossPrice',
      label: t('productGrossPrice'),
      sortable: true,
      filterable: false,
      render: (value, row) => (
        <Typography variant='body2' fontWeight='600' color='primary.main'>
          {value
            ? `${Number(value).toFixed(2)} PLN`
            : row.netPrice
            ? `${calculateGrossPrice(row.netPrice, row.vat).toFixed(2)} PLN`
            : '0.00 PLN'}
        </Typography>
      ),
    },
    {
      key: 'quantity',
      label: t('productStock'),
      sortable: true,
      filterable: false,
      render: (value, row) => {
        const stockStatus = determineStockStatus(row);
        const stockPercentage = calculateStockPercentage(row);

        return (
          <Box>
            <Box display='flex' alignItems='center' gap={1}>
              <Tooltip title={getStockStatusLabel(stockStatus, t)}>
                <Box sx={{ color: `${getStockStatusColor(stockStatus)}.main` }}>
                  {getStockStatusIcon(stockStatus)}
                </Box>
              </Tooltip>
              <Typography variant='body2' fontWeight='500'>
                {value || 0} {getUnitTypeLabel(row.unit, t)}
              </Typography>
            </Box>
            {stockStatus !== StockStatus.UNLIMITED && (
              <LinearProgress
                variant='determinate'
                value={stockPercentage}
                color={getStockStatusColor(stockStatus)}
                sx={{ mt: 0.5, height: 4, borderRadius: 2 }}
              />
            )}
          </Box>
        );
      },
    },
    {
      key: 'unit',
      label: t('productUnit'),
      sortable: true,
      filterable: true,
      render: (value) => (
        <Chip
          label={getUnitTypeLabel(value, t)}
          size='small'
          variant='outlined'
        />
      ),
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
    handleOpen();
  };

  const handleViewProduct = (product) => {
    setActionType('view');
    setSelectedProduct(product);
    handleOpen();
  };

  const handleDeleteProductAction = (product) => {
    if (window.confirm(`Czy na pewno chcesz usunąć produkt ${product.name}?`)) {
      dispatch(deleteProduct(product._id || product.id, currentUser));
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
      getCategoryLabel(item.category, t),
      item.netPrice || '',
      getVatRateLabel(item.vat) || '',
      item.grossPrice ? item.grossPrice.toFixed(2) : '',
      item.quantity || '',
      getUnitTypeLabel(item.unit, t) || item.unit || '',
      item.minStock || '',
      getStockStatusLabel(item.stockStatus, t),
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

  const handleFormSubmit = (formData) => {
    if (actionType === 'add') {
      dispatch(createProduct(formData, currentUser));
    } else if (actionType === 'edit' && selectedProduct) {
      dispatch(
        updateProduct(
          formData,
          selectedProduct._id || selectedProduct.id,
          currentUser,
        ),
      );
    }
    handleClose();
  };

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
                            label={getCategoryLabel(
                              selectedProduct.category,
                              t,
                            )}
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
                              {getVatRateLabel(selectedProduct.vat)}
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
                              {getUnitTypeLabel(selectedProduct.unit, t)}
                            </Typography>
                            <Chip
                              icon={getStockStatusIcon(
                                selectedProduct.stockStatus,
                              )}
                              label={getStockStatusLabel(
                                selectedProduct.stockStatus,
                                t,
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
              onSubmit={handleFormSubmit}
              onCancel={handleClose}
            />
          )}

          {actionType === 'view' && (
            <Stack
              direction='row'
              spacing={2}
              sx={{ mt: 3, justifyContent: 'flex-end' }}
            >
              <Button variant='outlined' onClick={handleClose}>
                Zamknij
              </Button>
            </Stack>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EnhancedInventoryTable;

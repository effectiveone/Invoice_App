import React, { useState, useCallback, useMemo } from 'react';
import { styled } from '@mui/system';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TablePagination,
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  Button,
  IconButton,
  Tooltip,
  Card,
  CardContent,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  GetApp as ExportIcon,
} from '@mui/icons-material';

// Styled Components
const HeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '24px',
  padding: '24px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '16px',
  color: 'white',
}));

const HeaderContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const HeaderActions = styled(Box)({
  display: 'flex',
  gap: '12px',
});

const FilterSection = styled(Card)(({ theme }) => ({
  marginBottom: '24px',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
  overflow: 'hidden',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: '600',
  color: '#374151',
  borderBottom: '1px solid #e5e7eb',
  padding: '16px',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    background: 'rgba(102, 126, 234, 0.05)',
  },
  '&:nth-of-type(even)': {
    background: 'rgba(248, 250, 252, 0.5)',
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  borderRadius: '8px',
  padding: '8px',
  '&:hover': {
    background: 'rgba(102, 126, 234, 0.1)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '12px',
  padding: '12px 24px',
  fontWeight: '600',
  textTransform: 'none',
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  '&:hover': {
    background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
  },
}));

// Domain-Driven Design: Data Table Service
class DataTableService {
  static filterData(data, filters) {
    if (!filters || Object.keys(filters).length === 0) return data;

    return data.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;

        const itemValue = this.getNestedValue(item, key);
        if (typeof itemValue === 'string') {
          return itemValue.toLowerCase().includes(value.toLowerCase());
        }
        return String(itemValue).includes(value);
      });
    });
  }

  static sortData(data, orderBy, order) {
    if (!orderBy) return data;

    return [...data].sort((a, b) => {
      const aValue = this.getNestedValue(a, orderBy);
      const bValue = this.getNestedValue(b, orderBy);

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }

  static getNestedValue(obj, path) {
    return path.split('.').reduce((value, key) => value?.[key], obj);
  }

  static paginateData(data, page, rowsPerPage) {
    if (rowsPerPage <= 0) return data;
    const startIndex = page * rowsPerPage;
    return data.slice(startIndex, startIndex + rowsPerPage);
  }
}

// Render Props Component
const DataTableProvider = ({
  data = [],
  columns = [],
  title,
  icon,
  onAdd,
  onEdit,
  onDelete,
  onView,
  onExport,
  children,
  initialRowsPerPage = 10,
  searchable = true,
  filterable = true,
  sortable = true,
  paginated = true,
  actions = ['view', 'edit', 'delete'],
}) => {
  // State Management
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [showFilters, setShowFilters] = useState(false);

  // Handlers
  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  }, []);

  const handleFilterChange = useCallback((filterKey, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
    setPage(0);
  }, []);

  const handleSortRequest = useCallback(
    (property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    },
    [order, orderBy],
  );

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({});
    setSearchTerm('');
    setPage(0);
  }, []);

  // Data Processing
  const processedData = useMemo(() => {
    let result = [...data];

    // Apply search
    if (searchTerm && searchable) {
      result = result.filter((item) =>
        columns.some((column) => {
          const value = DataTableService.getNestedValue(item, column.key);
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        }),
      );
    }

    // Apply filters
    result = DataTableService.filterData(result, filters);

    // Apply sorting
    if (sortable) {
      result = DataTableService.sortData(result, orderBy, order);
    }

    return result;
  }, [
    data,
    searchTerm,
    filters,
    orderBy,
    order,
    columns,
    searchable,
    sortable,
  ]);

  const paginatedData = useMemo(() => {
    return paginated
      ? DataTableService.paginateData(processedData, page, rowsPerPage)
      : processedData;
  }, [processedData, page, rowsPerPage, paginated]);

  // Active filters count
  const activeFiltersCount =
    Object.values(filters).filter(Boolean).length + (searchTerm ? 1 : 0);

  // Render Props Data
  const tableState = {
    data: paginatedData,
    totalCount: processedData.length,
    searchTerm,
    filters,
    order,
    orderBy,
    page,
    rowsPerPage,
    showFilters,
    activeFiltersCount,
    processedData,
  };

  const tableActions = {
    handleSearchChange,
    handleFilterChange,
    handleSortRequest,
    handleChangePage,
    handleChangeRowsPerPage,
    handleClearFilters,
    setShowFilters,
  };

  const defaultRender = () => (
    <Container maxWidth='xl'>
      {/* Header */}
      <HeaderSection>
        <HeaderContent>
          {icon && <Box sx={{ fontSize: 32, marginRight: 2 }}>{icon}</Box>}
          <Box>
            <Typography
              variant='h4'
              sx={{ fontWeight: 'bold', marginBottom: 1 }}
            >
              {title}
            </Typography>
            <Typography variant='body1' sx={{ opacity: 0.9 }}>
              Zarządzaj danymi z zaawansowanymi opcjami
            </Typography>
          </Box>
        </HeaderContent>
        <HeaderActions>
          {onExport && (
            <Tooltip title='Eksportuj'>
              <ActionButton
                onClick={() => onExport(processedData)}
                sx={{ color: 'white' }}
              >
                <ExportIcon />
              </ActionButton>
            </Tooltip>
          )}
          {onAdd && (
            <StyledButton
              startIcon={<AddIcon />}
              onClick={onAdd}
              sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              Dodaj nowy
            </StyledButton>
          )}
        </HeaderActions>
      </HeaderSection>

      {/* Search and Filters */}
      {(searchable || filterable) && (
        <FilterSection>
          <CardContent>
            <Stack direction='row' spacing={2} alignItems='center'>
              {searchable && (
                <TextField
                  placeholder='Szukaj...'
                  value={searchTerm}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ minWidth: 300 }}
                />
              )}

              {filterable && (
                <>
                  <Button
                    startIcon={<FilterListIcon />}
                    onClick={() => setShowFilters(!showFilters)}
                    variant={showFilters ? 'contained' : 'outlined'}
                  >
                    Filtry {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                  </Button>

                  {activeFiltersCount > 0 && (
                    <Button
                      onClick={handleClearFilters}
                      size='small'
                      variant='text'
                    >
                      Wyczyść
                    </Button>
                  )}
                </>
              )}
            </Stack>

            {/* Filter Chips */}
            {activeFiltersCount > 0 && (
              <Box sx={{ mt: 2 }}>
                <Stack direction='row' spacing={1} flexWrap='wrap'>
                  {searchTerm && (
                    <Chip
                      label={`Szukaj: ${searchTerm}`}
                      onDelete={() => setSearchTerm('')}
                      size='small'
                    />
                  )}
                  {Object.entries(filters).map(
                    ([key, value]) =>
                      value && (
                        <Chip
                          key={key}
                          label={`${key}: ${value}`}
                          onDelete={() => handleFilterChange(key, '')}
                          size='small'
                        />
                      ),
                  )}
                </Stack>
              </Box>
            )}

            {/* Advanced Filters */}
            {showFilters && filterable && (
              <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #e5e7eb' }}>
                <Stack direction='row' spacing={2} flexWrap='wrap'>
                  {columns
                    .filter((col) => col.filterable !== false)
                    .map((column) => (
                      <TextField
                        key={column.key}
                        label={column.label}
                        value={filters[column.key] || ''}
                        onChange={(e) =>
                          handleFilterChange(column.key, e.target.value)
                        }
                        size='small'
                        sx={{ minWidth: 200 }}
                      />
                    ))}
                </Stack>
              </Box>
            )}
          </CardContent>
        </FilterSection>
      )}

      {/* Table */}
      <StyledTableContainer component={Paper}>
        <Table>
          <StyledTableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell key={column.key}>
                  {sortable && column.sortable !== false ? (
                    <TableSortLabel
                      active={orderBy === column.key}
                      direction={orderBy === column.key ? order : 'asc'}
                      onClick={() => handleSortRequest(column.key)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </StyledTableCell>
              ))}
              {actions.length > 0 && (
                <StyledTableCell align='center'>Akcje</StyledTableCell>
              )}
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <StyledTableRow key={row.id || index}>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.render
                      ? column.render(
                          DataTableService.getNestedValue(row, column.key),
                          row,
                        )
                      : DataTableService.getNestedValue(row, column.key)}
                  </TableCell>
                ))}
                {actions.length > 0 && (
                  <TableCell align='center'>
                    <Stack direction='row' spacing={1} justifyContent='center'>
                      {actions.includes('view') && onView && (
                        <Tooltip title='Zobacz'>
                          <ActionButton onClick={() => onView(row)}>
                            <ViewIcon fontSize='small' />
                          </ActionButton>
                        </Tooltip>
                      )}
                      {actions.includes('edit') && onEdit && (
                        <Tooltip title='Edytuj'>
                          <ActionButton onClick={() => onEdit(row)}>
                            <EditIcon fontSize='small' />
                          </ActionButton>
                        </Tooltip>
                      )}
                      {actions.includes('delete') && onDelete && (
                        <Tooltip title='Usuń'>
                          <ActionButton onClick={() => onDelete(row)}>
                            <DeleteIcon fontSize='small' color='error' />
                          </ActionButton>
                        </Tooltip>
                      )}
                    </Stack>
                  </TableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>

        {paginated && processedData.length > rowsPerPage && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component='div'
            count={processedData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ borderTop: '1px solid #e5e7eb' }}
          />
        )}
      </StyledTableContainer>
    </Container>
  );

  return children ? children(tableState, tableActions) : defaultRender();
};

export default DataTableProvider;

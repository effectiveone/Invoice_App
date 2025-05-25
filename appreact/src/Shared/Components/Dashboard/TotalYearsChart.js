import React from 'react';
import { useStatisticContext } from '../../Context/useStatisticContext';
import { LineChart } from './LineChart';
import { Pagination, Box } from '@mui/material';
import { styled } from '@mui/system';
import { usePagination } from '../../Hook/usePagination';

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '24px',
}));

const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    borderRadius: '12px',
    '&.Mui-selected': {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
    },
  },
}));

export const TotalYearsChart = () => {
  const { dataForYears } = useStatisticContext();
  const { currentPage, startIndex, endIndex, pageSize, handleChangePage } =
    usePagination(2);

  const chartsToDisplay = dataForYears
    ?.slice()
    .reverse()
    .slice(startIndex, endIndex);

  return (
    <Box sx={{ mb: 4 }}>
      <LineChart chartsToDisplay={chartsToDisplay} />
      {dataForYears?.length > pageSize && (
        <PaginationContainer>
          <StyledPagination
            count={Math.ceil(dataForYears?.length / pageSize)}
            page={currentPage}
            onChange={handleChangePage}
            color='primary'
            size='large'
          />
        </PaginationContainer>
      )}
    </Box>
  );
};

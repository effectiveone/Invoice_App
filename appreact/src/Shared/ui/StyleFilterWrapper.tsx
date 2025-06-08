import React from 'react';
import { styled } from '@material-ui/core/styles';
import FilterWrapper from './FilterWrapper';

const StyledFilterWrapper = styled(FilterWrapper)(({ theme }) => ({
  '& .MuiTextField-root': {
    marginBottom: theme.spacing(2),
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.spacing(1),
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
    },
  },
}));

const StyleFilterWrapper = (props) => {
  return <StyledFilterWrapper {...props} />;
};

export default StyleFilterWrapper;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useProductContext } from '../../../../entities/product/model/useProductContext';
import { Button } from '@material-ui/core';

const InventoryButton = () => {
  const { handleModal } = useProductContext();
  const { t } = useTranslation();

  return (
    <>
      <Button
        variant='contained'
        color='primary'
        onClick={handleModal}
        data-testid='inventory-button'
      >
        {t('addProduct')}
      </Button>
    </>
  );
};

export default InventoryButton;

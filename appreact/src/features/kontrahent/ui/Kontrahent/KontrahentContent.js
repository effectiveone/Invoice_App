import ContrahentModal from './ContrahentModal';
import ContrahentTable from './ContrahentTable';
import { useKontrahentContext } from '../../Context/useKontrahentContext';
import { Button, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const KontrahentContent = () => {
  const { handleModal } = useKontrahentContext();
  const { t } = useTranslation();

  return (
    <>
      <Box>
        <Button variant='contained' color='primary' onClick={handleModal}>
          {t('addCustomer')}
        </Button>
        <ContrahentModal />
        <ContrahentTable />
      </Box>
    </>
  );
};

export default KontrahentContent;

import React from 'react';
import { Button, Box, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useKontrahentContext } from '../../../../entities/kontrahent/model/useKontrahentContext';
import CompanyForm from '../../../company/ui/Company/companyForm';
import { t } from 'i18next';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: '80%',
    margin: 'auto',
  },
  gridFlex: {
    display: 'flex',
    flexDirection: 'row',
    gap: '150px',
    marginLeft: '50px',
    paddingBottom: '50px',
  },
  boxFlex: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    justifyContent: 'space-between',
  },
  buttonBox: {
    marginTop: theme.spacing(3),
  },
  cancelButton: {
    marginLeft: theme.spacing(2),
  },
}));

function ContrahentModal() {
  const classes = useStyles();
  const { button, open, handleClose, updatedCompanyData, handleChange } =
    useKontrahentContext();
  return (
    <>
      <Modal open={open} onClose={handleClose} className={classes.modal}>
        <div className={classes.paper}>
          <CompanyForm
            whichInputs={'kontrahent' as any}
            updatedCompanyData={updatedCompanyData}
            handleChange={handleChange}
          />
          <Box className={classes.buttonBox}>
            {button}
            <Button className={classes.cancelButton} onClick={handleClose}>
              {t('cancel')}
            </Button>
          </Box>
        </div>
      </Modal>
    </>
  );
}

export default ContrahentModal;

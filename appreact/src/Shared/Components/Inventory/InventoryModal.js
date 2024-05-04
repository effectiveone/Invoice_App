import React from "react";
import { Button, Box, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useProductContext } from "../../Context/useProductContext";
import ProductForm from "./ProductForm";
import { t } from "i18next";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: "80%",
    margin: "auto",
  },
  gridFlex: {
    display: "flex",
    flexDirection: "row",
    gap: "150px",
    marginLeft: "50px",
    paddingBottom: "50px",
  },
  boxFlex: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    justifyContent: "space-between",
  },
}));
const InvenotryModal = () => {
  const classes = useStyles();
  const { button, open, handleClose } = useProductContext();
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        data-testid="inventory-modal"
      >
        <div className={classes.paper}>
          <ProductForm />
          <Box sx={{ mt: 3 }}>
            {button}
            <Button sx={{ ml: 2 }} onClick={handleClose}>
              {t("cancel")}
            </Button>
          </Box>
        </div>
      </Modal>
    </>
  );
};

export default InvenotryModal;

import React from "react";
import { t } from "i18next";
import { useProductContext } from "../../Context/useProductContext";
import { Button } from "@material-ui/core";

const InventoryButton = () => {
  const { handleModal } = useProductContext();

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleModal}
        data-testid="inventory-button"
      >
        {t("addProduct")}
      </Button>
    </>
  );
};

export default InventoryButton;

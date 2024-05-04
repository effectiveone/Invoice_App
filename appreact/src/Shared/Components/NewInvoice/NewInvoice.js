import React, { useState } from "react";
import { Button } from "@mui/material";
import FactoryInvoicePrinter from "../InvoicesTemplates/factoryInvoicePrinter";
import { useInvoiceContext } from "../../Context/useInvoiceContext";
import ReactToPrint from "react-to-print";
import InvoiceForm from "./InvoiceForm";
import { t } from "i18next";

const NewInvoice = () => {
  const { componentRef, handleSubmit } = useInvoiceContext();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <>
      <Button onClick={toggleVisibility}>{t("preview")}</Button>
      {isVisible && (
        <ReactToPrint
          trigger={() => <Button>{t("printOrDownload")}</Button>}
          content={() => componentRef.current}
        />
      )}
      <Button onClick={handleSubmit}>{t("saveInvoice")}</Button>

      {!isVisible && <InvoiceForm />}
      {isVisible && <FactoryInvoicePrinter />}
    </>
  );
};

export default NewInvoice;

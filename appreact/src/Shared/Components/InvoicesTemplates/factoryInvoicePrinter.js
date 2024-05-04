import BasicInvoiceTemplate from "./BasicInvoiceTemplate";
import MediumInvoiceTemplate from "./MediumInvoiceTemplate";
import SimpleInvoiceTemplate from "./SimpleInvoiceTemplate";
import { useSelector } from "react-redux";

const FactoryInvoicePrinter = () => {
  const selectedOption = useSelector(
    (state) => state?.settings.settings?.templateInvoice
  );

  switch (selectedOption) {
    case "basicInput":
      return <BasicInvoiceTemplate />;
    case "mediumInput":
      return <MediumInvoiceTemplate />;
    case "printerInput":
      return <SimpleInvoiceTemplate />;
    default:
      return <SimpleInvoiceTemplate />;
  }
};

export default FactoryInvoicePrinter;

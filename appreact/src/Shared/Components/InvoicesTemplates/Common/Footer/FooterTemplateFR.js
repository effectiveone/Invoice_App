import React from "react";
import { Box } from "@material-ui/core";
import { ToWords } from "to-words";
import { useInvoiceContext } from "../../../../Context/useInvoiceContext";

const options = {
  localeCode: "fr-FR",
  case: "sentence",
  currency: false,
};

export default function FooterTemplateFR() {
  const { totalGrossValue } = useInvoiceContext();
  const toWords = new ToWords(options);
  return <Box>{toWords.convert(totalGrossValue)}</Box>;
}

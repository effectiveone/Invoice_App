import React from "react";
import { Box } from "@material-ui/core";
import { useInvoiceContext } from "../../../../Context/useInvoiceContext";
import { liczbySlownie } from "../../../../Utils/liczbyslownie";

export default function FooterTemplatePL() {
  const { totalGrossValue } = useInvoiceContext();
  return <Box>{liczbySlownie(totalGrossValue)}</Box>;
}

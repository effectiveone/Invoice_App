import React from 'react';
import { Box } from '@material-ui/core';
import { useInvoiceContext } from '../../../../../../entities/invoice/model/useInvoiceContext';
import { liczbySlownie } from '../../../../../../shared/utils/liczbyslownie';

export default function FooterTemplatePL() {
  const { totalGrossValue } = useInvoiceContext();
  return <Box>{liczbySlownie(totalGrossValue)}</Box>;
}

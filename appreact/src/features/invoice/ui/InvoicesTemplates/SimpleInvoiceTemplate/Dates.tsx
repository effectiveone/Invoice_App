import { useInvoiceContext } from '../../../../../entities/invoice/model/useInvoiceContext';
import { useTranslation } from 'react-i18next';

export default function Dates() {
  const { invoicePaymentDate, invoiceDates, invoiceSaleDate } =
    useInvoiceContext();
  const { t } = useTranslation();

  return (
    <>
      <article className='mt-10 mb-14 flex items-end justify-end'>
        <ul>
          <li className='p-1 '>
            <span className='font-bold'> {t('invoicePaymentDate')}"</span>
            {invoicePaymentDate}
          </li>
          <li className='p-1 bg-gray-100'>
            <span className='font-bold'>{t('invoiceDates')}:</span>{' '}
            {invoiceDates}
          </li>
          <li className='p-1 '>
            <span className='font-bold'>{t('invoiceSaleDate')}:</span>{' '}
            {invoiceSaleDate}
          </li>
        </ul>
      </article>
    </>
  );
}

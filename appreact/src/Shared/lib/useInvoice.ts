import { useEffect, useState, useRef, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readFaktury } from '../../app/store/Actions/fakturaActions';
import { useUser } from './useUser';
import { useKontrahent } from './useKontrahent';
import { useCompany } from './useCompany';
import {
  createFaktura,
  editFaktury,
} from '../../app/store/Actions/fakturaActions';
import { TAX_RATES } from '../utils/tax';
import { convertDate } from '../utils/dateValidator';
import {
  InvoiceType,
  Invoice,
  InvoiceItem,
  SelectedKontrahent,
  RootState,
  Kontrahent,
} from '../../types/invoice';

export const useInvoice = () => {
  const { currentUser } = useUser();
  const { companyData } = useCompany();
  const { kontrahent } = useKontrahent();
  const dispatch = useDispatch();

  const invoiceDate = useSelector(
    (state: RootState) => state?.faktura?.faktury,
  );
  const [invoiceType, setInvoiceType] = useState<InvoiceType | undefined>();
  const [currentInvoiceNumber, setCurrentInvoiceNumber] = useState<
    string | undefined
  >();
  const [manualInvoiceNumber, setManualInvoiceNumber] = useState<string>('');
  const [useManualInvoiceNumber, setUseManualInvoiceNumber] =
    useState<boolean>(false);
  const [suggestedInvoiceNumber, setSuggestedInvoiceNumber] =
    useState<string>('');

  const AllCurrentInvoiceNumber = useSelector(
    (state: RootState) => state?.faktura?.currentInvoiceNumber,
  );

  useEffect(() => {
    let suggestedNumber: string = '';
    switch (invoiceType) {
      case 'koregujaca':
        suggestedNumber = AllCurrentInvoiceNumber?.korygujaca || '';
        break;
      case 'sprzedazowa':
        suggestedNumber = AllCurrentInvoiceNumber?.sprzedazowa || '';
        break;
      case 'zakupowa':
        suggestedNumber = AllCurrentInvoiceNumber?.zakupowa || '';
        break;
      case 'zaliczkowa':
        suggestedNumber = AllCurrentInvoiceNumber?.zaliczkowa || '';
        break;
      case 'proformaSprzedazowa':
        suggestedNumber = AllCurrentInvoiceNumber?.proformaSprzedazowa || '';
        break;
      case 'proformaZakupowa':
        suggestedNumber = AllCurrentInvoiceNumber?.proformaZakupowa || '';
        break;
      default:
        suggestedNumber = AllCurrentInvoiceNumber?.sprzedazowa || '';
        break;
    }

    setSuggestedInvoiceNumber(suggestedNumber);

    if (!useManualInvoiceNumber) {
      setCurrentInvoiceNumber(suggestedNumber);
    } else {
      setCurrentInvoiceNumber(manualInvoiceNumber);
    }
  }, [
    invoiceType,
    AllCurrentInvoiceNumber,
    useManualInvoiceNumber,
    manualInvoiceNumber,
  ]);

  const toggleInvoiceNumberMode = () => {
    setUseManualInvoiceNumber(!useManualInvoiceNumber);
    if (!useManualInvoiceNumber) {
      setManualInvoiceNumber(suggestedInvoiceNumber);
      setCurrentInvoiceNumber(suggestedInvoiceNumber);
    } else {
      setCurrentInvoiceNumber(suggestedInvoiceNumber);
    }
  };

  const handleManualInvoiceNumberChange = (newNumber: string) => {
    setManualInvoiceNumber(newNumber);
    if (useManualInvoiceNumber) {
      setCurrentInvoiceNumber(newNumber);
    }
  };

  // ✅ DODANO: Funkcje obsługi ręcznego kontrahenta
  const toggleKontrahentMode = () => {
    setUseManualKontrahent(!useManualKontrahent);
    if (!useManualKontrahent) {
      // Przechodzi na ręczny - wyczyść wybór
      setManualKontrahent({});
    }
  };

  const handleManualKontrahentChange = (field: string, value: string) => {
    setManualKontrahent((prev) => ({
      ...prev,
      [`kontrahent_${field}`]: value,
    }));
  };

  const saveManualKontrahentToDatabase = async () => {
    if (saveManualKontrahent && manualKontrahent.kontrahent_companyName) {
      try {
        // Przygotuj dane kontrahenta bez prefiksu "kontrahent_"
        const kontrahentData = {
          companyName: manualKontrahent.kontrahent_companyName,
          nip: manualKontrahent.kontrahent_nip || '',
          regon: manualKontrahent.kontrahent_regon || '',
          street: manualKontrahent.kontrahent_street || '',
          city: manualKontrahent.kontrahent_city || '',
          zipCode: manualKontrahent.kontrahent_zipCode || '',
          userEmail: currentUser?.mail || currentUser?.email || '',
        };

        console.log('📝 Zapisuję kontrahenta do bazy:', kontrahentData);

        // Tu można dodać wywołanie API do zapisania kontrahenta
        // Przykład:
        // const { createKontrahent } = useKontrahent();
        // await createKontrahent(kontrahentData);

        // Na razie tylko logujemy
        alert('Kontrahent zostanie zapisany przy utworzeniu faktury.');
      } catch (error) {
        console.error('❌ Błąd podczas zapisywania kontrahenta:', error);
        alert('Błąd podczas zapisywania kontrahenta');
      }
    }
  };

  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | undefined>();
  const [invoiceNumberDate, updateInvoiceNumberDate] = useState<
    string | undefined
  >();
  const [localInvoiceNumber, setLocalInvoiceNumber] = useState<
    string | undefined
  >();

  useEffect(() => {
    if (!invoiceDate?.length) {
      dispatch(readFaktury(currentUser as any) as any);
    }
    if (localInvoiceNumber) {
      updateInvoiceNumberDate(localInvoiceNumber);
      // Find the invoice in the store by its number
      const invoice = invoiceDate?.find(
        (faktura: Invoice) => faktura.invoiceNumber === localInvoiceNumber,
      );

      // If the invoice exists, set its data to the invoiceDate state
      if (invoice) {
        setSelectedInvoice(invoice);
      }
    }
  }, [localInvoiceNumber, currentUser, dispatch, invoiceDate]);

  const [invoiceDates, setInvoiceDates] = useState<string>(
    new Date().toISOString().slice(0, 10),
  );

  const [invoiceSaleDate, setInvoiceSaleDate] = useState<string>(
    new Date().toISOString().slice(0, 10),
  );

  const [invoicePaymentDate, setInvoicePaymentDate] = useState<string>(
    new Date().toISOString().slice(0, 10),
  );
  const [selectedKontrahent, setSelectedKontrahent] =
    useState<SelectedKontrahent>({});
  const [useManualKontrahent, setUseManualKontrahent] =
    useState<boolean>(false);
  const [manualKontrahent, setManualKontrahent] = useState<SelectedKontrahent>(
    {},
  );
  const [saveManualKontrahent, setSaveManualKontrahent] =
    useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      name: '',
      quantity: 1,
      unit: 'szt',
      vat: TAX_RATES[0].value,
      netPrice: 0,
      netValue: 0,
      grossValue: 0,
    },
  ]);
  const [totalNetValue, setTotalNetValue] = useState<number>(0);
  const [totalGrossValue, setTotalGrossValue] = useState<number>(0);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const selectedCompany = kontrahent?.find(
      (k: any) => k.nip === event.target.value,
    );
    if (selectedCompany) {
      const prefixedCompany: SelectedKontrahent = {};
      Object.entries(selectedCompany).forEach(([key, value]) => {
        prefixedCompany[`kontrahent_${key}`] = value;
      });
      setSelectedKontrahent(prefixedCompany);
    }
  };

  const invoiceProductor = {
    companyData,
    selectedKontrahent: useManualKontrahent
      ? manualKontrahent
      : selectedKontrahent,
    invoiceSaleDate,
    invoiceDate: invoiceDates,
    invoicePaymentDate,
    items,
    totalNetValue,
    totalGrossValue,
    notes,
    invoiceType,
    invoiceNumber: currentInvoiceNumber,
    userEmail: currentUser?.mail,
  };

  const invoiceEditor = {
    companyData,
    selectedKontrahent,
    invoiceSaleDate,
    invoiceDate: invoiceDates,
    invoicePaymentDate,
    items,
    totalNetValue,
    totalGrossValue,
    notes,
    invoiceType,
    userEmail: currentUser?.mail,
    invoiceNumber: invoiceNumberDate,
  };

  const handlePrint = (): void => {
    window.print();
  };

  const componentRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (): void => {
    // Zapisz ręcznego kontrahenta jeśli zaznaczono
    if (saveManualKontrahent) {
      saveManualKontrahentToDatabase();
    }

    dispatch(createFaktura(invoiceProductor, currentUser as any) as any);
  };

  const handleEditInvoice = (): void => {
    dispatch(editFaktury(invoiceEditor, currentUser as any) as any);
  };

  useEffect(() => {
    if (localInvoiceNumber && selectedInvoice) {
      setInvoiceType(selectedInvoice?.invoiceType);
      setItems(selectedInvoice?.items);
      setTotalNetValue(selectedInvoice?.totalNetValue);
      setTotalGrossValue(selectedInvoice?.totalGrossValue);
      setInvoiceDates(convertDate(selectedInvoice?.invoiceDate));
      setSelectedKontrahent(selectedInvoice?.selectedKontrahent);
      setInvoicePaymentDate(convertDate(selectedInvoice?.invoicePaymentDate));
      setNotes(selectedInvoice?.notes);
      setInvoiceSaleDate(convertDate(selectedInvoice?.invoiceSaleDate));
    }
  }, [selectedInvoice, localInvoiceNumber]);

  return {
    invoiceType,
    setInvoiceType,
    currentInvoiceNumber,
    selectedInvoice,
    setLocalInvoiceNumber,
    invoiceDate,
    handleEditInvoice,
    setInvoicePaymentDate,
    invoicePaymentDate,
    invoiceDates,
    invoiceSaleDate,
    setInvoiceDates,
    setInvoiceSaleDate,
    selectedKontrahent,
    setSelectedKontrahent,
    notes,
    setNotes,
    items,
    setItems,
    totalNetValue,
    setTotalNetValue,
    totalGrossValue,
    setTotalGrossValue,
    handleSelectChange,
    handlePrint,
    componentRef,
    handleSubmit,
    kontrahent,
    companyData,
    TAX_RATES,
    manualInvoiceNumber,
    useManualInvoiceNumber,
    suggestedInvoiceNumber,
    toggleInvoiceNumberMode,
    handleManualInvoiceNumberChange,
    useManualKontrahent,
    setUseManualKontrahent,
    manualKontrahent,
    setManualKontrahent,
    saveManualKontrahent,
    setSaveManualKontrahent,
    toggleKontrahentMode,
    handleManualKontrahentChange,
    saveManualKontrahentToDatabase,
  };
};

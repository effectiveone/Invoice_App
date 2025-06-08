import { useState, useEffect } from 'react';
import {
  createProduct,
  readProducts,
  updateProduct,
  deleteProduct,
} from '../../app/store/Actions/productActions';

import { useDispatch, useSelector } from 'react-redux';
import { useUser } from './useUser';
import { useModal } from './useModal';
import useSubmitButton from './useSubmitButton';
import * as yup from 'yup';
import { t } from 'i18next';
import { RootState } from '../../types/common';

export const useProduct = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.auth?.userDetails);
  const products = useSelector((state: any) => state.products?.products);
  const { open, handleOpen, handleClose } = useModal();

  console.log('📦 useProduct - currentUser:', currentUser);
  console.log(
    '📦 useProduct - userEmail:',
    currentUser?.mail || currentUser?.email,
  );
  console.log('📦 useProduct - products z Redux:', products);

  const [buttonText, setButtonText] = useState<any>();
  const [paramsId, setParamsId] = useState<any>();

  const [product, setProduct] = useState({
    name: '',
    code: '',
    netPrice: '',
    vat: '',
    grossPrice: '',
    currency: '',
    description: '',
    tags: '',
    quantity: '',
    service: '',
    purchaseNetPrice: '',
    purchaseVat: '',
    purchaseGrossPrice: '',
    unit: '',
    defaultQuantity: '',
    pkwiu: '',
    supplierCode: '',
    accountingCode: '',
    userEmail: currentUser?.email || currentUser?.mail,
  });
  const [errors, setErrors] = useState<any>({});

  const validationSchema = yup.object({
    name: yup.string().required(t('requiredName')),
    code: yup.string().required(t('requiredProductCode')),
    netPrice: yup.number().required(t('requiredNetPrice')),
    vat: yup.number().required(t('requiredVat')),
    grossPrice: yup.number().required(t('requiredGrossPrice')),
    currency: yup.string().required(t('requiredCurrency')),
    quantity: yup.number().required(t('requiredQuantity')),
    service: yup.boolean().required(t('requiredService')),
    purchaseNetPrice: yup.number().required(t('requiredPurchaseNetPrice')),
    purchaseVat: yup.number().required(t('requiredPurchaseVat')),
    purchaseGrossPrice: yup.number().required(t('requiredPurchaseGrossPrice')),
    unit: yup.string().required(t('requiredUnit')),
    defaultQuantity: yup.number().required(t('requiredDefaultQuantity')),
    userEmail: yup.string().required(t('requiredUserEmail')),
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({ ...prevState, [name]: value }));
  };

  const loadProducts = () => {
    console.log(
      '📦 useProduct - loadProducts wywołane z userEmail:',
      currentUser?.mail || currentUser?.email,
    );

    if (currentUser) {
      const dataToSend = { userEmail: currentUser?.mail || currentUser?.email };
      console.log(
        '📦 useProduct - Wysyłam dane do dispatch (read):',
        dataToSend,
      );
      dispatch(readProducts(currentUser as any) as any);
    } else {
      console.log('📦 useProduct - Brak userEmail, nie ładuję produktów');
    }
  };

  const handleSubmit = () => {
    console.log('📦 useProduct - handleSubmit wywołane z danymi:', product);
    console.log(
      '📦 useProduct - userEmail do wysłania:',
      currentUser?.mail || currentUser?.email,
    );

    const dataToSubmit = {
      ...product,
      userEmail: currentUser?.mail || currentUser?.email,
    };

    console.log('📦 useProduct - Wysyłam dane do dispatch:', dataToSubmit);
    validationSchema
      .validate(dataToSubmit, { abortEarly: false })
      .then(() => {
        if (currentUser) {
          dispatch(createProduct(dataToSubmit, currentUser as any) as any);
          handleClose();
        }
      })
      .catch((err) => {
        setErrors(err.inner);
      });
  };

  const handleSubmitEdit = () => {
    console.log('📦 useProduct - handleSubmitEdit wywołane z danymi:', product);
    console.log(
      '📦 useProduct - userEmail do wysłania:',
      currentUser?.mail || currentUser?.email,
    );
    console.log('📦 useProduct - editingProductId:', paramsId);

    const dataToSubmit = {
      ...product,
      userEmail: currentUser?.mail || currentUser?.email,
    };

    console.log(
      '📦 useProduct - Wysyłam dane do dispatch (edit):',
      dataToSubmit,
    );
    validationSchema
      .validate(dataToSubmit, { abortEarly: false })
      .then(() => {
        if (currentUser && paramsId) {
          dispatch(
            updateProduct(dataToSubmit, paramsId, currentUser as any) as any,
          );
          handleClose();
        }
      })
      .catch((err) => {
        setErrors(err.inner);
      });
  };

  const handleModal = () => {
    setButtonText('Zapisz' as any);
    handleOpen();
    setProduct({
      name: '',
      code: '',
      netPrice: '',
      vat: '',
      grossPrice: '',
      currency: '',
      description: '',
      tags: '',
      quantity: '',
      service: '',
      purchaseNetPrice: '',
      purchaseVat: '',
      purchaseGrossPrice: '',
      unit: '',
      defaultQuantity: '',
      pkwiu: '',
      supplierCode: '',
      accountingCode: '',
      userEmail: currentUser?.email || currentUser?.mail,
    });
  };

  const handleEdit = (id: any) => {
    setParamsId(id);
    const thisProduct = (products as any)?.find(
      (product: any) => product._id === id,
    );
    if (thisProduct) {
      setProduct({
        name: thisProduct.name || '',
        code: thisProduct.code || '',
        netPrice: thisProduct.netPrice || '',
        vat: thisProduct.vat || '',
        grossPrice: thisProduct.grossPrice || '',
        currency: thisProduct.currency || '',
        description: thisProduct.description || '',
        tags: thisProduct.tags || '',
        quantity: thisProduct.quantity || '',
        service: thisProduct.service || '',
        purchaseNetPrice: thisProduct.purchaseNetPrice || '',
        purchaseVat: thisProduct.purchaseVat || '',
        purchaseGrossPrice: thisProduct.purchaseGrossPrice || '',
        unit: thisProduct.unit || '',
        defaultQuantity: thisProduct.defaultQuantity || '',
        pkwiu: thisProduct.pkwiu || '',
        supplierCode: thisProduct.supplierCode || '',
        accountingCode: thisProduct.accountingCode || '',
        userEmail: currentUser?.email || currentUser?.mail,
      });
    }
  };

  const handleDelete = (id: any) => {
    console.log('📦 useProduct - handleDelete wywołane z ID:', id);
    console.log(
      '📦 useProduct - userEmail do wysłania:',
      currentUser?.mail || currentUser?.email,
    );

    if (currentUser) {
      console.log('📦 useProduct - Wysyłam dane do dispatch (delete):', {
        id,
        userEmail: currentUser?.mail || currentUser?.email,
      });
      dispatch(deleteProduct(id, currentUser as any) as any);
    } else {
      console.log('📦 useProduct - Brak userEmail, nie usuwam produktu');
    }
  };

  const button = useSubmitButton(handleSubmit, handleSubmitEdit, buttonText);

  useEffect(() => {
    const userEmail = currentUser?.email || currentUser?.mail;
    if (currentUser && userEmail && !(products as any)?.length) {
      console.log('Auto-loading products for user:', userEmail);
      dispatch(readProducts(currentUser as any) as any);
    }
  }, [currentUser, dispatch, products]);

  return {
    errors,
    button,
    handleChange,
    setButtonText,
    handleModal,
    open,
    handleOpen,
    handleClose,
    handleEdit,
    handleDelete,
    product,
    products,
    productList: products,
    handleSubmit,
    loadProducts,
  };
};

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

export const useProduct = () => {
  const { currentUser } = useUser();
  const dispatch = useDispatch();
  const { open, handleOpen, handleClose } = useModal();

  const productList = useSelector((state) => state.products?.products);
  const [buttonText, setButtonText] = useState();
  const [paramsId, setParamsId] = useState();

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
    userEmail: currentUser?.mail,
  });
  const [errors, setErrors] = useState({});

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({ ...prevState, [name]: value }));
  };

  const loadProducts = () => {
    console.log('loadProducts called, currentUser:', currentUser);
    if (currentUser && currentUser.mail) {
      console.log('Dispatching readProducts for user:', currentUser.mail);
      dispatch(readProducts(currentUser));
    } else {
      console.warn('Cannot load products: currentUser not available');
    }
  };

  const handleSubmit = () => {
    validationSchema
      .validate(product, { abortEarly: false })
      .then(() => {
        dispatch(createProduct(product, currentUser));
        handleClose();
      })
      .catch((validationErrors) => {
        const newErrors = {};
        validationErrors.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
  };

  const handleSubmitEdit = () => {
    validationSchema
      .validate(product, { abortEarly: false })
      .then(() => {
        dispatch(updateProduct(product, paramsId, currentUser));
        handleClose();
      })
      .catch((validationErrors) => {
        const newErrors = {};
        validationErrors.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
  };

  const handleModal = () => {
    setButtonText('Zapisz');
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
      userEmail: currentUser?.mail,
    });
  };

  const handleEdit = (id) => {
    setParamsId(id);
    const thisProduct = productList.find((product) => product._id === id);
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
        userEmail: currentUser?.mail,
      });
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id, currentUser));
  };

  const button = useSubmitButton(handleSubmit, handleSubmitEdit, buttonText);

  useEffect(() => {
    if (currentUser && currentUser.mail && !productList?.length) {
      console.log('Auto-loading products for user:', currentUser.mail);
      dispatch(readProducts(currentUser));
    }
  }, [currentUser, dispatch, productList]);

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
    productList,
    handleSubmit,
    loadProducts,
  };
};

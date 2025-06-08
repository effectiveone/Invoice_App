import axios from 'axios';
import { logout } from '../utils/auth';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem('user');

    if (userDetails) {
      const token = JSON.parse(userDetails).token;
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

// public routes

export const login = async (data) => {
  console.log('🔐 API LOGIN - Wysyłam dane:', data);
  try {
    const response = await apiClient.post('/auth/login', data);
    console.log('🔐 API LOGIN - Otrzymałem odpowiedź:', response.data);
    return response.data;
  } catch (exception) {
    console.error('❌ API LOGIN - Błąd:', exception);
    return {
      error: true,
      exception,
    };
  }
};

export const register = async (data) => {
  console.log('📝 API REGISTER - Wysyłam dane:', data);
  try {
    const response = await apiClient.post('/auth/register', data);
    console.log('📝 API REGISTER - Otrzymałem odpowiedź:', response.data);
    return response.data;
  } catch (exception) {
    console.error('❌ API REGISTER - Błąd:', exception);
    return {
      error: true,
      exception,
    };
  }
};

// secure routes
export const sendFriendInvitation = async (data) => {
  try {
    return await apiClient.post('/friend-invitation/invite', data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const acceptFriendInvitation = async (data) => {
  try {
    return await apiClient.post('/friend-invitation/accept', data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const rejectFriendInvitation = async (data) => {
  try {
    return await apiClient.post('/friend-invitation/reject', data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

// Faktura API functions
export const createFaktura = async (data) => {
  console.log('📄 API CREATE_FAKTURA - Wysyłam dane:', data);
  try {
    const response = await apiClient.post('/auth/faktury', data);
    console.log('📄 API CREATE_FAKTURA - Otrzymałem odpowiedź:', response.data);
    return response.data;
  } catch (exception) {
    console.error('❌ API CREATE_FAKTURA - Błąd:', exception);
    return {
      error: true,
      exception,
    };
  }
};

export const getFaktury = async (data) => {
  console.log('📋 API GET_FAKTURY - Wysyłam dane:', data);
  try {
    const response = await apiClient.post('/auth/get-faktury', data);
    console.log('📋 API GET_FAKTURY - Otrzymałem odpowiedź:', response.data);
    return response.data;
  } catch (exception) {
    console.error('❌ API GET_FAKTURY - Błąd:', exception);
    return {
      error: true,
      exception,
    };
  }
};

export const editFaktura = async (data) => {
  try {
    return await apiClient.post('/auth/edit-faktura', data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const getInvoiceAllNumber = async (data) => {
  console.log('🔢 API GET_INVOICE_ALL_NUMBER - Wysyłam dane:', data);
  try {
    const response = await apiClient.post('/auth/get-invoice-all-number', data);
    console.log(
      '🔢 API GET_INVOICE_ALL_NUMBER - Otrzymałem odpowiedź:',
      response.data,
    );
    return response.data;
  } catch (exception) {
    console.error('❌ API GET_INVOICE_ALL_NUMBER - Błąd:', exception);
    return {
      error: true,
      exception,
    };
  }
};

// Company API functions
export const createCompany = async (data) => {
  console.log('🏢 API CREATE_COMPANY - Wysyłam dane:', data);
  try {
    const response = await apiClient.post('/company', data);
    console.log('🏢 API CREATE_COMPANY - Otrzymałem odpowiedź:', response.data);
    return response.data;
  } catch (exception) {
    console.error('❌ API CREATE_COMPANY - Błąd:', exception);
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const getCompany = async (data) => {
  console.log('🏢 API GET_COMPANY - Wysyłam dane:', data);
  try {
    const response = await apiClient.post('/company/read', data);
    console.log('🏢 API GET_COMPANY - Otrzymałem odpowiedź:', response.data);
    return response.data;
  } catch (exception) {
    console.error('❌ API GET_COMPANY - Błąd:', exception);
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const editCompany = async (data) => {
  console.log('🏢 API EDIT_COMPANY - Wysyłam dane:', data);
  try {
    const response = await apiClient.post('/company', data);
    console.log('🏢 API EDIT_COMPANY - Otrzymałem odpowiedź:', response.data);
    return response.data;
  } catch (exception) {
    console.error('❌ API EDIT_COMPANY - Błąd:', exception);
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

// Kontrahent API functions
export const createKontrahent = async (data) => {
  console.log('👥 API CREATE_KONTRAHENT - Wysyłam dane:', data);
  try {
    const response = await apiClient.post('/kontrahenci', data);
    console.log(
      '👥 API CREATE_KONTRAHENT - Otrzymałem odpowiedź:',
      response.data,
    );
    return response.data;
  } catch (exception) {
    console.error('❌ API CREATE_KONTRAHENT - Błąd:', exception);
    return {
      error: true,
      exception,
    };
  }
};

export const getKontrahent = async (data) => {
  console.log('👥 API GET_KONTRAHENT - Wysyłam dane:', data);
  try {
    const response = await apiClient.post('/kontrahenci/read', data);
    console.log('👥 API GET_KONTRAHENT - Otrzymałem odpowiedź:', response.data);
    return response.data;
  } catch (exception) {
    console.error('❌ API GET_KONTRAHENT - Błąd:', exception);
    return {
      error: true,
      exception,
    };
  }
};

export const editKontrahent = async (data) => {
  console.log('✏️ API EDIT_KONTRAHENT - Wysyłam dane:', data);
  try {
    const response = await apiClient.put(`/kontrahenci/${data.id}`, data);
    console.log(
      '✏️ API EDIT_KONTRAHENT - Otrzymałem odpowiedź:',
      response.data,
    );
    return response.data;
  } catch (exception) {
    console.error('❌ API EDIT_KONTRAHENT - Błąd:', exception);
    return {
      error: true,
      exception,
    };
  }
};

export const deleteKontrahent = async (id, userEmail) => {
  console.log('🗑️ API DELETE_KONTRAHENT - Wysyłam dane:', { id, userEmail });
  try {
    const response = await apiClient.delete(`/kontrahenci/${id}`, {
      data: { userEmail },
    });
    console.log(
      '🗑️ API DELETE_KONTRAHENT - Otrzymałem odpowiedź:',
      response.data,
    );
    return response.data;
  } catch (exception) {
    console.error('❌ API DELETE_KONTRAHENT - Błąd:', exception);
    return {
      error: true,
      exception,
    };
  }
};

// Product API functions
export const createProduct = async (data) => {
  console.log('📦 API CREATE_PRODUCT - Wysyłam dane:', data);
  try {
    const response = await apiClient.post('/products', data);
    console.log('📦 API CREATE_PRODUCT - Otrzymałem odpowiedź:', response.data);
    return response.data;
  } catch (exception) {
    console.error('❌ API CREATE_PRODUCT - Błąd:', exception);
    return {
      error: true,
      exception,
    };
  }
};

export const getProducts = async (data) => {
  console.log('📦 API GET_PRODUCTS - Wysyłam dane:', data);
  try {
    const response = await apiClient.post('/products/read', data);
    console.log('📦 API GET_PRODUCTS - Otrzymałem odpowiedź:', response.data);
    return response.data;
  } catch (exception) {
    console.error('❌ API GET_PRODUCTS - Błąd:', exception);
    return {
      error: true,
      exception,
    };
  }
};

export const getProduct = async (data) => {
  try {
    return await apiClient.get(`/products/${data.id}`);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const editProduct = async (data) => {
  console.log('✏️ API EDIT_PRODUCT - Wysyłam dane:', data);
  try {
    const response = await apiClient.put(`/products/${data.id}`, data);
    console.log('✏️ API EDIT_PRODUCT - Otrzymałem odpowiedź:', response.data);
    return response.data;
  } catch (exception) {
    console.error('❌ API EDIT_PRODUCT - Błąd:', exception);
    return {
      error: true,
      exception,
    };
  }
};

export const deleteProduct = async (id, userEmail) => {
  console.log('🗑️ API DELETE_PRODUCT - Wysyłam dane:', { id, userEmail });
  try {
    const response = await apiClient.delete(`/products/${id}`, {
      data: { userEmail },
    });
    console.log('🗑️ API DELETE_PRODUCT - Otrzymałem odpowiedź:', response.data);
    return response.data;
  } catch (exception) {
    console.error('❌ API DELETE_PRODUCT - Błąd:', exception);
    return {
      error: true,
      exception,
    };
  }
};

// Stats API functions
export const getInvoiceStats = async (data) => {
  try {
    return await apiClient.post('/auth/stats', data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const getSalesStats = async (data) => {
  try {
    return await apiClient.post('/auth/salesStats', data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

// JPK API functions
export const getJpkData = async (data) => {
  try {
    return await apiClient.post('/auth/jpk', data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const getJpkXml = async (data) => {
  try {
    return await apiClient.post('/auth/send-jpk', data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

// Settings API functions
export const saveSettings = async (data) => {
  try {
    return await apiClient.put('/auth/settings', data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const getSettings = async (data) => {
  try {
    return await apiClient.post('/auth/settings', data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

const checkResponseCode = (exception) => {
  const responseCode = exception?.response?.status;

  if (responseCode) {
    (responseCode === 401 || responseCode === 403) && logout();
  }
};

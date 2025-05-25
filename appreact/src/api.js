import axios from 'axios';
import { logout } from './Shared/Utils/auth';

const apiClient = axios.create({
  baseURL: 'http://localhost:5002/api',
  timeout: 1000,
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
  try {
    return await apiClient.post('/auth/login', data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const register = async (data) => {
  try {
    return await apiClient.post('/auth/register', data);
  } catch (exception) {
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
  try {
    return await apiClient.post('/auth/faktury', data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const getFaktury = async (data) => {
  try {
    return await apiClient.post('/auth/get-faktury', data);
  } catch (exception) {
    checkResponseCode(exception);
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
  try {
    return await apiClient.post('/auth/invoiceAllNumber', data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

// Company API functions
export const createCompany = async (data) => {
  try {
    return await apiClient.put('/auth/dane-firmy', data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const getCompany = async (data) => {
  try {
    return await apiClient.post('/auth/get-dane-firmy', data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const editCompany = async (data) => {
  try {
    return await apiClient.patch('/auth/dane-firmy', data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

// Kontrahent API functions
export const createKontrahent = async (data) => {
  try {
    return await apiClient.post('/auth/kontrahenci', data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const getKontrahent = async (data) => {
  try {
    return await apiClient.post('/auth/get-kontrahenci', data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const editKontrahent = async (data) => {
  try {
    return await apiClient.patch(`/auth/kontrahenci/${data.id}`, data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const deleteKontrahent = async (id) => {
  try {
    return await apiClient.delete(`/auth/kontrahenci/${id}`);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

// Product API functions
export const createProduct = async (data) => {
  try {
    return await apiClient.post('/auth/product', data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const getProducts = async () => {
  try {
    return await apiClient.get('/auth/products');
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const getProduct = async (data) => {
  try {
    return await apiClient.post('/auth/product', data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const editProduct = async (data) => {
  try {
    return await apiClient.post(`/auth/product/${data.id}`, data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const deleteProduct = async (id) => {
  try {
    return await apiClient.delete(`/auth/product/${id}`);
  } catch (exception) {
    checkResponseCode(exception);
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

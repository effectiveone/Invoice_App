import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Reducers/authReducer.js';
import alertReducer from './Reducers/alertReducer.js';
import { companyReducer } from './Reducers/mycompanyReducer.js';
import contractorReducer from './Reducers/kontrahenciReducer.js';
import fakturaReducer from './Reducers/fakturaReducer.js';
import { templateReducer } from './Reducers/templateReducer.js';
import settingsReducer from './Reducers/settingsReducer.js';
import { productReducer } from './Reducers/productReducer.js';
import statsReducer from './Reducers/statsReducer.js';
import { jpkReducer } from './Reducers/jpkReducer.js';

const store = configureStore({
  reducer: {
    jpk: jpkReducer,
    stats: statsReducer,
    products: productReducer,
    settings: settingsReducer,
    template: templateReducer,
    faktura: fakturaReducer,
    kontrahenci: contractorReducer,
    myCompany: companyReducer,
    auth: authReducer,
    alert: alertReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

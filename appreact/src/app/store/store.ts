import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Reducers/authReducer';
import alertReducer from './Reducers/alertReducer';
import { companyReducer } from './Reducers/mycompanyReducer';
import contractorReducer from './Reducers/kontrahenciReducer';
import fakturaReducer from './Reducers/fakturaReducer';
import { templateReducer } from './Reducers/templateReducer';
import settingsReducer from './Reducers/settingsReducer';
import { productReducer } from './Reducers/productReducer';
import statsReducer from './Reducers/statsReducer';
import { jpkReducer } from './Reducers/jpkReducer';

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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import {configureStore} from '@reduxjs/toolkit';
import login from './reducer/login';
import tokenReducer from './reducer/token';
import scan from './reducer/scan';

export const store = configureStore({
  reducer: {
    login,
    tokenReducer,
    scan,
  },
});

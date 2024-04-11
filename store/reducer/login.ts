import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import api from '../apis';
import {AuthState} from '../types';
import {storeData} from '../../constants/asyncStorage';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loading: false,
    error: false,
    authenticated: false,
  } as AuthState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(api.login.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      api.login.fulfilled,
      (state, action: PayloadAction<any>) => {
        storeData({key: 'userToken', value: action?.payload?.token});
        state.loading = false;
        state.authenticated = true;
      },
    );
    builder.addCase(api.login.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action?.payload?.error;
    });
    builder.addCase(api.resetAll, state => {
      state.loading = false;
      state.error = false;
      state.authenticated = false;
    });
  },
});

export default loginSlice.reducer;

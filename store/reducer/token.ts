import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import api from '../apis';
import {TokenState, validateTokenResponse} from '../types';

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    loading: false,
    error: '',
    route: '',
  } as TokenState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(api.validateToken.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      api.validateToken.fulfilled,
      (state, action: PayloadAction<validateTokenResponse>) => {
        state.loading = false;
        state.route = action.payload.route;
      },
    );
    builder.addCase(
      api.validateToken.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action?.payload?.error;
      },
    );
  },
});

export default tokenSlice.reducer;

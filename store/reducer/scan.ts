import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import api from '../apis';
import {ScanState} from '../types';

const scanSlice = createSlice({
  name: 'scan',
  initialState: {
    loading: false,
    error: false,
    authenticated: false,
    data: [],
  } as ScanState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(api.scan.pending, state => {
      state.loading = true;
    });
    builder.addCase(api.scan.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(api.scan.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action?.payload?.error;
    });
    builder.addCase(api.resetAll, state => {
      state.loading = false;
      state.error = false;
      state.data = [];
    });
  },
});

export default scanSlice.reducer;

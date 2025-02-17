import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Section, Settings } from '~/types/api';

export const fetchAppConfiguration = createAsyncThunk(
  'app/configuration',
  async () => {
    const product = await fetch('http://localhost:3000/api/section');
    return await product.json();
  }
);

type AppState = {
  configuration: {
    sections: Section[];
    settings: Settings;
  };
  loading: boolean;
  error: string | null;
};

const initialState: AppState = {
  configuration: null!,
  loading: false,
  error: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAppConfiguration.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAppConfiguration.fulfilled, (state, action) => {
      state.configuration = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAppConfiguration.rejected, (state, action) => {
      state.error = action.error.message || 'Something went wrong';
      state.loading = false;
    });
  },
});

export default appSlice.reducer;
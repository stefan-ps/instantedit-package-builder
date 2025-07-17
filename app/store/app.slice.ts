import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { Section, Settings } from '~/types/api';

export const fetchAppConfiguration = createAsyncThunk(
  'app/configuration',
  async () => {
    const product = await fetch(`${import.meta.env.VITE_API}/api/application/weddings`);
    return await product.json();
  }
);

type AppState = {
  configuration: {
    title: string;
    slug: string;
    summaryImage: string;
    sections: Section[];
    settings: Settings;
  };
  loading: boolean;
  ready: boolean;
  error: string | null;
  activePreview?: string;
};

const initialState: AppState = {
  configuration: null!,
  loading: false,
  ready: false,
  error: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setReady: (state, action: PayloadAction<boolean>) => {
      state.ready = action.payload;
    },
    setActivePreview: (state, action: PayloadAction<string>) => {
      state.activePreview = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAppConfiguration.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchAppConfiguration.fulfilled,
      (
        state,
        action: PayloadAction<{
          sections: Section[];
          settings: Settings;
          title: string;
          slug: string;
          summaryImage: string;
        }>
      ) => {
        state.configuration = action.payload;
        state.activePreview = action.payload.sections[0].coverUrl;
        state.loading = false;
      }
    );
    builder.addCase(fetchAppConfiguration.rejected, (state, action) => {
      state.error = action.error.message || 'Something went wrong';
      state.loading = false;
    });
  },
});

export const { setReady, setActivePreview } = appSlice.actions;

export default appSlice.reducer;

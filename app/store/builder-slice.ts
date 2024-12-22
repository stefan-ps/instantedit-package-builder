import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Service, ServicePackage } from '~/types/api';

export type BuilderSliceType = {
  configuration: {
    eventPackageId?: number;
    photography: {
      package?: ServicePackage;
      addons: Service[];
    };
    cinematography: {
      package?: ServicePackage;
      addons: Service[];
    };
  };
};

const initialState: BuilderSliceType = {
  configuration: {
    eventPackageId: undefined,
    photography: {
      package: undefined,
      addons: [],
    },
    cinematography: {
      package: undefined,
      addons: [],
    },
  },
};

export const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    changeEventPackage: (state, action) => {
      state.configuration.eventPackageId = action.payload.id;
    },
    addBundle: (state, action: PayloadAction<ServicePackage>) => {
      state.configuration.photography.package = action.payload;
    },
    removeBundle: (state) => {
      state.configuration.photography.package = undefined;
    },
    addAddon: (state, action) => {
      state.configuration.photography.addons.push(action.payload);
    },
    removeAddon: (state, action) => {
      state.configuration.photography.addons =
        state.configuration.photography.addons.filter(
          (addon) => addon.id !== action.payload.id
        );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeEventPackage,
  addBundle,
  removeBundle,
  addAddon,
  removeAddon,
} = builderSlice.actions;

export default builderSlice.reducer;

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Addon, EventPackage, Section, ServicePackage } from '~/types/api';

export type ConfigSection = {
  slug: Section['slug'];
  package?: ServicePackage | EventPackage;
  addons: Addon[];
};

export type ArrayBuilderSliceType = {
  arrayConfiguration: ConfigSection[];
  configuration: {
    eventPackage?: EventPackage;
    serviceConfigs: ConfigSection[];
  };
  configs: Partial<
    Record<
      Section['slug'],
      { package?: ServicePackage | EventPackage; addons: Addon[] }
    >
  >;
};

const initialState: ArrayBuilderSliceType = {
  arrayConfiguration: [],
  configuration: {
    eventPackage: undefined,
    serviceConfigs: [],
  },
  configs: {},
};

export const arrayBuilderSlice = createSlice({
  name: 'array-builder',
  initialState,
  reducers: {
    addPackage: (state, action: PayloadAction<ConfigSection>) => {
      const sectionConfiguration = state.configs[action.payload.slug];
      if (!sectionConfiguration) {
        state.configs[action.payload.slug] = {
          package: action.payload.package,
          addons: action.payload.addons,
        };
      } else {
        sectionConfiguration.package = action.payload.package;
        sectionConfiguration.addons = action.payload.addons;
      }
    },
    removePackage: (
      state,
      action: PayloadAction<{ slug: Section['slug'] }>
    ) => {
      delete state.configs[action.payload.slug];
    },
    addAddon: (
      state,
      action: PayloadAction<{ slug: Section['slug']; addon: Addon }>
    ) => {
      const sectionConfiguration = state.configs[action.payload.slug];
      if (sectionConfiguration) {
        sectionConfiguration.addons.push(action.payload.addon);
      }
    },
    removeAddon: (
      state,
      action: PayloadAction<{ slug: Section['slug']; addon: Addon }>
    ) => {
      const sectionConfiguration = state.configs[action.payload.slug];
      if (sectionConfiguration) {
        sectionConfiguration.addons = sectionConfiguration.addons.filter(
          (addon) => addon.id !== action.payload.addon.id
        );
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPackage, removePackage, addAddon, removeAddon } =
  arrayBuilderSlice.actions;

export default arrayBuilderSlice.reducer;

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  Addon,
  Event,
  EventPackage,
  Section,
  ServicePackage,
} from '~/types/api';

export type ConfigSection = {
  slug: Section['slug'];
  package?: ServicePackage | EventPackage;
  addons?: Addon[];
  events?: Event[];
};

export type BuilderSliceType = {
  configs: Partial<
    Record<
      Section['slug'],
      {
        package?: ServicePackage | EventPackage;
        addons: Addon[];
        events: Event[];
      }
    >
  >;
};

const initialState: BuilderSliceType = {
  configs: {},
};

export const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    addPackage: (state, action: PayloadAction<ConfigSection>) => {
      const sectionConfiguration = state.configs[action.payload.slug];
      if (!sectionConfiguration) {
        state.configs[action.payload.slug] = {
          package: action.payload.package,
          addons: action.payload.addons ?? [],
          events: action.payload.events ?? [],
        };
      } else {
        sectionConfiguration.package = action.payload.package;
        sectionConfiguration.addons = action.payload.addons ?? [];
        sectionConfiguration.events = action.payload.events ?? [];
      }
    },
    removePackage: (
      state,
      action: PayloadAction<{ slug: Section['slug'] }>
    ) => {
      delete state.configs[action.payload.slug];
    },
    updateEvents: (state, action: PayloadAction<ConfigSection>) => {
      const sectionConfiguration = state.configs[action.payload.slug];
      if (sectionConfiguration) {
        sectionConfiguration.events = action.payload.events ?? [];
      } else {
        state.configs[action.payload.slug] = {
          package: undefined,
          addons: [],
          events: action.payload.events ?? [],
        };
      }
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
export const {
  addPackage,
  removePackage,
  updateEvents,
  addAddon,
  removeAddon,
} = builderSlice.actions;

export default builderSlice.reducer;

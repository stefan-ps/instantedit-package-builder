import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Addon, Event, Section, EventBundle, ServiceBundle } from '~/types/api';
import type { Booking } from '~/types/booking';

export type ActionPayload = {
  title?: string;
  slug: Section['slug'];
  package?: EventBundle | ServiceBundle;
  addons?: Addon[];
  events?: Event[];
};

export type BuilderSliceType = {
  configs: Partial<
    Record<
      Section['slug'],
      {
        title?: string;
        bundle?: EventBundle | ServiceBundle;
        addons: Addon[];
        events: Event[];
      }
    >
  >;
  booking?: Booking;
};

const initialState: BuilderSliceType = {
  configs: {},
};

export const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    insertBundle: (state, action: PayloadAction<ActionPayload>) => {
      const sectionConfiguration = state.configs[action.payload.slug];
      if (!sectionConfiguration) {
        state.configs[action.payload.slug] = {
          title: action.payload.title,
          bundle: action.payload.package,
          addons: action.payload.addons ?? [],
          events: action.payload.events ?? [],
        };
      } else {
        sectionConfiguration.bundle = action.payload.package;
        sectionConfiguration.addons = action.payload.addons ?? [];
        sectionConfiguration.events = action.payload.events ?? [];
      }
    },
    removeBundle: (state, action: PayloadAction<{ slug: Section['slug'] }>) => {
      delete state.configs[action.payload.slug];
    },
    updateEvents: (state, action: PayloadAction<ActionPayload>) => {
      const sectionConfiguration = state.configs[action.payload.slug];
      if (sectionConfiguration) {
        sectionConfiguration.events = action.payload.events ?? [];
      } else {
        state.configs[action.payload.slug] = {
          title: action.payload.title,
          bundle: undefined,
          addons: [],
          events: action.payload.events ?? [],
        };
      }
    },
    insertAddon: (
      state,
      action: PayloadAction<{
        title: string;
        slug: Section['slug'];
        addon: Addon;
      }>
    ) => {
      const sectionConfiguration = state.configs[action.payload.slug];
      if (sectionConfiguration) {
        if (
          !sectionConfiguration.addons.find(
            (addon) => addon.id === action.payload.addon.id
          )
        ) {
          sectionConfiguration.addons.push(action.payload.addon);
        }
      } else {
        state.configs[action.payload.slug] = {
          title: action.payload.title,
          bundle: undefined,
          addons: [action.payload.addon],
          events: [],
        };
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

    saveBooking: (state, action: PayloadAction<Booking>) => {
      state.booking = action.payload;
    },

    resetConfig: (state) => {
      state.configs = {}
      state.booking = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  insertBundle,
  removeBundle,
  updateEvents,
  insertAddon,
  removeAddon,
  saveBooking,
  resetConfig,
} = builderSlice.actions;

export default builderSlice.reducer;

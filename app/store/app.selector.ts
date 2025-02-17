import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './store';

export const getConfiguration = (state: RootState) => state.app.configuration;

export const getSection = createSelector(
  [getConfiguration, (_, id) => id],
  (config, slug) => config.sections.find((section) => section.slug === slug)
);

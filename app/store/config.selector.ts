import type { Section } from '~/types/api';
import type { RootState } from './store';
import { createSelector } from '@reduxjs/toolkit';

export const selectSections = (state: RootState) => state.builder.configs;

export const selectSection = (slug: Section['slug']) => (state: RootState) =>
  state.builder.configs[slug];

export const selectServiceBundles = createSelector(
  selectSections,
  (sections) =>
    Object.values(sections)
      .filter((section) => section.package?.type === 'service')
      .map((section) => section.package!) ?? []
);

export const selectAddons = createSelector(
  selectSections,
  (sections) =>
    Object.values(sections)
      .map((section) => section.addons)
      .flat() ?? []
);

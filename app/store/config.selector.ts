import type { Bundle, Section } from '~/types/api';
import type { RootState } from './store';

export const selectSections = (state: RootState) => state.builder.configs;

export const selectSection = (slug: Section['slug']) => (state: RootState) =>
  state.builder.configs[slug];

export const selectServiceBundles = (state: RootState)=>
  Object.values(state.builder.configs)
    .filter((section) => section.package?.type === 'service')
    .map((section) => section.package!) ?? [];

export const selectAddons = (state: RootState) =>
  Object.values(state.builder.configs)
    .map((section) => section.addons)
    .flat() ?? [];

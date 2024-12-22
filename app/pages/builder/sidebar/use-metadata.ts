import { useMemo } from 'react';
import { useBuilderContext } from '~/providers/builder-provider';

export function useMetadata(sectionId: number) {
  const { sections } = useBuilderContext();

  const memoized = useMemo(
    () => sections.find((section) => section.id === sectionId)?.metadata,
    [sections]
  );

  if (!memoized) {
    throw new Error('Could find section that should exist');
  }

  return memoized;
}

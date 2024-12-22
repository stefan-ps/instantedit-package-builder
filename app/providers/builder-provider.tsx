import React, {
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import type { Section } from '~/types/api';

type BuilderContextType = {
  sections: Section[];
};

const BuilderContext = React.createContext<BuilderContextType | null>(null);

type BuilderProviderProps = {
  sections: Section[];
};

export const BuilderProvider = ({
  sections: init,
  children,
}: PropsWithChildren<BuilderProviderProps>) => {
  const [sections, setSections] = useState<Section[]>(init);

  const memoized = useMemo(
    () => ({
      sections,
    }),
    [sections]
  );

  return (
    <BuilderContext.Provider value={memoized}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilderContext = () => {
  const builderContext = useContext(BuilderContext);

  if(!builderContext) {
    throw new Error('useBuilderContext should be used inside BuilderProvider')
  }

  return builderContext;
};

import React, {
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import type { Section, Settings } from '~/types/api';

type BuilderContextType = {
  activeSection?: number;
  setActiveSection: (section: number) => void;
};

export const BuilderContext = React.createContext<BuilderContextType | null>(
  null
);

type BuilderProviderProps = {};

export const BuilderProvider = ({
  children,
}: PropsWithChildren<BuilderProviderProps>) => {
  const [activeSection, setActiveSection] = useState<number>();

  const memoized = useMemo(
    () => ({
      activeSection,
      setActiveSection,
    }),
    [activeSection, setActiveSection]
  );

  return (
    <BuilderContext.Provider value={memoized}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilderContext = () => {
  const builderContext = useContext(BuilderContext);

  if (!builderContext) {
    throw new Error('useBuilderContext should be used inside BuilderProvider');
  }

  return builderContext;
};

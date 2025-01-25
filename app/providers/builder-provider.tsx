import React, {
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import type { Section, Settings } from '~/types/api';

type BuilderContextType = {
  settings: Settings;
  sections: Section[];
  activeSection: number;
  setActiveSection: (section: number) => void;
};

const BuilderContext = React.createContext<BuilderContextType | null>(null);

type BuilderProviderProps = {
  sections: Section[];
  settings: Settings;
};

export const BuilderProvider = ({
  settings,
  sections: init,
  children,
}: PropsWithChildren<BuilderProviderProps>) => {
  const [sections, setSections] = useState<Section[]>(init);
  const [activeSection, setActiveSection] = useState<number>(sections[0].id);

  const memoized = useMemo(
    () => ({
      settings,
      sections,
      activeSection,
      setActiveSection,
    }),
    [sections, activeSection, setActiveSection]
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

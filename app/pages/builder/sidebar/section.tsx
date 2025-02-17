import { EventConfigurator } from './event-configurator';
import { PackageConfigurator } from './package-configurator';
import type { Section as SectionType } from '~/types/api';
import { useEffect, useRef } from 'react';
import { useBuilderContext } from '~/providers/builder-provider';
import ExtraConfigurator from './extra-configurator';
import { useAppSelector } from '~/store/hooks';
import { getSection } from '~/store/app.selector';

type Props = SectionType;

export function Section({ id, slug }: Props) {
  const { setActiveSection } = useBuilderContext();
  const section = useAppSelector((state) => getSection(state, slug));
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Check if the element is at least 50% visible
        if (entry.intersectionRatio >= 0.9) {
          setActiveSection(id);
        }
      },
      {
        threshold: [0.9], // Trigger when 50% of the element is visible
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  if (!section) {
    return null;
  }

  return (
    <div className='px-5 pb-10 pt-20' ref={elementRef}>
      {section.type === 'event' && <EventConfigurator {...section} />}
      {section.type === 'service' && <PackageConfigurator {...section} />}
      {section.type === 'extra' && <ExtraConfigurator {...section} />}
    </div>
  );
}

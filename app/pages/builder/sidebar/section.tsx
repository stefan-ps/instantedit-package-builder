import { EventConfigurator } from './event-configurator';
import { PackageConfigurator } from './package-configurator';
import type { Section as SectionType } from '~/types/api';
import { useSection } from './use-section';
import { useEffect, useRef } from 'react';
import { useBuilderContext } from '~/providers/builder-provider';

type Props = { id: SectionType['id']; type: SectionType['type'] };

export function Section({ id }: Props) {
  const { setActiveSection } = useBuilderContext();
  const section = useSection(id);
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

  return (
    <div className='px-5 pb-10 pt-20' ref={elementRef}>
      {section.type === 'event' && <EventConfigurator {...section} />}
      {section.type === 'package' && <PackageConfigurator {...section} />}
    </div>
  );
}

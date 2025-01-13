import { EventConfigurator } from './event-configurator';
import { PackageConfigurator } from './package-configurator';
import type { Section as SectionType } from '~/types/api';
import { useSection } from './use-section';

type Props = { id: SectionType['id']; type: SectionType['type'] };

export function Section({ id }: Props) {
  const section = useSection(id);

  return (
    <div className='px-5 pb-10 pt-20'>
      {section.type === 'event' && <EventConfigurator {...section} />}
      {section.type === 'package' && <PackageConfigurator {...section} />}
    </div>
  );
}

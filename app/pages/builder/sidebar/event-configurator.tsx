import { List, ListItem } from '~/components/list';
import { Typography } from '~/components/ui/typography';
import type { EventPackage, EventPackageSection } from '~/types/api';
import { useCallback, useMemo } from 'react';
import { useAppDispatch } from '~/store/hooks';
import { addPackage, removePackage } from '~/store/array-builder-slice';

type Props = EventPackageSection;

export function EventConfigurator({
  title,
  description,
  metadata,
  slug,
}: Props) {
  const dispatch = useAppDispatch();

  const groupedEvents = useMemo(() => {
    const allEvents = metadata.packages.flatMap((item) => item.events);

    const uniqueEvents = Array.from(
      new Map(allEvents.map((event) => [event.id, event])).values()
    );
    return metadata.eventTypes.map((eventType) => ({
      id: eventType.id,
      title: eventType.title,
      events: uniqueEvents.filter((event) => event.type === eventType.value),
    }));
  }, [metadata]);

  const onPackageChangeHandler = useCallback(
    (isSelected: boolean, servicePackage: EventPackage) => {
      if (isSelected) {
        dispatch(
          addPackage({ slug: slug, package: servicePackage, addons: [] })
        );
      } else {
        dispatch(removePackage({ slug: slug }));
      }
    },
    [dispatch]
  );

  return (
    <>
      <div className='py-5'>
        <Typography variant={'h3'}>{title}</Typography>
        <Typography appearance={'muted'}>{description}</Typography>
      </div>
      <div className='flex flex-col gap-5'>
        <div>
          {metadata.title && (
            <Typography variant={'h4'} className='mb-3'>
              {metadata.title}
            </Typography>
          )}
          <List variant={'tile'}>
            {metadata.packages.map((element) => (
              <ListItem
                key={element.id}
                id={element.id}
                title={element.title}
                hint={`${element.duration} hours`}
                onChange={(isSelected) => {
                  onPackageChangeHandler(isSelected, element);
                }}
              />
            ))}
          </List>
        </div>
        {groupedEvents.map((group) => (
          <div key={group.id}>
            {group.title && (
              <Typography variant={'h4'} className='mb-3'>
                {group.title}
              </Typography>
            )}
            <List variant={'badge'}>
              {group.events.map((event) => (
                <ListItem key={event.id} id={event.id} title={event.title} />
              ))}
            </List>
          </div>
        ))}
      </div>
    </>
  );
}

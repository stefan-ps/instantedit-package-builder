import { Typography } from '~/components/ui/typography';
import type { EventPackage, EventPackageSection } from '~/types/api';
import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { addPackage, removePackage } from '~/store/builder-slice';
import { cn } from '~/lib/utils';
import { Badge } from '~/components/ui/badge';

type Props = EventPackageSection;

export function EventConfigurator({
  title,
  description,
  metadata,
  slug,
}: Props) {
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.builder.configs[slug]);

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

  const onPackageClickHandler = useCallback(
    (servicePackage: EventPackage) => {
      if (config?.package?.id === servicePackage.id) {
        dispatch(removePackage({ slug: slug }));
      } else {
        dispatch(addPackage({ slug: slug, package: servicePackage }));
      }
    },
    [config]
  );
  const onEventClickHandler = useCallback(() => {}, [config]);

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
          <ul className={cn('flex flex-col gap-2')}>
            {metadata.packages.map((element) => (
              <li
                key={element.id}
                className={cn(
                  'flex flex-col gap-3 border-2 rounded bg-white px-4 py-3 hover:bg-primary/10 hover:border-primary/10',
                  {
                    'border-primary text-primary bg-primary/20':
                      config?.package?.id === element.id,
                  }
                )}
                onClick={() => onPackageClickHandler(element)}
              >
                <div className='flex flex-row justify-between items-center'>
                  <Typography>{element.title}</Typography>
                  {element.duration && (
                    <Typography variant={'small'} appearance={'muted'}>
                      {`${element.duration} hours`}
                    </Typography>
                  )}
                </div>
                {element.description && (
                  <Typography variant={'small'} appearance={'muted'}>
                    {element.description}
                  </Typography>
                )}
              </li>
            ))}
          </ul>
        </div>
        {groupedEvents.map((group) => (
          <div key={group.id}>
            {group.title && (
              <Typography variant={'h4'} className='mb-3'>
                {group.title}
              </Typography>
            )}
            <ul className={cn('flex flex-row gap-2 ')}>
              {group.events.map((event) => (
                <li key={event.id}>
                  <Badge
                    variant={
                      (config?.package as EventPackage)?.events.some(
                        (e) => e.id === event.id
                      )
                        ? 'default'
                        : 'outline'
                    }
                    onClick={() => onEventClickHandler()}
                    size={'lg'}
                  >
                    {event.title}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

import { Typography } from '~/components/ui/typography';
import type {
  Addon,
  Event,
  EventPackage,
  EventPackageSection,
} from '~/types/api';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { addPackage, removePackage, updateEvents } from '~/store/builder-slice';
import { cn } from '~/lib/utils';
import { Badge } from '~/components/ui/badge';
import { useBuilderContext } from '~/providers/builder-provider';

type Props = EventPackageSection;

export function EventConfigurator({
  title,
  description,
  metadata,
  slug,
}: Props) {
  const pageConfig = useBuilderContext();
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.builder.configs[slug]);

  const groupedEvents = useMemo(() => {
    const allEvents = metadata.bundles.flatMap((item) => item.events);

    const uniqueEvents = Array.from(
      new Map(allEvents.map((event) => [event.id, event])).values()
    );
    const grouped = metadata.eventTypes.map((eventType) => {
      return {
        id: eventType.id,
        title: eventType.title,
        type: eventType.value,
        events: uniqueEvents.filter((event) => event.type === eventType.value),
      };
    });

    return grouped;
  }, [metadata]);

  const [eventSelector, setEventSelector] = useState(() =>
    groupedEvents.reduce((prev, curr) => {
      prev[curr.type] = [];
      return prev;
    }, {} as { [id: string]: Event[] })
  );

  const onPackageClickHandler = useCallback(
    (servicePackage: EventPackage) => {
      if (config?.package?.id === servicePackage.id) {
        dispatch(removePackage({ slug: slug }));
      } else {
        dispatch(addPackage({ slug: slug, package: servicePackage }));

        setEventSelector(() => {
          return servicePackage.events.reduce((prev, curr) => {
            if (prev[curr.type]) {
              prev[curr.type] = [...prev[curr.type], curr];
            } else {
              prev[curr.type] = [curr];
            }

            return prev;
          }, {} as { [id: string]: Event[] });
        });

        const defaultPhotography = pageConfig.sections
          .find((section) => section.slug === 'photography')
          ?.metadata.bundles.find(
            (bundle) => bundle.id === servicePackage.photographyDefaultId
          );
        const defaultCinematography = pageConfig.sections
          .find((section) => section.slug === 'cinematography')
          ?.metadata.bundles.find(
            (bundle) => bundle.id === servicePackage.cinematographyDefaultId
          );
        dispatch(
          addPackage({ slug: 'photography', package: defaultPhotography })
        );
        dispatch(
          addPackage({ slug: 'cinematography', package: defaultCinematography })
        );
      }
    },
    [config, groupedEvents]
  );

  const onEventClickHandler = useCallback(
    (event: Event, isSelected: boolean) => {
      if (event.type === 'ceremony') {
        if (isSelected) {
          if (eventSelector[event.type].length > 1) {
            // Downgrade bundle
            const singleEventPackage = metadata.bundles.find(
              (bundle) => bundle.events.length === 1
            );
            dispatch(addPackage({ slug: slug, package: singleEventPackage }));
            setEventSelector(() => {
              return (singleEventPackage as EventPackage).events.reduce(
                (prev, curr) => {
                  if (prev[curr.type]) {
                    prev[curr.type] = [...prev[curr.type], curr];
                  } else {
                    prev[curr.type] = [curr];
                  }

                  return prev;
                },
                {} as { [id: string]: Event[] }
              );
            });
          }
        } else {
          // Upgrade bundle to first that contains this event
          const singleEventPackage = metadata.bundles
            .filter(
              (bundle) =>
                bundle.events.filter((ev) => ev.id === event.id).length > 0
            )
            ?.sort((a, b) => a.events.length - b.events.length)[0];
          dispatch(addPackage({ slug: slug, package: singleEventPackage }));
          setEventSelector(() => {
            return (singleEventPackage as EventPackage).events.reduce(
              (prev, curr) => {
                if (prev[curr.type]) {
                  prev[curr.type] = [...prev[curr.type], curr];
                } else {
                  prev[curr.type] = [curr];
                }

                return prev;
              },
              {} as { [id: string]: Event[] }
            );
          });
        }
      } else if (event.type === 'pre-ceremony') {
        if (isSelected) {
          if (eventSelector[event.type]?.length > 2) {
            // Don't change package, update only pre-event events
            setEventSelector((previous) => ({
              ...previous,
              [event.type]: previous[event.type].filter(
                (ev) => ev.id !== event.id
              ),
            }));
          } else if (eventSelector[event.type]?.length === 2) {
            // Downgrade bundle but keep last pre-ceremony event
            const singleEventPackage = metadata.bundles
              .filter(
                (bundle) =>
                  bundle.events.filter((ev) => ev.type === 'pre-ceremony')
                    .length === 1
              )
              ?.sort((a, b) => b.events.length - a.events.length)[0];
            dispatch(addPackage({ slug: slug, package: singleEventPackage }));
            setEventSelector((previous) => ({
              ...previous,
              [event.type]: previous[event.type].filter(
                (ev) => ev.id !== event.id
              ),
            }));
          } else if (eventSelector[event.type]?.length === 1) {
            // Downgrade bundle and remove pre-ceremony events
            const singleEventPackage = metadata.bundles
              .filter(
                (bundle) =>
                  bundle.events.filter((ev) => ev.type === 'pre-ceremony')
                    .length === 0
              )
              ?.sort((a, b) => b.events.length - a.events.length)[0];
            dispatch(addPackage({ slug: slug, package: singleEventPackage }));
            setEventSelector(() => {
              return (singleEventPackage as EventPackage).events.reduce(
                (prev, curr) => {
                  if (prev[curr.type]) {
                    prev[curr.type] = [...prev[curr.type], curr];
                  } else {
                    prev[curr.type] = [curr];
                  }

                  return prev;
                },
                {} as { [id: string]: Event[] }
              );
            });
          }
        } else {
          // Upgrade to first that contains this pre-ceremony event
          let singleEventPackage: EventPackage | undefined;

          if ((eventSelector[event.type] ?? []).length === 0) {
            singleEventPackage = metadata.bundles.find(
              (bundle) =>
                bundle.events.filter((ev) => ev.type === event.type).length ===
                1
            );
          }

          if (!singleEventPackage) {
            singleEventPackage =
              metadata.bundles
                .filter(
                  (bundle) =>
                    bundle.events.filter((ev) => ev.id === event.id).length >
                      0 &&
                    [...eventSelector[event.type], event].every((ev) =>
                      bundle.events.some((bev) => bev.id === ev.id)
                    )
                )
                ?.sort((a, b) => a.events.length - b.events.length)[0] ??
              undefined;
          }

          if (
            singleEventPackage &&
            (eventSelector[event.type] ?? []).length <= 1
          ) {
            dispatch(addPackage({ slug: slug, package: singleEventPackage }));
          }

          setEventSelector((previous) => ({
            ...singleEventPackage.events.reduce((prev, curr) => {
              if (prev[curr.type]) {
                prev[curr.type] = [...prev[curr.type], curr];
              } else {
                prev[curr.type] = [curr];
              }

              return prev;
            }, {} as { [id: string]: Event[] }),
            [event.type]: [...(previous[event.type] ?? []), event],
          }));
        }
      }
    },
    [config, eventSelector]
  );

  useEffect(() => {
    if (Object.values(eventSelector).flat().length) {
      dispatch(
        updateEvents({
          slug,
          events: Object.values(eventSelector).flat(),
        })
      );
    }
  }, [eventSelector]);

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
            {metadata.bundles.map((element) => (
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
              {group.events.map((event) => {
                const isSelected = eventSelector[event.type]?.some(
                  (ev) => ev.id === event.id
                );

                return (
                  <li key={event.id}>
                    <Badge
                      variant={isSelected ? 'default' : 'outline'}
                      onClick={() => onEventClickHandler(event, isSelected)}
                      size={'lg'}
                    >
                      {event.title}
                    </Badge>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

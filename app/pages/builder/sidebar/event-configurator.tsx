import { Typography } from '~/components/ui/typography';
import type { Event, EventBundle, EventPackageSection } from '~/types/api';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
  insertBundle,
  removeBundle,
  updateEvents,
} from '~/store/builder-slice';
import { cn } from '~/lib/utils';
import { Badge } from '~/components/ui/badge';
import { selectSection } from '~/store/config.selector';
import { setActivePreview } from '~/store/app.slice';
import { useSearchParams } from 'react-router';

type Props = EventPackageSection;

export function EventConfigurator({
  title,
  description,
  metadata,
  slug,
}: Props) {
  const appConfig = useAppSelector((state) => state.app.configuration);
  const dispatch = useAppDispatch();
  const section = useAppSelector(selectSection(slug));

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
    (servicePackage: EventBundle) => {
      console.log('onpackageclick')
      if (section?.package?.id === servicePackage.id) {
        dispatch(removeBundle({ slug: slug }));
      } else {
        dispatch(insertBundle({ title, slug: slug, package: servicePackage }));
        if (servicePackage.preview) {
          dispatch(setActivePreview(servicePackage.preview));
        }

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

        const photographySection = appConfig.sections.find(
          (section) => section.slug === 'photography'
        );
        const defaultPhotography = photographySection?.metadata.bundles.find(
          (bundle) => bundle.id === servicePackage.photographyDefaultId
        );
        const cinematographySection = appConfig.sections.find(
          (section) => section.slug === 'cinematography'
        );
        const defaultCinematography =
          cinematographySection?.metadata.bundles.find(
            (bundle) => bundle.id === servicePackage.cinematographyDefaultId
          );

        dispatch(
          insertBundle({
            title: photographySection?.title ?? '',
            slug: 'photography',
            package: defaultPhotography,
          })
        );
        dispatch(
          insertBundle({
            title: cinematographySection?.title ?? '',
            slug: 'cinematography',
            package: defaultCinematography,
          })
        );
      }
    },
    [section, groupedEvents]
  );

  const onEventClickHandler = useCallback(
    (event: Event, isSelected: boolean) => {
      console.log('oneventclick')
      if (event.type === 'ceremony') {
        if (isSelected) {
          if (eventSelector[event.type].length > 1) {
            // Downgrade bundle
            const singleEventPackage = metadata.bundles.find(
              (bundle) => bundle.events.length === 1
            );

            if (!singleEventPackage) return;

            dispatch(insertBundle({ slug: slug, package: singleEventPackage }));
            setEventSelector(() => {
              return singleEventPackage?.events.reduce((prev, curr) => {
                if (prev[curr.type]) {
                  prev[curr.type] = [...prev[curr.type], curr];
                } else {
                  prev[curr.type] = [curr];
                }

                return prev;
              }, {} as { [id: string]: Event[] });
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
          dispatch(insertBundle({ slug: slug, package: singleEventPackage }));
          setEventSelector(() => {
            return singleEventPackage.events.reduce((prev, curr) => {
              if (prev[curr.type]) {
                prev[curr.type] = [...prev[curr.type], curr];
              } else {
                prev[curr.type] = [curr];
              }

              return prev;
            }, {} as { [id: string]: Event[] });
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
            dispatch(insertBundle({ slug: slug, package: singleEventPackage }));
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
            dispatch(insertBundle({ slug: slug, package: singleEventPackage }));
            setEventSelector(() => {
              return singleEventPackage.events.reduce((prev, curr) => {
                if (prev[curr.type]) {
                  prev[curr.type] = [...prev[curr.type], curr];
                } else {
                  prev[curr.type] = [curr];
                }

                return prev;
              }, {} as { [id: string]: Event[] });
            });
          }
        } else {
          // Upgrade to first that contains this pre-ceremony event
          let singleEventPackage: EventBundle | undefined;

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
            dispatch(insertBundle({ slug: slug, package: singleEventPackage }));
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
    [section, eventSelector]
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
  
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const events = searchParams.getAll('events');

    const allEvents = metadata?.bundles.map((b) => b.events).flat();
    const uniqueEvents = Array.from(
      new Map(allEvents.map((event) => [event.id, event])).values()
    );

    const relevantEvents = uniqueEvents.filter((event) =>
      events.includes(`${event.id}`)
    );

    setEventSelector(() => {
      return relevantEvents.reduce((prev, curr) => {
        if (prev[curr.type]) {
          prev[curr.type] = [...prev[curr.type], curr];
        } else {
          prev[curr.type] = [curr];
        }

        return prev;
      }, {} as { [id: string]: Event[] });
    });
  }, []);

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
                      section?.package?.id === element.id,
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

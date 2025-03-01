import { useCallback, useMemo } from 'react';
import { Button } from '~/components/ui/button';
import { Typography } from '~/components/ui/typography';
import { formatCurrency } from '~/lib/format';
import { cn } from '~/lib/utils';
import {
  insertAddon,
  insertBundle,
  removeAddon,
  removeBundle,
} from '~/store/builder-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import type {
  Section,
  Service,
  Bundle,
  ServicePackageSection,
} from '~/types/api';
import { calculateBundlePrice } from './utils';
import ComparableContainer from './comparable/container';
import { selectSection } from '~/store/config.selector';

type Props = ServicePackageSection & { slug: Section['slug'] };

export function PackageConfigurator({
  title,
  description,
  slug,
  metadata,
}: Props) {
  const { settings } = useAppSelector((state) => state.app.configuration);
  const section = useAppSelector(selectSection(slug));
  const eventSection = useAppSelector(selectSection('event'));

  const dispatch = useAppDispatch();

  const addons = useMemo(() => {
    return [
      ...(metadata.addons.map((addon) => addon.service) ?? []),
      ...(metadata.bundles.find(
        (servicePackage) => servicePackage.id === section?.package?.id
      )?.addons.filter((addon) => addon.isAddon) ?? []),
    ];
  }, [section]);

  const addonsList = useMemo(
    () => (
      <ul className={cn('flex flex-col gap-2')}>
        {addons.map((element) => (
          <li
            key={element.id}
            className={cn(
              'flex flex-col gap-3 border-2 rounded bg-white px-4 py-3 hover:bg-primary/10 hover:border-primary/10',
              {
                'border-primary text-primary bg-primary/20':
                  section?.addons?.find((addon) => addon.id === element.id),
              }
            )}
            onClick={() => onAddonClickHandler(element)}
          >
            <div className='flex flex-row justify-between items-center'>
              <Typography>{element.title}</Typography>
              {element.price && (
                <Typography variant={'small'} appearance={'muted'}>
                  {formatCurrency(element.price)}
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
    ),
    [addons, section]
  );

  const onPackageClickHandler = useCallback(
    (servicePackage: Bundle) => {
      if (section?.package?.id === servicePackage.id) {
        dispatch(removeBundle({ slug: slug }));
      } else {
        dispatch(
          insertBundle({
            slug: slug,
            package: servicePackage,
          })
        );
      }
    },
    [section]
  );

  const onAddonClickHandler = useCallback(
    (service: Service) => {
      if (section?.addons?.find((addon) => addon.id === service.id)) {
        dispatch(removeAddon({ slug: slug, addon: service }));
      } else {
        dispatch(insertAddon({ slug: slug, addon: service }));
      }
    },
    [section]
  );

  return (
    <>
      <div className='py-5 flex flex-row justify-between'>
        <div>
          <Typography variant={'h3'}>{title}</Typography>
          <Typography appearance={'muted'}>{description}</Typography>
        </div>
        <div>
          <ComparableContainer
            title={title}
            actionText={settings.translations?.comparePackagesText}
            bundles={metadata.bundles}
            events={eventSection?.events ?? []}
            settings={settings}
            onSelect={onPackageClickHandler}
          />
        </div>
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
                  {element.price && (
                    <Typography variant={'small'} appearance={'muted'}>
                      {formatCurrency(
                        calculateBundlePrice(
                          element,
                          eventSection?.events ?? [],
                          settings
                        )
                      )}
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
          <div className='flex flex-row justify-between items-center'>
            <Typography variant={'small'} appearance={'muted'}>
              {settings.translations?.helpText}
            </Typography>
            <Button variant={'link'}>
              {settings.translations?.helpActionText}
            </Button>
          </div>
        </div>
        <div>
          {addons.length > 0 && (
            <>
              {settings.translations?.addonsTitleText && (
                <Typography variant={'h4'} className='mb-3'>
                  {settings.translations?.addonsTitleText}
                </Typography>
              )}
              {addonsList}
            </>
          )}
        </div>
      </div>
    </>
  );
}

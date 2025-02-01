import { useCallback, useMemo } from 'react';
import { Button } from '~/components/ui/button';
import { Typography } from '~/components/ui/typography';
import { formatCurrency } from '~/lib/format';
import { cn } from '~/lib/utils';
import { useBuilderContext } from '~/providers/builder-provider';
import {
  addAddon,
  addPackage,
  removeAddon,
  removePackage,
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

type Props = ServicePackageSection & { slug: Section['slug'] };

export function PackageConfigurator({
  title,
  description,
  slug,
  metadata,
}: Props) {
  const { settings } = useBuilderContext();
  const config = useAppSelector((state) => state.builder.configs[slug]);
  const eventConfig = useAppSelector((state) => state.builder.configs.event);

  const dispatch = useAppDispatch();

  const addons = useMemo(() => {
    return [
      ...(metadata.addons ?? []),
      ...(metadata.bundles.find(
        (servicePackage) => servicePackage.id === config?.package?.id
      )?.addons ?? []),
    ];
  }, [config]);

  const addonsList = useMemo(
    () => (
      <>
        <ul className={cn('flex flex-col gap-2')}>
          {addons.map((element) => (
            <li
              key={element.id}
              className={cn(
                'flex flex-col gap-3 border-2 rounded bg-white px-4 py-3 hover:bg-primary/10 hover:border-primary/10',
                {
                  'border-primary text-primary bg-primary/20':
                    config?.addons?.find((addon) => addon.id === element.id),
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
      </>
    ),
    [addons, config]
  );

  const onPackageClickHandler = useCallback(
    (servicePackage: Bundle) => {
      if (config?.package?.id === servicePackage.id) {
        dispatch(removePackage({ slug: slug }));
      } else {
        dispatch(
          addPackage({
            slug: slug,
            package: servicePackage,
          })
        );
      }
    },
    [config]
  );

  const onAddonClickHandler = useCallback(
    (service: Service) => {
      if (config?.addons?.find((addon) => addon.id === service.id)) {
        dispatch(removeAddon({ slug: slug, addon: service }));
      } else {
        dispatch(addAddon({ slug: slug, addon: service }));
      }
    },
    [config]
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
            events={eventConfig?.events ?? []}
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
                      config?.package?.id === element.id,
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
                          eventConfig?.events ?? [],
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
            <Button variant={'link'}>{settings.translations?.helpActionText}</Button>
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

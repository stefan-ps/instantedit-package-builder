import React, { useCallback } from 'react';
import { Typography } from '~/components/ui/typography';
import { formatCurrency } from '~/lib/format';
import { selectSection } from '~/store/config.selector';
import { useAppSelector } from '~/store/hooks';
import type { Bundle, Service, ServiceBundle } from '~/types/api';
import { calculateBundlePrice, calculateServiceDiscount } from './utils';
import { cn } from '~/lib/utils';

const PackageItem = ({
  element,
  slug,
  onPackageClickHandler,
}: {
  element: ServiceBundle;
  slug: 'photography' | 'cinematography';
  onPackageClickHandler: (element: ServiceBundle) => void;
}) => {
  const { settings } = useAppSelector((state) => state.app.configuration);
  const section = useAppSelector(selectSection(slug));
  const eventSection = useAppSelector(selectSection('event'));

  const isEventPhotographyDefault =
    slug === 'photography' &&
    eventSection?.bundle?.type === 'event' &&
    eventSection?.bundle?.photographyDefaultId === element.id &&
    !!eventSection?.bundle?.photographyDefaultDiscount;

  const isEventCinematographyDefault =
    slug === 'cinematography' &&
    eventSection?.bundle?.type === 'event' &&
    eventSection?.bundle?.cinematographyDefaultId === element.id &&
    !!eventSection?.bundle?.cinematographyDefaultDiscount;

  const eventBundle =
    eventSection?.bundle?.type === 'event' ? eventSection?.bundle : undefined;

  const formatPrice = useCallback(
    (price: number, discount: number, discountType: 'percentage' | 'fixed') => {
      return formatCurrency(
        calculateBundlePrice(
          {
            price:
              price -
              calculateServiceDiscount({
                price,
                discount,
                discountType,
              } as Service),
          } as Bundle,
          eventSection?.events ?? [],
          settings
        )
      );
    },
    [eventSection?.events, settings]
  );

  return (
    <li
      key={element.id}
      className={cn(
        'flex flex-row justify-between items-center gap-3 border-2 rounded bg-white px-4 py-3 hover:bg-primary/10 hover:border-primary/10',
        {
          'border-primary text-primary bg-primary/20':
            section?.bundle?.id === element.id,
        }
      )}
      onClick={() => onPackageClickHandler(element)}
    >
      <div className='flex flex-col justify-start items-start'>
        <Typography>{element.title}</Typography>
        {element.description && (
          <Typography variant={'small'} appearance={'muted'}>
            {element.description}
          </Typography>
        )}
      </div>
      <div>
        {isEventPhotographyDefault && (
          <Typography variant={'small'} appearance={'muted'}>
            {formatPrice(
              element.price,
              +eventBundle?.photographyDefaultDiscount!,
              eventBundle?.photographyDefaultDiscountType!
            )}
          </Typography>
        )}
        {isEventCinematographyDefault && (
          <Typography variant={'small'} appearance={'muted'}>
            {formatPrice(
              element.price,
              +eventBundle?.cinematographyDefaultDiscount!,
              eventBundle?.cinematographyDefaultDiscountType!
            )}
          </Typography>
        )}
        {element.price && (
          <Typography
            variant={'small'}
            appearance={'muted'}
            className={cn({
              'line-through':
                isEventPhotographyDefault || isEventCinematographyDefault,
            })}
          >
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
    </li>
  );
};

export default PackageItem;

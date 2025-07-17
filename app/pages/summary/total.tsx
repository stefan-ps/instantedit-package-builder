import React, { useMemo } from 'react';
import { Typography } from '~/components/ui/typography';
import {
  isServicePackage,
  type Bundle,
  type EventBundle,
  type Service,
} from '~/types/api';
import type { Booking } from '~/types/booking';
import {
  calculateBundlePrice,
  calculateServiceDiscount,
} from '../builder/sidebar/utils';
import { useAppSelector } from '~/store/hooks';
import { selectSection } from '~/store/config.selector';
import { formatCurrency } from '~/lib/format';

const Total = ({ bundles, addons, events }: Booking) => {
  const settings = useAppSelector((store) => store.app.configuration.settings);
  const eventSection = useAppSelector(selectSection('event'));
  const eventBundle = eventSection?.bundle as EventBundle | undefined;

  const calculatedTotal = useMemo(
    () =>
      bundles.reduce((acc, curr) => {
        if (isServicePackage(curr)) {
          return (
            acc +
            calculateBundlePrice(
              {
                price:
                  curr.price -
                  calculateServiceDiscount({
                    price: curr.price,
                    discount:
                      eventBundle?.photographyDefaultId === curr.id
                        ? eventBundle?.photographyDefaultDiscount
                        : eventBundle?.cinematographyDefaultId === curr.id
                        ? eventBundle?.cinematographyDefaultDiscount
                        : 0,
                    discountType: 'fixed',
                  } as Service),
              } as Bundle,
              events ?? [],
              settings
            )
          );
        }

        return acc;
      }, 0) +
      addons.reduce((acc, curr) => {
        return acc + (curr.price - calculateServiceDiscount(curr));
      }, 0),
    [settings]
  );

  return (
    <div className='flex flex-row justify-between items-center font-bold bg-gray-200 p-5'>
      <Typography>Total</Typography>
      <Typography>
        {formatCurrency(calculatedTotal)}
      </Typography>
    </div>
  );
};

export default Total;

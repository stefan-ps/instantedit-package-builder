import React, { useMemo } from 'react';
import { Typography } from '~/components/ui/typography';
import { isServicePackage } from '~/types/api';
import type { Booking } from '~/types/booking';
import { calculateBundlePrice } from '../builder/sidebar/utils';
import { useAppSelector } from '~/store/hooks';

const Total = ({ bundles, addons, events }: Booking) => {
  const settings = useAppSelector((store) => store.app.configuration.settings);

  const calculatedTotal = useMemo(
    () =>
      bundles.reduce((acc, curr) => {
        if (isServicePackage(curr)) {
          return acc + calculateBundlePrice(curr, events ?? [], settings);
        }

        return acc;
      }, 0) +
      addons.reduce((acc, curr) => {
        return acc + curr.price;
      }, 0),
    [settings]
  );

  return (
    <div className='flex flex-row justify-between items-center font-bold bg-gray-200 p-5'>
      <Typography>Total</Typography>
      <Typography>
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(calculatedTotal)}
      </Typography>
    </div>
  );
};

export default Total;

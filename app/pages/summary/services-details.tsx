import React, { Fragment } from 'react';
import { Typography } from '~/components/ui/typography';
import type { Booking } from '~/types/booking';
import { calculateBundlePrice } from '../builder/sidebar/utils';
import { useAppSelector } from '~/store/hooks';
import BundleDetails from './bundle-details';
import { Separator } from '~/components/ui/separator';

type Props = Booking;

const ServicesDetails = ({ events, bundles, addons }: Props) => {
  const configuration = useAppSelector((state) => state.app.configuration);

  return (
    <div className='flex flex-col gap-5'>
      <div className='bg-gray-200 p-3'>
        <Typography variant={'h4'}>Services</Typography>
      </div>
      <div className='flex flex-row gap-3'>
        <Typography>Coverage needs</Typography>
        <Typography className='grow text-right'>
          {events
            .filter((event) => event.type === 'ceremony')
            .map((event) => event.title)
            .join(', ')}
        </Typography>
      </div>
      <Separator />
      <div className='flex flex-row gap-3'>
        <Typography>Pre-Wedding Event</Typography>
        <Typography className='grow text-right'>
          {events
            .filter((event) => event.type === 'pre-ceremony')
            .map((event) => event.title)
            .join(', ')}
        </Typography>
      </div>
      <Separator />
      {bundles.map((bundle, index) => (
        <Fragment key={bundle.id}>
          <BundleDetails
            bundle={{
              ...bundle,
              price: calculateBundlePrice(
                bundle,
                events,
                configuration.settings
              ),
            }}
          />
          <Separator />
        </Fragment>
      ))}
      {addons.map((addon) => (
        <Fragment key={addon.id}>
          <div className='flex flex-row gap-3'>
            <Typography>{addon.title}</Typography>
            <Typography className='grow text-right'>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(addon.price)}
            </Typography>
          </div>
          <Separator />
        </Fragment>
      ))}
    </div>
  );
};

export default ServicesDetails;

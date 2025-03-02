import React from 'react';
import { Typography } from '~/components/ui/typography';
import type { Addon } from '~/types/api';

type Props = {
  title: string;
  addons: Addon[];
};

const ExtraSummary = ({ title, addons }: Props) => {
  return (
    <div>
      {addons.map((addon) => (
        <div className='flex flex-row justify-between items-end gap-5 border-b my-3'>
          <div>
            <Typography variant={'small'} appearance={'muted'}>
              {title}
            </Typography>
            <Typography variant={'h3'}>{addon.title}</Typography>
          </div>
          <Typography variant={'h3'}>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(addon.price)}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default ExtraSummary;

import React from 'react';
import { Typography } from '~/components/ui/typography';
import { formatCurrency } from '~/lib/format';
import type { Addon } from '~/types/api';

type Props = {
  title: string;
  addons: Addon[];
};

const ExtraSummary = ({ title, addons }: Props) => {
  return (
    <div>
      {addons.map((addon) => (
        <div key={addon.id} className='flex flex-row justify-between items-end gap-5 border-b my-3'>
          <div>
            <Typography variant={'small'} appearance={'muted'}>
              {title}
            </Typography>
            <Typography variant={'h3'}>{addon.title}</Typography>
          </div>
          <Typography variant={'h3'}>
            {formatCurrency(addon.price)}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default ExtraSummary;

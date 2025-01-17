import React from 'react';
import { Badge } from '~/components/ui/badge';
import { Typography } from '~/components/ui/typography';
import type { EventPackage } from '~/types/api';

type Props = {
  item: EventPackage;
};

const EventSummary = ({ item }: Props) => {
  return (
    <div className='flex flex-col gap-3'>
      <Typography variant={'h3'}>{item.title}</Typography>
      <ul className='flex flex-row gap-3'>
        {item.events.map((event) => (
          <li key={event.id}>
            <Badge>{event.title}</Badge>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventSummary;

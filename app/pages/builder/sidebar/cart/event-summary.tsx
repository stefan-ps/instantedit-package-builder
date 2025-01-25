import React from 'react';
import { Badge } from '~/components/ui/badge';
import { Typography } from '~/components/ui/typography';
import type { Event, EventPackage } from '~/types/api';

type Props = {
  item: EventPackage;
  events: Event[];
};

const EventSummary = ({ item, events }: Props) => {
  return (
    <div className='flex flex-col gap-3'>
      <Typography variant={'h3'}>{item.title}</Typography>
      <ul className='flex flex-row gap-3'>
        {events.map((event) => (
          <li key={event.id}>
            <Badge>{event.title}</Badge>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventSummary;

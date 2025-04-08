import { format } from 'date-fns';
import { Typography } from '~/components/ui/typography';
import type { Booking } from '~/types/booking';

type Props = Booking;

const ContactDetails = ({ contact, venues, events }: Props) => {
  return (
    <div className='flex flex-col gap-5'>
      <div className='bg-gray-200 p-3'>
        <Typography variant={'h4'}>Contact Details</Typography>
      </div>
      <div className='flex flex-row gap-3'>
        <Typography appearance={'muted'}>First Name</Typography>
        <Typography className='grow text-right'>{contact.firstName}</Typography>
      </div>
      <div className='flex flex-row gap-3'>
        <Typography appearance={'muted'}>Last Name</Typography>
        <Typography className='grow text-right'>{contact.lastName}</Typography>
      </div>
      <div className='flex flex-row gap-3'>
        <Typography appearance={'muted'}>Email</Typography>
        <Typography className='grow text-right'>{contact.email}</Typography>
      </div>
      <div className='flex flex-row gap-3'>
        <Typography appearance={'muted'}>Phone</Typography>
        <Typography className='grow text-right'>{contact.phone}</Typography>
      </div>
      {venues.map((venue, index) => (
        <div key={index} className='flex flex-row gap-3 justify-between'>
          <Typography appearance={'muted'}>
            {events.find((event) => event.id === venue.eventId)?.title}
          </Typography>
          <div key={index} className='flex-1 flex flex-col w-96'>
            <Typography
              className='text-right whitespace-nowrap overflow-hidden text-ellipsis'
              title={venue.location}
            >
              {venue.location}
            </Typography>
            <Typography className='grow text-right'>
              {format(new Date(venue.slot), 'PPP')}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactDetails;

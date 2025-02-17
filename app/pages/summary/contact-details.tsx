import React from 'react';
import { Typography } from '~/components/ui/typography';
import type { Booking } from '~/types/booking';

type Props = Booking;

const ContactDetails = ({ contact, venues }: Props) => {
  return (
    <div className='flex flex-col gap-5'>
      <div className='bg-gray-300 p-3'>
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
        <div key={index} className='flex flex-row gap-3'>
          <Typography appearance={'muted'}>Location {++index}</Typography>
          <Typography className='grow text-right'>{venue.location}</Typography>
        </div>
      ))}
    </div>
  );
};

export default ContactDetails;

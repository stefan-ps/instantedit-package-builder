import React, { useCallback, useEffect } from 'react';
import { useAppSelector } from '~/store/hooks';
import ContactDetails from './contact-details';
import { useNavigate } from 'react-router';
import ServicesDetails from './services-details';
import { Button } from '~/components/ui/button';
import { patchBooking } from '~/lib/api';
import Total from './total';

const Summary = () => {
  const navigate = useNavigate();
  const booking = useAppSelector((state) => state.builder.booking);

  useEffect(() => {
    if (!booking) {
      navigate('/');
    }
  }, []);

  const onReserveHandler = useCallback(async () => {
    if (booking) {
      const response = await patchBooking({
        id: booking.id,
        status: 'requested'
      });
      if (response.status === 200) {
        await navigate('/success');
        return;
      }
    }
  }, [booking]);

  if (!booking) {
    return null;
  }

  return (
    <div className='h-screen md:flex flex-row flex-grow'>
      <div className='lg:basis-5/12 p-5 flex flex-col gap-10'>
        <img src='/raj_logo.svg' height={100} width={200} />
        <ContactDetails {...booking} />
        <ServicesDetails {...booking} />
        <Total {...booking} />
        <Button onClick={onReserveHandler}>Request Reservation</Button>
      </div>
      <div className='basis-0 lg:basis-7/12 bg-blue-200'></div>
    </div>
  );
};

export default Summary;

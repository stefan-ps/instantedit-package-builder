import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import ContactDetails from './contact-details';
import { useNavigate } from 'react-router';
import ServicesDetails from './services-details';
import { Button } from '~/components/ui/button';
import { patchBooking } from '~/lib/api';
import Total from './total';
import { resetConfig } from '~/store/builder-slice';

const Summary = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const booking = useAppSelector((state) => state.builder.booking);
  const { summaryImage } = useAppSelector((state) => state.app.configuration);

  useEffect(() => {
    if (!booking) {
      navigate('/');
    }
  }, []);

  const onReserveHandler = useCallback(async () => {
    if (booking) {
      const response = await patchBooking({
        id: booking.id,
        status: 'requested',
      });
      if (response.status === 200) {
        dispatch(resetConfig());
        await navigate('/success');
        return;
      }
    }
  }, [booking]);

  if (!booking) {
    return null;
  }

  return (
    <div className='h-screen md:flex flex-row'>
      <div className='flex-1 p-5 flex flex-col gap-10'>
        <img src='/raj_logo.svg' height={100} width={200} />
        <ContactDetails {...booking} />
        <ServicesDetails {...booking} />
        <Total {...booking} />
        <Button onClick={onReserveHandler}>Request Reservation</Button>
      </div>
      <div className='hidden flex-5 lg:flex flex-row'>
        <img
          src={summaryImage}
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
};

export default Summary;

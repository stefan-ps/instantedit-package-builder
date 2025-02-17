import React, { useEffect } from 'react';
import { useAppSelector } from '~/store/hooks';
import ContactDetails from './contact-details';
import { useNavigate } from 'react-router';
import ServicesDetails from './services-details';
import { Button } from '~/components/ui/button';

const Summary = () => {
  const navigate = useNavigate();
  const booking = useAppSelector((state) => state.builder.booking);

  useEffect(() => {
    if (!booking) {
      navigate('/');
    }
  }, []);

  if (!booking) {
    return null;
  }

  return (
    <div className='h-screen flex flex-row flex-grow'>
      <div className='lg:basis-5/12 p-5 flex flex-col gap-10'>
        <img src='/raj_logo.svg' height={100} width={200} />
        <ContactDetails {...booking} />
        <ServicesDetails {...booking} />
        <Button>Request Reservation</Button>
      </div>
      <div className='basis-0 lg:basis-7/12 bg-blue-200 w-20'></div>
    </div>
  );
};

export default Summary;

import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { CalendarIcon, PlusSquare } from 'lucide-react';
import { Typography } from '~/components/ui/typography';
import React, { useCallback } from 'react';
const DatePicker = React.lazy(() => import('react-datepicker'));
import 'react-datepicker/dist/react-datepicker.css';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { format } from 'date-fns';
import { useAppSelector } from '~/store/hooks';
import type { Booking } from '~/types/booking';
import {
  selectAddons,
  selectSection,
  selectServiceBundles,
} from '~/store/config.selector';
import { useDispatch } from 'react-redux';
import { saveBooking } from '~/store/builder-slice';
import { useNavigate } from 'react-router';

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'Last name must be at least 2 characters.',
  }),
  phone: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Must be valid email.',
  }),
  venues: z.array(
    z.object({
      eventId: z.number(),
      eventName: z.string(),
      location: z.string(),
      slot: z.date(),
    })
  ),
});

const ReserveForm = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const eventSection = useAppSelector(selectSection('event'));
  const packages = useAppSelector(selectServiceBundles);
  const addons = useAppSelector(selectAddons);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
    name: 'venues', // unique name for your Field Array
  });

  // 2. Define a submit handler.
  const onSubmit = useCallback(
    ({ venues, ...contact }: z.infer<typeof formSchema>) => {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      const booking: Booking = {
        contact,
        venues,
        events: eventSection?.events ?? [],
        bundles: packages,
        addons: addons,
      };

      dispatch(saveBooking(booking));
      navigate('/summary');
    },
    [eventSection?.events, packages]
  );

  const addVenue = useCallback(() => {
    if (fields.length < (eventSection?.events.length ?? 0))
      append({
        eventId: eventSection?.events[fields.length].id!,
        eventName: eventSection?.events[fields.length].title!,
        location: '',
        slot: new Date(),
      });
  }, [eventSection, fields]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1 items-start'>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder='First Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1 items-start'>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder='Last Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1 items-start'>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder='Phone' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1 items-start'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col gap-4 py-10'>
          {fields.map((item, index) => (
            <div
              key={item.id}
              className='grid grid-cols-1 lg:grid-cols-2 gap-4'
            >
              <Typography className='lg:col-span-2 text-left font-bold'>
                {item.eventName}
              </Typography>
              <FormField
                control={form.control}
                name={`venues.${index}.location`}
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-1 items-start'>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder='Venue Address' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`venues.${index}.slot`}
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-1 items-start'>
                    <FormLabel>Date & Time</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant='outline'
                            className='w-full justify-start text-left border-border text-foreground'
                          >
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {field.value
                              ? format(field.value, 'PPP p')
                              : 'Pick date & time'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align='start' className='w-auto p-0'>
                          <div className='datepicker-light-mode'>
                            <DatePicker
                              selected={field.value}
                              onChange={(value) => field.onChange(value)}
                              timeInputLabel='Start time:'
                              dateFormat='MM/dd/yyyy h:mm aa'
                              showTimeInput
                              inline
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          {fields.length < (eventSection?.events.length ?? 0) && (
            <div>
              <Button type='button' variant={'link'} onClick={addVenue}>
                <PlusSquare size={24} />
                <Typography>Add location</Typography>
              </Button>
            </div>
          )}
        </div>
        <div className='flex justify-center items-center'>
          <Button type='submit'>Confirm</Button>
        </div>
      </form>
    </Form>
  );
};

export default ReserveForm;

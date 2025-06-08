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
import { CalendarIcon } from 'lucide-react';
import { Typography } from '~/components/ui/typography';
import { useCallback } from 'react';
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
import { Calendar } from '~/components/ui/calendar';
import GooglePlacesAutocomplete from '~/components/google-places-autocomplete-select/google-places-autocomplete';
import { makeBooking } from '~/lib/api';

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
      location: z.string().optional(),
      slot: z.number(),
      slotBeginning: z.string().optional(),
      slotEnding: z.string().optional(),
    })
    // .refine(
    //   (data) => {
    //     return !(data.slotBeginning === '' || data.slotEnding === '');
    //   },
    //   {
    //     message: 'Start and end time must be provided.',
    //     path: ['slot'],
    //   }
    // )
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
      venues: eventSection?.events.map((event) => ({
        eventId: event.id,
        eventName: event.title,
        location: '',
        slot: new Date().getTime(),
        slotBeginning: '',
        slotEnding: '',
      })),
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'venues',
  });

  const onSubmit = useCallback(
    async ({ venues, ...contact }: z.infer<typeof formSchema>) => {
      const booking: Booking = {
        contact,
        venues: venues.map((venue) => {
          const slotBeginning = new Date(venue.slot);
          if (venue.slotBeginning && venue.slotBeginning !== '') {
            slotBeginning.setHours(parseInt(venue.slotBeginning.split(':')[0]));
            slotBeginning.setMinutes(
              parseInt(venue.slotBeginning.split(':')[1])
            );
            slotBeginning.setSeconds(0);
          }
          const slotEnding = new Date(venue.slot);
          if (venue.slotEnding && venue.slotEnding !== '') {
            slotEnding.setHours(parseInt(venue.slotEnding.split(':')[0]));
            slotEnding.setMinutes(parseInt(venue.slotEnding.split(':')[1]));
            slotEnding.setSeconds(0);
          }

          return {
            ...venue,
            slotBeginning: slotBeginning.getTime(),
            slotEnding: slotEnding.getTime(),
          };
        }),
        events: eventSection?.events ?? [],
        bundles: packages,
        addons: addons,
      };
      const response = await makeBooking({...booking, sectionMetadataBundleId: eventSection!.bundle!.sectionMetadataBundleId});
      if (response.status === 201) {
        const { id } = await response.json();
        dispatch(saveBooking({id, ...booking}));
        await navigate('/summary');
      }
    },
    [eventSection?.events, packages]
  );

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
                      <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_PLACES_API_KEY}
                        value={field.value ?? ''}
                        onSelect={(value) => {
                          field.onChange(value);
                        }}
                        debounce={1000}
                        minLengthAutocomplete={3}
                      />
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
                              ? format(field.value, 'PPP')
                              : 'Pick date & time'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0 flex flex-col gap-2 pb-2'>
                          <Calendar
                            mode='single'
                            selected={new Date(field.value)}
                            onSelect={(value) =>
                              field.onChange(value?.getTime())
                            }
                            className='rounded-md border'
                          />
                          <div className='flex flex-col gap-2 items-center px-2'>
                            <FormField
                              control={form.control}
                              name={`venues.${index}.slotBeginning`}
                              render={({ field }) => (
                                <FormItem className='flex flex-row gap-2 items-center'>
                                  <FormLabel className='w-24'>
                                    Start Time:
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      className='flex-1'
                                      type='time'
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`venues.${index}.slotEnding`}
                              render={({ field }) => (
                                <FormItem className='flex flex-row gap-2 items-center'>
                                  <FormLabel className='w-24'>
                                    End Time:
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      className='flex-1'
                                      type='time'
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
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
        </div>
        <div className='flex justify-center items-center'>
          <Button type='submit'>Confirm</Button>
        </div>
      </form>
    </Form>
  );
};

export default ReserveForm;

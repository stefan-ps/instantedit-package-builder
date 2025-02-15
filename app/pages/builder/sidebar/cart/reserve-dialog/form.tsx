import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
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
      address: z.string(),
      date: z.date(),
    })
  ),
});

const ReserveForm = () => {
  const config = useAppSelector((state) => state.builder.configs.event);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
    name: 'venues', // unique name for your Field Array
  });

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  const addVenue = useCallback(() => {
    if (fields.length < (config?.events.length ?? 0))
      append({ address: '', date: new Date() });
  }, [config, fields]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
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
              <FormItem>
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
              <FormItem>
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
            <div key={item.id} className='grid grid-cols-2 gap-4'>
              <Typography className='col-span-2 font-bold'>
                Venue {index + 1}
              </Typography>
              <FormField
                control={form.control}
                name={`venues.${index}.address`}
                render={({ field }) => (
                  <FormItem>
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
                name={`venues.${index}.date`}
                render={({ field }) => (
                  <FormItem>
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
                              onChange={field.onChange}
                              timeInputLabel='Time:'
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
          {fields.length < (config?.events.length ?? 0) && (
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

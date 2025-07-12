import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { makeBooking } from '~/lib/api';
import { saveBooking } from '~/store/builder-slice';
import {
  selectSection,
  selectServiceBundles,
  selectAddons,
} from '~/store/config.selector';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

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
});

const ContactStep = ({ next }: { next: () => void }) => {
  const eventSection = useAppSelector(selectSection('event'));
  const packages = useAppSelector(selectServiceBundles);
  const addons = useAppSelector(selectAddons);
  const dispatch = useAppDispatch();
  const booking = useAppSelector((state) => state.builder.booking);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    },
  });

  const onSubmitHandler = async (data: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const response = await makeBooking({
        id: booking?.id,
        status: 'contact',
        contact: { id: booking?.contact.id, ...data },
        events: eventSection?.events ?? [],
        bundles: packages,
        addons: addons,
        sectionMetadataBundleId: eventSection!.bundle!.sectionMetadataBundleId,
      });

      if (response.status === 201) {
        const createdBooking = await response.json();
        dispatch(
          saveBooking({
            id: createdBooking?.id,
            status: 'contact',
            contact: { id: createdBooking?.contact.id, ...data },
            events: eventSection?.events ?? [],
            bundles: packages,
            addons: addons,
          })
        );
      }
      next();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)} className='space-y-4'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 py-10'>
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

        <div className='flex justify-end'>
          <Button type='submit' disabled={isPending} className='flex justify-center items-center'>
            {isPending ? <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" /> : 'Next'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ContactStep;

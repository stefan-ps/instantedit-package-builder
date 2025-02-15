import React from 'react';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import ReserveForm from './form';

const ReserveDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'default'} size={'lg'}>
          Reserve Now
        </Button>
      </DialogTrigger>
      <DialogContent
        className='max-w-3xl'
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Contact Details</DialogTitle>
          <DialogDescription>
            Provide us with your contact information and event location details
            below.
          </DialogDescription>
          <div>
            <ReserveForm />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ReserveDialog;

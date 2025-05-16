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
import Stepper from './booking-stepper/stepper';

const ReserveDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'default'} size={'lg'}>
          Reserve Now
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-3xl max-h-screen overflow-y-auto'>
        <DialogHeader>
          <Stepper />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ReserveDialog;

import React from 'react';
import { FaAngleDown } from 'react-icons/fa';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { useAppSelector } from '~/store/hooks';
import { isEventPackage, isServicePackage } from '~/types/api';
import PackageSummary from './package-summary';
import EventSummary from './event-summary';

const CartSummary = () => {
  const config = useAppSelector((state) => state.builder.configs);

  return (
    <Dialog>
      <DialogTrigger>
        <FaAngleDown color='hsl(var(--primary))' />
      </DialogTrigger>
      <DialogContent className='max-w-3xl'>
        <DialogHeader>
          <DialogTitle>Options Selected</DialogTitle>
          <div className='flex flex-col gap-8 py-5'>
            {Object.values(config).map((item) => {
              if (item.package && isEventPackage(item.package)) {
                return <EventSummary key={item.package.id} item={item.package} events={item.events} />;
              }

              if (item.package && isServicePackage(item.package)) {
                return <PackageSummary key={item.package.id} item={item.package} />;
              }

              return null;
            })}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CartSummary;

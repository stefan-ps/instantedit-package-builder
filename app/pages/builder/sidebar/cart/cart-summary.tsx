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
import {
  isEventPackage as isEventBundle,
  isServicePackage as isServiceBundle,
} from '~/types/api';
import PackageSummary from './package-summary';
import EventSummary from './event-summary';
import { selectSections } from '~/store/config.selector';
import ExtraSummary from './extra-summary';

const CartSummary = () => {
  const sections = useAppSelector(selectSections);

  return (
    <Dialog>
      <DialogTrigger>
        <FaAngleDown color='hsl(var(--primary))' />
      </DialogTrigger>
      <DialogContent className='max-w-3xl max-h-screen overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-left'>Options Selected</DialogTitle>
          <div className='flex flex-col text-left gap-8 py-5'>
            {Object.values(sections).map((item, index) => {
              if (item.package && isEventBundle(item.package)) {
                return (
                  <EventSummary
                    key={index}
                    item={item.package}
                    events={item.events}
                  />
                );
              }

              if (item.package && isServiceBundle(item.package)) {
                return (
                  <PackageSummary
                    key={index}
                    item={item.package}
                    title={item.title ?? ''}
                    addons={item.addons}
                  />
                );
              }

              return <ExtraSummary key={index} addons={item.addons} title={'Extras'} />;
            })}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CartSummary;

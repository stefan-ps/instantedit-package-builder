import React, { Fragment, useRef } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { type Event, type Bundle, type Settings, type ServiceBundle } from '~/types/api';
import { Button } from '~/components/ui/button';
import { Typography } from '~/components/ui/typography';
import { calculateBundlePrice } from '../utils';

type Props = {
  title?: string;
  actionText?: string;
  bundles: ServiceBundle[];
  events: Event[];
  settings: Settings;
  onSelect: (servicePackage: ServiceBundle) => void;
};

const ComparableContainer = ({
  title,
  actionText,
  bundles,
  events,
  settings,
  onSelect,
}: Props) => {
  const headers = useRef([
    ...new Set(
      bundles.flatMap((bundle) => bundle.comparables).flatMap((com) => com.title)
    ),
  ]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'link'}>{actionText}</Button>
      </DialogTrigger>
      <DialogContent className='max-w-5xl max-h-screen overflow-x-auto overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-left'>Compare {title}</DialogTitle>
          <div
            className='grid grid-cols-[repeat(var(--columns),_1fr)] gap-y-4 pt-5'
            style={{ '--columns': bundles.length + 1 } as React.CSSProperties}
          >
            <div className='border-t pt-3'></div>
            {bundles.map((bundle) => (
              <div key={bundle.id} className='text-center px-4 border-t pt-3'>
                <Typography variant={'h4'}>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(calculateBundlePrice(bundle, events, settings))}
                </Typography>
                <Typography variant={'small'} appearance={'default'}>
                  {bundle.title}
                </Typography>
                <Typography variant={'small'} appearance={'muted'}>
                  {bundle.description}
                </Typography>
              </div>
            ))}
            {headers.current.map((header) => (
              <Fragment key={header}>
                <div className='border-t pt-3 text-left'>
                  <Typography>{header}</Typography>
                </div>
                {bundles.map((bundle) => {
                  const comp = bundle.comparables.find(
                    (comp) => comp.title === header
                  );

                  if (comp?.icon) {
                    return (
                      <div
                        key={comp?.title}
                        className='flex justify-center items-center border-t pt-3'
                      >
                        <img
                          src={`/icons/${comp.icon}`}
                          height={20}
                          width={20}
                        />
                      </div>
                    );
                  }

                  return (
                    <div
                      key={comp?.title}
                      className='flex justify-center items-center border-t pt-3'
                    >
                      <Typography>{comp?.text}</Typography>
                    </div>
                  );
                })}
              </Fragment>
            ))}
            <div className='flex flex-col justify-center items-start border-t pt-6 text-left'>
              <Typography appearance={'muted'}>
                Need a lower priced option?
              </Typography>
              <Button variant={'link'} className='p-0'>
                Explore our budget packages
              </Button>
            </div>
            {bundles.map((bundle) => (
              <div
                key={bundle.id}
                className='flex flex-grow justify-center items-center border-t pt-6 px-4'
              >
                <DialogClose asChild>
                  <Button className='grow' onClick={() => onSelect(bundle)}>
                    Select Plan
                  </Button>
                </DialogClose>
              </div>
            ))}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ComparableContainer;

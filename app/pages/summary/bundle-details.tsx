import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Typography } from '~/components/ui/typography';
import { formatCurrency } from '~/lib/format';
import { isServicePackage, type Bundle } from '~/types/api';

type Props = { bundle: Bundle };

const BundleDetails = ({ bundle }: Props) => {
  if (!isServicePackage(bundle)) {
    return null;
  }

  return (
    <div>
      <Accordion type='single' collapsible>
        <AccordionItem value={`item-${bundle.id}`}>
          <AccordionTrigger className='py-0'>
            <div className='flex-1 pl-2 flex flex-row items-center text-base font-normal'>
              <Typography>{bundle.title}</Typography>
              <Typography className='grow text-right'>
                {formatCurrency(bundle.price)}
              </Typography>
            </div>
          </AccordionTrigger>
          <AccordionContent className='p-0'>
            <ul className='list-disc px-5 py-3 text-gray-500 '>
              {bundle.comparables.map((comp) => (
                <li key={comp.title}>
                  <Typography variant={'small'} appearance={'muted'}>
                    {comp.title}
                  </Typography>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default BundleDetails;

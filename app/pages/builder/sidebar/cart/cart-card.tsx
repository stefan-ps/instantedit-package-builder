import { SlCallOut } from 'react-icons/sl';
import { Button } from '~/components/ui/button';
import { Typography } from '~/components/ui/typography';
import CartSummary from './cart-summary';
import { useAppSelector } from '~/store/hooks';
import { isServicePackage } from '~/types/api';
import { useMemo } from 'react';
import { useBuilderContext } from '~/providers/builder-provider';
import { calculateBundlePrice } from '../utils';
import ReserveDialog from './reserve-dialog';
import { selectSections } from '~/store/config.selector';

const CartCard = () => {
  const { settings } = useBuilderContext();
  const sections = useAppSelector(selectSections);

  const calculatedTotal = useMemo(
    () =>
      Object.values(sections).reduce((acc, curr, _, array) => {
        let total = acc;
        if (curr.package && isServicePackage(curr.package)) {
          total += calculateBundlePrice(
            curr.package,
            sections.event?.events ?? [],
            settings
          );
        }

        curr.addons.forEach((addon) => {
          total += addon.price;
        });
        return total;
      }, 0),
    [sections]
  );

  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(calculatedTotal);

  if (Object.values(sections).length === 0) {
    return;
  }

  return (
    <div className='lg:basis-1/3 fixed w-full lg:w-1/3 bottom-0 right-0 px-5'>
      <div className='flex flex-col  gap-10 grow  bg-[#09090B] px-5 py-7 rounded-tl-3xl rounded-tr-3xl'>
        <div className='flex flex-row justify-between items-start'>
          <div>
            <div className='flex flex-row items-center gap-2'>
              <Typography variant={'h3'} className='text-primary-foreground'>
                {formattedTotal}
              </Typography>
              <CartSummary />
            </div>
            <Typography variant={'small'} appearance={'muted'}>
              Estimated Price
            </Typography>
          </div>
          <ReserveDialog />
        </div>
        <div className='flex flex-col xl:flex-row gap-5 bg-transparent'>
          <Button variant={'outline'} size={'lg'} className='grow'>
            <SlCallOut color='hsl(var(--primary))' /> Book consultation
          </Button>
          <Button variant={'outline'} size={'lg'} className={'grow'}>
            <SlCallOut color='hsl(var(--primary))' /> Call Us Directly
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;

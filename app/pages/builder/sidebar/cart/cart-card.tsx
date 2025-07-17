import { SlCallOut } from 'react-icons/sl';
import { Button } from '~/components/ui/button';
import { Typography } from '~/components/ui/typography';
import CartSummary from './cart-summary';
import { useAppSelector } from '~/store/hooks';
import {
  isServicePackage,
  type Bundle,
  type EventBundle,
  type Service,
} from '~/types/api';
import { useMemo } from 'react';
import { calculateBundlePrice, calculateServiceDiscount } from '../utils';
import ReserveDialog from './reserve-dialog';
import { selectSection, selectSections } from '~/store/config.selector';
import { formatCurrency } from '~/lib/format';

const CartCard = () => {
  const { settings } = useAppSelector((state) => state.app.configuration);
  const sections = useAppSelector(selectSections);
  const eventSection = useAppSelector(selectSection('event'));
  const eventBundle = eventSection?.bundle as EventBundle | undefined;

  const calculatedTotal = useMemo(
    () =>
      Object.values(sections).reduce((acc, curr, _, array) => {
        let total = acc;
        if (curr.bundle && isServicePackage(curr.bundle)) {
          total += calculateBundlePrice(
            {
              price:
                curr.bundle.price -
                calculateServiceDiscount({
                  price: curr.bundle.price,
                  discount:
                    eventBundle?.photographyDefaultId === curr.bundle.id
                      ? eventBundle?.photographyDefaultDiscount
                      : eventBundle?.cinematographyDefaultId === curr.bundle.id
                      ? eventBundle?.cinematographyDefaultDiscount
                      : 0,
                  discountType: 'fixed',
                } as Service),
            } as Bundle,
            sections.event?.events ?? [],
            settings
          );
        }

        curr.addons.forEach((addon) => {
          total += addon.price - calculateServiceDiscount(addon);
        });
        return total;
      }, 0),
    [sections]
  );

  const formattedTotal = formatCurrency(calculatedTotal);

  if (Object.values(sections).length === 0) {
    return;
  }

  return (
    <div className='lg:w-[450px] fixed w-full bottom-0 right-0 px-5'>
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
      </div>
    </div>
  );
};

export default CartCard;

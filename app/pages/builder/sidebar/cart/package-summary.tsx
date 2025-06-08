import { Typography } from '~/components/ui/typography';
import type {
  Addon,
  Bundle,
  EventBundle,
  Service,
  ServiceBundle,
} from '~/types/api';
import { calculateBundlePrice, calculateServiceDiscount } from '../utils';
import { useAppSelector } from '~/store/hooks';
import { selectSection } from '~/store/config.selector';

type Props = {
  title: string;
  item: ServiceBundle;
  addons: Addon[];
};

const PackageSummary = ({ item, title, addons }: Props) => {
  const { settings } = useAppSelector((state) => state.app.configuration);
  const eventSection = useAppSelector(selectSection('event'));
  const eventBundle = eventSection?.bundle as EventBundle | undefined;

  return (
    <div key={item.id}>
      <div className='flex flex-row justify-between items-end gap-5  border-b'>
        <div className='flex flex-col items-start'>
          <Typography variant={'small'} appearance={'muted'}>
            {title}
          </Typography>
          <Typography variant={'h3'}>{item.title}</Typography>
        </div>
        <Typography variant={'h3'}>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(
            calculateBundlePrice(
              {
                price:
                  item.price -
                  calculateServiceDiscount({
                    price: item.price,
                    discount:
                      eventBundle?.photographyDefaultId === item.id
                        ? eventBundle?.photographyDefaultDiscount
                        : eventBundle?.cinematographyDefaultId === item.id
                        ? eventBundle?.cinematographyDefaultDiscount
                        : 0,
                    discountType: 'fixed',
                  } as Service),
              } as Bundle,
              eventSection?.events ?? [],
              settings
            )
          )}
        </Typography>
      </div>
      <div className='px-5 py-3 border-b'>
        <ul className='list-disc text-gray-500 '>
          {item.comparables.map((comp) => (
            <li key={comp.title}>
              <Typography variant={'small'} appearance={'muted'}>
                {comp.title}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
      {addons.map((addon) => (
        <div className='flex flex-row justify-between items-end gap-5 border-b my-3'>
          <div>
            <Typography variant={'small'} appearance={'muted'}>
              {title}
            </Typography>
            <Typography variant={'h3'}>{addon.title}</Typography>
          </div>
          <Typography variant={'h3'}>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(addon.price)}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default PackageSummary;
